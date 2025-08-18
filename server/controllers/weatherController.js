const axios = require('axios');

const getWeather = async (req, res) => {
  const { location } = req.query;
  const apiKey = process.env.OPENWEATHERMAP_API_KEY;

  if (!location) {
    return res.status(400).json({ error: 'Location is required' });
  }

  try {
    // Fetch current weather
    const currentResponse = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(location)},KH&appid=${apiKey}&units=metric`
    );
    const currentData = currentResponse.data;

    // Fetch forecast
    const forecastResponse = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(location)},KH&appid=${apiKey}&units=metric`
    );
    const forecastData = forecastResponse.data;

    // Process forecast data to get daily max temperatures
    const grouped = {};
    forecastData.list.forEach(item => {
      const date = new Date(item.dt * 1000);
      const dateStr = date.toLocaleDateString('en-CA');
      if (!grouped[dateStr]) grouped[dateStr] = [];
      grouped[dateStr].push(item);
    });

    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayStr = today.toLocaleDateString('en-CA');
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

    // Map weather icon
    const iconMap = {
      "01d": "☀️", "01n": "🌑", "02d": "🌤", "02n": "☁️", "03d": "☁️", "03n": "☁️",
      "04d": "☁️", "04n": "☁️", "09d": "🌧", "09n": "🌧", "10d": "🌦", "10n": "🌧",
      "11d": "⛈", "11n": "⛈", "13d": "❄️", "13n": "❄️", "50d": "🌫", "50n": "🌫"
    };
    const icon = iconMap[currentData.weather[0].icon] || "❓";

    // Send response
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
    console.error('Error fetching weather data:', error);
    res.status(error.response?.status || 500).json({
      error: error.response?.data?.message || 'Failed to fetch weather data'
    });
  }
};

module.exports = { getWeather };
