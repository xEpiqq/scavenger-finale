import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUser,
  faCog,
  faFileLines,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Image from "next/image";

function Navbar() {
  return (
    <div className="z-4 top-0 flex h-12 items-center justify-start gap-2 border-r mr-1 border-gray-5 sm:h-screen sm:flex-col"
    style={{width: '80px'}}>
      <div className="aspect-square w-full p-4">
        <Link href="/" className="p-0">
          <img src="/images/logo/crow.png" alt="Logo" className=" w-full  " />
          </Link>
      </div>
      <div className="pb-2 pl-6 pr-6 pt-2 w-full">
        <Link href="/" className="p-0">
          <FontAwesomeIcon
            icon={faUser}
            className="h-full w-full transition-all duration-300 hover:text-primary"
          />
        </Link>
      </div>
      <div className="pb-2 pl-6 pr-6 pt-2">
        <Link href="/" className="p-0">
          <FontAwesomeIcon
            icon={faCog}
            className="h-full w-full transition-all duration-300 hover:text-primary"
          />
        </Link>
      </div>
      <div className="pb-2 pl-6 pr-6 pt-2">
        <Link href="/" className="p-0">
          <FontAwesomeIcon
            icon={faFileLines}
            className="h-full w-full transition-all duration-300 hover:text-primary"
          />
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
