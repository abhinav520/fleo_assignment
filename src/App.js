import React from "react";
import SearchForm from "./SearchForm";
import RepositoryList from "./RepositoryList";
function App() {
  return (
    <>
      <div className="navbar ">
        <h1>Github Repositories</h1>
      </div>
      <main>
        <SearchForm />
        <RepositoryList />
      </main>
    </>
  );
  
}

export default App;
