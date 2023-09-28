"use client";
import { useState, useEffect, useRef } from "react";

import AccountTab from "./AccountTab";
import AuthUsersTab from "./AuthUsersTab";
import EmailTab from "./EmailTab";

function CRM({ item, closeCRM }) {
  const OPEN_SPEED = 150;

  const inputRef = useRef(null); // Create a ref for the input element

  const [name, setName] = useState(item.name);

  const [tabState, setTabState] = useState(1);

  const [isShown, setIsShown] = useState(false);
  const [pencilClicked, setPencilClicked] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  useEffect(() => {
    setIsShown(false);
    setTimeout(() => {
      setIsShown(true);
    }, OPEN_SPEED);
  }, []);

  useEffect(() => {
    console.log("Here");

    function handleScroll(event) {
      if (isShown) {
        event.preventDefault();
      }
    }

    if (isShown) {
      // Lock body scroll when the component is shown
      document.body.style.overflow = 'hidden';
    } else {
      // Restore body scroll when the component is hidden
      document.body.style.overflow = 'visible';
    }

  }, [isShown]);

  // use effect when i press the back button
  useEffect(() => {
    window.history.pushState(null, null, window.location.pathname);
    window.addEventListener("popstate", smoothClose);
    return () => {
      window.removeEventListener("popstate", smoothClose);
    };
  }, [smoothClose]);


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

  function smoothClose(e) {
    if (e) e.stopPropagation();
    setIsShown(false);
    setTimeout(() => {
      closeCRM();
    }, OPEN_SPEED);
  }

  async function renameSubmit() {
    setPencilClicked(false);
  }

  async function deleteItem() {
    smoothClose();
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
        onClick={smoothClose}
      ></div>

      <div
        className={`fixed right-0 top-0 z-50 h-screen w-full min-w-fit flex flex-col bg-gray-6 shadow-md sm:w-[43.75rem] ${
          isShown ? "translate-x-150" : "translate-x-full"
        } transition-transform duration-150 `}
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
                className={`bg-pbsecondbg text-lg outline-none ${
                  pencilClicked ? "w-96" : "w-0"
                }`}
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
              } absolute left-0 z-10 -mb-0.5 ml-8 h-12 w-1/3 rounded-t-md
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
              } absolute right-0 z-10 -mb-0.5 mr-8 h-12 w-1/3 rounded-t-md
                border-l border-r border-t border-pbiconhover px-6 py-2 text-sm transition-all duration-200 hover:bg-pbiconhover`}
            >
              {" "}
              Email
            </button>
          </div>

          <div className="mt-3 flex h-full max-h-full w-full flex-col border-t border-pbiconhover bg-white">
            <>
              {tabState === 1 ? (
                <AccountTab item={item} closeCRM={smoothClose} />
              ) : (
                <EmailTab item={item} closeCRM={smoothClose} />
              )}
            </>
          </div>
        </div>
        <div className="flex flex-col"></div>
      </div>
    </>
  );
}

export default CRM;
