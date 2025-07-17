import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import axios from "axios";

function MapController({ selectedLocation, isOpenPopup }) {
  const map = useMap();

  useEffect(() => {
    if (selectedLocation.length === 2) {
      map.flyTo(selectedLocation, map.getZoom(), {
        animate: false,
        duration: 0,
      });
    }
  }, [selectedLocation, map]);

  useEffect(() => {
    if (isOpenPopup) {
      map.closePopup();
    }
  }, [isOpenPopup, map]);

  return null;
}

function Map({ selectedLocation, selectedLocationName, addSelectedMcdonalds }) {
  const [mcdonaldsResults, setMcdonaldsResults] = useState([]);
  const [openPopup, setOpenPopup] = useState(false);

  async function addMcDonaldsResults(selectedLocationName) {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/search/mcdo?q=${encodeURIComponent(
          selectedLocationName
        )}`
      );
      setMcdonaldsResults(response.data);
    } catch (error) {
      console.log("Error trying to req proxy :", error);
    }
  }

  useEffect(() => {
    if (selectedLocationName) {
      addMcDonaldsResults(selectedLocationName);
    }
  }, [selectedLocationName]);

  function handleSelectedClick(mcdo) {
    addSelectedMcdonalds(mcdo);
    setOpenPopup(true);
    setInterval(() => {
      setOpenPopup(false);
    }, 1000);
  }

  return (
    <MapContainer
      style={{ height: "100vh", width: "100%" }}
      center={[48.8534951, 2.3483915]}
      zoom={13}
      scrollWheelZoom={false}
    >
      <MapController
        selectedLocation={selectedLocation}
        isOpenPopup={openPopup}
      />

      {mcdonaldsResults.map((mcdo, index) => {
        return (
          <Marker
            key={index}
            position={[mcdo.lat, mcdo.lon]}
            eventHandlers={{
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
            <Popup>
              <h3 className="font-black">{mcdo.name}</h3>
              <p>{mcdo.display_name}</p>
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

      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  );
}

export default Map;
