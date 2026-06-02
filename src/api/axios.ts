import axios from "axios";
import { API_BASE_URL } from "../utils/api";
import { showAlert } from "./alertService";

type ErrorRespose = {
  field: string;
  message: string;
};

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       localStorage.removeItem("token");
//       window.location.href = "/login";
//     }
//     return Promise.reject(error);
//   },
// );

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const errorData: ErrorRespose[] | undefined = error.response?.data.detail;
    if (errorData)
      errorData?.forEach((errMsg) => {
        showAlert("error", errMsg.message);
      });
    else showAlert("error", "Unknown error occured");
    return Promise.reject(error);
  },
);

export default axiosInstance;
