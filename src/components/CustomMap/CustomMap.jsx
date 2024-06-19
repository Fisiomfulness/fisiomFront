"use client";

import axios from "axios";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import ServicioMainCardSmall from "../Servicios/ServicioMainCardSmall";
import ProfessionalsUpdate from "./ProfessionalsUpdate";
import UsersUpdate from "./UsersUpdate";
import CustomControls from "./CustomControls";
import useGeolocation from "@/hooks/useGeolocation";
import { apiEndpoints } from "../../api_endpoints";

const CustomMap = ({ markers, setMarkers, user, toggle }) => {
  const customIcon = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/128/684/684908.png",
    iconSize: [38, 38],
  });
  const userIcon = new Icon({
    iconUrl: "/pin_red.png",
    iconSize: [38, 38],
  });

  const location = useGeolocation();
  const pathname = usePathname();

  if (markers.length) {
    return (
      <MapContainer
        center={{
          lat: markers[0]?.coordinates[0] || 0,
          lng: markers[0]?.coordinates[1] || 0,
        }}
        zoom={15}
        zoomControl={false}
        scrollWheelZoom={true}
        className="w-full h-full z-0"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="https://www.openstreetmap.org/copyright contributors"
        />
        <CustomControls />
        {pathname === "/servicios" && (
          <ProfessionalsUpdate
            markers={markers}
            setMarkers={setMarkers}
            toggle={toggle}
          />
        )}
        {pathname === "/comunidad" && (
          <UsersUpdate
            markers={markers}
            setMarkers={setMarkers}
            toggle={toggle}
          />
        )}
        {location?.user ? (
          <Marker position={location.user} icon={userIcon}></Marker>
        ) : null}
        {markers?.map((e, i) => {
          return (
            <Marker key={i} position={e.coordinates} icon={customIcon}>
              <Popup>
                <ServicioMainCardSmall profesional={e} />
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    );
  } else {
    return null;
  }
};

export default CustomMap;
