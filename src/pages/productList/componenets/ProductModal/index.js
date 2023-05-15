import { useState, useEffect, useRef } from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import Slider from 'react-slick';

import { addToCart, editQuantity } from '../../../../reducers/cartSlice';
import toastUtil from '../../../../utils/toast';

import Sizes from './constants/size';
import SliderSettings from './constants/sliderSettings';
import SizeComponent from './componenets/SizeComponent';
import './style.scss';

function ProductModal({ activeProductModal }) {
  const [activeSize, setActiveSize] = useState(null);
  const [doesItemExistInCart, setDoesItemExistInCart] = useState(false);
  const [activeCartItem, setActiveCartItem] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector(state => state.cart);
  const sliderRef = useRef();

  const increaseCartHandler = () => {
    const newCart = JSON.parse(JSON.stringify(cart.items));
    newCart.forEach(cartItem => {
      if (cartItem.name === activeProductModal.name) {
        cartItem.quantity += 1;
      }
    });
    dispatch(editQuantity(newCart));
    toastUtil('Cart updated', 'success');
  };

  const decreaseCartHandler = () => {
    const newCart = JSON.parse(JSON.stringify(cart.items));
    newCart.forEach(cartItem => {
      if (cartItem.name === activeProductModal.name) {
        cartItem.quantity -= 1;
        if (cartItem.quantity) {
          toastUtil('Cart updated', 'success');
        } else {
          toastUtil('Item removed from cart', 'warn');
        }
      }
    });
    dispatch(editQuantity(newCart.filter(item => item.quantity > 0)));
  };

  const addToCartHandler = () => {
    if (!activeSize) {
      toastUtil('Please select a size', 'error');
      return;
    }
    dispatch(
      addToCart({ ...activeProductModal, quantity: 1, size: activeSize })
    );
    toastUtil('Item added to cart', 'success');
  };

  useEffect(() => {
    // check if current product exists in cart
    if (cart.items.length) {
      let doesExist = false;
      cart.items.forEach(cartItem => {
        if (cartItem.name === activeProductModal.name) {
          setDoesItemExistInCart(true);
          setActiveCartItem(cartItem);
          doesExist = true;
        }
      });
      if (!doesExist) {
        setDoesItemExistInCart(false);
        setActiveCartItem(null);
      }
    } else {
      setDoesItemExistInCart(false);
      setActiveCartItem(null);
    }
  }, [cart, activeProductModal]);

  return (
    <div key={activeProductModal.name} className='modal-item'>
      <div className='images-container'>
        <div className='thumbnails'>
          {activeProductModal.images.map((image, index) => {
            return (
              <figure
                key={uuid()}
                onClick={() => sliderRef?.current.slickGoTo(index)}
              >
                <img src={image} alt={activeProductModal.name} />
              </figure>
            );
          })}
        </div>
        <div className='slider'>
          {Array.isArray(activeProductModal.images) &&
          activeProductModal.images.length > 1 ? (
            <Slider ref={sliderRef} {...SliderSettings}>
              {activeProductModal.images.map(image => {
                return (
                  <figure key={uuid()}>
                    <img src={image} alt={activeProductModal.name} />
                  </figure>
                );
              })}
            </Slider>
          ) : (
            <img
              src={activeProductModal.images[0]}
              alt={activeProductModal.name}
            />
          )}
        </div>
      </div>
      <div className='product-desc'>
        <ul className='modal-info'>
          <li className='modal-name capitalize'>{activeProductModal.name}</li>
          <li className='modal-brand uppercase'>{activeProductModal.brand}</li>
          <li className='modal-price'>
            <span className='price-title'>Price</span> : ₹{' '}
            {activeProductModal.discountPrice ? (
              <span>
                {activeProductModal.discountPrice}
                <span className='line-through text-muted original-price'>
                  {activeProductModal.price}
                </span>
              </span>
            ) : (
              activeProductModal.price
            )}{' '}
          </li>
        </ul>
        <div className='button-container'>
          <span className='size-title'>Size:</span>
          {Sizes.map(size => (
            <SizeComponent
              key={size}
              size={size}
              activeSize={activeSize}
              setActiveSize={setActiveSize}
            />
          ))}
        </div>
        <div className='cart-buttons'>
          {doesItemExistInCart ? (
            <>
              <button
                className='btn-big button-primary'
                onClick={() => decreaseCartHandler()}
              >
                -
              </button>
              <span className='item-count'>{activeCartItem.quantity}</span>
              <button
                className='btn-big button-primary'
                onClick={() => increaseCartHandler()}
              >
                +
              </button>
            </>
          ) : (
            <button
              className='btn-big button-primary add-to-cart'
              onClick={() => addToCartHandler()}
              title='Add To Cart'
            >
              Add to cart <AiOutlineShoppingCart />
            </button>
          )}
          <button
            className='btn-big button-primary go-to-cart'
            onClick={() => navigate('/cart')}
            title='Go To Cart'
          >
            Go to cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductModal;
