// src/components/Footer.js
import React from 'react';

const Footer = React.forwardRef((props, ref) => {
  return (
    <footer ref={ref} className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-8 md:p-12 text-center shadow-lg">
      <div className="container mx-auto text-center">
        <h2 className="text-2xl font-bold mb-4">About Us</h2>
        <p className="mb-2">We are a leading real estate platform helping you find your dream home or list your property with ease.</p>
        <p className="text-sm">&copy; {new Date().getFullYear()} Google Rent. All rights reserved.</p>
        <div className="flex justify-center space-x-4 mt-4">
          <a href="#" className="hover:underline">Privacy Policy</a>
          <a href="#" className="hover:underline">Terms of Service</a>
          <a href="#" className="hover:underline">Contact Us</a>
        </div>
      </div>
    </footer>
  );
});

export default Footer;