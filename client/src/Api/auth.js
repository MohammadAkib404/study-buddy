import axios from 'axios';

axios.defaults.withCredentials = true;

const API = import.meta.env.VITE_BACKEND_URL;

export const register = (data) => axios.post(`${API}/register`, data);
export const login = (data) => axios.post(`${API}/login`, data);