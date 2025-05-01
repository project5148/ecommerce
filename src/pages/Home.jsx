import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../api/products';

import ProductCard from '../components/ProductCard';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      const products = await fetchProducts();
      setFeaturedProducts(products);
    };
    loadProducts(); // Correctly close the useEffect function

  }, []); // Add the dependency array to useEffect

  return (
    <div className="home-page">
      <section className="hero" style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '500px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        textAlign: 'center',
        position: 'relative'
      }}>
        <div className="hero-content" style={{
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          padding: '2rem',
          borderRadius: '8px',
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Welcome to ShopEase</h1>
          <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>Discover amazing products at great prices</p>
          <Link to="/products" className="btn" style={{
            display: 'inline-block',
            padding: '0.8rem 2rem',
            backgroundColor: '#007bff',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '4px',
            transition: 'background-color 0.3s'
          }}>Shop Now</Link>
        </div>
      </section>
      
      <section className="featured-products">
        <h2>Featured Products</h2>
        <div className="products-grid">
          {featuredProducts.length > 0 && featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="view-all">
          <Link to="/products" className="btn">View All Products</Link>
        </div>
      </section>
      
      <section className="benefits">
        <div className="benefit-item">
          <h3>Free Shipping</h3>
          <p>On orders over $50</p>
        </div>
        <div className="benefit-item">
          <h3>Easy Returns</h3>
          <p>30-day return policy</p>
        </div>
        <div className="benefit-item">
          <h3>24/7 Support</h3>
          <p>Dedicated support</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
