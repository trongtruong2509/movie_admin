import { configureStore } from "@reduxjs/toolkit";

import filmReducer from "./../common/slices/filmSlice";
import userReducer from "./../common/slices/userSlice";

export const store = configureStore({
   reducer: { film: filmReducer, user: userReducer },
});
