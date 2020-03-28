import React, { useEffect, useState } from 'react';
import { of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { catchError, map, filter } from 'rxjs/operators';
import config from './../../../config';
import tokenFunction from './../../../utils/token';
import socketIOClient from "socket.io-client";
import ShoppingCartItem from './ShoppingCartItem/ShoppingCartItem';

const ShoppingCartList = () => {
  const [userCart, setUserCart] = useState([])
  const socket = socketIOClient(config.serverUrl);
  const email = tokenFunction.decodeJWTFromLocalStorageAndReturnData().email
  const userCart$ = ajax.getJSON(`${config.serverUrl}/user/cart`,
    tokenFunction.getHeaderWithToken(tokenFunction.getAuthDataFromLocalStorage())
  )
    .pipe(
      catchError(val => of(`I caught: ${val}`)),
      filter(data => data && data.usersShoppingCart),
      map((data) => data.usersShoppingCart)
    )

  useEffect(() => {
    socket.on("cart_changed_" + email, setUserCart);

    const sub = userCart$.subscribe(setUserCart, err => {
      console.error(err);
    })

    return () => sub.unsubscribe();
  }, []);

  return (
    <div className='d-flex flex-wrap'>
      {
        userCart ?
          userCart.map(element => {
            return <ShoppingCartItem key={element.id} productCode={element.product_code} productName={element.product_name} standardCost={element.standard_cost} productId={element.productId}></ShoppingCartItem>
          }) : ''
      }
    </div>
  );
  // <IconButton aria-label="Remove all items from cart" onClick={() => deleteCart()}>
  //   <RemoveShoppingCartIcon />
  // </IconButton>
};

export default ShoppingCartList;