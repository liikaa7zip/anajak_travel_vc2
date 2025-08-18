const weatherSchema = {
  location: String,
  weather: {
    temperature: Number,
    icon: String,
    precipitation: Number,
    humidity: Number,
    wind: Number
  },
  forecast: [{
    day: String,
    temp: Number,
    isToday: Boolean
  }]
};

module.exports = { weatherSchema };
