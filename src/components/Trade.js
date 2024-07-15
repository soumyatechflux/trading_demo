// import React, { useState } from 'react';
// import axios from 'axios';
// import './trade.css'

// const Trade = ({ symbol }) => {
//   const [order, setOrder] = useState({
//     symbol,
//     side: 'BUY',
//     type: 'MARKET',
//     quantity: 0,
//   });

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setOrder((prevOrder) => ({ ...prevOrder, [name]: value }));
//   };

//   const placeOrder = async () => {
//     try {
//       const response = await axios.post('https://api.binance.com/api/v3/order', order, {
//         headers: {
//           'X-MBX-APIKEY': 'YOUR_API_KEY',
//         },
//       });
//       console.log('Order placed:', response.data);
//     } catch (error) {
//       console.error('Error placing order:', error);
//     }
//   };

//   return (
//     <div>
//       <div className='trade_header'>Trade {symbol}</div>
//       <form>
//         <label className='side_label'>
//           Side:
//           <select name="side" value={order.side} className='side_option' onChange={handleInputChange}>
//             <option value="BUY">BUY</option>
//             <option value="SELL">SELL</option>
//           </select>
//         </label>
//         <label >
//           Quantity:
//           <input type="number" name="quantity" className='quantity_label' value={order.quantity} onChange={handleInputChange} />
//         </label>
//         <button type="button" className='order_btn' onClick={placeOrder}>Place Order</button>
//       </form>
//     </div>
//   );
// };

// export default Trade;




import React, { useState, useEffect } from 'react';
import './trade.css';

const Trade = ({ symbol }) => {
  const [order, setOrder] = useState({
    symbol,
    side: 'BUY',
    type: 'MARKET',
    quantity: 0,
  });
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchTradeHistory();
  }, [symbol]);

  const fetchTradeHistory = () => {
    // Simulate fetching trade history
    const simulatedHistory = [
      { price: '30000', qty: '0.5', time: Date.now() - 10000 ,status:'BUY'},
      { price: '29950', qty: '1', time: Date.now() - 20000,status:'SELL' },
      { price: '29800', qty: '0.2', time: Date.now() - 30000 ,status:'BUY'},
    ];
    setHistory(simulatedHistory);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setOrder((prevOrder) => ({ ...prevOrder, [name]: value }));
  };

  const placeOrder = () => {
    // Simulate placing an order
    const newTrade = {
      price: (Math.random() * 1000 + 29000).toFixed(2), // Simulated price
      qty: order.quantity,
      time: Date.now(),
      status:order.side,
    };
    setHistory((prevHistory) => [newTrade, ...prevHistory]);
    console.log('Order placed:', newTrade);
  };

  return (
    <div>
      <div className='trade_header'>Trade {symbol}</div>
      <form>
        <label className='side_label'>
          Side:
          <select name="side" value={order.side} className='side_option' onChange={handleInputChange}>
            <option value="BUY">BUY</option>
            <option value="SELL">SELL</option>
          </select>
        </label>
        <label>
          Quantity:
          <input type="number" name="quantity" className='quantity_label' value={order.quantity} onChange={handleInputChange} />
        </label>
        <button type="button" className='order_btn' onClick={placeOrder}>Place Order</button>
      </form>

      <div className='trade_history'>
        <div className='trade_header'>My Order History for {symbol}</div>
        <table>
          <thead>
            <tr>
              <th>Price</th>
              <th>Quantity</th>
              <th>Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {history.map((trade, index) => (
              <tr key={index}>
                <td>{trade.price}</td>
                <td>{trade.qty}</td>
                <td>{new Date(trade.time).toLocaleTimeString()}</td>
                <td>{trade.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Trade;
