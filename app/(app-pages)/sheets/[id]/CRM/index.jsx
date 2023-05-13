"use client";
import react from "react";
import { useState, useEffect } from "react";

import AccountTab from "./AccountTab";
import AuthUsersTab from "./AuthUsersTab";

function CRM({
  name,
  link,
  phoneNumber,
  email,
  address,
  screenshot,
  selected,
  toggleselected,
  id,
  object_id,
  setOpenCRM,
}) {
  const [tabState, setTabState] = useState(1);
  const [isShown, setIsShown] = useState(false);

  useEffect(() => {
    setIsShown(false);
    setTimeout(() => {
      setIsShown(true);
    }, 500);
    console.log("isShown", isShown);
  }, []);

  return (
    <>
      <div
        className={`fixed left-0 top-0 z-40 block h-full w-full bg-black opacity-50 max-sm:hidden ${
          isShown ? "opacity-50" : "opacity-0"
        } transition-opacity duration-500 ease-in-out`}
        onClick={(e) => {
          e.stopPropagation();
          setIsShown(false);
          // wait for animation to finish
          setTimeout(() => {
            setOpenCRM(false);
          }, 500);
        }}
      ></div>
      <div
        className={`fixed right-0 top-0 z-50 h-full w-1/3 min-w-fit bg-gray-6 ${
          isShown ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-500 ease-in-out`}
      >
        <div className="flex w-full flex-row items-center justify-between px-8 py-4">
          <h1 className="px-8 py-8 text-lg">
            <b>Edit Record</b>
          </h1>
          <button
            onClick={() => {
              setIsShown(false);
              // wait for animation to finish
              setTimeout(() => {
                setOpenCRM(false);
              }, 500);
            }}
            className="hover:bg-gray-900 focus:shadow-outline rounded bg-black px-4 py-2 font-bold text-white hover:opacity-75 focus:outline-none"
            type="button"
          >
            Close
          </button>
        </div>
        <div className="flex h-full w-full flex-col justify-between">
          <div className="flex flex-row justify-around px-3">
            <button
              onClick={() => setTabState(1)}
              className={`${
                tabState === 1 ? "bg-white text-black" : "bg-transparent"
              } w-full max-w-xs rounded-t-md px-4 py-2 font-bold transition-all duration-200 hover:bg-gray-3`}
            >
              Account
            </button>
            <button
              onClick={() => setTabState(2)}
              className={`${
                tabState === 2 ? "bg-white text-black" : "bg-transparent"
              } w-full max-w-xs rounded-t-md px-4 py-2 font-bold transition-all duration-200 hover:bg-gray-3`}
            >
              Auth Users
            </button>
          </div>
          <div className="flex h-full w-full flex-col bg-white">
            {tabState === 1 ? <AccountTab /> : <AuthUsersTab />}
          </div>
        </div>
        <div className="flex flex-col"></div>
      </div>
    </>
  );
}

export default CRM;
