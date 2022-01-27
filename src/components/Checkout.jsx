import { Formik } from "formik";
import { TextField, Button, Slide } from "@mui/material";
import { useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import Summary from "./Summary";
import { useNavigate, Link } from "react-router-dom";

const Checkout = () => {
  const userid = useSelector((state) => state.auth.userid);
  const [data, isLoading] = useFetch(`/api/checkout/${userid}`);
  const [minDate, setMinDate] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const navigate = useNavigate();
  const pay = useCallback(() => {
    navigate("/products");
  }, [navigate]);
  useEffect(() => {
    const today = new Date();
    const tomorrow = new Date(today.setDate(today.getDate() + 1));
    setMinDate(tomorrow.toISOString().substring(0, 10));
  }, []);
  return (
    <div className="container checkout">
      {!isLoading && (
        <>
          <Formik
            initialValues={{
              receiver: data.user.username,
              date: "",
              address: data.user.address.detail,
              kelurahan: data.user.address.kelurahan,
              kecamatan: data.user.address.kecamatan,
              kota: data.user.address.city,
            }}
            onSubmit={(values) => {
              setConfirmed(true);
            }}
          >
            {({ values, handleChange, handleSubmit }) => (
              <Slide in={!confirmed} direction="right" timeout={400}>
                <form
                  action=""
                  onSubmit={handleSubmit}
                  className={`confirm ${!confirmed ? "active" : ""}`}
                >
                  <h2>Confirm Data</h2>
                  <div className="data">
                    <TextField
                      label="Receiver"
                      name="receiver"
                      onChange={handleChange}
                      value={values.receiver}
                    />
                    <TextField
                      label="Order Date"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      name="date"
                      type="date"
                      onChange={handleChange}
                      InputProps={{
                        inputProps: {
                          min: minDate,
                        },
                      }}
                      required
                    />
                  </div>
                  <div className="address">
                    <h3>Address</h3>
                    <TextField
                      label="Address"
                      name="address"
                      value={values.address}
                    />
                    <TextField
                      label="Kelurahan"
                      name="kelurahan"
                      value={values.kelurahan}
                    />{" "}
                    <br /> <br />
                    <TextField
                      label="Kecamatan"
                      name="kecamatan"
                      value={values.kecamatan}
                    />
                    <TextField label="Kota" name="kota" value={values.kota} />{" "}
                  </div>

                  <Button variant="contained" type="submit">
                    Confirm
                  </Button>
                </form>
              </Slide>
            )}
          </Formik>
          <Slide
            in={confirmed}
            direction="left"
            timeout={{
              appear: 400,
              enter: 600,
              exit: 400,
            }}
            mountOnEnter
            unmountOnExit
          >
            <div className={`items-data ${confirmed ? "active" : ""}`}>
              <div className="items">
                {data.items.items.map((item, i) => (
                  <div className="item" key={i}>
                    <img
                      src={`http://localhost:5000/uploads/${item.image}`}
                      alt=""
                    />
                    <div className="main">
                      <h3>{item.itemname}</h3>
                      <p>
                        {item.price} x {item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <Summary
                total={{
                  quantity: data.items.totalquantity,
                  price: data.items.totalprice,
                }}
                confirm={pay}
              />
              <div className="summary-btn">
                <Button variant="contained" onClick={() => setConfirmed(false)}>
                  Go back
                </Button>
                <Link to="/cart">
                  <Button variant="contained">Cancel</Button>
                </Link>
              </div>
            </div>
          </Slide>
        </>
      )}
    </div>
  );
};

export default Checkout;
