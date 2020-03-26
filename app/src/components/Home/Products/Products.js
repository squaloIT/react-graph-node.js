import React, { useEffect, useState } from 'react';
import { of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { catchError, map } from 'rxjs/operators';
import socketIOClient from "socket.io-client";
import config from './../../../config';
import tokenFunc from './../../../utils/token';
import ProductItem from './ProductItem/ProductItem';
import './Products.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const socket = socketIOClient(config.serverUrl);
  const token = tokenFunc.getAuthDataFromLocalStorage()
  const products$ = ajax.getJSON(config.serverUrl + "/products",
    {
      'Authorization': `Bearer ${token.idToken}`
    }).pipe(
      catchError(val => of(`I caught: ${val}`)),
      map((data) => data.products)
    );

  useEffect(() => {
    socket.on("products_changed", products => {
      console.log(products)
      setProducts(products)
    });

    const sub = products$.subscribe(setProducts, (err) => {
      console.error(err);
      if (err.status == 401) {
        alert(err.message);
      }
    });

    return () => sub.unsubscribe();
  }, []);
  // const products = useObservable(products$, (err) => {
  //   console.error(err);
  //   if (err.status == 401) {
  //     alert(err.message);
  //   }
  // })

  return (
    <div className='col-md-12 '>
      <h2>Products</h2>
      <div className="d-flex flex-wrap .justify-content-around">
        {products ?
          products.map(element => {
            return <ProductItem key={element.id} productName={element.product_name} standardCost={element.standard_cost} description={element.description} productId={element.id}></ProductItem>
          }) : ''
        }
      </div>
    </div>
  );
};

export default Products;