import React from 'react';
import './LeftSidebar.css';
import ShoppingCartList from './ShoppingCartList/ShoppingCartList';


const LeftSidebar = () => {
    return (
        <div className='col-md-12'>
            <h2>Your Cart</h2>
            <ShoppingCartList />
        </div>
    );
};

export default LeftSidebar;