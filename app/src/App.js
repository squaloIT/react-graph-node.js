import React, { Suspense } from 'react';
import './App.css';

function App() {
  return (
    <React.StrictMode>
      <div className="App">
        <div className="">
          <Header />
        </div>
        <Suspense>
          <div className='container'>
            <div className='row'>
              <div className='col-md-3'></div>
              <div className='col-md-9'></div>
            </div>
          </div>
        </Suspense>
      </div>
    </React.StrictMode>
  );
}

export default App;
