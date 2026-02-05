import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useParams, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "@/App/hooks";
import { updateTodoText } from "@/Features/todoSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const todoSchema = z.object({
  title: z.string().min(5, "Todo must be at least 5 characters"),
  description: z.string().min(5, "Description must be at least 5 characters"),
});

type TodoFormData = z.infer<typeof todoSchema>;

export const UpdateTodo = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const todo = useAppSelector((state) =>
    state.Todos.find((t) => t.id === Number(id)),
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TodoFormData>({
    resolver: zodResolver(todoSchema),
  });

  useEffect(() => {
    if (todo) {
      reset({ title: todo.title, description: todo.description });
    } else {
      toast.error("Todo not found");
      navigate("/");
    }
  }, [todo, reset, navigate]);

  const onSubmit = (data: TodoFormData) => {
    if (!todo) return;

    dispatch(
      updateTodoText({
        id: todo.id,
        title: data.title,
        description: data.description,
      }),
    );

    toast.success("Todo updated successfully!");
    navigate("/");
  };

  return (
    <div className="mx-auto mt-10 max-w-xl p-4 rounded-2xl">
      <h1 className="mb-6 text-center text-2xl font-bold">Update Todo</h1>

      <form
        className="space-y-4 rounded border bg-white p-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <label className="mb-1 block font-medium">Todo Text</label>
          <input
            type="text"
            {...register("title")}
            className="w-full rounded border px-2 py-1"
          />
          {errors.title && (
            <p className="mt-1 text-red-500">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label className="mb-1 block font-medium">Description</label>
          <textarea
            {...register("description")}
            className="w-full rounded border px-2 py-1"
            rows={3}
          />
          {errors.description && (
            <p className="mt-1 text-red-500">{errors.description.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full cursor-pointer rounded bg-purple-600 px-4 py-2 font-medium text-white transition hover:bg-purple-700"
        >
          Update Todo
        </button>
      </form>
    </div>
  );
};
