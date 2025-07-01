import React, { useState, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import L from "leaflet";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconShadowUrl from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl,
  shadowUrl: iconShadowUrl,
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

function MapView({ data }) {
  const [selectedParam, setSelectedParam] = useState("AIR TEMPERATURE");

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toISOString().slice(0, 16);
  };

  const stations = useMemo(() => {
    const map = {};
    data.forEach((item) => {
      const name = item.Station;
      if (!map[name]) {
        map[name] = {
          name,
          position: [item.Latitude, item.Longitude],
          records: [],
        };
      }
      map[name].records.push({
        ...item,
        formattedDate: formatDate(item.DateTime),
      });
    });
    return Object.values(map);
  }, [data]);

  const chartData = useMemo(() => {
    const allDates = Array.from(
      new Set(data.map((d) => formatDate(d.DateTime)))
    ).sort();

    const palette = [
      "#e6194b",
      "#3cb44b",
      "#ffe119",
      "#4363d8",
      "#f58231",
      "#911eb4",
      "#46f0f0",
      "#f032e6",
      "#bcf60c",
      "#fabebe",
      "#008080",
      "#e6beff",
    ];

    const datasets = stations.map((station, index) => {
      const sortedRecords = station.records.sort((a, b) =>
        a.formattedDate.localeCompare(b.formattedDate)
      );
      const recordMap = Object.fromEntries(
        sortedRecords.map((r) => [r.formattedDate, r[selectedParam]])
      );

      const values = allDates.map((date) =>
        recordMap[date] !== undefined ? recordMap[date] : null
      );

      return {
        label: station.name,
        data: values,
        borderColor: palette[index % palette.length],
        backgroundColor: "transparent",
        tension: 0.3,
        spanGaps: true,
      };
    });

    return {
      labels: allDates.map((dt) => dt.replace("T", " ")),
      datasets,
    };
  }, [stations, data, selectedParam]);

  if (!data || data.length === 0) {
    return (
      <p className="text-center mt-10 text-gray-500">
        Chargement des données météo...
      </p>
    );
  }

  const center = stations.length > 0 ? stations[0].position : [0, 0];

  // Fonction utilitaire pour afficher la valeur avec unité
  const displayValue = (val, unit) =>
    val !== null && val !== undefined ? `${val} ${unit}` : "N/A";

  return (
    <div className="bg-gradient-to-br from-slate-900 to-black text-white min-h-screen p-4">
      <h1 className="text-3xl font-bold text-center mb-6">
        Carte météo & comparaison des paramètres
      </h1>

      <MapContainer
        center={center}
        zoom={12}
        style={{
          height: "400px",
          maxWidth: "900px",
          margin: "0 auto",
          borderRadius: "1rem",
          border: "1px solid gray",
          zIndex: 1,
        }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {stations.map((station) => {
          const lastRecord = station.records[station.records.length - 1];
          return (
            <Marker key={station.name} position={station.position}>
              <Popup>
                <strong>{station.name}</strong>
                <br />
                Température :{" "}
                {displayValue(lastRecord?.["AIR TEMPERATURE"], "°C")}
                <br />
                Humidité : {displayValue(lastRecord?.["HUMIDITY"], "%")}
                <br />
                Pression : {displayValue(lastRecord?.["AIR PRESSURE"], "hPa")}
                <br />
                Marée : {displayValue(lastRecord?.["TIDE HEIGHT"], "m")}
                <br />
                Vent :{" "}
                {lastRecord?.["WIND SPEED"] !== undefined &&
                lastRecord?.["WIND DIR"] !== undefined
                  ? `${lastRecord["WIND SPEED"]} m/s à ${lastRecord["WIND DIR"]}°`
                  : "N/A"}
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>

      <div className="text-center mt-8 max-w-xl mx-auto">
        <label
          htmlFor="param-select"
          className="block mb-2 text-lg font-semibold"
        >
          Sélectionnez un paramètre à comparer
        </label>
        <select
          id="param-select"
          value={selectedParam}
          onChange={(e) => setSelectedParam(e.target.value)}
          className="p-2 w-full max-w-sm rounded border border-gray-600 bg-gray-800 text-white"
        >
          <option value="AIR TEMPERATURE">Température (°C)</option>
          <option value="HUMIDITY">Humidité (%)</option>
          <option value="AIR PRESSURE">Pression (hPa)</option>
          <option value="TIDE HEIGHT">Hauteur de marée (m)</option>
          <option value="WIND SPEED">Vitesse du vent (m/s)</option>
          <option value="WIND DIR">Direction du vent (°)</option>
        </select>

        <div
          style={{ overflowX: "auto", marginTop: "2rem" }}
          className="max-w-full"
        >
          <div style={{ minWidth: "600px" }}>
            <Line
              data={chartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { position: "bottom" } },
              }}
              height={300}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MapView;
