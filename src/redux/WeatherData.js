import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_key, lat, lon } from "../constants/constants";

const slice = createSlice({
    name : 'weatherData',
    initialState : {
        data :  {},
        location : '',
        current : {}
    },
    reducers : {
        GetAllData : (state, action) => {
            state.data = action.payload;
        },
        SetLocation : (state, action) => {
            if(action.payload === state.location) return;
            state.location = action.payload;
        }
    }
})
const {
    GetAllData,
    SetLocation
} = slice.actions;

export const getData = () => async dispatch => {
    try {
        // https://api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&appid=f324a4e7b9ae7a804143957d831228a8
        const weatherData = JSON.parse(localStorage.getItem('weather'));
        // const weatherData = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&appid=${API_key}`);
        // localStorage.setItem('weather', JSON.stringify(weatherData.data));
        // console.log(weatherData.data);
        console.log(weatherData)
        // dispatch(GetAllData(weatherData.data));
    }
    catch (err) {
        console.log(err);
    }
}
export default slice.reducer