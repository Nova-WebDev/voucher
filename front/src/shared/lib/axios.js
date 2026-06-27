import axios from "axios";

const origin = window.location.origin;

const api = axios.create({
  baseURL: `${origin}/api`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json"
  }
});

export default api;
