import { Link } from "react-router-dom";
import { formatCurrency } from "../../utils/formatCurrency";

function CartSummary({ subtotal }) {
    return (
        <div className="cart-summary">
            <h2>Order summary</h2>
            <div className="cart-summary-row">
                <span>Subtotal</span>
                <span>{formatCurrency(subtotal)}</span>
            </div>
            <p className="cart-summary-note">Shipping calculated at checkout.</p>
            <Link to="/checkout" className="btn btn-primary btn-block">
                Checkout
            </Link>
        </div>
    );
}

export default CartSummary;
