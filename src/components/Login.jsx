import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/reducer";
import Textfield from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { CircularProgress } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Email must be a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(5, "Password must be at least 5 characters")
    .required("Password is required"),
});
const Login = () => {
  const [errorMsg, setErrorMsg] = useState({
    email: "",
    password: "",
  });
  const [clicked, setClicked] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className="container login">
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={schema}
        onSubmit={async (values, action) => {
          setClicked(true);
          const res = await fetch("/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
          });
          const data = await res.json();
          if (data.error) {
            setErrorMsg(data.error);
            setClicked(false);
          } else {
            dispatch(login(data));
            navigate("/");
          }
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <h1>Login</h1>
            <Textfield
              name="email"
              variant="outlined"
              label="Email"
              fullWidth
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={
                (touched.email && errors.email) || errorMsg.email ? true : false
              }
              helperText={
                touched.email && errors.email ? errors.email : errorMsg.email
              }
              required
            />{" "}
            <br /> <br />
            <Textfield
              name="password"
              variant="outlined"
              label="Password"
              fullWidth
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={
                (touched.password && errors.password) || errorMsg.password
                  ? true
                  : false
              }
              helperText={
                touched.password && errors.password
                  ? errors.password
                  : errorMsg.password
              }
              type="password"
              required
            />
            <br /> <br />
            <Button type="submit" variant="contained" color="primary">
              {clicked ? (
                <CircularProgress
                  color="secondary"
                  size={26}
                ></CircularProgress>
              ) : (
                "Login"
              )}
            </Button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
