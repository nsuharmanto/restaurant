import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.tsx';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage.tsx';
import AddressPage from './pages/AddressPage.tsx';
import OrdersPage from './pages/OrdersPage';
import { Toaster } from "@/components/ui/toaster";

function App() {
  return (
    <BrowserRouter>
      {/* Toaster di luar Routes */}
      <Toaster />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/address" element={<AddressPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        {/* Tambahkan route lain sesuai kebutuhan */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;