const axios = require("axios");

const PROD_URL = "https://powerful-ridge-48203.herokuapp.com";
//const DEV_URL = 'http://localhost:1337';
const DEV_URL = "https://867b300b.ngrok.io";

const api = axios.create({
  baseURL: (process.env.NODE_ENV === "development" ? DEV_URL : PROD_URL).concat(
    "/api"
  ),
  headers: {
    "Content-Type": "application/json"
  }
});

module.exports = { api };
