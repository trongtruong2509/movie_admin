import { configureStore } from "@reduxjs/toolkit";

import filmReducer from "./../common/slices/filmSlice";

export const store = configureStore({
   reducer: { film: filmReducer },
});
