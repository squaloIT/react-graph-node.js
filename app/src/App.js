import { Router } from "@reach/router";
import React, { Suspense } from 'react';
import './App.css';
import Header from './components/Header/Header';
import ProtectedRoute from './components/hoc/ProtectedRoute';
import Home from './components/Home/Home';
import Login from './components/Login/Login';


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
              <Login path="/" exact />
              <ProtectedRoute path='/home' component={Home} />
            </Router>
          </div>
        </Suspense>
      </React.StrictMode>
    </div>
  );
}

export default App;
