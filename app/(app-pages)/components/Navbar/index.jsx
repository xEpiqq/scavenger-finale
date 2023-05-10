import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUser,
  faCog,
  faFileLines,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import { app } from '../../../../components/initializeFirebase'
const auth = getAuth(app);


function Navbar(props) {

  const [signoutModal, setSignoutModal] = useState(false);

  async function handleSignOut() {
    await signOut(auth);
  }

  return (

    <>
    <div className="sm:h-screen border-t-transparent border-b-0 border-l-0 border-pblines flex flex-row sm:flex-col"
    style={{ borderWidth: 1 }}
    
    >
    
    <div className="h-1/2 z-4 w-18 top-0 flex items-center justify-start gap-4 sm:flex-col p-0.5 bg-white">

      <div className="aspect-square w-22 p-4 mt-1">
        <Link href="/sheets" className="p-0">
          <img src="/pblogo.svg" alt="Logo" className=" w-full" />
          </Link>
      </div>
      <div className="w-12 mt-1 hover:bg-pbiconhover transition duration-150">
        <Link href="/" className="p-0">
        <img src="/pbdblogo.png" alt="Logo" className=" w-full" />

        </Link>
      </div>
      <div className="w-11 rounded-xl border-2 border-black p-3">
        <Link href="/" className="p-0">
        <img src="/pbbarlogo.svg" alt="Logo" className=" w-full" />
        </Link>
      </div>
      <div className="w-12">
        <Link href="/" className="p-0">
        <img src="/pbsettingslogo.png" alt="Logo" className=" w-full" />
        </Link>
      </div>
    </div>

    <div className="flex sm:items-end items-center h-1/2 sm:justify-center pb-4 justify-end flex-center w-full pt-3 pr-5 sm:pr-0">
    <img src="/profpic.png" alt="Logo" className="w-12 hover:cursor-pointer" onClick={() => {setSignoutModal(!signoutModal)}} draggable={false}/>
    
    {signoutModal && (
    <div
        className="fixed inset-0 z-50"
        onClick={() => setSignoutModal(false)}
    >
        <div
            className="absolute bottom-16 left-4 w-36 rounded-md overflow-hidden border-pblines bg-white mb-1 flex items-center flex-col p-1 shadow-sm duration-300 transition"
            onClick={(e) => e.stopPropagation()}
            style={{ borderWidth: 1 }}
        >
            <div className="flex items-center justify-start w-full hover:bg-pbiconhover rounded-md p-1 m-1 mt-0 transition duration-150">
                <img src="/pbmanagesub.png" className="w-4 h-4 ml-2" alt="Manage Subscription" />
                <div className="w-full">
                    <button className="py-2 px-4 hover:bg-gray-100 focus:outline-none text-xs text-left">
                        <div className="flex items-center">
                            <div>Subscription</div>
                        </div>
                    </button>
                </div>
            </div>
            <span className="h-px bg-pblines"
            
            style={{ width: "97%" }}
            
            />
            <div className="flex items-center justify-start w-full hover:bg-pbiconhover rounded-md p-1 m-1 mb-0 transition duration-150">
                <img src="/pblogout.png" className="w-4 h-4 ml-2" alt="Logout" />
                <div className="w-full">
                    <button
                        className="py-2 px-4 hover:bg-gray-100 focus:outline-none text-xs text-left"
                        onClick={() => setSignoutModal(false)}
                    >
                        <div className="flex items-center">
                            <div>Logout</div>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    </div>
    
)}

    </div>
  </div>
  </>
);
}

export default Navbar;
