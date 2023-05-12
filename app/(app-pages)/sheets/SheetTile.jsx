import react from "react";
import Link from 'next/link';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV, faFile } from "@fortawesome/free-solid-svg-icons";
import SheetTileOptions from "./SheetTileOptions";
import { app, db } from '../../../components/initializeFirebase'
import { getFirestore, doc } from 'firebase/firestore';
import { useDocument } from 'react-firebase-hooks/firestore';
import moment from "moment";

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

const more_colors = [
  "#002531",
  "#001c37",
  "#071130",
  "#110d2c",
  "#190c33",
  "#270b2d",
  "#320d31",
  "#460023",
  "#35001c",
  "#260419"
]


function Page({ props }) {
  
  const { name, object_id, reference } = props;
  const [userDataRaw, loading2, error2] = useDocument(doc(db, `sheets/${reference}`))
  const userData = userDataRaw?.data()
  const item_count = userData?.lists?.length;

  const last_updated = moment(userData?.last_updated?.toDate()).fromNow();


  const sheet_count_value = Math.floor(item_count / 21);
  const sheet_link = `/sheets/${reference}`;
  
  return (
    <div className="flex h-52 w-60 flex-col justify-between rounded-md border border-black bg-offwhite-1 transition duration-150">
      <Link href={sheet_link} 
      className={`flex items-center justify-center w-full h-full bg-sheettile rounded-tr-md rounded-tl-md transition duration-150 hover:bg-sheettile-hover`}
      >
      <div className="w-16 h-16 items-center justify-center text-center rounded-full
      
      flex border-2
      
      "
      style={{ borderColor: sheet_count_value_colors[sheet_count_value], backgroundColor: more_colors[sheet_count_value],}}
      >
      

        <div style={{ color: sheet_count_value_colors[sheet_count_value], }} >

          <h4 className="text-lg">{item_count}</h4>

        </div>

      </div>
      </Link>

      <div className="m-0 mb-1 flex h-12 w-full items-center justify-between border-t border-black p-0 pl-2 pr-2 text-center bg-white">
        <div className="flex h-full flex-row items-center justify-center gap-2 text-center">
          <div className="flex h-7 w-7 items-center justify-center text-blue">
            <FontAwesomeIcon icon={faFile} size="lg" />
          </div>
          <div className="flex flex-col items-start justify-center">
            <h4 className="text-sm font-semibold">{name}</h4>
            <h4 className="text-xs text-gray-3">{last_updated}</h4>

          </div>
        </div>
        <SheetTileOptions object_id={object_id} reference={reference} />
      </div>
    </div>

  );
}

export default Page;
