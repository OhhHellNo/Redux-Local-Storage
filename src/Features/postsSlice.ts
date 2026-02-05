import { loadPosts, savePosts } from "@/Utils/localstorage";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Post = {
  id: number;
  Title: string;
  Detail: string;
  Imageurl: string;
  Author: string;
};

const initialState: Post[] = loadPosts();

export const PostSlice = createSlice({
  name: "Posts",
  initialState,
  reducers: {
    addPost: (state, action: PayloadAction<Omit<Post, "id">>) => {
      state.push({
        id: Date.now(),
        ...action.payload,
      });
      savePosts(state);
    },

    deletePost: (state, action: PayloadAction<number>) => {
      const updated = state.filter((p) => p.id !== action.payload);
      savePosts(updated);
      return updated;
    },

    updatePost: (state, action: PayloadAction<Post>) => {
      const post = state.find((p) => p.id === action.payload.id);
      if (post) {
        post.Title = action.payload.Title;
        post.Detail = action.payload.Detail;
        post.Imageurl = action.payload.Imageurl;
        post.Author = action.payload.Author;
        savePosts(state);
      }
    },
  },
});

export const { addPost, deletePost, updatePost } = PostSlice.actions;
export default PostSlice.reducer;
