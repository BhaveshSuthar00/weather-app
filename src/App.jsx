import { Box, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SearchField } from "./components/search/SearchField";
import { Chart } from "./components/Weather/Chart";
import Forcast from "./components/Weather/Forcast";
import { getData, reverseGeo } from "./redux/WeatherData";

function App() {
  const dispatch = useDispatch();
  const { data } = useSelector((store) => store.weatherData);
  const allinone = useSelector((store) => store.weatherData);
  console.log(allinone)
  useEffect(()=> {
    if( 'geolocation' in navigator){
      navigator.geolocation.getCurrentPosition(
        function success (position) {
          dispatch(reverseGeo(position.coords.longitude ,position.coords.latitude));
        },
        function error (error_message){
           // for when getting location results in an error
            alert('An error has occured while retrieving location', error_message);
        }  
      )
    } else {
      // geolocation is not supported
      // get your location some other way
      // console.log('geolocation is not enabled on this browser');
      alert('geo location is not supported on this device');
    }
  }, [])
  return (
    <>
      <Box w="60%" justifyContent={'center'} display={'flex'} flexDir='column'  margin={'auto'} boxShadow={data.list ? '2xl' : null}
      rounded='md' bg='white' p={5}
      >
        <SearchField />
        <Forcast />
        <Chart />
      </Box>
    </>
  );
}

export default App;
