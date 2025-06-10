// ✅ 2. client/src/api/baseURL.js
import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
});
export { BASE_API_URL }; 
export default API;