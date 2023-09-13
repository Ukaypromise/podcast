export const API_URL =
  process.env.NODE_ENV === "test"
    ? "https://podcast-backend-1.herokuapp.com/api"
    : import.meta.env.VITE_API_URL;
