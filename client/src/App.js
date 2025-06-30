import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./utils/ProtectedRoutes";
import CustomerPage from "./pages/CustomerPage";
import LandingPage from "./pages/LandingPage";
import SignInPage from "./pages/Signin";

import AdminDashboard from "./pages/AdminDashboard";
import Dashboard from "./components/admin/Dashboard";
import Orders from "./components/admin/Orders";
import MenuManage from "./components/admin/MenuManage";
import GenerateQr from "./components/admin/GenerateQr";

function App() {
  return (
    <Router>
      <Routes>
        {/* Customer Route */}
        <Route path="/menu/:tableId" element={<CustomerPage />} />

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
          <Route path="menu" element={<MenuManage />} />
          <Route path="generate-qr" element={<GenerateQr />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
