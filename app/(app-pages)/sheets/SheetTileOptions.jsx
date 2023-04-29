"use client";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TextPrompt from "../components/TextPrompt";
import {
  faEllipsisV,
  faEdit,
  faFileCsv,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

function SheetTileOptions() {
  const [showSheetOptions, setShowSheetOptions] = useState(false);
  const [showRenamePrompt, setShowRenamePrompt] = useState(false);
  const [showDeletePrompt, setShowDeletePrompt] = useState(false);

  const openSheetOptions = (e) => {
    console.log("open sheet options");
    setShowSheetOptions(true);
    e.stopPropagation();
  };

  const closeSheetOptions = () => {
    setShowSheetOptions(false);
  };

  const dropdownMenu = showSheetOptions ? (
    <div className="absolute z-10 mt-1 w-40 rounded-md bg-white shadow-lg">
      <div className="py-1">
        <button
          className="text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex w-full justify-start px-4 py-2 text-sm hover:bg-black hover:text-white"
          onClick={() => {
            setShowSheetOptions(false);
          }}
        >
          <FontAwesomeIcon className="mr-2" icon={faFileCsv} />
          Export as CSV
        </button>
        <button
          className="text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex w-full justify-start px-4 py-2 text-sm hover:bg-black hover:text-white"
          onClick={() => {
            setShowRenamePrompt(true);
            setShowSheetOptions(false);
          }}
        >
          <FontAwesomeIcon className="mr-2" icon={faEdit} />
          Rename
        </button>
        <button
          className="text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex w-full justify-start px-4 py-2 text-sm hover:bg-black hover:text-white"
          onClick={() => {
            setShowDeletePrompt(true);
            setShowSheetOptions(false);
          }}
        >
          <FontAwesomeIcon className="mr-2" icon={faTrash} />
          Delete
        </button>
      </div>
    </div>
  ) : null;

  return (
    <div className="relative">
      <div
        className="mr-2 flex h-2 w-2 items-center justify-center text-gray-1 hover:text-black"
        onClick={(e) => openSheetOptions(e)}
      >
        <FontAwesomeIcon icon={faEllipsisV} />
      </div>
      {dropdownMenu}
      {showSheetOptions && (
        <div
          className="fixed inset-0"
          onClick={() => closeSheetOptions()}
        ></div>
      )}
      {showRenamePrompt && (
        <TextPrompt
          title="Rename Sheet"
          description="Please enter a new name for the sheet."
          placeholder="New Sheet Name"
          buttonText="Rename"
          callBack={(input) => {
            setShowRenamePrompt(false);
          }}
        />
      )}
      {showDeletePrompt && (
        <TextPrompt
          title="Delete Sheet"
          description="Are you sure you want to delete this sheet? This action cannot be undone."
          placeholder="New Sheet Name"
          buttonText="Delete"
          callBack={(input) => {
            setShowDeletePrompt(false);
          }}
        />
      )}
    </div>
  );
}

export default SheetTileOptions;
