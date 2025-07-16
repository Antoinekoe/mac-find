import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";

function MapController({ selectedLocation }) {
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

function Map({ selectedLocation }) {
  return (
    <MapContainer
      style={{ height: "100vh", width: "100%" }}
      center={[48.8534951, 2.3483915]}
      zoom={13}
      scrollWheelZoom={false}
    >
      <MapController selectedLocation={selectedLocation} />

      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  );
}

export default Map;
