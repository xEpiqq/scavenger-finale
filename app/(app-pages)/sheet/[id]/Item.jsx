"use client";
import react from "react";
import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisV,
  faFileWord,
  faCircleArrowRight,
} from "@fortawesome/free-solid-svg-icons";

function Item({ id, name, link, phoneNumber, email, address }) {
  return (
    <div className="flex w-full max-w-screen-lg flex-row justify-evenly rounded-md bg-gray-3 p-4">
      <Link href={link}>
        <h3>{name}</h3>
      </Link>
      <p>{phoneNumber}</p>
      <p>{email}</p>
      <p>{address}</p>
      <div className="h-4 w-4">
        <FontAwesomeIcon icon={faCircleArrowRight} />
      </div>
    </div>
  );
}

export default Item;
