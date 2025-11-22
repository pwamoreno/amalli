// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";

// const API = import.meta.env.VITE_API_URL;

// const initialState = {
//   email: "",
//   isLoading: false,
// };

// export const newsletterSignup = createAsyncThunk(
//   "newsletter/signup",
//   async ({email}) => {
//     // console.log(email)
//     const response = await axios.post(
//       `${API}/api/shop/newsletter/signup`,
//       {email}
//     );
//     return response.data;
//   }
// );

// const shoppingNewsletterSlice = createSlice({
//   name: "shoppingNewsletter",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(newsletterSignup.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(newsletterSignup.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.email = action.payload.data;
//       })
//       .addCase(newsletterSignup.rejected, (state, action) => {
//         state.isLoading = false;
//         state.email = action.payload?.data;
//       });
//   },
// });

// export default shoppingNewsletterSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

const initialState = {
  email: "",
  isLoading: false,
  success: false, // Add success state
  message: "", // Add message state
  error: null, // Add error state
};

export const newsletterSignup = createAsyncThunk(
  "newsletter/signup",
  async ({ email }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API}/api/shop/newsletter/signup`,
        { email },
        {
          // Handle 400 responses without throwing
          validateStatus: (status) => status < 500,
        }
      );

      // If server returns success: false, treat it as rejection
      if (!response.data.success) {
        return rejectWithValue(response.data);
      }

      return response.data;
    } catch (error) {
      // Handle network errors or 500 errors
      return rejectWithValue({
        message: error.response?.data?.message || "Network error",
      });
    }
  }
);

const shoppingNewsletterSlice = createSlice({
  name: "shoppingNewsletter",
  initialState,
  reducers: {
    // Add reducer to reset state
    resetNewsletterState: (state) => {
      state.isLoading = false;
      state.success = false;
      state.message = "";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(newsletterSignup.pending, (state) => {
        state.isLoading = true;
        state.success = false;
        state.error = null;
        state.message = "";
      })
      .addCase(newsletterSignup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.message = action.payload.message; // Store the success message
        state.email = action.payload.data || ""; // Only if your backend returns data
      })
      .addCase(newsletterSignup.rejected, (state, action) => {
        state.isLoading = false;
        state.success = false;
        state.error = action.payload?.message || "Subscription failed";
        state.message = action.payload?.message || "Something went wrong";
      });
  },
});

export const { resetNewsletterState } = shoppingNewsletterSlice.actions;
export default shoppingNewsletterSlice.reducer;
