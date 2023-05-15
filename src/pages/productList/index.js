import React, { useState, useEffect } from 'react';

import apiData from '../../apiData';

import './style.scss';
import ProductItem from './componenets/ProductItem';
import Modal from '../../components/Modal';
import ProductModal from './componenets/ProductModal';
import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer } from 'react-toastify';

export default function () {
  const [showProductModal, setShowProductModal] = useState(false);
  const [activeProductModal, setActiveProductModal] = useState(null);
  const [activeProducts, setActiveProducts] = useState(apiData);
  const [filters, setFilters] = useState({ gender: '', discounted: false });
  const handleProductModal = product => {
    if (showProductModal) {
      setShowProductModal(false);
      setActiveProductModal(null);
    } else {
      setActiveProductModal(product);
      setShowProductModal(true);
    }
  };
  const handleFilter = obj => {
    if ('gender' in obj) {
      if (obj.gender === filters.gender) {
        setFilters({ ...filters, gender: '' });
      } else {
        setFilters({ ...filters, gender: obj.gender });
      }
    } else {
      setFilters({ ...filters, discounted: !filters.discounted });
    }
  };
  useEffect(() => {
    // apply filters
    const filteredData = [];
    apiData.forEach(product => {
      if (filters.gender !== '') {
        if (
          filters.gender === product.gender &&
          ((filters.discounted && product.discountPrice) || !filters.discounted)
        ) {
          filteredData.push(product);
        }
      } else if (filters.discounted) {
        if (product.discountPrice) {
          filteredData.push(product);
        }
      } else {
        filteredData.push(product);
      }
    });
    setActiveProducts(filteredData);
  }, [filters]);

  return (
    <>
      <div className='wrapper product-list-container'>
        <div className='filters'>
          Filters:
          <ul>
            <li
              className={`${filters.gender === 'male' ? 'active' : ''}`}
              onClick={() => handleFilter({ gender: 'male' })}
            >
              <button>Men</button>
              {filters.gender === 'male' ? (
                <span className='remove-filter'>x</span>
              ) : null}
            </li>
            <li
              className={`${filters.gender === 'female' ? 'active' : ''}`}
              onClick={() => handleFilter({ gender: 'female' })}
            >
              <button>Women</button>
              {filters.gender === 'female' ? (
                <span className='remove-filter'>x</span>
              ) : null}
            </li>
            <li
              className={`${filters.discounted ? 'active' : ''}`}
              onClick={() => handleFilter({ discounted: true })}
            >
              <button>Discounted</button>
              {filters.discounted ? (
                <span className='remove-filter'>x</span>
              ) : null}
            </li>
          </ul>
        </div>
        <ul className='product-list'>
          {Array.isArray(activeProducts) && activeProducts.length ? activeProducts.map(product => {
            return (
              <ProductItem
                key={product.name}
                product={product}
                handleProductModal={handleProductModal}
              />
            );
          }) : <div>No products found.</div>}
        </ul>
      </div>
      {showProductModal && (
        <Modal customClose={handleProductModal}>
          <ProductModal activeProductModal={activeProductModal} />
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
    </>
  );
}
