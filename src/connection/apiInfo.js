const axiosInstance = axios.create({
    baseURL: 'http://plat-nomads.ddns.net:8050',
    timeout: 5000,
  });
  
  export default axiosInstance;