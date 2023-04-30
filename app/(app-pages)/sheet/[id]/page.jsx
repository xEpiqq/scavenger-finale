"use client";
import react from "react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Item from "./Item.jsx";

import PageName from "../../components/PageName";

function Page({ params }) {
  const { id } = params;

  const router = useRouter();
  const [itemList, setItemList] = useState([]);

  const name = "Taco Trucks in Las Vegas";
  const [items, setItems] = useState([
    {
      name: "John Doe",
      link: "/",
      phoneNumber: "(123)456-7890",
      email: "john.doe@example.com",
      address: "123 Place Street, City, State, 12345",
      screenshot: "/images/placeholder1.png",
    },
    {
      name: "John Doe",
      link: "/",
      phoneNumber: "(123)456-7890",
      email: "john.doe@example.com",
      address: "123 Place Street, City, State, 12345",
      screenshot: "/images/placeholder2.png",
    },
    {
      name: "John Doe",
      link: "/",
      phoneNumber: "(123)456-7890",
      email: "john.doe@example.com",
      address: "123 Place Street, City, State, 12345",
      screenshot: "/images/placeholder.png",
    },
    {
      name: "John Doe",
      link: "/",
      phoneNumber: "(123)456-7890",
      email: "john.doe@example.com",
      address: "123 Place Street, City, State, 12345",
      screenshot: "/images/placeholder.png",
    },
    {
      name: "John Doe",
      link: "/",
      phoneNumber: "(123)456-7890",
      email: "john.doe@example.com",
      address: "123 Place Street, City, State, 12345",
      screenshot: "/images/placeholder.png",
    },
  ]);

  return (
    <div>
      <PageName name={name} />
      <div className="flex flex-col items-center justify-center gap-2 p-2">
        {items.map((item, index) => (
          <div key={items.name + index} className="flex flex-col w-full items-center justify-center gap-2">
            <Item
              key={item.name}
              name={item.name}
              link={item.link}
              phoneNumber={item.phoneNumber}
              email={item.email}
              address={item.address}
              screenshot={item.screenshot}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Page;
