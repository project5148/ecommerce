import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchProducts } from '../api/products';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const products = await fetchProducts();
        const uniqueCategories = [...new Set(products.map(p => p.category))];
        setCategories(uniqueCategories);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    getCategories();
  }, []);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="categories-page">
      <h1>Product Categories</h1>
      <div className="categories-grid">
        {categories.map(category => (
          <Link 
            key={category} 
            to={`/products?category=${encodeURIComponent(category)}`} 
            className="category-card"
          >
            <h3>{category}</h3>
            <p>View all {category}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;