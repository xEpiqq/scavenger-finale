import { app } from "../../../components/initializeFirebase";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { NextResponse } from "next/server";
import ListItem from "../../(app-pages)/sheets/(sheet)/ListItem.js";
import { collection, addDoc } from "firebase/firestore";
const db = getFirestore(app);

export async function POST(request) {
  const body = await request.json();
  await addDoc(collection(db, "ai-email-queue"), {
    body,
  });
  console.log("Added document with ID: ");
  // google_function_response.body is a readable stream, so we need to convert it to JSON

  NextResponse.json({ body: { success: true } });
}
