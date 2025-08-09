import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./taskSlice";
import noteReducer from "./noteSlice";

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    note: noteReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
