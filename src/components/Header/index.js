import React, { useEffect, useState } from 'react';

import { AiOutlineShoppingCart } from 'react-icons/ai';
import { Link } from 'react-router-dom';

import { useSelector } from 'react-redux';

import './style.scss';

export default function Header () {
  const [cartCount, setCartCount] = useState(0);

  const cart = useSelector(state => state.cart);

  useEffect(() => {
    setCartCount(cart.items.length);
  }, [cart]);
  return (
    <div className=' header'>
      <nav className='wrapper'>
        <ul>
          <li>
            <h1>
              <Link to='/' title='Home'>Aza</Link>
            </h1>
          </li>
          <li className='cart-icon'>
            <Link to='/cart' title='Cart'>
              <AiOutlineShoppingCart />
              {cartCount > 0 && <span className='cart-count'>{cartCount}</span>}
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
