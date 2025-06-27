import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MenuPage from "./components/customer/MenuPage";
import LandingPage from "./pages/LandingPage"
import SignInPage from "./pages/SignUp"

function App() {
  return (
    <Router>
      <Routes>
        {/* Customer Routes */}
        <Route path="/menu/:tableId" element={<MenuPage />} />

        {/* Admin Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<SignInPage />}/>

      </Routes>
    </Router>
  );
}

export default App;
