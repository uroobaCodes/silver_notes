import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Task = {
  id: number;
  title: string;
  completed: boolean;
};

type TasksState = {
  items: Task[];
};

const initialState: TasksState = {
  items: [
    { id: 1, title: "Learn Redux Toolkit", completed: false },
    { id: 2, title: "Set up Drizzle ORM", completed: true },
  ],
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<string>) => {
      const newTask: Task = {
        id: Date.now(),
        title: action.payload,
        completed: false,
      };
      state.items.push(newTask);
    },
    toggleTask: (state, action: PayloadAction<number>) => {
      const task = state.items.find((t) => t.id === action.payload);
      if (task) task.completed = !task.completed;
    },
    deleteTask: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((t) => t.id !== action.payload);
    },
  },
});

export const { addTask, toggleTask, deleteTask } = tasksSlice.actions;

export default tasksSlice.reducer;
