import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import LandingPage from "./pages/LandingPage";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/user/Home";
import Dashboard from "./pages/admin/Dashboard";
import List from "./pages/user/List";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* TODO: Ini harus bisa diakses setelah login (buatin context) */}
        <Route path="/home" element={<Home />} />
        <Route path="/list" element={<List />} />
        {/* TODO: Ini harus bisa diakses setelah login (buatin context) */}
        <Route path="/dashboard" element={<Dashboard />} />
        {/* TODO: Ini harus bisa diakses setelah login (buatin context) */}

        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
