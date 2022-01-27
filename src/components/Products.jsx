import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import useFetch from "../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";

const Products = () => {
  const [data, isLoading] = useFetch("/api/products");
  const [quantity, setQuantity] = useState(1);
  const userid = useSelector((state) => state.auth.userid);
  const navigate = useNavigate();
  const addCart = useCallback(
    async (item) => {
      if (userid) {
        const addedItem = {
          ...item,
          quantity: Number(quantity),
          price: item.price * Number(quantity),
        };
        const res = await fetch(`/api/cart/${userid}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ addedItem }),
        });
        const data = await res.json();
      } else {
        navigate("/login");
      }
    },
    [navigate, quantity, userid]
  );

  return (
    <div className="container products">
      {isLoading ? (
        <CircularProgress></CircularProgress>
      ) : (
        data.products.map((product) => (
          <div className="product" key={product._id}>
            <img
              src={`http://localhost:5000/uploads/${product.image}`}
              alt="item"
              loading="lazy"
            ></img>
            <div className="text">
              <Link to={`/products/${product._id}`}>
                <h1>{product.itemname}</h1>
              </Link>
              <p>{product.desc}</p>
              <div className="add">
                <input
                  type="number"
                  name=""
                  id=""
                  value={quantity}
                  min={1}
                  onChange={(e) => setQuantity(e.target.value)}
                />
                <button
                  onClick={() => {
                    addCart(product);
                  }}
                >
                  Add to cart
                </button>
                <p className="price">Rp. {product.price}</p>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Products;
