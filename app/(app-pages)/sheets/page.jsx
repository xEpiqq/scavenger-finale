"use client";
import react from "react";
import SheetTile from "./SheetTile";
import SheetTileNew from "./SheetTileNew";
import TextPrompt from "../components/TextPrompt";
import PageName from "../components/PageName";

import { getAuth } from "firebase/auth";
import { app } from "../../../components/initializeFirebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useState } from "react";

import useSWR from "swr";

const auth = getAuth(app);

function Page() {
  const [user, loading, user_error] = useAuthState(auth);
  const [sheet_info, setSheetInfo] = useState([
    { name: "Taco Trucks in Vegas", item_count: 5 },
    { name: "Taco Trucks in Provo", item_count: 10 },
    { name: "Taco Trucks in Orem", item_count: 15 },
    { name: "Taco Trucks in Texas", item_count: 30 },
    { name: "Walmarts in Provo", item_count: 60 },
    { name: "Walmarts in Provo", item_count: 90 },
    { name: "Walmarts in Provo", item_count: 120 },
    { name: "Walmarts in Provo", item_count: 150 },
    { name: "Walmarts in Provo", item_count: 160 },
    { name: "Walmarts in Provo", item_count: 170 },
    { name: "Walmarts in Provo", item_count: 180 },
    { name: "Walmarts in Provo", item_count: 190 },
    { name: "Walmarts in Provo", item_count: 200 },
  ]);

  return (
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
        {sheet_info.map((sheet, index) => (
          <div className="flex items-center justify-center" key={sheet.name + index}>
            <SheetTile props={sheet}/>
          </div>
        ))}
        <div className="flex items-center justify-center">
          <SheetTileNew />
        </div>
      </div>
    </div>
  );
}

export default Page;
