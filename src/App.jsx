import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import AppRoutes from "./routes/AppRoutes";
import "./App.css";

function App() {
    return (
        <CartProvider>
            <BrowserRouter>
                <AppRoutes />
            </BrowserRouter>
        </CartProvider>
    );
}

export default App;
