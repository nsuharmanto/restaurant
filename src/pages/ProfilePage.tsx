import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../features/store';
import { getAvatar } from '../utils/getAvatar';
import { logout } from '../features/user/userSlice';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function ProfilePage() {
  const { user } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const phone = user?.phone || '-';

  return (
    <div className="min-h-screen flex flex-col bg-[#fafafa]">
      {/* Header */}
      <Header solid />

      {/* Main Content */}
      <main
        className="flex-1 w-full flex flex-col md:flex-row
        md:items-start
        md:justify-start
        px-4
        md:px-[clamp(1rem,8vw,120px)]
        py-[clamp(1.5rem,4vw,3rem)]
        md:py-[clamp(2.5rem,6vw,4rem)]
        bg-[#fafafa]
        transition-all"
      >
        {/* Sidebar + Profile Card Container */}
        <div className="w-full flex flex-col md:flex-row gap-8 mt-[48px] mb-[197px]">
          
          {/* Sidebar (Desktop) */}
          <aside
            className="hidden md:flex flex-col bg-white rounded-2xl shadow-[0_4px_24px_0_rgba(0,0,0,0.06)] p-6 min-w-[240px] max-w-[260px] h-max mr-0 md:mr-8"
            style={{ marginRight: 32 }}
          >
            <div className="flex flex-row items-center mb-6 gap-3 w-max">
              <img
                src={getAvatar(user || undefined)}
                alt={user?.name || 'User'}
                className="w-14 h-14 rounded-full object-cover"
              />
              <div className="font-bold text-lg text-gray-900 whitespace-nowrap">{user?.name}</div>
            </div>
            <button
              className="flex items-center gap-3 px-2 py-3 rounded-lg hover:bg-gray-50 font-medium text-left text-gray-900 transition"
              onClick={() => navigate('/address')}
            >
              <img
                src="/icons/delivery_address.svg"
                alt="Delivery Address"
                width={24}
                height={24}
                className="inline-block"
              />
              <span className="text-base">Delivery Address</span>
            </button>
            <button
              className="flex items-center gap-3 px-2 py-3 rounded-lg hover:bg-gray-50 font-medium text-left text-gray-900 transition"
              onClick={() => navigate('/orders')}
            >
              <img
                src="/icons/my_orders.svg"
                alt="My Orders"
                width={24}
                height={24}
                className="inline-block"
              />
              <span className="text-base">My Orders</span>
            </button>
            <button
              className="flex items-center gap-3 px-2 py-3 rounded-lg hover:bg-gray-50 font-medium text-left text-red-600 transition mt-2"
              onClick={() => {
                dispatch(logout());
                navigate('/');
              }}
            >
              <img
                src="/icons/logout.svg"
                alt="Logout"
                width={24}
                height={24}
                className="inline-block"
              />
              <span className="text-base">Logout</span>
            </button>
          </aside>

          {/* Profile Card */}
          <section className="flex-1 flex flex-col items-center md:items-start">
            <h2 className="font-extrabold text-2xl md:text-3xl text-gray-900 mb-6 w-full md:w-auto">
              Profile
            </h2>
            <div className="w-full max-w-lg bg-white rounded-2xl shadow-[0_4px_24px_0_rgba(0,0,0,0.06)] p-6 flex flex-col items-start">
              <img
                src={getAvatar(user || undefined)}
                alt={user?.name || 'User'}
                className="w-20 h-20 rounded-full object-cover  mb-4"
              />
              <div className="w-full flex flex-col gap-3">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-950">Name</span>
                  <span className="font-bold text-gray-950">{user?.name}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-950">Email</span>
                  <span className="font-bold text-gray-950">{user?.email}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-950">Handphone Number</span>
                  <span className="font-bold text-gray-950">{phone}</span>
                </div>
                <button className="w-full bg-primary text-white font-semibold py-3 rounded-full text-base hover:bg-red-700 transition mt-4">
                  Update Profile
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}
