import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { StudentsProvider } from "../context/studentsContext.jsx";
import { InternshipProvider } from "../context/internshipsContext.jsx";
import { MatchResultsProvider } from "../context/matchResultContext.jsx";
import { NotificationsProvider } from "../context/notificationsContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <InternshipProvider>
      <StudentsProvider>
        <MatchResultsProvider>
          <NotificationsProvider>
            <App />
          </NotificationsProvider>
        </MatchResultsProvider>
      </StudentsProvider>
    </InternshipProvider>
  </BrowserRouter>
);
