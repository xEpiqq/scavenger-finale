import react from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV, faFileWord } from "@fortawesome/free-solid-svg-icons";
import SheetTileOptions from "./SheetTileOptions";

// colors should go from dark blue to dark purple
const sheet_count_value_colors = [
  "#00BFFF",
  "#1E90FF",
  "#4169E1",
  "#6A5ACD",
  "#9370DB",
  "#BA55D3",
  "#DA70D6",
  "#FF69B4",
  "#FF1493",
  "#C71585",
];

function Page({ props }) {
  const { name, item_count } = props;
  const sheet_count_value = Math.floor(item_count / 21);
  return (
    <div className="flex h-52 w-60 flex-col justify-between rounded-md border border-black bg-offwhite-1 hover:cursor-pointer hover:bg-gray-3">
      <div className="flex h-full w-full items-center justify-center text-center">
        <div
          className={`flex aspect-square h-2/3 items-center justify-center rounded-full border-2 bg-black text-center`}
          style={{
            borderColor: sheet_count_value_colors[sheet_count_value],
            color: sheet_count_value_colors[sheet_count_value],
          }}
        >
          <h4 className="text-lg">{item_count}</h4>
        </div>
      </div>
      <div className="m-0 mb-1 flex h-12 w-full items-center justify-between border-t border-black p-0 pl-2 pr-2 text-center">
        <div className="flex h-full flex-row items-center justify-center gap-2 text-center">
          <div className="flex h-5 w-5 items-center justify-center text-blue">
            <FontAwesomeIcon icon={faFileWord} />
          </div>
          <h4>{name}</h4>
        </div>
        <SheetTileOptions />
      </div>
    </div>
  );
}

export default Page;
