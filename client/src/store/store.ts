import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/features/userProfile"
import movieReducer from "@/features/movieTerm"

export const store = configureStore({
    reducer: {
        users: userReducer,
        movie: movieReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;