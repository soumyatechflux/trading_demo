// import React, { useState, useEffect } from "react";
// import ReactApexChart from "react-apexcharts";
// import axios from 'axios';

// const ApiApexChart = () => {
//   const [series, setSeries] = useState([{ data: [] }]);
//   const [options, setOptions] = useState({
//     chart: {
//       type: "candlestick",
//       height: 350,
//     },
//     title: {
//       text: "CandleStick Chart",
//       align: "left",
//     },
//     xaxis: {
//       type: "datetime",
//     },
//     yaxis: {
//       tooltip: {
//         enabled: true,
//       },
//     },
//   });

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('https://api.binance.com/api/v3/ticker/24hr', {
        
//             params: {
//             symbol: 'BTCUSDT' // Replace with the symbol of the company you want to track
//           }
//         });
        
//         const data = response.data;
//         console.log("data => " ,data);
//         const seriesData = [
//           {
//             x: new Date(data.closeTime),
//             y: [parseFloat(data.openPrice), parseFloat(data.highPrice), parseFloat(data.lowPrice), parseFloat(data.lastPrice)]
//           }
//         ];
        
//         setSeries([{ data: seriesData }]);
//       } catch (error) {
//         console.error('Error fetching data from Binance API:', error);
//       }
//     };

//     fetchData();
//     const interval = setInterval(fetchData, 20000); // Update data every minute

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div>
//       <div id="chart">
//         <ReactApexChart
//           options={options}
//           series={series}
//           type="candlestick"
//           height={350}
//         />
//       </div>
//       <div id="html-dist"></div>
//     </div>
//   );
// };

// export default ApiApexChart;





import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import axios from 'axios';

const ApiApexChart = () => {
  const [series, setSeries] = useState([{ data: [] }]);
  const [options, setOptions] = useState({
    chart: {
      type: "candlestick",
      height: 600, // Increase chart height
      width: 800,
    },
    xaxis: {
      type: "datetime",
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
      labels: {
        formatter: function (value) {
          return value.toFixed(2);
        }
      },
      min: undefined,
      max: undefined,
      tickAmount: 10, // Increase the number of ticks on the y-axis for better scaling
    },
    plotOptions: {
      candlestick: {
        colors: {
          upward: '#00FF00', // green for upward candles
          downward: '#FF0000' // red for downward candles
        },
        wick: {
          useFillColor: true, // Ensure the wick color matches the candle body color
        },
      }
    },
  });

  const calculateYRange = (data) => {
    const prices = data.flatMap(d => d.y);
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    const padding = (max - min) * 0.1; // Add 10% padding to the y-axis range
    return { min: min - padding, max: max + padding };
  };

  useEffect(() => {
    const fetchHistoricalData = async () => {
      try {
        const response = await axios.get('https://api.binance.com/api/v3/klines', {
          params: {
            symbol: 'BTCUSDT', // Replace with the symbol of the asset you want to track
            interval: '1m', // 1 minute interval
            limit: 100 // Fetch last 100 data points
          }
        });

        const historicalData = response.data.map(d => ({
          x: new Date(d[0]),
          y: [parseFloat(d[1]), parseFloat(d[2]), parseFloat(d[3]), parseFloat(d[4])]
        }));

        setSeries([{ data: historicalData }]);
        const { min, max } = calculateYRange(historicalData);
        setOptions(prevOptions => ({
          ...prevOptions,
          yaxis: {
            ...prevOptions.yaxis,
            min,
            max
          }
        }));
      } catch (error) {
        console.error('Error fetching historical data from Binance API:', error);
      }
    };

    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.binance.com/api/v3/ticker/24hr', {
          params: {
            symbol: 'BTCUSDT'
          }
        });

        const data = response.data;

        const latestData = {
          x: new Date(data.closeTime),
          y: [parseFloat(data.openPrice), parseFloat(data.highPrice), parseFloat(data.lowPrice), parseFloat(data.lastPrice)]
        };

        setSeries(prevSeries => {
          const updatedData = [...prevSeries[0].data, latestData].slice(-100);
          const { min, max } = calculateYRange(updatedData);
          setOptions(prevOptions => ({
            ...prevOptions,
            yaxis: {
              ...prevOptions.yaxis,
              min,
              max
            }
          }));
          return [{ data: updatedData }];
        });
      } catch (error) {
        console.error('Error fetching data from Binance API:', error);
      }
    };

    fetchHistoricalData();
    const interval = setInterval(fetchData, 1000); // Update data every 1 second

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div id="chart">
        <ReactApexChart
          options={options}
          series={series}
          type="candlestick"
          height={350} // Increase chart height
          width={800}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default ApiApexChart;
