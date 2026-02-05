import { loadTodos } from "@/Utils/localstorage";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Todo = {
  id: number;
  title: string;
  description: string;
  completed: boolean;
};

const initialState: Todo[] = loadTodos();

export const TodoSlice = createSlice({
  name: "Todos",
  initialState,
  reducers: {
    addTodo: (
      state,
      action: PayloadAction<{ title: string; description: string }>,
    ) => {
      state.push({
        id: Date.now(),
        title: action.payload.title,
        description: action.payload.description,
        completed: false,
      });
    },

    UpdateTodo: (state, action: PayloadAction<number>) => {
      const todo = state.find((t) => t.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },

    DeleteTodo: (state, action: PayloadAction<number>) => {
      return state.filter((t) => t.id !== action.payload);
    },
    updateTodoText: (
      state,
      action: PayloadAction<{ id: number; title: string; description: string }>,
    ) => {
      const todo = state.find((t) => t.id === action.payload.id);
      if (todo) {
        todo.title = action.payload.title;
        todo.description = action.payload.description;
      }
    },
  },
});

export const { addTodo, UpdateTodo, DeleteTodo, updateTodoText } =
  TodoSlice.actions;
export default TodoSlice.reducer;
