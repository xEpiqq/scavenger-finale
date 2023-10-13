import { app } from "../../../components/initializeFirebase";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { NextResponse } from "next/server";
import { collection, addDoc } from "firebase/firestore";
const db = getFirestore(app);

export async function POST(request) {
  const body = await request.json();
  await addDoc(collection(db, "ai-email-queue"), {
    body,
  });
  console.log("Added document with ID: ");

  NextResponse.json({ body: { success: true } });
}
