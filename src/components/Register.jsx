import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import Textfield from "@mui/material/TextField";
import Button from "@mui/material/Button";
import * as yup from "yup";
import Swal from "sweetalert2";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Email must be a valid email")
    .required("Email is required"),
  username: yup.string().required("Username is required"),
  phone: yup
    .number()
    .typeError("Phone must be in numbers")
    .required("Phone is required"),
  password: yup
    .string()
    .min(5, "Password must be at least 5 characters")
    .required("Password is required"),
});

const Register = () => {
  const [errorMsg, setErrorMsg] = useState({
    email: "",
    username: "",
    phone: "",
    password: "",
  });
  const navigate = useNavigate();
  return (
    <div className="container register">
      <Formik
        initialValues={{
          email: "",
          username: "",
          phone: "",
          password: "",
        }}
        validationSchema={schema}
        onSubmit={async (values, action) => {
          const res = await fetch("/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
          });
          const data = await res.json();
          if (data.error) {
            if (data.error.code === 11000) {
              setErrorMsg({ ...errorMsg, email: "Email has been taken" });
            }
          } else {
            Swal.fire({
              title: "Account created!",
              showConfirmButton: false,
              icon: "success",
              timer: 1000,
            });
            setTimeout(() => {
              navigate("/login");
            }, 1000);
          }
        }}
      >
        {({ touched, errors, handleChange, handleBlur, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <h1>Register</h1> <br /> <br />
            <Textfield
              label="Email"
              name="email"
              variant="outlined"
              onBlur={handleBlur}
              onChange={handleChange}
              error={
                (touched.email && errors.email) || errorMsg.email ? true : false
              }
              helperText={
                touched.email && errors.email ? errors.email : errorMsg.email
              }
              fullWidth
              required
            />{" "}
            <br /> <br />
            <Textfield
              label="Username"
              name="username"
              variant="outlined"
              onBlur={handleBlur}
              onChange={handleChange}
              error={touched.username && errors.username ? true : false}
              helperText={touched.username && errors.username}
              fullWidth
              required
            />
            <br /> <br />
            <Textfield
              label="Phone"
              name="phone"
              variant="outlined"
              onBlur={handleBlur}
              onChange={handleChange}
              error={touched.phone && errors.phone ? true : false}
              helperText={touched.phone && errors.phone}
              fullWidth
              required
            />
            <br /> <br />
            <Textfield
              label="Password"
              name="password"
              variant="outlined"
              onBlur={handleBlur}
              onChange={handleChange}
              error={touched.password && errors.password ? true : false}
              helperText={touched.password && errors.password}
              fullWidth
              required
            />{" "}
            <br /> <br />
            <Button type="submit" variant="contained">
              Register
            </Button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default Register;
