import { useEffect, useState } from "react";
import { getErrorMessage } from "../services/api";
import { getCategories } from "../services/categoryService";

export function useCategories() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let cancelled = false;
        getCategories()
            .then((data) => {
                if (!cancelled) setCategories(data.filter((category) => category.active));
            })
            .catch((requestError) => {
                if (!cancelled) setError(getErrorMessage(requestError, "Could not load categories."));
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            });
        return () => {
            cancelled = true;
        };
    }, []);

    return { categories, loading, error };
}
