import { useEffect, useMemo, useState } from "react";
import { CartContext } from "./cart-context";

const STORAGE_KEY = "loy-ot-cart";

function loadCart() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch {
        return [];
    }
}

function sameLine(a, b) {
    return a.productId === b.productId && a.variantId === b.variantId;
}

export function CartProvider({ children }) {
    const [items, setItems] = useState(loadCart);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }, [items]);

    function addItem(item, quantity = 1) {
        setItems((current) => {
            const existing = current.find((line) => sameLine(line, item));
            if (existing) {
                return current.map((line) =>
                    sameLine(line, item) ? { ...line, quantity: line.quantity + quantity } : line,
                );
            }
            return [...current, { ...item, quantity }];
        });
    }

    function removeItem(productId, variantId) {
        setItems((current) => current.filter((line) => !sameLine(line, { productId, variantId })));
    }

    function setQuantity(productId, variantId, quantity) {
        setItems((current) => {
            if (quantity <= 0) {
                return current.filter((line) => !sameLine(line, { productId, variantId }));
            }
            return current.map((line) =>
                sameLine(line, { productId, variantId }) ? { ...line, quantity } : line,
            );
        });
    }

    function clear() {
        setItems([]);
    }

    const itemCount = useMemo(() => items.reduce((total, line) => total + line.quantity, 0), [items]);
    const subtotal = useMemo(
        () => items.reduce((total, line) => total + line.price * line.quantity, 0),
        [items],
    );

    return (
        <CartContext.Provider value={{ items, itemCount, subtotal, addItem, removeItem, setQuantity, clear }}>
            {children}
        </CartContext.Provider>
    );
}
