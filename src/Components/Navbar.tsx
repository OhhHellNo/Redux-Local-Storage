import { useNavigate } from "react-router-dom";
import { Home, PlusCircle, FileText } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();

  const navlinks = [
    { name: "Home", path: "/", icon: <Home size={20} /> },
    { name: "Add-Todo", path: "/add-todo", icon: <PlusCircle size={20} /> },
    { name: "Add-Post", path: "/add-posts", icon: <FileText size={20} /> },
  ];

  return (
    <nav className="mx-auto flex h-16 w-full max-w-4xl items-center justify-between rounded-xl border-2 border-solid border-gray-300 bg-white px-6">
      {/* Logo */}
      <div
        className="cursor-pointer text-2xl font-bold text-gray-800 transition hover:text-purple-600"
        onClick={() => navigate("/")}
      >
        Chill-Todo
      </div>

      {/* Nav links */}
      <div className="flex gap-6">
        {navlinks.map((nav) => (
          <div
            key={nav.path}
            onClick={() => navigate(nav.path)}
            className="flex cursor-pointer items-center gap-1 font-medium text-gray-700 transition hover:text-purple-600"
          >
            {nav.icon}
            {nav.name}
          </div>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
