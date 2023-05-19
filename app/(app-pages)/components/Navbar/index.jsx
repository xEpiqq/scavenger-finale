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
import { app } from '../../../../components/initializeFirebase'
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';

const auth = getAuth(app);


function Navbar(props) {

  const [signoutModal, setSignoutModal] = useState(false);
  const [currentPage, setCurrentPage] = useState("");
  const router = useRouter();

  async function handleSignOut() {
    await signOut(auth);
    router.push("/signup");
  }

  const pathname = usePathname();

  useEffect(() => {
    const sheetsRegex = /^\/sheets(?:\/([^\/]+))?/;
    const match = pathname.match(sheetsRegex);
    if (match && match[1]) {
      setCurrentPage("list");
    } else {
      setCurrentPage("overview");
    }

    if (pathname === "/sub") {
      setCurrentPage("sub");
    }

    console.log(currentPage);
  }, [pathname]);

  return (

    <>
    <div className="sticky top-0 sm:h-screen border-t-transparent border-b-0 border-l-0 border-pblines flex flex-row sm:flex-col"
    style={{ borderWidth: 1 }}
    
    >
    
    <div className="h-1/2 z-4 w-18 top-0 flex items-center justify-start gap-4 sm:flex-col p-1 bg-white">

      <div className="aspect-square w-16 p-2 mt-1">
        <Link href="/sheets" className="p-0">
          <img src="/bird.png" alt="Logo" className="w-full" draggable={false}/>
          </Link>
      </div>

      <Link href="/sheets" className="p-0">
        {currentPage === "overview" ? (
          <div className="w-11 h-11 rounded-xl mt-1 border-2 border-pbblack transition duration-150 flex items-center justify-center">
            <img src="/overview2.svg" alt="Logo" className="w-5" draggable={false}/>
          </div>
        ) : (
          <div className="w-11 h-11 rounded-xl mt-1 hover:bg-pbiconhover transition duration-150 flex items-center justify-center">
            <img src="/overview2.svg" alt="Logo" className="w-5" draggable={false}/>
          </div>
        )}
      </Link>

      {/* <Link href="/" className="p-0"> */}
      {currentPage === "list" ? (
          <div className="w-11 h-11 rounded-xl mt-1 transition duration-150 flex items-center justify-center border-2 border-pbblack">
            <img src="/listalt.svg" alt="Logo" className="w-5" draggable={false}/>
          </div>
        ) : (
          <div className="w-11 h-11 rounded-xl mt-1 transition duration-150 flex items-center justify-center">
            <img src="/listalt.svg" alt="Logo" className="w-5" draggable={false}/>
          </div>
        )}

      {/* </Link> */}


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
            <Link href="/sub" onClick={() => {setSignoutModal(false)}}>
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
            </Link>
            <span className="h-px bg-pblines"
            
            style={{ width: "97%" }}
            
            />
            <div className="flex items-center justify-start w-full hover:bg-pbiconhover rounded-md p-1 m-1 mb-0 transition duration-150 cursor-pointer"
              onClick={() => {setSignoutModal(false) ; handleSignOut()}} >
                <img src="/pblogout.png" className="w-4 h-4 ml-2" alt="Logout" />
                <div className="w-full">
                    <button className="py-2 px-4 hover:bg-gray-100 focus:outline-none text-xs text-left">
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
