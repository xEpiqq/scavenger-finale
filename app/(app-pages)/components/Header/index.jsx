"use client";

import react from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { app } from "../../../../components/initializeFirebase";
import { getAuth } from "firebase/auth";
const auth = getAuth(app);

function Header() {
  const [user, loading, error] = useAuthState(auth);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>Not logged in</div>;
  return (
    <div className="sticky top-0 flex h-8 flex-row">
      <div className="flex items-center justify-end lg:pr-0 w-full">
        <img
          src={user.photoURL}
          alt="User Photo"
          className="rounded-full hover:cursor-pointer w-6 h-6 aspect-square mr-16"
        ></img>

        <div></div>
      </div>
    </div>
  );
}

export default Header;
