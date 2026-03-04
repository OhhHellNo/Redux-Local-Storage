import { useAppSelector, useAppDispatch } from "@/App/hooks";
import { UpdateTodo, DeleteTodo, Todo } from "@/Features/todoSlice";
import { deletePost, Post } from "@/Features/postsSlice";
import { useNavigate } from "react-router-dom";
import { Edit, Trash2, CheckCircle } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Home = () => {
  const todos = useAppSelector((state) => state.Todos);
  const posts = useAppSelector((state) => state.Posts);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleDeleteTodo = (id: number) => {
    dispatch(DeleteTodo(id));
    toast.error("Todo deleted successfully!");
  };

  const handleToggleComplete = (id: number) => {
    dispatch(UpdateTodo(id));
    toast.info("Todo status updated!");
  };

  const handleEditTodo = (id: number) => {
    navigate(`/update-todo/${id}`);
    toast.info("Navigating to edit todo");
  };

  const handleDeletePost = (id: number) => {
    dispatch(deletePost(id));
    toast.error("Post deleted successfully!");
  };

  const handleEditPost = (id: number) => {
    navigate(`/update-posts/${id}`);
    toast.info("Navigating to edit post");
  };

  return (
    <div className="mx-auto mt-10 max-w-4xl space-y-10 p-4">
      <h1 className="text-center text-2xl font-bold text-gray-800">My Todos</h1>

      {todos.length === 0 ? (
        <div className="text-center text-gray-500">No todos yet. Add some!</div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {todos.map((todo: Todo) => (
            <div
              key={todo.id}
              className={`rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md ${
                todo.completed ? "bg-green-50 line-through" : ""
              }`}
            >
              <p className="mb-2 text-lg font-semibold text-gray-900">
                {todo.title}
              </p>
              {todo.description && (
                <p className="mb-3 text-sm text-gray-700">{todo.description}</p>
              )}

              <div className="flex justify-end space-x-3">
                <CheckCircle
                  size={22}
                  className={`cursor-pointer transition ${
                    todo.completed
                      ? "text-green-500"
                      : "text-gray-400 hover:text-green-400"
                  }`}
                  onClick={() => handleToggleComplete(todo.id)}
                />
                <Edit
                  size={22}
                  className="cursor-pointer text-blue-500 transition hover:text-blue-600"
                  onClick={() => handleEditTodo(todo.id)}
                />
                <Trash2
                  size={22}
                  className="cursor-pointer text-red-500 transition hover:text-red-600"
                  onClick={() => handleDeleteTodo(todo.id)}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      <h1 className="text-center text-2xl font-bold text-gray-800">My Posts</h1>

      {posts.length === 0 ? (
        <div className="text-center text-gray-500">No posts yet. Add some!</div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {posts.map((post: Post) => (
            <div
              key={post.id}
              className="flex flex-col rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md sm:flex-row"
            >
              {post.Imageurl && (
                <div className="mb-3 shrink-0 sm:mr-4 sm:mb-0">
                  <img
                    src={post.Imageurl}
                    alt={post.Title}
                    className="h-24 w-24 rounded-lg object-cover shadow-sm"
                  />
                </div>
              )}

              <div className="flex flex-1 flex-col justify-between">
                <div className="mb-3">
                  <h2 className="mb-2 text-lg font-semibold text-gray-900">
                    {post.Title}
                  </h2>
                  <p className="text-sm text-gray-700">{post.Detail}</p>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <p className="text-sm text-gray-500">
                    Added by: {post.Author}
                  </p>
                  <div className="flex space-x-3">
                    <Edit
                      size={20}
                      className="cursor-pointer text-blue-500 transition hover:text-blue-600"
                      onClick={() => handleEditPost(post.id)}
                    />
                    <Trash2
                      size={20}
                      className="cursor-pointer text-red-500 transition hover:text-red-600"
                      onClick={() => handleDeletePost(post.id)}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
