import React, { useState } from 'react';

const MarketTrends = () => {
  const [selectedCrop, setSelectedCrop] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');

  const cropData = [
    { crop: 'Wheat', location: 'Delhi', price: '₹2000/Quintal' },
    { crop: 'Rice', location: 'Punjab', price: '₹1800/Quintal' },
    { crop: 'Wheat', location: 'Punjab', price: '₹1950/Quintal' },
    { crop: 'Rice', location: 'Delhi', price: '₹1750/Quintal' },
    { crop: 'Maize', location: 'Bihar', price: '₹1500/Quintal' },
  ];

  const filteredData = cropData.filter(item => {
    return (
      (selectedCrop ? item.crop === selectedCrop : true) &&
      (selectedLocation ? item.location === selectedLocation : true)
    );
  });

  const uniqueCrops = [...new Set(cropData.map(item => item.crop))];
  const uniqueLocations = [...new Set(cropData.map(item => item.location))];

  return (
    <div style={styles.container}>
      <div style={styles.overlay}>
        <h1 style={styles.heading}>Market Trends</h1>
        <p style={styles.subheading}>Get the latest market price based on your crop and location</p>

        <div style={styles.selectWrapper}>
          <select style={styles.select} onChange={(e) => setSelectedCrop(e.target.value)} value={selectedCrop}>
            <option value="">All Crops</option>
            {uniqueCrops.map(crop => (
              <option key={crop} value={crop}>{crop}</option>
            ))}
          </select>

          <select style={styles.select} onChange={(e) => setSelectedLocation(e.target.value)} value={selectedLocation}>
            <option value="">All Locations</option>
            {uniqueLocations.map(location => (
              <option key={location} value={location}>{location}</option>
            ))}
          </select>
        </div>

        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Crop</th>
              <th style={styles.th}>Location</th>
              <th style={styles.th}>Price</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr key={index}>
                <td style={styles.td}>{item.crop}</td>
                <td style={styles.td}>{item.location}</td>
                <td style={styles.td}>{item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: 'Segoe UI, sans-serif',
    // backgroundImage: 'url("https://wallpaperaccess.com/full/1598226.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
    minHeight: '100vh',
    padding: '30px',
    color: 'white',
    // margin-top:'675px'
        // margin-top: 113px;
        marginTop:'113px'
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: '10px',
    padding: '20px',
    maxWidth: '900px',
    margin: 'auto',
    width:"675px"
  },
  heading: {
    fontSize: '2rem',
    textAlign: 'center',
    marginBottom: '10px',
  },
  subheading: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  selectWrapper: {
    display: 'flex',
    gap: '10px',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginBottom: '20px',
  },
  select: {
    padding: '8px',
    borderRadius: '5px',
    border: 'none',
    minWidth: '150px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(5px)',
  },
  th: {
    padding: '12px',
    backgroundColor: '#d0e0d5',
    color: 'black',
    textAlign: 'center',
    fontWeight: '600',
  },
  td: {
    padding: '10px',
    border: '1px solid #ffffff33',
    textAlign: 'center',
    color: 'white',
  },
};

export default MarketTrends;
