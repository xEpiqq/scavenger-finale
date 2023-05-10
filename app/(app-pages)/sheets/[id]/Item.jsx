import React, { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisV,
  faFileWord,
  faCircleArrowRight,
} from "@fortawesome/free-solid-svg-icons";

function Item({ name, link, phoneNumber, email, address, screenshot }) {
  return (
    <tr className="h-12 w-10 border-b border-gray-5 transition-all duration-300 sm:hover:bg-gray-6">
      <td className="">
        <label className="flex h-4 w-4 items-center justify-center">
          <input type="checkbox" className="" />
        </label>
      </td>
      <td>
        <p className="whitespace-nowrap">{name}</p>
      </td>
      <td>
        <p className="whitespace-nowrap">{link}</p>
      </td>
      <td>
        <p className="whitespace-nowrap">{phoneNumber}</p>
      </td>
      <td>
        <p className="whitespace-nowrap">{email}</p>
      </td>
      <td>
        <img
          src={screenshot}
          alt={`Screenshot of ${name}`}
          className="h-12 w-12"
        />
      </td>
      <td>
        <p className="whitespace-nowrap">{address}</p>
      </td>
      <td className="sticky right-0 bg-white ">
        <div className="h-4 w-full flex justify-center items-center ">
          <FontAwesomeIcon icon={faCircleArrowRight} />
        </div>
      </td>
    </tr>
  );
}

export default Item;
