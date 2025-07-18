// HomePage component - main page containing map, search, and restaurant selection
import Map from "../components/Map";
import SearchField from "../components/SearchField";
import RestaurantSelected from "../components/RestaurantSelected";
import { useState, useCallback } from "react";

function HomePage() {
  console.log("HomePage component rendered !");
  // Store the states
  const [selectedLocation, setSelectedLocation] = useState([]);
  const [selectedLocationName, setSelectedLocationName] = useState([]);
  const [selectedMcDonalds, setSelectedMcDonalds] = useState(null);

  // Handler for when user selects a location from search results, store lattitude and longitude
  const handleLocationSelect = useCallback((location) => {
    console.log("handleLocationSelect function rendered !");
    const newLocation = [location.lat, location.lon];
    setSelectedLocation(newLocation);
  }, []);

  // Handler for when user selects a location name from search results, store POI infos
  const handleLocationNameSelect = useCallback((locationName) => {
    console.log("handleLocationNameSelect function rendered !");
    const newLocationName = [locationName];
    setSelectedLocationName(newLocationName);
  }, []);

  // Handler for when user selects a McDonald's restaurant from map
  const handleSelectedMcDonalds = useCallback((mcdonaldsSelected) => {
    console.log("handleSelectedMcDonalds function rendered !");
    setSelectedMcDonalds(mcdonaldsSelected);
  }, []);

  return (
    <>
      {/* Search field for finding cities/locations */}
      <SearchField
        onLocationNameSelect={handleLocationNameSelect}
        onLocationSelect={handleLocationSelect}
      />
      {/* Interactive map with restaurant markers */}
      <Map
        selectedLocation={selectedLocation}
        selectedLocationName={selectedLocationName}
        addSelectedMcdonalds={handleSelectedMcDonalds}
      />
      {/* Bottom panel showing selected restaurant or "Aucun restaurant sélectionné" message */}
      <RestaurantSelected selectedMcDonalds={selectedMcDonalds} />
    </>
  );
}

export default HomePage;
