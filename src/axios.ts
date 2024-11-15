import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL || `http://localhost:3000`,
  headers: {
    "Content-type": "application/json",
  },
});

export default axiosInstance;
