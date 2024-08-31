import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/user/Home";
import Dashboard from "./pages/admin/Dashboard";
import List from "./pages/user/List";
import Loginadm from "./pages/admin/Loginadm";
import GuideDashboard from "./pages/user/guide/GuideDashboard";
import Onboarding from "./pages/user/guide/Onboarding";
import AddBlog from "./pages/user/guide/AddBlog";
import Unauthorized from "./pages/Unauthorized";
import { AuthProvider } from "./hooks/useAuth";
import RequiredAuth from "./components/RequiredAuth";
import PublicRoute from "./components/PublicRoute";
import Draft from "./pages/user/guide/Draft";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Routes for both "user" and "guide" roles */}
          <Route element={<RequiredAuth allowedRoles={["user", "guide"]} />}>
            <Route path="/home" element={<Home />} />
            <Route path="/list" element={<List />} />
          </Route>

          {/* Routes specific to the "guide" role */}
          <Route element={<RequiredAuth allowedRoles={["guide"]} />}>
            <Route path="/guide" element={<GuideDashboard />} />
            <Route path="/onb" element={<Onboarding />} />
            <Route path="/draft" element={<Draft />} />

            {/* Gunakan dynamic route */}
            <Route path="/edit/:slug" element={<AddBlog />} />
          </Route>

          {/* Routes specific to the "admin" role */}
          <Route element={<RequiredAuth allowedRoles={["admin"]} />}>
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/admin/data" element={<Dashboard />} />
          </Route>

          {/* Public Routes */}
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<LandingPage />} />
            <Route path="/admin/login" element={<Loginadm />} />
            <Route path="/register" element={<Register />} />
          </Route>

          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
