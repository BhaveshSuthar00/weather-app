import { Box, Image, Text } from '@chakra-ui/react';
import React from 'react'
import { useSelector } from 'react-redux'
import { v4 as uuid } from 'uuid';
import moment from 'moment';
const Forcast = () => {
    const { data } = useSelector((store)=> store.weatherData);
    if(!data.list) return;
    return (
    <>
        <Box display={'flex'} margin={2} p={1}>
            {
                data.list && data.list.map((item)=> 
                (
                    <Box key={uuid()} display='flex' flexDir={'column'} textAlign='center' justifyContent={'center'} m={1} boxShadow='lg' p={2}>
                        <Text>
                            {moment(item[0].dt_txt.split(' ')[0]).format('ddd')}
                        </Text>
                        <Text>
                            <Text as={'span'}> {Math.round(item[0].main.temp_min)} &#8451; </Text>
                            &nbsp;
                            <Text as={'span'}> {Math.round(item[Math.ceil(item.length / 2)].main.temp_max)} &#8451; </Text>
                        </Text>
                        <Image src={`https://openweathermap.org/img/wn/${item[0].weather[0].icon}@4x.png`} />
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