import React, { useEffect, useState } from 'react';
// import '/m.css'

const prices = {
  Punjab: [
    { crop: "Wheat", price: "₹2200", updated: "July 3, 2025" },
    { crop: "Rice", price: "₹1850", updated: "July 3, 2025" },
    { crop: "Maize", price: "₹1700", updated: "July 3, 2025" }
  ],
  "Madhya Pradesh": [
    { crop: "Soybean", price: "₹4400", updated: "July 3, 2025" },
    { crop: "Wheat", price: "₹2100", updated: "July 3, 2025" },
    { crop: "Rice", price: "₹2000", updated: "July 3, 2025" }
  ],
  Maharashtra: [
    { crop: "Onion", price: "₹1500", updated: "July 3, 2025" },
    { crop: "Tomato", price: "₹1800", updated: "July 3, 2025" },
    { crop: "Cotton", price: "₹6200", updated: "July 3, 2025" }
  ]
};

const MarketTrends = () => {
  const [userState, setUserState] = useState('');
  const [cropFilter, setCropFilter] = useState('');
  const [locationMessage, setLocationMessage] = useState('Detecting your location...');

  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = async () => {
    if (!navigator.geolocation) {
      setLocationMessage("Geolocation not supported.");



          return;
    }

    navigator.geolocation.getCurrentPosition(async (pos) => {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;

      const apiKey = "693e85c838d54ad39cf600a82f76f9b8"; // Replace with your own key
      const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${apiKey}`;

      try {
        const res = await fetch(url);
        const data = await res.json();
        const stateName = data.results[0].components.state;

        setUserState(stateName);

        if (prices[stateName]) {
          setLocationMessage(`📍 Showing crop prices for: ${stateName}`);
        } else {
          setLocationMessage(`📍 State not supported: ${stateName}`);
        }
      } catch (error) {
        setLocationMessage("Failed to fetch location.");
      }
    }, () => {
      setLocationMessage("Location access denied.");
    });
  };

  const getFilteredPrices = () => {
    if (!userState || !prices[userState]) return [];

    const allPrices = prices[userState];
    return cropFilter
      ? allPrices.filter(item => item.crop === cropFilter)
      : allPrices;
  };
  const backgroundStyle = {
    margin: '100px',
    fontFamily: 'Arial, sans-serif',
    backgroundImage: 'url("https://wallpaperaccess.com/full/1598226.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    color: 'white',
    minHeight: '100vh'
  };
  return (
    <div style={{ padding: '30px', fontFamily: 'Segoe UI, sans-serif' }}>
      <h1>📊 Market Trends by Your Location</h1>
      <p>{locationMessage}</p>

      <label htmlFor="cropSelect">Filter by Crop: </label>
      <select
        id="cropSelect"
        value={cropFilter}
        onChange={(e) => setCropFilter(e.target.value)}
        style={{ padding: '6px', margin: '10px 0' }}
      >
        <option value="">--All Crops--</option>
        <option value="Wheat">Wheat</option>
        <option value="Rice">Rice</option>
        <option value="Maize">Maize</option>
        <option value="Onion">Onion</option>
        <option value="Tomato">Tomato</option>
        <option value="Cotton">Cotton</option>
        <option value="Soybean">Soybean</option>
      </select>

      <div style={{ marginTop: '20px' }}>
        {getFilteredPrices().length === 0 ? (
          <p>No crop data found for selected filter or location.</p>
        ) : (
          <table border="1" cellPadding="10" style={{ borderCollapse: 'collapse', width: '100%' }}>
            <thead style={{ backgroundColor: '#d0e0d5ff' }}>
              <tr>
                <th>Crop</th>
                <th>Price</th>
                <th>Last Updated</th>
              </tr>
            </thead>
            <tbody>
              {getFilteredPrices().map((item, index) => (
                <tr key={index}>
                  <td>{item.crop}</td>
                  <td>{item.price}</td>
                  <td>{item.updated}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default MarketTrends;
