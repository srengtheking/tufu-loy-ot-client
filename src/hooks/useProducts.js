import { useEffect, useState } from "react";
import { getErrorMessage } from "../services/api";
import { getProducts } from "../services/productService";

export function useProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let cancelled = false;
        getProducts()
            .then((data) => {
                if (!cancelled) setProducts(data.filter((product) => product.status !== "DRAFT" && product.status !== "ARCHIVED"));
            })
            .catch((requestError) => {
                if (!cancelled) setError(getErrorMessage(requestError, "Could not load products."));
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            });
        return () => {
            cancelled = true;
        };
    }, []);

    return { products, loading, error };
}
