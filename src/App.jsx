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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* TODO: Ini harus bisa diakses setelah login (buatin context) */}
        <Route path="/home" element={<Home />} />
        <Route path="/list" element={<List />} />
        <Route path="/guide" element={<GuideDashboard />} />
        <Route path="/onb" element={<Onboarding />} />
        <Route path="/addblog" element={<AddBlog />} />
        {/* TODO: Ini harus bisa diakses setelah login (buatin context) */}
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/admin/data" element={<Dashboard />} />
        {/* TODO: Ini harus bisa diakses setelah login (buatin context) */}

        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/login" element={<Loginadm />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
