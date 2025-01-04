import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://backendtokomesin.grhapengharapan.org/api/",
  withCredentials: true,
});

axiosClient.interceptors.request.use((config) => {
  console.log(
    `Sending ${config.method.toUpperCase()} request to ${config.url}`
  );
  const token = localStorage.getItem("ACCESS_TOKEN");
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { response } = error;
    if (response.status === 401) {
      localStorage.removeItem("ACCESS_TOKEN");
    } else if (response.status === 405) {
      console.error(
        "Method Not Allowed. Check if you're using the correct HTTP method."
      );
    }

    throw error;
  }
);

export default axiosClient;
