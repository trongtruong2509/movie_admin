import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import * as userService from "../../services/userService";

const initialState = {
   current: null,
   pending: false,
   success: false,
   allow: false,
   remember: false,
};

export const userLogin = createAsyncThunk(
   "user/userLoginStatus",
   async (info) => {
      const response = await userService.login(info);
      return response.content;
   }
);

export const signUp = createAsyncThunk("user/signUpStatus", async (info) => {
   const response = await userService.signup(info);

   return response.content;
});

export const userSlice = createSlice({
   name: "user",
   initialState,
   reducers: {
      updateUser: (state, action) => {
         state.current = action.payload;
      },
      updateAllow: (state, action) => {
         state.allow = action.payload;
      },
      updateRemember: (state, action) => {
         state.remember = action.payload;
      },
   },
   extraReducers: (builder) => {
      // Add reducers for additional action types here, and handle loading state as needed
      builder
         .addCase(userLogin.pending, (state) => {
            // Add user to the state array
            console.log("[userLogin]", "loading");
            state.pending = true;
         })
         .addCase(userLogin.fulfilled, (state, action) => {
            // Add user to the state array
            console.log("[userLogin] success", action.payload);
            state.current = action.payload;
            state.allow = true;
            state.success = true;
            state.pending = false;
            localStorage.setItem("accessToken", action.payload.accessToken);

            if (state.remember) {
               localStorage.setItem(
                  "currentUser",
                  JSON.stringify(action.payload)
               );
            }
         })
         .addCase(userLogin.rejected, (state, action) => {
            // Add user to the state array
            console.log("[userLogin] rejected", action.payload);
            state.current = null;
            state.allow = false;
            state.success = false;
            state.pending = false;
         })
         .addCase(signUp.pending, (state) => {
            // Add user to the state array
            console.log("[signUp]", "loading");
            state.pending = true;
         })
         .addCase(signUp.fulfilled, (state, action) => {
            // Add user to the state array
            console.log("[signUp] success", action.payload);
            // state.current = action.payload;
            state.allow = true;
            state.success = true;
            state.pending = false;
         })
         .addCase(signUp.rejected, (state, action) => {
            // Add user to the state array
            console.log("[signUp] rejected", action.payload);
            // state.current = null;
            state.allow = false;
            state.success = false;
            state.pending = false;
         });
   },
});

// Action creators are generated for each case reducer function
export const { updateUser, updateAllow, updateRemember } = userSlice.actions;

export default userSlice.reducer;
