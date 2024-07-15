import React, { useState } from 'react';
import Main_page from './components/Main_page';
// import Ticker from './components/Ticker';
// import ApexChart from './components/ApexChart'
import Trade from './components/Trade';
import TradeHistory from './components/TradeHistory';

const App = () => {
  const [selectedSymbol, setSelectedSymbol] = useState('BTCUSDT');

  return (
    <div>
      
      <main>
        <Main_page />
        {/* <Ticker /> */}
        {/* <ApexChart /> */} 
        {/* <Trade symbol={selectedSymbol} /> */}
        {/* <TradeHistory symbol={selectedSymbol} /> */}
        
        
      </main>
    </div>
  );
};

export default App;
