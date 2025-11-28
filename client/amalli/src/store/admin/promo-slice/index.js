import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

const initialState = {
  promoCodes: [],
  isLoading: false,
};

// Get all promo codes
export const getAllPromoCodes = createAsyncThunk(
  "adminPromo/getAll",
  async () => {
    const response = await axios.get(`${API}/api/admin/promo/get`);
    return response.data;
  }
);

// Create new promo code
export const createPromoCode = createAsyncThunk(
  "adminPromo/create",
  async (promoData) => {
    const response = await axios.post(
      `${API}/api/admin/promo/create`,
      promoData
    );
    return response.data;
  }
);

// Update promo code
export const updatePromoCode = createAsyncThunk(
  "adminPromo/update",
  async ({ id, promoData }) => {
    const response = await axios.put(
      `${API}/api/admin/promo/update/${id}`,
      promoData
    );
    return response.data;
  }
);

// Delete promo code
export const deletePromoCode = createAsyncThunk(
  "adminPromo/delete",
  async (id) => {
    const response = await axios.delete(`${API}/api/admin/promo/delete/${id}`);
    return { id, ...response.data };
  }
);

const adminPromoSlice = createSlice({
  name: "adminPromo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get all promo codes
      .addCase(getAllPromoCodes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllPromoCodes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.promoCodes = action.payload.data;
      })
      .addCase(getAllPromoCodes.rejected, (state) => {
        state.isLoading = false;
        state.promoCodes = [];
      })
      // Create promo code
      .addCase(createPromoCode.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createPromoCode.fulfilled, (state, action) => {
        state.isLoading = false;
        state.promoCodes.unshift(action.payload.data);
      })
      .addCase(createPromoCode.rejected, (state) => {
        state.isLoading = false;
      })
      // Update promo code
      .addCase(updatePromoCode.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePromoCode.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.promoCodes.findIndex(
          (promo) => promo._id === action.payload.data._id
        );
        if (index !== -1) {
          state.promoCodes[index] = action.payload.data;
        }
      })
      .addCase(updatePromoCode.rejected, (state) => {
        state.isLoading = false;
      })
      // Delete promo code
      .addCase(deletePromoCode.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deletePromoCode.fulfilled, (state, action) => {
        state.isLoading = false;
        state.promoCodes = state.promoCodes.filter(
          (promo) => promo._id !== action.payload.id
        );
      })
      .addCase(deletePromoCode.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default adminPromoSlice.reducer;
