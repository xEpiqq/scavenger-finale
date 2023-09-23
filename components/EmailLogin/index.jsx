"use client";

import react from "react";

import { useAuthState } from "react-firebase-hooks/auth";
import { useState } from "react";
import { app } from "../initializeFirebase";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  EmailAuthProvider,
  sendSignInLinkToEmail,
  signOut,
  signInWithEmailLink,
} from "firebase/auth";
import { useRouter } from "next/navigation";0
const provider = new EmailAuthProvider();
const auth = getAuth(app);

const actionCodeSettings = {
  // URL you want to redirect back to. The domain (www.example.com) for this
  // URL must be in the authorized domains list in the Firebase Console.
  url: "https://scavng.com/email-login",
  // This must be true.
  handleCodeInApp: true,
};

function EmailLogin(props) {
  const router = useRouter();
  const [user, loading, error] = useAuthState(auth);

  // if (user) {
  //   router.push("/sheets");
  // }

  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  async function emailLogin() {
    const result = await sendSignInLinkToEmail(auth, email, actionCodeSettings)
      .then(() => {
        // The link was successfully sent. Inform the user.
        // Save the email locally so you don't need to ask the user for it again
        // if they open the link on the same device.
        window.localStorage.setItem("emailForSignIn", email);

        setEmailSent(true);

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        // ...
      });

    // await fetch("/api/login", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     uid: user.uid,
    //     displayname: user.displayName,
    //     email: user.email,
    //     photo: user.photoURL,
    //   }),
    // });

    // // fetch to /api/stripecreatecustomer
    // await fetch("/api/stripecreatecustomer", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     email: user.email,
    //     name: user.displayName,
    //     user_id: user.uid,
    //   }),
    // });
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        emailLogin();
      }}
    >
      {/* Tell the user if the email was sent */}
      {emailSent && (
        <p className="p-4 pl-0 text-primary">
          Email sent! Check your inbox for a sign in link
        </p>
      )}
      <div className="mb-2 flex flex-col gap-2">
        <input
          type="email"
          placeholder="email"
          className="text-gray-700 focus:shadow-outline rounded-lg mb-2 px-3 py-2 leading-tight focus:outline-none bg-gray-5 border-pbblack text-pbblack"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <button
        type="submit"
        className="mb-6 flex w-full items-center justify-center rounded-md bg-white p-3 text-base font-medium text-body-color shadow-one hover:text-gray-1 border border-gray-2"
      >
        <span className="mr-3">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_119_2)">
              <path
                d="M16.484 11.976L22.635 6.632V17.259L16.484 11.976ZM8.558 12.881L10.718 14.756C11.057 15.044 11.499 15.218 11.982 15.218H11.999H12.012C12.496 15.218 12.938 15.043 13.281 14.753L13.278 14.755L15.438 12.88L22.004 18.519H1.995L8.558 12.881ZM1.986 5.365H22.016L12.395 13.721C12.2868 13.8066 12.1529 13.8531 12.015 13.853H12.001H11.988C11.8496 13.8532 11.7152 13.8063 11.607 13.72L11.608 13.721L1.986 5.365ZM1.365 6.631L7.515 11.975L1.365 17.255V6.631ZM22.965 4.19C22.725 4.07 22.443 4 22.144 4H1.859C1.56916 4.00007 1.28331 4.06751 1.024 4.197L1.035 4.192C0.724573 4.34511 0.463148 4.58198 0.280254 4.87585C0.0973606 5.16971 0.000287348 5.50887 0 5.855L0 18.027C0.000529404 18.5196 0.196452 18.9919 0.54478 19.3402C0.893108 19.6885 1.36539 19.8845 1.858 19.885H22.141C22.6336 19.8845 23.1059 19.6885 23.4542 19.3402C23.8025 18.9919 23.9985 18.5196 23.999 18.027V5.855C23.999 5.128 23.58 4.498 22.97 4.195L22.959 4.19H22.965Z"
                fill="black"
              />
            </g>
            <defs>
              <clipPath id="clip0_119_2">
                <rect width="24" height="24" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </span>
        {props.method} using Email
      </button>
    </form>
  );
}

export default EmailLogin;
