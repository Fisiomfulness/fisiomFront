"use client";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";

const Map = ({ markers }) => {
  const custtomIcon = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/128/684/684908.png",
    iconSize: [38, 38],
  });

  return (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={13}
      scrollWheelZoom={false}
      className="w-full h-full z-0"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="https://www.openstreetmap.org/copyright contributors"
      />

      {markers.map((e, i) => {
        return (
          <Marker key={i} position={e.position} icon={custtomIcon}>
            <Popup>{e.popup}</Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

export default Map;
