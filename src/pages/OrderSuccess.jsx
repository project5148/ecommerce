import { Link } from 'react-router-dom';

const OrderSuccess = () => {
  return (
    <div className="order-success-page">
      <div className="success-card">
        <div className="success-icon">✓</div>
        <h1>Order Successful!</h1>
        <p>Thank you for your purchase. Your order has been received and is being processed.</p>
        <p>You will receive a confirmation email shortly.</p>
        <div className="action-buttons">
          <Link to="/products" className="btn">Continue Shopping</Link>
          <Link to="/profile/orders" className="btn outline">View Orders</Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;