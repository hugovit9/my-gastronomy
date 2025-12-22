import { createContext, useContext, useState } from "react";

const CartContext = createContext()

export function CartProvider({children}){
    const [cartItems, setCartItems] = useState();

    const addToCart = (itemToAdd) =>{

    }
    
    
    const removeFromCart = (itemId) =>{

    }

    return(
        <CartContext.Provider value={{ removeFromCart, addToCart, cartItems}}>
            {children}
        </CartContext.Provider>
    )
}


export const useCartContext = () =>{
    const context = useContext(CartContext)

    if(!context){
        console.log('you are out of CartContext')
    }

    return context
}