import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `https://study-zone-delta.vercel.app/`,
});

const useAxios = () => {
  return axiosInstance;
};

export default useAxios;
