"use client";
import { useState } from "react";
import styles from '../../(app-pages)/sheets/(sheet)/page.module.scss'
import Item2 from '../../(app-pages)/sheets/(sheet)/Item2.jsx'
import CardItem from '../../(app-pages)/sheets/(sheet)/CardItem.jsx'
import PageNav from '../../(app-pages)/sheets/(sheet)/PageNav.jsx'
import ListItem from "../../(app-pages)/sheets/(sheet)/ListItem.js"

function Page({ params }) {

const resultsPerPage = 20;
const [currentPage, setCurrentPage] = useState(0);
const [selectedSheets, setSelectedSheets] = useState([]);
const [openedCRM, setOpenedCRM] = useState(-1);

const displayedSheets = [
    { id: 1, name: "John Doe", ssl: true, template: "Wordpress", phoneNumber: "(123) 456-7890", address: "8685 W Sahara Ave STE 200, Las Vegas, NV", email: ["john@example.com"], social: "Twitter", crm: "CRM 1" },
    { id: 2, name: "Jane Smith", ssl: false, template: "Weebly", phoneNumber: "(987) 654-3210", address: "8685 W Sahara Ave STE 200, Las Vegas, NV", email: ["jane@example.com"], social: "Facebook", crm: "CRM 2" },
  ];

return (
<>
    <div className={styles.table_wrapper}>
    <div className="hidden h-24 w-full sm:flex">
    </div>
    <button
        className={`btn-error btn mx-8 my-4 hidden transition-all duration-150 ease-in-out sm:block sm:scale-100
        ${selectedSheets.length <= 0 && "btn-disabled scale-0 sm:hidden"} 
    `}
        onClick={async () => {
        if (selectedSheets.length <= 0) return;
        const selectedSheetsData = selectedSheets.map(
            (index) => displayedSheets[index]
        );

        ListItem.deleteAll(selectedSheetsData);
        setSelectedSheets([]);
        }}
    >
        Delete
    </button>
    <div className="hidden w-full overflow-x-auto sm:block">
        {ListTable(displayedSheets, selectedSheets, setSelectedSheets, currentPage, resultsPerPage, setOpenedCRM, openedCRM)}
    </div>

    <div className="flex w-full flex-col items-center justify-center gap-1 pt-3 sm:hidden">
        {displayedSheets
        ?.slice(
            currentPage * resultsPerPage,
            (currentPage + 1) * resultsPerPage
        )
        .map((list, index) => (
            <>
            <CardItem
                key={index}
                openCRM={() => setOpenedCRM(index)}
                closeCRM={() => {
                list.updateIfChanged();
                setOpenedCRM(-1);
                }}
                isCRMOpen={openedCRM === index}
                item={list}
                selected={selectedSheets.includes(index)}
                toggleselected={() => {
                if (selectedSheets.includes(index)) {
                    setSelectedSheets(
                    selectedSheets.filter((i) => i !== index)
                    );
                } else {
                    setSelectedSheets([...selectedSheets, index]);
                }
                }}
            />
            </>
        ))}
    </div>
    </div>
</>
);
}

export default Page;

function ListTable(displayedSheets, selectedSheets, setSelectedSheets, currentPage, resultsPerPage, setOpenedCRM, openedCRM) {
return <table className="table w-full">
<thead>
    <tr>
    <th>
        <label>
        <input
            type="checkbox"
            className="checkbox"
            onChange={() => {
            if (!displayedSheets) return;
            if (selectedSheets.length === displayedSheets.length) {
                setSelectedSheets([]);
            } else {
                setSelectedSheets(displayedSheets.map((_, i) => i));
                console.log("yep");
            }
            } }
            checked={selectedSheets.length === displayedSheets?.length} />
        </label>
    </th>
    <th>NAME</th>
    <th>SSL</th>
    <th>TEMPLATE</th>
    <th>PHONE</th>
    <th>ADDRESS</th>
    <th>EMAILS</th>
    <th>SOCIAL</th>
    <th>CRM</th>
    </tr>
</thead>

{displayedSheets
    ?.slice(
    currentPage * resultsPerPage,
    (currentPage + 1) * resultsPerPage
    )
    .map((list, index) => (
    <>
        <Item2
        openCRM={() => setOpenedCRM(index)}
        closeCRM={() => {
            list.updateIfChanged();
            setOpenedCRM(-1);
        } }
        isCRMOpen={openedCRM === index}
        item={list}
        selected={selectedSheets.includes(index)}
        toggleselected={() => {
            if (selectedSheets.includes(index)) {
            setSelectedSheets(
                selectedSheets.filter((i) => i !== index)
            );
            } else {
            setSelectedSheets([...selectedSheets, index]);
            }
        } } />
    </>
    ))}
</table>;
}

