import React, { Suspense } from 'react';
import { Router } from "@reach/router";

import Header from './components/Header/Header';
import Login from './components/Login/Login';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="">
        <Header />
      </div>
      <React.StrictMode>
        <Suspense>
          <div className='container-fluid'>
            <Router>
              <Login path="/" />
            </Router>
          </div>
        </Suspense>
      </React.StrictMode>
    </div>
  );
}

export default App;
