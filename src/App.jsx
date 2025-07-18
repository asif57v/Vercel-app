import React from 'react';
// import { BrowserRouter as Routes, Route } from 'react-router-dom';
// import { BrowserRouter,Route,Router, Routes } from 'react-router-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import './App.css';
import Loginsignup from './Components/Loginsignup';
import Dashboard from './Components/Dashboard'; // Add this page
import Weather from './Components/Weather';
import FarmerPage from './Components/Farmerpage';
import MarketTrends from './Components/MarketTrends';
import Chat from './Components/Chat';
import AIFarming from './Components/AiFarming';
import Vendors from './Components/Vendors';
import VendorLoginsignup from './Components/VendorsLogin';
import Contact from './Components/Contact';
import Navbar from './Components/Navbar'; // ✅ Import navbar


// import SellPage from  './Components/SellPage'

function App() {
  return (
    // <div>
    //      <Loginsignup/>
    //  </div>

<BrowserRouter>
{/* <LoginSignup/> */}
 <Navbar /> {/* ✅ Always visible */}
<Routes>
   <Route path="/" element={<Dashboard />} />
  <Route path="/LoginSignup" element={<Loginsignup />} />
  <Route path='/VendorSignup' element={<VendorLoginsignup/>}/>
          <Route path='/FarmerPage' element={<FarmerPage/>}/>
          <Route path="/weather" element={<Weather />} />
          <Route path='/MarketTrends' element={<MarketTrends/>}/>
          <Route path='/Chat' element={< Chat/>}/>
          <Route path='/AiFarm' element={< AIFarming/>}/>
          <Route path='/Weather' element={ <Weather/>}/>
          <Route path="/vendors" element={<Vendors />} />
          <Route path="/contact" element={<Contact />} />
          

  


</Routes>
</BrowserRouter>
  
  );
}


export default App;
