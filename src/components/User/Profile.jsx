import { Formik } from "formik";
import { Button, TextField } from "@mui/material";
import * as yup from "yup";
import { dataIsComplete } from "../../redux/reducer";
import { useDispatch } from "react-redux";

const schema = yup.object().shape({
  username: yup.string().required(),
  email: yup.string().email().required(),
  address: yup.string().required(),
  kelurahan: yup.string().required(),
  kecamatan: yup.string().required(),
  kota: yup.string().required(),
});

const Profile = ({ user }) => {
  const dispatch = useDispatch();
  return (
    <div className="profile">
      <h2>Profile</h2>
      <Formik
        initialValues={{
          username: user.username,
          email: user.email,
          address: user.address.detail,
          kelurahan: user.address.kelurahan,
          kecamatan: user.address.kecamatan,
          kota: user.address.city,
        }}
        validationSchema={schema}
        onSubmit={async (values) => {
          const res = await fetch(`/api/profile/${user._id}/update`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
          });
          const data = await res.json();
          dispatch(dataIsComplete());
        }}
      >
        {({
          values,
          touched,
          errors,
          handleSubmit,
          handleChange,
          handleBlur,
        }) => (
          <form action="" onSubmit={handleSubmit}>
            <TextField
              label="Username"
              name="username"
              variant="outlined"
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.username && touched.username ? true : false}
              helperText={
                errors.username && touched.username ? errors.username : ""
              }
              value={values.username}
              required
            />{" "}
            <br /> <br />
            <TextField
              label="Email"
              name="email"
              variant="outlined"
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.email && touched.email ? true : false}
              helperText={errors.email && touched.email ? errors.email : ""}
              required
              value={values.email}
            />
            <div className="address">
              <h4>Address</h4>
              <TextField
                label="Alamat"
                name="address"
                variant="outlined"
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.address && touched.address ? true : false}
                helperText={
                  errors.address && touched.address ? errors.address : ""
                }
                value={values.address}
                required
              />
              <TextField
                label="Kelurahan"
                name="kelurahan"
                variant="outlined"
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.kelurahan && touched.kelurahan ? true : false}
                helperText={
                  errors.kelurahan && touched.kelurahan ? errors.kelurahan : ""
                }
                value={values.kelurahan}
                required
              />
              <br /> <br />
              <TextField
                label="Kecamatan"
                name="kecamatan"
                variant="outlined"
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.kecamatan && touched.kecamatan ? true : false}
                helperText={
                  errors.kecamatan && touched.kecamatan ? errors.kecamatan : ""
                }
                value={values.kecamatan}
                required
              />
              <TextField
                label="Kota"
                name="kota"
                variant="outlined"
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.kota && touched.kota ? true : false}
                helperText={errors.kota && touched.kota ? errors.kota : ""}
                required
                value={values.kota}
              />{" "}
              <br /> <br />
              <Button variant="contained" type="submit">
                Save
              </Button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default Profile;
