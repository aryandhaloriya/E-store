import React, { useEffect, useState } from 'react';
import './Home.css';
import { useSelector } from 'react-redux';
import HomeCard from './HomeCard';
import CardFeature from './CardFeature';
import FilterProduct from './FilterProduct';


function Home() {
  const productData = useSelector((state)=>state.product.productList);

  const homeProductCardList = productData.slice(1,5);
  const homeProductCardListVegitables = productData.filter(el=>el.category === "vegitables",[]);
  const loadingArray = new Array(4).fill(null)
  

  
  const categoryList = [...new Set(productData.map(el=> el.category))]
  

//filter data display
const [dataFilter,setDataFilter]=useState([])

useEffect(()=>{
  setDataFilter(productData)
},[productData])

const handleFilterProduct = (category)=>{
  const filter = productData.filter(el =>el.category.toLowerCase() === category.toLowerCase())
  setDataFilter(()=>{
     return[
      ...filter 
     ]
      
     
  })
}

  return (
    <div className='home'>
      <div className='delivery-section'>
        <div className='delivery-image'>
          <img src='https://cdn.pixabay.com/photo/2022/03/13/09/21/laptop-7065641__340.png' alt='' />
        </div>
        <div className='delivery-content'>
          <h1 className='delivery-title'>The Fastest Delivery In <span className='town'>Town</span></h1>
          <p className='delivery-description'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
          <button className='delivery-button'>Order Now</button>
        </div>
      </div> 

      <div className='featured-products-section'>
        <h2 className='featured-products-title'>Featured Products</h2>
        <div className='featured-products-container product-container'>
          {
            homeProductCardList[0] ?
            homeProductCardList.map(el => {
              return(
                <HomeCard 
                  key={el._id}
                  image={el.image}
                  name={el.name}
                  price={el.price}
                  category={el.category}
                />
              )
            })
            :
            loadingArray.map(el=>{
              return(
                <HomeCard />
              )
            })
          }
        </div>
      </div>

      <div className='more-section'>
        <h2 className='vegetables-title'>Fresh Vegetables</h2>
        <div className='vegetables-container product-container'>
          {
            
            homeProductCardListVegitables.map(el => {
              return(
                <CardFeature 
                  key={el._id}
                  name={el.name}
                  category={el.category}
                  price={el.price}
                  image={el.image}
                  id ={el._id}
                />
              )
            })
          }
        </div>
      </div>
      <div className='your-products'>
        <h2 className='moree'>More Products</h2>
        
        <div className='Filter'>
        {
          categoryList[0]&&categoryList.map(el=>{
            return(
              <FilterProduct  category={el} 
              key={el}
              onClick={()=> handleFilterProduct(el)}/>
            )
          })
        }
          </div>
          <div className='vegetables-section'>
         <div className='productss'>
           {
            dataFilter.map(el=>{
             return(
              <CardFeature 
                key={el._id}
                image={el.image}
                name ={el.name}
                category={el.category}
                price ={el.price}
                id={el._id}

              />
             ) 
            })
           }
         </div>


        </div>
   </div>
     </div>
    
  )
}

export default Home;
