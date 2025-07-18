// SearchField component - handles location search with API integration
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import axios from "axios";
import ListOfResults from "./ListOfResults";
import Map from "./Map";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

function SearchField(props) {
  console.log("SearchField component rendered !");
  const [input, setInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // Handler for input field changes
  function handleChange(event) {
    console.log("handleChange function rendered !");
    let value = event.target.value;
    setInput(value);
  }

  // API call to the proxy server to search for locations using Nominatim
  async function requestAPI() {
    console.log("requestAPI function rendered !");
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/search?q=${encodeURIComponent(input)}`
      );

      // Filter results to remove duplicates and unwanted types
      const uniqueResults = response.data
        .filter(
          (mcdo, index, self) =>
            index ===
            self.findIndex((obj) => {
              // Remove duplicates by comparing city names (first part before comma)
              const objCity = obj.display_name.split(",")[0].trim();
              const mcdoCity = mcdo.display_name.split(",")[0].trim();
              return objCity === mcdoCity;
            })
        )
        .filter(
          (mcdo) =>
            mcdo.addresstype === "city" ||
            mcdo.addresstype === "town" ||
            mcdo.addresstype === "village" ||
            mcdo.addresstype === "hamlet" ||
            mcdo.addresstype === "suburb" ||
            mcdo.addresstype === "neighbourhood" ||
            mcdo.addresstype === "residential"
        );

      setSearchResults(uniqueResults);
    } catch (error) {
      console.log("Error getting data", error);
    }
  }

  // Handler for when user clicks on a search result
  function addClicked(lat, lon, name) {
    console.log("addClicked function rendered !");
    props.onLocationSelect({ lat, lon });
    props.onLocationNameSelect(name);
    setSearchResults([]); // Clear search results after selection
  }

  // Handler for Enter key press in search input, trigger the API call but prevent the default behavior
  function handleKeydown(event) {
    console.log("handleKeydown function rendered !");
    if (event.key === "Enter") {
      event.preventDefault();
      requestAPI();
    }
  }

  return (
    // Search container
    <div className="absolute left-0 right-0 mx-auto mt-2.5 rounded-[15px] flex justify-center items-center z-[1000] bg-white/50 backdrop-blur-[3px] shadow-[2px_2px_5px_black] py-2.5 w-3/5 md:w-4/5">
      <form className="flex flex-col justify-center items-center gap-2.5 w-full">
        <label className="font-bold">Rechercher un restaurant</label>
        {/* Search input and icon container */}
        <div className="flex justify-center items-center w-3/4 gap-2.5 md:w-1/2">
          <input
            type="input"
            value={input}
            onChange={handleChange}
            onKeyDown={handleKeydown}
            className="rounded border border-black w-full px-1.5 py-0.5 bg-white"
            minLength={3}
          />
          {/* Search icon button */}
          <SearchIcon
            onClick={requestAPI}
            sx={{
              backgroundColor: "Orange",
              borderRadius: "9px",
              "&:hover": {
                cursor: "pointer",
              },
            }}
          />
        </div>
        {/* List of search results */}
        <ListOfResults onAdd={addClicked} cities={searchResults} />
      </form>
    </div>
  );
}
export default SearchField;
