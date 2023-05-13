import react from "react";

function AuthTab() {
  return (
    <div className="flex h-full w-full flex-col gap-8 px-4 pt-4">
      <input
        type="text"
        placeholder="Id"
        className="w-full rounded-md px-4 py-2 font-bold transition-all duration-200 hover:bg-gray-3"
      />
      <div className="flex w-full flex-row justify-evenly gap-3">
        <input
          type="text"
          placeholder="Name"
          className="w-full rounded-md px-4 py-2 font-bold transition-all duration-200 hover:bg-gray-3"
        />
        <input
          type="text"
          placeholder="Link"
          className="w-full rounded-md px-4 py-2 font-bold transition-all duration-200 hover:bg-gray-3"
        />
      </div>
    </div>
  );
}

export default AuthTab;
