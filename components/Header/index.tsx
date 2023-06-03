"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import ThemeToggler from "./ThemeToggler";
import menuData from "./menuData";
import { getAuth } from "firebase/auth";
import { app } from "../../components/initializeFirebase";
import { useDocument } from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { getFirestore, doc } from "firebase/firestore";
import SignupModal from "../../components/Signupmodal/signupmodal";

const auth = getAuth(app);
const db = getFirestore(app);

const Header = () => {
  const [signup, setSignup] = useState(false);

  const [user, loading, error] = useAuthState(auth);
  const [userDataRaw, loading2, error2] = useDocument(
    doc(db, `users/${user?.uid}`)
  );
  const userData = userDataRaw?.data();
  // Navbar toggle

  const [navbarOpen, setNavbarOpen] = useState(false);
  const navbarToggleHandler = () => {
    setNavbarOpen(!navbarOpen);
  };

  // Sticky Navbar
  const [sticky, setSticky] = useState(false);
  const handleStickyNavbar = () => {
    if (window.scrollY >= 80) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleStickyNavbar);
  });

  // submenu handler
  const [openIndex, setOpenIndex] = useState(-1);
  const handleSubmenu = (index) => {
    if (openIndex === index) {
      setOpenIndex(-1);
    } else {
      setOpenIndex(index);
    }
  };

  return (
    <>
    

      {signup && <SignupModal setSignup={setSignup} />}
        <header className="header left-0 top-7 !z-[15] h-28 flex w-full items-center bg-transparent absolute">

        <div className="container">
          <div className="relative -mx-4 flex items-center justify-between">
            <div className="ml-16 w-20 md:w-16  max-w-full xl:mr-12">
              <Link
                href="/"
                className="header-logo flex w-full flex-row items-center justify-center -ml-9 md:ml-0 py-4"
              >
                <Image
                  src="/images/logo/crow.png"
                  alt="logo"
                  width={1024}
                  height={1024}
                  className="mr-2 w-full"
                />
                <h1 className="hidden text-2xl font-bold text-white md:block">
                  Scavenger
                </h1>
              </Link>
            </div>
            <div className="flex w-full items-center justify-end">
              <div></div>
              <div className="flex items-center justify-end pr-6 lg:pr-0">
                {user ? (
                  <div className="flex flex-row items-center justify-center gap-4">
                    <Link
                      href="/sheets"
                      className="rounded-lg border border-white bg-primary px-5 py-3 text-sm font-semibold text-white transition duration-150 hover:bg-black"
                    >
                      Dashboard
                    </Link>
                    {/* <img
                      src={`${user?.photoURL}`}
                      alt="User Photo"
                      className="h-8 w-8 rounded-full sm:h-12 sm:w-12"
                    ></img> */}
                  </div>
                ) : (
                  <button
                    onClick={() => setSignup(true)}
                    className="ease-in-up hidden rounded-md bg-white px-8 py-3 text-base font-bold text-black transition duration-300 hover:bg-white hover:bg-opacity-90 hover:text-black hover:shadow-signUp md:block md:px-9 lg:px-6 xl:px-9"
                  >
                    Try For Free
                  </button>
                )}

                <div></div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
