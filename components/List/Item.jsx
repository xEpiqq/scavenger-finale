"use client";

import React from "react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CRM from "./CRM";

import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Item({
  item,
  openCRM,
  toggleselected,
  selected,
}) {
  const [openCopy, setOpenCopy] = useState(false);

  let nameLength = item.name ? item.name.length : 0;

  const copyItem = (itemtocopy) => {
    navigator.clipboard.writeText(itemtocopy);
    setOpenCopy(true);
    setTimeout(() => {
      setOpenCopy(false);
    }, 1000);
  };

  const [fbEmail, setFbEmail] = useState(item.fbEmail);
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
  //
  function openEmails() {
    setOpenEmail(true);
  }

  const td_styles = "px-6 py-4 whitespace-nowrap text-sm text-gray-500";

  return (
    <tbody className="w-full" key={item.id}>
      {/* row 1 */}
      <tr>
        <th>
          <label>
            <input
              type="checkbox"
              className="checkbox"
              onChange={toggleselected}
              checked={selected}
            />
          </label>
        </th>
        <td className={td_styles}>
          <div className="flex items-center space-x-3">
            <div className="avatar">
              <div className="mask mask-squircle h-12 w-12">
                <img
                  src={`https://api.dicebear.com/6.x/avataaars/svg?seed=${item.siteLink}`}
                  alt="Avatar Tailwind CSS Component"
                />
              </div>
            </div>
            <div>
              <div className="font-bold">
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
          </div>
        </td>
        <td className={td_styles}>
          {item.hasSSL ? (
            <img
              src="/securedtrue.svg"
              className="h-4 w-4"
              alt="Screenshot of site"
            />
          ) : (
            <img
              src="/securedfalse.svg"
              className="h-4 w-4"
              alt="Screenshot of site"
            />
          )}
        </td>
        <td className={td_styles}>{item.template}</td>
        <td className={td_styles}>
          <div
            className=" flex w-36 gap-3 rounded-lg border border-black bg-white px-1 py-[1px] text-pbblack hover:cursor-pointer hover:bg-pbsearchselect"
            onClick={() => {
              copyItem(item.phoneNumber);
            }}
          >

            {openCopy && (
              <div className="fixed bottom-0 right-0 z-50 mb-5 mr-5 flex h-9 w-28 items-center justify-center rounded-md bg-white px-3 py-1 text-sm font-medium text-pbblack shadow-md">
                Copied!
              </div>
            )}
            <div className="flex flex-row items-center gap-[2px]">
              <img
                src="/copy.svg"
                draggable="false"
                className="h-4 w-4 opacity-20 duration-75 hover:cursor-pointer hover:opacity-100"
                alt="Screenshot of site"
              />
            </div>
            <p>{item.phoneNumber}</p>
          </div>
        </td>

        <td className={td_styles}>
          <div>
            {address != "none" && <p>{address}</p>}
            {city && (
              <span className="badge badge-ghost badge-sm">
                {city}, {state}
              </span>
            )}
          </div>
        </td>
        <td className={td_styles}>
          <div className="flex flex-row gap-1 items-center">
            <img
              src="/email.svg"
              draggable="false"
              className="h-4 w-4 hover:cursor-pointer"
              alt="Screenshot of site"
              onClick={openEmails}
            />
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="hover:bg-gray-50 inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300">
                  {item.email == "none" ? (
                    <p className="opacity-20">Emails</p>
                  ) : (
                    <p>{item.email}</p>
                  )}
                  <ChevronDownIcon
                    className="-mr-1 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </Menu.Button>
              </div>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    {item.emails && item.emails.map((email, index) => (
                      <Menu.Item key={index}>
                        {({ active }) => (
                          <a
                            key={"email" + index}
                            href="#"
                            className={classNames(
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",
                              "block px-4 py-2 text-sm"
                            )}
                            onClick={() => {
                              copyItem(email);
                            }}
                          >
                            {email}
                          </a>
                        )}
                      </Menu.Item>
                    ))}
                    {/* <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "block px-4 py-2 text-sm"
                          )}
                        >
                          Account settings
                        </a>
                      )}
                    </Menu.Item> */}
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
          {fbEmail && (
            <div className="flex w-full flex-row gap-2">
              {/* need facebook logo here */}
              <img src="/facebook_logo.svg" className="h-4" />

              <p>{fbEmail}</p>
            </div>
          )}
        </td>
        <td className={td_styles}>
          <div className="z-0 flex flex-shrink-0 flex-row items-center gap-[2px]">
            {item.facebook ? (
              <Link href={item.facebook} target="_blank" className="h-5 w-5">
                <img
                  src="/Facebook.svg"
                  alt="facebook link"
                  className="h-5 w-5"
                />
              </Link>
            ) : (
              <img
                src="/Facebook.svg"
                alt="facebook link"
                className="h-5 w-5 opacity-20"
              />
            )}
            {item.instagram ? (
              <Link href={item.instagram} target="_blank" className="h-5 w-5">
                <img
                  src="/Instagram.svg"
                  alt="facebook link"
                  className="h-5 w-5"
                />
              </Link>
            ) : (
              <img
                src="/Instagram.svg"
                alt="facebook link"
                className="h-5 w-5 opacity-20"
              />
            )}
            {item.twitter ? (
              <Link href={item.twitter} target="_blank" className="h-5 w-5">
                <img
                  src="/Twitter.svg"
                  alt="facebook link"
                  className="h-5 w-5"
                />
              </Link>
            ) : (
              <img
                src="/Twitter.svg"
                alt="facebook link"
                className="h-5 w-5 opacity-20"
              />
            )}
            {item.linkedin ? (
              <Link href={item.linkedin} target="_blank" className="h-5 w-5">
                <img
                  src="/LinkedIn.svg"
                  alt="facebook link"
                  className="h-5 w-5"
                />
              </Link>
            ) : (
              <img
                src="/LinkedIn.svg"
                alt="facebook link"
                className="h-5 w-5 opacity-20"
              />
            )}
            {item.youtube ? (
              <Link href={item.youtube} target="_blank" className="">
                <img
                  src="/Youtube.svg"
                  alt="facebook link"
                  className="h-5 w-5"
                />
              </Link>
            ) : (
              <img
                src="/Youtube.svg"
                alt="facebook link"
                className="h-5 w-5 opacity-20"
              />
            )}
          </div>
        </td>

        <th onClick={openCRM}>
          <div className="flex h-4 w-4 items-center justify-center rounded-full p-5 hover:cursor-pointer hover:bg-gray-4">
            <FontAwesomeIcon icon={faArrowRight} />
          </div>
        </th>
      </tr>
    </tbody>
  );
}

export default Item;
