"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisV,
  faFileWord,
  faCircleArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import CRM from "./CRM";

function Item({
  name,
  link,
  phoneNumber,
  email,
  address,
  screenshot,
  selected,
  toggleselected,
  id,
  object_id,
}) {
  const [openCRM, setOpenCRM] = useState(false);

  const clicked = () => {
    setOpenCRM(!openCRM);
  };

  return (
    <>
      <tr onClick={clicked}>
        <td>
          <label className="flex items-center justify-center">
            <input
              type="checkbox"
              className=""
              checked={selected}
              onClick={toggleselected}
            />
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
        <td className="sticky right-0 bg-white shadow-sticky transition-all duration-200 hover:cursor-pointer hover:bg-gray-3">
          <div className="flex h-4 w-full items-center justify-center">
            <FontAwesomeIcon icon={faCircleArrowRight} />
          </div>
        </td>
      </tr>
      {openCRM && (
        <CRM name={name} link={link} phoneNumber={phoneNumber} email={email} id={id} object_id={object_id} setOpenCRM={setOpenCRM} />
      )}
    </>
  );
}

export default Item;
