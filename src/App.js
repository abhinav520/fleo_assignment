import React, { useState, useEffect } from "react";
import SearchForm from "./SearchForm";
import RepositoryList from "./RepositoryList";
function App() {
  return(
    <main><SearchForm /><RepositoryList /></main>
  );
  
}

export default App;
