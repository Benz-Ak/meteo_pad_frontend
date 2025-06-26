import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import WeatherDataCard from "../components/WeatherDataCard";

function LiveData() {
  const [data, setData] = useState(null);
  const [station, setStation] = useState("all");
  const handleSelectStation = (e) => {
    setStation(e.target.value);
  };
  function convertToCSV(objArray) {
    const array = Array.isArray(objArray) ? objArray : [objArray];
    const headers = Object.keys(array[0]);
    const csvRows = array.map((row) =>
      headers.map((field) => `"${row[field]}"`).join(",")
    );
    return [headers.join(","), ...csvRows].join("\n");
  }

  function downloadCSV(data, filename = "donnees-meteo.csv") {
    const csv = convertToCSV(data);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    link.click();
  }

  useEffect(() => {
    axios
      .get("https://data-real-time-6.onrender.com/donnees?limit=200")
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  }, []);

  if (!data) return <Spinner />;
  const realTimeData = data.map((item) => (
    <WeatherDataCard key={item._id} data={item} />
  ));

  return (
    <div className="p-4 bg-[rgba(0,0,0,.7)] text-white bg-[url(../src/assets/images/bg-weather.png)] bg-blend-darken bg-fixed bg-cover bg-blue-50 min-h-screen">
      <div className="flex flex-col text-md items-center mb-4 text-center justify-center">
        <h1 className="text-xl font-bold mb-4">
          Données Météorologiques en Temps Réel
        </h1>
        <p className="mb-4">
          Les données suivantes sont mises à jour en temps réel pour vous
          fournir les informations les plus précises sur les conditions
          météorologiques actuelles au Port Autonome de Douala.
        </p>
        <p className="">
          <b>Note :</b> Les données sont collectées toutes les 10 minutes et
          peuvent varier légèrement en fonction des conditions locales.
        </p>
      </div>
      <div className="flex flex-col gap-4 items-center md:grid md:grid-cols-3 md:gap-2 lg:grid-cols-5">
        {realTimeData.slice(0, 8)}
      </div>
      <div>
        <span>Filter:</span>
        <select
          name="station"
          id="station"
          className="bg-transparent outline-none"
          onChange={handleSelectStation}
        >
          <option value="all"> All option</option>
          <option
            value="SM 1"
            className="bg-transparent outline-none text-slate-800"
          >
            SM 1
          </option>
          <option value="SM 2" className="bg-transparent outline-none">
            SM 2
          </option>
          <option value="SM 3" className="bg-transparent outline-none">
            SM 3
          </option>
          <option value="SM 4" className="bg-transparent outline-none">
            SM 4
          </option>
        </select>
        <button
          onClick={() =>
            downloadCSV(
              station === "all"
                ? data
                : data.filter((item) => item.Station === station)
            )
          }
          className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded"
        >
          Télécharger les Données CSV
        </button>
      </div>
      <div>
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
            {station === "all"
              ? data.map((item, index) => (
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
                ))
              : data
                  .filter((item) => item.Station === station)
                  .map((item, index) => (
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
      </div>
    </div>
  );
}

export default LiveData;
