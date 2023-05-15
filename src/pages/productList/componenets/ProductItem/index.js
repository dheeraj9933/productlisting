import React from 'react';

export default function ({ product, handleProductModal }) {
  return (
    <li
      key={product.name}
      className='product-item'
      onClick={() => handleProductModal(product)}
      title={product.name.toUpperCase()}
    >
      <figure>
        <img src={product.images[0]} alt='' />
      </figure>
      <ul className='product-info'>
        <li className='product-name capitalize'>{product.name}</li>
        <li className='product-brand uppercase'>{product.brand}</li>
        {product.discountPrice ? 
        <li className='product-price'>  ₹{product.discountPrice} <span className='discount text-muted'>₹{product.price}</span></li>
        :
        <li className='product-price'>₹{product.price}</li>
        }
      </ul>
    </li>
  );
}
