import { Routes, Route } from "react-router-dom";
import Login from "./features/auth/pages/Login";
import DashboardHome from "./features/dashboard/pages/DashboardHome";
import ProtectedRoute from "./components/routes/ProtectedRoutes";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardHome />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}
export default App;
