"use client";
import List from "@/components/List";

function DummyList() {
  const resultsPerPage = 20;

  const sheetData = [
    {
      sheetItemId: 1,
      name: "John Doe",
      siteLink: "johndoeexample.com",
      ssl: true,
      template: "Wordpress",
      phoneNumber: "1234567890",
      address: "8685 W Sahara Ave STE 200, Las Vegas, NV",
      emails: ["john@example.com", "john1331@gmail.com"],
      social: "Twitter",
      crm: "CRM 1",
    },
    {
      sheetItemId: 2,
      name: "Jane Smith",
      siteLink: "janesmithexample.com",
      ssl: false,
      template: "Weebly",
      phoneNumber: "(987) 654-3210",
      address: "8685 W Sahara Ave STE 200, Las Vegas, NV",
      emails: ["jane@example.com", "jane1432@gmail.com"],
      social: "Facebook",
      crm: "CRM 2",
    },
  ];

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center py-4 sm:px-6 lg:px-8">
    <List
        sheetData={sheetData}
        resultsPerPage={resultsPerPage}
        disableSearch={true}
    />
    </div>
  );
}

export default DummyList;
