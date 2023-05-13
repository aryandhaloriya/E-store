import React from 'react'
import { useSelector } from 'react-redux';
import './Cart.css';
import CartProduct from './CartProduct';


function Cart() {
  const productCartItem = useSelector((state)=>state.product.cartItem)
  const totalPrice = productCartItem.reduce((acc, curr)=>acc+ parseInt(curr.total) ,0)
  const totalQty = productCartItem.reduce((acc, curr)=>acc+ parseInt(curr.qty) ,0)
  return (
    <>
    
    <div className='fulll'>
      <h2 className='h2'>Your Cart Items</h2>
       { productCartItem[0] ?
      <div className='div2'>
      {/* //cart items */}
      <div className=''>
         {
          productCartItem.map(el =>{
            return(
              <CartProduct 
              id = {el._id}
              key={el._id}
              name ={el.name}
              image={el.image}
              category ={el.category}
              qty = {el.qty}
              total ={el.total}
              price ={el.price}
                />
            )
          })
         }
      </div>

        {/* total cart items */}
        <div className='summary'>
           <h2 className='h21'>Summary</h2>
           <div className='qty'>
           <p>Total Qty :</p>
           <p className='p2'>{totalQty}</p>
           </div>
           <div className='qty'>
           <p>Total Price</p>
           <p className='p2'><span className='spam'>₹</span>{totalPrice}</p>
           </div>
          <div>
            <button className='pay'>Pay Now</button>
          </div>
        </div>
      </div>
       
       :
       <>
        <div className='cartImg'>
          <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwa-El_T1b1G1F99i5PfJO3ob6pFEWECgnOw&usqp=CAU' className='imge'/>
          <p className='Empty'>Empty</p>
        </div>
       </>

       }
    </div>
    
    </>
  )
}

export default Cart
