// controllers/weatherController.js
const axios = require("axios");
const { provinces } = require('../models/weatherModel');

// ✅ Check if API key is loaded
console.log("OpenWeather API key:", process.env.OPENWEATHERMAP_API_KEY);


// ✅ Single province with forecast
const getWeather = async (req, res) => {
  let { location } = req.query;
  const apiKey = process.env.OPENWEATHERMAP_API_KEY;

  if (!location || location.trim() === "") {
    location = "Phnom Penh";
  }

  try {
    // Current weather
    const currentResponse = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(location)},KH&appid=${apiKey}&units=metric`
    );
    const currentData = currentResponse.data;

    // Forecast (5-day, 3-hour intervals)
    const forecastResponse = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(location)},KH&appid=${apiKey}&units=metric`
    );
    const forecastData = forecastResponse.data;

    // Group forecast by day
    const grouped = {};
    forecastData.list.forEach(item => {
      const date = new Date(item.dt * 1000);
      const dateStr = date.toLocaleDateString("en-CA");
      if (!grouped[dateStr]) grouped[dateStr] = [];
      grouped[dateStr].push(item);
    });

    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayStr = today.toLocaleDateString("en-CA");
    const sortedDates = Object.keys(grouped).sort();
    const todayIndex = sortedDates.indexOf(todayStr);

    const forecastDays = [];
    for (let i = 0; i < 4; i++) {
      const targetIndex = todayIndex + i;
      if (targetIndex < sortedDates.length) {
        const dateStr = sortedDates[targetIndex];
        const date = new Date(dateStr);
        const temps = grouped[dateStr].map(item => item.main.temp);
        const maxTemp = Math.max(...temps);
        forecastDays.push({
          day: days[date.getDay()],
          temp: Math.round(maxTemp),
          isToday: dateStr === todayStr
        });
      }
    }

    // Icons
    const iconMap = {
      "01d": "☀️", "01n": "🌑", "02d": "🌤", "02n": "☁️",
      "03d": "☁️", "03n": "☁️", "04d": "☁️", "04n": "☁️",
      "09d": "🌧", "09n": "🌧", "10d": "🌦", "10n": "🌧",
      "11d": "⛈", "11n": "⛈", "13d": "❄️", "13n": "❄️",
      "50d": "🌫", "50n": "🌫"
    };
    const icon = iconMap[currentData.weather[0].icon] || "❓";

    res.json({
      location,
      weather: {
        temperature: Math.round(currentData.main.temp),
        icon,
        precipitation: currentData.rain?.["1h"] || currentData.snow?.["1h"] || 0,
        humidity: currentData.main.humidity,
        wind: Math.round(currentData.wind.speed * 3.6)
      },
      forecast: forecastDays
    });
  } catch (error) {
    console.error("Error fetching weather data:", error);
    res.status(error.response?.status || 500).json({
      error: error.response?.data?.message || "Failed to fetch weather data"
    });
  }
};

const getAllProvincesWeather = async (req, res) => {
  const apiKey = process.env.OPENWEATHERMAP_API_KEY;
  // Weather icon mapping
  const iconMap = {
    "01d": "☀️", "01n": "🌑", "02d": "🌤", "02n": "☁️",
    "03d": "☁️", "03n": "☁️", "04d": "☁️", "04n": "☁️",
    "09d": "🌧", "09n": "🌧", "10d": "🌦", "10n": "🌧",
    "11d": "⛈", "11n": "⛈", "13d": "❄️", "13n": "❄️",
    "50d": "🌫", "50n": "🌫"
  };
  try {
    const weatherPromises = provinces.map(async (province) => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(province.query)}&appid=${apiKey}&units=metric`
        );
        const iconCode = response.data.weather[0].icon;
        return {
          province: province.name,
          weather: {
            temperature: Math.round(response.data.main.temp),
            icon: iconMap[iconCode] || "❓",
            precipitation: response.data.rain?.["1h"] || response.data.snow?.["1h"] || 0,
            humidity: response.data.main.humidity,
            wind: Math.round(response.data.wind.speed * 3.6)
          }
        };
      } catch (error) {
        console.error(`Error fetching weather for ${province.name}:`, error.message);
        return null;
      }
    });
    const allWeather = (await Promise.all(weatherPromises)).filter(data => data !== null);
    res.json({ provinces: allWeather });
  } catch (error) {
    console.error('Error in getAllProvincesWeather:', error.message);
    res.status(500).json({ error: 'Failed to fetch weather for all provinces' });
  }
};

module.exports = { getWeather, getAllProvincesWeather };
