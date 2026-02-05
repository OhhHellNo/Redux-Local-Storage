import Approutes from "./Routes/Approutes";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <div className="min-h-screen w-full  bg-gray-200">
        <Approutes></Approutes>
        <ToastContainer></ToastContainer>
      </div>
    </>
  );
}

export default App;
