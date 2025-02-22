import React, { useState } from "react";
import axios from "axios";

const API_KEY = "ed0817175ee4fe2fcaccc5adc26e0c4c"; // Ersetze mit deinem OpenWeatherMap API Key

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const fetchWeather = async () => {
    if (!city) return; // Falls keine Stadt eingegeben wurde

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=de`
      );
      setWeather(response.data);
      setError(null);
    } catch (err) {
      setError("Stadt nicht gefunden! ❌");
      setWeather(null);
    }
  };

  return (
    <div style={{ fontFamily: "Arial", textAlign: "center", padding: "20px" }}>
      <h1>🌤 Wetter Dashboard</h1>
      <input
        type="text"
        placeholder="Stadt eingeben..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
        style={{
          padding: "10px",
          fontSize: "16px",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
      />
      <button
        onClick={fetchWeather}
        style={{
          marginLeft: "10px",
          padding: "10px",
          fontSize: "16px",
          borderRadius: "5px",
          border: "none",
          backgroundColor: "#007BFF",
          color: "white",
          cursor: "pointer",
        }}
      >
        Suchen
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {weather && (
        <div>
          <h2>📍 {weather.name}</h2>
          <h3>{weather.weather[0].description}</h3>
          <h3>{weather.main.temp}°C</h3>
          <p>🌬 Wind: {weather.wind.speed} m/s</p>
          <p>💧 Luftfeuchtigkeit: {weather.main.humidity}%</p>
        </div>
      )}
    </div>
  );
}

export default App;
