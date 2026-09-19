import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { PreferencesProvider } from "./lib/preferences";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <PreferencesProvider>
    <App />
  </PreferencesProvider>
);

if (
  "serviceWorker" in navigator &&
  !["localhost", "127.0.0.1"].includes(window.location.hostname)
) {
  window.addEventListener("load", () => navigator.serviceWorker.register("/sw.js"));
}
