import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Vendors.css';
const Vendors = () => {
  const [crops, setCrops] = useState([]);

  useEffect(() => {
    fetchCrops();
  }, []);

  const fetchCrops = async () => {
    try {
      const response = await axios.get('http://localhost:5003/api/crops'); // Make sure this matches your backend port
      setCrops(response.data);
    } catch (error) {
      console.error("Error fetching crops:", error);
    }
  };
   const styles = {
    container: {
      maxWidth: '100%',
      // top:'45px',
    position: 'relative',
      margin: 'auto',
      padding: '30px',
      fontFamily: 'Segoe UI, sans-serif',
      backgroundColor: '#f7fdf9',
    }}

  return (
    <div className="vendors-container">

       <div style={styles.container}>


<div style={{
  padding: '30px',
  backgroundColor: '#e6f2ea',
  textAlign: 'center',
  fontFamily: 'Segoe UI, sans-serif',
  lineHeight: '1.6',
}}>
  <h1 style={{ color: '#2e8b57', marginBottom: '10px' }}>Welcome to the Crop Buying Page</h1>
  <p style={{ fontSize: '16px', color: '#333' }}>
    Here you can Buy fresh produce crops . Simply fill in the crop name, quantity, and price.
    <br />
    Make sure your details are accurate and updated regularly to ensure smooth transactions.
  </p>
</div></div>

      {/* <div className="welcomepage">
       <h1 style={{color:"green", display:"flex", justifyContent:"center", alignItems:"center"}}> Welcome to a Buyer Page</h1> Welcome to a Buyer 
      </div> */}
      <h2>Available Crops from Farmers</h2>
      <div className="crops-grid">
        {crops.map((crop, index) => (
          <div key={index} className="crop-card">
            <h3>{crop.name}</h3>
            <p><strong>Quantity:</strong> {crop.quantity}</p>
            <p><strong>Price:</strong> ₹{crop.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Vendors;
