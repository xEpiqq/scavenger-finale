"use client";
import SheetTile from "./SheetTile";
import SheetTileNew from "./SheetTileNew";
import TextPrompt from "../components/TextPrompt";
import PageName from "../components/PageName";
import { app, db } from "../../../components/initializeFirebase";
import { useAuthState } from "react-firebase-hooks/auth";
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
import { v4 as uuidv4 } from "uuid";
import { useEffect } from "react";
import dayjs from "dayjs";

const auth = getAuth(app);

function Page() {
  const [user, loading, user_error] = useAuthState(auth);
  const [userDataRaw, loading2, error2] = useDocument(
    doc(db, `users/${user?.uid}`)
  );
  const userData = userDataRaw?.data();
  const total_sheets = userData?.lists?.length;
  const [totalLeads, setTotalLeads] = useState(0);
  const [sortedLists, setSortedLists] = useState([]);

  // how many days have elapsed
  const userCreated = userData?.created;
  const userCreatedDate = userCreated ? userCreated.toDate() : null;
  const userCreatedFormatted = userCreatedDate
    ? dayjs(userCreatedDate).format("YYYY-MM-DD")
    : null;
  const today = dayjs().format("YYYY-MM-DD");
  const [daysSinceCreated, setDaysSinceCreated] = useState(
    dayjs(today).diff(userCreatedFormatted, "day")
  );

  // on page load fetch /api/stripe_sub_verification

  useEffect(() => {
    if (!user) return;
    console.log("Use effect ran, post sent");
    fetch("/api/stripe_sub_verification", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uid: user?.uid,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  }, [user]);

  useEffect(() => {
    if (!userData || !userData?.lists) {
      return;
    }
    // Set sorted lists to be the lists sorted by last updated
    const userDataCopy = { ...userData };
    const sortedLists = userDataCopy?.lists.sort((a, b) => {
      // check if a.last_updated exists
      if (!a.last_updated) {
        return -10000;
      }
      return b.last_updated.seconds - a.last_updated.seconds;
    });
    setSortedLists(sortedLists);
  }, [userDataRaw]);

  useEffect(() => {
    getTotalLeads().then((result) => {
      setTotalLeads(result);
    });
  }, [userData?.lists]);

  async function getTotalLeads() {
    let total_leads = 0;
    for (let i = 0; i < total_sheets; i++) {
      const listRef = userData?.lists[i].list_ref;
      const listDoc = await getDoc(doc(db, `sheets/${listRef}`));
      const listData = listDoc.data();
      const listCount = listData?.lists.length;
      total_leads = total_leads + listCount;
    }
    return total_leads;
  }

  async function createSheetDocument(listName) {
    const sheetsRef = collection(db, "sheets");
    const newSheet = {
      last_updated: new Date(),
      list_name: listName,
      owner_id: user?.uid,
      owner_email: user?.email,
      lists: [],
    };
    const docRef = await addDoc(sheetsRef, newSheet);
    const listRef = docRef.id;
    return listRef;
  }

  async function createNewSheet(listName = "New List") {
    const userRef = doc(db, `users/${user?.uid}`);
    const userSnapshot = await getDoc(userRef);
    const listsArray = userSnapshot.data().lists;
    const listRef = await createSheetDocument(listName);
    const newSheet = {
      list_contacted: 0,
      list_count: 0,
      list_name: listName,
      list_ref: listRef,
      object_id: uuidv4(),
    };
    listsArray.push(newSheet);
    await updateDoc(userRef, { lists: listsArray });
  }

  const [screenWidth, setScreenWidth] = useState(0);
  useEffect(() => {
    setScreenWidth(window.innerWidth);
  }, []);

  return (
    <div className="flex h-full w-full bg-pbsecondbg">
      <div
        className="sticky top-0 hidden  w-64 border-b-0 border-pblines border-l-transparent border-t-transparent bg-white sm:block sm:h-screen"
        style={{ borderWidth: 1 }}
      >
        <div
          className="flex h-20 w-full items-center justify-center border-pblines border-l-transparent border-r-transparent border-t-transparent"
          style={{ borderWidth: 1 }}
        >
          <h2 className="text-2xl font-bold">Stats</h2>
        </div>
        <div className="flex h-4/5 flex-col items-center gap-3">
          <h2 className="text-md mt-10">Total Lists</h2>
          <h2 className="font-bold">{total_sheets}</h2>
          <span className="w-28 bg-pblines" style={{ height: 1 }} />

          <h2 className="text-md mt-2">Total Leads</h2>
          <h2 className="font-bold">{totalLeads}</h2>
          <span className="w-28 bg-pblines" style={{ height: 1 }} />
        </div>
      </div>

      <div className="flex  w-full flex-col justify-between bg-pbsecondbg px-4 py-8">
        <button
          className="hover:border-1 bottom-10 right-14 z-20 block h-16 w-full rounded-md bg-black text-white transition duration-200 hover:border hover:border-black hover:bg-white hover:text-black sm:fixed sm:h-10 sm:w-48"
          onClick={() => {
            createNewSheet();
          }}
        >
          Create New List
        </button>
        <PageName
          name="List Overview"
          daysLeft={daysSinceCreated}
          subStatus={userData?.subscription_status}
        />
        <div
          className="relative m-4 grid  h-full justify-center gap-4 px-10 pt-4"
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            gridAutoRows: "1fr",
            gap: "1rem",
          }}
        >
          {sortedLists.map((list, index1) => (
            <SheetTile
              key={index1}
              props={{
                name: list.list_name,
                item_count: list.list_count,
                object_id: list.object_id,
                reference: list.list_ref,
              }}
            />
          ))}

          {total_sheets === 0 && (
            <SheetTileNew onClick={() => createNewSheet()} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Page;
