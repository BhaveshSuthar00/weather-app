import { Box, Image, Text } from '@chakra-ui/react';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { v4 as uuid } from 'uuid';
import moment from 'moment';
import { SetCurrentDate } from '../../redux/WeatherData';
const Forcast = () => {
    const { data, currentData } = useSelector((store)=> store.weatherData);
    const dispatch = useDispatch();
    console.log(data)
    if(!data.list2) return;
    return (
    <>
        <Box display={'flex'} margin={2} p={1}>
            {
                data.list2 && data.list2.map((item, index)=> 
                (
                    <Box key={uuid()} display='flex' flexDir={'column'} textAlign='center' justifyContent={'space-evenly'} m={1} 
                    boxShadow='lg' 
                    p={1}
                    fontSize={'12'}
                    borderRadius={'2%'}
                    border={currentData === index ? '2px solid skyblue' : '1px solid none'}
                    onClick={()=> dispatch(SetCurrentDate(index))}
                    >
                        <Text as={'strong'}>
                            {moment(item[0].dt_txt.split(' ')[0]).format('ddd')}
                        </Text>
                        <Text>
                            <Text as={'strong'}> {Math.round(item[0].main.temp_min)} &#8451; </Text>
                            &nbsp;
                            <Text as={'span'}> {Math.round(item[Math.floor(item.length / 2)].main.temp_max)} &#8451; </Text>
                        </Text>
                        <Image src={`https://openweathermap.org/img/wn/${item[0].weather[0].icon}@2x.png`} />
                        <Text>
                            {item[0].weather[0].main}
                        </Text>
                    </Box>
                ))
            }
        </Box>
    </>
  )
}
export default Forcast;