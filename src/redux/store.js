import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/auth/authSlice";
import profileReducer from "../redux/profile/profileSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
  },
});

export default store;
