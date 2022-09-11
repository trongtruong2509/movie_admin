import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import * as httpRequest from "../utils/httpRequest";

const initialState = {
   entities: [],
   selected: null,
   pending: false,
   success: false,
};

export const fetchFilms = createAsyncThunk("films/fetchAllFilms", async () => {
   const response = await httpRequest.get("/QuanLyPhim/LayDanhSachPhim");

   console.log("[fetchFilms]", response.content);

   return response.content;
});

export const addNewFilm = createAsyncThunk(
   "films/addNewFilmStatus",
   async (formData) => {
      const response = await httpRequest.post(
         "/QuanLyPhim/CapNhatPhimUpload",
         formData
      );
      return response.data;
   }
);

export const filmSlice = createSlice({
   name: "film",
   initialState,
   reducers: {
      updateSelected: (state, action) => {
         state.selected = action.payload;
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

            state.entities = action.payload;
            state.success = true;
            state.pending = false;
         })
         .addCase(fetchFilms.rejected, (state, action) => {
            // Add user to the state array
            console.log("[fetchFlim] rejected");

            state.entities = [];
            state.success = false;
            state.pending = false;
         })
         .addCase(addNewFilm.pending, (state) => {
            // Add user to the state array
            console.log("[addNewFilm]", "loading");
            state.pending = true;
         })
         .addCase(addNewFilm.fulfilled, (state, action) => {
            // Add user to the state array
            console.log("[addNewFilm] fulfilled", action.payload);

            // state.list = [];
            state.success = false;
            state.pending = false;
         });
   },
});

// Action creators are generated for each case reducer function
export const { updateSelected } = filmSlice.actions;

export default filmSlice.reducer;
