import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { startTheme } from "./hooks/useTheme";
import "./index.css";

startTheme();
createRoot(document.getElementById("root")!).render(<App />);
