import react from "react";

function AuthTab() {
  return (
    <div className="flex h-full w-full flex-col gap-8 px-4 pt-4">
      <h1 className="font semi-bold text-base mt-5 w-full flex justify-center"> 
        Under construction
      </h1>
    <div className="w-full h-24 border-t border-pblines absolute bottom-0 left-0 flex justify-end px-7 items-center gap-4" >
      <button className="w-24 h-10 bg-white text-pbblack rounded-md font-semibold text-sm hover:bg-pbiconhover transition duration-75" >Cancel</button>      
      <button className="w-36 h-10 bg-pbblack text-white rounded-md font-semibold text-sm hover:bg-pbblackhover transition duration-75" >Save changes</button>      
    </div>
    </div>
  );
}

export default AuthTab;
