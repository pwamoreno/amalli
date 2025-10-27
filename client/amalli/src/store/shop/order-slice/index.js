import axios from "axios";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  authorizationUrl: null,
  isLoading: false,
  orderId: null,
};

export const createNewOrder = createAsyncThunk(
  "/order/createNewOrder",
  async (orderData) => {
    const response = await axios.post(
      "http://localhost:5000/api/shop/order/create",
      orderData
    );

    // console.log(response.data, "[no .data]");

    return response.data;
  }
);

export const verifyPayment = createAsyncThunk(
  "/order/verifyPayment",
  async ({ reference, orderId }) => {
    const response = await axios.post(
      "http://localhost:5000/api/shop/order/verify",
      { reference, orderId }
    );

    console.log(response.data, "[res.data]");

    return response.data;
  }
);

const shoppingOrderSlice = createSlice({
  name: "shoppingOrderSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createNewOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNewOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.authorizationUrl = action.payload.authorization_url;
        state.orderId = action.payload.orderId;
        sessionStorage.setItem(
          "currentOrderId",
          JSON.stringify(action.payload.orderId)
        );
      })
      .addCase(createNewOrder.rejected, (state) => {
        state.isLoading = false;
        state.authorizationUrl = null;
        state.orderId = null;
      });
  },
});

export default shoppingOrderSlice.reducer;
