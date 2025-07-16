import Map from "../components/Map";
import SearchField from "../components/SearchField";
import RestaurantSelected from "../components/RestaurantSelected";
import { useState } from "react";

function HomePage() {
  const [selectedLocation, setSelectedLocation] = useState([]);

  function handleLocationSelect(location) {
    const newLocation = [location.lat, location.lon];
    setSelectedLocation(newLocation);
  }
  return (
    <>
      <SearchField onLocationSelect={handleLocationSelect} />
      <Map selectedLocation={selectedLocation} />
      <RestaurantSelected />
    </>
  );
}

export default HomePage;
