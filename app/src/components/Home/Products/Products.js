import axios from 'axios';
import React, { useEffect, useState } from 'react';

import config from './../../../config'
import tokenFunc from './../../../utils/token';
import ProductItem from './ProductItem/ProductItem';
import './Products.css';

const Products = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const token = tokenFunc.getAuthDataFromLocalStorage()
    console.log(token);

    axios.get(config.serverUrl + "/products", {
      headers: {
        'Authorization': `Bearer ${token.idToken}`
      }
    })
      .then(res => {
        console.log(res);
        if (res.status == 204) {
          alert("There are no products available")
          return;
        }
        setProducts(res.data.products);
      })
      .catch(err => {
        console.error(err);

        if (err.status == 401) {
          alert(err.message);
        }
      })
  }, []) //KLJUCAN PRAZAN NIZ

  return (
    <div className='col-md-12 '>
      <h2>Products</h2>
      <div className="d-flex flex-wrap .justify-content-around">
        {
          products.map(element => {
            return <ProductItem key={element.id} productName={element.product_name} standardCost={element.standard_cost} description={element.description}></ProductItem>
          })
          // (
          //   props.friendsForChat.map(({ userID, username }) => {
          //     return (
          //       <ChatWindow key={userID} userID={userID} username={username} />
          //     );
          //   })
        }
      </div>
    </div>
  );
};

export default Products;