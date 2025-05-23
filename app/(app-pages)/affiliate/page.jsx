"use client";
import { useAuthState } from "react-firebase-hooks/auth";
import { app, db } from "../../../components/initializeFirebase";
import { getAuth, signOut } from "firebase/auth";
import { useDocument } from "react-firebase-hooks/firestore";
import {
  doc,
} from "firebase/firestore";

const auth = getAuth(app);

function ProfilePage() {
  const [user, loading, user_error] = useAuthState(auth);
  const [userDataRaw, loading2, error2] = useDocument(doc(db, `users/${user?.uid}`));

  async function createAffiliate() {

    const stripe_customer_id = userDataRaw.data().stripe_customer_id;
    const affiliate_id = userDataRaw.data().affiliate_id;
    const affiliate_onboarded = userDataRaw.data().affiliate_onboarded;

    const response = await fetch("/api/createAffiliate", {
      method: "POST",
      body: JSON.stringify({
        stripe_customer_id: stripe_customer_id,
        user_id: user?.uid,
        affiliate_id: affiliate_id,
        affiliate_onboarded: affiliate_onboarded,
      }),
    });

    const json = await response.json();
    window.location.href = json.url; 
    }
  

  return (
    <div className="px-4 py-8">
      <button className="bg-primary-500 hover:bg-blue-700 text-gray-900 font-bold py-2 px-4 rounded" onClick={createAffiliate}>BUTTON </button>
    </div>
  );
}

export default ProfilePage;
