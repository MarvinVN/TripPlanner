import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8000"
});

api.interceptors.request.use(async (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const signup = async (email, password) => {
    const response = await api.post("/auth/signup", { email, password });
    if (response.data.access_token) {
        localStorage.setItem("access_token", response.data.access_token);
    }
    return response.data;
};

export const login = async (email, password) => {
    const response = await api.post("/auth/login", { email, password });
    if (response.data.access_token) {
        localStorage.setItem("access_token", response.data.access_token);
    }
    return response.data;
};

export default api;