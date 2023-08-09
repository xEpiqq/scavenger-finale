"use client";

import react from "react";
import { useState } from "react";

function PageNav({ setCurrentPage, currentPage, itemCount, resultsPerPage }) {
  const page_amount = Math.ceil(itemCount / resultsPerPage);
  return (
    <div className="sticky bottom-0 right-0 mt-2 flex w-full bg-pbsecondbg items-center justify-center px-6 py-3">
      <div className="flex w-full max-w-md items-center flex-row justify-between">
        <button
          className="btn-primary btn"
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 0}
        >
          {" "}
          {"< Prev"}{" "}
        </button>
        Current Page: {currentPage + 1} / {page_amount}
        <button
          className="btn-primary btn"
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === Math.floor(itemCount / resultsPerPage)}
        >
          {"Next >"}
        </button>
      </div>
    </div>
  );
}

export default PageNav;
