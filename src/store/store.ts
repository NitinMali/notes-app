import { configureStore } from "@reduxjs/toolkit";
import notesReducer from "./notesSlice";
import foldersReducer from "./foldersSlice"

const store = configureStore({
  reducer: {
    notes: notesReducer,
    folders: foldersReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
