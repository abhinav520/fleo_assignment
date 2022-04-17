import React, {useState} from 'react'
import Loading from './Loading'
import Repository from './Repository';
import { useGlobalContext } from './context'
import ReactPaginate from "react-paginate";

export default function RepositoryList() {
  const {repo, loading}=useGlobalContext();
  
  // const [users, setUsers] = useState(repo.slice(0, 50));
  const [pageNumber, setPageNumber] = useState(0);

  const usersPerPage = 9;
  const pagesVisited = pageNumber * usersPerPage;
  
  const displayUsers = repo
    .slice(pagesVisited, pagesVisited + usersPerPage)
    .map((item) => {
      return (
       <Repository key={item.id} {...item} />
      );
    });

  const pageCount = Math.ceil(repo.length / usersPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  if (loading) {
    return <Loading />;
  }
  if (repo.length < 1) {
    return (
      <h2 className="section-title">
        No Repositories matched your search criteria
      </h2>
    );
  }
  return (
    <section className="section">
      {/* <h2 className="section-title">Repository</h2> */}
      <div className="repo-center">
        {/* {repo.map((item) => {
          return <Repository key={item.id} {...item} />;
        })} */}
        {displayUsers}
      </div>
      <ReactPaginate
        breakLabel="..."
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"paginationBttns"}
        previousLinkClassName={"previousBttn"}
        nextLinkClassName={"nextBttn"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
        // renderOnZeroPageCount={null}
      />
    </section>
  );
} 


