import Map from "../components/Map";
import SearchField from "../components/SearchField";
import RestaurantSelected from "../components/RestaurantSelected";
import { useState } from "react";

function HomePage() {
  const [selectedLocation, setSelectedLocation] = useState([]);
  const [selectedLocationName, setSelectedLocationName] = useState([]);
  const [selectedMcDonalds, setSelectedMcDonalds] = useState(
    "Aucun restaurant sélectionné"
  );

  function handleLocationSelect(location) {
    const newLocation = [location.lat, location.lon];
    setSelectedLocation(newLocation);
  }
  function handleLocationNameSelect(locationName) {
    const newLocationName = [locationName];
    setSelectedLocationName(newLocationName);
  }
  function handleSelectedMcDonalds(mcdonaldsSelected) {
    const newMcdonaldselected = [mcdonaldsSelected];
    console.log(newMcdonaldselected);
    setSelectedMcDonalds(newMcdonaldselected);
  }
  return (
    <>
      <SearchField
        onLocationNameSelect={handleLocationNameSelect}
        onLocationSelect={handleLocationSelect}
      />
      <Map
        selectedLocation={selectedLocation}
        selectedLocationName={selectedLocationName}
        selectedMcdonalds={handleSelectedMcDonalds}
      />
      <RestaurantSelected />
    </>
  );
}

export default HomePage;
