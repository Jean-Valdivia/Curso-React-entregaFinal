import { createContext, useContext, useState } from "react";

export const CartContext = createContext([]);

export const useCartContext = () => useContext(CartContext);


const CartProvider = ({ children }) => {
    const [cart, setCart] = useState({ items: [], total: 0 })

    const addToCart = (product) => {
        const existingProduct = cart.items.find((p) => p.id === product.id);
        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            setCart((prevCart) => ({
                ...prevCart, items: [...prevCart.items, product],
                total: prevCart.total + product.price * product.quantity
            }));
        }
    }

    const removeFromCart = (index) => {
        setCart((prevCart) => ({
            ...prevCart, items: prevCart.items.slice(0, index).concat(prevCart.items.slice(index + 1)),
            total: prevCart.total - prevCart.items[index].price * prevCart.items[index].quantity
        }))
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, setCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
        
    )
}
export default CartProvider;