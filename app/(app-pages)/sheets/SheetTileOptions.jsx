
"use client";
import react from "react";
import SheetTile from "./SheetTile";
import SheetTileNew from "./SheetTileNew";
import PageName from "../components/PageName";
import { app, db } from "../../../components/initializeFirebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth, signOut } from "firebase/auth";
import { getFirestore, doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { useDocument } from 'react-firebase-hooks/firestore';
const auth = getAuth(app);
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TextPrompt from "../components/TextPrompt";
import {
  faEllipsisV,
  faEdit,
  faFileCsv,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

function SheetTileOptions(props) {
  const [user, loading, user_error] = useAuthState(auth);
  const [userDataRaw, loading2, error2] = useDocument(doc(db, `users/${user?.uid}`));
  const userData = userDataRaw?.data()


  const object_id = props.object_id
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

// async function renameInDB(newName) {
//     const userRef = doc(db, `users/${user?.uid}`);
//     const userSnapshot = await getDoc(userRef);
//     console.log(userSnapshot)
//     console.log(newName)
//   }

  async function renameInDB(newName) {
    const userRef = doc(db, `users/${user?.uid}`);
    const userSnapshot = await getDoc(userRef);
    const listsArray = userSnapshot.data().lists;
    const targetIndex = listsArray.findIndex(list => list.object_id === object_id);
    if (targetIndex !== -1) {
      listsArray[targetIndex].list_name = newName;
    }
    await updateDoc(userRef, { lists: listsArray });
  }

  async function deleteFromDB() {
    await deleteDoc(doc(db, "sheets", props.reference));
    const userRef = doc(db, `users/${user?.uid}`);
    const userSnapshot = await getDoc(userRef);
    const listsArray = userSnapshot.data().lists;
    const targetIndex = listsArray.findIndex(list => list.object_id === object_id);

    if (targetIndex !== -1) {
      listsArray.splice(targetIndex, 1); // Remove the object at the targetIndex
      await updateDoc(userRef, { lists: listsArray });
    }


  }
  
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
        className="mr-2 flex h-7 w-4 items-center justify-center text-gray-1 hover:text-black hover:cursor-pointer"
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
            renameInDB(input)
          }}

          callBackClose={() => {
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
            deleteFromDB()
          }}

          callBackClose={() => {
            setShowDeletePrompt(false);
          }}
        />
      )}
    </div>
  );
}

export default SheetTileOptions;
