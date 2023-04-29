"use client";
import react from "react";
import SheetTile from "./SheetTile";
import SheetTileNew from "./SheetTileNew";
import TextPrompt from "../components/TextPrompt";
import PageName from "../components/PageName";

import { getAuth } from "firebase/auth";
import { app } from "../../../components/initializeFirebase";
import { useAuthState } from "react-firebase-hooks/auth";

import useSWR from "swr";

const auth = getAuth(app);

function Page() {
  const [user, loading, user_error] = useAuthState(auth);

  const fetcher = (url) => {
    // i need to send the user id to the server
    return fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "uid": user.uid,
      },
    }).then((res) => res.json());
  };

  const { data, error } = useSWR("/api/sheet-list", fetcher);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  if (loading) return <div>loading...</div>;
  if (user_error) return <div>error</div>;

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
        <SheetTile props={{ name: "Sheet 1", item_count: 5 }} />
        <SheetTile props={{ name: "Sheet 1", item_count: 10 }} />
        <SheetTile props={{ name: "Sheet 1", item_count: 15 }} />
        <SheetTile props={{ name: "Sheet 1", item_count: 30 }} />
        <SheetTile props={{ name: "Sheet 1", item_count: 60 }} />
        <SheetTile props={{ name: "Sheet 1", item_count: 90 }} />
        <SheetTile props={{ name: "Sheet 1", item_count: 120 }} />
        <SheetTile props={{ name: "Sheet 1", item_count: 150 }} />
        <SheetTile props={{ name: "Sheet 1", item_count: 160 }} />
        <SheetTile props={{ name: "Sheet 1", item_count: 170 }} />
        <SheetTile props={{ name: "Sheet 1", item_count: 180 }} />
        <SheetTile props={{ name: "Sheet 1", item_count: 190 }} />
        <SheetTile props={{ name: "Sheet 1", item_count: 200 }} />
        <SheetTile props={{ name: "Sheet 1", item_count: 5 }} />
        <SheetTile props={{ name: "Sheet 1", item_count: 5 }} />
        <SheetTile props={{ name: "Sheet 1", item_count: 5 }} />
        <SheetTile props={{ name: "Sheet 1", item_count: 5 }} />
        <SheetTile props={{ name: "Sheet 1", item_count: 5 }} />
        <SheetTile props={{ name: "Sheet 1", item_count: 5 }} />
        <SheetTile props={{ name: "Sheet 1", item_count: 5 }} />
        <SheetTile props={{ name: "Sheet 1", item_count: 5 }} />
        <SheetTile props={{ name: "Sheet 1", item_count: 5 }} />
        <SheetTile props={{ name: "Sheet 1", item_count: 5 }} />
        <SheetTile props={{ name: "Sheet 1", item_count: 5 }} />
        <SheetTile props={{ name: "Sheet 1", item_count: 5 }} />
        <SheetTile props={{ name: "Sheet 1", item_count: 5 }} />
        <SheetTileNew />
      </div>
    </div>
  );
}

export default Page;
