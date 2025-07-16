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
      const onlyCities = response.data;
      setSearchResults(onlyCities);
    } catch (error) {
      console.log("Error getting data", error);
    }
  }

  function addClicked(lat, lon) {
    props.onLocationSelect({ lat, lon });
    setSearchResults([]);
  }

  function handleKeydown(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      requestAPI();
    }
  }

  return (
    <div className="form-container">
      <form className="form-searchfield">
        <label>Rechercher un restaurant</label>
        <div className="form-input">
          <input
            type="input"
            value={input}
            onChange={handleChange}
            onKeyDown={handleKeydown}
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
