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
import Item2 from "../Item2.jsx";
import styles from "../page.module.scss";
import { useEffect } from "react";
import PageName from "../../../components/PageName";
import Skeleton from "react-loading-skeleton";
import Link from "next/link";

import ListItem from "../ListItem.js";
import CardItem from "../CardItem.jsx";

const auth = getAuth(app);

function Page() {
  //////// protect this route so someone with your list id cannot just type it into the url and access your shiz
  //////// Task Complete: not yet
  ////////

  const resultsPerPage = 20;
  const [currentPage, setCurrentPage] = useState(0);
  const [searchbar, setSearchbar] = useState("");
  const [selectedSheets, setSelectedSheets] = useState([]);
  const [displayedSheets, setDisplayedSheets] = useState([]);
  const [openedCRM, setOpenedCRM] = useState(-1);

  const [user, loading, user_error] = useAuthState(auth);
  const [userDataRaw, loading2, error2] = useDocument(
    doc(db, `users/${user?.uid}`)
  );
  const [sheetDataRaw, setSheetDataRaw] = useState(null);

  const page_amount =
    Math.floor(sheetDataRaw?.crm?.length / resultsPerPage) + 1;

  useEffect(() => {
    search(searchbar);
  }, [searchbar]);

  useEffect(() => {
    const func = async () => {
      if (!userDataRaw) return;
      setSheetDataRaw(userDataRaw.data().crm);
      const sheetData = userDataRaw.data().crm;
      console.log("sheetdata", sheetDataRaw);
      setDisplayedSheets(
        sheetData?.map((list) => {
          return new ListItem({ ...list, userId: user.uid });
        }) ?? [] // if userData?.lists is undefined, set it to an empty array instead of undefined
      );
    };

    func();
  }, [userDataRaw]);

  async function search(searchkey) {
    // if (!searchkey) return;

    // Filter the lists by the searchkey and all the fields
    const filteredLists = sheetDataRaw?.filter((list) => {
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

  async function searchBarQuery(e) {
    setSearchbar(e.target.value);
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
            <h2 className="text-lg text-pbblack">Favorites</h2>
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
        <div className="hidden w-full overflow-x-auto sm:block">
          <table className="table w-full">
            {/* head */}
            <thead>
              <tr>
                <th>
                  <label>
                    <input type="checkbox" className="checkbox" />
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
                    closeCRM={() => {list.updateIfChanged(); setOpenedCRM(-1)}}
                    isCRMOpen={openedCRM === index}
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
                </>
              ))}

            {/* <tfoot>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Job</th>
                        <th>Favorite Color</th>
                        <th></th>
                    </tr>
                </tfoot> */}
          </table>
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
                    openCRM={() => setOpenedCRM(index)}
                    closeCRM={() => {list.updateIfChanged(); setOpenedCRM(-1)}}
                    isCRMOpen={openedCRM === index}
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
              </>
            ))}
        </div>
      
        <div className="sticky bottom-0 right-0 mt-2 flex w-full items-center justify-center px-6 py-3">
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
                Math.floor(sheetDataRaw?.crm?.length / resultsPerPage)
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
