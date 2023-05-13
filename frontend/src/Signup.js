import React, { useState } from "react";
import './Signup.css';
import { FaUserCircle } from "react-icons/fa";
import { Link , useNavigate } from 'react-router-dom';




function Signup() {
   const navigate = useNavigate()
  const [data,setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
    

  });
   console.log(data);
  const handleonChange =(e)=>{

      const {name,value} =e.target
      setData((preve)=>{
         return{
          ...preve,
          [name] :value
         }
      })
  }
 console.log(process.env.REACT_APP_SERVER_DOMIN );
  const handleSubmit = async(e)=>{
      e.preventDefault()
      const{firstName,lastName,email,password}=data
      if(firstName && lastName && email && password){
        const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/signup`,{

          method : "POST",
          headers : {
             "content-type" : "application/json"
          },
          body : JSON.stringify(data)
        })
        const dataRes = await fetchData.json()
        console.log(dataRes);

        alert(dataRes.message);
      
        if(dataRes.alert){
          navigate ("/login")
        }
      }
      else{
        alert("Bondu sab bhar pehele!!")
      }
  }
  return (
    <div className='fullll'>
      <div className='signup'>
        <FaUserCircle style={{ fontSize: '104px' }} />

        <form className='Form' onSubmit={handleSubmit}>
          <label htmlFor='firstName' className="in">First Name </label>
          <input className='Input' type={"text"} id="firstName" name="firstName" value={data.firstName} onChange={handleonChange} />

          <label htmlFor='lastName' className="in">Last Name</label>
          <input className='Input' type={"text"} id="lastName" name="lastName" value={data.lastName} onChange={handleonChange} />

          <label htmlFor='email' className="in">Email</label>
          <input className='Input' type={"email"} id="email" name="email" value={data.email} onChange={handleonChange} />

          <label htmlFor='password' className="in">Password</label>
          <input className='Input' type={"password"} id="password" name="password"  value={data.password} onChange={handleonChange}/>

          <button type='submit' className='buttone'>Sign up</button>
        </form>
        <p className='already'>Already have account? <Link to={"/login"}>Login</Link> </p>
      </div>
      
    </div>
  );
}

export default Signup;
