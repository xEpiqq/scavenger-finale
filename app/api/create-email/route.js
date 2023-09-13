import { app } from "../../../components/initializeFirebase";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { NextResponse } from "next/server";
import ListItem from "../../(app-pages)/sheets/(sheet)/ListItem.js"
const db = getFirestore(app);

const function_url = "https://createemail-pui7kvv4mq-uc.a.run.app"

export async function POST(request) {
  const body = await request.json();

  const google_function_response = await fetch (function_url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        body
        })
    })
    // google_function_response.body is a readable stream, so we need to convert it to JSON
    const response_data = await google_function_response.json()
    console.log(response_data)

  NextResponse.json({ success: "Function Fired" }, { status: 200 })
}
