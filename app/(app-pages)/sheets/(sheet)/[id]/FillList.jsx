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
  setLocation,
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
      <div className="h-full w-full items-center inline-block justify-center bg-white">
        <div className="pointer-events-none bg-black opacity-20" />
        <div className="z-10 flex h-full  w-full flex-col rounded-md bg-white text-black">
          <div className="w-full rounded-tl-md rounded-tr-md border-b-2 border-b-paymentborder bg-white p-8">
            <h1 className="text-3xl font-bold">Start Lead Search</h1>
            <h2 className="mt-3 text-sm font-medium text-paymenttext opacity-50">
              City + State works best <br /> # of leads depends on industry and
              location size
            </h2>
          </div>
          <div className="flex w-full flex-grow flex-col p-8">
            <h2>
              <span className="underline">HVAC</span> in Chicago, Illinois{" "}
              <span className="text-pbgreytext">↫ Your niche</span> <br />
              Cleaners in <span className="underline">Moscow, Russia</span>{" "}
              <span className="text-pbgreytext">↫ Location</span>
            </h2>

            <div className="mt-4 flex flex-col gap-4">
              <div className="w-full">
                <h3 className="mt-5 text-sm font-medium text-paymenttext opacity-50">
                  Niche or Industry
                </h3>
                <input
                  className="mt-2 flex w-full flex-row rounded-md border-paymentboxborder bg-white p-2 text-sm text-pbblack focus:outline-none"
                  value={niche}
                  onChange={(e) => {
                    setNiche(e.target.value);
                  }}
                  style={{ borderWidth: 1 }}
                />
              </div>
              <div className="w-full">
                <h3 className="mt-5 text-sm font-medium text-paymenttext opacity-50">
                  Location
                </h3>
                <input
                  className="mt-2 flex w-full flex-row rounded-md border-paymentboxborder bg-white p-2 text-sm text-pbblack focus:outline-none"
                  value={location}
                  onChange={(e) => {
                    setLocation(e.target.value);
                  }}
                  style={{ borderWidth: 1 }}
                />
              </div>
            </div>
            {searching && (
              <div className="mt-5">
                <h3 className="mt-0 text-sm font-medium text-paymenttext opacity-50">
                  Takes about 22s, refresh and change search if it takes too
                  long — <span className="text-pbblack">{elapsedTime}</span>
                </h3>
                <Skeleton className="mt-4 flex w-full flex-row rounded-md border border-paymentboxborder bg-white p-3 text-paymenttext" />
              </div>
            )}

            {queryError && (
              <h2 className="mt-10 text-xs italic text-deleteicon">
                {queryError}
              </h2>
            )}
          </div>
          <div className="h-22 bottom-0 flex w-full flex-grow-0 flex-row items-center justify-between self-end bg-transparent p-4">
            <button className="w-30 h-11 cursor-default rounded-md border border-paymentboxborder px-4 text-sm font-semibold text-paymenttext opacity-40">
              Cancel
            </button>
            <button
              className="w-30 h-11 rounded-md bg-black px-4 text-sm font-semibold text-black transition duration-200 hover:opacity-80"
              onClick={sendToLambda}
              style={{ color: "white" }}
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default FillList;
