// src/components/ScrollToTop.tsx

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  // `useLocation` hook se current route ki location (pathname) milti hai
  const { pathname } = useLocation();

  // `useEffect` hook tab chalta hai jab `pathname` badalta hai
  useEffect(() => {
    // Page ko top (0, 0) par scroll kar deta hai
    window.scrollTo(0, 0);
  }, [pathname]);

  // Yeh component kuch bhi render nahi karta, iska kaam sirf scrolling hai
  return null;
};

export default ScrollToTop;