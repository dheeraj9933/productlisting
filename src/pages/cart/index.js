import React, { useEffect, useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { removeFromCart } from '../../reducers/cartSlice';
import { FiTrash } from 'react-icons/fi';

import './style.scss';
import { ToastContainer } from 'react-toastify';

import toastUtil from '../../utils/toast';
import { Link } from 'react-router-dom';
import Modal from '../../components/Modal';

export default function Cart () {
  const cart = useSelector(state => state.cart);
  const [itemsPrice, setItemsPrice] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    let cost = 0;
    cart.items.forEach(item => {
      cost += (item.discountPrice || item.price) * item.quantity;
    });
    setItemsPrice(cost);
  }, [cart]);

  const removeCartHandler = productName => {
    console.log('removeCartHandler');
    const newCart = JSON.parse(JSON.stringify(cart.items));
    toastUtil('Product removed from cart', 'success');
    dispatch(removeFromCart(newCart.filter(item => item.name !== productName)));
  };

  const purchaseHandler = () => {
    dispatch(removeFromCart([]));
    setShowModal(true);
  };

  return (
    <div className='wrapper cart-container'>
      {Array.isArray(cart.items) && cart.items.length ? (
        <>
          <ul className='cart-items'>
            {cart.items.map(product => {
              return (
                <li key={product.name}>
                  <button
                    className='remove-from-cart'
                    onClick={() => removeCartHandler(product.name)}
                    title='Remove From Cart'
                  >
                    remove from cart <FiTrash />
                  </button>
                  <figure>
                    <img src={product.images[0]} alt='' />
                  </figure>
                  <div className='cart-item-desc'>
                    <span className='cart-name capitalize'>{product.name}</span>
                    <span className='cart-brand capitalize'>
                      {product.brand}
                    </span>
                    <span className='cart-brand capitalize'>
                      Size: <span className='size'>{product.size}</span>
                    </span>
                    <span className='cart-price'>
                      <span className='text-muted'>Price</span> : ₹{' '}
                      {product.discountPrice ? (
                        <span>
                          {product.discountPrice}
                          <span className='line-through'>{product.price}</span>
                        </span>
                      ) : (
                        product.price
                      )}{' '}
                    </span>
                    <span>
                      <span className='text-muted'>Qty</span>:{product.quantity}
                    </span>
                    <span>
                      <span className='text-muted'>Total Price</span>: ₹
                      {(product.discountPrice || product.price) *
                        product.quantity}
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
          <div className='cart-summary'>
            <ul>
              <li>
                {' '}
                <span className='text-muted'>Items Cost:</span> ₹ {itemsPrice}
              </li>
              <li>
                {' '}
                <span className='text-muted'>Shipping Cost:</span> ₹ 1000
              </li>
              <li>
                {' '}
                <span className='text-muted total-cost'>Total Cost:</span>{' '}
                <span className='text-green final-cost'>
                  {' '}
                  ₹{itemsPrice + 1000}
                </span>{' '}
              </li>
            </ul>
            <button
              className='button-primary'
              onClick={purchaseHandler}
              title='Place Order'
            >
              Place Order
            </button>
          </div>
        </>
      ) : (
        <div>
          No Products in Cart. Click <Link to='/'>here</Link> to go home page
          and add a few products!
        </div>
      )}
      {showModal && (
        <Modal customClose={() => setShowModal(false)}>
          <div className='purchase'>
            <h2> Order placed successfully!</h2>
            <svg
              version='1.1'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 130.2 130.2'
            >
              <circle
                className='path circle'
                fill='none'
                stroke='#73AF55'
                strokeWidth='6'
                strokeMiterlimit='10'
                cx='65.1'
                cy='65.1'
                r='62.1'
              />
              <polyline
                className='path check'
                fill='none'
                stroke='#73AF55'
                strokeWidth='6'
                strokeLinecap='round'
                strokeMiterlimit='10'
                points='100.2,40.2 51.5,88.8 29.8,67.5 '
              />
            </svg>
          </div>
        </Modal>
      )}
      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
      ></ToastContainer>
    </div>
  );
}
