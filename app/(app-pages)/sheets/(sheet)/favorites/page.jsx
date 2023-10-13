"use client";
import { app, db } from "../../../../../components/initializeFirebase";
import { getAuth, signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import List from "@/components/List";
import {
  doc,
} from "firebase/firestore";
import { useDocument } from "react-firebase-hooks/firestore";
import { useState } from "react";
import { useEffect } from "react";
import Link from "next/link";

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
  const [sheetDataRaw, setSheetDataRaw] = useState([]);

  useEffect(() => {
    const func = async () => {
      if (!userDataRaw) return;
      setSheetDataRaw(userDataRaw.data().crm);
    };

    func();
  }, [userDataRaw]);

  return (
    <div>
      <div className="hidden h-24 w-full sm:flex">
        <div className="flex h-full w-full flex-row items-center gap-3 bg-pbsecondbg px-7">
          <Link href="/sheets">
            <h2 className="pl-16 text-lg text-pbgreytext">Lists</h2>{" "}
          </Link>
          <h2 className="text-xl text-pbslash"> / </h2>
          <h2 className="w-44 text-lg text-pbblack">
            Favorites
          </h2>
        </div>
      </div>
      <List
        sheetData={sheetDataRaw}
        resultsPerPage={resultsPerPage}
        user={user}
      />
    </div>
  );
}

export default Page;
