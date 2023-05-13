import React from 'react'
import './CardFeature.css';
import { addCartItems } from './redux/ProductSlides';
import {useDispatch} from "react-redux";


const CardFeature = ({image,name,price,category,id}) => {
  const dispatch = useDispatch()
  const handleAddCartProduct =(e)=>{
      dispatch(addCartItems({
        _id : id,
        name : name,
        price: price,
        category: category,
        image: image,
      }))
  
  };
  return (
    <div className='fulu'>
    <div className='boxx'>
    <img src={image} className ="img" alt=''/>
    </div>
    <h3 className='name'>{name}</h3>
      <p className='category'>{category}</p>
      <p className='price'><span>₹</span>{price}</p>
      <button className='but' onClick={handleAddCartProduct}>Add Cart</button>
    </div>
  )
}

export default CardFeature
