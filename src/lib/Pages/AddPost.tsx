import { useAppDispatch } from "@/App/hooks";
import { addPost } from "@/Features/postsSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";

const PostSchema = z.object({
  Title: z.string().min(5, "Title must be at least 5 characters"),
  Detail: z.string().min(5, "Detail must be at least 5 characters"),
  Imageurl: z.string().min(5, "Image URL must be at least 5 characters"),
  Author: z.string().min(5, "Author must be at least 5 characters"),
});

type PostFormData = z.infer<typeof PostSchema>;

export const AddPost = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PostFormData>({
    resolver: zodResolver(PostSchema),
  });

  const onSubmit = (data: PostFormData) => {
    dispatch(addPost(data));
    toast.success("Post added successfully!");
    setTimeout(() => navigate("/"), 1000);
    reset();
  };

  return (
    <div className="mx-auto mt-12 max-w-lg rounded-xl bg-white p-8 shadow-lg">
      <h1 className="mb-8 text-center text-2xl font-bold text-gray-800">
        Create New Post
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Title */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            {...register("Title")}
            placeholder="Post title"
            className={`w-full rounded-lg border px-3 py-2 transition outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 ${
              errors.Title ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.Title && (
            <p className="mt-1 text-xs text-red-500">{errors.Title.message}</p>
          )}
        </div>

        {/* Detail */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Detail
          </label>
          <textarea
            rows={4}
            {...register("Detail")}
            placeholder="Write your post content..."
            className={`w-full rounded-lg border px-3 py-2 transition outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 ${
              errors.Detail ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.Detail && (
            <p className="mt-1 text-xs text-red-500">{errors.Detail.message}</p>
          )}
        </div>

        {/* Image URL */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Image URL
          </label>
          <input
            type="text"
            {...register("Imageurl")}
            placeholder="https://example.com/image.jpg"
            className={`w-full rounded-lg border px-3 py-2 transition outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 ${
              errors.Imageurl ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.Imageurl && (
            <p className="mt-1 text-xs text-red-500">
              {errors.Imageurl.message}
            </p>
          )}
        </div>

        {/* Author */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Author
          </label>
          <input
            type="text"
            {...register("Author")}
            placeholder="Your name"
            className={`w-full rounded-lg border px-3 py-2 transition outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 ${
              errors.Author ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.Author && (
            <p className="mt-1 text-xs text-red-500">{errors.Author.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-purple-600 py-2.5 font-semibold text-white transition hover:bg-purple-700 active:scale-[0.98]"
        >
          Add Post
        </button>
      </form>
    </div>
  );
};
