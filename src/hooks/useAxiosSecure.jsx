import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API,
});

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    const requestInterceptor = axiosSecure.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("token");

        if (!token) {
          console.warn("Missing access token in request. Redirecting to login.");
          navigate("/login");
          return Promise.reject(new Error("Missing access token"));
        }

        config.headers.Authorization = `Bearer ${token}`;
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    const responseInterceptor = axiosSecure.interceptors.response.use(
      (response) => response,
      async (error) => {
        const status = error?.response?.status;
        console.log(status)

        if (status === 401 || status === 403) {
          console.error("Unauthorized or Forbidden response:", error);
          await logout();
          navigate("/login");
          return Promise.reject(new Error("Unauthorized or Forbidden"));
        }

        console.error("API request error:", error);
        return Promise.reject(error);
      }
    );

    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, [navigate, logout]);

  return axiosSecure;
};

export default useAxiosSecure;