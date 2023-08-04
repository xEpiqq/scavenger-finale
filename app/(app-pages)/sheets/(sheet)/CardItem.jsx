import React from "react";
import Link from "next/link";
import { getLinkPreview, getPreviewFromContent } from "link-preview-js";
import { useState, useEffect } from "react";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CRM from "./CRM";

function CardItem({ item, openCRM, closeCRM, isCRMOpen }) {
  const [openCopy, setOpenCopy] = useState(false);

  // see how many characters item.name is 
  let nameLength

  if (item.name) {
    nameLength = item.name.length;
  } else {
    nameLength = 0;
  }

  const copyItem = (itemtocopy) => {
    navigator.clipboard.writeText(itemtocopy);
    setOpenCopy(true);
    setTimeout(() => {
      setOpenCopy(false);
    }, 1000);
  };

  const screenshot = item.thumbnailScreenshot
    ? item.thumbnailScreenshot
    : item.desktopScreenshot;

  const [openEmail, setOpenEmail] = useState(false);
  const clickable_link = "http://" + item.siteLink;
  
  let address = "";
  let city = "";
  let state = "";

  if (item.address != null) {
    const address_split = item.address.split(",");
    address = address_split[0];
    city = address_split[1];
    const pre_state = address_split[2];
    // if pre_state contains numbers
    state = pre_state;
    if (/\d/.test(pre_state)) {
      state = pre_state.replace(/[0-9]/g, "");
    }
  } // remove the zip code from state
  function openEmails() {
    setOpenEmail(true);
  }

  var social_media_links_style = "h-10 w-10"
  var social_media_links_style_transparent = "h-10 w-10 opacity-30"

  return (
    <>
      <div className="card-body p-0 py-4">
        <div className="card w-96 gap-2 bg-gray-7 p-6 text-black shadow-xl">
          <div className="flex items-start justify-start space-x-3">
            <div className="flex w-full flex-row justify-between">
              <div className="avatar">
                <div className="mask mask-squircle h-12 w-12">
                  <img
                    src={`https://api.dicebear.com/6.x/avataaars/svg?seed=${item.siteLink}`}
                    alt="Avatar Tailwind CSS Component"
                  />
                </div>
              </div>
              <div>
                {city && (
                  <span className="badge badge-ghost badge-md">
                    {city}, {the_state}
                  </span>)}
              </div>
            </div>
          </div>
          <div>
            <div className="flex flex-row font-bold">
              <p>
                {nameLength > 46
                  ? item.name.slice(0, 43) + "..."
                  : item.name}
              </p>
            </div>
            <div className="text-sm opacity-50">
              {item.siteLink !== "none" ? (
                <Link href={clickable_link} target="_blank">
                  <p className={`hover:underline`}>{item.siteLink}</p>
                </Link>
              ) : (
                <p>{item.siteLink}</p>
              )}
            </div>
          </div>
          <div>
            {address != "none" && <p>{address}</p>}
            {/* <span className="badge badge-ghost badge-sm">{city}, {state}</span> */}
          </div>
          <div
            className=" flex gap-3 px-1 py-[1px] hover:cursor-pointer hover:bg-pbsearchselect"
          >
            <a href={"tel:" + item.phoneNumber}>{item.phoneNumber}</a>
          </div>
          {!item.hasSSL && (
            <div className="flex flex-row items-center justify-center gap-5">
              <img
                src="/securedfalse.svg"
                className="h-4 w-4"
                alt="Screenshot of site"
              />
              <p className="text-redpill">No SSL</p>
            </div>
          )}
          {item.template !== "none" && <p>Template: {item.template}</p>}
          {
          item.emails?.map((email, index) => (
            <>
              <div className="flex w-full justify-between gap-4">
                <p key={index}>{email}</p>
                <div
                  className="flex flex-row items-center gap-[2px]"
                  onClick={() => {
                    copyItem(email);
                  }}
                >
                  <img
                    src="/copy.svg"
                    draggable="false"
                    className="h-4 w-4 opacity-20 duration-75 hover:cursor-pointer hover:opacity-100"
                    alt="Screenshot of site"
                  />
                </div>
              </div>
            </>
          ))}
          <div className="flex flex-grow flex-row items-center gap-2">
            {item.facebook ? (
              <Link href={item.facebook} target="_blank">
                <img
                  src="/Facebook.svg"
                  alt="facebook link"
                  className={social_media_links_style}
                />
              </Link>
            ) : (
              <img
                src="/Facebook.svg"
                alt="facebook link"
                className={social_media_links_style_transparent}
              />
            )}
            {item.instagram ? (
              <Link href={item.instagram} target="_blank">
                <img
                  src="/Instagram.svg"
                  alt="facebook link"
                  className={social_media_links_style}
                />
              </Link>
            ) : (
              <img
                src="/Instagram.svg"
                alt="facebook link"
                className={social_media_links_style_transparent}
              />
            )}
            {item.twitter ? (
              <Link href={item.twitter} target="_blank">
                <img
                  src="/Twitter.svg"
                  alt="facebook link"
                  className={social_media_links_style}
                />
              </Link>
            ) : (
              <img
                src="/Twitter.svg"
                alt="facebook link"
                className={social_media_links_style_transparent}
              />
            )}
            {item.linkedin ? (
              <Link href={item.linkedin} target="_blank">
                <img
                  src="/LinkedIn.svg"
                  alt="facebook link"
                  className={social_media_links_style}
                />
              </Link>
            ) : (
              <img
                src="/LinkedIn.svg"
                alt="facebook link"
                className={social_media_links_style_transparent}
              />
            )}
            {item.youtube ? (
              <Link href={item.youtube} target="_blank">
                <img
                  src="/Youtube.svg"
                  alt="facebook link"
                  className={social_media_links_style}
                />
              </Link>
            ) : (
              <img
                src="/Youtube.svg"
                alt="facebook link"
                className={social_media_links_style_transparent}
              />
            )}
          </div>
          <button onClick={openCRM} className="btn mt-2">
            Open CRM
          </button>
        </div>
      </div>

      {isCRMOpen && <CRM item={item} closeCRM={closeCRM} />}
    </>
  );
}

export default CardItem;
