import { Routes, Route, Router } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "../pages/Home";
import Sidebar from "../components/Sidebar";
import Forecast from "../pages/Forecast";
import LiveData from "../pages/LiveData";
import MapView from "../pages/MapView";
import Alerts from "../pages/Alerts";
import Header from "../components/Header"; // Assuming you have a Header component
import NotFound from "../pages/NotFound"; // Assuming you have a NotFound component
export default function App() {
  const [weatherData, setWeatherData] = useState([]);
  const fetchWeatherData = async () => {
    try {
      const response = await fetch(
        "https://data-real-time-6.onrender.com/donnees"
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setWeatherData(data);
      return data;
    } catch (error) {
      console.error("Failed to fetch weather data:", error);
      return [];
    }
  };
  useEffect(() => {
    fetchWeatherData();
  }, []);
  return (
    <div className="min-h-screen">
      <Header />

      <main className="mt-[.01rem] text-black col-span-9 relative top-0">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/live-data" element={<LiveData />} />
          <Route path="/map" element={<MapView />} />
          <Route path="/forecast" element={<Forecast />} />
          <Route path="/alerts" element={<Alerts data={weatherData} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}
