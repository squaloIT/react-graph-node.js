import React, { useEffect, useState } from 'react';
import axios from 'axios'
import './Products.css';
import ProductItem from './ProductItem/ProductItem';

const Products = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    axios.get(config.serverUrl + "/products")
      .then(res => {
        console.log(res);
        // this.setProducts(res.products)
      })
      .catch(err => {
        console.log(err);
      })
  })

  return (
    <div className='col-md-12 aqua-bckg'>
      <h2>Products</h2>
      {
        products.forEach(element => {
          <ProductItem productName={element.product_name} standardCost={element.standard_cost} description={element.description}></ProductItem>
        })
      }
    </div>
  );
};

export default Products;