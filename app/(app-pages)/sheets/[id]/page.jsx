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
import { useEffect } from "react";

function Page({ params }) {
  //////// protect this route so someone with your list id cannot just type it into the url and access your shiz
  //////// Task Complete: not yet
  ////////

  const [searchQuery, setSearchQuery] = useState("");
  const [queryError, setQueryError] = useState("");

  const { id } = params;
  const list_id = id;
  const [userDataRaw, loading2, error2] = useDocument(
    doc(db, `sheets/${list_id}`)
  );
  const userData = userDataRaw?.data();

  useEffect(() => {
    updateLastUpdated();
  }, [userData]);

  async function updateLastUpdated() {
    const userRef = doc(db, `sheets/${list_id}`);
    await updateDoc(userRef, {
      last_updated: new Date(),
    });
  }

  async function sendToLambda() {
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
  }

  if (loading2) return <h1>Loading...</h1>;
  if (error2) return <h1>Error: {error2}</h1>;

  if (userData?.lists == 0) {
    return (
      <>
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
            <div className="bg-gray-500 fixed inset-0 bg-opacity-75 transition-opacity"></div>
            <div className="inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle">
              <div className="bg-gray-100 px-4 py-5 sm:p-6 sm:pb-4">
                <div className="mb-4">
                  <label
                    className="text-gray-700 mb-2 block font-bold"
                    htmlFor="business-search"
                  >
                    Business Search
                  </label>
                  <input
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                    }}
                    className="text-gray-700 focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-white focus:outline-none"
                    id="business-search"
                    type="text"
                    placeholder="Enter business name"
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={sendToLambda}
                    className="hover:bg-gray-900 focus:shadow-outline rounded bg-black px-4 py-2 font-bold text-white hover:opacity-75 focus:outline-none"
                    type="button"
                  >
                    Submit
                  </button>
                  {queryError && (
                    <p className="text-red-500 text-xs italic">{queryError}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <div>
      <div className="w-full overflow-x-auto">
        <table className="w-full gap-0">
          <thead>
            <tr className="sm:hover:opacity-100l relative h-12 border-separate border-b border-gray-5 transition-all duration-300 sm:hover:bg-gray-6">
              <th className="relative inline-flex flex-nowrap items-center gap-1 pl-2 pr-2">
                <label className="flex h-4 w-4 items-center justify-center">
                  <input type="checkbox" className="" />
                </label>
              </th>
              <th className="max-w-xs">
                <p className="inline-flex w-full items-center whitespace-nowrap">
                  Business Name
                </p>
              </th>
              <th className="">
                <p className="inline-flex w-full items-center whitespace-nowrap">
                  Website
                </p>
              </th>
              <th className="">
                <p className="inline-flex w-full items-center whitespace-nowrap">
                  Phone Number
                </p>
              </th>
              <th className="">
                <p className="inline-flex w-full items-center whitespace-nowrap">
                  Email
                </p>
              </th>
              <th className="">
                <p className="inline-flex w-full items-center whitespace-nowrap">
                  Screenshot
                </p>
              </th>
              <th className="">
                <p className="inline-flex w-full items-center whitespace-nowrap">
                  Address
                </p>
              </th>
              <th className=" right-0 bg-white">
                <p className="inline-flex w-full items-center whitespace-nowrap">
                  Actions
                </p>
              </th>
            </tr>
          </thead>
          <tbody>
            {userData?.lists?.slice(0, 10).map((list, index) => (
              <Item
                key={index}
                name={list.biz_name}
                link={list.website}
                phoneNumber={list.phone}
                email={list.email}
                address={list.address}
                screenshot={list.desktop_screenshot}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Page;
