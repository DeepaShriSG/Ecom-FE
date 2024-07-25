import React, { useState } from 'react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { useCart } from "../Context/CartContext";

// Component to display the cart summary
const CartSummary = () => {
  // Retrieve the cart items from the CartContext
  const { cart } = useCart();

  return (
    <ul>
      {cart.map((item) => (
        <li key={item.id}>
          {/* Display each item in the cart with quantity */}
          {item.name} x {item.quantity}
        </li>
      ))}
    </ul>
  );
};

const Checkout = () => {
  // Stripe and Elements hooks from @stripe/react-stripe-js
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState(null);

  // Retrieve the clearCart function from CartContext
  const { clearCart } = useCart();

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if Stripe and Elements are loaded
    if (!elements || !stripe) {
      return;
    }

    // Confirm the payment with Stripe
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: 'http://localhost:5173/success', // URL to redirect to after payment
      },
    });

    // Handle any errors that occur during payment
    if (error) {
      setErrorMessage(error.message);
    } else if (paymentIntent.status === 'succeeded') {
      // Clear the cart and navigate to success page on successful payment
      clearCart();
      navigate("/success");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Stripe PaymentElement to handle payment details input */}
      <PaymentElement />
      {/* Render CartSummary component to show cart items */}
      <CartSummary />
      {/* Submit button to process payment */}
      <button type="submit" disabled={!stripe || !elements}>
        Pay
      </button>
      {/* Display any error messages */}
      {errorMessage && <div>{errorMessage}</div>}
    </form>
  );
};

export default Checkout;
