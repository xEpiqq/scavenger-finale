"use client";
import {
  getAuth,
  isSignInWithEmailLink,
  signInWithEmailLink,
} from "firebase/auth";
import Link from "next/link";

import { app } from "../../../components/initializeFirebase";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const auth = getAuth(app);

const EmailSigninPage = () => {
  const router = useRouter();

  useEffect(() => {
    if (isSignInWithEmailLink(auth, window.location.href)) {
      // Additional state parameters can also be passed via URL.
      // This can be used to continue the user's intended action before triggering
      // the sign-in operation.
      // Get the email if available. This should be available if the user completes
      // the flow on the same device where they started it.
      let email = window.localStorage.getItem("emailForSignIn");
      if (!email) {
        // User opened the link on a different device. To prevent session fixation
        // attacks, ask the user to provide the associated email again. For example:
        email = window.prompt("Please provide your email for confirmation");
      }
      // The client SDK will parse the code from the link for you.
      signInWithEmailLink(auth, email, window.location.href)
        .then(async (result) => {
          // Clear email from storage.
          window.localStorage.removeItem("emailForSignIn");

          console.log(result);
          const user = result.user;
          console.log(user);
          // You can access the new user via result.user
          // Additional user info profile not available via:
          // result.additionalUserInfo.profile == null
          // You can check if the user is new or existing:
          // result.additionalUserInfo.isNewUser

          // check if firestore user
          await fetch("/api/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              uid: user.uid,
              displayname: user.displayName,
              email: user.email,
              photo: user.photoURL,
            }),
          });

          // fetch to /api/stripecreatecustomer
          await fetch("/api/stripecreatecustomer", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: user.email,
              name: user.displayName,
              user_id: user.uid,
            }),
          });

          router.push("/sheets");
        })
        .catch((error) => {
          // Some error occurred, you can inspect the code: error.code
          // Common errors could be invalid email and invalid or expired OTPs.
        });
    }
  }, []);

  return (
    <>
      <section className="relative z-10 overflow-hidden pb-16 pt-36 md:pb-20 lg:pb-28 lg:pt-[180px]">
        <div className="container">
          <h1 className="text-4xl">
            Thank you for signing up! Please enjoy the rest of the site.
          </h1>
        </div>
      </section>
    </>
  );
};

export default EmailSigninPage;
