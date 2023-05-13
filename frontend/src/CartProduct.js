import React from 'react'
import './CartProduct.css'
import {MdDelete} from 'react-icons/md'
import { useDispatch} from 'react-redux';
import { deleteCartItems, increaseQty, decreaseQty } from './redux/ProductSlides';

const  CartProduct = ({id, name, image, category,qty,total,price}) => {
  const dispatch = useDispatch();
  
  return (
    <div className='data'>
      <div className='below' >
        <img src={image} className="imagee" alt=''/>
      </div>
      <div className='col'>
        <h3 className='h3'>
          {name}
        </h3>
        <div className='bin' onClick={() => dispatch(deleteCartItems(id))}>
          <MdDelete />
        </div>
        <p className='category'>{category}</p>
        <p className='p'>
          <span className='span'>₹</span>
          <span>{price}</span>
        </p>
        <div className='pricee'>
          <div className='row'>
          <button onClick={()=>dispatch(increaseQty(id))} className='butt'>+</button>
            <p className='Qty'>{qty}</p>
            <button onClick={() => dispatch(decreaseQty(id))} className ="buttons">-</button>
            <p> ₹ Total : </p>
            <p className='total'> {total} </p>
          </div>
        </div>
      </div>    
    </div>
  )
}
export default CartProduct
