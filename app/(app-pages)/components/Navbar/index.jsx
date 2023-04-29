import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faUser, faCog } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

function Navbar() {
  return (
    <div className="flex flex-col w-12 h-screen bg-gray-800 bg-dark sticky gap-2 p-2 top-0">
      <Link href="/" className="">
        <span>
          <FontAwesomeIcon icon={faHome} />
        </span>
      </Link>
      <Link href="/profile">
        <span>
          <FontAwesomeIcon icon={faUser} />
        </span>
      </Link>
      <Link href="/settings">
        <span>
          <FontAwesomeIcon icon={faCog} />
        </span>
      </Link>
    </div>
  );
}

export default Navbar;