
import { Route, Routes } from "react-router-dom"

import ProductList from './pages/productList'
import Cart from './pages/cart'
import Header from './components/Header'

import './_globalStyles.scss';

function App() {
  return (
    <div className="App">
      {/* <button onClick={() => dispatch(increment())}>increment</button> */}
      {/* {count} */}
      <Header />
      <Routes>
        <Route path='/' element={<ProductList />} />
        <Route path='/cart' element={<Cart />} />
      </Routes>
    </div>
  );
}

export default App;
