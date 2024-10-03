import axios from "axios";

const api = axios.create({
  // baseURL: "http://localhost:5005/api", // URL cơ sở cho các yêu cầu
  baseURL: "https://ipays.vn/api", // URL cơ sở cho các yêu cầu
});

// Thêm request interceptor để ghi lại thời gian bắt đầu
api.interceptors.request.use(
  (config) => {
    config.metadata = { startTime: new Date() }; // Ghi lại thời gian bắt đầu
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Thêm response interceptor để ghi lại thời gian kết thúc và tính toán thời gian xử lý
api.interceptors.response.use(
  (response) => {
    const endTime = new Date();
    const duration = endTime - response.config.metadata.startTime; // Tính thời gian xử lý
    console.log(`Request to ${response.config.url} took ${duration} ms`);
    return response;
  },
  (error) => {
    const endTime = new Date();
    const duration = endTime - error.config.metadata.startTime; // Tính thời gian xử lý
    console.error(`Request to ${error.config.url} fails took ${duration} ms`);
    return Promise.reject(error);
  }
);

export default api;
