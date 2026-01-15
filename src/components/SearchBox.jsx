import { useState } from "react";

const SearchBox = ({ onSearch, error }) => {
  const [city, setCity] = useState("");

  const handleSearch = () => {
    if (city.trim() === "") return;
    onSearch(city);
  };

  return (
    <div className="flex flex-col gap-2 mt-6">
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="border-b-1 p-2 border-gray-300 w-60 outline-none"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-5 py-1 rounded-lg hover:bg-blue-600"
        >
          Search
        </button>
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>} {/* <-- error below input */}
    </div>
  );
};

export default SearchBox;
