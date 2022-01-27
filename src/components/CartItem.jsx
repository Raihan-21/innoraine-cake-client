import { useCallback } from "react";
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";

const CartItem = ({ item, index, modifyQty, deleteItem }) => {
  const [isLoading, setIsLoading] = useState(false);
  const setLoading = useCallback(() => {
    setIsLoading((prevState) => !prevState);
  }, []);
  return (
    <div className={`item ${isLoading ? "loading" : ""}`}>
      <img
        src={`https://innoraine-cake-revamp.herokuapp.com/uploads/${item.image}`}
        alt="cake"
      ></img>
      <div className="main">
        <h2>{item.itemname}</h2>
        <p>{item.price}</p>
        <div className="quantity-edit">
          <button
            onClick={() =>
              modifyQty("decrement", index, item.price, item._id, setLoading)
            }
            disabled={item.quantity === 1 || isLoading ? true : false}
          >
            -
          </button>
          <div>{item.quantity}</div>
          <button
            onClick={() =>
              modifyQty("increment", index, item.price, item._id, setLoading)
            }
            disabled={isLoading ? true : false}
          >
            +
          </button>
          <button
            onClick={() => deleteItem(item._id, item.quantity, item.price)}
          >
            <DeleteIcon fontSize="small"></DeleteIcon>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
