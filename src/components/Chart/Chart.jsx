import React, { useEffect, useState } from 'react';
import { fetchDailyData } from '../../api';
import { Line, Bar } from 'react-chartjs-2';
import moment from 'moment';
import styles from './Chart.module.css';

const Chart = ({ data: { confirmed, deaths, recovered }, country }) => {
  const [dailyData, setDailyData] = useState([])

  useEffect(() => {
    const fetchAPI = async () => {
      setDailyData(await fetchDailyData());
    }

    fetchAPI();
  }, []);

  const lineChart = (
    dailyData.length ? (
      <Line 
        data={{
          labels: dailyData.map(({ date }) => moment(date).format('MMM Do')),
          datasets: [{
            data: dailyData.map(({ confirmed }) => confirmed),
            label: 'Infected',
            borderColor: '#3333ff',
            fill: true,
          }, {
            data: dailyData.map(({ deaths }) => deaths),
            label: 'Deaths',
            borderColor: 'red',
            backgroundColor: 'rgba(255, 0, 0, 0.5)',
            fill: true,
          }]
        }}
        options={{
          responsive: true,
          scales: {
            yAxes: [{
              ticks: {
                callback(value) {
                  return Number(value).toLocaleString('en')
                }
              }
            }]
          }
        }}
      />
    ) : null
  );

  const barChart = (
    confirmed ? (
      <Bar 
        data={{
          labels: ['Infected', 'Recovered', 'Deaths'],
          datasets: [{
            label: 'People',
            backgroundColor: [
              'rgba(0, 0, 255, 0.5)',
              'rgba(0, 255, 0, 0.5)',
              'rgba(255, 0, 0, 0.5)'
            ],
            data:[confirmed.value, recovered.value, deaths.value]
          }]
        }}
        options={{
          legend: { display: false },
          title: { display: true, text: `Current state in ${country}`},
          scales: {
            yAxes: [{
              ticks: {
                callback(value) {
                  return Number(value).toLocaleString('en')
                }
              }
            }]
          },
          tooltips: { 
            mode: 'label', 
            label: 'barLabel', 
            callbacks: { 
                label: function(tooltipItem, data) { 
                    return tooltipItem.yLabel.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); 
                }, 
            }, 
          }, 
        }}
      />
    ) : null
  );

  return (
    <div className={styles.container}>
      {country ? barChart : lineChart}
    </div>
  )
}

export default Chart;