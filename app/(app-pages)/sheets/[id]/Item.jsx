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
  secured,
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
  facebook,
  instagram,
  twitter,
  linkedin,
  youtube,
  contact_us
}) {
  const [openCRM, setOpenCRM] = useState(false);
  const [openCopy, setOpenCopy] = useState(false);

  const clickable_link = "http://" + link;
  
  let email_length;
  
  if (emails) {
    email_length = emails.length;
  } else {
    email_length = 0;
  }


  const clicked = () => {
    setOpenCRM(!openCRM);
  };

  const copyItem = (itemtocopy) => {
    navigator.clipboard.writeText(itemtocopy);
    setOpenCopy(true);
    setTimeout(() => {
      setOpenCopy(false);
    }
    , 1000);
  }

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
          {secured ? ( <> <img src="/securedtrue.svg" alt={`Screenshot of ${name}`} className="h-4 w-4" /> </> ) : ( <> <img src="/securedfalse.svg" className="h-4 w-4" /> </> )}
        </td>

        <td>
          { link !== "none" ? (
          <Link href={clickable_link} target="_blank"> 
          <p className="hover:underline">{name}</p>
          </Link> ) :
          ( <p>{name}</p> )
          }

        </td>
        <td>
          <div className="flex gap-3">
            <p>{phoneNumber}</p>
            <img src="/copy.svg" className="w-2.5 cursor-pointer hover:opacity-50 transition duration-75 hover:scale-105" onClick={() => {copyItem(phoneNumber)}} draggable={false}/>
          </div>
        </td>

        <td>

          
            { email_length > 0 ? (
              <div className="flex gap-3">
                        <p>{emails[0]}</p>
                        <img src="/copy.svg" className="w-2.5 cursor-pointer hover:opacity-50 transition duration-75 hover:scale-105" 
                        onClick={() => {copyItem(emails[0])}} draggable={false}/>
              </div> ) :
              ( <div className="flex gap-3">
                        <p>{contact_us}</p>
                        { contact_us ? ( <img src="/copy.svg" className="w-2.5 cursor-pointer hover:opacity-50 transition duration-75 hover:scale-105" onClick={() => {copyItem(contact_us)}} draggable={false}/> ) : ( <></> ) }
              </div> )
            }

        </td>

        <td>
          <div className="flex gap-1">
            { facebook ? (
              <Link href={facebook} target="_blank" ><img src="/Facebook.svg" alt="facebook link" className="h-5 w-5" />
              </Link> ) : ( <> <img src="/Facebook.svg" alt="facebook link" className="h-5 w-5 opacity-40" /> </> 
            )}
            { instagram ? (
              <Link href={instagram} target="_blank" ><img src="/Instagram.svg" alt="instagram link" className="h-5 w-5" />
              </Link> ) : ( <> <img src="/Instagram.svg" alt="instagram link" className="h-5 w-5 opacity-40" /> </> 
            )}
            { twitter ? (
              <Link href={twitter} target="_blank" ><img src="/Twitter.svg" alt="twitter link" className="h-5 w-5" />
              </Link> ) : ( <> <img src="/Twitter.svg" alt="twitter link" className="h-5 w-5 opacity-40" /> </> 
            )}
            { linkedin ? (
              <Link href={linkedin} target="_blank" ><img src="/LinkedIn.svg" alt="linkedin link" className="h-5 w-5" />
              </Link> ) : ( <> <img src="/LinkedIn.svg" alt="linkedin link" className="h-5 w-5 opacity-40" /> </> 
            )}
            { youtube ? (
              <Link href={youtube} target="_blank"><img src="/Youtube.svg" alt="youtube link" className="h-5 w-5" />
              </Link> ) : ( <> <img src="/Youtube.svg" alt="youtube link" className="h-5 w-5 opacity-40" /> </> 
            )}
          </div>
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

      {openCopy && (
        <div className="flex justify-center items-center fixed z-50 w-28 h-9 bottom-0 right-0 mb-5 mr-5 bg-white text-pbblack text-sm font-medium py-1 px-3 rounded-md shadow-md">
          Copied!
        </div>
      )}

      {openCRM && (
        <CRM name={name} link={link} phoneNumber={phoneNumber} email={display_email} id={id} object_id={object_id} setOpenCRM={setOpenCRM} />
      )}



    </>
  );
}

export default Item;
