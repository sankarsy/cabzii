// ✅ 2. client/src/api/baseURL.js
import axios from 'axios';

const BASE_API_URL = process.env.REACT_APP_API_URL;

const API = axios.create({
  baseURL: BASE_API_URL,
  withCredentials: true,
});

export { BASE_API_URL };
export default API;
