import React, { useState, useEffect } from 'react';
import { Pagination } from 'react-bootstrap';

const TablePaginate = ({ totalPages, currentPage, onPageChange }) => {
  const [pageNumbers, setPageNumbers] = useState([]);

  useEffect(() => {
    const visiblePages = getVisiblePages(currentPage, totalPages);
    setPageNumbers(visiblePages);
  }, [totalPages, currentPage]);

  const getVisiblePages = (current, total) => {
    setPageNumbers([]);
    let pages = [];

    if (total <= 7) {
      for (let i = 1; i <= total; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      pages.push(2);

      if (current < 3 && current > total - 2) {
        pages.push("...");
      }else{
        if (current == 3) {
          pages.push(3);
        }else if (current > 3) {
          pages.push("...");
        }
  
        if (current > 3 && current < total - 2) {
          pages.push(current);
        }
  
        if (current == total - 2) {
          pages.push(total - 2);
        }else if(current < total - 2){
          pages.push("...");
        }
      }

      pages.push(total - 1);
      pages.push(total);
    }
    return pages;
  };

  return (
    <Pagination className="custom-paginate justify-content-center m-0">
      {/* <Pagination.Prev
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      /> */}

      {pageNumbers.map((number, index) => (
        number === "..." ? (
          <Pagination.Ellipsis disabled key={index} />
        ) : (
          <Pagination.Item
            key={index}
            active={number === currentPage}
            onClick={() => onPageChange(number)}
          >
            {number}
          </Pagination.Item>
        )
      ))}

      {/* <Pagination.Next
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      /> */}
    </Pagination>
  );
};

export default TablePaginate;
