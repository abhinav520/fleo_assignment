import React, { useState, useContext, useEffect } from "react";
import { useCallback } from "react";

const url =
  "https://api.github.com/search/repositories?q=";

const AppContext=React.createContext();

const AppProvider=({children})=>{
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("Javascript");
  const [searchOpt, setSearchOpt] = useState("language");
  const [sortStarBool, setSortStarBool] = useState(false);
  const [sortNameBool, setSortNameBool] = useState(false);
  const [sortOrder, setSortOrder] = useState("desc");
  const [repo,setRepo]=useState([]);

  const fetchRepo = useCallback(async () => {
    setLoading(true);
    try {
      console.log(
        `${url}${searchOpt}:${searchTerm}${sortStarBool ? "&sort=stars" : ""}${
          sortNameBool ? "&sort=name" : ""
        }&order=${sortOrder}`
      );
      const response = await fetch(
        `${url}${searchOpt}:${searchTerm}${sortStarBool ? "&sort=stars" : ""}${
          sortNameBool ? "&sort=name" : ""
        }&order=${sortOrder}`
      );
      const data = await response.json();
      console.log(data);
      const { items } = data;
      if (items) {
        const newRepo = items.map((item) => {
          const {
            id,
            name,
            description,
            owner,
            stargazers_count,
            forks_count,
            language,
            html_url,
          } = item;
          return {
            id: id,
            name: name,
            description: description,
            owner_name: owner.login,
            stars: stargazers_count,
            forks_count: forks_count,
            language: language,
            html_url: html_url,
          };
        });
        setRepo(newRepo);
      } else {
        setRepo([]);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, [searchTerm, sortOrder, searchOpt, sortNameBool, sortStarBool]);

  useEffect(() => {
    fetchRepo();
  }, [searchTerm, sortOrder, searchOpt, sortNameBool, sortStarBool, fetchRepo]);

  return (
    <AppContext.Provider
      value={{
        loading,
        repo,
        // sortOpt,
        // setSortOpt,
        sortOrder,
        setSortOrder,
        searchTerm,
        setSearchTerm,
        searchOpt,
        setSearchOpt,
        sortNameBool,
        sortStarBool,
        setSortStarBool,
        setSortNameBool,
      }}
    >
      {children}
    </AppContext.Provider>
  ); 
}

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };