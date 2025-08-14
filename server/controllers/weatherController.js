// const WeatherModel = require('../models/weatherModel');

// const WeatherController = {
//   /**
//    * Get weather data for a location
//    * @param {Object} req - Express request object
//    * @param {Object} res - Express response object
//    */
//   async getWeather(req, res) {
//     const location = req.params.location;
//     const cacheKey = `weather_${location}`;

//     try {
//       // Check cache first
//       const cachedData = WeatherModel.getCachedWeather(cacheKey);
//       if (cachedData) {
//         return res.json({
//           success: true,
//           cached: true,
//           data: cachedData
//         });
//       }

//       // Fetch fresh data
//       const current = await WeatherModel.getCurrentWeather(location);
//       const forecast = await WeatherModel.getForecast(
//         current.coord.lat, 
//         current.coord.lon
//       );

//       // Format and cache response
//       const weatherData = WeatherModel.formatWeatherData(current, forecast, location);
//       WeatherModel.cacheWeather(cacheKey, weatherData);

//       res.json({
//         success: true,
//         cached: false,
//         data: weatherData
//       });

//     } catch (error) {
//       const status = error.message.includes('not found') ? 404 : 500;
//       res.status(status).json({
//         success: false,
//         error: error.message
//       });
//     }
//   }
// };

// module.exports = WeatherController;