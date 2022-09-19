import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import * as showtimeService from "../../services/showtimeService";
import { toast } from "react-toastify";

const initialState = {
   chain: null,
   cluster: null,
   cinemas: null,
};

export const getChain = createAsyncThunk(
   "showtime/getChainStatus",
   async () => {
      const response = await showtimeService.getCinemaChain();
      return response.content;
   }
);

export const getClusterId = createAsyncThunk(
   "showtime/getClusterIdStatus",
   async (id) => {
      const response = await showtimeService.getCluster(id);
      return response.content;
   }
);

export const createShowtime = createAsyncThunk(
   "showtime/createShowtimeStatus",
   async (info, { rejectWithValue }) => {
      try {
         const response = await showtimeService.createShowtime(info);
         return response.data.content;
      } catch (err) {
         if (!err.response) {
            throw err;
         }

         return rejectWithValue(err.response.data);
      }
   }
);

export const showtimeSlice = createSlice({
   name: "showtime",
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(getChain.pending, (state) => {
            console.log("[getChain]", "loading");
         })
         .addCase(getChain.fulfilled, (state, action) => {
            console.log("[getChain] success", action.payload);
            state.chain = action.payload;
         })
         .addCase(getChain.rejected, (state, action) => {
            console.log("[getChain] rejected", action.payload);
            state.chain = null;
         })
         .addCase(getClusterId.pending, (state) => {
            console.log("[getClusterId]", "loading");
         })
         .addCase(getClusterId.fulfilled, (state, action) => {
            console.log("[getClusterId] success", action.payload);
            state.cluster = action.payload;
         })
         .addCase(getClusterId.rejected, (state, action) => {
            console.log("[getClusterId] rejected", action.payload);
            state.cluster = null;
         })
         .addCase(createShowtime.pending, (state) => {
            console.log("[createShowtime]", "loading");
         })
         .addCase(createShowtime.fulfilled, (state, action) => {
            console.log("[createShowtime] success", action.payload);
            toast.info("New showtime added!");
         })
         .addCase(createShowtime.rejected, (state, action) => {
            console.log("[createShowtime] rejected", action.payload);
            toast.error(action.payload.content);
         });
   },
});

// Action creators are generated for each case reducer function
export const { updateUser, updateAllow, updateRemember } =
   showtimeSlice.actions;

export default showtimeSlice.reducer;
