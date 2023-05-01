import React, { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisV,
  faFileWord,
  faCircleArrowRight,
} from "@fortawesome/free-solid-svg-icons";

function Item({ id, name, link, phoneNumber, email, address, screenshot }) {
  const [showScreenshot, setShowScreenshot] = useState(false);

  const toggleScreenshot = () => {
    setShowScreenshot(!showScreenshot);
  };

  return (
    <div
      className="relative flex w-full max-w-screen-lg flex-col justify-evenly rounded-md bg-gray-3 p-4 sm:flex-row"
      onMouseEnter={toggleScreenshot}
      onMouseLeave={toggleScreenshot}
    >
      <Link href={link}>
        <h3>{name}</h3>
      </Link>
      <p>{phoneNumber}</p>
      <p>{email}</p>
      <p>{address}</p>
      <div className="h-4 w-4 p-1">
        <FontAwesomeIcon icon={faCircleArrowRight} />
      </div>
      <img
        src={screenshot}
        alt={`Screenshot of ${name}`}
        className="sm:hidden sm:opacity-80 block pointer-events-none rounded-md shadow-md mt-3"
      />
      {showScreenshot && (
        <img
          src={screenshot}
          alt={`Screenshot of ${name}`}
          className="pointer-events-none absolute left-0 top-full z-10 h-20 rounded-md object-contain opacity-80 shadow-md sm:block hidden"
        />
      )}
    </div>
  );
}

export default Item;
