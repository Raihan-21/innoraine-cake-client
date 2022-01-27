import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./reducer";

// const store = createStore(reducer);
const store = configureStore({
  reducer: {
    auth: authSlice,
  },
});
export default store;
