"use client";
import react from "react";
import { useState, useEffect, useRef } from "react";

import AccountTab from "./AccountTab";
import AuthUsersTab from "./AuthUsersTab";
import { getFirestore, doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import {app, db } from '../../../../../components/initializeFirebase'
import { v4 as uuidv4 } from 'uuid';

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
  const OPEN_SPEED = 150;

  const inputRef = useRef(null); // Create a ref for the input element

  const [tabState, setTabState] = useState(1);
  const [isShown, setIsShown] = useState(false);
  const [pencilClicked, setPencilClicked] = useState(false)
  const [tempName , setTempName] = useState(name)
  const [hidden, setHidden] = useState("w-0")
  const [targetIndex, setTargetIndex] = useState(null);
  const [listsArray, setListsArray] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const userRef = doc(db, `sheets/${id}`);

  useEffect(() => {
    const fetchTargetIndex = async () => {
      const userSnapshot = await getDoc(userRef);
      const fetchedListsArray = userSnapshot.data().lists;
      setListsArray(fetchedListsArray);
      const index = fetchedListsArray.findIndex(list => list.obj === object_id);
      setTargetIndex(index);
    };
    fetchTargetIndex();
  }, [id, object_id]);


  useEffect(() => {
    setIsShown(false);
    setTimeout(() => {
      setIsShown(true);
    }, OPEN_SPEED);
    console.log("isShown", isShown);
  }, []);



  function nameFocus() {
    setHidden("w-96")
    setPencilClicked(true)
    inputRef.current.focus();
  }

  async function rename() {
    setHidden("w-0")
    setPencilClicked(false)
    if (targetIndex !== -1) { listsArray[targetIndex].biz = tempName }
    await updateDoc(userRef, { lists: listsArray })
  }

  async function deleteItem() {
    setOpenCRM(false);
    if (targetIndex !== -1) {
      listsArray.splice(targetIndex, 1); // Remove the object at targetIndex
      await updateDoc(userRef, { lists: listsArray });
    }
  }
  

  async function duplicate() {
    setOpenCRM(false);
    if (targetIndex !== -1) {
      const duplicateObj = { ...listsArray[targetIndex] };
      duplicateObj.obj = uuidv4();
      listsArray.splice(targetIndex + 1, 0, duplicateObj); // Insert duplicated object at targetIndex + 1
      await updateDoc(userRef, { lists: listsArray });
    }
  }

  return (
    <>
      <div
        className={`fixed left-0 top-0 z-40 block h-full w-full bg-pbcrmopen max-sm:hidden ${
          isShown ? "opacity-40" : "opacity-0"
        } transition-opacity duration-500 ease-in-out`}
        onClick={(e) => {
          e.stopPropagation();
          setIsShown(false);
          // wait for animation to finish
          setTimeout(() => {
            setOpenCRM(false);
          }, OPEN_SPEED);
        }}
      ></div>

      <div
        className={`fixed right-0 top-0 z-50 h-full min-w-fit shadow-md bg-gray-6 ${
          isShown ? "translate-x-150" : "translate-x-full"
        } transition-transform duration-150 `}
        style={{ width: "43.75rem"}}
      >
      
      <div className="bg-pbsecondbg flex w-full flex-row items-center justify-between px-8 py-4">


      { !pencilClicked &&
        (<div>
          <h1 className="text-lg font-light py-3 flex items-center">
            {name}
            <img src='/pencil.png' className="ml-4 h-4 hover:opacity-70 cursor-pointer" onClick={nameFocus} />
          </h1>
        </div>)}

        <div>
          <h1 className="text-lg font-light py-3 flex items-center">
            <input onKeyDown={(e) => { if (e.key === 'Enter') { rename() }}}
            value={tempName} ref={inputRef} onChange={(e) => {setTempName(e.target.value)}} className={`bg-pbsecondbg outline-none text-lg ${hidden}`} />
            {pencilClicked && (<div className="w-screen h-screen fixed left-0 bottom-0 z-40" onClick={() => {rename()}}/>) }
          </h1>
        </div>


          {deleteModal ? (
                  <div className="flex flex-row items-center gap-0.5 bg-pbwhitebtnhover w-8 h-8 rounded-full justify-center cursor-pointer" onClick={() => {setDeleteModal(false)}}>
                    <div className="rounded-full w-0.5 h-0.5 bg-pbblack"/>            
                    <div className="rounded-full w-0.5 h-0.5 bg-pbblack"/>            
                    <div className="rounded-full w-0.5 h-0.5 bg-pbblack"/>
                  </div> ) : (
                    <div className="flex flex-row items-center gap-0.5 hover:bg-pbwhitebtnhover w-8 h-8 rounded-full justify-center cursor-pointer" onClick={() => {setDeleteModal(true)}}>
                    <div className="rounded-full w-0.5 h-0.5 bg-pbblack"/>            
                    <div className="rounded-full w-0.5 h-0.5 bg-pbblack"/>            
                    <div className="rounded-full w-0.5 h-0.5 bg-pbblack"/>
                  </div>
                  )
          }

          {deleteModal && (
            <div className="fixed inset-0 z-50" onClick={() => setDeleteModal(false)} >
                <div className="absolute top-16 right-4 w-36 rounded-md overflow-hidden border-pblines bg-white mb-1 flex items-center flex-col p-1 shadow-sm duration-300 transition"
                    onClick={(e) => e.stopPropagation()} style={{ borderWidth: 1 }} >
                    <div className="flex items-center justify-start w-full hover:bg-pbiconhover rounded-md p-1 m-1 mb-0 transition duration-150" onClick={duplicate}>
                        <img src="/duplicate.svg" className="w-4 h-4 ml-2" alt="Logout" />
                        <div className="w-full">
                            <button className="py-2 px-4 hover:bg-gray-100 focus:outline-none text-xs text-left" onClick={() => {setDeleteModal(false)}} >
                                <div className="flex items-center">
                                    <div>Duplicate</div>
                                </div>
                            </button>
                        </div>
                    </div>
                    <div className="flex items-center justify-start w-full hover:bg-pbiconhover rounded-md p-1 m-1 mt-0 transition duration-150" onClick={deleteItem}>
                        <img src="/redtrash.svg" className="w-4 h-4 ml-2" alt="Delete icon"/>
                        <div className="w-full">
                            <button className="py-2 px-4 hover:bg-gray-100 focus:outline-none text-xs text-left">
                                <div className="flex items-center">
                                    <div className="text-deleteicon">Delete</div>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )}






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

// { !pencilClicked &&
//   (<div>
//     <h1 className="text-lg font-light py-3 flex items-center">
//       Name: {name}
//       <img src='/pencil.png' className="ml-4 h-4 hover:opacity-70 cursor-pointer" onClick={nameFocus} />
//     </h1>
//   </div>)}

//   <div>
//     <h1 className="text-lg font-light py-3 flex items-center">
//       <input value={tempName} ref={inputRef} onChange={(e) => {setTempName(e.target.value)}} className="absolute z-50 bg-pbsecondbg outline-none" />
//       {pencilClicked && (<div className="w-screen h-screen fixed z-40" onClick={() => {rename()}}/>) }
//     </h1>
//   </div>