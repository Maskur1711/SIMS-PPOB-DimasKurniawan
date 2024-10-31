import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { registerUserApi, loginUserApi } from "../../api/baseAPI";

// Register Store
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await registerUserApi(userData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Login Store
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await loginUserApi(userData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    message: "",
    error: "",
    loading: false,
  },
  reducers: {
    resetMessage: (state) => {
      state.message = "";
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.message = "";
        state.error = "";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.message = "";
        state.error = "";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;

        if (action.payload.data?.token) {
          localStorage.setItem("token", action.payload.data.token);
        } else {
          console.error("Token not found in response:", action.payload);
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetMessage } = authSlice.actions;

export default authSlice.reducer;
