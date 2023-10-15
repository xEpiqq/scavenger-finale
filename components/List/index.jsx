"use client";
import {
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/components/initializeFirebase";
import { useState } from "react";
import { useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import Item from "./Item.jsx";
import CardItem from "./CardItem.jsx";
import PageNav from "./PageNav.jsx";

import ListItem from "@/utils/ListItem.js";

import CRM from "./CRM";

export default function List(params) {
  //////// protect this route so someone with your list id cannot just type it into the url and access your shiz
  //////// Task Complete: not yet

  const [currentPage, setCurrentPage] = useState(0);
  const [searchbar, setSearchbar] = useState("");
  const [selectedSheets, setSelectedSheets] = useState([]);
  const [displayedSheets, setDisplayedSheets] = useState();
  const [openedCRM, setOpenedCRM] = useState(-1);

  let {
    sheetData,
    resultsPerPage = 20,
    list_id,
    user,
    disableSearch = false,
  } = params;

  const canConnectToDB = () => {
    return list_id && user;
  };

  const updateDisplayedSheets = () => {
    if (!sheetData) return;
    // sort sheet data raw by if it has a site link or not
    // then sort by if it has a phone number or not
    // then sort by if it has an email or not
    // then sort by if it has a social or not
    // then sort by if it has an address or not
    const sortedSheetData = sheetData?.sort((a, b) => {
      if (a.favorite && !b.favorite) return -1;
      if (a.siteLink && !b.siteLink) return -1;
      if (!a.siteLink && b.siteLink) return 1;
      if (a.phoneNumber && !b.phoneNumber) return -1;
      if (!a.phoneNumber && b.phoneNumber) return 1;
      if (a.email && !b.email) return -1;
      if (!a.email && b.email) return 1;
      if (a.social && !b.social) return -1;
      if (!a.social && b.social) return 1;
      if (a.address && !b.address) return -1;
      if (!a.address && b.address) return 1;
      return 0;
    });


    setDisplayedSheets(
      sortedSheetData.map((list) => {
        return new ListItem({ ...list, idSheet: list_id, userId: user?.uid });
      }) ?? [] // if userData?.lists is undefined, set it to an empty array instead of undefined
    );
  };


  useEffect(() => {
    updateLastUpdated();
  }, []);

  useEffect(() => {
    search(searchbar);
  }, [searchbar]);

  useEffect(() => {
    updateDisplayedSheets();
  }, []);


  useEffect(() => {
    updateDisplayedSheets();
    // run when sheetData changes and when user changes and at the beginning
  }, [sheetData]);

  useEffect(() => {
    if (!canConnectToDB()) return;
    setDisplayedSheets(
      displayedSheets.map((list) => {
        return new ListItem({
          ...list,
          idSheet: list_id,
          userId: user?.uid,
          list_id: list_id,
        });
      })
    );
  }, [user]);

  if (!sheetData || !displayedSheets) {
    return (
      <div className="mt-10 flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center">
          <Skeleton width={200} height={30} />
          <Skeleton width={200} height={30} />
          <Skeleton width={200} height={30} />
        </div>
      </div>
    );
  }

  async function search(searchkey) {
    const filteredLists = sheetData?.filter((list) => {
      const lowerCaseSearchKey = searchkey.toLowerCase();
      const lowerCaseBizName = (list.name || "").toLowerCase();
      const lowerCaseWebsite = (list.siteLink || "").toLowerCase();
      const lowerCasePhone = (list.phoneNumber || "").toLowerCase();

      // Check if email is a string before calling toLowerCase
      const lowerCaseEmail = (
        typeof list.email === "string" ? list.email : ""
      ).toLowerCase();

      const lowerCaseAddress = (list.address || "").toLowerCase();

      return (
        lowerCaseBizName.includes(lowerCaseSearchKey) ||
        lowerCaseWebsite.includes(lowerCaseSearchKey) ||
        lowerCasePhone.includes(lowerCaseSearchKey) ||
        lowerCaseEmail.includes(lowerCaseSearchKey) ||
        lowerCaseAddress.includes(lowerCaseSearchKey)
      );
    });

    setDisplayedSheets(filteredLists);
    setCurrentPage(0);
    setSelectedSheets([]);
  }

  async function updateLastUpdated() {
    if (!canConnectToDB()) return;
    const userRef = doc(db, `sheets/${list_id}`);
    await updateDoc(userRef, {
      last_updated: new Date(),
    });
  }

  return (
    <>
      <div className="relative h-full w-full overflow-auto">
        {!disableSearch && (
          <div className="bg-inherit flex h-16 w-full items-center justify-start px-5">
            <div>
              <label htmlFor="search" className="sr-only">
                Search
              </label>
              <input
                type="text"
                name="search"
                id="search"
                className="min-w-1/4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xl sm:leading-6"
                placeholder="Search"
                value={searchbar}
                onChange={(e) => setSearchbar(e.target.value)}
              />
            </div>
          </div>
        )}
        <button
          className={`btn-error btn mx-8 my-4 hidden transition-all duration-150 ease-in-out sm:block sm:scale-100
          ${selectedSheets.length <= 0 && "btn-disabled scale-0 sm:hidden"} 
        `}
          onClick={async () => {
            if (selectedSheets.length <= 0) return;
            // need the item of all the selected sheets
            const selectedSheetsData = selectedSheets.map(
              (index) => displayedSheets[index]
            );

            ListItem.deleteAll(selectedSheetsData);
            // clear selected sheets
            setSelectedSheets([]);
          }}
        >
          Delete
        </button>
        <div className="hidden w-full overflow-x-auto sm:block">
          {ListTable(
            displayedSheets,
            selectedSheets,
            setSelectedSheets,
            currentPage,
            resultsPerPage,
            setOpenedCRM,
            openedCRM
          )}
        </div>

        <div className="flex w-full flex-col items-center justify-center gap-1 pt-3 sm:hidden">
          {displayedSheets
            ?.slice(
              currentPage * resultsPerPage,
              (currentPage + 1) * resultsPerPage
            )
            .map((list, index) => (
              <CardItem
                openCRM={() => setOpenedCRM(index)}
                item={list}
                selected={selectedSheets.includes(index)}
                toggleselected={() => {
                  if (selectedSheets.includes(index)) {
                    setSelectedSheets(
                      selectedSheets.filter((i) => i !== index)
                    );
                  } else {
                    setSelectedSheets([...selectedSheets, index]);
                  }
                }}
              />
            ))}
        </div>

        <PageNav
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          resultsPerPage={resultsPerPage}
          itemCount={displayedSheets?.length}
        />
        {openedCRM >= 0 && (
          <CRM
            closeCRM={() => {
              displayedSheets[openedCRM].updateIfChanged();
              setOpenedCRM(-1);
            }}
            item={displayedSheets[openedCRM]}
          />
        )}
      </div>
    </>
  );
}

function ListTable(
  displayedSheets,
  selectedSheets,
  setSelectedSheets,
  currentPage,
  resultsPerPage,
  setOpenedCRM,
) {
  const th_styles =
    "px-6 py-3 text-left text-xs h-18 whitespace-no-wrap font-medium text-gray-500 uppercase tracking-wider";
  return (
    <table className="w-full">
      {/* head */}
      <thead>
        <tr>
          <th className={th_styles}>
            <label>
              <input
                type="checkbox"
                className="checkbox"
                onChange={() => {
                  if (!displayedSheets) return;
                  if (selectedSheets.length === displayedSheets.length) {
                    setSelectedSheets([]);
                  } else {
                    setSelectedSheets(displayedSheets.map((_, i) => i));
                  }
                }}
                checked={selectedSheets.length === displayedSheets?.length}
              />
            </label>
          </th>
          <th className={th_styles}>NAME</th>
          <th className={th_styles}>SSL</th>
          <th className={th_styles}>TEMPLATE</th>
          <th className={th_styles}>PHONE</th>
          <th className={th_styles}>ADDRESS</th>
          <th className={th_styles}>EMAILS</th>
          <th className={th_styles}>SOCIAL</th>
          <th className={th_styles}>CRM</th>
        </tr>
      </thead>

      {displayedSheets
        ?.slice(
          currentPage * resultsPerPage,
          (currentPage + 1) * resultsPerPage
        )
        .map((list, index) => (
          <Item
            openCRM={() => setOpenedCRM(index)}
            item={list}
            selected={selectedSheets.includes(index)}
            toggleselected={() => {
              if (selectedSheets.includes(index)) {
                setSelectedSheets(selectedSheets.filter((i) => i !== index));
              } else {
                setSelectedSheets([...selectedSheets, index]);
              }
            }}
          />
        ))}
    </table>
  );
}
