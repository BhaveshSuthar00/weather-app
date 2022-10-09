import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_key } from "../constants/constants";
const slice = createSlice({
    name : 'weatherData',
    initialState : {
        data :  {},
        location : '',
        current : {},
        currentData : 0,
        searchField : []
    },
    reducers : {
        GetAllData : (state, action) => {
            console.log(action.payload, ' this hs the action')
            state.data = {...action.payload};
        },
        SetCurrentData : (state, action) => { 
            state.currentData = action.payload;
         },
        SetLocation : (state, action) => {
            if(action.payload === state.location) return;
            state.location = action.payload;
        },
        setsearchField : (state, action) => {
            state.searchField = action.payload;
        }
    }
})
const {
    GetAllData,
    SetCurrentData,
    setsearchField,
    SetLocation
} = slice.actions;
export const filterArr = (list) => {
    let arr = [];
    let current = list[0].dt_txt.split(' ')[1];
    let arrIndex = 0;
    let dateArr = [];
    for(let i = 0; i< list.length ; i++) {
        let dt = list[i].dt_txt.split(' ')[0];
        if(!dateArr.includes(dt)) dateArr.push(dt);
    }
    for(let i = 0; i < dateArr.length; i++){
        
        let list2 = list.filter((item) => {
            if(item.dt_txt.split(' ')[0] === dateArr[i]) return item;
        })
        arr.push(list2);
    }
    return arr;
}
export const getData = (lon, lat) => async dispatch => {
    try {
        let weatherData = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${'f324a4e7b9ae7a804143957d831228a8'}`);
        let finalList = filterArr(weatherData.data.list);
        let obj = {
            ...weatherData.data,
            list : finalList,
        }
        console.log(obj, finalList);
        dispatch(GetAllData({...obj}));
    }
    catch (err) {
        console.log(err);
    }
}
export const weatherList = async (lon, lat) => {
    try {
        const weatherFor = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${'e4c70ce6a6821649a416cb9521d5f4f8'}`);
        const {
            main, 
            coord,
            weather
        } = weatherFor.data;
        return {...main, weather : weather[0], ...coord};
        
    }
    catch(err) {
        console.log(err);
    }
}
export const searchWeather = (location) => async dispatch => {
    try {
        if(location.length <= 1) {
            dispatch(setsearchField([]));
            return;
        }
        // const searchIs = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${location},IN&limit=20&appid=${'e4c70ce6a6821649a416cb9521d5f4f8'}`);
        const searchIs = await axios.get(`https://wft-geo-db.p.rapidapi.com/v1/geo/adminDivisions?namePrefix=${location}&countryIds=IN`, {
            headers: {
            'X-RapidAPI-Key': '8254b17ab3mshe3b03b86ad965a9p19ae9djsnb8a099704108',
            'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
            }
        });
        if(searchIs.data.data && searchIs.data.data.length <= 0) {
            dispatch(setsearchField([]));
            return;
        } 
        let list = [];
        await Promise.all(
            searchIs.data.data.map(async ({latitude, longitude}, index) => {
                const response = await weatherList(longitude, latitude);
                list.push({...response, searchIs : searchIs.data.data[index]});
            })
        )
        dispatch(setsearchField(list));
    }
    catch (err) {
        console.log(err);
    }
}
export default slice.reducer