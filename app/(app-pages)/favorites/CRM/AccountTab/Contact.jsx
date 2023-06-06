"use client";
import React, { useState } from "react";

function AccountTab({ contactInfo }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex w-full flex-col gap-2">
      <button
        className="text-gray-700 bg-gray-50 hover:bg-gray-100 flex w-full items-center justify-between rounded-md px-4 py-2 text-left text-sm font-medium focus:outline-none"
        onClick={() => setCollapsed(!collapsed)}
      >
        <span>Contact Info</span>
        <svg
          className={`h-5 w-5 transform transition-transform duration-200 ${
            collapsed ? "rotate-180" : ""
          }`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>
      {collapsed && (
        <div className="flex w-full flex-col gap-2">
          <div className="flex w-full flex-col gap-2">
            <hr className="m-0 border-gray-3 p-0" />
            <div className="flex w-full flex-row justify-evenly gap-3">
              <select className="w-full rounded-md px-4 py-2 font-bold transition-all duration-200 hover:bg-gray-3">
                <option value="Email">Email</option>
                <option value="Phone">Phone</option>
                <option value="In Person">In Person</option>
              </select>
              <input
                type="text"
                placeholder="Name of Contact"
                className="w-full rounded-md px-4 py-2 font-bold transition-all duration-200 hover:bg-gray-3"
              />
            </div>
            <textarea
              placeholder="Contact Details"
              className="w-full rounded-md px-4 py-2 font-bold transition-all duration-200 hover:bg-gray-3"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default AccountTab;
