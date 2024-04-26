"use client";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";

const Map = ({ markers, profesionales }) => {
  const customIcon = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/128/684/684908.png",
    iconSize: [38, 38],
  });
  const userIcon = new Icon({
    iconUrl: "/icons8-marcador-48.png",
    iconSize: [38, 38],
  });

  const simulatedUser = [-12.057822374374036, -77.06708360541617];

  return (
    <MapContainer
      center={simulatedUser}
      zoom={10}
      scrollWheelZoom={true}
      className="w-full h-full z-0"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="https://www.openstreetmap.org/copyright contributors"
      />
      <Marker position={simulatedUser} icon={userIcon}></Marker>
      {profesionales.map((e, i) => {
        return (
          <Marker key={i} position={e.coordinates} icon={customIcon}>
            <Popup>{e.popup}</Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

export default Map;
