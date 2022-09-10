import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import * as httpRequest from "../utils/httpRequest";

const initialState = {
   value: [],
   pending: false,
   success: false,
};

export const fetchFilms = createAsyncThunk("films/fetchAllFilms", async () => {
   const response = await httpRequest.get("/QuanLyPhim/LayDanhSachPhim");

   return response.content;
});

export const filmSlice = createSlice({
   name: "film",
   initialState,
   reducers: {
      update: (state, action) => {
         state.value = action.payload;
      },
   },
   extraReducers: (builder) => {
      // Add reducers for additional action types here, and handle loading state as needed
      builder
         .addCase(fetchFilms.pending, (state, action) => {
            // Add user to the state array
            console.log("[fetchFlim]", "loading");
            state.pending = true;
         })
         .addCase(fetchFilms.fulfilled, (state, action) => {
            // Add user to the state array
            console.log("[fetchFlim] success", action.payload);

            state.value = action.payload;
            state.success = true;
            state.pending = false;
         })
         .addCase(fetchFilms.rejected, (state, action) => {
            // Add user to the state array
            console.log("[fetchFlim] rejected");

            state.value = [];
            state.success = false;
            state.pending = false;
         });
   },
});

// Action creators are generated for each case reducer function
export const { update } = filmSlice.actions;

export default filmSlice.reducer;
