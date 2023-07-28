"use client";
import react from "react";
import { useState, useEffect, useRef } from "react";

import AccountTab from "./AccountTab";
import AuthUsersTab from "./AuthUsersTab";
import {
  getFirestore,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { app, db } from "../../../../../components/initializeFirebase";
import { v4 as uuidv4 } from "uuid";

function CRM({ item, closeCRM }) {
  const OPEN_SPEED = 150;

  const inputRef = useRef(null); // Create a ref for the input element

  const [name, setName] = useState(item.name);


  const [tabState, setTabState] = useState(1);

  const [isShown, setIsShown] = useState(false);
  const [pencilClicked, setPencilClicked] = useState(false);
  const [targetIndex, setTargetIndex] = useState(null);
  const [listsArray, setListsArray] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);

  const [changedFlag, setChangedFlag] = useState(false);

  console.log("closeCRM", closeCRM);

  // const userRef = doc(db, `sheets/${id}`);

  // useEffect(() => {
  //   const fetchTargetIndex = async () => {
  //     const userSnapshot = await getDoc(userRef);
  //     const fetchedListsArray = userSnapshot.data().lists;
  //     setListsArray(fetchedListsArray);
  //     const index = fetchedListsArray.findIndex(list => list.obj === object_id);
  //     setTargetIndex(index);
  //   };
  //   fetchTargetIndex();
  // }, [id, object_id]);

  useEffect(() => {
    setIsShown(false);
    setTimeout(() => {
      setIsShown(true);
    }, OPEN_SPEED);
    console.log("isShown", isShown);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.keyCode === 27) {
        closeCRM();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeCRM]);

  function nameFocus() {
    setPencilClicked(true);
    inputRef.current.focus();
  }

  async function renameSubmit() {
    setPencilClicked(false);
  }

  async function deleteItem() {
    closeCRM();
    // TODO: delete
    item.delete();
  }

  useEffect(() => {
    item.name = name;
    item.changedFlag = true;
  }, [name]);

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
            closeCRM();
          }, OPEN_SPEED);
        }}
      ></div>

      <div
        className={`fixed right-0 top-0 z-50 h-full min-w-fit bg-gray-6 shadow-md ${
          isShown ? "translate-x-150" : "translate-x-full"
        } transition-transform duration-150 `}
        style={{ width: "43.75rem" }}
      >
        <div className="flex w-full flex-row items-center justify-between bg-pbsecondbg px-8 py-4">
          {!pencilClicked && (
            <div>
              <h1 className="text-md flex items-center py-3 font-medium">
                {name}
                <img
                  src="/pencil.png"
                  className="ml-4 h-4 cursor-pointer hover:opacity-70"
                  onClick={nameFocus}
                />
              </h1>
            </div>
          )}

          <div>
            <h1 className="flex items-center py-3 text-lg font-light">
              <input
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    renameSubmit();
                  }
                }}
                value={name}
                ref={inputRef}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                className={`bg-pbsecondbg text-lg outline-none ${pencilClicked ? "w-96" : "w-0"}`}
              />
              {pencilClicked && (
                <div
                  className="fixed bottom-0 left-0 z-40 h-screen w-screen"
                  onClick={() => {
                    renameSubmit();
                  }}
                />
              )}
            </h1>
          </div>

          {deleteModal ? (
            <div
              className="flex h-8 w-8 cursor-pointer flex-row items-center justify-center gap-0.5 rounded-full bg-pbwhitebtnhover"
              onClick={() => {
                setDeleteModal(false);
              }}
            >
              <div className="h-0.5 w-0.5 rounded-full bg-pbblack" />
              <div className="h-0.5 w-0.5 rounded-full bg-pbblack" />
              <div className="h-0.5 w-0.5 rounded-full bg-pbblack" />
            </div>
          ) : (
            <div
              className="flex h-8 w-8 cursor-pointer flex-row items-center justify-center gap-0.5 rounded-full hover:bg-pbwhitebtnhover"
              onClick={() => {
                setDeleteModal(true);
              }}
            >
              <div className="h-0.5 w-0.5 rounded-full bg-pbblack" />
              <div className="h-0.5 w-0.5 rounded-full bg-pbblack" />
              <div className="h-0.5 w-0.5 rounded-full bg-pbblack" />
            </div>
          )}

          {deleteModal && (
            <div
              className="fixed inset-0 z-50"
              onClick={() => setDeleteModal(false)}
            >
              <div
                className="absolute right-4 top-16 mb-1 flex w-36 flex-col items-center overflow-hidden rounded-md border-pblines bg-white p-1 shadow-sm transition duration-300"
                onClick={(e) => e.stopPropagation()}
                style={{ borderWidth: 1 }}
              >
                <div
                  className="m-1 mb-0 flex w-full items-center justify-start rounded-md p-1 transition duration-150 hover:bg-pbiconhover"
                  onClick={duplicate}
                >
                  <img
                    src="/duplicate.svg"
                    className="ml-2 h-4 w-4"
                    alt="Logout"
                  />
                  <div className="w-full">
                    <button
                      className="hover:bg-gray-100 px-4 py-2 text-left text-xs focus:outline-none"
                      onClick={() => {
                        setDeleteModal(false);
                      }}
                    >
                      <div className="flex items-center">
                        <div>Duplicate</div>
                      </div>
                    </button>
                  </div>
                </div>
                <div
                  className="m-1 mt-0 flex w-full items-center justify-start rounded-md p-1 transition duration-150 hover:bg-pbiconhover"
                  onClick={deleteItem}
                >
                  <img
                    src="/redtrash.svg"
                    className="ml-2 h-4 w-4"
                    alt="Delete icon"
                  />
                  <div className="w-full">
                    <button className="hover:bg-gray-100 px-4 py-2 text-left text-xs focus:outline-none">
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
          <div className="flex h-9 flex-row justify-around px-3">
            <button
              onClick={() => setTabState(1)}
              className={`${
                tabState === 1
                  ? "bg-white text-black"
                  : "border-none bg-transparent text-pbcrmopen"
              } absolute left-0 z-10 -mb-0.5 ml-8 h-12 w-80 rounded-t-md
                border-l border-r border-t border-pbiconhover px-6 py-2 text-sm transition-all duration-200 hover:bg-pbiconhover`}
            >
              {" "}
              Basic Info
            </button>

            <button
              onClick={() => setTabState(2)}
              className={`${
                tabState === 2
                  ? "bg-white text-black"
                  : "border-none bg-transparent text-pbcrmopen"
              } absolute right-0 z-10 -mb-0.5 mr-8 h-12 w-80 rounded-t-md
                border-l border-r border-t border-pbiconhover px-6 py-2 text-sm transition-all duration-200 hover:bg-pbiconhover`}
            >
              {" "}
              More Metrics
            </button>
          </div>

          <div className="mt-3 flex h-full w-full flex-col border-t border-pbiconhover bg-white">
            {tabState === 1 ? (
              <AccountTab item={item} closeCRM={closeCRM} />
            ) : (
              <AuthUsersTab />
            )}
          </div>
        </div>
        <div className="flex flex-col"></div>
      </div>
    </>
  );
}

export default CRM;
