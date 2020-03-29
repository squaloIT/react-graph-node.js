import React from 'react';
import ShoppingCartItem from './ShoppingCartItem/ShoppingCartItem';

const displayCart = (userCart, removeFromCart) => {
  return userCart.map(element => {
    return <ShoppingCartItem key={element.id} productCode={element.product_code} productName={element.product_name} standardCost={element.standard_cost} productId={element.productId} removeFromCart={removeFromCart} />
  })
}

const ShoppingCartList = ({ userCart, removeFromCart }) => {

  return (
    <div className='d-flex flex-wrap'>
      {userCart ? displayCart(userCart, removeFromCart) : ''}
    </div>
  );
  // <IconButton aria-label="Remove all items from cart" onClick={() => deleteCart()}>
  //   <RemoveShoppingCartIcon />
  // </IconButton>
};

export default ShoppingCartList;