import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import axios from "axios";
import ListOfResults from "./ListOfResults";

function SearchField(props) {
  const [input, setInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  function handleChange(event) {
    let value = event.target.value;
    setInput(value);
  }

  async function requestAPI() {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/search?q=${encodeURIComponent(input)}`
      );
      const uniqueResults = response.data.filter(
        (mcdo, index, self) =>
          index ===
          self.findIndex((obj) => obj.display_name === mcdo.display_name)
      );
      setSearchResults(uniqueResults);
    } catch (error) {
      console.log("Error getting data", error);
    }
  }

  function addClicked(lat, lon, name) {
    props.onLocationSelect({ lat, lon });
    props.onLocationNameSelect(name);
    setSearchResults([]);
  }

  function handleKeydown(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      requestAPI();
    }
  }

  return (
    <div className="absolute left-0 right-0 mx-auto mt-2.5 rounded-[15px] flex justify-center items-center z-[1000] bg-white/50 backdrop-blur-[3px] shadow-[2px_2px_5px_black] py-2.5 w-3/5 md:w-4/5">
      <form className="flex flex-col justify-center items-center gap-2.5 w-full">
        <label>Rechercher un restaurant</label>
        <div className="flex justify-center items-center w-3/4 gap-2.5 md:w-4/5">
          <input
            type="input"
            value={input}
            onChange={handleChange}
            onKeyDown={handleKeydown}
            className="rounded border border-black w-full px-1.5 py-0.5 bg-white"
          />
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
        <ListOfResults onAdd={addClicked} cities={searchResults} />
      </form>
    </div>
  );
}
export default SearchField;
