import React from 'react'
import './HomeCard.css';


const HomeCard = ({name,image,category,price}) => {
  return (
    <div className='full'>
      {
        name && <>
        <div className='box'>
        <img src={image}  className="image" alt="" />
      </div>
      <h3 className='namee'>{name}</h3>
      <p className='categoryy'>{category}</p>
      <p className='pricee'><span>₹</span>{price}</p>
        </>
      }
    </div>
  )
}

export default HomeCard;