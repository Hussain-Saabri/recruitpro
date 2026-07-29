import { Toaster } from "sonner";
import AppRoutes from "./routes/AppRoutes";
import "./App.css";

function App() {
  return (
    <>
      <Toaster richColors position="top-right" closeButton />
      <AppRoutes />
    </>
  );
}

export default App
