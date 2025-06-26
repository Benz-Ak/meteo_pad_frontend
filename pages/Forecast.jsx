import Cloudy from "../src/assets/images/Cloudy.svg";
import {
  FaCloud,
  FaThermometerEmpty,
  FaThermometerFull,
  FaWind,
} from "react-icons/fa";
import { MdOutlineWater } from "react-icons/md";
export default function Forecast() {
  const date = new Date().toLocaleDateString();
  return (
    <div className="flex  flex-col items-ceter text-white bg-[url(../src/assets/images/homeBg.png)] bg-blend-darken bg-[rgba(0,0,0,.6)]  h-screen bg-cover bg-fixed">
      <div className="flex h-1/3 font-bold gap-x-2 p-4 items-center justify-center">
        <span className="text-5xl">
          16<sup>°</sup>
        </span>
        <div className="text-md inline-flex flex-col">
          <span>Douala</span>
          <span>{date}</span>
        </div>
        <img src={Cloudy} alt="" />
      </div>
      <div className="flex flex-col items-center p-4 h-2/3 gap-y-4">
        <ul className="md:text-2xl flex flex-col justify-around items-center w-full h-[80%] md:w-[60%] space-y-2 border-b round-md p-2 backdrop-blur-md text-gray-300 font-bold">
          <div>
            <label>Maree/Weather: </label>
            <select className="bg-transparent outline-none ">
              <option className="bg-transparent outline-none ">Maree</option>
              <option className="bg-transparent outline-none ">Meteo</option>
            </select>
          </div>
          <li className="w-full flex items-center justify-around">
            <span>Temp max</span>
            <div className="inline-flex items-center gap-x-2 text-white">
              10° <FaThermometerFull className="text-xl text-red-900" />
            </div>
          </li>
          <li className="w-full flex items-center justify-around ">
            <span className="text-gray-300">Temp min</span>{" "}
            <div className="inline-flex items-center gap-x-2 text-white">
              <span>10°</span>{" "}
              <FaThermometerEmpty className="text-xl text-blue-900" />
            </div>
          </li>{" "}
          <li className="w-full flex items-center justify-around">
            <span>Humidity</span>{" "}
            <div className="inline-flex items-center gap-x-2 text-white">
              <span className="self-start">58%</span>{" "}
              <MdOutlineWater className="text-xl text-blue-600" />
            </div>
          </li>{" "}
          <li className="w-full w-full flex items-center justify-around">
            <span>Cloudy</span>{" "}
            <div className="inline-flex items-center gap-x-2 text-white">
              <span>55%</span> <FaCloud />
            </div>
          </li>{" "}
          <li className="w-full flex items-center justify-around">
            <span>Wind</span>{" "}
            <div className="inline-flex items-center justify-end gap-x-2 text-white">
              <span>5Km/h</span> <FaWind />
            </div>
          </li>{" "}
        </ul>
      </div>
      <div>
      </div>
    </div>
  );
}
