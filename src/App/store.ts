import { configureStore } from "@reduxjs/toolkit";
import todoReducer, { TodoSlice } from "@/Features/todoSlice";
import postReducer, { PostSlice } from "@/Features/postsSlice";
import { saveTodos, savePosts } from "@/Utils/localstorage";

export const store = configureStore({
  reducer: {
    [TodoSlice.name]: todoReducer,
    [PostSlice.name]: postReducer,
  },
});

store.subscribe(() => {
  const state = store.getState();
  saveTodos(state.Todos);
  savePosts(state.Posts);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
