import react from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

function SheetTileNew(props) {
  return (
    <div onClick={props.onClick} className="flex h-52 w-60 cursor-pointer flex-col items-center justify-center rounded-md border border-black bg-offwhite transition duration-500 ease-in-out hover:bg-black hover:text-white">
      <div className="flex h-32 w-32 items-center justify-center text-center">
        <FontAwesomeIcon icon={faPlus} />
      </div>
    </div>
  );
}

export default SheetTileNew;
