import React, { useState, useEffect } from 'react';
import './HeroSection.css'; // Import CSS file for styling

// List of image URLs for the slideshow
import FrontPage1 from "../images/Header1.jpeg";
import FrontPage2 from "../images/Header2.jpeg";
import FrontPage3 from "../images/Header4.jpeg";
import FrontPage4 from "../images/Header5.jpeg";

const images = [FrontPage1, FrontPage2, FrontPage3, FrontPage4];

function HeroSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 8000); // Change image every 5 seconds

    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);

  return (
    <div className="hero-section">
      {images.map((image, index) => (
        <div
          key={index}
          className={`hero-image ${index === currentImageIndex ? 'active' : ''}`}
          style={{ backgroundImage: `url(${image})` }}
        />
      ))}
      <div className="hero-overlay">
        <h1 className="hero-title">Top Quality Tactical Gear</h1>
        <p className="hero-subtitle">Equip yourself for any adventure</p>
      </div>
    </div>
  );
}

export default HeroSection;
