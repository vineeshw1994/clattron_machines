// Updated companySlice.js (add public thunk for Header)
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Public thunk for company info (no auth – for Header logo/favicon)
export const fetchCompanyInfo = createAsyncThunk(
  'company/fetchCompanyInfo',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/admin/public`); // Public endpoint
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch company info');
    }
  }
);

const initialState = {
  companyInfo: null,
  loading: false,
  error: null,
};

const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {
    setCompany: (state, action) => {
      state.companyInfo = action.payload;
      state.error = null;
    },
    clearCompany: (state) => {
      state.companyInfo = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompanyInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCompanyInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.companyInfo = action.payload;
      })
      .addCase(fetchCompanyInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setCompany, clearCompany } = companySlice.actions;
export default companySlice.reducer;