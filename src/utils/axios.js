import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080",
});

// 🔐 Automatically attach token for protected routes
api.interceptors.request.use((config) => {
    const user = JSON.parse(localStorage.getItem("loggedUser"));

    if (user?.token) {
        config.headers.Authorization = `Bearer ${user.token}`;
    }

    return config;
}, (error) => {
    return Promise.reject(error);
});

// OPTIONAL → If token expired, logout automatically
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem("loggedUser");
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export default api;
