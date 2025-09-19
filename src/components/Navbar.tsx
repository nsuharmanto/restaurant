import { Link } from 'react-router-dom';
import CartDrawer from './CartDrawer';

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-md rounded-b-2xl mb-6">
      <div className="flex items-center gap-6">
        <Link to="/" className="text-2xl font-bold text-primary tracking-wide">Restoku</Link>
        <Link to="/orders" className="text-base text-gray-600 hover:text-primary">Riwayat Pesanan</Link>
      </div>
      <CartDrawer />
    </nav>
  );
}
