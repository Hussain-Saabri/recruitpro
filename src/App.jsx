import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Toaster } from "sonner";
import AppRoutes from "./routes/AppRoutes";
import "./App.css";

const theme = createTheme({
  typography: {
    fontFamily: "'Satoshi', system-ui, -apple-system, sans-serif",
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Toaster richColors position="top-right" closeButton />
      <AppRoutes />
    </ThemeProvider>
  );
}

export default App
