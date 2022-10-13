import { Box } from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SearchField } from "./components/search/SearchField";
import { Chart } from "./components/Weather/Chart";
import Forcast from "./components/Weather/Forcast";
import { reverseGeo } from "./redux/WeatherData";
import React from "react";
import { ApexChart } from "./components/Weather/ApexChart";
function App() {
  const dispatch = useDispatch();
  const { data } = useSelector((store) => store.weatherData);
  const getCoords = async () => {
    const pos = await new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition((position) => {
      return resolve(position)
    }, reject);
    });
    console.log(pos)
    dispatch(reverseGeo(pos.coords.longitude,pos.coords.latitude));
  };

  useEffect(()=>{ 
    getCoords();
  }, [])
  return (
    <>
      <Box 
      w="60%" 
      justifyContent={'center'} display={'flex'} flexDir='column'  margin={'auto'} boxShadow={data.list ? '2xl' : null}
      rounded='md' bg='white' p={5}
      >
        <SearchField />
        <Forcast />
        <ApexChart />
      </Box>

    </>
  );
  
}

export default App;
