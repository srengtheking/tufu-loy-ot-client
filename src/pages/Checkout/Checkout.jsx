import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useCart } from "../../hooks/useCart";
import { formatCurrency } from "../../utils/formatCurrency";

function generateOrderRef() {
    return `LOY-${Date.now().toString(36).toUpperCase()}`;
}

function Checkout() {
    const { items, subtotal, clear } = useCart();
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address1, setAddress1] = useState("");
    const [address2, setAddress2] = useState("");
    const [city, setCity] = useState("");
    const [region, setRegion] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [country, setCountry] = useState("");
    const [placed, setPlaced] = useState(null);

    if (items.length === 0 && !placed) {
        return <Navigate to="/cart" replace />;
    }

    function handleSubmit(event) {
        event.preventDefault();
        setPlaced({ reference: generateOrderRef(), total: subtotal, itemCount: items.reduce((sum, item) => sum + item.quantity, 0) });
        clear();
    }

    if (placed) {
        return (
            <div className="page">
                <div className="checkout-confirmation">
                    <span className="checkout-confirmation-icon">✓</span>
                    <h1>Order received</h1>
                    <p>
                        Thanks for your order. Your reference number is <strong>{placed.reference}</strong>. We'll reach out by email to confirm shipping
                        and payment details.
                    </p>
                    <p className="checkout-confirmation-total">
                        {placed.itemCount} {placed.itemCount === 1 ? "item" : "items"} · {formatCurrency(placed.total)}
                    </p>
                    <Link to="/shop" className="btn btn-primary">
                        Continue shopping
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="page">
            <div className="page-header">
                <h1>Checkout</h1>
                <p>Enter your details and we'll follow up to confirm shipping and payment.</p>
            </div>
            <form className="checkout-layout" onSubmit={handleSubmit}>
                <div className="checkout-form">
                    <section className="checkout-section">
                        <h2>Contact</h2>
                        <div className="field-grid">
                            <label className="field field-full">
                                <span>Email</span>
                                <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
                            </label>
                            <label className="field field-full">
                                <span>Phone</span>
                                <input type="tel" value={phone} onChange={(event) => setPhone(event.target.value)} />
                            </label>
                        </div>
                    </section>

                    <section className="checkout-section">
                        <h2>Shipping address</h2>
                        <div className="field-grid">
                            <label className="field field-full">
                                <span>Full name</span>
                                <input value={fullName} onChange={(event) => setFullName(event.target.value)} required />
                            </label>
                            <label className="field field-full">
                                <span>Address line 1</span>
                                <input value={address1} onChange={(event) => setAddress1(event.target.value)} required />
                            </label>
                            <label className="field field-full">
                                <span>Address line 2 (optional)</span>
                                <input value={address2} onChange={(event) => setAddress2(event.target.value)} />
                            </label>
                            <label className="field">
                                <span>City</span>
                                <input value={city} onChange={(event) => setCity(event.target.value)} required />
                            </label>
                            <label className="field">
                                <span>State / Region</span>
                                <input value={region} onChange={(event) => setRegion(event.target.value)} required />
                            </label>
                            <label className="field">
                                <span>Postal code</span>
                                <input value={postalCode} onChange={(event) => setPostalCode(event.target.value)} required />
                            </label>
                            <label className="field">
                                <span>Country</span>
                                <input value={country} onChange={(event) => setCountry(event.target.value)} required />
                            </label>
                        </div>
                    </section>
                </div>

                <aside className="checkout-summary">
                    <h2>Order summary</h2>
                    <div className="checkout-summary-items">
                        {items.map((item) => (
                            <div className="checkout-summary-line" key={`${item.productId}-${item.variantId ?? "base"}`}>
                                <div className="checkout-summary-line-image">
                                    {item.image ? <img src={item.image} alt={item.name} /> : null}
                                    <span className="checkout-summary-line-qty">{item.quantity}</span>
                                </div>
                                <div className="checkout-summary-line-info">
                                    <strong>{item.name}</strong>
                                    {item.variantLabel && <small>{item.variantLabel}</small>}
                                </div>
                                <span>{formatCurrency(item.price * item.quantity)}</span>
                            </div>
                        ))}
                    </div>
                    <div className="cart-summary-row">
                        <span>Subtotal</span>
                        <span>{formatCurrency(subtotal)}</span>
                    </div>
                    <p className="cart-summary-note">Shipping and any applicable taxes will be confirmed with you directly.</p>
                    <button type="submit" className="btn btn-primary btn-block">
                        Place order
                    </button>
                </aside>
            </form>
        </div>
    );
}

export default Checkout;
