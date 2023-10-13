"use client";
import { app, db } from "../../../../../components/initializeFirebase";
import { getAuth, signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  getFirestore,
  doc,
  getDoc,
  updateDoc,
  collection,
  addDoc,
} from "firebase/firestore";
import { useDocument } from "react-firebase-hooks/firestore";
import { useState } from "react";
import Item from "../Item.jsx";
import styles from "../page.module.scss";
import { useEffect } from "react";
import PageName from "../../../components/PageName";
import Skeleton from "react-loading-skeleton";
import FillList from "./FillList.jsx";
import Link from "next/link";
import Item2 from "../Item2.jsx";
import CardItem from "../CardItem.jsx";
import PageNav from "../PageNav.jsx";

import ListItem from "../ListItem.js";

const auth = getAuth(app);

function Page({ params }) {
  //////// protect this route so someone with your list id cannot just type it into the url and access your shiz
  //////// Task Complete: not yet

  const resultsPerPage = 20;
  const [currentPage, setCurrentPage] = useState(0);
  const [niche, setNiche] = useState("");
  const [location, setLocation] = useState("");
  const [queryError, setQueryError] = useState("");
  const [searchbar, setSearchbar] = useState("");
  const [searching, setSearching] = useState(false);
  const [selectedSheets, setSelectedSheets] = useState([]);
  const [displayedSheets, setDisplayedSheets] = useState([]);
  const [openedCRM, setOpenedCRM] = useState(-1);

  const [user, loading, user_error] = useAuthState(auth);

  let { id } = params;

  const list_id = id;
  const [sheetDataRaw, loading2, error2] = useDocument(
    doc(db, `sheets/${list_id}`)
  );
  const sheetData = sheetDataRaw?.data();

  const page_amount = Math.floor(sheetData?.lists?.length / resultsPerPage) + 1;

  useEffect(() => {
    updateLastUpdated();
  }, []);

  useEffect(() => {
    search(searchbar);
  }, [searchbar]);

  useEffect(() => {
    console.log("sheetDataRaw", sheetDataRaw?.data());
    if (!sheetDataRaw?.data()?.lists) return;
    // sort sheet data raw by if it has a site link or not
    // then sort by if it has a phone number or not
    // then sort by if it has an email or not
    // then sort by if it has a social or not
    // then sort by if it has an address or not
    const sortedSheetData = sheetDataRaw?.data()?.lists?.sort((a, b) => {
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

    console.log("sortedSheetData", sortedSheetData);

    setDisplayedSheets(
      sortedSheetData.map((list) => {
        return new ListItem({ ...list, idSheet: list_id, userId: user.uid });
      }) ?? [] // if userData?.lists is undefined, set it to an empty array instead of undefined
    );
  }, [sheetDataRaw]);

  useEffect(() => {
    console.log("ERHEHREHRHERHERHREH", user.uid);
    setDisplayedSheets(
      displayedSheets.map((list) => {
        return new ListItem({
          ...list,
          idSheet: list_id,
          userId: user.uid,
        });
      })
    );
  }, [user]);

  async function search(searchkey) {
    const filteredLists = sheetDataRaw?.data().lists?.filter((list) => {
      const lowerCaseSearchKey = searchkey.toLowerCase();
      const lowerCaseBizName = list.name.toLowerCase();
      const lowerCaseWebsite = list.siteLink.toLowerCase();
      const lowerCasePhone = list.phoneNumber.toLowerCase();
      const lowerCaseEmail = list.email.toLowerCase();
      const lowerCaseAddress = list.address.toLowerCase();

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
    const userRef = doc(db, `sheets/${list_id}`);
    await updateDoc(userRef, {
      last_updated: new Date(),
    });
  }

  async function renameInDB(newName) {
    console.log("newName", newName);
    console.log("sheetDataRaw", sheetDataRaw);
    const userRef = doc(db, `users/${user?.uid}`);
    const userSnapshot = await getDoc(userRef);
    const listsArray = userSnapshot.data().lists;
    const targetIndex = listsArray.findIndex(
      (list) => list.list_ref === list_id
    );
    if (targetIndex !== -1) {
      listsArray[targetIndex].list_name = newName;
    }
    await updateDoc(userRef, { lists: listsArray });

    const listRef = doc(db, `sheets/${list_id}`);
    await updateDoc(listRef, {
      list_name: newName,
    });
  }

  async function sendToLambda() {
    if (niche === "" || location === "") {
      setQueryError("Niche or Location is empty");
      return;
    }

    let searchQuery = niche + " " + location;
    const query_array = searchQuery.split(" ");
    console.log(query_array);
    searchQuery = searchQuery.replace(/,/g, "");

    if (searchQuery.match(/[^a-zA-Z ]/g)) {
      setQueryError("Search contains numbers or special characters");
      return;
    }

    if (query_array.length < 3) {
      setQueryError("Search needs at least 3 words");
      return;
    }

    const newSearchQuery = niche + " in " + location;
    setSearching(true);
    setQueryError("");

    renameInDB(newSearchQuery);

    const response = await fetch("/api/lambda", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        searchQuery: newSearchQuery,
        the_list_id: list_id,
      }),
    });
    const data = await response.json();
    console.log(data);
    setDisplayedSheets(displayedSheets?.lists);
  }

  async function searchBarQuery(e) {
    setSearchbar(e.target.value);
  }

  if (loading2) return <h1>Loading...</h1>;
  if (error2) return <h1>Error: {error2}</h1>;

  if (sheetData?.lists == 0) {
    return (
      <FillList
        sendToLambda={sendToLambda}
        queryError={queryError}
        searching={searching}
        niche={niche}
        setNiche={setNiche}
        location={location}
        setLocation={setLocation}
      />
    );
  }

  return (
    <>
      <div className={styles.table_wrapper}>
        <div className="hidden h-24 w-full sm:flex">
          <div className="flex h-full w-full flex-row items-center gap-3 bg-pbsecondbg px-7">
            <Link href="/sheets">
              <h2 className="pl-16 text-lg text-pbgreytext">Lists</h2>{" "}
            </Link>
            <h2 className="text-xl text-pbslash"> / </h2>
            <h2 className="w-44 text-lg text-pbblack">
              {sheetData?.list_name}
            </h2>

            <div className="flex h-16 w-full items-center justify-end bg-pbsecondbg">
              <input
                type="text"
                placeholder="Search"
                className="mx-7 h-11 w-1/4 rounded-3xl bg-pbiconhover px-7 text-lg outline-none transition duration-150 focus:bg-pbsearchselect"
                value={searchbar}
                onChange={(e) => {
                  searchBarQuery(e);
                }}
              />
            </div>
          </div>
        </div>
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
          {ListTable(displayedSheets, selectedSheets, setSelectedSheets, currentPage, resultsPerPage, setOpenedCRM, openedCRM)}
        </div>

        <div className="flex w-full flex-col items-center justify-center gap-1 pt-3 sm:hidden">
          {displayedSheets
            ?.slice(
              currentPage * resultsPerPage,
              (currentPage + 1) * resultsPerPage
            )
            .map((list, index) => (
              <>
                <CardItem
                  key={index}
                  openCRM={() => setOpenedCRM(index)}
                  closeCRM={() => {
                    list.updateIfChanged();
                    setOpenedCRM(-1);
                  }}
                  isCRMOpen={openedCRM === index}
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
              </>
            ))}
        </div>

        <PageNav
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          resultsPerPage={resultsPerPage}
          itemCount={displayedSheets?.length}
        />
      </div>
    </>
  );
}

export default Page;
function ListTable(displayedSheets, selectedSheets, setSelectedSheets, currentPage, resultsPerPage, setOpenedCRM, openedCRM) {
  return <table className="table w-full">
    {/* head */}
    <thead>
      <tr>
        <th>
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
                  console.log("yep");
                }
              } }
              checked={selectedSheets.length === displayedSheets?.length} />
          </label>
        </th>
        <th>NAME</th>
        <th>SSL</th>
        <th>TEMPLATE</th>
        <th>PHONE</th>
        <th>ADDRESS</th>
        <th>EMAILS</th>
        <th>SOCIAL</th>
        <th>CRM</th>
      </tr>
    </thead>

    {displayedSheets
      ?.slice(
        currentPage * resultsPerPage,
        (currentPage + 1) * resultsPerPage
      )
      .map((list, index) => (
        <>
          <Item2
            openCRM={() => setOpenedCRM(index)}
            closeCRM={() => {
              list.updateIfChanged();
              setOpenedCRM(-1);
            } }
            isCRMOpen={openedCRM === index}
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
            } } />
        </>
      ))}
  </table>;
}

