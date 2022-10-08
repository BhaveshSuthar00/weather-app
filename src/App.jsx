import { Box, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getData } from "./redux/WeatherData";

function App() {
  const dispatch = useDispatch();
  useEffect(()=> {
    if( 'geolocation' in navigator){
      navigator.geolocation.getCurrentPosition(
        function success (position) {
          alert('latitude', position.coords.latitude, 
          'longitude', position.coords.longitude);
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
    dispatch(getData());
  }, [])
  return (
    <>
      <Box>
        <Text>bhavesh suthar</Text>
      </Box>
    </>
  );
}

export default App;
