import { createContext, useContext, useState } from "react";
import styles from "./useCartContext.module.css";

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);
    const [message, setMessage] = useState(null);

    const showToast = (msg) => {
        setMessage(msg);
        setTimeout(() => setMessage(null), 3000);
    };

    const addToCart = (itemToAdd) => {
        setCartItems((prevItems) => {
            const exists = prevItems.find((item) => item._id === itemToAdd._id);
            if (!exists) {
                showToast("Item added to cart!");
                return [...prevItems, { ...itemToAdd, quantity: 1 }];
            }
            showToast("Item already in cart!");
            return prevItems;
        });
    };

    const removeFromCart = (itemId) => {
        setCartItems((prevItems) => {
            const newCart = prevItems.filter((item) => item._id !== itemId);
            showToast("Item removed from cart!");
            return newCart;
        });
    };

    const updateCartItems = (items) => setCartItems(items);
    const clearCart = () => setCartItems([]);

    return (
        <CartContext.Provider value={{ removeFromCart, addToCart, cartItems, updateCartItems, clearCart, message, showToast }}>
            {children}
            {message && <div className={styles.toast}>{message}</div>}
        </CartContext.Provider>
    );
}

export const useCartContext = () => useContext(CartContext);