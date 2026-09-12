import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { getErrorMessage } from "../../services/api";
import { getProduct } from "../../services/productService";
import { useCart } from "../../hooks/useCart";
import { formatCurrency } from "../../utils/formatCurrency";
import Loading from "../../components/common/Loading";

function ProductDetail() {
    const { id } = useParams();
    const productId = Number(id);
    const { addItem } = useCart();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeImage, setActiveImage] = useState(null);
    const [variantId, setVariantId] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [added, setAdded] = useState(false);

    useEffect(() => {
        if (!Number.isFinite(productId)) return;
        let cancelled = false;
        getProduct(productId)
            .then((data) => {
                if (cancelled) return;
                if (data.status === "DRAFT" || data.status === "ARCHIVED") {
                    setError("Product not found.");
                    return;
                }
                setProduct(data);
                const primary = data.images.find((image) => image.primary) ?? data.images[0];
                setActiveImage(primary?.imageUrl ?? null);
            })
            .catch((requestError) => {
                if (!cancelled) setError(getErrorMessage(requestError, "Could not load this product."));
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            });
        return () => {
            cancelled = true;
        };
    }, [productId]);

    if (!Number.isFinite(productId)) return <Navigate to="/shop" replace />;
    if (loading) return <div className="page"><Loading label="Loading product..." /></div>;
    if (error || !product) return <div className="page"><p className="empty-state-message">{error ?? "Product not found."}</p></div>;

    const selectedVariant = product.variants.find((variant) => variant.id === variantId);
    const hasVariants = product.variants.length > 0;
    const effectivePrice = selectedVariant?.price ?? product.discountPrice ?? product.price;
    const outOfStock = hasVariants
        ? selectedVariant
            ? selectedVariant.status === "OUT_OF_STOCK" || (selectedVariant.stock ?? 0) <= 0
            : false
        : product.status === "OUT_OF_STOCK" || product.stock <= 0;
    const canAddToCart = !outOfStock && (!hasVariants || Boolean(selectedVariant));

    function handleAddToCart() {
        if (!product || !canAddToCart) return;
        addItem(
            {
                productId: product.id,
                variantId: selectedVariant?.id ?? null,
                name: product.name,
                image: activeImage,
                price: effectivePrice,
                variantLabel: selectedVariant ? `${selectedVariant.size} / ${selectedVariant.color}` : null,
            },
            quantity,
        );
        setAdded(true);
    }

    return (
        <div className="page">
            <Link to="/shop" className="back-link">
                ← Back to shop
            </Link>
            <div className="product-detail">
                <div className="product-detail-gallery">
                    <div className="product-detail-main-image">
                        {activeImage ? <img src={activeImage} alt={product.name} /> : <div className="product-card-placeholder">{product.name.slice(0, 2).toUpperCase()}</div>}
                    </div>
                    {product.images.length > 1 && (
                        <div className="product-detail-thumbs">
                            {product.images.map((image) => (
                                <button
                                    type="button"
                                    key={image.id}
                                    className={image.imageUrl === activeImage ? "product-detail-thumb product-detail-thumb-active" : "product-detail-thumb"}
                                    onClick={() => setActiveImage(image.imageUrl)}
                                >
                                    <img src={image.imageUrl} alt="" />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <div className="product-detail-info">
                    {product.categoryName && <span className="product-card-category">{product.categoryName}</span>}
                    <h1>{product.name}</h1>
                    <div className="product-detail-price">
                        <strong>{formatCurrency(effectivePrice)}</strong>
                        {product.discountPrice != null && !selectedVariant?.price && <span className="product-card-strike">{formatCurrency(product.price)}</span>}
                    </div>
                    {product.description && <p className="product-detail-description">{product.description}</p>}

                    {hasVariants && (
                        <div className="product-detail-variants">
                            <span className="field-label">Options</span>
                            <div className="variant-options">
                                {product.variants.map((variant) => {
                                    const disabled = variant.status === "OUT_OF_STOCK" || (variant.stock ?? 0) <= 0;
                                    return (
                                        <button
                                            type="button"
                                            key={variant.id}
                                            className={variant.id === variantId ? "chip chip-active" : "chip"}
                                            onClick={() => setVariantId(variant.id)}
                                            disabled={disabled}
                                        >
                                            {variant.size} / {variant.color}
                                            {disabled ? " (out of stock)" : ""}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    <div className="product-detail-qty">
                        <span className="field-label">Quantity</span>
                        <div className="qty-stepper">
                            <button type="button" onClick={() => setQuantity((current) => Math.max(1, current - 1))} aria-label="Decrease quantity">
                                −
                            </button>
                            <span>{quantity}</span>
                            <button type="button" onClick={() => setQuantity((current) => current + 1)} aria-label="Increase quantity">
                                +
                            </button>
                        </div>
                    </div>

                    <button type="button" className="btn btn-primary btn-block" onClick={handleAddToCart} disabled={!canAddToCart}>
                        {outOfStock ? "Out of stock" : hasVariants && !selectedVariant ? "Select an option" : "Add to cart"}
                    </button>
                    {added && <p className="product-detail-added">Added to your cart.</p>}
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;
