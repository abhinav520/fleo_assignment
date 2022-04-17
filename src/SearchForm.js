import React, { useState } from 'react'
import { useGlobalContext } from './context'
import { FaSortAmountDown } from "react-icons/fa";
import { FaSortAmountUp } from "react-icons/fa";

export default function SearchForm() {
  const {
    setSearchTerm,
    sortOrder,
    setSortOrder,
    searchOpt,
    setSearchOpt,
    sortNameBool,
    sortStarBool,
    setSortStarBool,
    setSortNameBool,
  } = useGlobalContext();
  const searchValue=React.useRef('');

  React.useEffect(() => {
    searchValue.current.focus()
  }, []);

  function searchRepo() {
    setSearchTerm(searchValue.current.value)
  }
  function handleSubmit(e) {
    e.preventDefault()
  }
  const [chkStar,setChkStar]=useState(false);
  const [chkName,setChkName]=useState(false);
  return (
    <section className="section search">
      <form className="search-form" onSubmit={handleSubmit}>
        <div className="form-control">
          <div className="select">
            <select
              value={searchOpt}
              onChange={(e) => setSearchOpt(e.target.value)}
            >
              <option value="language">Enter language of repositories</option>
              <option value="name">Enter name of repositories</option>
            </select>
          </div>
          {/* <label htmlFor="name">Enter language of repositories</label> */}
          <input
            type="text"
            name="name"
            id="name"
            ref={searchValue}
            onChange={searchRepo}
          />
        </div>
        <div className="filter">
          <div>Sort by : </div>
          <div>
            <label htmlFor="name"> Name </label>
            <input
              type="checkbox"
              id="name"
              name="Name"
              value="name"
              aria-checked={chkName}
              onClick={() => {
                setSortNameBool(!sortNameBool);
                setChkName(!chkName);
              }}
            />
          </div>
          <div>
            <label htmlFor="stars"> Stars </label>
            <input
              type="checkbox"
              id="stars"
              name="Star"
              value="0"
              aria-checked={chkStar}
              onClick={() => {
                setSortStarBool(!sortStarBool);
                setChkStar(!chkStar);
              }}  
            />
          </div>

          {sortOrder === "desc" && (
            <span>
              <FaSortAmountDown onClick={() => setSortOrder("asc")} />
            </span>
          )}
          {sortOrder === "asc" && (
            <div>
              <FaSortAmountUp onClick={() => setSortOrder("desc")} />
            </div>
          )}
        </div>
      </form>
    </section>
  );
}

