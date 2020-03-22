import React, { Suspense } from 'react';
import './App.css';

import Header from './components/Header/Header';

function App() {
  return (
    <div className="App">
      <div className="">
        <Header />
      </div>
      <React.StrictMode>
        <Suspense>
          <div className='container'>
            <div className='row'>
              <div className='col-md-3'></div>
              <div className='col-md-9'></div>
            </div>
          </div>
        </Suspense>
      </React.StrictMode>
    </div>
  );
}

export default App;
