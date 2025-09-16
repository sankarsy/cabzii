// src/redux/profileSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProfile = createAsyncThunk(
  "profile/fetchProfile",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const res = await axios.get("http://localhost:8000/api/client/profile", {
        headers: { Authorization: `Bearer ${auth.token}` },
        withCredentials: true,
      });
      return res.data.client; // ✅ Only return the actual client object
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {
    setProfile(state, action) {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateProfileLocally(state, action) {
      state.data = { ...state.data, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload; // ✅ now this is clean client object
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setProfile, updateProfileLocally } = profileSlice.actions;
export default profileSlice.reducer;
