import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';

const ProfileMap = ({ center, zoom }) => {
  const customIcon = new Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/128/684/684908.png',
    iconSize: [38, 38],
  });

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      zoomControl={false}
      scrollWheelZoom={true}
      style={{ zIndex: 0 }}
      className="!size-full !min-h-[300px]"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={center} icon={customIcon} />
    </MapContainer>
  );
};

export default ProfileMap;
