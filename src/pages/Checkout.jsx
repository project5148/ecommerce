import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import CartContext from '../context/CartContext';
import AuthContext from '../context/AuthContext';

const stripePromise = loadStripe('your_publishable_key_here');

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [succeeded, setSucceeded] = useState(false);
  const { cartTotal, clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);
    
    try {
      // In a real app, you would create a payment intent on your backend
      // and then confirm it here
      const { error: stripeError } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: window.location.origin + '/order-success',
          receipt_email: user?.email || '',
        },
      });

      if (stripeError) {
        setError(stripeError.message);
        setProcessing(false);
        return;
      }

      // For demo purposes, we'll simulate a successful payment
      setTimeout(() => {
        setSucceeded(true);
        setProcessing(false);
        clearCart();
        setTimeout(() => navigate('/order-success'), 2000);
      }, 1500);
      
    } catch (err) {
      setError(err.message);
      setProcessing(false);
    }
  };

  if (succeeded) {
    return (
      <div className="payment-success">
        <h3>Payment Successful!</h3>
        <p>Your order is being processed.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="payment-form">
      <h3>Payment Details</h3>
      
      <div className="card-element">
        <CardElement />
      </div>
      
      {error && <div className="payment-error">{error}</div>}
      
      <button 
        type="submit" 
        disabled={!stripe || processing}
        className="pay-btn"
      >
        {processing ? 'Processing...' : `Pay $${cartTotal.toFixed(2)}`}
      </button>
    </form>
  );
};

const Checkout = () => {
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (cart.length === 0) {
      navigate('/cart');
    }
  }, [cart, navigate]);

  if (cart.length === 0) {
    return null;
  }

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>
      <div className="checkout-container">
        <div className="order-summary">
          <h2>Order Summary</h2>
          <div className="order-items">
            {cart.map(item => (
              <div key={item.id} className="order-item">
                <div className="item-image">
                  <img src={item.image} alt={item.title} />
                </div>
                <div className="item-details">
                  <h4>{item.title}</h4>
                  <p>${item.price.toFixed(2)} x {item.quantity}</p>
                </div>
                <div className="item-total">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
          <div className="order-total">
            <span>Total:</span>
            <span>${cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}</span>
          </div>
        </div>
        
        <div className="payment-section">
          <Elements stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default Checkout;