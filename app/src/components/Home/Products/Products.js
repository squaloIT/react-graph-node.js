import React from 'react';
import { of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { catchError, map } from 'rxjs/operators';
import config from './../../../config';
import { useObservable } from './../../../utils/custom-hooks';
import tokenFunc from './../../../utils/token';
import ProductItem from './ProductItem/ProductItem';
import './Products.css';

const Products = () => {
  const token = tokenFunc.getAuthDataFromLocalStorage()
  const products$ = ajax.getJSON(config.serverUrl + "/products", {
    'Authorization': `Bearer ${token.idToken}`
  })
    .pipe(
      catchError(val => of(`I caught: ${val}`)),
      map((data) => data.products)
    );

  const products = useObservable(products$, (err) => {
    console.error(err);
    if (err.status == 401) {
      alert(err.message);
    }
  })

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