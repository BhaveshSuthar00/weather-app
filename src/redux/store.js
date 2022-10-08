import { combineReducers, configureStore } from "@reduxjs/toolkit";
import WeatherData from "./WeatherData";

const reducer = combineReducers({
    weatherData : WeatherData
})

const store = configureStore({reducer});

export default store;