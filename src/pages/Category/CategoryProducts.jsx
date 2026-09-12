import { useEffect, useMemo, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { getErrorMessage } from "../../services/api";
import { getCategory } from "../../services/categoryService";
import { useProducts } from "../../hooks/useProducts";
import ProductGrid from "../../components/product/ProductGrid";
import Loading from "../../components/common/Loading";

function CategoryProducts() {
    const { id } = useParams();
    const categoryId = Number(id);
    const { products, loading: productsLoading } = useProducts();

    const [category, setCategory] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!Number.isFinite(categoryId)) return;
        let cancelled = false;
        getCategory(categoryId)
            .then((data) => {
                if (!cancelled) setCategory(data);
            })
            .catch((requestError) => {
                if (!cancelled) setError(getErrorMessage(requestError, "Could not load this category."));
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            });
        return () => {
            cancelled = true;
        };
    }, [categoryId]);

    const categoryProducts = useMemo(() => products.filter((product) => product.categoryId === categoryId), [products, categoryId]);

    if (!Number.isFinite(categoryId)) return <Navigate to="/shop" replace />;
    if (loading) return <div className="page"><Loading label="Loading category..." /></div>;
    if (error || !category) return <div className="page"><p className="empty-state-message">{error ?? "Category not found."}</p></div>;

    return (
        <div className="page">
            <div className="page-header">
                <h1>{category.name}</h1>
                {category.description && <p>{category.description}</p>}
            </div>
            {productsLoading ? <Loading label="Loading products..." /> : <ProductGrid products={categoryProducts} />}
        </div>
    );
}

export default CategoryProducts;
