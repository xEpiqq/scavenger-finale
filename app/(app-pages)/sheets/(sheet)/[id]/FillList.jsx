"use client";

import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'

import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import Link from 'next/link';

function FillList({
  sendToLambda,
  queryError,
  searching,
  niche,
  setNiche,
  location,
  setLocation,
}) {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");


  useEffect(() => {
    let intervalId;
    if (searching) {
      intervalId = setInterval(() => {
        setElapsedTime((prevElapsedTime) => prevElapsedTime + 1);
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [searching]);

  const nicheSuggestions = ["Aadhar center","Accounting firm","Advertising agency","Aircraft maintenance company","Airport","Art gallery","Art museum","Art school","Art studio","Art supply store","Assisted living facility","Association or organization","Audiologist","Auto insurance agency","Auto repair shop","Bar","Bar & grill","Bar restaurant furniture store","Bar stool supplier","Bar tabac","Blood donation center","Blood testing service","Blueprint service","Boat tour agency","Brewery","Business administration service","Business development service","Business management consultant","Business networking company","Business school","Cat boarding service","Cat breeder","Cat trainer","Catering food and drink supplier","Chocolate artisan","Chocolate cafe","Chocolate shop","Coffee shop","Coffee store","Commercial cleaning service","Commercial printer","Commercial real estate agency","Computer networking service\n    ","Computer repair service","Cotton mill","Coworking space","Craft store","Custom t-shirt store","Dance school","Dental clinic","Design agency","Digital printing service","Distillery","Dog day care center","Dog trainer","Dog walker","Doll store","Dress store","Dry cleaner","Electrical supply store","Electrical wholesaler","Electrician","Electronics repair shop","Electronics store","Eyebrow bar","Eyelash salon","Facial spa","Fashion accessories store","Fashion designer","Fish restaurant","Fitness center","Flooring contractor","Florist","Food and beverage exporter","Furnished apartment building","Furniture store","Furniture store","Garden center","General contractor","Gift shop","Glassware store","Glassware wholesaler","Graphic designer","Hairdresser","Hairstylist salon","Handicraft fair","Home automation company","Home builder","Home improvement store","Home inspector","Home theater store","Hospice","Hospital","Hospital department","Hospital equipment and supplies","Hotel","Information services","Insurance agency","Internet marketing service","Jewelry store","Karaoke bar","Kitchen remodeler","Knife store","Knitting instructor","Korean restaurant","Lawn sprinkler system contractor","Learning center","Leasing service","Lighting consultant","Liquor store","Magazine store","Magic store","Mailing service","Marketing agency","Massage spa","Meditation center","Meditation instructor","Memorial","Memorial park","Mexican restaurant","Model shop","Modern French restaurant","Modern Indian restaurant","Mortgage broker","Movie theater","Music school","Natural goods store","Natural history museum","Natural rock climbing area","Natural stone supplier","Nature preserve","Okonomiyaki restaurant","Olive oil manufacturer","Organic restaurant","Outdoor sports store","Paint store","Park","Park & ride","Parking lot","Parking lot for bicycles","Parking lot for motorcycles","Photo restoration service","Photo shop","Photographer","Photography service","Photography studio","Pottery store","Print shop","Professional organizer","Promotional products supplier","Property management company","Pump supplier","RV park","Real estate agency","Record company","Recording studio","Resort hotel","Restaurant","Retailer","Retirement community","Roofing contractor","Saw sharpening service","Scaffolding rental service","Screen printer","Screw supplier","Shopfitter","Shopping mall","Small appliance repair service","Software company","Solar energy company","Solar energy contractor","Solar energy equipment supplier","Souvenir store","Spa","Steak house","Steamboat restaurant","Supermarket","Sushi restaurant","Swimming pool","Tai chi school","Tailor","Taiwanese restaurant","Takoyaki restaurant","Tattoo shop","Toy and game manufacturer","Toy library","Toy manufacturer","Toy store","Traditional teahouse","Used book store","Used clothing store","Used computer store","Used furniture store","Vintage clothing store","Vinyl sign shop","Violin shop","Virtual office rental","Web design company","Website designer","Wholesale bakery","Wholesale drugstore","Wholesale florist","Wholesale food store","Wholesale grocer"]
  
  const handleSuggestion = () => {
    const randomIndex = Math.floor(Math.random() * nicheSuggestions.length);
    setNiche(nicheSuggestions[randomIndex]);
  };

  function theCity(e) {
    setCity(e);
    setLocation(e + " " + country);
    console.log(location)
  }

  function theCountry(e) {
    setCountry(e);
    setLocation(city + " " + e);
    console.log(location)
  }

  return (
    <div className="flex w-full h-screen justify-center items-center bg-white">
    <div className="px-8">
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Lead Search</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">Find businesses anywhere in the world</p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    
            <div className="sm:col-span-3">
              <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                Niche
              </label>
              <div className="mt-2 flex">
                <input
                  value={niche}
                  onChange={(e) => {
                    setNiche(e.target.value);
                  }}
                  type="text"
                  name="first-name"
                  id="suggestedNiche"
                  autoComplete="given-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-1 shadow-sm ring-1 ring-inset ring-gray-4 placeholder:text-gray-4 focus:ring-2 focus:ring-inset focus:ring-gray-2 sm:text-sm sm:leading-6"
                  placeholder="Construction companies"
                />
                <button
                  type="button"
                  className="ml-2 px-4 py-1.5 bg-gray-1 text-sm text-white rounded-md hover:bg-gray-2 duration-150"
                  onClick={handleSuggestion}
                >
                  Suggest
                </button>
              </div>
            </div>

            <div className="sm:col-span-2 sm:col-start-1">
              <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                City
              </label>
              <div className="mt-2">
                <input
                  value={city}
                  onChange={(e) => { theCity(e.target.value);}}
                  type="text"
                  name="city"
                  id="city"
                  autoComplete="address-level2"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-1 shadow-sm ring-1 ring-inset ring-gray-4 placeholder:text-gray-4 focus:ring-2 focus:ring-inset focus:ring-gray-2 sm:text-sm sm:leading-6"
                  placeholder="Las Vegas"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
                State or country
              </label>
              <div className="mt-2">
                <input
                  value={country}
                  onChange={(e) => {
                    theCountry(e.target.value); 
                  }}
                  type="text"
                  name="region"
                  id="region"
                  autoComplete="address-level1"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-1 shadow-sm ring-1 ring-inset ring-gray-4 placeholder:text-gray-4 focus:ring-2 focus:ring-inset focus:ring-gray-2 sm:text-sm sm:leading-6"
                  placeholder="Nevada"
                />
              </div>
            </div>

          </div>
        </div>

      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
      <Link href="/sheets">
      <button
          className="hover:bg-gray-5 duration-150 rounded-md bg-white border border-gray-4 px-3 py-2 text-sm font-semibold text-gray-1 shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Back
        </button>
      </Link>

        <button
          className="hover:bg-gray-2 duration-150 rounded-md bg-gray-1 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={sendToLambda}
        >
          Search
        </button>
      </div>
      {searching && (
              <div className="mt-5">
                <h3 className="mt-0 text-sm font-medium text-paymenttext opacity-50">
                  Takes About 16 Seconds, Refresh and Change Search if it Takes Too
                  long — <span className="text-pbblack">{elapsedTime}</span>
                </h3>
                <Skeleton className="mt-4 flex w-full flex-row rounded-md border border-paymentboxborder bg-white p-3 text-paymenttext" />
              </div>
            )}

            {queryError && (
              <h2 className="mt-10 text-xs italic text-deleteicon">
                {queryError}
              </h2>
            )}
    </div>
    </div>
  );
}

export default FillList;















// <>
//       <div className="h-full w-full items-center inline-block justify-center bg-white">
//         <div className="pointer-events-none bg-black opacity-20" />
//         <div className="z-10 flex h-full  w-full flex-col rounded-md bg-white text-black">
//           <div className="w-full rounded-tl-md rounded-tr-md border-b-2 border-b-paymentborder bg-white p-8">
//             <h1 className="text-3xl font-bold">Start Lead Search</h1>
//             <h2 className="mt-3 text-sm font-medium text-paymenttext opacity-50">
//               City + State works best <br /> # of leads depends on industry and
//               location size
//             </h2>
//           </div>
//           <div className="flex w-full flex-grow flex-col p-8">
//             <h2>
//               <span className="underline">HVAC</span> in Chicago, Illinois{" "}
//               <span className="text-pbgreytext">↫ Your niche</span> <br />
//               Cleaners in <span className="underline">Moscow, Russia</span>{" "}
//               <span className="text-pbgreytext">↫ Location</span>
//             </h2>

//             <div className="mt-4 flex flex-col gap-4">
//               <div className="w-full">
//                 <h3 className="mt-5 text-sm font-medium text-paymenttext opacity-50">
//                   Niche or Industry
//                 </h3>
//                 <input
//                   className="mt-2 flex w-full flex-row rounded-md border-paymentboxborder bg-white p-2 text-sm text-pbblack focus:outline-none"
//                   value={niche}
//                   onChange={(e) => {
//                     setNiche(e.target.value);
//                   }}
//                   style={{ borderWidth: 1 }}
//                 />
//               </div>
//               <div className="w-full">
//                 <h3 className="mt-5 text-sm font-medium text-paymenttext opacity-50">
//                   Location
//                 </h3>
//                 <input
//                   className="mt-2 flex w-full flex-row rounded-md border-paymentboxborder bg-white p-2 text-sm text-pbblack focus:outline-none"
//                   value={location}
//                   onChange={(e) => {
//                     setLocation(e.target.value);
//                   }}
//                   style={{ borderWidth: 1 }}
//                 />
//               </div>
//             </div>
//             {searching && (
//               <div className="mt-5">
//                 <h3 className="mt-0 text-sm font-medium text-paymenttext opacity-50">
//                   Takes about 22s, refresh and change search if it takes too
//                   long — <span className="text-pbblack">{elapsedTime}</span>
//                 </h3>
//                 <Skeleton className="mt-4 flex w-full flex-row rounded-md border border-paymentboxborder bg-white p-3 text-paymenttext" />
//               </div>
//             )}

//             {queryError && (
//               <h2 className="mt-10 text-xs italic text-deleteicon">
//                 {queryError}
//               </h2>
//             )}
//           </div>
//           <div className="h-22 bottom-0 flex w-full flex-grow-0 flex-row items-center justify-between self-end bg-transparent p-4">
//             <button className="w-30 h-11 cursor-default rounded-md border border-paymentboxborder px-4 text-sm font-semibold text-paymenttext opacity-40">
//               Cancel
//             </button>
//             <button
//               className="w-30 h-11 rounded-md bg-black px-4 text-sm font-semibold text-black transition duration-200 hover:opacity-80"
//               onClick={sendToLambda}
//               style={{ color: "white" }}
//             >
//               Search
//             </button>
//           </div>
//         </div>
//       </div>
//     </>


// /*
//   This example requires some changes to your config:
  
//   ```
//   // tailwind.config.js
//   module.exports = {
//     // ...
//     plugins: [
//       // ...
//       require('@tailwindcss/forms'),
//     ],
//   }
//   ```
// */

