import { useCart } from "../../hooks/useCart";
import { formatCurrency } from "../../utils/formatCurrency";

function CartItem({ item }) {
    const { setQuantity, removeItem } = useCart();

    return (
        <div className="cart-line">
            <div className="cart-line-image">
                {item.image ? <img src={item.image} alt={item.name} /> : <div className="cart-line-placeholder" />}
            </div>
            <div className="cart-line-info">
                <strong>{item.name}</strong>
                {item.variantLabel && <small>{item.variantLabel}</small>}
                <span className="cart-line-price">{formatCurrency(item.price)}</span>
            </div>
            <div className="cart-line-qty">
                <button type="button" onClick={() => setQuantity(item.productId, item.variantId, item.quantity - 1)} aria-label="Decrease quantity">
                    −
                </button>
                <span>{item.quantity}</span>
                <button type="button" onClick={() => setQuantity(item.productId, item.variantId, item.quantity + 1)} aria-label="Increase quantity">
                    +
                </button>
            </div>
            <div className="cart-line-total">{formatCurrency(item.price * item.quantity)}</div>
            <button type="button" className="cart-line-remove" onClick={() => removeItem(item.productId, item.variantId)} aria-label={`Remove ${item.name}`}>
                Remove
            </button>
        </div>
    );
}

export default CartItem;
