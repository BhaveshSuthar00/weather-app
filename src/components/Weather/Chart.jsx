import React from 'react'
import { Bar } from 'react-chartjs-2';
import { useSelector } from 'react-redux';

export const Chart = () => {
    const { data, currentData } = useSelector((store) => store.weatherData);
    if(!data.list) return;
  return (
    <>
        {/* <Bar
        // options={...}
        data={data.list[currentData]}
        // {...props}
        /> */}

    </>
  )
}
