import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import * as showtimeService from "../../services/showtimeService";

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
   async (info) => {
      const response = await showtimeService.createShowtime(info);
      return response.data.content;
   }
);

export const showtimeSlice = createSlice({
   name: "showtime",
   initialState,
   reducers: {
      updateUser: (state, action) => {
         // state.current = action.payload;
      },
      updateAllow: (state, action) => {
         // state.allow = action.payload;
      },
      updateRemember: (state, action) => {
         // state.remember = action.payload;
      },
   },
   extraReducers: (builder) => {
      // Add reducers for additional action types here, and handle loading state as needed
      builder
         .addCase(getChain.pending, (state) => {
            // Add user to the state array
            console.log("[getChain]", "loading");
            // state.pending = true;
         })
         .addCase(getChain.fulfilled, (state, action) => {
            // Add user to the state array
            console.log("[getChain] success", action.payload);
            state.chain = action.payload;
         })
         .addCase(getChain.rejected, (state, action) => {
            // Add user to the state array
            console.log("[getChain] rejected", action.payload);
            state.chain = null;
         })
         .addCase(getClusterId.pending, (state) => {
            // Add user to the state array
            console.log("[getClusterId]", "loading");
            // state.pending = true;
         })
         .addCase(getClusterId.fulfilled, (state, action) => {
            // Add user to the state array
            console.log("[getClusterId] success", action.payload);
            state.cluster = action.payload;
         })
         .addCase(getClusterId.rejected, (state, action) => {
            // Add user to the state array
            console.log("[getClusterId] rejected", action.payload);
            state.cluster = null;
         })
         .addCase(createShowtime.pending, (state) => {
            // Add user to the state array
            console.log("[createShowtime]", "loading");
            // state.pending = true;
         })
         .addCase(createShowtime.fulfilled, (state, action) => {
            // Add user to the state array
            console.log("[createShowtime] success", action.payload);
            // state.cluster = action.payload;
         })
         .addCase(createShowtime.rejected, (state, action) => {
            // Add user to the state array
            console.log("[createShowtime] rejected", action.payload);
            // state.cluster = null;
         });
   },
});

// Action creators are generated for each case reducer function
export const { updateUser, updateAllow, updateRemember } =
   showtimeSlice.actions;

export default showtimeSlice.reducer;
