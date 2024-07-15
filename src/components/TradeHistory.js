import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TradeHistory = ({ symbol }) => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchTradeHistory = async () => {
      try {
        const response = await axios.get(`https://api.binance.com/api/v3/trades?symbol=${symbol}&limit=10`);
        setHistory(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTradeHistory();
  }, [symbol]);

  return (
    <div>
      <div className='trade_header'>Trade History for {symbol}</div>
      <table>
        <thead>
          <tr>
            <th>Price</th>
            <th>Quantity</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {history.map((trade, index) => (
            <tr key={index}>
              <td>{trade.price}</td>
              <td>{trade.qty}</td>
              <td>{new Date(trade.time).toLocaleTimeString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TradeHistory;
