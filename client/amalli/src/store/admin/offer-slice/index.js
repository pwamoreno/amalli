import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

const initialState = {
  offers: [],
  isLoading: false,
};

// Get all special offers
export const getAllOffers = createAsyncThunk("adminOffers/getAll", async () => {
  const response = await axios.get(`${API}/api/admin/offer/get`);
  return response.data;
});

// Create new special offer
export const createOffer = createAsyncThunk(
  "adminOffers/create",
  async (offerData) => {
    const response = await axios.post(
      `${API}/api/admin/offer/create`,
      offerData
    );
    return response.data;
  }
);

// Update special offer
export const updateOffer = createAsyncThunk(
  "adminOffers/update",
  async ({ id, offerData }) => {
    const response = await axios.put(
      `${API}/api/admin/offer/update/${id}`,
      offerData
    );
    return response.data;
  }
);

// Delete special offer
export const deleteOffer = createAsyncThunk(
  "adminOffers/delete",
  async (id) => {
    const response = await axios.delete(`${API}/api/admin/offer/delete/${id}`);
    return { id, ...response.data };
  }
);

const adminOffersSlice = createSlice({
  name: "adminOffers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get all offers
      .addCase(getAllOffers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOffers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.offers = action.payload.data;
      })
      .addCase(getAllOffers.rejected, (state) => {
        state.isLoading = false;
        state.offers = [];
      })
      // Create offer
      .addCase(createOffer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createOffer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.offers.unshift(action.payload.data);
      })
      .addCase(createOffer.rejected, (state) => {
        state.isLoading = false;
      })
      // Update offer
      .addCase(updateOffer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateOffer.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.offers.findIndex(
          (offer) => offer._id === action.payload.data._id
        );
        if (index !== -1) {
          state.offers[index] = action.payload.data;
        }
      })
      .addCase(updateOffer.rejected, (state) => {
        state.isLoading = false;
      })
      // Delete offer
      .addCase(deleteOffer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteOffer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.offers = state.offers.filter(
          (offer) => offer._id !== action.payload.id
        );
      })
      .addCase(deleteOffer.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default adminOffersSlice.reducer;
