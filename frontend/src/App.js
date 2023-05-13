import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import './App.css';
import Header from './Header';
import { setDataProduct } from './redux/ProductSlides';
import { useDispatch } from 'react-redux';


function App() {
  const dispatch = useDispatch();
  
  useEffect(()=>{
    (async()=>{
      const res = await fetch( `${process.env.REACT_APP_SERVER_DOMIN}/product`)
      const resData = await res.json()
      dispatch(setDataProduct(resData));
    })();
  }, [dispatch]);

  return (
    <div className='main'>
     <Header />
     <main>
      <Outlet />
     </main>
    </div>
  )
}

export default App;
