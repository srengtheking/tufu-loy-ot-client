import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8089/api";

const api = axios.create({
    baseURL,
    headers: {
        "Content-Type": "application/json",
    },
});

export function getErrorMessage(error, fallback = "Something went wrong. Please try again.") {
    if (axios.isAxiosError(error)) {
        const data = error.response?.data;
        return data?.message || data?.error || error.message || fallback;
    }
    if (error instanceof Error) return error.message;
    return fallback;
}

export default api;
