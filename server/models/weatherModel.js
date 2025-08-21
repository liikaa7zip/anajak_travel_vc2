// models/weatherModel.js

const provinces = [
  { name: "Phnom Penh", query: "Phnom Penh,KH" },
  { name: "Siem Reap", query: "Siem Reap,KH" },
  { name: "Battambang", query: "Battambang,KH" },
  { name: "Kampong Cham", query: "Kampong Cham,KH" },
  { name: "Preah Vihear", query: "Preah Vihear,KH" },
  { name: "Kampot", query: "Kampot,KH" },
  { name: "Takeo", query: "Takeo,KH" },
  { name: "Kandal", query: "Kandal,KH" },
  { name: "Koh Kong", query: "Koh Kong,KH" },
  { name: "Pursat", query: "Pursat,KH" },
  { name: "Prey Veng", query: "Prey Veng,KH" },
  { name: "Svay Rieng", query: "Svay Rieng,KH" },
  { name: "Stung Treng", query: "Stung Treng,KH" },
  { name: "Kratie", query: "Kratie,KH" },
  { name: "Mondulkiri", query: "Mondulkiri,KH" },
  { name: "Ratanakiri", query: "Ratanakiri,KH" },
  { name: "Oddar Meanchey", query: "Oddar Meanchey,KH" },
  { name: "Kep", query: "Kep,KH" },
  { name: "Pailin", query: "Pailin,KH" },
  { name: "Banteay Meanchey", query: "Banteay Meanchey,KH" },
  { name: "Tbong Khmum", query: "Tbong Khmum,KH" },
  { name: "Kampong Thom", query: "Kampong Thom,KH" },
  { name: "Kampong Chhnang", query: "Kampong Chhnang,KH" },
  { name: "Kampong Speu", query: "Kampong Speu,KH" },
  { name: "Sihanoukville", query: "Sihanoukville,KH" }
];

const weatherSchema = {
  location: String,
  weather: {
    temperature: Number,
    icon: String,
    precipitation: Number,
    humidity: Number,
    wind: Number
  },
  forecast: [
    {
      day: String,
      temp: Number,
      isToday: Boolean
    }
  ]
};

module.exports = {
  provinces,
  weatherSchema
};
