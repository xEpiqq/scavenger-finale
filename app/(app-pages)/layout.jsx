"use client";
import react from "react";
import Navbar from "./components/Navbar";
import "../../styles/index.css";
import UpgradePopup from "../../components/UpgradePopup/index";
import TrialEndUpgradePopup from "../../components/UpgradePopup/trialendindex";
import Header from "./components/Header/index";
import { app, db } from "../../components/initializeFirebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import { doc } from "firebase/firestore";
import { useDocument } from "react-firebase-hooks/firestore";
const auth = getAuth(app);

function Layout({ children }) {
  const [user, loading, user_error] = useAuthState(auth);
  const [userDataRaw, loading2, error2] = useDocument(
    doc(db, `users/${user?.uid}`)
  );
  const userData = userDataRaw?.data();

  if (userData?.subscription_status === "none") {
    return (
      <div className="flex h-full w-full flex-col bg-white text-black sm:flex-row">
        <div className="fixed z-50 flex h-full w-full items-center justify-center">
          {" "}
          <UpgradePopup />{" "}
        </div>
        <Navbar />
        <section className="h-full w-full">
          <Header />
          {children}
        </section>
      </div>
    );
  }

  if (userData?.subscription_status === "cancelled") {
    return (
      <div className="flex h-full w-full flex-col bg-white text-black sm:flex-row">
        <div className="fixed z-50 flex h-full w-full items-center justify-center">
          {" "}
          <TrialEndUpgradePopup />{" "}
        </div>
        <Navbar />
        <section className="h-full w-full">
          <Header />
          {children}
        </section>
      </div>
    );
  }

  if (userData?.subscription_status === "active") {
    return (
      <div className="flex flex-col w-full h-full text-black bg-white sm:flex-row">
        <Navbar />
        <section className="w-full overflow-x-clip">{children}</section>
      </div>
    );
  }
}

export default Layout;
