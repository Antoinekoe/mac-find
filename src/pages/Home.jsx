import Map from "../components/Map";
import SearchField from "../components/SearchField";
import RestaurantSelected from "../components/RestaurantSelected";
import { useState } from "react";

function HomePage() {
  const [selectedLocation, setSelectedLocation] = useState([]);
  const [selectedLocationName, setSelectedLocationName] = useState([]);
  const [selectedMcDonalds, setSelectedMcDonalds] = useState(null);

  function handleLocationSelect(location) {
    const newLocation = [location.lat, location.lon];
    setSelectedLocation(newLocation);
  }
  function handleLocationNameSelect(locationName) {
    const newLocationName = [locationName];
    setSelectedLocationName(newLocationName);
  }
  function handleSelectedMcDonalds(mcdonaldsSelected) {
    setSelectedMcDonalds(mcdonaldsSelected);
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
        addSelectedMcdonalds={handleSelectedMcDonalds}
      />
      <RestaurantSelected selectedMcDonalds={selectedMcDonalds} />
    </>
  );
}

export default HomePage;
