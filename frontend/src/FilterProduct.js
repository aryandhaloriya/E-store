import React from 'react'
import { MdOutlineFoodBank } from 'react-icons/md'
import './FilterProduct.css'

const FilterProduct = ({ category, onClick }) => {
  return (
    <div className='container' onClick={onClick}>
      <div className='ima'>
        <MdOutlineFoodBank color='#fff' size={40} />
      </div>
      <p className='pl'>{category}</p>
    </div>
  )
}

export default FilterProduct