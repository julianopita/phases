const axiosInstance = axios.create({
  //baseURL: 'http://ec2-23-23-28-142.compute-1.amazonaws.com:8060',
  baseURL: 'http://plat-nomads.ddns.net:8060',
  timeout: 5000,
});

export default axiosInstance;