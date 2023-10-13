import React, { useState } from "react";

function AccountTab({ contactInfo }) {
  const [selectedOption, setSelectedOption] = useState("Low Interest");
  const [showDropdown, setShowDropdown] = useState(false);

  const options = ["Low Interest", "Moderate Interest", "High Interest"];

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    toggleDropdown();
  };

  return (
    <div className="relative inline-block">
      <button
        className={`bg-primary text-white font-bold py-2 px-4 rounded-full ${selectedOption === "Low Interest" ? "bg-red-3" : selectedOption === "Moderate Interest" ? "bg-yellow" : "bg-primary"}`}
        onClick={toggleDropdown}
      >
        {selectedOption}
      </button>
      {showDropdown && (
        <div className="absolute z-10 mt-2 w-40 rounded-md shadow-lg bg-white">
          {options.map((option) => (
            <button
              key={option}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default AccountTab;
