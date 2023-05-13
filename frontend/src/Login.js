import React, { useState } from "react";
import "./Login.css";
import { FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector , useDispatch } from "react-redux";
 import { loginRedux } from "./redux/userSlice";

function Login() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
   const userData = useSelector(state => state)
 

   const dispatch = useDispatch();
  
  const handleonChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = data;
    if (email && password) {
      const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/login`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const dataRes = await fetchData.json();
      console.log(dataRes);
      
      alert(dataRes.message);

      if (dataRes.alert) {
        dispatch(loginRedux( dataRes) ); 
        setTimeout(() => {
          navigate("/");
        }, 1000);
       }
      console.log(userData);
    } else {
      alert("Bondu sab bhar pehele!!");
    }
  };

  return (
    <div>
      <div className="fullll">
        <div className="Login">
          <FaUserCircle style={{ fontSize: "104px" }} />

          <form className="Form" onSubmit={handleSubmit}>
            <label htmlFor="email" className="Email">Email</label>
            <input
              className="Input"
              type={"email"}
              id="email"
              name="email"
              value={data.email}
              onChange={handleonChange}
            />

            <label htmlFor="password" className="Email">Password</label>
            <input
              className="Input"
              type={"password"}
              id="password"
              name="password"
              value={data.password}
              onChange={handleonChange}
            />

            <button type="submit" className="buttone">
              Login
            </button>
          </form>
          <p className="already">
            Dont have account? <Link to={"/signup"}>Signup</Link>{" "}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
