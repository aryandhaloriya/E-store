import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createBrowserRouter,createRoutesFromElements,Route,RouterProvider } from 'react-router-dom';
import Home from './Home';
import About from './About';
import Contact from './Contact';
import Login from './Login';
import Cart from './Cart';
import NewProduct from './NewProduct';
import Signup from './Signup';
import { store } from './redux/index';
 import { Provider } from 'react-redux';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
   <Route index element={ <Home />} />
   <Route path='about' element={ <About />}/>
   <Route path='contact' element={ <Contact/>}/>
   <Route path='login' element={ <Login/>}/>
   <Route path='newproduct' element={<NewProduct/>}/>
   <Route path='signup' element={<Signup/>}/>
   <Route path='cart' element={<Cart/>}/>
    </Route>
  )
)
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>

<RouterProvider router={router} />

  </Provider>

);

