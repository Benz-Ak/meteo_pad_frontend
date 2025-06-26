import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const position = [3.9916, 9.5877];

function MapView() {
  return (
    <div className=" ">
      <MapContainer
        center={position}
        zoom={13}
        style={{ height: "400px", width: "95%", zIndex:"1", border:"solid 1px gray", margin:"auto", marginTop:"20px", borderRadius:"1rem" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={position}>
          <Popup>
            Port Autonome de Douala<br />
            <a href="https://www.portdedouala.com" target="_blank" rel="noopener noreferrer">
              Visit Website
            </a>
          </Popup>
        </Marker>
      </MapContainer>

      //cartes donnees temps reels

      <div className="text-center mt-4">
        <h2 className="text-2xl font-bold">Port Autonome de Douala</h2>
        <p className="text-gray-600">
          Explorez le Port Autonome de Douala avec notre carte interactive.
          Cliquez sur le marqueur pour plus d'informations.
        </p>

      </div>
      </div>
  );
}

export default MapView;
