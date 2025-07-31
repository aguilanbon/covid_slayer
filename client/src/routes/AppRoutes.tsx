import { Routes, Route } from "react-router";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import GameInterface from "../pages/GameInterface";
import ProtectedRoute from "../components/ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/game"
        element={
          <ProtectedRoute>
            <GameInterface />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
