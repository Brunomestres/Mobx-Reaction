import axios from 'axios';
export const API_KEY = 'e4754b23001f38ed6b6b09be083d1dd8';

export const api = axios.create({
    baseURL: `https://api.themoviedb.org/3`
});

