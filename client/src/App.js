import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./utils/ProtectedRoutes";
import MenuPage from "./components/customer/MenuPage";
import LandingPage from "./pages/LandingPage";
import SignInPage from "./pages/Signin";

import AdminDashboard from "./pages/AdminDashboard";
import Dashboard from "./components/admin/Dashboard";
import GenerateQr from "./components/admin/GenerateQr";
import Orders from "./components/admin/Orders";

function App() {
  return (
    <Router>
      <Routes>
        {/* Customer Route */}
        <Route path="/menu/:tableId" element={<MenuPage />} />

        {/* Public Pages */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<SignInPage />} />

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} /> 
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="orders" element={<Orders />} />
          <Route path="generate-qr" element={<GenerateQr />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
