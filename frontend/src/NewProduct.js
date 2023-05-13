import React, { useState } from 'react'
import './NewProduct.css';
import {BsUpload} from 'react-icons/bs';
import { ImagetoBase64 } from './utility/ImagetoBase64';


function NewProduct() {

  const[data,setData] = useState({
    name : "",
    category : "",
    image: "",
    price : "",
    description : "",
  })

  const handleonChange =(e)=>{
      const {name,value} = e.target
      setData((preve) =>{
        return{
          ...preve,
          [name] : value
        }

      });
  }

  const uploadImage = async(e)=>{
       const data = await ImagetoBase64(e.target.files[0])
      //  console.log(data);

      setData((preve)=>{
         return{
          ...preve,
          image : data
         }
      })
  }
   const handleSubmit = async(e)=>{
    e.preventDefault()
      console.log(data);

      const {name,image,category,price} = data
      if(name && image && category && price){
        const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/uploadProduct`,{
          method : "POST",
          headers: {
          "content-type" : "application/json" 
          },
          body : JSON.stringify(data)
        })
        const fetchRes = await fetchData.json()
        console.log(fetchRes);
        alert(fetchRes.message);
        setData(()=>{
          return{
            name : "",
            category : "",
            image: "",
            price : "",
            description : "",
          }
        })
     }
     else{
      alert("Enter all fills")
     }

      }

      



  return (
    <div  className='formm'>
      <form className='np' onSubmit={ handleSubmit}>
        <label htmlFor='name' className='text'>Name</label>
        <input className='input' type={"text"} name = "name" onChange={handleonChange} value = {data.name} />

        <label htmlFor='category' className='text'>Category</label>
        <select className='select' name='category' onChange={handleonChange} value = {data.category}>
          <option value={"other"}>Select Category</option>
          <option value={"fruits"}>Fruits</option>
          <option value={"vegitables"}>Vegitables</option>
          <option value={"non-veg"}>Non-Veg</option>
          <option value={"fast food"}>Fast Food</option>
          <option value={"cake"}>Cake</option>
          <option value={"ice-cream"}>Ice-cream</option>
          <option value={"sweet dish"}>Sweet Dish</option>
        </select>
  
        <label htmlFor='image' className='text'>Image
         <div id='img'  className='np_form'>
         {
          data.image ?  <img className='image' src ={data.image} alt="" /> : <span className='logo'><BsUpload /></span>
         }
         <input type={"file"} accept="image/#" id="image" onChange={uploadImage} className='upload'></input>
         </div>
         </label>

         <div>
         </div>
         <label htmlFor='price' className='text'>Price</label>
          <input  className='input' type={"text"} name = "price" onChange={handleonChange} value = {data.price}/>

          <label htmlFor='description' className='text'>Description</label>
          <textarea className='input' rows={3} name='description' onChange={handleonChange} value = {data.description}/>

          <button className='save'>Save</button>
      </form>
    </div>
  )
}

export default NewProduct ;
