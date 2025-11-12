import { useNavigate } from "react-router";
import { useState } from "react";

const Input = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchValue.trim()) return;
    navigate(`/allmovies?search=${searchValue}`);
  };

  const clearInput = () => {
    setSearchValue("");
  };

  return (
    <div className="p-5 overflow-hidden w-10 h-10 hover:w-[270px] hover:bg-[#f44040] shadow-[2px_2px_20px_rgba(0,0,0,0.08)] rounded-full flex items-center group duration-300 relative right-2">
      <div className="flex items-center justify-center fill-white">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width={22}
          height={22}
        >
          <path d="M18.9,16.776A10.539,10.539,0,1,0,16.776,18.9l5.1,5.1L24,21.88ZM10.5,18A7.5,7.5,0,1,1,18,10.5,7.507,7.507,0,0,1,10.5,18Z" />
        </svg>
      </div>

      <form onSubmit={handleSearch} className="flex-1 relative">
        <input
          name="search"
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search..."
          className="outline-none text-[20px] bg-transparent w-full text-white font-normal px-4 placeholder:text-gray-200"
        />

        {searchValue && (
          <button
            type="button"
            onClick={clearInput}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-white hover:text-gray-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            ✕
          </button>
        )}
      </form>
    </div>
  );
};

export default Input;
