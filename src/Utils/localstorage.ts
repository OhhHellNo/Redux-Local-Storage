import type { Todo } from "@/Features/todoSlice";
import type { Post } from "@/Features/postsSlice";

const TODO_KEY = "todos";
const POST_KEY = "posts";

export const loadTodos = (): Todo[] => {
  try {
    const data = localStorage.getItem(TODO_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

export const saveTodos = (todos: Todo[]) => {
  localStorage.setItem(TODO_KEY, JSON.stringify(todos));
};

export const loadPosts = (): Post[] => {
  try {
    const data = localStorage.getItem(POST_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

export const savePosts = (posts: Post[]) => {
  localStorage.setItem(POST_KEY, JSON.stringify(posts));
};
