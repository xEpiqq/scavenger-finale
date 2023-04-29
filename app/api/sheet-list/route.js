import { app } from "../../../components/initializeFirebase";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  query,
  orderBy,
  select,
} from "firebase/firestore";
import {  where, getDocs,  } from 'firebase/firestore';

import { NextResponse } from "next/server";

const db = getFirestore(app);

export async function GET(request) {
  console.log("GET request");

  // the uid is in the headers
  const uid = request.headers.get("uid");
  console.log(uid);

  if (!uid) {
    return NextResponse.json({ error: "No UID provided" }, { status: 500 });
  }

  const userDoc = await getDoc(doc(db, "users", uid));

  if (!userDoc.exists()) {
    return NextResponse.json(
      { error: "User document does not exist" },
      { status: 500 }
    );
  }

  const sheet_list = collection(db, "users", uid, "sheet_list");
  const sheetListQuery = query(sheet_list, "select", "name", "id", "size");

  const snapshot = await sheetListQuery.get();

  if (snapshot.empty) {
    return NextResponse.json({ error: "No sheet list found" }, { status: 500 });
  }

  const sheetList = [];
  snapshot.forEach((doc) => {
    sheetList.push(doc.data());
  });

  return NextResponse.json({ sheetList: sheetList }, { status: 200 });
}

export async function PUT(request) {
  const body = await request.json();
  const { uid, sheet } = body;

  if (!uid) {
    return NextResponse.json({ error: "No UID provided" }, { status: 500 });
  }
  if (!sheet) {
    return NextResponse.json({ error: "No sheet provided" }, { status: 500 });
  }

  const userRef = doc(db, "users", uid);
  const userDoc = await getDoc(userRef);

  if (!userDoc.exists()) {
    return NextResponse.json(
      { error: "User document does not exist" },
      { status: 500 }
    );
  }

  const sheet_list = userRef.collection("sheet_list");

  await sheet_list.add(sheet);

  return NextResponse.json({ success: "Sheet added" }, { status: 200 });
}
