import axios from "axios";

const TIMEOUT = 10000;
let headers = {};

const apiClient = axios.create({
  baseURL: "https://ik-react-task.herokuapp.com/",
  timeout: TIMEOUT,
  headers
});

apiClient.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
