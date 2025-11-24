import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

const initialState = {
  email: "",
  isLoading: false,
};

export const newsletterSignup = createAsyncThunk(
  "newsletter/signup",
  async ({ email }) => {
    // console.log(email)
    const response = await axios.post(`${API}/api/shop/newsletter/signup`, {
      email,
    });
    return response.data;
  }
);

export const newsletterUnsubscribe = createAsyncThunk(
  "newsletter/unsubscribe",
  async ({ email }) => {
    // console.log(email)
    const response = await axios.post(
      `${API}/api/shop/newsletter/unsubscribe`,
      { email }
    );
    return response.data;
  }
);

const shoppingNewsletterSlice = createSlice({
  name: "shoppingNewsletter",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(newsletterSignup.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(newsletterSignup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.email = action.payload.data;
      })
      .addCase(newsletterSignup.rejected, (state, action) => {
        state.isLoading = false;
        state.email = action.payload?.data;
      })
      .addCase(newsletterUnsubscribe.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(newsletterUnsubscribe.fulfilled, (state, action) => {
        state.isLoading = false;
        state.email = action.payload.data;
      })
      .addCase(newsletterUnsubscribe.rejected, (state, action) => {
        state.isLoading = false;
        state.email = action.payload.data;
      });
  },
});

export default shoppingNewsletterSlice.reducer;
