import { Link } from "react-router-dom";
import { useProducts } from "../../hooks/useProducts";
import { useCategories } from "../../hooks/useCategories";
import ProductGrid from "../../components/product/ProductGrid";
import CategoryCard from "../../components/category/CategoryCard";
import Loading from "../../components/common/Loading";
import heroImg from "../../assets/images/loy_ot_horizontal_thickring_transparent.png";

function Home() {
    const { products, loading: productsLoading, error: productsError } = useProducts();
    const { categories, loading: categoriesLoading } = useCategories();

    const featuredProducts = products.slice(0, 8);

    return (
        <div className="page">
            <section className="hero-section">
                <div className="hero-copy">
                    <h1>Style that finds you.</h1>
                    <p>Discover the latest arrivals, curated collections, and everyday essentials.</p>
                    <Link to="/shop" className="btn btn-primary">
                        Shop now
                    </Link>
                </div>
                <img src={heroImg} alt="" className="hero-image" />
            </section>

            {!categoriesLoading && categories.length > 0 && (
                <section className="section">
                    <h2 className="section-title">Shop by category</h2>
                    <div className="category-grid">
                        {categories.map((category) => (
                            <CategoryCard key={category.id} category={category} />
                        ))}
                    </div>
                </section>
            )}

            <section className="section">
                <div className="section-heading">
                    <h2 className="section-title">Featured products</h2>
                    <Link to="/shop" className="section-link">
                        View all
                    </Link>
                </div>
                {productsLoading && <Loading label="Loading products..." />}
                {!productsLoading && productsError && <p className="empty-state-message">{productsError}</p>}
                {!productsLoading && !productsError && <ProductGrid products={featuredProducts} />}
            </section>
        </div>
    );
}

export default Home;
