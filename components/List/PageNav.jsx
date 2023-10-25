"use client"
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import {useEffect} from "react"

export default function PageNav({
  setCurrentPage,
  currentPage,
  itemCount,
  resultsPerPage,
}) {
  console.log(Math.ceil(itemCount /resultsPerPage))
  const totalPages = Math.ceil(itemCount /resultsPerPage) - 1;

  useEffect(() => {
    // scroll to the bottom of the page
    window.scrollTo(0,document.body.scrollHeight);
  }, [currentPage]);

  const generatePageNumbers = () => {
    const pageNumbers = [];
    const limit = 5;
    let start = Math.max(1, currentPage - Math.floor(limit / 2));
    let end = Math.min(totalPages, start + limit - 1);

    // Adjust the 'end' value to stay within the total pages
    if (end - start + 1 < limit) {
      start = Math.max(1, end - limit + 1);
    }

    for (let i = start; i <= end; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  console.log(totalPages);

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          href="#page-bottom"
          onClick={() => setCurrentPage(currentPage - 1)}
          className="hover:bg-gray-50 relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700"
        >
          Previous
        </button>
        <button
          href="#page-bottom"
          onClick={() => setCurrentPage(currentPage + 1)}
          className="hover:bg-gray-50 relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700"
        >
          Next
        </button>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing{" "}
            <span className="font-medium">
              {currentPage * resultsPerPage - resultsPerPage + 1}
            </span>{" "}
            to{" "}
            <span className="font-medium">
              {currentPage * resultsPerPage < itemCount
                ? currentPage * resultsPerPage
                : itemCount}
            </span>{" "}
            of <span className="font-medium">{itemCount}</span> results
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <button
              onClick={() =>
                setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : 1))
              }
              href="#page-bottom"
              className="hover:bg-gray-50 relative inline-flex items-center rounded-l-md px-4 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            {generatePageNumbers().map((pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => setCurrentPage(pageNumber)}
                href="#page-bottom"
                className={`${
                  currentPage === pageNumber
                    ? "relative bg-indigo-600 text-white"
                    : "hover:bg-gray-50"
                } inline-flex items-center px-4 py-2 font-mono text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0`}
              >
                {pageNumber}
              </button>
            ))}
            <button
              href="#page-bottom"
              onClick={() =>
                setCurrentPage((prevPage) =>
                  prevPage < totalPages ? prevPage + 1 : totalPages
                )
              }
              className="hover-bg-gray-50 relative inline-flex items-center rounded-r-md px-4 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            <a id="page-bottom"/>
          </nav>
        </div>
      </div>
    </div>
  );
}
