import React, { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisV,
  faFileWord,
  faCircleArrowRight,
} from "@fortawesome/free-solid-svg-icons";

function Item({ name, link, phoneNumber, email, address, screenshot }) {
  const [showScreenshot, setShowScreenshot] = useState(false);

  const toggleScreenshot = () => {
    setShowScreenshot(!showScreenshot);
  };

  return (
    <div
      className="relative flex w-full max-w-screen-lg flex-col justify-evenly rounded-md bg-gray-3 p-4 sm:grid sm:grid-flow-row sm:grid-cols-5 sm:gap-4 sm:items-center sm:justify-center sm:shadow-md sm:hover:shadow-lg sm:hover:bg-gray-2 sm:hover:opacity-100 sm:hover:scale-105 sm:z-10 transition-all duration-300"
      onMouseEnter={toggleScreenshot}
      onMouseLeave={toggleScreenshot}
    >
      {link ? (
      <Link href={link}>
        <h3>{name}</h3>
      </Link>
      ) : (
        <h3>{name}</h3>
      )}
      <p>{phoneNumber}</p>
      <p>{email}</p>
      <p>{address}</p>
      <div className="h-4 w-4 p-1">
        <FontAwesomeIcon icon={faCircleArrowRight} />
      </div>
      <img
        src={screenshot}
        alt={`Screenshot of ${name}`}
        className="sm:hidden sm:opacity-80 block pointer-events-none rounded-md shadow-md mt-3 z-100"
      />
      {showScreenshot && (
        <img
          src={screenshot}
          alt={`Screenshot of ${name}`}
          className="pointer-events-none absolute left-0 top-full z-100 h-20 rounded-md object-contain opacity-80 shadow-md sm:block hidden"
        />
      )}
    </div>
  );
}

export default Item;
