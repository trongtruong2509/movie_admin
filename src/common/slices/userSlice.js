import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import * as userService from "../../services/userService";

export const fetchUsers = createAsyncThunk("user/fetchAllUsers", async () => {
   const response = await userService.getAllUsers();

   console.log("[fetchUsers]", response.content);

   return response.content;
});

export const queryUsers = createAsyncThunk("user/queryUsers", async (query) => {
   const response = await userService.queryUsers(query);

   console.log("[queryUsers]", response.content);

   return response.content;
});

export const userLogin = createAsyncThunk(
   "user/userLoginStatus",
   async (info, { rejectWithValue }) => {
      try {
         const response = await userService.login(info);
         return response.data.content;
      } catch (err) {
         if (!err.response) {
            throw err;
         }

         return rejectWithValue(err.response.data);
      }
   }
);

export const signUp = createAsyncThunk(
   "user/signUpStatus",
   async (info, { rejectWithValue }) => {
      try {
         const response = await userService.signup(info);

         return response.data.content;
      } catch (err) {
         if (!err.response) {
            throw err;
         }

         return rejectWithValue(err.response.data);
      }
   }
);

export const updateUserInfo = createAsyncThunk(
   "user/updateUserInfoStatus",
   async (info) => {
      const response = await userService.updateUser(info);

      return response.data.content;
   }
);

export const deleteUserById = createAsyncThunk(
   "user/deleteUserByIdStatus",
   async (info, { rejectWithValue }) => {
      try {
         const response = await userService.deleteUser(info);

         return response.data.content;
      } catch (err) {
         if (!err.response) {
            throw err;
         }

         return rejectWithValue(err.response.data);
      }
   }
);

const initialState = {
   entities: [],
   current: null,
   pending: false,
   success: false,
   allow: false,
   remember: false,
   successDelete: false,
};

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
      updateSuccessDeleteUser: (state, action) => {
         state.successDelete = action.payload;
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(userLogin.pending, (state) => {
            console.log("[userLogin]", "loading");
            state.pending = true;
         })
         .addCase(userLogin.fulfilled, (state, action) => {
            console.log("[userLogin] success", action.payload);
            state.current = action.payload;
            state.allow = true;
            state.success = true;
            state.pending = false;
            toast.info("Login successfully");
            localStorage.setItem("accessToken", action.payload.accessToken);

            // if (state.remember) {
            localStorage.setItem("currentUser", JSON.stringify(action.payload));
            // }
         })
         .addCase(userLogin.rejected, (state, action) => {
            console.log("[userLogin] rejected", action.payload);
            state.current = null;
            state.allow = false;
            state.success = false;
            state.pending = false;
            toast.error(action.payload.content);
         })
         .addCase(signUp.pending, (state) => {
            console.log("[signUp]", "loading");
            state.pending = true;
         })
         .addCase(signUp.fulfilled, (state, action) => {
            console.log("[signUp] success", action.payload);
            state.allow = true;
            state.success = true;
            toast.info("New account created");
            state.pending = false;
         })
         .addCase(signUp.rejected, (state, action) => {
            console.log("[signUp] rejected", action.payload);
            state.allow = false;
            state.success = false;
            toast.error(action.payload.content);
            state.pending = false;
         })
         .addCase(fetchUsers.pending, (state) => {
            console.log("[fetchUsers]", "loading");
            state.pending = true;
         })
         .addCase(fetchUsers.fulfilled, (state, action) => {
            console.log("[fetchUsers] success", action.payload);
            state.entities = action.payload;
            state.success = true;
            state.pending = false;
         })
         .addCase(fetchUsers.rejected, (state, action) => {
            console.log("[fetchUsers] rejected", action.payload);
            state.entities = [];
            state.success = false;
            state.pending = false;
         })
         .addCase(deleteUserById.pending, (state) => {
            console.log("[deleteUserById]", "loading");
            state.pending = true;
         })
         .addCase(deleteUserById.fulfilled, (state, action) => {
            console.log("[deleteUserById] success");
            state.successDelete = true;
            state.pending = false;
            toast.warn("User account deleted");
         })
         .addCase(deleteUserById.rejected, (state, action) => {
            console.log("[deleteUserById] rejected", action.payload);
            state.successDelete = false;
            state.pending = false;
            toast.error(action.payload.content);
         })
         .addCase(updateUserInfo.pending, (state) => {
            console.log("[updateUserInfo]", "loading");
            state.pending = true;
         })
         .addCase(updateUserInfo.fulfilled, (state, action) => {
            console.log("[updateUserInfo] success");
            state.successDelete = true;
            state.pending = false;
            toast.info("Account info updated!");
         })
         .addCase(updateUserInfo.rejected, (state, action) => {
            console.log("[updateUserInfo] rejected", action.payload);
            state.successDelete = false;
            state.pending = false;
            toast.error(action.payload.content);
         })
         .addCase(queryUsers.pending, (state) => {
            console.log("[queryUsers]", "loading");
            state.pending = true;
         })
         .addCase(queryUsers.fulfilled, (state, action) => {
            console.log("[queryUsers] success");
            state.entities = action.payload;
            state.success = true;
            state.pending = false;
         })
         .addCase(queryUsers.rejected, (state, action) => {
            console.log("[queryUsers] rejected", action.payload);
            state.entities = [];
            state.success = false;
            state.pending = false;
         });
   },
});

// Action creators are generated for each case reducer function
export const {
   updateUser,
   updateAllow,
   updateRemember,
   updateSuccessDeleteUser,
} = userSlice.actions;

export default userSlice.reducer;
