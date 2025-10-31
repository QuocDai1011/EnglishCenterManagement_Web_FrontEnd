import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://localhost:7069/api", // hoặc import từ .env
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: interceptors (thêm token, xử lý lỗi, v.v.)
axiosClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error("API error:", error);
    throw error;
  }
);

export default axiosClient;
