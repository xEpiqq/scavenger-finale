"use client";

import react from "react";
import { useState, useEffect } from "react";

function AccountTab() {
  const [isActive, setIsActive] = useState(false);
  const handleToggle = () => {
    setIsActive(!isActive);
  };
  return (
    <div className="flex h-full w-full flex-col gap-8 px-9 pt-7 text-sm">
      <input
        type="text"
        placeholder="Follow up date"
        className="w-full rounded-md px-4 py-2 font-bold transition-all duration-200 hover:pblines bg-pbiconhover"
      />
      <div className="flex w-full flex-row justify-evenly gap-3">
        <input
          type="text"
          placeholder="Gatekeeper"
          className="w-full rounded-md px-4 py-2 font-bold transition-all duration-200 hover:pblines bg-pbiconhover"
        />
        <input
          type="text"
          placeholder="Decision Maker"
          className="w-full rounded-md px-4 py-2 font-bold transition-all duration-200 hover:pblines bg-pbiconhover"
        />
      </div>
      <div className="flex flex-row gap-3 w-full">

        <label
          class="inline-block pl-[0.15rem] hover:cursor-pointer"
          for="change-verified"
        >  First Contact?
        </label>
        <input
          class="bg-pblines after:bg-neutral-100 dark:after:bg-neutral-400 mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:checked:bg-primary dark:checked:after:bg-primary dark:focus:before:shadow-[3px_-1px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca]"
          type="checkbox"
          role="switch"
          id="change-password"
        />
      </div>

      <input
        type="text"
        placeholder="Title"
        className=" bg-pbiconhover w-full rounded-md px-4 py-2 font-bold transition-all duration-200 hover:pblines"
      />
      <textarea
        type="text"
        placeholder="Notes"
        className="bg-pbiconhover w-full h-48 rounded-md px-4 py-2 font-bold transition-all duration-200 hover:bg-pblines"
      />

    <div className="w-full h-24 border-t border-pblines absolute bottom-0 left-0 flex justify-end px-7 items-center gap-4" >
      <button className="w-24 h-10 bg-white text-pbblack rounded-md font-semibold text-sm hover:bg-pbiconhover transition duration-75">Cancel</button>      
      <button className="w-36 h-10 bg-pbblack text-white rounded-md font-semibold text-sm hover:bg-pbblackhover transition duration-75">Save changes</button>      
    </div>


    </div>
  );
}

export default AccountTab;
