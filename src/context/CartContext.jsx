import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItem, setCartItem] = useState(null); // Single product e-commerce cart item
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const addToCart = (product, selectedVariant, quantity) => {
    setCartItem({
      productId: product.id,
      productName: product.name,
      variantId: selectedVariant.id,
      shadeName: selectedVariant.name,
      colorHex: selectedVariant.color_hex,
      price: product.price,
      quantity: quantity,
      stock: selectedVariant.stock
    });
    setIsCartOpen(true);
    showToast(`Added ${quantity}x Luméa Glow Tint (${selectedVariant.name}) to your bag!`);
  };

  const updateQuantity = (newQty) => {
    if (!cartItem) return;
    if (newQty <= 0) {
      setCartItem(null);
    } else if (newQty <= cartItem.stock) {
      setCartItem({ ...cartItem, quantity: newQty });
    }
  };

  const removeFromCart = () => {
    setCartItem(null);
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  return (
    <CartContext.Provider
      value={{
        cartItem,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        updateQuantity,
        removeFromCart,
        toastMessage,
        showToast
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
