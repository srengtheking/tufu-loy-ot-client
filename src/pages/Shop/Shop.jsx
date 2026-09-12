import { useMemo, useState } from "react";
import { useProducts } from "../../hooks/useProducts";
import { useCategories } from "../../hooks/useCategories";
import ProductGrid from "../../components/product/ProductGrid";
import Loading from "../../components/common/Loading";

function Shop() {
    const { products, loading, error } = useProducts();
    const { categories } = useCategories();
    const [categoryId, setCategoryId] = useState("all");

    const visibleProducts = useMemo(
        () => (categoryId === "all" ? products : products.filter((product) => product.categoryId === categoryId)),
        [products, categoryId],
    );

    return (
        <div className="page">
            <div className="page-header">
                <h1>Shop</h1>
                <p>Browse the full collection.</p>
            </div>

            <div className="shop-filters">
                <button type="button" className={categoryId === "all" ? "chip chip-active" : "chip"} onClick={() => setCategoryId("all")}>
                    All
                </button>
                {categories.map((category) => (
                    <button
                        type="button"
                        key={category.id}
                        className={categoryId === category.id ? "chip chip-active" : "chip"}
                        onClick={() => setCategoryId(category.id)}
                    >
                        {category.name}
                    </button>
                ))}
            </div>

            {loading && <Loading label="Loading products..." />}
            {!loading && error && <p className="empty-state-message">{error}</p>}
            {!loading && !error && <ProductGrid products={visibleProducts} />}
        </div>
    );
}

export default Shop;
