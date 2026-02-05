import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAppDispatch } from "@/App/hooks";
import { addTodo } from "@/Features/todoSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const todoschema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(5, "Description must be at least 5 characters"),
});

type TodoFormData = z.infer<typeof todoschema>;

const AddTodo = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<TodoFormData>({
    resolver: zodResolver(todoschema),
  });

  const onSubmit = (data: TodoFormData) => {
    dispatch(addTodo(data));
    toast.success("Todo added successfully!");
    setTimeout(() => navigate("/"), 1000);
    reset();
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-linear-to-b from-neutral-200 to-neutral-50 px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-center text-2xl font-bold text-gray-800">
          Add a New Todo
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Title */}
          <div>
            <input
              type="text"
              placeholder="Enter title"
              {...register("title")}
              className={`w-full rounded-lg border px-4 py-3 text-gray-700 transition outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 ${
                errors.title ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-500">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <textarea
              placeholder="Enter description"
              {...register("description")}
              rows={4}
              className={`w-full rounded-lg border px-4 py-3 text-gray-700 transition outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 ${
                errors.description ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-purple-600 py-3 font-semibold text-white transition hover:bg-purple-700 active:scale-95"
          >
            Add Todo
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTodo;
