const { Configuration, OpenAIApi } = require("openai");

import uuid from "uuid";

// Create a new configuration object with your API key\
const configuration = new Configuration({
  apiKey: process.env.OPENAI_KEY,
  baseUrl: "https://api.openai.com/v1/chat/completions/",
});
const openai = new OpenAIApi(configuration);

import { app } from "../../../components/initializeFirebase";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { NextResponse } from "next/server";
import ListItem from "../../(app-pages)/sheets/(sheet)/ListItem.js"
const db = getFirestore(app);

export async function POST(request) {
  const body = await request.json();
  const { item } = body;

  if (!item) {
    return new Response(JSON.stringify({ error: "No item" }));
  }

  // TODO: we need to verify that the user has a subscription

  try {
    const model = "gpt-3.5-turbo";

    const prompt =
      "You will create a cold outreach email for a local buisness from a freelance web developer." +
      "Here is some data about the local buisness:\n" +
      "Name: " +
      item.name +
      "Website: " +
      item.website +
      "Email: " +
      item.email +
      "Phone: " +
      item.phone +
      "Address: " +
      item.address +
      "Here is some data about the freelance web developer" +
      "Name: " +
      "Scavenger";

    const completion = await openai.createChatCompletion({
      model: model,
      messages: [{ role: "system", content: prompt }],
      temperature: 0.9,
    });
    console.log(completion.data);

    if (completion.data.choices[0].text == "undefined") {
      return new Response(JSON.stringify({ data: "undefined" }));
    }
    item.emailBody = completion.data.choices[0].message.content
    ListItem.updateItem(item)
    return new Response(
      JSON.stringify({ data: completion.data.choices[0].message.content })
    );
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }
  }
}
