import React from 'react';

import LeftSidebar from './../LeftSidebar/LeftSidebar';
import Products from './Products/Products';
import './Home.css';

const Home = () => {
    return (
        <div className='col-md-12 d-flex justify-content-between m-t-20'>
            <div className='col-md-3'>
                <LeftSidebar />
            </div>
            <div className='col-md-8'>
                <Products />
            </div>
        </div>
    );
};

export default Home;