const axiosInstance = axios.create({
  baseURL: 'http://plat-nomads.ddns.net:8060',
  timeout: 5000,
});

export default axiosInstance;