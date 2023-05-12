import React, { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisV,
  faFileWord,
  faCircleArrowRight,
} from "@fortawesome/free-solid-svg-icons";

function Item({ name, link, phoneNumber, email, address, screenshot, selected, toggleselected }) {
  return (
    <tr>
      <td>
        <label className="flex justify-center items-center">
          <input type="checkbox" className="" checked={selected} onClick={toggleselected} />
        </label>
      </td>
      <td>
        <p>{name}</p>
      </td>
      <td>
        <p>{link}</p>
      </td>
      <td>
        <p>{phoneNumber}</p>
      </td>
      <td>
        <p>{email}</p>
      </td>
      <td>
        <img
          src={screenshot}
          alt={`Screenshot of ${name}`}
          className="h-12 w-12"
        />
      </td>
      <td>
        <p>{address}</p>
      </td>
      <td className="sticky right-0 shadow-sticky bg-white hover:cursor-pointer hover:bg-gray-3 transition-all duration-200">
        <div className="h-4 w-full flex justify-center items-center">
          <FontAwesomeIcon icon={faCircleArrowRight} />
        </div>
      </td>
    </tr>
  );
}

export default Item;
