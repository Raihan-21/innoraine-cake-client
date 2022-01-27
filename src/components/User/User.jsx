import { Collapse } from "@mui/material";
import { useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Orders from "./Orders";
import Profile from "./Profile";
import { logout } from "../../redux/reducer";

const User = () => {
  const userid = useSelector((state) => state.auth.userid);
  const [data, isLoading] = useFetch(`/api/profile/${userid}`);
  const [tab, setTab] = useState("profile");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logoutRedux = useCallback(async () => {
    const res = await fetch("/api/logout");
    const data = await res.json();
    dispatch(logout());
    navigate("/");
  }, [navigate, dispatch]);
  return (
    <div className="container account">
      <h2 className="username">{!isLoading && data.user.username}</h2>
      {!isLoading && (
        <div className="account-data">
          <div className="tabs">
            <div
              className={`tab ${tab === "profile" ? "active" : ""}`}
              onClick={() => setTab("profile")}
            >
              Profile
            </div>
            <div
              className={`tab ${tab === "orders" ? "active" : ""}`}
              onClick={() => setTab("orders")}
            >
              Order History
            </div>
            <div className="tab" onClick={logoutRedux}>
              Logout
            </div>
          </div>
          <div className="section">
            <Collapse in={tab === "profile"}>
              <Profile user={data.user} />
            </Collapse>
            <Collapse in={tab === "orders"}>
              <Orders />
            </Collapse>
          </div>
        </div>
      )}
    </div>
  );
};

export default User;
