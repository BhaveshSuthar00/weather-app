import axios from "axios";
const api = axios.create({
    baseUrl : 'http://localhost:3001'
})
const API_key = 'f324a4e7b9ae7a804143957d831228a8';
export {
    api,
    API_key,
}