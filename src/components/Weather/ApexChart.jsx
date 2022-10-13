import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import Chart from "react-apexcharts";
import { Line } from 'react-chartjs-2';
import { Box, Text } from '@chakra-ui/react';
import moment from 'moment';
import SunRise from '../../assets/sun.png'

export const ApexChart = () => {
    const { data, currentData } = useSelector((store) => store.weatherData);
    const [toggle, setToggle] = useState(false);
    const [sunRise, setSunRise] = useState({
        series: [ Math.ceil(new Date().getHours() * 100 / 24)],
        dropShadow: {
            enabled: true,
            top: 30,
            left: 0,
            blur: 300,
            opacity: 0.5
          },
        options : {
        chart: {
            height: 60,
            type: "radialBar"
          },
          colors: ["#20E647"],
          plotOptions: {
            offsetX: 0,
            offsetY: 0,
            radialBar: {
                hollow : {
                    margin: 15,
                    size: "93%",
                },
              startAngle: -90,
              endAngle: 90,
              track: {
                background: 'black',
                startAngle: -90,
                endAngle: 90,
                dropShadow: {
                    enabled: true,
                    top: 5,
                    left: 4,
                    blur: 1,
                    opacity: 0.6
                }
              },
              dataLabels: {
                name: {
                  show: false,
                },
                value: {
                  fontSize: "30px",
                  show: true,
                  offsetY : -23,
                  formatter: function (val) {
                    return moment().format('hh:mm a') 
                  }
                }
              }
            }
          },
          fill: {
            type: "gradient",
            gradient: {
              shade: "dark",
              type: "horizontal",
              gradientToColors: ["#87D4F9"],
              stops: [0, 100]
            }
          },
          stroke: {
            lineCap: "butt"
          },
          labels: ["Progress"]
        }
        });
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
    const convertString = (d) => {
        return new Date(d * 1000).getHours();
      };    
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
        console.log(data.city.sunrise,data.city.sunset, convertString(data.city.sunrise), convertString(data.city.sunset), new Date().getHours() * 100 / 24);
        setToggle(true);
        return(()=> {
            setToggle(false);
        })
    }, [data, currentData])
    if(!toggle) return;
    return (
        <>
            <Box m={4}>
                <Chart {...data23} />
            </Box>
            <Box display={'flex'} justifyContent={'center'} margin={'auto'} w="90%" p={4}  boxShadow='md' >
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
            </Box>
            <Box boxShadow={'2xl'}

             h={ currentData === 0 ? '230px' : '70px' } 
            overflow='hidden'
            m={4}
            position='relative'
            >
                <Box position={'absolute'} fontSize={'21'} left={1} textAlign='center' w={'40%'} zIndex='1000'
                >
                    <Text as={'strong'}>
                        Sunrise
                    </Text>
                    <Text>
                        { convertString(data.city.sunrise) } AM
                    </Text>
                </Box>

                <Box position={'absolute'} fontSize={'21'} right={1} textAlign='center' w={'40%'} zIndex='1000'>
                    <Text as={'strong'}>
                        Sunset
                    </Text>
                    <Text>
                        { moment(convertString(data.city.sunset)).format('h') } PM
                    </Text>
                </Box>
                { currentData === 0 &&
                <Chart options={sunRise.options} dropShadow={sunRise.dropShadow} height={'400'} width={'100%'} series={sunRise.series} type="radialBar"/>
                }

            </Box>
        </>
    )
}
