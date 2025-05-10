import { createContext, useContext, useState, ReactNode } from "react";
import { Produto } from "@/types/produto";

type CartItem = Produto;

interface CartContextType {
    items: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: number) => void;
    clearCart: () => void;
    getQuantity: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [items, setItems] = useState<CartItem[]>([]);

    const addToCart = (item: CartItem) => {
        setItems((prev) => [...prev, item]);
    };

    const removeFromCart = (id: number) => {
        setItems((prev) => prev.filter((item) => item.id !== id));
    };

    const clearCart = () => setItems([]);

    const getQuantity = () => items.length;

    return (
        <CartContext.Provider value={{ items, addToCart, removeFromCart, clearCart, getQuantity}}>
            { children }
        </CartContext.Provider>
    );

};

export const useCart = () => {
    const context = useContext(CartContext);
    if(!context) throw new Error("useCart deve ser usado dentro de um CartProvider");
    return context;
}