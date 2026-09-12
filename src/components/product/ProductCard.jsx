import { Link } from "react-router-dom";
import { useCart } from "../../hooks/useCart";
import { formatCurrency } from "../../utils/formatCurrency";

function primaryImage(product) {
    const primary = product.images.find((image) => image.primary);
    return primary?.imageUrl ?? product.images[0]?.imageUrl ?? null;
}

function ProductCard({ product }) {
    const { addItem } = useCart();
    const image = primaryImage(product);
    const hasVariants = product.variants.length > 0;
    const effectivePrice = product.discountPrice ?? product.price;
    const outOfStock = product.status === "OUT_OF_STOCK" || product.stock <= 0;
    const discountPercent = product.discountPrice != null ? Math.round((1 - product.discountPrice / product.price) * 100) : null;

    function handleAddToCart() {
        addItem({
            productId: product.id,
            variantId: null,
            name: product.name,
            image,
            price: effectivePrice,
            variantLabel: null,
        });
    }

    return (
        <div className={outOfStock ? "product-card product-card-disabled" : "product-card"}>
            <Link to={`/product/${product.id}`} className="product-card-image">
                {image ? <img src={image} alt={product.name} /> : <div className="product-card-placeholder">{product.name.slice(0, 2).toUpperCase()}</div>}
                {outOfStock && <span className="product-card-tag">Out of stock</span>}
                {!outOfStock && discountPercent != null && <span className="product-card-discount">-{discountPercent}%</span>}
            </Link>
            <div className="product-card-body">
                {product.categoryName && <span className="product-card-category">{product.categoryName}</span>}
                <Link to={`/product/${product.id}`} className="product-card-name">
                    {product.name}
                </Link>
                <div className="product-card-price">
                    <strong>{formatCurrency(effectivePrice)}</strong>
                    {product.discountPrice != null && <span className="product-card-strike">{formatCurrency(product.price)}</span>}
                </div>
                <div className="product-card-action">
                    {hasVariants ? (
                        <Link to={`/product/${product.id}`} className="btn btn-outline">
                            View options
                        </Link>
                    ) : (
                        <button type="button" className="btn btn-primary" onClick={handleAddToCart} disabled={outOfStock}>
                            {outOfStock ? "Out of stock" : "Add to cart"}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ProductCard;
