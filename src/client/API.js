import axios from "axios";

const API_TIMEOUT = 240000;

export default axios.create({
  baseURL: "/api",
  responseType: "json",
  timeout: API_TIMEOUT
});


