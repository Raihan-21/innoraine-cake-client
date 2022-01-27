import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, useCallback } from "react";
import CartItem from "./CartItem";
import { useNavigate } from "react-router-dom";
import { modifyTotal } from "../redux/reducer";
import Summary from "./Summary";

const Cart = () => {
  const userid = useSelector((state) => state.auth.userid);
  const completeAcc = useSelector((state) => state.auth.completed);
  const [emptyCart, setEmptyCart] = useState(true);
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState({
    quantity: 0,
    price: 0,
  });
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const postModify = useCallback(
    async (quantity, price, itemid) => {
      const res = await fetch(`/api/cart/${userid}/edit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity, price, itemid }),
      });
      const data = await res.json();
      return data;
    },
    [userid]
  );
  const modifyQty = useCallback(
    async (type, index, price, itemid, setloading) => {
      setloading();
      if (type === "increment") {
        const data = await postModify(1, price, itemid);
        if (data.status.modifiedCount) {
          setItems(
            items.map((item, i) => {
              if (i === index) {
                item = { ...item, quantity: item.quantity + 1 };
              }
              return item;
            })
          );
        }
      }
      if (type === "decrement") {
        const data = await postModify(-1, -price, itemid);
        if (data.status.modifiedCount) {
          setItems(
            items.map((item, i) => {
              if (i === index) {
                item = { ...item, quantity: item.quantity - 1 };
              }
              return item;
            })
          );
        }
      }
      setloading();
    },
    [items, postModify]
  );
  const deleteItem = useCallback(
    async (itemid, quantity, price) => {
      const res = await fetch(`/api/cart/${userid}/delete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itemid, quantity, price }),
      });
      const data = await res.json();
      if (data.modifiedCount === 0) return;
      setItems(items.filter((item) => item._id !== itemid));
    },
    [userid, items]
  );
  const checkOut = useCallback(() => {
    if (completeAcc) navigate("/profile");
    navigate("/checkout");
  }, [completeAcc, navigate]);
  const checkCart = useCallback(() => {
    if (emptyCart) {
      return <h1>No items in your cart</h1>;
    } else {
      return (
        <div className="cart">
          <div className="items">
            {!loading &&
              items.map((item, i) => (
                <CartItem
                  key={i}
                  item={item}
                  index={i}
                  modifyQty={modifyQty}
                  deleteItem={deleteItem}
                />
              ))}
          </div>
          <Summary total={total} confirm={checkOut} />
        </div>
      );
    }
  }, [emptyCart, loading, items, total, modifyQty, deleteItem, checkOut]);

  useEffect(() => {
    const getData = async () => {
      const res = await fetch(`/api/cart/${userid}`);
      const data = await res.json();
      if (data.cart.userid) {
        setEmptyCart(false);
        setItems(data.cart.items);
      } else {
        setEmptyCart(true);
      }
      setLoading(false);
    };
    getData();
  }, [userid]);
  useEffect(() => {
    setTotal(
      items.reduce(
        (acc, curr) => {
          return {
            quantity: acc.quantity + curr.quantity,
            price: acc.price + curr.quantity * curr.price,
          };
        },
        { quantity: 0, price: 0 }
      )
    );
  }, [items]);
  useEffect(() => {
    dispatch(modifyTotal(total.quantity));
  }, [total, dispatch]);

  return (
    <div className="container">
      {loading ? <h3>Loading...</h3> : checkCart()}
    </div>
  );
};
export default Cart;
