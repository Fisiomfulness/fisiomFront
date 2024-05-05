"use client";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import ServicioMainCardSmall from "./Servicios/ServicioMainCardSmall";

const Map = ({ professionals, users, userCoords }) => {
  const customIcon = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/128/684/684908.png",
    iconSize: [38, 38],
  });
  const userIcon = new Icon({
    iconUrl: "/pin_red.png",
    iconSize: [38, 38],
  });

  if (userCoords[0] !== 0) {
    return (
      <MapContainer
        center={{ lat: userCoords[0], lng: userCoords[1] }}
        zoom={15}
        scrollWheelZoom={true}
        className="w-full h-full z-0"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="https://www.openstreetmap.org/copyright contributors"
        />
        <Marker position={userCoords} icon={userIcon}></Marker>
        {professionals?.map((e, i) => {
          return (
            <Marker key={i} position={e.coordinates} icon={customIcon}>
              <Popup>
                <ServicioMainCardSmall profesional={e} />
              </Popup>
            </Marker>
          );
        })}
        <Marker position={userCoords} icon={userIcon}></Marker>
        {users?.map((e, i) => {
          return (
            <Marker key={i} position={e.coordinates} icon={customIcon}>
              <Popup>{/* <ServicioMainCardSmall profesional={e} /> */}</Popup>
            </Marker>
          );
        })}
      </MapContainer>
    );
  } else {
    return null;
  }
};

export default Map;
