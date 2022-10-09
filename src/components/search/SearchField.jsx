import { Box, Image, Input, InputGroup, InputLeftAddon, InputLeftElement, InputRightElement, Text } from '@chakra-ui/react';
import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getData, searchWeather } from '../../redux/WeatherData';
import { v4 as uuid } from 'uuid';
import { MdLocationOn, MdSearch } from 'react-icons/md'
export const SearchField = () => {
    const interval = useRef();
    const { searchField } = useSelector((store) => store.weatherData);
    const [search, setSearch] = useState('');
    const [toggle, setToggle] = useState(false);
    const dispatch = useDispatch();
    const BoxClick = (lon, lat, searchIs)=> {
        dispatch(getData(lon, lat, searchIs));
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
            <Box  m='auto' margin={2}
                position='relative'
            >
                <Box>
                    <form onSubmit={searchFun}>
                        <InputGroup>
                            <InputLeftElement children={ <MdLocationOn color={'black.800'} fontSize={'21'} />} />
                            <Input type={'text'} placeholder='search' value={search.toLowerCase()} onChange={handleChange}/>
                            <InputRightElement children={ <MdSearch color={'black.800'} fontSize={'21'} />} />
                        </InputGroup>
                    </form>
                </Box>
                <Box
                    position={'absolute'}
                    w={'100%'}
                    zIndex={200}
                    backgroundColor='white'
                >
                    {
                        toggle === false && searchField && searchField.map(({lon, lat, searchIs, weather, temp})=>  {
                            return <Box key={uuid()} display={'flex'} justifyContent={'space-between'} alignItems='center' boxShadow={'md'} cursor={'pointer'} m={2} 
                            borderRadius={'4%'}
                            margin={2}
                            backgroundColor='whiteAlpha.900'
                            onClick={()=> BoxClick(lon, lat, searchIs)}
                            >
                                <Box>
                                    <Text as="strong">
                                        {searchIs.name}, {searchIs.region}
                                    </Text>
                                </Box>
                                <Box display={'flex'} justifyContent='space-between' textAlign={'center'} alignItems='center'>
                                    <Box>
                                    <Text>
                                        <Text as='strong'> { Math.round(temp) } &#8451;</Text> 
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
