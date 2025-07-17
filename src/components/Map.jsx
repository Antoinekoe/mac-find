import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import axios from "axios";

function MapController({ selectedLocation, selectedLocationName }) {
  const map = useMap();

  useEffect(() => {
    if (selectedLocation.length === 2) {
      map.flyTo(selectedLocation, map.getZoom(), {
        animate: false,
        duration: 0,
      });
    }
  }, [selectedLocation, map]);

  return null;
}

function Map({ selectedLocation, selectedLocationName, selectedMcdonalds }) {
  const [mcdonaldsResults, setMcdonaldsResults] = useState([]);

  async function addMcDonaldsResults(selectedLocationName) {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/search/mcdo?q=${encodeURIComponent(
          selectedLocationName
        )}`
      );
      console.log(response.data);
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

  return (
    <MapContainer
      style={{ height: "100vh", width: "100%" }}
      center={[48.8534951, 2.3483915]}
      zoom={13}
      scrollWheelZoom={false}
    >
      <MapController
        selectedLocation={selectedLocation}
        selectedLocationName={selectedLocationName}
      />

      {mcdonaldsResults.map((mcdo, index) => {
        return (
          <Marker key={index} position={[mcdo.lat, mcdo.lon]}>
            <Popup>
              <h3>{mcdo.name}</h3>
              <p>{mcdo.display_name}</p>
              <button onClick={() => selectedMcdonalds(mcdo)}>Choisir</button>
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
