import React from 'react';
import Link from "next/link";
import { getLinkPreview, getPreviewFromContent } from "link-preview-js";
import { useState, useEffect } from "react";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CRM from "./CRM";

function Item2({ item }) {

    const [openCRM, setOpenCRM] = useState(false);
    const [openCopy, setOpenCopy] = useState(false);
  
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
      console.log("item changed", item);
      console.log(item);
    //   item.updateIfChanged();
    }, [openCRM]);
  
    const screenshot = item.thumbnailScreenshot
      ? item.thumbnailScreenshot
      : item.desktopScreenshot;



    const [openEmail, setOpenEmail] = useState(false);
    const clickable_link = "http://" + item.siteLink;
    const address_split = item.address.split(",");
    const address = address_split[0];
    const city = address_split[1];
    const pre_state = address_split[2];
    // remove the zip code from state
    // if pre_state contains numbers
    let state = pre_state;
    if (/\d/.test(pre_state)) {
        state = pre_state.replace(/[0-9]/g, '');
    }
    //
    function openEmails() {
        setOpenEmail(true);
    }


    return (
        <>
                <tbody>
                    {/* row 1 */}
                    <tr>
                        <th>
                            <label>
                                <input type="checkbox" className="checkbox" />
                            </label>
                        </th>
                        <td>
                            <div className="flex items-center space-x-3">
                                <div className="avatar">
                                    <div className="mask mask-squircle w-12 h-12">
                                        <img src="/pixelprof.png" alt="Avatar Tailwind CSS Component" />
                                    </div>
                                </div>
                                <div>
                                    <div className="font-bold">
                                        <p>{item.name.length > 46 ? item.name.slice(0, 43) + "..." : item.name}</p>
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
                        <td>
                            {item.hasSSL ? (
                                <img src="/securedtrue.svg" className="w-4 h-4" alt="Screenshot of site" />
                            ) : (
                                <img src="/securedfalse.svg" className="w-4 h-4" alt="Screenshot of site" />
                            )}
                        </td>
                        <td>
                            {item.template}
                        </td>
                        <td>
                        
                        <div className=' w-36 gap-3 flex bg-white px-1 py-[1px] border-black border rounded-lg text-pbblack hover:bg-pbsearchselect hover:cursor-pointer' onClick={() => {copyItem(item.phoneNumber)}}>
                            <div className='flex flex-row items-center gap-[2px]'>
                            <img src="/copy.svg" draggable="false" className="w-4 h-4 opacity-20 duration-75 hover:opacity-100 hover:cursor-pointer" alt="Screenshot of site" />
                            </div>
                            <p>{item.phoneNumber}</p>

                        </div>

                        </td>

                        <td>
                            <div className='px-6'>
                            {address == "none" ? (
                                <p>...</p>
                            ) : (
                                <p>{address}</p>
                            )
                            }
                            {city ? (
                                <span className="badge badge-ghost badge-sm">{city}, {state}</span>
                            ) : (
                                <span className="badge badge-ghost badge-sm w-24"></span>
                            )}
                            {/* <span className="badge badge-ghost badge-sm">{city}, {state}</span> */}
                            </div>

                        </td>
                        <td>
                            {openEmail && (
                                <>
                                <div className='fixed top-0 left-0 w-screen bg-black opacity-10 h-screen z-40' onClick={() => setOpenEmail(false)}></div>
                                <div className='absolute w-auto flex flex-col px-6 py-6 bg-white shadow-xl z-50 rounded-lg'>
                                <h1 className='font-bold mb-4'>EMAILS (SCRAPED)</h1>
                                    {item.emails.map((email, index) => (
                                        <>
                                        <div className='flex justify-between gap-4 w-full'>
                                        <p key={index}>{email}</p>
                                        <div className='flex flex-row items-center gap-[2px]' onClick={() => {copyItem(email)}}>
                                            <img src="/copy.svg" draggable="false" className="w-4 h-4 opacity-20 duration-75 hover:opacity-100 hover:cursor-pointer" alt="Screenshot of site" />
                                        </div>
                                        </div>
                                        </>
                                    ))}

                                </div>
                                </>
                            )}
            


                            { item.email == "none" ? (
                                <div className='w-full flex justify-center'>
                                <img src="/email.svg" draggable="false" className="w-4 h-4 opacity-20" alt="Screenshot of site"/>
                                </div>
                            ) : (
                                // <p>{item.email}</p>
                                <div className='w-full flex justify-center'>
                                <img src="/email.svg" draggable="false" className="w-4 h-4 hover:cursor-pointer" alt="Screenshot of site" onClick={openEmails}/>
                                </div>
                                )
                            }
                            {/* <p>{item.email}</p> */}
                        </td>
                        <td className='w-40'>
                            <div 
                             className='flex flex-row items-center gap-[2px] '
>                           {item.facebook ? (
                                <Link href={item.facebook} target="_blank" className='w-5 h-5'>
                                    <img src="/Facebook.svg" alt="facebook link" className="w-5 h-5" />
                                </Link>
                            ) : (
                                <img src="/Facebook.svg" alt="facebook link" className="h-5 w-5 opacity-20" />
                            )}
                            {item.instagram ? (
                                <Link href={item.instagram} target="_blank" className='w-5 h-5'>
                                    <img src="/Instagram.svg" alt="facebook link" className="w-5 h-5" />
                                </Link>
                            ) : (
                                <img src="/Instagram.svg" alt="facebook link" className="h-5 w-5 opacity-20" />
                            )}
                            {item.twitter ? (
                                <Link href={item.twitter} target="_blank" className='w-5 h-5'>
                                    <img src="/Twitter.svg" alt="facebook link" className="w-5 h-5" />
                                </Link>
                            ) : (
                                <img src="/Twitter.svg" alt="facebook link" className="h-5 w-5 opacity-20" />
                            )}
                            {item.linkedin ? (
                                <Link href={item.linkedin} target="_blank" className='w-5 h-5'>
                                    <img src="/LinkedIn.svg" alt="facebook link" className="w-5 h-5" />
                                </Link>
                            ) : (
                                <img src="/LinkedIn.svg" alt="facebook link" className="h-5 w-5 opacity-20" />
                            )}
                            {item.youtube ? (
                                <Link href={item.youtube} target="_blank" className=''>
                                    <img src="/Youtube.svg" alt="facebook link" className="w-5 h-5" />
                                </Link>
                            ) : (
                                <img src="/Youtube.svg" alt="facebook link" className="h-5 w-5 opacity-20" />
                            )}
                            </div>
                        </td>
                        
                        <th onClick={clicked}>
                        <div className="flex h-4 w-4 items-center justify-center rounded-full p-5 hover:bg-gray-4 hover:cursor-pointer">
            <FontAwesomeIcon icon={faArrowRight} />
          </div>
                        </th>
                    </tr>
                </tbody>

        {openCopy && (
            <div className="fixed bottom-0 right-0 z-50 mb-5 mr-5 flex h-9 w-28 items-center justify-center rounded-md bg-white px-3 py-1 text-sm font-medium text-pbblack shadow-md">
                Copied!
            </div>
        )}

      {openCRM && <CRM item={item} setOpenCRM={setOpenCRM} />}

</>
    );
};

export default Item2;
