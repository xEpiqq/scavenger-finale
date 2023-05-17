"use client";
import react from "react";
import SheetTile from "./SheetTile";
import SheetTileNew from "./SheetTileNew";
import TextPrompt from "../components/TextPrompt";
import PageName from "../components/PageName";
import { app, db } from "../../../components/initializeFirebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth, signOut } from "firebase/auth";
import { getFirestore, doc, getDoc, updateDoc, collection, addDoc } from 'firebase/firestore';
import { useDocument } from 'react-firebase-hooks/firestore';
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { useEffect } from "react";
import { PieChart } from 'react-minimal-pie-chart';


const auth = getAuth(app);

function Page() {

  const chart_colors =  
  [  
    '#FCA5A5',  
    '#FDB1A5',  
    '#FFC2A5',  
    '#FFCDA5',  
    '#FFD9A5',  
    '#FFE5A5',  
    '#FFF1A5',  
    '#FFFDAA',  
    '#FFFEBC',  
    '#FFFED0',  
    '#FFFFE0',  
    '#E0FFDF',  
    '#D1FFD1',  
    '#C2FFC2',  
    '#B2FFB2',  
    '#A3FFA3',  
    '#94FF94',  
    '#85FF85',  
    '#76FF76',  
    '#67FF67'
  ]


  const [user, loading, user_error] = useAuthState(auth);
  const [userDataRaw, loading2, error2] = useDocument(doc(db, `users/${user?.uid}`));
  const userData = userDataRaw?.data()
  const [createSheet, setCreateSheet] = useState(false);
  const total_sheets = userData?.lists?.length;
  const [totalLeads, setTotalLeads] = useState(0);

  useEffect(() => {
    getTotalLeads().then((result) => {
      setTotalLeads(result)
    })
  }, [userData])

    async function getTotalLeads() {
    let total_leads = 0
    for (let i = 0; i < total_sheets; i++) {
      const listRef = userData?.lists[i].list_ref
      const listDoc = await getDoc(doc(db, `sheets/${listRef}`))
      const listData = listDoc.data()
      const listCount = listData?.lists.length
      total_leads = total_leads + listCount
    }
    return total_leads
  }


  async function createSheetDocument(listName) {
    const sheetsRef = collection(db, "sheets");
    const newSheet = {
      last_updated: new Date(),
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
    <div className="flex h-screen w-full">




    <div className="w-64 bg-white sm:h-screen border-t-transparent border-b-0 border-l-transparent border-pblines h-screen hidden sm:block" style={{ borderWidth: 1 }} >
      <div className="flex items-center justify-center w-full h-20 border-t-transparent border-l-transparent border-r-transparent border-pblines" style={{borderWidth: 1}}> 
      <h2 className="font-bold text-2xl">Stats</h2>
      </div>
      <div className="flex flex-col items-center gap-3 h-4/5">
        <h2 className="mt-10 text-md">Total Sheets</h2>
        <h2 className="font-bold">{total_sheets}</h2>
        <span className="w-28 bg-pblines" style={{height: 1}}/>

        <h2 className="mt-2 text-md">Total Leads</h2>
        <h2 className="font-bold">{totalLeads}</h2>
        <span className="w-28 bg-pblines" style={{height: 1}}/>
        
        <h2 className="mt-6">First Contact</h2>
        <h2 className="text-xs text-gray-3">66/{totalLeads}</h2>
        <div className="w-full h-28">
        <PieChart
            data={[
              { title: 'One', value: 10, color: '#4C9A' },
              { title: 'Two', value: totalLeads, color: '#2C2C2C' },
            ]}
          />
        </div>
                
        <h2 className="mt-6">Second Contact</h2>
        <h2 className="text-xs text-gray-3">33/{totalLeads}</h2>

        <div className="w-full h-28">
        <PieChart
            data={[
              { title: 'One', value: 10, color: '#C9A' },
              { title: 'Two', value: 20, color: '#2C2C2C' },
            ]}
          />
        </div>
        

      </div>
    </div>


    <div className="flex flex-col justify-between bg-pbsecondbg h-screen w-full py-8 px-4">
      <PageName name="Sheets Overview" />
      <div
        className="relative m-4 grid h-full justify-center gap-4 px-10 pt-4"
        style={{
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
          gridAutoRows: "1fr",
          gap: "1rem",
        }}
      >

        {userData?.lists?.map((list, index) => ( <SheetTile key={index} props={{ name: list.list_name, item_count: list.list_count, object_id: list.object_id, reference: list.list_ref }} /> ))}

        { 
          total_sheets === 0 && ( 
            <SheetTileNew
            onClick={() => setCreateSheet(true)}
            />
          )
        }

        {/* <SheetTileNew /> */}
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

          callBackClose={() => {
            setCreateSheet(false);
          }}
          
        />
      )}

      </div>
    </div>
    </div>
  )
}

export default Page;
