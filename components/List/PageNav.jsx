"use client";

import react from "react";
import { useState } from "react";

function PageNav({ setCurrentPage, currentPage, itemCount, resultsPerPage }) {
  const page_amount = Math.ceil(itemCount / resultsPerPage);

  return (
    <div className="sticky bottom-0 right-0 flex w-full bg-inherit items-center justify-center lg:justify-center px-6 py-3 ">
      <div className={`flex w-full max-w-md items-center flex-row gap-8 sm:justify-center lg:justify-center justify-center mx-20`}>

      { currentPage === 0 ? (
          <>
          <button
            className="px-3 py-2 rounded-md border-black border-[1.5px] opacity-50 cursor-default"
          >
            {"<"}
          </button>
          </>

      ) : (
        <>
        <button 
          className="px-3 py-2 rounded-md border-black border-[1.5px] hover:bg-pbblack hover:text-white"
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          {"<"}
        </button>

        </>
      )}

        {currentPage + 1} / {page_amount}

        <button
          className="px-3 py-2 rounded-md border-black border-[1.5px] hover:bg-pbblack hover:text-white"
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === Math.floor(itemCount / resultsPerPage)}
        >
            {">"}
        </button>
      </div>
    </div>
  );
}

export default PageNav;
