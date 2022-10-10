import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Box, Text } from '@chakra-ui/react';
import moment from 'moment';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Filler,
    Title,
    Legend
);

export const options = (currentTemp) => {
    return {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: false,
            text: `${currentTemp} deg`,
          },
        },
    }
};
export const Chart = () => {
    const { data, currentData } = useSelector((store) => store.weatherData);
    const [toggle, setToggle] = useState(false);
      const [data23, setData] = useState({
          labels : [],
          datasets: [
                {
                    label: 'Temperature',
                    data: [],
                    fill: true,
                    borderColor: 'rgb(53, 162, 235)',
                    backgroundColor: 'rgba(53, 162, 235, 0.5)',
                }
            ]
      });
      function tConvert (time) {
        time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
        if (time.length > 1) { 
          time = time.slice(1);  
          time[5] = +time[0] < 12 ? 'AM' : 'PM';
          time[0] = +time[0] % 12 || 12; 
        }
        return time[0] + " " +time[5]; // return adjusted time or original string
    }
    useEffect(()=> {
        console.log(moment(1665294104).format('hh:mm a'))
        console.log(moment(1665328801).format('hh:mm a'))
        
        if(!data.list2) {
            setToggle(false);
            return;
        };
        let dataList = [];
        data.list2[currentData].map(({main}) => {
            let cra = Math.ceil(main.temp);
            dataList.push(cra);
        })
        let maxValue = Math.max(...dataList);
        dataList.push(maxValue + 3);
        setData({...data23, 
            labels : data.list2[currentData].map(({dt_txt}) => {
                return tConvert(dt_txt.split(' ')[1]);
            }), 
            datasets : [{
                ...data23.datasets,  
                data : dataList,
                label: 'Temperature', 
                fill: true,
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            }]
        })
        setToggle(true);
        return(()=> {
            setToggle(false);
        })
    }, [data, currentData])
    if(!toggle) return;
    return (
        <>
            <Box m={4}>
                <Line options={options(data23.datasets[0].data[Math.ceil(data23.datasets[0].data.length/2)])} data={data23} />
            </Box>
            <Box display={'flex'} justifyContent={'center'} w="85%" p={4}  boxShadow='md' m={4}>
                <Box flex={1} textAlign={'center'}>
                    <Text as='strong'>Pressure</Text>
                    <Text>
                        {data.list2[currentData][0].main.pressure} hpa
                    </Text>
                </Box>
                <Box flex={1} textAlign={'center'}>
                    <Text as='strong'>
                            Humidity
                    </Text>
                    <Text>
                        {data.list2[currentData][0].main.humidity} &#37; 
                    </Text>
                </Box>
                <Box>
                </Box>
            </Box>
            {/* <Box display={'flex'} justifyContent={'center'} w="85%" p={4}  boxShadow='md' m={4}>
                <Text as={'strong'} flex={1} textAlign={'left'}>
                    {
                        moment(data.city.sunrise).format('hh:mm a')
                    }
                </Text>
                <Text as={'strong'} flex={1} textAlign={'right'}>
                {moment(data.city.sunset).format('hh:mm a')}
                </Text>
            </Box> */}
        </>
    )
}
