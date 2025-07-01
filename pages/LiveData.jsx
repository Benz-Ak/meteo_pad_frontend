import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import WeatherDataCard from "../components/WeatherDataCard";

function convertToCSV(objArray) {
  const array = Array.isArray(objArray) ? objArray : [objArray];
  const headers = Object.keys(array[0] || {});
  const csvRows = array.map((row) =>
    headers
      .map((field) => {
        const val =
          row[field] !== undefined && row[field] !== null ? row[field] : "";
        // Échapper les " dans la valeur
        return `"${String(val).replace(/"/g, '""')}"`;
      })
      .join(",")
  );
  return [headers.join(","), ...csvRows].join("\n");
}

function downloadCSV(data, filename = "donnees-meteo.csv") {
  if (!data || data.length === 0) return alert("Aucune donnée à exporter.");
  const csv = convertToCSV(data);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  link.remove();
}

function DataTable({ rows }) {
  if (!rows.length)
    return (
      <p className="text-center text-gray-400 mt-6">
        Aucune donnée disponible pour cette sélection.
      </p>
    );

  return (
    <table className="w-full border-separate border-spacing-2 my-4">
      <thead>
        <tr>
          <th className="border border-slate-600 rounded-md max-md:hidden">
            N°
          </th>
          <th className="border border-slate-600 rounded-md max-md:hidden">
            AIR PRESSURE
          </th>
          <th className="border border-slate-600 rounded-md max-md:hidden">
            AIR TEMPERATURE
          </th>
          <th className="border border-slate-600 rounded-md max-md:hidden">
            DEWPOINT
          </th>
          <th className="border border-slate-600 rounded-md max-md:hidden">
            HUMIDITY
          </th>
          <th className="border border-slate-600 rounded-md max-md:hidden">
            Latitude
          </th>
          <th className="border border-slate-600 rounded-md max-md:hidden">
            Longitude
          </th>
          <th className="border border-slate-600 rounded-md max-md:hidden">
            Station
          </th>
          <th className="border border-slate-600 rounded-md max-md:hidden">
            TIDE HEIGHT
          </th>
          <th className="border border-slate-600 rounded-md max-md:hidden">
            WIND DIR
          </th>
          <th className="border border-slate-600 rounded-md max-md:hidden">
            WIND SPEED
          </th>
          <th className="border border-slate-600 rounded-md max-md:hidden">
            DateTime
          </th>
        </tr>
      </thead>
      <tbody>
        {rows.map((item, index) => (
          <tr key={item._id} className="">
            <td className="border border-sky-700 rounded-md text-center">
              {index + 1}
            </td>
            <td className="border border-sky-700 rounded-md text-center">
              {item["AIR PRESSURE"]}
            </td>
            <td className="border border-sky-700 rounded-md text-center max-md:hidden">
              {item["AIR TEMPERATURE"]}
            </td>
            <td className="border border-sky-700 rounded-md text-center max-md:hidden">
              {item["DEWPOINT"]}
            </td>
            <td className="border border-sky-700 rounded-md text-center max-md:hidden">
              {item["HUMIDITY"]}
            </td>
            <td className="border border-sky-700 rounded-md text-center max-md:hidden">
              {item["Latitude"]}
            </td>
            <td className="border border-sky-700 rounded-md text-center max-md:hidden">
              {item["Longitude"]}
            </td>
            <td className="border border-sky-700 rounded-md text-center max-md:hidden">
              {item["Station"]}
            </td>
            <td className="border border-sky-700 rounded-md text-center max-md:hidden">
              {item["TIDE HEIGHT"]}
            </td>
            <td className="border border-sky-700 rounded-md text-center max-md:hidden">
              {item["WIND DIR"]}
            </td>
            <td className="border border-sky-700 rounded-md text-center max-md:hidden">
              {item["WIND SPEED"]}
            </td>
            <td className="border border-sky-700 rounded-md text-center max-md:hidden">
              {item["DateTime"]}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function LiveData() {
  const [data, setData] = useState(null);
  const [station, setStation] = useState("all");

  useEffect(() => {
    axios
      .get("https://data-real-time-6.onrender.com/donnees?limit=200")
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  }, []);

  const filteredData = useMemo(() => {
    if (!data) return [];
    return station === "all"
      ? data
      : data.filter((item) => item.Station === station);
  }, [data, station]);

  if (!data) return <Spinner />;

  return (
    <div className="p-4 bg-gradient-to-br from-slate-900 to-black text-white min-h-screen">
      <div className="flex flex-col text-md items-center mb-4 text-center justify-center max-w-3xl mx-auto">
        <h1 className="text-xl font-bold mb-4">
          Données Météorologiques en Temps Réel
        </h1>
        <p className="mb-4">
          Les données suivantes sont mises à jour en temps réel pour vous
          fournir les informations les plus précises sur les conditions
          météorologiques actuelles au Port Autonome de Douala.
        </p>
        <p>
          <b>Note :</b> Les données sont collectées toutes les 10 minutes et
          peuvent varier légèrement en fonction des conditions locales.
        </p>
      </div>

      <div className="flex flex-col gap-4 items-center md:grid md:grid-cols-3 md:gap-2 lg:grid-cols-5 max-w-5xl mx-auto mb-6">
        {filteredData.slice(0, 8).map((item) => (
          <WeatherDataCard key={item._id} data={item} />
        ))}
      </div>

      <div className="max-w-md mx-auto flex flex-col items-center gap-4 mb-6">
        <label htmlFor="station" className="block text-sm font-semibold">
          Filtrer par station
        </label>
        <select
          name="station"
          id="station"
          className="bg-transparent outline-none px-3 py-1 rounded border border-gray-600 text-white cursor-pointer"
          onChange={(e) => setStation(e.target.value)}
          value={station}
        >
          <option value="all">Toutes les stations</option>
          <option value="SM 1">SM 1</option>
          <option value="SM 2">SM 2</option>
          <option value="SM 3">SM 3</option>
          <option value="SM 4">SM 4</option>
        </select>
        <button
          onClick={() => downloadCSV(filteredData)}
          className="mt-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded"
        >
          Télécharger les Données CSV
        </button>
      </div>

      <div className="max-w-6xl mx-auto px-2">
        <DataTable rows={filteredData} />
      </div>
    </div>
  );
}

export default LiveData;
