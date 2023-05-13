"use client";
import { app, db } from "../../../../components/initializeFirebase";
import { getAuth, signOut } from "firebase/auth";
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
import Skeleton from 'react-loading-skeleton'
import FillList from "./FillList.jsx";

function Page({ params }) {
  //////// protect this route so someone with your list id cannot just type it into the url and access your shiz
  //////// Task Complete: not yet
  ////////

  const resultsPerPage = 20;

  const [currentPage, setCurrentPage] = useState(0);

  const [searchQuery, setSearchQuery] = useState("");
  const [queryError, setQueryError] = useState("");

  const [searchbar, setSearchbar] = useState("");
  const [searching, setSearching] = useState(false);

  const [selectedSheets, setSelectedSheets] = useState([]);

  const [displayedSheets, setDisplayedSheets] = useState([]);

  const { id } = params;
  const list_id = id;
  const [userDataRaw, loading2, error2] = useDocument(
    doc(db, `sheets/${list_id}`)
  );
  const userData = userDataRaw?.data();

  console.log(userData)

  useEffect(() => {
    updateLastUpdated();
  }, []);

  useEffect(() => {
    setDisplayedSheets(userData?.lists);
  }, [userDataRaw]);

  async function search(searchkey) {
    if (!searchkey) return;

    // Filter the lists by the searchkey and all the fields
    const filteredLists = userData?.lists?.filter((list) => {
      const lowerCaseSearchKey = searchkey.toLowerCase();
      const lowerCaseBizName = list.biz_name.toLowerCase();
      const lowerCaseWebsite = list.website.toLowerCase();
      const lowerCasePhone = list.phone.toLowerCase();
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
    setSearching(true);
    const query_array = searchQuery.split(" ");
    console.log(query_array);

    if (query_array == null) {
      setQueryError("Query is null");
      return;
    }

    if (query_array.length < 3) {
      setQueryError("Query is less than 3 words");
      return;
    }

    // if contains alphanumeric characters
    if (searchQuery.match(/[^a-zA-Z0-9 ]/g)) {
      setQueryError("Query contains non-alphanumeric characters");
      return;
    }

    if (searchQuery.match(/[0-9]/g)) {
      setQueryError("Query contains numbers");
      return;
    }

    const response = await fetch("/api/lambda", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        searchQuery: searchQuery,
        the_list_id: list_id,
      }),
    });
    const data = await response.json();
    console.log(data);
    setDisplayedSheets(userData?.lists);

  }

  if (loading2) return <h1>Loading...</h1>;
  if (error2) return <h1>Error: {error2}</h1>;

  if (userData?.lists == 0) {
    return (
      <FillList sendToLambda={sendToLambda} setSearchQuery={setSearchQuery} searchQuery={searchQuery} queryError={queryError} searching={searching} />
    );
  }

  return (
    <div className={styles.table_wrapper}>
      <PageName name="List Page" />
      {/* need a search bar here */}
      <div className="flex items-center justify-between">
        <input
          type="text"
          placeholder="Search..."
          value={searchbar}
          onChange={(e) => setSearchbar(e.target.value)}
          className="border-gray-300 mx-2 my-3 flex-grow rounded-md border p-2 text-white"
        />
        <button
          onClick={() => search(searchbar)}
          className="border-gray-3 mx-2 my-3 rounded-md border p-2 hover:bg-black hover:text-white"
        >
          Search
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>
              <label className="flex items-center justify-center">
                <input
                  type="checkbox"
                  className=""
                  onClick={(e) => {
                    if (e.target.checked) {
                      setSelectedSheets([
                        ...Array(userData?.lists?.length).keys(),
                      ]);
                    } else {
                      setSelectedSheets([]);
                    }
                  }}
                  checked={
                    selectedSheets.length === userData?.lists?.length &&
                    userData?.lists?.length !== 0
                  }
                />
              </label>
            </th>
            <th>
              <p>Business Name</p>
            </th>
            <th>
              <p>Website</p>
            </th>
            <th>
              <p>Phone Number</p>
            </th>
            <th>
              <p>Email</p>
            </th>
            <th>
              <p>Screenshot</p>
            </th>
            <th>
              <p>Address</p>
            </th>
            <th className="sticky right-0 bg-white shadow-sticky">
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
                key={index}
                name={list.biz_name}
                link={list.website}
                phoneNumber={list.phone}
                email={list.email}
                address={list.address}
                screenshot={list.desktop_screenshot}
                selected={selectedSheets.includes(index)}
                id={list_id}
                object_id={list.object_id}
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
      <div className="flex w-full items-center justify-center">
        <div className="flex w-full max-w-md flex-row justify-between">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 0}
          >
            {"< Prev"}
          </button>
          Current Page: {currentPage + 1}
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={
              currentPage ===
              Math.floor(userData?.lists?.length / resultsPerPage)
            }
          >
            {"Next >"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Page;
