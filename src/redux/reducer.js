import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogged: false,
  userid: "",
  username: "",
  cartItems: 0,
  completed: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      const { user, totalItems } = action.payload;
      state.isLogged = true;
      state.userid = user.userid;
      state.username = user.username;
      state.cartItems = totalItems.quantity;
      state.completed = user.completed;
    },
    logout: (state) => {
      state.isLogged = false;
    },
    modifyTotal: (state, action) => {
      state.cartItems = action.payload;
    },
    dataIsComplete: (state) => {
      state.completed = true;
    },
  },
});
export const { login, logout, modifyTotal, dataIsComplete } = authSlice.actions;

export default authSlice.reducer;
