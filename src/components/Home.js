// src/App.js
import React, { useState } from 'react';
import HomePage from '../Home';
import HomeListingDetail from '../HomeListingsDetail';
function WebHome() {
  const [showHome, setShowHome] = useState(true);
  const [propertyData ,setPropertyData] = useState({});
  return (
    <div>
        {
            showHome ? <HomePage setPropertyData = {setPropertyData} setShowHome = {setShowHome}/> : <HomeListingDetail propertyData = {propertyData}  setShowHome = {setShowHome}/>
        }
    </div>
  );
}

export default WebHome;
