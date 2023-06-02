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

function AccountTab({ item }) {
  const [isActive, setIsActive] = useState(false);
  const handleToggle = () => {
    setIsActive(!isActive);
  };

  const [followUpDate, setFollowUpDate] = useState("");
  const [gatekeeper, setGatekeeper] = useState("");
  const [decisionMaker, setDecisionMaker] = useState("");
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    setFollowUpDate(item.followUpDate);
    setGatekeeper(item.gatekeeperName);
    setDecisionMaker(item.ownerName);
    setTitle(item.name);
    setNotes(item.notes);
  }, []);

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
    item.name = title;
    item.changedFlag = true;
  }, [title]);

  useEffect(() => {
    item.notes = notes;
    item.changedFlag = true;
  }, [notes]);

  return (
    <div className="flex h-full w-full flex-col gap-8 px-9 pt-7 text-sm text-pbblack">
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
        <label htmlFor="title" className="ml-1 font-semibold text-pblines">
          Title
        </label>
        <input
          id="title"
          type="text"
          placeholder="Title"
          className="hover:pblines w-full rounded-md bg-pbiconhover px-4 py-3 outline-none transition-all duration-200 focus:bg-pblines"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
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
            setOpenCRM(false);
          }}
        >
          Cancel
        </button>
        <button
          className="h-10 w-36 rounded-md bg-pbblack text-sm font-semibold text-white transition duration-75 hover:bg-pbblackhover"
          onClick={() => {
            throw new Error("Not implemented");
          }}
        >
          Save and Close
        </button>
      </div>
    </div>
  );
}

export default AccountTab;