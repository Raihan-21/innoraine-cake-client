import { Link } from "react-router-dom";
import { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../redux/reducer";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";

const Navbar = () => {
  const isLogged = useSelector((state) => state.auth.isLogged);
  const cartItems = useSelector((state) => state.auth.cartItems);
  const completedData = useSelector((state) => state.auth.completed);
  const dispatch = useDispatch();
  useEffect(() => {
    const getToken = async () => {
      const res = await fetch(
        "https://innoraine-cake-revamp.herokuapp.com/api/auth"
      );
      const data = await res.json();
      if (data.error) {
        console.log(data.error);
      } else {
        dispatch(login(data));
      }
    };
    getToken();
  }, [dispatch]);
  const checkLog = useCallback(() => {
    if (isLogged) {
      return (
        <div className="account">
          <Link to="cart">
            <div className="total">{cartItems}</div>
            <ShoppingCartIcon />
          </Link>
          <Link to="profile">
            <PersonIcon fontSize="large" />
            {}
          </Link>
        </div>
      );
    } else {
      return (
        <div className="account">
          <Link to="login">Login</Link>
          <Link to="register" className="register-btn">
            Register
          </Link>
        </div>
      );
    }
  }, [isLogged, cartItems]);
  return (
    <div className="navbar">
      <Link to="/">
        <h1>Innoraine Cake</h1>
      </Link>
      <div className="navigation">
        <Link to="/#">Home</Link>
        <a href="/#about">About Us</a>
        <Link to="products">Products</Link>
      </div>
      {!completedData && isLogged && (
        <div className="notice">
          Please complete your account data if you want to checkout
          <Link to="/profile">Go to profile</Link>
        </div>
      )}

      {checkLog()}
    </div>
  );
};
export default Navbar;
