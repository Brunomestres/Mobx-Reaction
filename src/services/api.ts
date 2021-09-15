import axios from 'axios';
const API_KEY = 'e4754b23001f38ed6b6b09be083d1dd8';


const api = axios.create({
    baseURL: `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=pt-BR&query=`
});


export default api;
