import { useState } from 'react';
import { ToastContainer } from 'react-toastify';

import apiData from '../../apiData';
import ProductItem from './componenets/ProductItem';
import Modal from '../../components/Modal';
import ProductModal from './componenets/ProductModal';
import Filters from './componenets/Filters';
import 'react-toastify/dist/ReactToastify.css';

import './style.scss';

export default function ProductList () {
  const [showProductModal, setShowProductModal] = useState(false);
  const [activeProductModal, setActiveProductModal] = useState(null);
  const [activeProducts, setActiveProducts] = useState(apiData);
  
  const handleProductModal = product => {
    if (showProductModal) {
      setShowProductModal(false);
      setActiveProductModal(null);
    } else {
      setActiveProductModal(product);
      setShowProductModal(true);
    }
  };
 
 

  return (
    <>
      <div className='wrapper product-list-container'>
        <Filters apiData={apiData} setActiveProducts={setActiveProducts}/>
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
