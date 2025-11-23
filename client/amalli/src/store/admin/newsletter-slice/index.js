import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

const initialState = {
//   subject: "",
//   content: "",
  isLoading: false,
};

export const sendNewsletter = createAsyncThunk(
  "newsletter/send",
  async ({subject, content}) => {
    // console.log(email)
    const response = await axios.post(
      `${API}/api/shop/newsletter/send`,
      {subject, content}
    );
    return response.data;
  }
);

const adminNewsletterSlice = createSlice({
  name: "adminNewsletter",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendNewsletter.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(sendNewsletter.fulfilled, (state) => {
        state.isLoading = false;
        // state.email = action.payload.data;
      })
      .addCase(sendNewsletter.rejected, (state) => {
        state.isLoading = false;
        // state.email = action.payload?.data;
      });
  },
});

export default adminNewsletterSlice.reducer;
