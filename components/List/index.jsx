"use client";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/components/initializeFirebase";
import { useState } from "react";
import { useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import Item from "./Item.jsx";
import CardItem from "./CardItem.jsx";
import PageNav from "./PageNav.jsx";
import { useMemo } from "react";

import ListItem from "@/utils/ListItem.js";

import CRM from "./CRM";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function List(params) {
  const [currentPage, setCurrentPage] = useState(0);
  const [searchbar, setSearchbar] = useState("");
  const [selectedSheets, setSelectedSheets] = useState([]);
  const [displayedSheets, setDisplayedSheets] = useState([]);
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

    setDisplayedSheets(
      sheetData.map((list) => {
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
          <div className="bg-inherit flex h-16 w-full items-center justify-start gap-10 px-5">
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
            <button
              className={`visible hidden rounded-full bg-redpill px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 ease-in-out
               hover:bg-sRed sm:block
          ${selectedSheets.length <= 0 && "scale-0"}
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
              Delete{" ("}
              <span className="hidden font-mono sm:inline">
                {selectedSheets.length > 0 && `${selectedSheets.length}`}
              </span>
              {")"}
            </button>
            <button
              className={`hidden rounded-full bg-terquoise-400 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 ease-in-out  hover:bg-terquoise-600 sm:block
             ${selectedSheets.length <= 0 && "scale-0"} `}
              onClick={async () => {
                if (selectedSheets.length <= 0) return;
                // need the item of all the selected sheets
                const selectedSheetsData = selectedSheets.map(
                  (index) => displayedSheets[index]
                );

                ListItem.favoriteAll(selectedSheetsData);
                // clear selected sheets
                setSelectedSheets([]);
              }}
            >
              Favorite{" ("}
              <span className="hidden font-mono sm:inline">
                {selectedSheets.length > 0 && `${selectedSheets.length}`}
              </span>
              {")"}
            </button>
          </div>
        )}

        <div className="hidden w-full overflow-x-auto sm:block">
          {/* {ListTable(
            displayedSheets,
            selectedSheets,
            setSelectedSheets,
            currentPage,
            resultsPerPage,
            setOpenedCRM,
            openedCRM,
            handleSort,
            sortConfig,
          )} */}
          <ListTable
            displayedSheets={displayedSheets}
            selectedSheets={selectedSheets}
            setSelectedSheets={setSelectedSheets}
            currentPage={currentPage}
            resultsPerPage={resultsPerPage}
            setOpenedCRM={setOpenedCRM}
          />
        </div>

        <div className="flex w-full flex-col items-center justify-center gap-1 pt-3 sm:hidden">
          {displayedSheets
            ?.slice(
              currentPage * resultsPerPage,
              (currentPage + 1) * resultsPerPage
            )
            .map((list, index) => (
              <CardItem
                key={list.sheetItemId}
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

function ListTable({
  displayedSheets,
  selectedSheets,
  setSelectedSheets,
  currentPage,
  resultsPerPage,
  setOpenedCRM,
}) {
  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "asc",
  });

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
    setSelectedSheets([]);
  };

  const sortedSheets = useMemo(() => {
    let sortableSheets = [...displayedSheets];
    sortableSheets.sort((a, b) => {
      // favorite sheets first
      if (a.favorite && !b.favorite) {
        return -1;
      }
      if (!a.favorite && b.favorite) {
        return 1;
      }
      let aVal = a[sortConfig.key];
      let bVal = b[sortConfig.key];
      // check if it is a string
      if (aVal && typeof aVal === "string") {
        aVal = aVal.toLowerCase();
      }
      if (bVal && typeof bVal === "string") {
        bVal = bVal.toLowerCase();
      }
      if (aVal < bVal) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (aVal > bVal) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });
    return sortableSheets;
  }, [displayedSheets, sortConfig]);

  console.log(sortConfig);

  const th_styles =
    "px-6 py-3 text-left text-xs h-18 whitespace-no-wrap font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-900 hover:bg-gray-100 rounded-md";
  return (
    <table className="overflow-a w-full">
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
          <th className={th_styles} onClick={() => handleSort("name")}>
            <div className="flex w-full flex-row items-center ">
              NAME{" "}
              <p className={sortConfig.key === "name" ? "" : "invisible"}>
                {sortConfig.direction === "asc" ? "▲" : "▼"}
              </p>
            </div>
          </th>
          <th className={th_styles} onClick={() => handleSort("hasSSL")}>
            <div className="flex w-full flex-row items-center ">
              SSL{" "}
              <p className={sortConfig.key === "hasSSL" ? "" : "invisible"}>
                {sortConfig.direction === "asc" ? "▲" : "▼"}
              </p>
            </div>
          </th>
          <th className={th_styles} onClick={() => handleSort("template")}>
            <div className="g-4 flex w-full flex-row items-center ">
              TEMPLATE{" "}
              <p className={sortConfig.key === "template" ? "" : "invisible"}>
                {sortConfig.direction === "asc" ? "▲" : "▼"}
              </p>
            </div>
          </th>
          <th className={th_styles} onClick={() => handleSort("phoneNumber")}>
            <div className="g-4 flex w-full flex-row items-center ">
              PHONE{" "}
              <p
                className={sortConfig.key === "phoneNumber" ? "" : "invisible"}
              >
                {sortConfig.direction === "asc" ? "▲" : "▼"}
              </p>
            </div>
          </th>
          <th className={th_styles} onClick={() => handleSort("address")}>
            <div className="g-4 flex w-full flex-row items-center ">
              ADDRESS{" "}
              <p className={sortConfig.key === "address" ? "" : "invisible"}>
                {sortConfig.direction === "asc" ? "▲" : "▼"}
              </p>
            </div>
          </th>
          <th className={th_styles} onClick={() => handleSort("emails")}>
            <div className="g-4 flex w-full flex-row items-center ">
              EMAILS{" "}
              <p className={sortConfig.key === "emails" ? "" : "invisible"}>
                {sortConfig.direction === "asc" ? "▲" : "▼"}
              </p>
            </div>
          </th>

          <th className={th_styles + "bg-terquoise-400 "}>SOCIAL</th>
          <th className={th_styles}>CRM</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200 bg-white">
        {sortedSheets
          ?.slice(
            currentPage * resultsPerPage,
            (currentPage + 1) * resultsPerPage
          )
          .map((list, index) => (
            <Item
              key={list.sheetItemId}
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
      </tbody>
    </table>
  );
}
