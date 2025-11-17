
import { store } from "./redux/store";
import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";

const getToken = () => {
  try {
    const authData = localStorage.getItem("persist:auth");
    if (!authData) return null;
    const parsed = JSON.parse(authData);
    const userString = parsed.currentUser;
    if (!userString) return null;
    const user = JSON.parse(userString);
    const token = user?.accessToken;
    return token && token !== "null" && token !== "undefined" ? token : null;
  } catch (err) {
    console.error("❌ Greška pri čitanju tokena:", err);
    return null;
  }
};

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
});

userRequest.interceptors.request.use(
  (config) => {
    const state = store.getState();
    
    const reduxToken = state.auth?.currentUser?.accessToken;
    const localToken = getToken();
    const token = reduxToken || localToken;

    console.log("🟢 Token koji se koristi u interceptoru:", token);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      delete config.headers.Authorization;
    }

    return config;
  },
  (error) => Promise.reject(error)
);
