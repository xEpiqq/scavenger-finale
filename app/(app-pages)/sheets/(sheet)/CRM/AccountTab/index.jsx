"use client";
import react from "react";
import { useState, useEffect } from "react";
import {
  getFirestore,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

function AccountTab({ item, closeCRM }) {
  const [isActive, setIsActive] = useState(false);
  const handleToggle = () => {
    setIsActive(!isActive);
  };

  const [followUpDate, setFollowUpDate] = useState(item.followUpDate);
  const [gatekeeper, setGatekeeper] = useState(item.gatekeeperName);
  const [decisionMaker, setDecisionMaker] = useState(item.ownerName);
  const [notes, setNotes] = useState(item.notes);
  const [favorite, setFavorite] = useState(item.favorite);

  useEffect(() => {
    item.followUpDate = followUpDate;
    item.changedFlag = true;
  }, [followUpDate]);

  useEffect(() => {
    item.gatekeeperName = gatekeeper;
    item.changedFlag = true;
  }, [gatekeeper]);

  useEffect(() => {
    item.ownerName = decisionMaker;
    item.changedFlag = true;
  }, [decisionMaker]);

  useEffect(() => {
    item.notes = notes;
    item.changedFlag = true;
  }, [notes]);

  useEffect(() => {
    item.favorite = favorite;
    item.changedFlag = true;
  }, [favorite]);

  return (
    <div className="flex h-full w-full flex-col gap-8 px-9 pt-7 text-sm text-pbblack">
      <div className="flex h-auto w-full flex-row items-end gap-3">
        <label htmlFor="favorite" className="ml-1 font-semibold text-pblines">
          Favorite
        </label>
        <input
          className="after:bg-gray-400 dark:after:bg-gray-400 mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-pblines before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer hover:cursor-pointer focus:ring-0 focus:ring-0 focus:before:scale-100 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:absolute focus:after:z-[1] focus:after:z-[1] focus:after:block focus:after:block focus:after:h-5 focus:after:h-5 focus:after:w-5 focus:after:w-5 focus:after:rounded-full focus:after:rounded-full focus:after:content-[''] focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:checked:bg-primary dark:checked:after:bg-primary dark:focus:before:shadow-[3px_-1px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca]"
          type="checkbox"
          role="switch"
          id="change-password"
          // value={firstContact}
          checked={favorite}
          onChange={(e) => setFavorite(e.target.checked)}
        />
      </div>

      <div className="flex w-full flex-col gap-2">
        <label
          htmlFor="follow-up-date"
          className="ml-1 font-semibold text-pblines"
        >
          Follow up date
        </label>
        <input
          type="text"
          id="follow-up-date"
          placeholder="Follow up date"
          className="hover:pblines w-full rounded-md bg-pbiconhover px-4 py-3 outline-none transition-all duration-200 focus:bg-pblines"
          value={followUpDate}
          onChange={(e) => setFollowUpDate(e.target.value)}
        />
      </div>
      <div className="flex h-auto w-full flex-row items-end gap-3">
        <div className="flex w-full flex-col gap-2">
          <label
            htmlFor="gatekeeper"
            className="ml-1 font-semibold text-pblines"
          >
            Gatekeeper
          </label>
          <input
            type="text"
            id="gatekeeper"
            placeholder="Gatekeeper"
            className="hover:pblines w-full rounded-md bg-pbiconhover px-4 py-3 outline-none transition-all duration-200 focus:bg-pblines"
            value={gatekeeper}
            onChange={(e) => setGatekeeper(e.target.value)}
          />
        </div>
        <div className="flex w-full flex-col gap-2">
          <label
            htmlFor="decision-maker"
            className="ml-1 font-semibold text-pblines"
          >
            Decision Maker
          </label>
          <input
            type="text"
            id="decision-maker"
            placeholder="Decision Maker"
            className="hover:pblines w-full rounded-md bg-pbiconhover px-4 py-3 outline-none transition-all duration-200 focus:bg-pblines"
            value={decisionMaker}
            onChange={(e) => setDecisionMaker(e.target.value)}
          />
        </div>
      </div>

      <div className="flex w-full flex-col gap-2">
        <label htmlFor="notes" className="ml-1 font-semibold text-pblines">
          Notes
        </label>
        <textarea
          id="notes"
          type="text"
          placeholder="Notes"
          className="h-48 w-full rounded-md bg-pbiconhover px-4 py-3 outline-none transition-all duration-200 hover:bg-pblines focus:bg-pblines"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>

      <div className="absolute bottom-0 left-0 flex h-24 w-full items-center justify-end gap-4 border-t border-pblines px-7">
        <button
          className="h-10 w-24 rounded-md bg-white text-sm font-semibold text-pbblack transition duration-75 hover:bg-pbiconhover"
          onClick={() => {
            closeCRM();
          }}
        >
          Cancel
        </button>
        <button
          className="h-10 w-36 rounded-md bg-pbblack text-sm font-semibold text-white transition duration-75 hover:bg-pbblackhover"
          onClick={() => {
            closeCRM();
          }}
        >
          Save and Close
        </button>
      </div>
    </div>
  );
}

export default AccountTab;
