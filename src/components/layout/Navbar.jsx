import { NavLink } from "react-router-dom";
import { useCart } from "../../hooks/useCart";
import logo from "../../assets/images/loy_ot_app_icon.png";

function Navbar() {
    const { itemCount } = useCart();

    return (
        <header className="navbar">
            <div className="navbar-inner">
                <NavLink to="/" className="navbar-brand" end>
                    <img src={logo} alt="" />
                    Loy Ot
                </NavLink>
                <nav className="navbar-nav">
                    <NavLink to="/" end>
                        Home
                    </NavLink>
                    <NavLink to="/shop">Shop</NavLink>
                </nav>
                <NavLink to="/cart" className="navbar-cart" aria-label="Cart">
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <circle cx="9" cy="21" r="1" />
                        <circle cx="20" cy="21" r="1" />
                        <path d="M1 1h4l2.4 12.4a2 2 0 0 0 2 1.6h9.2a2 2 0 0 0 2-1.6L23 6H6" />
                    </svg>
                    {itemCount > 0 && <span className="navbar-cart-badge">{itemCount}</span>}
                </NavLink>
            </div>
        </header>
    );
}

export default Navbar;
