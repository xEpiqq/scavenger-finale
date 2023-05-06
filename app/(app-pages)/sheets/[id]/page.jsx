'use client'
import { usePathname } from 'next/navigation';
import { app, db } from "../../../../components/initializeFirebase";
import { getAuth, signOut } from "firebase/auth";
import { getFirestore, doc, getDoc, updateDoc, collection, addDoc } from 'firebase/firestore';
import { useDocument } from 'react-firebase-hooks/firestore';
import { useState } from "react";
import Item from "./Item.jsx";

function Page() {
    //////// protect this route so someone with your list id cannot just type it into the url and access your shiz
    //////// Task Complete: not yet
    ////////

    const [searchQuery, setSearchQuery] = useState("");
    const [queryError, setQueryError] = useState("");

    const pathname = usePathname();
    const list_id = pathname.replace(/\/sheets\//, '');
    const [userDataRaw, loading2, error2] = useDocument(doc(db, `sheets/${list_id}`))
    const userData = userDataRaw?.data()

    async function sendToLambda() {
        const query_array = searchQuery.split(" ")
        console.log(query_array)

        if (query_array == null) {
            setQueryError("Query is null")
            return
        }

        if (query_array.length < 3) {
            setQueryError("Query is less than 3 words")
            return
        }

        // if contains alphanumeric characters
        if (searchQuery.match(/[^a-zA-Z0-9 ]/g)) {
            setQueryError("Query contains non-alphanumeric characters")
            return
        }

        if (searchQuery.match(/[0-9]/g)) {
            setQueryError("Query contains numbers")
            return
        }


        const response = await fetch('/api/lambda', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                searchQuery: searchQuery,
                the_list_id: list_id
            })
        })
        const data = await response.json()
        console.log(data)
    }

    if (loading2) return <h1>Loading...</h1>;
    if (error2) return <h1>Error: {error2}</h1>;

    if (userData?.lists == 0) {
        return (
            <>
            <div className="fixed z-10 inset-0 overflow-y-auto">
                <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                  <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" ></div>
                  <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div className="bg-gray-100 px-4 py-5 sm:p-6 sm:pb-4">
                      <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="business-search">
                          Business Search
                        </label>
                        <input value={searchQuery} onChange={(e) => {setSearchQuery(e.target.value)}} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-white" id="business-search" type="text" placeholder="Enter business name" />
                      </div>
                      <div className="flex justify-end">
                        <button onClick={sendToLambda} className="bg-black hover:bg-gray-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:opacity-75" type="button" >
                          Submit
                        </button>
                        {queryError && <p className="text-red-500 text-xs italic">{queryError}</p> }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          </>
        )
    }

    return (
    <div>
        <h1>List {list_id} not empty</h1>
        {userData?.lists?.map((list, index) => ( <Item key={index} website={list.website} dscreenshot={list.desktop_screenshot}/> ))}
    </div>
    )
}

export default Page;
