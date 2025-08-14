// const axios = require('axios');
// const NodeCache = require('node-cache');
// const { OPENWEATHER_API_KEY } = require('../config');

// // Cache with 10-minute TTL
// const weatherCache = new NodeCache({ stdTTL: 600 });

// // Error messages
// const ERRORS = {
//   NO_API_KEY: 'Weather API key not configured',
//   LOCATION_NOT_FOUND: 'Location not found',
//   API_FAILURE: 'Weather API request failed'
// };

// class WeatherModel {
//   /**
//    * Fetch current weather data from OpenWeatherMap
//    * @param {string} location - City name
//    * @returns {Promise<Object>} Weather data
//    */
//   static async getCurrentWeather(location) {
//     if (!OPENWEATHER_API_KEY) throw new Error(ERRORS.NO_API_KEY);
    
//     try {
//       const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
//         params: {
//           q: `${location},KH`,
//           appid: OPENWEATHER_API_KEY,
//           units: 'metric'
//         },
//         timeout: 5000
//       });
      
//       return {
//         temp: response.data.main.temp,
//         condition: response.data.weather[0].main,
//         icon: response.data.weather[0].icon,
//         humidity: response.data.main.humidity,
//         windSpeed: response.data.wind.speed,
//         coord: response.data.coord
//       };
//     } catch (error) {
//       this.handleWeatherError(error);
//     }
//   }

//   /**
//    * Fetch 4-day forecast from OpenWeatherMap
//    * @param {number} lat - Latitude
//    * @param {number} lon - Longitude
//    * @returns {Promise<Array>} Forecast data
//    */
//   static async getForecast(lat, lon) {
//     try {
//       const response = await axios.get('https://api.openweathermap.org/data/2.5/onecall', {
//         params: {
//           lat,
//           lon,
//           exclude: 'minutely,hourly,alerts,current',
//           appid: OPENWEATHER_API_KEY,
//           units: 'metric'
//         },
//         timeout: 5000
//       });

//       return response.data.daily.slice(0, 4).map(day => ({
//         date: new Date(day.dt * 1000),
//         temp: day.temp.day,
//         condition: day.weather[0].main,
//         icon: day.weather[0].icon
//       }));
//     } catch (error) {
//       this.handleWeatherError(error);
//     }
//   }

//   /**
//    * Get cached weather data if available
//    * @param {string} cacheKey - Cache key
//    * @returns {Object|null} Cached data or null
//    */
//   static getCachedWeather(cacheKey) {
//     return weatherCache.get(cacheKey);
//   }

//   /**
//    * Cache weather data
//    * @param {string} cacheKey - Cache key
//    * @param {Object} data - Data to cache
//    */
//   static cacheWeather(cacheKey, data) {
//     weatherCache.set(cacheKey, data);
//   }

//   /**
//    * Handle OpenWeatherMap API errors
//    * @param {Error} error - Axios error
//    */
//   static handleWeatherError(error) {
//     if (error.response) {
//       if (error.response.status === 404) {
//         throw new Error(ERRORS.LOCATION_NOT_FOUND);
//       } else if (error.response.status === 401) {
//         throw new Error('Invalid API key');
//       }
//     }
//     throw new Error(ERRORS.API_FAILURE);
//   }

//   /**
//    * Format weather data for response
//    * @param {Object} current - Current weather data
//    * @param {Array} forecast - Forecast data
//    * @param {string} location - Location name
//    * @returns {Object} Formatted weather data
//    */
//   static formatWeatherData(current, forecast, location) {
//     return {
//       location,
//       temperature: Math.round(current.temp),
//       condition: current.condition,
//       icon: current.icon,
//       humidity: current.humidity,
//       windSpeed: Math.round(current.windSpeed * 3.6), // Convert to km/h
//       forecast: forecast.map(day => ({
//         date: day.date.toLocaleDateString(),
//         temp: Math.round(day.temp),
//         condition: day.condition,
//         icon: day.icon
//       }))
//     };
//   }
// }

// module.exports = WeatherModel;