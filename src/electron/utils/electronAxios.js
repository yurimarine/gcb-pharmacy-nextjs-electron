const axios = require("axios");

const electronApi = axios.create({
  baseURL: "http://localhost:8000/api",
});

module.exports = electronApi;
