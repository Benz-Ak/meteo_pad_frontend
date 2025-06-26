import {BiSolidThermometer, BiWater, BiWind, BiTachometer} from "react-icons/bi"
 
export default function WeatherDataCard({data}) {
  return (
    <div className="bg-transparent backdrop-blur-xl shadow-md items-center rounded-lg p-4 text-gray-100 grid grid-cols-2 gap-4 w-[15rem]">
      <div className="mb-1 text-center flex items-center flex-col ">
        <BiSolidThermometer className="" />{" "}
        {data["AIR TEMPERATURE"]} °C
      </div>
      <div className="mb-1 text-center  text-[1rem] flex items-center flex-col">
        <BiWater className="" />{" "}
        {parseFloat(data["HUMIDITY"]).toFixed(2)} %
      </div>
      <div className="mb-1 text-center flex items-center flex-col">
        <BiWind className="" /> {data["WIND SPEED"].toFixed(2)} km/h
      </div>
      <div className="mb-1 text-center flex items-center flex-col">
        <BiTachometer className="" /> {data["AIR PRESSURE"]} hPa
      </div>
    </div>
  );
}
