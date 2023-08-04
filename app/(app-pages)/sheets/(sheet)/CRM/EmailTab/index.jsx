import react from "react";
import { useState, useEffect } from "react";

function EmailTab({ item, closeCRM }) {
  const [subject, setSubject] = useState("");
  const [emailBody, setEmailBody] = useState(item.emailBody);

  useEffect(() => {
    item.emailBody = emailBody;
    item.changedFlag = true;
  }, [emailBody]);

  const createEmail = async () => {
    // we need to call the api to create the email
    const resopnse = await fetch("/api/create-email", {
      method: "POST",
      body: JSON.stringify({
        item: item,
      }),
    });
    if (resopnse.ok) {
      const data = await resopnse.json();
      console.log(data);
    }
  };

  console.log(item.emailBody);

  return (
    <>
      <div className="flex h-full w-full flex-col gap-8 px-9 pt-7 text-sm text-pbblack">
        <div className="flex w-full flex-col gap-3 sm:flex-row">
          <div className="flex w-full flex-col gap-1">
            <label
              htmlFor="decision-maker"
              className="ml-1 font-semibold text-pblines"
            >
              Email Address
            </label>
            <input
              type="text"
              id="decision-maker"
              placeholder="Email Address"
              className="hover:pblines h-10 w-full rounded-md bg-pbiconhover px-4 py-2 outline-none transition-all duration-200 focus:bg-pblines"
              value={item.email}
            />
          </div>
          <div className="flex w-full flex-col gap-1">
            <label
              htmlFor="decision-maker"
              className="ml-1 font-semibold text-pblines"
            >
              Subject
            </label>
            <input
              type="text"
              id="decision-maker"
              placeholder="Subject"
              className="hover:pblines h-10 w-full rounded-md bg-pbiconhover px-4 py-2 outline-none transition-all duration-200 focus:bg-pblines"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>
        </div>
        <div className="mt-2 flex max-h-[50%] w-full flex-grow">
          <textarea
            rows={4}
            name="comment"
            id="comment"
            className="text-gray- ring-gray-300  placeholder:text-gray-400 focus:ring-indigo-600 bg-gray-100 block w-full flex-grow rounded-md border-0 bg-pbiconhover p-4 py-1.5 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm  sm:leading-6"
            value={emailBody}
            onChange={(e) => setEmailBody(e.target.value)}
          />
        </div>

        <div className="absolute bottom-0 left-0 flex h-24 w-full items-center justify-end gap-4 border-t border-pblines px-7">
          <button
            onClick={closeCRM}
            className="h-10 w-24 rounded-md bg-white text-sm font-semibold text-pbblack transition duration-75 hover:bg-pbiconhover"
          >
            Close
          </button>
          <button
            onClick={createEmail}
            className="h-10 w-36 rounded-md bg-pbblack text-sm font-semibold text-white transition duration-75 hover:bg-pbblackhover"
          >
            Draft AI Email
          </button>
          <a
            href={`mailto:${encodeURIComponent(item.email)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`}
            className="flex justify-center items-center h-10 p-0 w-36 rounded-md bg-pbblack text-sm font-semibold text-white transition duration-75 hover:bg-pbblackhover"
          >
            Send Email
          </a>
        </div>
      </div>
    </>
  );
}

export default EmailTab;
