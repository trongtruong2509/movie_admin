import { configureStore } from "@reduxjs/toolkit";

import filmReducer from "./../common/slices/filmSlice";
import userReducer from "./../common/slices/userSlice";
import showtimeReducer from "./../common/slices/showtimeSlice";

export const store = configureStore({
   reducer: {
      film: filmReducer,
      user: userReducer,
      showtime: showtimeReducer,
   },
});
