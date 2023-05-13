import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaRegUserCircle } from 'react-icons/fa';
import { BsCartFill } from 'react-icons/bs';
import './Header.css';
import { useDispatch, useSelector } from 'react-redux';
import { logoutRedux } from './redux/userSlice';

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  
  const handleShowMenu = () => {
    setShowMenu(prev => !prev);
  };

  const handleLogout = () => {
    dispatch(logoutRedux());
    alert('Logged out successfully');
  };

  const cartItemNumber = useSelector((state) => state.product.cartItem.length);

  return (
    <header className="headerr">
      <Link to={''}>
        <div className="">
          <img
            className="header_logoo"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBYQIzO1rNHnwSGGosxlDk8TkU8P1tF_tNgaFKH_F6nj70kTgeW11W7L8IDo-ByBe7xlI&usqp=CAU"
            alt=""
          />
        </div>
      </Link>
      <div className="Navv">
        <nav className="Navv_text">
          <Link to={''}>Home</Link>
          <Link to={'about'}>About</Link>
          <Link to={'contact'}>Contact</Link>
        </nav>
        <div className="Navv_logo">
          <Link to={'cart'}>
            <div className="Cartt">{cartItemNumber}</div>
            <BsCartFill style={{ fontSize: '24px', position: 'relative' , left:'-15px'}} />
          </Link>
        </div>

        <div className="Nav_logo" onClick={handleShowMenu}>
          <div className="profile_logo">
            <FaRegUserCircle style={{ fontSize: '34px' }} />
          </div>
          {showMenu && (
            <div className="Profile_opt">
              {user.email === process.env.REACT_APP_ADMIN_EMAIL && (
                <Link to={'newproduct'}>New Product</Link>
              )}

              {user._id ? (
                <>
                  <Link to={'login'} onClick={handleLogout}>
                    Logout ({user.firstName})
                  </Link>
                </>
              ) : (
                <Link to={'login'}>Login</Link>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;