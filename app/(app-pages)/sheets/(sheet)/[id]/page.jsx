"use client";
import { app, db } from "../../../../../components/initializeFirebase";
import { getAuth, signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useDocument } from "react-firebase-hooks/firestore";
import { useState } from "react";
import FillList from "./FillList.jsx";
import { useEffect } from "react";
import Link from "next/link";

import List from "@/components/List";

const auth = getAuth(app);

function Page({ params }) {
  //////// protect this route so someone with your list id cannot just type it into the url and access your shiz
  //////// Task Complete: not yet

  const resultsPerPage = 20;
  const [niche, setNiche] = useState("");
  const [location, setLocation] = useState("");
  const [queryError, setQueryError] = useState("");
  const [searching, setSearching] = useState(false);
  const [displayedSheets, setDisplayedSheets] = useState([]);

  const [user, loading, user_error] = useAuthState(auth);

  let { id } = params;

  const list_id = id;
  const [sheetDataRaw, loading2, error2] = useDocument(
    doc(db, `sheets/${list_id}`)
  );
  
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

  // useEffect(() => {
  //   setSheetData(sheetDataRaw?.data());
  // }, [sheetDataRaw]);

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
    <div>
      <div className="hidden h-24 w-full sm:flex">
        <div className="flex h-full w-full flex-row items-center gap-3 bg-pbsecondbg px-7">
          <Link href="/sheets">
            <h2 className="pl-16 text-lg text-pbgreytext">Lists</h2>{" "}
          </Link>
          <h2 className="text-xl text-pbslash"> / </h2>
          <h2 className="w-44 text-lg text-pbblack">
            {sheetDataRaw?.data().list_name
              ? sheetDataRaw?.data().list_name
              : "List Name"}
          </h2>
        </div>
      </div>
      <List
        sheetData={sheetDataRaw?.data().lists}
        resultsPerPage={resultsPerPage}
        list_id={list_id}
        user={user}
      />
    </div>
  );
}

export default Page;
