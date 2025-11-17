import axios from "axios";


const BASE_URL = process.env.REACT_APP_API_URL;
console.log("Backend API:", BASE_URL);

const TOKEN = JSON.parse(JSON.parse(localStorage.getItem("persist:root"))?.auth || "{}")?.currentUser?.accessToken;

console.log(TOKEN)
export const  publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN}` },
});
