"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import CRM from "./CRM";

function Item({
  userRef,
  sheetRef,
  item,
}) {
  const [openCRM, setOpenCRM] = useState(false);
  const [openCopy, setOpenCopy] = useState(false);

  const clickable_link = "http://" + item.siteLink;

  const clicked = () => {
    setOpenCRM(!openCRM);
  };

  const copyItem = (itemtocopy) => {
    navigator.clipboard.writeText(itemtocopy);
    setOpenCopy(true);
    setTimeout(() => {
      setOpenCopy(false);
    }, 1000);
  };

  useEffect(() => {
    console.log("item changed", item)
    console.log(item)
    item.updateIfChanged();
  }, [openCRM]);

  return (
    <>
      <tr className="text-sm text-pbblack hover:bg-pbiconhover">
        <td>
          <label className="flex items-center justify-center px-7">
            <input
              type="checkbox"
              className="h-4 w-4"
              checked={true}
              onClick={() => console.log("clicked")}
              onChange={() => {}}
            />
          </label>
        </td>

        <td>
          {item.thumbnailScreenshot ? (
            <>
              {" "}
              <img
                src={item.thumbnailScreenshot}
                alt={`Screenshot of ${item.name}`}
                className="h-10 w-16"
              />{" "}
            </>
          ) : (
            <>
              {" "}
              <div className="h-10 w-16 bg-pbwhitebtnhover" />{" "}
            </>
          )}
        </td>

        <td>
          {item.hasSSL ? (
            <>
              {" "}
              <img
                src="/securedtrue.svg"
                alt={`Screenshot of ${item.name}`}
                className="h-4 w-4"
              />{" "}
            </>
          ) : (
            <>
              {" "}
              <img src="/securedfalse.svg" className="h-4 w-4" />{" "}
            </>
          )}
        </td>

        <td>
          {item.siteLink !== "none" ? (
            <Link href={clickable_link} target="_blank">
              <p className="hover:underline">{item.name}</p>
            </Link>
          ) : (
            <p>{item.name}</p>
          )}
        </td>
        <td>
          <div className="flex gap-3">
            <p>{item.phoneNumber}</p>
            <img
              src="/copy.svg"
              className="w-2.5 cursor-pointer transition duration-75 hover:scale-105 hover:opacity-50"
              onClick={() => {
                copyItem(item.phoneNumber);
              }}
              draggable={false}
            />
          </div>
        </td>

        <td>
          {item.email ? (
            <div className="flex gap-3">
              <p>{item.email}</p>
              <img
                src="/copy.svg"
                className="w-2.5 cursor-pointer transition duration-75 hover:scale-105 hover:opacity-50"
                onClick={() => {
                  copyItem(item.email);
                }}
                draggable={false}
              />
            </div>
          ) : (
            <div className="flex gap-3">
              <p>{item.contactUs}</p>
              {item.contactUs ? (
                <img
                  src="/copy.svg"
                  className="w-2.5 cursor-pointer transition duration-75 hover:scale-105 hover:opacity-50"
                  onClick={() => {
                    copyItem(item.contactUs);
                  }}
                  draggable={false}
                />
              ) : (
                <></>
              )}
            </div>
          )}
        </td>

        <td>
          <div className="flex gap-1">
            {item.facebook ? (
              <Link href={item.facebook} target="_blank">
                <img
                  src="/Facebook.svg"
                  alt="facebook link"
                  className="h-5 w-5"
                />
              </Link>
            ) : (
              <>
                {" "}
                <img
                  src="/Facebook.svg"
                  alt="facebook link"
                  className="h-5 w-5 opacity-40"
                />{" "}
              </>
            )}
            {item.instagram ? (
              <Link href={item.instagram} target="_blank">
                <img
                  src="/Instagram.svg"
                  alt="instagram link"
                  className="h-5 w-5"
                />
              </Link>
            ) : (
              <>
                {" "}
                <img
                  src="/Instagram.svg"
                  alt="instagram link"
                  className="h-5 w-5 opacity-40"
                />{" "}
              </>
            )}
            {item.twitter ? (
              <Link href={item.twitter} target="_blank">
                <img
                  src="/Twitter.svg"
                  alt="twitter link"
                  className="h-5 w-5"
                />
              </Link>
            ) : (
              <>
                {" "}
                <img
                  src="/Twitter.svg"
                  alt="twitter link"
                  className="h-5 w-5 opacity-40"
                />{" "}
              </>
            )}
            {item.linkedin ? (
              <Link href={item.linkedin} target="_blank">
                <img
                  src="/LinkedIn.svg"
                  alt="linkedin link"
                  className="h-5 w-5"
                />
              </Link>
            ) : (
              <>
                {" "}
                <img
                  src="/LinkedIn.svg"
                  alt="linkedin link"
                  className="h-5 w-5 opacity-40"
                />{" "}
              </>
            )}
            {item.youtube ? (
              <Link href={item.youtube} target="_blank">
                <img
                  src="/Youtube.svg"
                  alt="youtube link"
                  className="h-5 w-5"
                />
              </Link>
            ) : (
              <>
                {" "}
                <img
                  src="/Youtube.svg"
                  alt="youtube link"
                  className="h-5 w-5 opacity-40"
                />{" "}
              </>
            )}
          </div>
        </td>

        <td>
          <p>{item.address}</p>
        </td>
        <td className="sticky right-0 hover:cursor-pointer" onClick={clicked}>
          <div className="flex h-4 w-4 p-5 items-center justify-center rounded-full hover:bg-gray-3">
            <FontAwesomeIcon icon={faArrowRight} />
          </div>
        </td>
      </tr>

      {openCopy && (
        <div className="fixed bottom-0 right-0 z-50 mb-5 mr-5 flex h-9 w-28 items-center justify-center rounded-md bg-white px-3 py-1 text-sm font-medium text-pbblack shadow-md">
          Copied!
        </div>
      )}

      {/* TOOD: Move CRM vars */}
      {openCRM && (
        <CRM
          item={item}
          setOpenCRM={setOpenCRM}
        />
      )}
    </>
  );
}

export default Item;
