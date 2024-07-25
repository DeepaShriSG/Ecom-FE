import React, { useContext, createContext, useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { ProductDataCxt } from './ProductDataContext';

export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {

  const Productdata = useContext(ProductDataCxt);

  // const location = useLocation();
  // const { Productid, quantity,price } = location.state || {};

  const [cart, setCart] = useState(() => {
    // Get the cart from session storage if it exists
    const savedCart = sessionStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    sessionStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);
  
  const addToCart = (product) => {
    setCart(prevCart => {
      const existingProductIndex = prevCart.findIndex(item => item._id === product._id);
      if (existingProductIndex !== -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingProductIndex].quantity += product.quantity;
        return updatedCart;
      } else {
        return [...prevCart, { ...product, price: product.price }];
      }
    });
  };

  const updateCart = (Productid, quantity) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item._id === Productid ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  const removeFromCart = (Productid) => {
    setCart(prevCart => prevCart.filter(item => item._id !== Productid));
  };

   // Function to clear the cart
   const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cart');
  };

  const calculateSubTotal = useMemo(() => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cart]);

  const calculateBagMRP = useMemo(() => {
    return calculateSubTotal * 1.5;
  }, [calculateSubTotal]);

  const calculateBagDiscount = useMemo(() => {
    return calculateBagMRP * 0.3;
  }, [calculateBagMRP]);

  const shipping = 70;
  const total = calculateSubTotal - calculateBagDiscount + shipping;

  return (
    <CartContext.Provider value={{
      cart, addToCart, updateCart, removeFromCart,clearCart,
      calculateSubTotal, calculateBagMRP, calculateBagDiscount, shipping, total
    }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;

export const useCart = () => {
  return useContext(CartContext);
};
