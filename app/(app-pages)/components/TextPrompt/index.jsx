"use client";

import react from "react";
import { useState } from "react";

function TextPrompt({ title, description, placeholder, buttonText, callBack }) {
  const [input, setInput] = useState("");
  return (
    <div className="fixed left-0 top-0 z-50 h-screen w-screen bg-darken-1">
      <div
        className="fixed left-1/2 top-1/2 flex w-2/4 max-w-screen-md -translate-x-1/2 -translate-y-1/2 transform flex-col bg-white"
        style={{
          boxShadow:
            "0 0 10px rgba(0, 0, 0, 0.1), 0 0 20px rgba(0, 0, 0, 0.2), 0 0 30px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.4)",
        }}
      >
        <div className="flex flex-col justify-between gap-3 p-6">
          <h3 className="text-lg">
            <b>{title}</b>
          </h3>
          <p className="text-sm">{description}</p>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={placeholder}
            className="rounded-md border border-gray-3 bg-gray-6 p-2 active:border-gray-2 "
          />
        </div>
        <div className="flex flex-row items-center justify-between bg-gray-4 p-3 pb-1 pt-1">
          <p className="text-sm text-gray-2">
            Please use 32 characters at maximum.
          </p>
          <button
            className="rounded-md border bg-black p-2 pl-4 pr-4 text-sm text-white transition duration-200 ease-in-out hover:bg-white hover:text-black"
            onClick={() => callBack(input)}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default TextPrompt;
