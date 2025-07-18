import React, { useState } from 'react';
import axios from 'axios';
import './Loginsignup.css';
import { useNavigate } from 'react-router-dom';


const VendorLoginsignup = () => {
  const navigate = useNavigate();

  const [action, setAction] = useState("Login");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // const handleSubmit = async () => {
  //   try {
  //     if (action === "Sign up") {
  //       const { name, email, password } = formData;

  //       if (!name || !email || !password) {
  //         alert("Please fill in all the fields.");
  //         return;
  //       }

  //       // ✅ Corrected POST request to match proper backend route
  //       const res = await axios.post("http://localhost:5000/api/register", formData);
  //       alert("User registered successfully!");

  //       // Reset and switch to login
  //       setFormData({ name: "", email: "", password: "" });
  //       setAction("Login");
  //     } else {
  //       alert("Login clicked (backend login not implemented yet)");
  //     }
  //   } catch (err) {
  //     alert("Error: " + (err.response?.data?.error || err.message));
  //   }
  // };


  const handleSubmit = async () => {
  try {
    const { name, email, password } = formData;

    if (action === "Sign up") {
      if (!name || !email || !password) {
        alert("Please fill in all the fields.");
        return;
      }

      // Send data to backend
      await axios.post("http://localhost:5003/api/vendor/register", formData);
      alert("User registered successfully!");
      navigate("/vendors",{replace:true});
      setFormData({ name: "", email: "", password: "" });
      setAction("Login");

    } else {
      if (!email || !password) {
        alert("Please enter email and password.");
        return;
      }

      // Send login request
    //   const res = await axios.post("http://localhost:5001/api/login", { email, password });
const res = await axios.post("http://localhost:5003/api/vendor/login", { email, password });
      // Success
      alert(res.data.message || "Login successful!");
      navigate("/vendors",{replace:true});
    }

  } catch (err) {
    alert("Login Error: " + (err.response?.data?.error || err.message));
  }
};




  return (
    <div className='container'>
      <div className='header'>
        <div className='text'>{action}</div>
        <div className='underline'></div>
      </div>

      <div className='inputs'>
        {action === "Sign up" && (
          <div className='input'>
            <input
              type="text"
              name="name"
              placeholder="Enter your Name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
        )}

        <div className='input'>
          <input
            type="email"
            name="email"
            placeholder="Enter your Email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className='input'>
          <input
            type="password"
            name="password"
            placeholder="Enter your Password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
      </div>

      {action === "Login" && (
        <div className="forgot-password">
          Lost Password? <span>Click Here!</span>
        </div>
      )}

      <div className='submit-container'>
        <div className="submit" onClick={handleSubmit}>
          {action}
        </div>
      </div>

      <div style={{ textAlign: 'center', marginTop: '20px', color: '#4c00b4' }}>
        {action === "Login" ? (
          <>
            Don't have an account?{" "}
            <span style={{ cursor: "pointer" }} onClick={() => setAction("Sign up")}>
              Sign up
            </span>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <span style={{ cursor: "pointer" }} onClick={() => setAction("Login")}>
              Login
            </span>
          </>
        )}
      </div>
    </div>
  );
};

export default VendorLoginsignup;
