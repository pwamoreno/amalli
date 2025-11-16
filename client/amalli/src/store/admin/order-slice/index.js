import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

const initialState = {
  orderList: [],
  orderDetails: null,
};

export const getAllOrders = createAsyncThunk(
  "/order/getAllOrders",
  async () => {
    const response = await axios.get(
      `${API}/api/admin/orders/get`
    );

    // console.log(response.data, "[res.data]");

    return response.data;
  }
);

export const getOrderDetailsAdmin = createAsyncThunk(
  "/order/getOrderDetailsAdmin",
  async (id) => {
    const response = await axios.get(
      `${API}/api/admin/orders/details/${id}`
    );

    // console.log(response.data, "[res.data]");

    return response.data;
  }
);
export const updateOrderStatus = createAsyncThunk(
  "/order/updateOrderStatus",
  async ({ id, orderStatus }) => {
    const response = await axios.put(`${API}/api/admin/orders/update/${id}`, {
      orderStatus,
    });

    // console.log(response.data, "[res.data]");

    return response.data;
  }
);

const adminOrderSlice = createSlice({
  name: "adminOrderSlice",
  initialState,
  reducers: {
    resetOrderDetails: (state) => {
      state.orderDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderList = action.payload.data;
      })
      .addCase(getAllOrders.rejected, (state) => {
        state.isLoading = false;
        state.orderList = [];
      })
      .addCase(getOrderDetailsAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderDetailsAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderDetails = action.payload.data;
      })
      .addCase(getOrderDetailsAdmin.rejected, (state) => {
        state.isLoading = false;
        state.orderDetails = null;
      });
  },
});

export const { resetOrderDetails } = adminOrderSlice.actions;

export default adminOrderSlice.reducer;
