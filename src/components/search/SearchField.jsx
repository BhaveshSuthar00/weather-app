import { Box, Image, Input, Text } from '@chakra-ui/react';
import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getData, searchWeather } from '../../redux/WeatherData';
import { v4 as uuid } from 'uuid';
export const SearchField = () => {
    const interval = useRef();
    const { searchField } = useSelector((store) => store.weatherData);
    const [search, setSearch] = useState('');
    const [toggle, setToggle] = useState(false);
    const dispatch = useDispatch();
    const BoxClick = (lon, lat, searchIs)=> {
        dispatch(getData(lon, lat));
        setSearch(searchIs.name + ', ' + searchIs.region);
        setToggle(true);
    }
    const handleChange = (event) => {
        if(toggle) setToggle(false);
        const { value } = event.target;
        setSearch(value);
        if(interval.current) clearInterval(interval.current);
        interval.current = setTimeout(()=> {
            dispatch(searchWeather(value));
        }, 1000)
    }
    const searchFun = (event) => {
        event.preventDefault();
    }
    return (
        <>
            <Box w={'90%'} m='auto' mt={3}>
                <Box>
                    <form onSubmit={searchFun}>
                        <Input type={'text'} placeholder='search' value={search.toLowerCase()} onChange={handleChange}/>
                    </form>
                </Box>
                <Box
                    position={'absolute'}
                    w={'full'}
                    zIndex={200}
                    backgroundColor='white'
                >
                    {
                        toggle === false && searchField && searchField.map(({lon, lat, searchIs, weather, temp})=>  {
                            return <Box key={uuid()} display={'flex'} justifyContent={'space-around'} alignItems='center' boxShadow={'md'} cursor={'pointer'} m={2} p={[2,1]} onClick={()=> BoxClick(lon, lat, searchIs)}
                                
                            >
                                <Box>
                                    <Text>
                                        {searchIs.name}, {searchIs.region}
                                    </Text>
                                </Box>
                                <Box display={'flex'} justifyContent='space-between' textAlign={'center'} alignItems='center'>
                                    <Box>
                                    <Text>
                                        <Text as='span'> { Math.round(temp) } </Text> 
                                        <Text as='span'>  &#8451; </Text>
                                    </Text>
                                    <Text>
                                        { weather.main }
                                    </Text>
                                    </Box>
                                    <Box>
                                        <Image src={`https://openweathermap.org/img/wn/${weather.icon}.png`} />
                                    </Box>
                                </Box>
                            </Box>
                        })
                    }
                </Box>
            </Box>
        </>
  )
}
