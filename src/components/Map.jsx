// Map component - displays interactive map with restaurant markers using Leaflet
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import axios from "axios";
import L from "leaflet";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// MapController component - handles the fly to selected location and popup management
function MapController({ selectedLocation, isOpenPopup }) {
  const map = useMap();

  // Effect to fly to selected location when it changes
  useEffect(() => {
    if (selectedLocation.length === 2) {
      map.flyTo(selectedLocation, map.getZoom(), {
        animate: false,
        duration: 0,
      });
    }
  }, [selectedLocation, map]);

  // Effect to close popup when isOpenPopup is true
  useEffect(() => {
    if (isOpenPopup) {
      map.closePopup();
    }
  }, [isOpenPopup, map]);

  return null;
}

// Main Map component
function Map({ selectedLocation, selectedLocationName, addSelectedMcdonalds }) {
  const [mcdonaldsResults, setMcdonaldsResults] = useState([]);
  const [openPopup, setOpenPopup] = useState(false);

  // API call to get McDonald's restaurants for selected location
  async function addMcDonaldsResults(selectedLocationName) {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/search/mcdo?q=${encodeURIComponent(
          selectedLocationName
        )}`
      );
      setMcdonaldsResults(response.data);
    } catch (error) {
      console.error("Error trying to req proxy :", error);
    }
  }

  // Fetch McDonald's when location name changes
  useEffect(() => {
    if (selectedLocationName) {
      addMcDonaldsResults(selectedLocationName);
    }
  }, [selectedLocationName]);

  // Handler for when user selects a restaurant from popup
  function handleSelectedClick(mcdo) {
    addSelectedMcdonalds(mcdo);
    setOpenPopup(true);
    // Auto-reset popup state after 1 second
    setInterval(() => {
      setOpenPopup(false);
    }, 1000);
  }

  return (
    // Map container with full viewport size
    <MapContainer
      style={{ height: "100vh", width: "100%" }}
      center={[48.8534951, 2.3483915]} // Paris coordinates
      zoom={13}
      scrollWheelZoom={false}
    >
      {/* Map controller for handling interactions */}
      <MapController
        selectedLocation={selectedLocation}
        isOpenPopup={openPopup}
      />

      {/* Render McDonald's markers on map */}
      {mcdonaldsResults.map((mcdo, index) => {
        return (
          <Marker
            key={index}
            position={[mcdo.lat, mcdo.lon]}
            eventHandlers={{
              // Fly to marker position when clicked
              click: (e) => {
                const map = e.target._map;
                map.flyTo([mcdo.lat, mcdo.lon]),
                  map.getZoom(),
                  {
                    animate: true,
                    duration: 0,
                  };
              },
            }}
          >
            {/* Popup for each restaurant marker */}
            <Popup>
              <h3 className="font-black">{mcdo.name}</h3>
              <p>{mcdo.display_name}</p>
              {/* Button to select this restaurant */}
              <button
                className="bg-[#ffa500] font-black rounded-md border-0 px-2.5 py-3 text-black hover:cursor-pointer"
                onClick={() => handleSelectedClick(mcdo)}
              >
                Choisir
              </button>
            </Popup>
          </Marker>
        );
      })}

      {/* OpenStreetMap tile layer */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  );
}

export default Map;
