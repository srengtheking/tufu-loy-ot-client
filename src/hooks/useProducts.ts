import { useEffect, useState } from "react";
import api from "../services/api";
import type { Product } from "../types/Product";

export function useProducts() {

    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get("/products")
            .then(response => {
                setProducts(response.data);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return {
        products,
        loading
    };
}