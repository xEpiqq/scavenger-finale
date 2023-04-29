
function PageName({name}) {
  return (
    <div className="pl-4 pr-4 mb-3 ">
      <h1 className=" text-4xl mb-3"><b>{name}</b></h1>
      {/* I want a <hr> */}
      <hr className="border-1 border-gray-3 w-full" />
    </div>
  );
}

export default PageName;