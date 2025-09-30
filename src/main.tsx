import { createRoot } from "react-dom/client";
import App from "./App/App.tsx";

const rootDiv = document.getElementById("root")!;

createRoot(rootDiv).render(<App />);
