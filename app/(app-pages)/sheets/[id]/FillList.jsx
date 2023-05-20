"use client";

import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";

function FillList({
  sendToLambda,
  queryError,
  searching,
  niche,
  setNiche,
  location,
  setLocation
}) {

  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    let intervalId;
    if (searching) {
      intervalId = setInterval(() => {
        setElapsedTime((prevElapsedTime) => prevElapsedTime + 1);
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [searching]);

  return (
    <>
      <div className="w-full  h-full flex justify-center items-center">
      <div className="bg-black opacity-20" />
      <div className="fixed z-10 flex h-auto w-full max-w-120 flex-col rounded-md bg-white text-black shadow-2xl -mt-36">
        <div className="h-36 w-full rounded-tl-md rounded-tr-md border-b-2 border-b-paymentborder bg-white p-8">
          <h1 className="text-3xl font-bold">Start Lead Search</h1>
          <h2 className="text-sm font-medium text-paymenttext opacity-50 mt-3">City + State works best <br/> # of leads depends on industry and location size</h2>
        </div>
        <div className="flex h-80 w-full flex-col border-b-2 border-b-paymentborder bg-paymentmid p-8">
          <h2>
          <span className="underline">HVAC</span> in Chicago, Illinois <span className="text-pbgreytext">↫ Your niche</span> <br/>
          Cleaners in <span className="underline">Moscow, Russia</span> <span className="text-pbgreytext">↫ Location</span> 
          </h2>



          <div className="flex flex-row gap-4 mt-4">
            <div className="w-full">
              <h3 className="mt-5 text-sm font-medium text-paymenttext opacity-50">
                Niche or Industry
              </h3>
              <input className="text-sm w-full mt-2 flex flex-row rounded-md p-2 text-pbblack bg-white focus:outline-none border-paymentboxborder" 
              value={niche} 
              onChange={(e) => { setNiche(e.target.value) }}
              style={{borderWidth: 1}}/>
            </div>
            <div className="w-full">
              <h3 className="mt-5 text-sm font-medium text-paymenttext opacity-50">
                Location
              </h3>
              <input className="text-sm w-full mt-2 flex flex-row rounded-md p-2 text-pbblack bg-white focus:outline-none border-paymentboxborder"
              value={location} 
              onChange={(e) => { setLocation(e.target.value) }}
              style={{borderWidth: 1}}/>
            </div>



          </div>
          {searching && (
            <div className="mt-5">
              <h3 className="mt-0 text-sm font-medium text-paymenttext opacity-50">
                Takes about 22s, refresh and change search if it takes too long — <span className="text-pbblack">{elapsedTime}</span>
              </h3>
              <Skeleton className="mt-4 flex w-full flex-row rounded-md border border-paymentboxborder bg-white p-3 text-paymenttext" />
            </div>
          )}

      {queryError && (
        <h2 className="text-deleteicon text-xs italic mt-10">
          {queryError}
        </h2>
      )}

        </div>

        <div className="h-22 flex w-full flex-row items-center justify-between bg-transparent p-4">
          <button className="border-paymentboxborder border rounded-md w-30 px-4 h-11 text-paymenttext font-semibold text-sm opacity-40 cursor-default">
            Cancel
          </button>
          <button className="w-30 h-11 rounded-md bg-black px-4 text-sm font-semibold text-black hover:opacity-80 transition duration-200" 
          onClick={sendToLambda}
          style={{color:"white"}}>
            Search
          </button>
        </div>
      </div>
    </div>
  </>
  );
}

export default FillList;






{/* <>
<input 
className="text-gray-700 focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight
text-white focus:outline-none" id="business-search" type="text" placeholder="Enter business name" />

{queryError && (
  <p className="text-red-500 text-xs italic">
    {queryError}
  </p>
)}
{searching ? (
  <Skeleton className="rounded bg-black px-4 py-2" containerClassName="w-52 h-10" >
    Submit 
  </Skeleton>
) : (
  <button
    className="hover:bg-gray-900 focus:shadow-outline rounded bg-black px-4 py-2 font-bold text-white hover:opacity-75 focus:outline-none w-52 h-10"
    type="button" > Submit
  </button>
)}
</> */}