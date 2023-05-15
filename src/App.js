import { Route, Routes } from 'react-router-dom';

import ProductList from './pages/productList';
import Cart from './pages/cart';
import NotFound from './pages/NotFound';
import Header from './components/Header';

import './_globalStyles.scss';

function App() {
  return (
    <div className='App'>
      <Header />
      <Routes>
        <Route path='/' element={<ProductList />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/*' element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
