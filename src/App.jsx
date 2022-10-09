import { Box, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { SearchField } from "./components/search/SearchField";
import { Chart } from "./components/Weather/Chart";
import Forcast from "./components/Weather/Forcast";
import { getData } from "./redux/WeatherData";

function App() {
  const dispatch = useDispatch();
  useEffect(()=> {
    if( 'geolocation' in navigator){
      navigator.geolocation.getCurrentPosition(
        function success (position) {
          console.log(position);
        },
        function error (error_message){
           // for when getting location results in an error
            console.log('An error has occured while retrieving location', error_message);
        }  
      )
    } else {
      // geolocation is not supported
      // get your location some other way
      // console.log('geolocation is not enabled on this browser');
      console.log('geo location is not supported on this device');
    }
    // dispatch(getData());
  }, [])
  return (
    <>
      <Box>
        <SearchField />
        <Forcast />
        <Chart />
      </Box>
    </>
  );
}

export default App;
