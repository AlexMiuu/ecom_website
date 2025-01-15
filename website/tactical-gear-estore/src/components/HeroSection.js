import React, { useState, useEffect } from 'react';
import './HeroSection.css';
import 'aos/dist/aos.css';
import AOS from 'aos';
import { useNavigate } from 'react-router-dom';

import FrontPage1 from '../images/Header1.jpeg';
import FrontPage2 from '../images/Header2.jpeg';
import FrontPage3 from '../images/Header3.jpeg';
import FrontPage4 from '../images/Header4.jpeg';
import Category1 from '../images/Header1.jpeg'; // Replace with real image paths
import Category2 from '../images/Header1.jpeg';
import Category3 from '../images/Header1.jpeg';
import Product1 from '../images/Header1.jpeg';
import Product2 from '../images/category1.jpeg';

const images = [FrontPage1, FrontPage2, FrontPage3, FrontPage4];

function HeroSection() {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    AOS.init({ duration: 1000 }); // Initialize AOS with a duration of 1 second
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleButtonClick = () => {
    // This will navigate the user to '/your-target-page'
    navigate('/shop');
  };


  return (
    <div className="homepage">
      {/* Slideshow */}
      <div className="hero-section">
        {images.map((image, index) => (
          <div
            key={index}
            className={`hero-image ${index === currentImageIndex ? 'active' : ''}`}
            style={{ backgroundImage: `url(${image})` }}
          />
        ))}
        <div className="hero-overlay">
          <h1 className="hero-title">Gear Up for Any Adventure</h1>
          <p className="hero-subtitle">Top-Quality Tactical Gear for Your Journey</p>
          <a href="/shop" className="btn btn-primary">Shop Now</a>
        </div>
      </div>

      {/* Categories Section */}
      <section className="categories" data-aos="fade-up">
        <h2>Shop by Category</h2>
        <div className="categories-grid">
          <div className="category-card" data-aos="zoom-in">
            <img src={Category1} alt="Backpacks" />
            <h3>Backpacks</h3>
          </div>
          <div className="category-card" data-aos="zoom-in">
            <img src={Category2} alt="Footwear" />
            <h3>Footwear</h3>
          </div>
          <div className="category-card" data-aos="zoom-in">
            <img src={Category3} alt="Apparel" />
            <h3>Apparel</h3>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-products" data-aos="fade-up">
        <h2>Featured Products</h2>
        <div className="product-grid">
          <div className="product-card" data-aos="fade-right">
            <img src={Product1} alt="Tactical Backpack" />
            <h3>Tactical Backpack</h3>
            <p>$89.99</p>
            <button className="btn btn-secondary" onClick={handleButtonClick}>View Details</button>
          </div>
          <div className="product-card" data-aos="fade-left">
            <img src={Product2} alt="Combat Boots" />
            <h3>Combat Boots</h3>
            <p>$129.99</p>
        
            <button className="btn btn-secondary" onClick={handleButtonClick}>View Details</button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HeroSection;
