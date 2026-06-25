import axios from 'axios';

// @ts-ignore
export const API_URL = import.meta.env.VITE_SERVER_URL || 'http://localhost:3000/api';

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

