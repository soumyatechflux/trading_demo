import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend } from 'chart.js';
import './ticker.css';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const Ticker = () => {
  // Initial mock data for the chart
  const initialLabels = ['10:00', '10:01', '10:02', '10:03', '10:04'];
  const initialData = [30000, 40500, 21000, 30800, 50900];

  const [chartData, setChartData] = useState({
    labels: initialLabels,
    datasets: [
      {
        label: 'BTCUSDT Price',
        data: initialData,
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderWidth: 1,
        fill: false,
        lineTension: 0.1,
      }
    ],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTicker = async () => {
    try {
      const response = await axios.get('https://api.binance.com/api/v3/ticker/24hr');
      if (response.data && Array.isArray(response.data)) {
        const btcData = response.data.find(item => item.symbol === 'BTCUSDT');
        console.log("btcData => ", btcData);
        // if (btcData) {
        //   const time = new Date().toLocaleTimeString();
        //   setChartData(prevData => {
        //     const updatedLabels = [...prevData.labels, time];
        //     const updatedData = [...(prevData.datasets[0]?.data || []), parseFloat(btcData.lastPrice)];
        //     console.log("updatedData => ",updatedData); 
        //     return {
        //       labels: updatedLabels,
        //       datasets: [
        //         {
        //           label: 'BTCUSDT Price',
        //           data: updatedData,
        //           borderColor: 'rgba(75,192,192,1)',
        //           backgroundColor: 'rgba(75,192,192,0.2)',
        //           borderWidth: 1,
        //           fill: false,
        //           lineTension: 0.1,
        //         }
        //       ]
        //     };
        //   });
        // } else {
        //   throw new Error('BTCUSDT data not found');
        // }
      } else {
        throw new Error('Unexpected data format');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTicker();
    const intervalId = setInterval(fetchTicker, 2000); // fetch data every 2 seconds
    return () => clearInterval(intervalId);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Binance Ticker - BTCUSDT</h2>
      <div className="chart-container">
        <Line data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
      </div>
    </div>
  );
};

export default Ticker;
