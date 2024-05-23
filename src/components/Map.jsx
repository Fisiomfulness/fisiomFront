"use client";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import ServicioMainCardSmall from "./Servicios/ServicioMainCardSmall";
import { useAtom } from "jotai";
import { locationAtom } from "../components/Servicios/store/servicios";

const Map = ({ markers, setMarkers }) => {
  const [locations, _] = useAtom(locationAtom);

  const customIcon = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/128/684/684908.png",
    iconSize: [38, 38],
  });
  const userIcon = new Icon({
    iconUrl: "/pin_red.png",
    iconSize: [38, 38],
  });

  //useEffect...

  if (markers.length) {
    return (
      <MapContainer
        center={{ lat: locations.mapCenter[0], lng: locations.mapCenter[1] }}
        zoom={15}
        scrollWheelZoom={true}
        className="w-full h-full z-0"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="https://www.openstreetmap.org/copyright contributors"
        />
        {locations.user ? (
          <Marker position={locations.user} icon={userIcon}></Marker>
        ) : null}
        {professionals?.map((e, i) => {
          return (
            <Marker key={i} position={e.coordinates} icon={customIcon}>
              <Popup>
                <ServicioMainCardSmall profesional={e} />
              </Popup>
            </Marker>
          );
        })}
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
