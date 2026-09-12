import { Route, Routes } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import Home from "../pages/Home/Home";
import Shop from "../pages/Shop/Shop";
import ProductDetail from "../pages/Product/ProductDetail";
import CategoryProducts from "../pages/Category/CategoryProducts";
import Cart from "../pages/Cart/Cart";
import Checkout from "../pages/Checkout/Checkout";

function AppRoutes() {
    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/category/:id" element={<CategoryProducts />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
            </Route>
        </Routes>
    );
}

export default AppRoutes;
