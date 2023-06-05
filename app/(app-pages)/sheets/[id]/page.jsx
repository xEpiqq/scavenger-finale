"use client";
import { app, db } from "../../../../components/initializeFirebase";
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
import Item from "./Item.jsx";
import styles from "./page.module.scss";
import { useEffect } from "react";
import PageName from "../../components/PageName";
import Skeleton from "react-loading-skeleton";
import FillList from "./FillList.jsx";
import Link from "next/link";

import ListItem from "./ListItem.js";

const auth = getAuth(app);

function Page({ params }) {
  //////// protect this route so someone with your list id cannot just type it into the url and access your shiz
  //////// Task Complete: not yet
  ////////

  const resultsPerPage = 20;
  const [currentPage, setCurrentPage] = useState(0);
  const [niche, setNiche] = useState("");
  const [location, setLocation] = useState("");
  const [queryError, setQueryError] = useState("");
  const [searchbar, setSearchbar] = useState("");
  const [searching, setSearching] = useState(false);
  const [selectedSheets, setSelectedSheets] = useState([]);
  const [displayedSheets, setDisplayedSheets] = useState([]);

  const [user, loading, user_error] = useAuthState(auth);

  const { id } = params;
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
    console.log("sheetDataRaw", sheetDataRaw?.data()?.lists);
    setDisplayedSheets(
      sheetDataRaw?.data()?.lists?.map((list) => {
        return new ListItem({ ...list, idSheet: list_id, userId: user.uid });
      }) ?? [] // if userData?.lists is undefined, set it to an empty array instead of undefined
    );
  }, [sheetDataRaw]);

  useEffect(() => {
    console.log("ERHEHREHRHERHERHREH", user.uid);
    // need to update the user id in the list items
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
    // if (!searchkey) return;

    // Filter the lists by the searchkey and all the fields
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

    // Update the state to display the filtered lists
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

  async function sendToLambda() {
    // check if niche or location is empty
    if (niche === "" || location === "") {
      setQueryError("Niche or Location is empty");
      return;
    }

    let searchQuery = niche + " " + location;
    const query_array = searchQuery.split(" ");
    console.log(query_array);
    // remove commas from searchquery
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
        {/* <PageName name="List Page" /> */}

        <div className="flex h-24 w-full bg-pbsecondbg">
          <div className="flex h-full w-1/2 flex-row items-center gap-3 bg-pbsecondbg px-7">
            <Link href="/sheets">
              <h2 className="text-lg text-pbgreytext">Lists</h2>{" "}
            </Link>
            <h2 className="text-xl text-pbslash"> / </h2>
            <h2 className="text-lg text-pbblack">{sheetData?.list_name}</h2>
            {/* <img src="/gear.png" className="ml-5 h-5 w-5" />
            <img src="/refresh.png" className="ml-5 h-5 w-5" /> */}
          </div>

          {/* <div className="flex h-full w-1/2 flex-row items-center justify-end gap-3 bg-pbsecondbg px-7">
            <button className="flex h-10 w-36 items-center justify-center rounded-md border-2 border-pbblack bg-transparent text-sm font-semibold text-pbblack transition duration-150 hover:bg-pbwhitebtnhover">
              <img src="/bracket.png" className="h-7 w-7" />
              API Preview
            </button>
            <button className="flex h-10 w-36 items-center justify-center rounded-md bg-pbblack text-sm font-semibold text-white transition duration-150 hover:bg-pbblackbtnhover">
              <img src="/plus.png" className="-ml-3 h-7 w-7" />
              New record
            </button>
          </div> */}
        </div>

        <div className="flex h-16 w-full bg-pbsecondbg">
          <input
            type="text"
            placeholder="Search"
            className="mx-7 h-11 w-full rounded-3xl bg-pbiconhover px-7 text-lg outline-none transition
        duration-150 focus:bg-pbsearchselect"
            value={searchbar}
            onChange={(e) => {
              searchBarQuery(e);
            }}
          />
        </div>

        <table className="">
          <thead className="">
            <tr>
              <th>
                <p>Scrnshot</p>
              </th>

              <th>
                <p>SSL</p>
              </th>

              <th>
                <p>Business Name</p>
              </th>
              <th>
                <p>Phone Number</p>
              </th>
              <th>
                <p>Email / Contact</p>
              </th>
              <th>
                <p>Social</p>
              </th>
              <th>
                <p>Address</p>
              </th>
              <th className="sticky right-0 shadow-sticky">
                <p>Actions</p>
              </th>
            </tr>
          </thead>
          <tbody>
            {displayedSheets
              ?.slice(
                currentPage * resultsPerPage,
                (currentPage + 1) * resultsPerPage
              )
              .map((list, index) => (
                <Item
                  item={list}
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
          </tbody>
        </table>
        <div className="sticky bottom-0 right-0 mt-2 flex w-80 items-center justify-end px-6 py-3">
          <div className="flex w-full max-w-md flex-row justify-between">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 0}
            >
              {" "}
              {"< Prev"}{" "}
            </button>
            Current Page: {currentPage + 1} / {page_amount}
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={
                currentPage ===
                Math.floor(sheetData?.lists?.length / resultsPerPage)
              }
            >
              {"Next >"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Page;

// <PageName name="List Page" />
// {/* need a search bar here */}
// <div className="flex items-center justify-between">
//   <input
//     type="text"
//     placeholder="Search..."
//     value={searchbar}

//     onChange={(e) => {
//       setSearchbar(e.target.value);
//       search(searchBar)
//     }}

//     className="border-gray-300 mx-2 my-3 flex-grow rounded-md border p-2 text-white"
//   />
//   <button
//     onClick={() => search(searchbar)}
//     className="border-gray-3 mx-2 my-3 rounded-md border p-2 hover:bg-black hover:text-white"
//   >
//     Search
//   </button>
// </div>
