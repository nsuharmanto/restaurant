import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../features/store';
import { logout } from '../features/user/userSlice';

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [scrolled, setScrolled] = useState(false);
  const { isLoggedIn, user } = useSelector((state: RootState) => state.user);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (!(e.target as HTMLElement).closest('#user-dropdown')) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClick);
    }
    return () => document.removeEventListener('mousedown', handleClick);
  }, [dropdownOpen]);

  return (
    <header
      className={`fixed top-0 left-0 w-full h-[clamp(64px,8vw,80px)] z-50 flex items-center justify-between px-4 md:px-[clamp(32px,8vw,120px)] transition-colors duration-300 ${
        scrolled ? 'bg-white shadow' : 'bg-none'
      }`}
    >
      <div className="flex items-center gap-3 md:gap-4">
        <img
          src={scrolled ? '/logos/foody_logo_r.svg' : '/logos/foody_logo.svg'}
          alt="Foody Logo"
          className="h-8 w-8 md:h-10 md:w-10 transition-all duration-300"
        />
        <span
          className={`font-extrabold font-sans tracking-tight text-[clamp(1.5rem,4vw,2.5rem)] transition-colors duration-300 ${
            scrolled ? 'text-gray-900' : 'text-white'
          }`}
        >
          Foody
        </span>
      </div>
      <div className="flex items-center gap-2 md:gap-4">
        {isLoggedIn && user ? (
          <>
            {/* Cart */}
            <button
              className="relative p-2 rounded-full bg-transparent hover:bg-gray-100 transition"
              aria-label="Cart"
              onClick={() => navigate('/cart')}
            >
              <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
                <path d="M6 6h15l-1.5 9h-13z" stroke="#222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="9" cy="20" r="1" fill="#222"/>
                <circle cx="18" cy="20" r="1" fill="#222"/>
              </svg>
            </button>
            {/* User */}
            <div className="relative" id="user-dropdown">
              <button
                className="flex items-center gap-2 focus:outline-none"
                onClick={() => setDropdownOpen((v) => !v)}
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-8 h-8 rounded-full object-cover border-2 border-primary"
                />
                <span
                  className={`font-semibold text-base transition-colors duration-300 ${
                    scrolled ? 'text-gray-900' : 'text-white'
                  }`}
                >
                  {user.name}
                </span>
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-30">
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-800"
                    onClick={() => {
                      setDropdownOpen(false);
                      navigate('/orders');
                    }}
                  >
                    My Orders
                  </button>
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-800"
                    onClick={() => {
                      dispatch(logout());
                      setDropdownOpen(false);
                      navigate('/login');
                    }}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <button
              className={`rounded-full px-4 md:px-8 py-2 font-semibold text-base md:text-[1rem] transition-all duration-300 border-2 ${
                scrolled
                  ? 'border-gray-900 text-gray-900 bg-transparent hover:bg-gray-100'
                  : 'border-[#E9EAEB] text-white bg-transparent hover:bg-white/10'
              } shadow-none`}
              style={{ height: 'clamp(40px,6vw,48px)', minWidth: 'clamp(100px,12vw,160px)' }}
              onClick={() => navigate('/login')}
            >
              Sign In
            </button>
            <button
              className={`rounded-full px-4 md:px-8 py-2 font-semibold text-base md:text-[1rem] transition-all duration-300 border-2 ${
                scrolled
                  ? 'border-primary bg-primary text-white hover:bg-red-700'
                  : 'border-white bg-white text-[#181818] hover:bg-gray-100'
              } shadow-none`}
              style={{ height: 'clamp(40px,6vw,48px)', minWidth: 'clamp(100px,12vw,160px)' }}
              onClick={() => navigate('/register')}
            >
              Sign Up
            </button>
          </>
        )}
      </div>
    </header>
  );
}