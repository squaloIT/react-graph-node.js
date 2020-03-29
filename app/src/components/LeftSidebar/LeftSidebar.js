import React from 'react';
import './LeftSidebar.css';
import ShoppingCartList from './ShoppingCartList/ShoppingCartList';


const LeftSidebar = ({ removeFromCart, userCart }) => {
    return (
        <div className='col-md-12'>
            <h2>Your Cart</h2>
            <ShoppingCartList removeFromCart={removeFromCart} userCart={userCart} />
        </div>
    );
};

export default LeftSidebar;