import List from "@/components/List";

function Page() {
  const resultsPerPage = 20;

  const sheetData = [
    {
      id: 1,
      name: "John Doe",
      ssl: true,
      template: "Wordpress",
      phoneNumber: "(123) 456-7890",
      address: "8685 W Sahara Ave STE 200, Las Vegas, NV",
      email: ["john@example.com"],
      social: "Twitter",
      crm: "CRM 1",
    },
    {
      id: 2,
      name: "Jane Smith",
      ssl: false,
      template: "Weebly",
      phoneNumber: "(987) 654-3210",
      address: "8685 W Sahara Ave STE 200, Las Vegas, NV",
      email: ["jane@example.com"],
      social: "Facebook",
      crm: "CRM 2",
    },
  ];

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8 mt-10">
    <List
        sheetData={sheetData}
        resultsPerPage={resultsPerPage}
    />
    </div>
  );
}

export default Page;
