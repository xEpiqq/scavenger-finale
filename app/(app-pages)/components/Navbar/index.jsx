"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUser,
  faCog,
  faFileLines,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { app, db } from "../../../../components/initializeFirebase";
import { useDocument } from "react-firebase-hooks/firestore";
import { doc } from "firebase/firestore";

const auth = getAuth(app);

function Navbar(props) {
  const [signoutModal, setSignoutModal] = useState(false);
  const [currentPage, setCurrentPage] = useState("");
  const router = useRouter();
  const [user, loading, error] = useAuthState(auth);
  const [userdata, userloading, usererror] = useDocument( 
    doc(db, `users/${user?.uid}`)
  );

  const uid = user?.uid;

  async function handleSignOut() {
    await signOut(auth);
    router.push("/signup");
  }

  const pathname = usePathname();

  useEffect(() => {
    const sheetsRegex = /^\/sheets(?:\/([^\/]+))?/;
    const match = pathname.match(sheetsRegex);
    if (match && match[1]) {
      if (match[1] === "favorites") {
        setCurrentPage("favorites");
      } else {
        setCurrentPage("list");
      }
    } else {
      setCurrentPage("overview");
    }

    if (pathname === "/sub") {
      setCurrentPage("sub");
    }

    if (pathname === "/profile") {
      setCurrentPage("profile");
    }

    console.log(currentPage);
  }, [pathname]);

  return (
    <>
      <div
        className="sticky left-0 top-0 z-30 float-left flex flex-row items-center border-b-0 border-l-0 border-pblines border-t-transparent bg-white sm:h-screen sm:flex-col"
        style={{ borderWidth: 1 }}
      >
        <div className="z-4 w-18 top-0 flex h-1/2 items-center justify-start gap-4 bg-white p-1 sm:flex-col">
          <div className="mt-1 aspect-square w-16 p-2">
            <Link href="/sheets" className="p-0">
              <img
                src="/bird.png"
                alt="Logo"
                className="w-full"
                draggable={false}
              />
            </Link>
          </div>

          <Link href="/sheets" className="p-0">
            {currentPage === "overview" ? (
              <div className="mt-1 flex h-11 w-11 items-center justify-center rounded-xl border-2 border-pbblack transition duration-150">
                <img
                  src="/overview2.svg"
                  alt="Logo"
                  className="w-5"
                  draggable={false}
                />
              </div>
            ) : (
              <div className="mt-1 flex h-11 w-11 items-center justify-center rounded-xl transition duration-150 hover:bg-pbiconhover">
                <img
                  src="/overview2.svg"
                  alt="Logo"
                  className="w-5"
                  draggable={false}
                />
              </div>
            )}
          </Link>
          <Link href="/sheets/favorites" className="p-0">
            {currentPage === "favorites" ? (
              <div className="mt-1 flex h-11 w-11 items-center justify-center rounded-xl border-2 border-pbblack transition duration-150">
                <img
                  src="/favoritesicon.svg"
                  alt="Logo"
                  className="w-5"
                  draggable={false}
                />
              </div>
            ) : (
              <div className="mt-1 flex h-11 w-11 items-center justify-center rounded-xl transition duration-150 hover:bg-pbiconhover">
                <img
                  src="/favoritesicon.svg"
                  alt="Logo"
                  className="w-5"
                  draggable={false}
                />
              </div>
            )}
          </Link>
          <Link href="/profile" className="p-0">
            {currentPage === "profile" ? (
              <div className="mt-1 flex h-11 w-11 items-center justify-center rounded-xl border-2 border-pbblack transition duration-150">
                <img
                  src="/profile_icon.svg"
                  alt="Logo"
                  className="w-5"
                  draggable={false}
                />
              </div>
            ) : (
              <div className="mt-1 flex h-11 w-11 items-center justify-center rounded-xl transition duration-150 hover:bg-pbiconhover">
                <img
                  src="/profile_icon.svg"
                  alt="Logo"
                  className="w-5"
                  draggable={false}
                />
              </div>
            )}
          </Link>

          {/* <Link href="/" className="p-0"> */}
          {currentPage === "list" ? (
            <div className="mt-1 flex h-11 w-11 items-center justify-center rounded-xl border-2 border-pbblack transition duration-150">
              <img
                src="/listalt.svg"
                alt="Logo"
                className="w-5"
                draggable={false}
              />
            </div>
          ) : (
            <div className="mt-1 flex h-11 w-11 items-center justify-center rounded-xl transition duration-150">
              <img
                src="/listalt.svg"
                alt="Logo"
                className="w-5"
                draggable={false}
              />
            </div>
          )}

          {/* </Link> */}
        </div>

        <div className="mb:0 flex-center relative mr-10 flex h-1/2 w-full items-center justify-end bg-white pb-4 pr-5 pt-3 sm:mb-16 sm:mr-0 sm:items-end sm:justify-center sm:pr-0 lg:mb-0">
          <img
            src={user?.photoURL}
            alt="Logo"
            className="w-12 rounded-full transition duration-150 hover:cursor-pointer"
            onClick={() => {
              setSignoutModal(!signoutModal);
            }}
            draggable={false}
          />

          {signoutModal && (
            <>
              <div
                className="absolute right-32 top-12 sm:left-2 sm:top-48 lg:top-56 2xl:top-64"
                onClick={() => setSignoutModal(false)}
              >
                <div
                  className="absolute z-10 mb-1 flex w-36 flex-col items-center overflow-hidden rounded-md border-pblines bg-white p-1 shadow-sm transition duration-300"
                  onClick={(e) => e.stopPropagation()}
                  style={{ borderWidth: 1 }}
                >
                  <div className="mt-0 flex w-full items-center justify-start rounded-md p-1 transition duration-150 hover:bg-pbiconhover">
                    <img
                      src="/pbmanagesub.png"
                      className="ml-2 h-4 w-4"
                      alt="Manage Subscription"
                    />
                    <div className="w-full">
                      <form method="POST" action="/api/stripebilling">
                        <input type="hidden" name="user_id" value={uid} />
                        <button
                          type="submit"
                          role="link"
                          className="px-4 py-2 text-left text-xs hover:bg-gray-100 focus:outline-none"
                        >
                          <div className="flex items-center">
                            <div>Subscription</div>
                          </div>
                        </button>
                      </form>
                    </div>
                  </div>

                  {userdata?.data()?.affiliate && (
                    <Link
                      href="/affiliate"
                      className="w-full"
                      onClick={() => {
                        setSignoutModal(false);
                      }}
                    >
                      <div className="mb-1 mt-0 flex w-full items-center justify-start rounded-md p-1 transition duration-150 hover:bg-pbiconhover">
                        <img
                          src="/affiliate.svg"
                          className="ml-2 h-4 w-4"
                          alt="Affiliate"
                        />
                        <div className="w-full">
                          <button className="px-4 py-2 text-left text-xs hover:bg-gray-100 focus:outline-none">
                            <div className="flex items-center">
                              <div>Affiliate</div>
                            </div>
                          </button>
                        </div>
                      </div>
                    </Link>
                  )}

                  <Link
                    href="/"
                    className="w-full"
                    onClick={() => {
                      setSignoutModal(false);
                    }}
                  >
                    <div className="mb-1 mt-0 flex w-full items-center justify-start rounded-md p-1 transition duration-150 hover:bg-pbiconhover">
                      <img
                        src="/home_icon.png"
                        className="ml-2 h-4 w-4"
                        alt="Manage Subscription"
                      />
                      <div className="w-full">
                        <button className="px-4 py-2 text-left text-xs hover:bg-gray-100 focus:outline-none">
                          <div className="flex items-center">
                            <div>Home</div>
                          </div>
                        </button>
                      </div>
                    </div>
                  </Link>
                  <span className="h-px bg-pblines" style={{ width: "97%" }} />
                  <div
                    className="m-1 mb-0 flex w-full cursor-pointer items-center justify-start rounded-md p-1 transition duration-150 hover:bg-pbiconhover"
                    onClick={() => {
                      setSignoutModal(false);
                      handleSignOut();
                    }}
                  >
                    <img
                      src="/pblogout.png"
                      className="ml-2 h-4 w-4"
                      alt="Logout"
                    />
                    <div className="w-full">
                      <button className="px-4 py-2 text-left text-xs hover:bg-gray-100 focus:outline-none">
                        <div className="flex items-center">
                          <div>Logout</div>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="fixed left-0 top-0 z-0 h-screen w-screen"
                onClick={() => setSignoutModal(false)}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Navbar;
