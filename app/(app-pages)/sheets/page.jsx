"use client";
import react from "react";
import SheetTile from "./SheetTile";
import SheetTileNew from "./SheetTileNew";
import TextPrompt from "../components/TextPrompt";
import PageName from "../components/PageName";
import { app } from "../../../components/initializeFirebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth, signOut } from "firebase/auth";
import { getFirestore, doc, getDoc, updateDoc, collection, addDoc } from 'firebase/firestore';
import { useDocument } from 'react-firebase-hooks/firestore';
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
const auth = getAuth(app);
const db = getFirestore(app);

function Page() {
  const [user, loading, user_error] = useAuthState(auth);
  const [userDataRaw, loading2, error2] = useDocument(doc(db, `users/${user?.uid}`));
  const userData = userDataRaw?.data()
  const [createSheet, setCreateSheet] = useState(false);
  async function createSheetDocument(listName) {
    const sheetsRef = collection(db, "sheets");
    const newSheet = {
      list_name: listName,
      owner_id: user?.uid,
      lists: [],
    }
    const docRef = await addDoc(sheetsRef, newSheet);
    const listRef = docRef.id;
    return listRef;
  }

  async function createNewSheet(listName) {
    const userRef = doc(db, `users/${user?.uid}`);
    const userSnapshot = await getDoc(userRef);
    const listsArray = userSnapshot.data().lists;
    const listRef = await createSheetDocument(listName);
    const newSheet = {
      list_contacted: 0,
      list_count: 0,
      list_name: listName,
      list_ref: listRef, // Replace with your own function to generate a random string
      object_id: uuidv4() // Replace with your own function to generate a random object id
    }
    listsArray.push(newSheet);
    await updateDoc(userRef, { lists: listsArray });
  }
  
  return (
    <>
    <div className="flex flex-col justify-between">
      <PageName name="Sheets" />
      <div
        className="relative m-4 grid h-full items-center justify-center gap-4"
        style={{
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
          gridAutoRows: "1fr",
          gap: "1rem",
        }}
      >

        {userData?.lists?.map((list, index) => ( <SheetTile key={index} props={{ name: list.list_name, item_count: list.list_count, object_id: list.object_id }} /> ))}

        <SheetTileNew />
        <div className="fixed right-4 bottom-4 flex justify-center gap-6">
        <button className="bg-white border border-black border-1 text-black rounded-md w-36 h-10 right-4 bottom-4 hover:bg-black hover:text-white" >Export to CSV</button>
        <button className="bg-black text-white rounded-md w-48 h-10 right-38 bottom-4 hover:bg-white hover:border hover:border-1 hover:border-black hover:text-black" onClick={() => {setCreateSheet(true)}}>Create New Sheet</button>
        </div>
        
        {createSheet && <TextPrompt props={{ title: "Create New Sheet", placeholder: "Sheet Name", action: "Create", actionFunction: () => {console.log("create sheet")}, closeFunction: () => {setCreateSheet(false)}}} />}

        {createSheet && (
        <TextPrompt
          title="Create New Sheet"
          description="Please enter a new name for the sheet."
          placeholder="New Sheet Name"
          buttonText="Create"
          callBack={(input) => {
            setCreateSheet(false);
            createNewSheet(input)
          }}
        />
      )}

      </div>
    </div>
  </>
  );
}

export default Page;
