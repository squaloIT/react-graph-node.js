import React, { useEffect, useState } from 'react';
import { of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { catchError, map } from 'rxjs/operators';
import config from './../../../config';
import tokenFunction from './../../../utils/token';
import ShoppingCartItem from './ShoppingCartItem/ShoppingCartItem';
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';
import IconButton from '@material-ui/core/IconButton';


const ShoppingCartList = () => {
  const [userCart, setUserCart] = useState([])
  const userCart$ = ajax.getJSON(`${config.serverUrl}/user/cart`,
    tokenFunction.getHeaderWithToken(tokenFunction.getAuthDataFromLocalStorage())
  )
    .pipe(
      catchError(val => of(`I caught: ${val}`)),
      map((data) => {
        console.log(data)
        return data.usersShoppingCart
      })
    )

  useEffect(() => {
    const sub = userCart$.subscribe((res) => {
      console.log(res)
      setUserCart(res)
    }, err => {
      console.error(err);
    })

    return () => sub.unsubscribe;
  }, []);

  return (
    <div className='d-flex flex-wrap'>
      {userCart ?
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