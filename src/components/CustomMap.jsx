"use client";

import axios from "axios";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import ServicioMainCardSmall from "./Servicios/ServicioMainCardSmall";
import { useAtom } from "jotai";
import { locationAtom } from "./Servicios/store/servicios";
import { filtersAtom } from "./Servicios/store/servicios";
import { apiEndpoints } from "../api_endpoints";

const Logic = ({ markers, setMarkers }) => {
  const map = useMap();
  const [locations] = useAtom(locationAtom);
  const [filters, setFilters] = useAtom(filtersAtom);
  const pathname = usePathname();

  useEffect(() => {
    const abortController = new AbortController();
    if (markers.length) {
      console.log(markers)
      if (pathname === "/servicios") {
        axios
          .get(apiEndpoints.professionals, {
            signal: abortController.signal,
            params: {
              search: filters.search.join(","),
              city: filters.city,
              specialtyId: filters.specialtyId,
              pos: locations.user.join(","),
              bbox: map.getBounds().toBBoxString(),
              page: filters.page,
            },
            withCredentials: true,
          })
          .then(({ data }) => {
            setMarkers((prev) =>
              Array.from(
                new Map(
                  [...prev, ...data.professionals].map((item) => [
                    item._id,
                    item,
                  ])
                ).values()
              )
            );
            setFilters((prev) => ({ ...prev, page: prev.page + 1 }));
          })
          .catch((err) => {
            if (err.name === "CanceledError") return;
            throw err;
          });
      }
    }
    return () => abortController.abort();
  }, []);

  return null;
};
const CustomMap = ({ markers, setMarkers }) => {
  const customIcon = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/128/684/684908.png",
    iconSize: [38, 38],
  });
  const userIcon = new Icon({
    iconUrl: "/pin_red.png",
    iconSize: [38, 38],
  });

  const [locations] = useAtom(locationAtom);

  if (markers.length) {
    return (
      <MapContainer
        center={{
          lat: markers[0]?.coordinates[0] || 0,
          lng: markers[0]?.coordinates[1] || 0,
        }}
        zoom={14}
        scrollWheelZoom={true}
        className="w-full h-full z-0"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="https://www.openstreetmap.org/copyright contributors"
        />
        <Logic
          markers={markers}
          setMarkers={setMarkers}
        />
        {locations.user ? (
          <Marker position={locations.user} icon={userIcon}></Marker>
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
