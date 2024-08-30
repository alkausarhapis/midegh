import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const PublicRoute = () => {
  const { user, userData, loading } = useAuth(); // Access userData as well

  // Show loading state if data is still being loaded
  if (loading) {
    return <div>Loading...</div>;
  }

  // Redirect based on the user's role
  if (user) {
    if (userData && userData.role === "admin") {
      return <Navigate to="/admin" replace />;
    } else if (
      userData &&
      (userData.role === "user" || userData.role === "guide")
    ) {
      return <Navigate to="/home" replace />;
    } else {
      return <Navigate to="/" replace />;
    }
  }

  // Render the child components if no user is logged in
  return <Outlet />;
};

export default PublicRoute;
