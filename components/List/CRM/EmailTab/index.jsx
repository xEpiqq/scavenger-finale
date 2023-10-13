import react from "react";
import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  getFirestore,
  doc,
  getDoc,
  updateDoc,
  collection,
  addDoc,
} from "firebase/firestore";
import { app, db } from "@/components/initializeFirebase";
import { getAuth, signOut } from "firebase/auth";
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const auth = getAuth(app);

function EmailTab({ item, closeCRM }) {
  const [subject, setSubject] = useState(item.emailSubject);
  const [emailBody, setEmailBody] = useState(item.emailBody);

  const [isLoadingEmail, setIsLoadingEmail] = useState(false);
  const [profileIsComplete, setProfileIsComplete] = useState(false);
  const [user, loading, user_error] = useAuthState(auth);
  const [currentEmail, setCurrentEmail] = useState("");

  const isProfileComplete = async () => {
    if (!user) {
      return true;
    }
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      return false;
    }
    const data = docSnap.data();
    if (
      !data.firstName ||
      !data.lastName ||
      !data.company ||
      !data.email ||
      !data.phone
    ) {
      return false;
    }
    return true;
  };

  const createEmail = async () => {
    // we need to call the api to create the email
    if (!user) {
      alert("You must be logged in to create an email");
      return;
    }

    const docRef = doc(db, "users", user.uid);
    setIsLoadingEmail(true);

    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      return;
    }

    await fetch("/api/create-email", {
      method: "POST",
      body: JSON.stringify({
        item: item,
        user: {
          firstName: docSnap.data().firstName,
          lastName: docSnap.data().lastName,
          buisnessName: docSnap.data().buisnessName,
          email: docSnap.data().email,
          phone: docSnap.data().phone,
        },
      }),
    });
  };

  useEffect(() => {
    item.emailBody = emailBody;
    item.changedFlag = true;
  }, [emailBody]);

  useEffect(() => {
    item.subject = subject;
    item.changedFlag = true;
  }, [subject]);

  useEffect(() => {
    setEmailBody(item.emailBody);
    setIsLoadingEmail(false);
  }, [item.emailBody]);

  useEffect(() => {
    isProfileComplete().then((isComplete) => {
      setProfileIsComplete(isComplete);
    });
  }, [user]);

  return (
    <>
      <div className="flex w-full flex-grow flex-col gap-8 px-9 pb-4 pt-7 text-sm text-pbblack">
        {!profileIsComplete && (
          <div>
            <a
              href="/profile"
              className="font-semibold text-pbblack hover:underline"
            >
              Click here to update your profile for a more customized email
            </a>
          </div>
        )}
        <div className="flex w-full flex-col gap-3 sm:flex-row">
          <div className="flex w-full flex-col gap-1">
            <label
              htmlFor="decision-maker"
              className="ml-1 font-semibold text-pblines"
            >
              Email Address
            </label>
            {item.emails ? (
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="text-gray-900 ring-gray-300 hover:bg-gray-50 inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset">
                    {currentEmail ? currentEmail : "Select Email"}
                    <ChevronDownIcon
                      className="text-gray-400 -mr-1 h-5 w-5"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {item.emails.map((email) => (
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={classNames(
                                active
                                  ? "bg-gray-100 text-gray-900 hover:text-gray-700"
                                  : "text-gray-700",
                                "block px-4 py-2 text-sm"
                              )}
                              onClick={() => {
                                setCurrentEmail(email);
                              }}
                            >
                              {email}
                            </button>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            ) : (
              <input
                type="text"
                id="decision-maker"
                placeholder="Email Address"
                className="hover:pblines h-10 w-full rounded-md bg-pbiconhover px-4 py-2 outline-none transition-all duration-200 focus:bg-pblines"
                value={item.email}
              />
            )}
          </div>
          <div className="flex w-full flex-col gap-1">
            <label
              htmlFor="decision-maker"
              className="ml-1 font-semibold text-pblines"
            >
              Subject
            </label>
            <input
              type="text"
              id="decision-maker"
              placeholder="Subject"
              className="hover:pblines h-10 w-full rounded-md bg-pbiconhover px-4 py-2 outline-none transition-all duration-200 focus:bg-pblines"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>
        </div>
        <div className="mt-2 flex w-full flex-grow">
          <textarea
            rows={4}
            name="comment"
            id="comment"
            className="text-gray- ring-gray-300  placeholder:text-gray-400 focus:ring-indigo-600block w-full flex-grow rounded-md border-0 bg-pbiconhover p-4 py-1.5 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm  sm:leading-6"
            value={emailBody}
            onChange={(e) => setEmailBody(e.target.value)}
          />
        </div>
      </div>
      <div className="sticky flex w-full flex-shrink-0 items-center justify-end gap-4 border-t border-pblines bg-pbsecondbg p-4 px-7">
        <button
          onClick={closeCRM}
          className="h-10 w-24 rounded-md bg-white text-sm font-semibold text-pbblack transition duration-75 hover:bg-pbiconhover"
        >
          Close
        </button>
        <button
          onClick={createEmail}
          className="h-10 w-36 rounded-md bg-pbblack text-sm font-semibold text-white transition duration-75 hover:bg-pbblackhover"
        >
          {/* Loading spinner */}
          {isLoadingEmail ? (
            <div role="status w-full flex justify-center flex-row items-center">
              <svg
                aria-hidden="true"
                class="dark:text-gray-600 mr-2 h-6 w-full animate-spin fill-primary text-gray-3"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
            </div>
          ) : (
            "Draft AI Email"
          )}
        </button>
        <a
          href={`mailto:${encodeURIComponent(
            currentEmail ? currentEmail : item.email
          )}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
            emailBody
          )}`}
          className={`flex h-10 w-10 items-center justify-center rounded-md bg-pbblack text-sm font-semibold text-white transition duration-75 hover:bg-pbblackhover sm:w-36 ${
            isLoadingEmail ? "cursor-not-allowed" : ""
          }`}
        >
          <p className="mx-3 hidden sm:block">Send Email</p>
          <svg
            className="h-5 w-5"
            fill="#ffffff"
            viewBox="0 0 495.003 495.003"
            stroke="#ffffff"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0" />

            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            />

            <g id="SVGRepo_iconCarrier">
              {" "}
              <g id="XMLID_51_">
                {" "}
                <path
                  id="XMLID_53_"
                  d="M164.711,456.687c0,2.966,1.647,5.686,4.266,7.072c2.617,1.385,5.799,1.207,8.245-0.468l55.09-37.616 l-67.6-32.22V456.687z"
                />{" "}
                <path
                  id="XMLID_52_"
                  d="M492.431,32.443c-1.513-1.395-3.466-2.125-5.44-2.125c-1.19,0-2.377,0.264-3.5,0.816L7.905,264.422 c-4.861,2.389-7.937,7.353-7.904,12.783c0.033,5.423,3.161,10.353,8.057,12.689l125.342,59.724l250.62-205.99L164.455,364.414 l156.145,74.4c1.918,0.919,4.012,1.376,6.084,1.376c1.768,0,3.519-0.322,5.186-0.977c3.637-1.438,6.527-4.318,7.97-7.956 L494.436,41.257C495.66,38.188,494.862,34.679,492.431,32.443z"
                />{" "}
              </g>{" "}
            </g>
          </svg>
        </a>
      </div>
    </>
  );
}

export default EmailTab;
