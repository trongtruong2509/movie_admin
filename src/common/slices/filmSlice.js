import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import * as httpRequest from "../utils/httpRequest";
import { toast } from "react-toastify";

const initialState = {
   entities: [],
   selected: null,
   pending: false,
   success: false,
   successDelete: false,
   allow: false, // allow to navigate
};

export const fetchFilms = createAsyncThunk("films/fetchAllFilms", async () => {
   const response = await httpRequest.get("/QuanLyPhim/LayDanhSachPhim");

   console.log("[fetchFilms]", response.content);

   return response.content;
});

export const getFilmById = createAsyncThunk(
   "films/getFilmByIdStatus",
   async (id) => {
      const response = await httpRequest.get("/QuanLyPhim/LayThongTinPhim", {
         maPhim: id,
      });

      console.log("[getFilmById]", response.content);

      return response.content;
   }
);

export const addNewFilm = createAsyncThunk(
   "films/addNewFilmStatus",
   async (formData, { rejectWithValue }) => {
      try {
         const response = await httpRequest.post(
            "/QuanLyPhim/ThemPhimUploadHinh",
            formData
         );
         return response.data.data;
      } catch (err) {
         if (!err.response) {
            throw err;
         }

         return rejectWithValue(err.response.data);
      }
   }
);

export const updateFilm = createAsyncThunk(
   "films/updateFilmStatus",
   async (formData, { rejectWithValue }) => {
      try {
         const response = await httpRequest.post(
            "/QuanLyPhim/CapNhatPhimUpload",
            formData
         );
         return response.data.content;
      } catch (err) {
         if (!err.response) {
            throw err;
         }

         return rejectWithValue(err.response.data);
      }
   }
);

export const deleteFilmById = createAsyncThunk(
   "films/deleteFilmByIdStatus",
   async (id, { rejectWithValue }) => {
      try {
         const response = await httpRequest.Delete("/QuanLyPhim/XoaPhim", {
            MaPhim: id,
         });
         return response.data.content;
      } catch (err) {
         if (!err.response) {
            throw err;
         }

         return rejectWithValue(err.response.data);
      }
   }
);

export const filmSlice = createSlice({
   name: "film",
   initialState,
   reducers: {
      updateSelected: (state, action) => {
         state.selected = action.payload;
      },
      updateAllow: (state, action) => {
         state.allow = action.payload;
      },
      updateSuccessDelete: (state, action) => {
         state.successDelete = action.payload;
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(fetchFilms.pending, (state, action) => {
            console.log("[fetchFlim]", "loading");
            state.pending = true;
         })
         .addCase(fetchFilms.fulfilled, (state, action) => {
            console.log("[fetchFlim] success", action.payload);

            state.entities = action.payload;
            state.success = true;
            state.pending = false;
         })
         .addCase(fetchFilms.rejected, (state, action) => {
            console.log("[fetchFlim] rejected");

            state.entities = [];
            state.success = false;
            state.pending = false;
         })
         .addCase(addNewFilm.pending, (state) => {
            console.log("[addNewFilm]", "loading");
            state.pending = true;
         })
         .addCase(addNewFilm.fulfilled, (state, action) => {
            console.log("[addNewFilm] fulfilled", action.payload);
            state.allow = true;
            toast.info("Add new film successfully");
            state.success = true;
            state.pending = false;
         })
         .addCase(addNewFilm.rejected, (state, action) => {
            console.log("[addNewFilm] rejected", action.payload);
            state.allow = false;
            toast.error(action.payload.content);
            state.success = false;
            state.pending = false;
         })
         .addCase(updateFilm.pending, (state) => {
            console.log("[updateFilm]", "loading");
            state.pending = true;
         })
         .addCase(updateFilm.fulfilled, (state, action) => {
            console.log("[updateFilm] fulfilled", action.payload);

            state.selected = action.payload;
            state.allow = true;
            state.success = false;
            state.pending = false;
            toast.info(`Film ${action.payload.tenPhim} updated`);
         })
         .addCase(updateFilm.rejected, (state, action) => {
            console.log("[updateFilm] rejected", action.payload);
            toast.error(action.payload.content);
            state.success = false;
            state.pending = false;
         })
         .addCase(getFilmById.pending, (state) => {
            console.log("[getFilmById]", "loading");
            state.pending = true;
         })
         .addCase(getFilmById.fulfilled, (state, action) => {
            console.log("[getFilmById] fulfilled", action.payload);
            state.selected = action.payload;
            state.success = false;
            state.pending = false;
         })
         .addCase(deleteFilmById.pending, (state) => {
            console.log("[deleteFilmById]", "loading");
            state.pending = true;
         })
         .addCase(deleteFilmById.fulfilled, (state, action) => {
            console.log("[deleteFilmById] fulfilled", action.payload);

            state.successDelete = true;
            state.pending = false;
            toast.warn("Film deleted successfully");
         })
         .addCase(deleteFilmById.rejected, (state, action) => {
            console.log("[deleteFilmById] rejected", action.payload);

            state.successDelete = false;
            state.pending = false;
            toast.error(action.payload.content);
         });
   },
});

// Action creators are generated for each case reducer function
export const { updateSelected, updateAllow, updateSuccessDelete } =
   filmSlice.actions;

export default filmSlice.reducer;
