import { Button } from "@mui/material";

const Summary = ({ total, confirm }) => {
  return (
    <div className="summary">
      <h2>Summary:</h2>
      <div className="total total=item">
        Total items: <span>{total.quantity}</span>{" "}
      </div>
      <div className="total total-price">
        Total Price: <span>{total.price}</span>{" "}
      </div>
      <Button variant="contained" fullWidth onClick={confirm}>
        Proceed
      </Button>
    </div>
  );
};

export default Summary;
