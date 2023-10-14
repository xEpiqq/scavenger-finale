import { app } from "../../../components/initializeFirebase";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { NextResponse } from "next/server";
import { collection, addDoc } from "firebase/firestore";
const db = getFirestore(app);

export async function POST(request) {
  const body = await request.json();
  addDoc(collection(db, "signup-surveys"), {
    body,
  });
  return NextResponse.json({ body: { success: true } });
}
