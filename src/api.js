import axios from "axios";

const api = axios.create({
  baseURL: "https://estacionamentoapi.azurewebsites.net",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const t = token.startsWith("{") ? JSON.parse(token) : token;
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${t}`;
      }
    } catch {
      // intencionalmente ignorar erros ao ler o token
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
