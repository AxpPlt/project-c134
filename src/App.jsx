import "./styles/App.scss";
import "./styles/__main.scss";
import { Routes, Route } from "react-router-dom";
import {
  MainPage,
  NoLogin,
  SettingsPage,
  SettingsCards,
  SettingsFields,
} from "./pages";

import { ProtectedRoute } from "./routes/ProtectedRoute";
import { AuthProvider } from "./hooks/useAuth";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<NoLogin />} />
        <Route
          path="main"
          element={
            <ProtectedRoute>
              <MainPage></MainPage>
            </ProtectedRoute>
          }
        >
          <Route path="settings" element={<SettingsPage />}>
            <Route path="settings-cards" element={<SettingsCards />}></Route>
            <Route path="settings-fields" element={<SettingsFields />}></Route>
          </Route>
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
