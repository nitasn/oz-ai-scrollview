import { createRoot } from "react-dom/client";
import App from "./App/App.tsx";
import "./global.css";

const rootDiv = document.getElementById("root")!;

createRoot(rootDiv).render(<App />);
