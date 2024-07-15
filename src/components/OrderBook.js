import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './order_book.css'

const OrderBook = ({ symbol }) => {
  const [orderBook, setOrderBook] = useState({ bids: [], asks: [] });

  useEffect(() => {
    const fetchOrderBook = async () => {
      try {
        const response = await axios.get(`https://api.binance.com/api/v3/depth?symbol=${symbol}&limit=10`);
        setOrderBook(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchOrderBook();
  }, [symbol]);

  return (
    <div>
    <div className='orderbook_table'>
      <div className='order_table_header'>Order Book for {symbol}</div>
      <div>
        <div className='order_table_header'>Bids</div>
        <table className='order_table'>
          <thead >
            <tr>
              <th>Price</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {orderBook.bids.map((bid, index) => (
              <tr key={index}>
                <td>{bid[0]}</td>
                <td>{bid[1]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <div className='order_table_header'>Asks</div>
        <table>
          <thead>
            <tr>
              <th>Price</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {orderBook.asks.map((ask, index) => (
              <tr key={index}>
                <td>{ask[0]}</td>
                <td>{ask[1]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
};

export default OrderBook;
