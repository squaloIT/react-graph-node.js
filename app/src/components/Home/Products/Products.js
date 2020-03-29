import React from 'react';

import ProductItem from './ProductItem/ProductItem';
import './Products.css';

const displayProducts = (products, addToCart) => {
  return products.map(element => {
    return <ProductItem key={element.id} productName={element.product_name} standardCost={element.standard_cost} description={element.description} productId={element.id} addToCart={addToCart} />
  })
}
const Products = ({ products, addToCart }) => {
  console.log(`Products`, products)
  return (
    <div className='col-md-12 '>
      <h2>Products</h2>
      <div className="d-flex flex-wrap .justify-content-around">
        {products ? displayProducts(products, addToCart) : ''}
      </div>
    </div>
  );
};

export default Products;