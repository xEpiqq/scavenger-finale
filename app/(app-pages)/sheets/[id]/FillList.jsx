"use client";

import React, { useState } from "react";
import Skeleton from "react-loading-skeleton";

function FillList({
  sendToLambda,
  searchQuery,
  setSearchQuery,
  queryError,
  searching,
}) {
  return (
    <>
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-screen items-center justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
          <div className="bg-gray-500 fixed inset-0 bg-opacity-75 transition-opacity"></div>
          <div className="inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle">
            <div className="bg-gray-100 px-4 py-5 sm:p-6 sm:pb-4">
              <div className="mb-4">
                <label
                  className="text-gray-700 mb-2 block font-bold"
                  htmlFor="business-search"
                >
                  Business Search
                </label>
                <input
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                  }}
                  className="text-gray-700 focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-white focus:outline-none"
                  id="business-search"
                  type="text"
                  placeholder="Enter business name"
                />
              </div>
              <div className="flex flex-row justify-between items-center w-full">
                {queryError && (
                  <p className="text-red-500 text-xs italic">{queryError}</p>
                )}
                {searching ? (
                  <Skeleton className="rounded bg-black px-4 py-2" containerClassName="w-52 h-10" >Submit </Skeleton>
                ) : (
                  <button
                    onClick={sendToLambda}
                    className="hover:bg-gray-900 focus:shadow-outline rounded bg-black px-4 py-2 font-bold text-white hover:opacity-75 focus:outline-none w-52 h-10"
                    type="button"
                  >
                    Submit
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FillList;
