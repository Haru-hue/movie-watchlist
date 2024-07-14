import { configureStore } from "@reduxjs/toolkit";
import sidebarReducer from "./features/sidebar";
import searchReducer from "./features/search";

export const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    search: searchReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;