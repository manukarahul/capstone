// src/contexts/ScrollContext.js
import React from 'react';

const ScrollContext = React.createContext({
  scrollToFooter: () => {}, // Default empty function
  footerRef: { current: null }, // Default ref value
});

export default ScrollContext;