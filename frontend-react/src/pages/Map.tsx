import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { getBuses } from "../services/firestoreservice";
import { useNavigate } from "react-router-dom";

// const busIcon = new L.Icon({
//   iconUrl: "https://cdn-icons-png.flaticon.com/512/455/455705.png", // Bus icon URL
//   iconSize: [30, 30],
// });

var busIcon = L.icon({
  iconUrl: "./src/assets/bus.png",
  //   shadowUrl: "./src/assets/bus.png",

  iconSize: [60, 95],
  shadowSize: [50, 64],
  iconAnchor: [22, 94],
  shadowAnchor: [4, 62],
  popupAnchor: [-3, -76],
});

interface Bus {
  id: string;
  bus_no: number;
  drivername: string;
  latitude: number;
  longitude: number;
}

const MapPage = () => {
  const [buses, setBuses] = useState<Bus[]>([]);
  //   const [mapCenter, setMapCenter] = useState<[number, number]>([
  //     11.341, 77.7172,
  //   ]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBusData = async () => {
      const busData = await getBuses();
      setBuses(busData as Bus[]);
    };
    fetchBusData();
  }, []);

  return (
    <div className="h-screen flex flex-col">
      <button
        className="p-2 bg-gray-800 text-white mb-2"
        onClick={() => navigate("/dashboard")}
      >
        Back to Dashboard
      </button>
      <MapContainer center={[11.341, 77.7172]} zoom={12} className="flex-grow">
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {buses.map((bus) => (
          <Marker
            key={bus.id}
            position={[bus.latitude, bus.longitude]}
            icon={busIcon}
          >
            <Popup>
              <b>Bus No:</b> {bus.bus_no} <br />
              <b>Driver:</b> {bus.drivername}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapPage;
