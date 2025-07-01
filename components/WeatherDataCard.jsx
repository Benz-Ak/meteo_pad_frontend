import {
  BiSolidThermometer,
  BiWater,
  BiWind,
  BiTachometer,
} from "react-icons/bi";

export default function WeatherDataCard({ data }) {
  // Fonction pour safe formatter float
  const formatNumber = (value, decimals = 2) => {
    if (value === null || value === undefined || isNaN(value)) return "-";
    return parseFloat(value).toFixed(decimals);
  };

  return (
    <div className="bg-transparent backdrop-blur-xl shadow-md rounded-lg p-4 text-gray-100 grid grid-cols-2 gap-4 w-[15rem]">
      <div
        className="flex flex-col items-center text-center"
        aria-label="Air temperature"
      >
        <BiSolidThermometer className="mb-1 text-2xl" />
        <span>{formatNumber(data["AIR TEMPERATURE"], 1)} °C</span>
      </div>
      <div
        className="flex flex-col items-center text-center"
        aria-label="Humidity"
      >
        <BiWater className="mb-1 text-2xl" />
        <span>{formatNumber(data["HUMIDITY"])} %</span>
      </div>
      <div
        className="flex flex-col items-center text-center"
        aria-label="Wind speed"
      >
        <BiWind className="mb-1 text-2xl" />
        <span>{formatNumber(data["WIND SPEED"])} km/h</span>
      </div>
      <div
        className="flex flex-col items-center text-center"
        aria-label="Air pressure"
      >
        <BiTachometer className="mb-1 text-2xl" />
        <span>{formatNumber(data["AIR PRESSURE"], 0)} hPa</span>
      </div>
    </div>
  );
}
