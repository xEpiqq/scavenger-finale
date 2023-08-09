"use client";

import react, { useEffect, useRef } from "react";
import { useState } from "react";

function TextPrompt({ title, description, placeholder, buttonText, callBack, callBackClose }) {
  const [input, setInput] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <>
    <div className="fixed left-0 top-0 z-30 h-screen w-screen">
      <div className="fixed left-0 top-0 z-20 h-screen w-screen bg-darken-1" onClick={() => callBackClose()} />
      
      <div
        className="fixed left-0 top-0 py-16 sm:pt-0 h-full w-full sm:h-fit sm:left-1/2 sm:top-1/2 flex sm:w-2/4 max-w-screen-md sm:-translate-x-1/2 sm:-translate-y-1/2 transform flex-col bg-white shadow-md rounded-md z-30 sm:-mt-10" >
        <div className="flex flex-col justify-between gap-3 p-6">
          <h3 className="text-lg">
            <b>{title}</b>
          </h3>
          <p className="text-sm">{description}</p>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                callBack(input);
              }
            }}
            placeholder={placeholder}
            className="rounded-md border-0 text-sm border-pblines mt-2 bg-white p-2 focus:outline-none focus:bg-pbsecondbg transition duration-150 ease-in-out"
            style={{ borderWidth: 1 }}
            ref={inputRef}
          />
        </div>
        <div className="flex flex-row items-center absolute bottom-0 w-full justify-between bg-pbwhitebtnhover rounded-br-md rounded-bl-md p-4">
          <p className="text-sm text-pbblack">
            Please use 32 characters at maximum.
          </p>
          <button className="rounded-md border bg-black p-2 pl-4 pr-4 text-sm text-white transition duration-200 ease-in-out hover:bg-white hover:text-black" onClick={() => callBackClose()}>
            Cancel
          </button>
          <button
            className="rounded-md border bg-black p-2 pl-4 pr-4 text-sm text-white transition duration-200 ease-in-out hover:bg-white hover:text-black"
            onClick={() => callBack(input)}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
    </>
  );
}

export default TextPrompt;
