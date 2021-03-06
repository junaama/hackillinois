//**Renders Search Bar to be used across pages */
import React, { useState } from "react";
import { useHistory } from "react-router";

const SearchBar = () => {
  const history = useHistory();
  const [ticker, setTicker] = useState("");
  const handleChange = (e) => {
    setTicker(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    history.push("/dashboard", ticker);
  };

  return (
    <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <form onSubmit={handleSubmit} className="max-w-md ">
        <label className="block text-sm font-bold text-white " htmlFor="stocks">
          Choose a Stock:
        </label>
        <select
          className="cursor-pointer bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-purple-normal focus:border-purple-normal sm:text-sm"
          aria-haspopup="listbox"
          aria-expanded="true"
          aria-labelledby="listbox-label"
          name="stocks"
          onChange={handleChange}
          value={ticker}
        >
          <option value=""></option>
          <option value="Tesla">Tesla</option>
          <option value="Qualcomm">Qualcomm</option>
          <option value="Apple">Apple</option>
          <option value="Robinhood">Robinhood</option>
          <option value="Doordash">Doordash</option>
          <option value="United Airlines">United Airlines</option>
          <option value="Goldman Sachs">Goldman Sachs</option>
          <option value="J&J">J&#38;J</option>
          <option value="TMobile">T-Mobile</option>
        </select>

        <button className="m-8 bg-red-bold hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border-1 border-red-deeper hover:border-transparent rounded">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
