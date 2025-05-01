import { Link } from 'react-router-dom';
import { useContext } from 'react';
import WishlistContext from '../context/WishlistContext';
import Rating from './Rating';

const ProductCard = ({ product }) => {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useContext(WishlistContext);
  const isWishlisted = isInWishlist(product.id);

  const handleWishlistClick = () => {
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <div className="product-card">
      <div className="product-image">
        <img src={product.image} alt={product.name} />
        <button 
          onClick={handleWishlistClick}
          className={`wishlist-btn ${isWishlisted ? 'active' : ''}`}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          ♥
        </button>
      </div>
      <div className="product-info">
        <h3>{product.title}</h3>
        <Rating value={Math.round(product.rating?.rate || 0)} />
        <p className="price">${product.price}</p>
        <Link to={`/products/${product.id}`} className="view-btn">View Details</Link>
      </div>
    </div>
  );
};

export default ProductCard;