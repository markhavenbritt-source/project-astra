// REPLACES your existing src/main.tsx
// Only change: the whole app is now wrapped in <AuthProvider> so every page
// knows who's signed in and can open the sign-in sheet.

import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { AuthProvider } from "./lib/AuthProvider";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <App />
  </AuthProvider>
);
