import axios from "axios";
const api = axios.create({
    baseUrl : 'http://localhost:3001'
})
const API_key = 'f324a4e7b9ae7a804143957d831228a8';
const lon = 6.4531;
const lat = 3.3958;
export {
    api,
    API_key,
    lon,
    lat
}