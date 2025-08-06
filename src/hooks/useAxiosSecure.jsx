import axios from "axios";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
  baseURL: "http://localhost:5000/",
});

// https://study-zone-delta.vercel.app
// http://localhost:5000/

// https://study-hub-server-two.vercel.app

let isInterceptorSet = false;

const useAxiosSecure = () => {
  const { user } = useAuth();

  if (user?.accessToken && !isInterceptorSet) {
    axiosSecure.interceptors.request.use(
      (config) => {
        config.headers.Authorization = `Bearer ${user.accessToken}`;
        return config;
      },
      (error) => Promise.reject(error)
    );
    isInterceptorSet = true;
  }

  return axiosSecure;
};

export default useAxiosSecure;
