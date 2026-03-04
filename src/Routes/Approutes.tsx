import Rootlayout from "@/Layouts/Rootlayout";
import { AddPost } from "@/Pages/AddPost";
import AddTodo from "@/Pages/AddTodo";
import { Home } from "@/Pages/Home";
import UpdatePost from "@/Pages/UpdatePost";
import { UpdateTodo } from "@/Pages/UpdateTodo";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const Approutes = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Rootlayout></Rootlayout>,
      children: [
        {
          index: true,
          element: <Home></Home>,
        },
        {
          path: "/add-todo",
          element: <AddTodo></AddTodo>,
        },
        {
          path: `/update-todo/:id`,
          element: <UpdateTodo></UpdateTodo>,
        },
        {
          path: "/add-posts",
          element: <AddPost></AddPost>,
        },
        {
          path: `/update-posts/:id`,
          element: <UpdatePost></UpdatePost>,
        },
      ],
    },
  ]);
  return <RouterProvider router={router}></RouterProvider>;
};

export default Approutes;
