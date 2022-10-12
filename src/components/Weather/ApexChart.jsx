import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import Chart from "react-apexcharts";
import { Line } from 'react-chartjs-2';
import { Box, Text } from '@chakra-ui/react';
import moment from 'moment';

export const ApexChart = () => {
    const { data, currentData } = useSelector((store) => store.weatherData);
    const [toggle, setToggle] = useState(false);
      const [data23, setData] = useState({
            options: {
                chart: {
                  id: "basic-bar"
                },
                xaxis: {
                  categories: []
                }
              },
            series: [
                {
                    name: "series-1",
                    type : "line",
                    data: []
                }
            ],
            tooltip : {
                enable : false
            }
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
        if(!data.list2) {
            setToggle(false);
            return;
        };
        let dataList = [];
        data.list2[currentData].map(({main}) => {
            let cra = Math.ceil(main.temp);
            dataList.push(cra);
        })
        setData({
            ...data23,
            options : {...data23.options, xaxis : {
                categories : data.list2[currentData].map(({dt_txt}) => {
                    return tConvert(dt_txt.split(' ')[1]);
                })
            }},
            series : [
                {
                    name : "temperature",
                    data : dataList,                    
                    type : "line",
                }
            ]
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
                {/* <Line options={options(data23.datasets[0].data[Math.ceil(data23.datasets[0].data.length/2)])} data={data23} /> */}
                <Chart {...data23}
                    
                />
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
        </>
    )
}
