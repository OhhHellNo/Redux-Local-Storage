import { useAppDispatch, useAppSelector } from "@/App/hooks";
import { updatePost } from "@/Features/postsSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";

const PostSchema = z.object({
  Title: z.string().min(5, "Title must be at least 5 characters"),
  Detail: z.string().min(5, "Detail must be at least 5 characters"),
  Imageurl: z.string().min(5, "Image URL must be at least 5 characters"),
  Author: z.string().min(5, "Author must be at least 5 characters"),
});

type PostFormData = z.infer<typeof PostSchema>;

const UpdatePost = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const post = useAppSelector((state) =>
    state.Posts.find((p) => p.id === Number(id)),
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PostFormData>({
    resolver: zodResolver(PostSchema),
  });

  useEffect(() => {
    if (post) {
      reset({
        Title: post.Title,
        Author: post.Author,
        Detail: post.Detail,
        Imageurl: post.Imageurl,
      });
    }
  }, [post, reset]);

  const onSubmit = (data: PostFormData) => {
    if (!post) return;
    dispatch(
      updatePost({
        id: post.id,
        Author: data.Author,
        Detail: data.Detail,
        Imageurl: data.Imageurl,
        Title: data.Title,
      }),
    );
    toast.success("Post updated successfully!");
    navigate("/");
  };

  if (!post) {
    return <div className="mt-10 text-center text-red-500">Post not found</div>;
  }

  return (
    <div className="mx-auto mt-10 max-w-md rounded border bg-white p-6 shadow-lg">
      <h1 className="mb-6 text-center text-xl font-bold text-gray-800">
        Update Post
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Title */}
        <div>
          <label className="mb-1 block font-medium text-gray-700">Title</label>
          <input
            type="text"
            placeholder="Enter title"
            {...register("Title")}
            className="w-full rounded border border-gray-300 px-3 py-2 outline-none focus:border-purple-600 focus:ring focus:ring-purple-200"
          />
          {errors.Title && (
            <p className="mt-1 text-sm text-red-500">{errors.Title.message}</p>
          )}
        </div>

        {/* Detail */}
        <div>
          <label className="mb-1 block font-medium text-gray-700">Detail</label>
          <textarea
            placeholder="Enter post detail"
            {...register("Detail")}
            className="w-full rounded border border-gray-300 px-3 py-2 outline-none focus:border-purple-600 focus:ring focus:ring-purple-200"
          />
          {errors.Detail && (
            <p className="mt-1 text-sm text-red-500">{errors.Detail.message}</p>
          )}
        </div>

        {/* Image URL */}
        <div>
          <label className="mb-1 block font-medium text-gray-700">
            Image URL
          </label>
          <input
            type="text"
            placeholder="Enter image URL"
            {...register("Imageurl")}
            className="w-full rounded border border-gray-300 px-3 py-2 outline-none focus:border-purple-600 focus:ring focus:ring-purple-200"
          />
          {errors.Imageurl && (
            <p className="mt-1 text-sm text-red-500">
              {errors.Imageurl.message}
            </p>
          )}
        </div>

        {/* Author */}
        <div>
          <label className="mb-1 block font-medium text-gray-700">Author</label>
          <input
            type="text"
            placeholder="Enter author name"
            {...register("Author")}
            className="w-full rounded border border-gray-300 px-3 py-2 outline-none focus:border-purple-600 focus:ring focus:ring-purple-200"
          />
          {errors.Author && (
            <p className="mt-1 text-sm text-red-500">{errors.Author.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full cursor-pointer rounded bg-purple-600 px-4 py-2 font-medium text-white transition hover:bg-purple-700"
        >
          Update Post
        </button>
      </form>
    </div>
  );
};

export default UpdatePost;
