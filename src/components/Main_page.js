import React, {useState} from 'react'
import './main_page.css'
import ApiApexChart from './ApiApexChart'
import OrderBook from './OrderBook';
import Trade from './Trade';
import TradeHistory from './TradeHistory';

const Main_page = () => {
    
    const [selectedSymbol, setSelectedSymbol] = useState('BTCUSDT');

  return (
    <div>
      <div className='main'>
        <header>
            <h1>Binance Demo Trading App</h1>
        </header>
        <div className='row container'>
            <div className='clo-8 right_graph'>
                <div className='api_chart'>
                    <ApiApexChart />
                </div>
                <div className='history_table'>
                    <TradeHistory symbol={selectedSymbol} />
                </div>
                <div className='trade_form'>
                    <Trade symbol={selectedSymbol} />
                </div>
                
            </div>
            <div className='clo-4 left_table'>
                <div className='chart_table'>
                    <OrderBook symbol={selectedSymbol} />
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Main_page
