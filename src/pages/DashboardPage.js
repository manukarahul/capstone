// src/pages/DashboardPage.js
import React, { useState, useEffect, useRef } from 'react';
import HomePage from './HomePage'; // Updated path
import HomeListingDetailPage from './HomeListingDetailPage'; // Updated path

function DashboardPage() {
  const [showHome, setShowHome] = useState(true);
  const [propertyData ,setPropertyData] = useState({}); // This will hold the full property object

  return (
    <div>
        {
            showHome ?
            <HomePage setPropertyData={setPropertyData} setShowHome={setShowHome}/>
            :
            <HomeListingDetailPage propertyData={propertyData} setShowHome={setShowHome}/>
        }
    </div>
  );
}

export default DashboardPage;