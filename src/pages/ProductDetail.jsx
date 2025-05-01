import { useParams } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import CartContext from '../context/CartContext';
import AuthContext from '../context/AuthContext';

import { fetchProductById } from '../api/products';
import Rating from '../components/Rating';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useContext(CartContext);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: ''
  });
  const { user } = useContext(AuthContext);

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      alert('Please login to submit a review');
      return;
    }
    
    if (!newReview.comment.trim()) {
      alert('Please enter a review comment');
      return;
    }
    
    const review = {
      id: Date.now(),
      user: user.name,
      rating: newReview.rating,
      comment: newReview.comment,
      date: new Date().toISOString().split('T')[0]
    };
    
    setReviews([...reviews, review]);
    setNewReview({ rating: 5, comment: '' });
  };

  useEffect(() => {
    const getProduct = async () => {
      try {
        const data = await fetchProductById(id);
        setProduct(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    
    getProduct();
  }, [id]);
  
  const handleAddToCart = () => {
    addToCart(product, quantity);
    alert(`${quantity} ${product.title}(s) added to cart!`);
  };
  
  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!product) return <div className="error">Product not found</div>;
  
  return (
    <div className="product-detail-page">
      <div className="product-detail-container">
        <div className="product-image">
          <img src={product.image} alt={product.title} />
        </div>
        
        <div className="product-info">
          <h1>{product.title}</h1>
          <Rating value={Math.round(product.rating.rate)} />
          <p className="price">${product.price}</p>
          <p className="description">{product.description}</p>
          
          <div className="features">
            <h3>Category:</h3>
            <p>{product.category}</p>
          </div>
          
          <div className="add-to-cart">
            <div className="quantity-selector">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>
            <button className="add-to-cart-btn" onClick={handleAddToCart}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      <div className="reviews-section">
        <h2>Customer Reviews</h2>

        {user && (
          <form onSubmit={handleReviewSubmit} className="review-form">
            <h3>Write a Review</h3>
            <div className="form-group">
              <label>Rating:</label>
              <select
                value={newReview.rating}
                onChange={(e) => setNewReview({...newReview, rating: parseInt(e.target.value)})}
              >
                {[5, 4, 3, 2, 1].map(num => (
                  <option key={num} value={num}>{num} ★</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Review:</label>
              <textarea
                value={newReview.comment}
                onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                required
              />
            </div>
            <button type="submit" className="btn">Submit Review</button>
          </form>
        )}
        
        {[...reviews, ...(product.reviews || [])].length > 0 ? (
          <div className="reviews">
            {[...reviews, ...(product.reviews || [])].map(review => (
              <div key={review.id} className="review">
                <div className="review-header">
                  <span className="user">{review.user}</span>
                  <Rating value={review.rating} />
                  <span className="date">{review.date}</span>
                </div>
                <p className="comment">{review.comment}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No reviews yet. Be the first to review!</p>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
