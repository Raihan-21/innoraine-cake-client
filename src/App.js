import "./styles/App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Products from "./components/Products";
import Product from "./components/Product";
import Login from "./components/Login";
import Register from "./components/Register";
import { createTheme, ThemeProvider } from "@mui/material";
import Cart from "./components/Cart";
import User from "./components/User/User";
import Checkout from "./components/Checkout";

const theme = createTheme({
  palette: {
    primary: {
      main: "#fca400",
    },
    secondary: {
      main: "#ffca68",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="products" element={<Products />} />
            <Route path="products/:id" element={<Product />} />
            <Route path="cart" element={<Cart />} />
            <Route path="profile" element={<User />} />
            <Route path="checkout" element={<Checkout />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
