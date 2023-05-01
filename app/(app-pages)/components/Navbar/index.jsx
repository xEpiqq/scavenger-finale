import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faUser, faCog, faFileLines } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Image from "next/image";

function Navbar() {
  return (
    <div className="flex sm:flex-col sm:w-12 sm:h-screen flex-row h-12 w-screen justify-start items-center z-50 bg-gray-800 bg-gray-2 sticky gap-2 p-2 top-0">
      <Link href="/" className="">
        <span>
          <Image src="/images/logo/crow.png" width={50} height={50} alt="Logo" />
        </span>
      </Link>
      <Link href="/profile">
        <div>
          <FontAwesomeIcon icon={faUser} className="w-6 h-6 hover:text-primary transition-all duration-300" />
        </div>
      </Link>
      <Link href="/settings">
        <div>
          <FontAwesomeIcon icon={faCog} className="w-6 h-6 hover:text-primary transition-all duration-300" />
        </div>
      </Link>
      <Link href="/sheets">
        <div>
          <FontAwesomeIcon icon={faFileLines} className="w-6 h-6 hover:text-primary transition-all duration-300" />
        </div>
      </Link>
    </div>
  );
}

export default Navbar;