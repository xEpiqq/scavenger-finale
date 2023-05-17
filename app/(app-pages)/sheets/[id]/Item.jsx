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
  emails,
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

  const display_email = () => {
    if (emails.length > 0) {
      return emails[0];
    } else {
      return "No email";
    }
  };


  return (
    <>
      <tr className="text-sm text-pbblack hover:bg-pbiconhover">
        <td>
          <label className="flex items-center justify-center px-7">
            <input type="checkbox" className="w-4 h-4" checked={selected} onClick={toggleselected}/>
          </label>
        </td>

        <td>
          {screenshot ? ( <> <img src={screenshot} alt={`Screenshot of ${name}`} className="h-10 w-16" /> </> ) : ( <> <div className="h-10 w-16 bg-pbwhitebtnhover" /> </> )}
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
          <p>{display_email}</p>
        </td>
        <td>
          <p>{address}</p>
        </td>
        <td className="sticky right-0 hover:cursor-pointer" onClick={clicked}>
          <div className="flex h-4 w-full items-center justify-center">
            <FontAwesomeIcon icon={faCircleArrowRight} />
          </div>
        </td>
      </tr>
      {openCRM && (
        <CRM name={name} link={link} phoneNumber={phoneNumber} email={display_email} id={id} object_id={object_id} setOpenCRM={setOpenCRM} />
      )}
    </>
  );
}

export default Item;
