import { Link } from "react-router-dom";
import { useCart } from "../../hooks/useCart";
import CartItem from "../../components/cart/CartItem";
import CartSummary from "../../components/cart/CartSummary";
import EmptyState from "../../components/common/EmptyState";

function Cart() {
    const { items, subtotal } = useCart();

    if (items.length === 0) {
        return (
            <div className="page">
                <div className="page-header">
                    <h1>Your cart</h1>
                </div>
                <EmptyState title="Your cart is empty" message="Browse the shop to find something you'll love." />
                <Link to="/shop" className="btn btn-primary">
                    Continue shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="page">
            <div className="page-header">
                <h1>Your cart</h1>
            </div>
            <div className="cart-layout">
                <div className="cart-items">
                    {items.map((item) => (
                        <CartItem key={`${item.productId}-${item.variantId ?? "base"}`} item={item} />
                    ))}
                </div>
                <CartSummary subtotal={subtotal} />
            </div>
        </div>
    );
}

export default Cart;
