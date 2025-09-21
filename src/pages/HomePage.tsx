import Header from '../components/Header';
import { useRestaurantsQuery } from '../services/queries/restaurant';
import type { Restaurant } from '../types';
import { useSelector } from 'react-redux';
import type { RootState } from '../features/store';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

export default function HomePage() {
  const { isLoggedIn } = useSelector((state: RootState) => state.user);
  const { data: restaurants, isLoading, error } = useRestaurantsQuery();
  const navigate = useNavigate();

  return (
    <div className="relative min-w-0 w-full flex flex-col items-center justify-start overflow-y-auto">
      <Header />
      <div
        className="flex flex-col items-center justify-center w-full relative min-h-[clamp(500px,80vw,827px)] bg-cover bg-no-repeat bg-top px-0 sm:px-0"
        style={{
          backgroundImage: "url('/images/burger_hero.svg')",
        }}
      >
        {/* Overlay SVG only */}
        <div className="flex flex-col items-center justify-center w-full relative z-20 px-[22px] sm:px-0">
          <h1 className="text-white text-center font-extrabold font-sans tracking-tight text-[clamp(2rem,5vw,3rem)] leading-[clamp(2.2rem,6vw,3.3rem)] drop-shadow-lg">
            Explore Culinary Experiences
          </h1>
          <p className="text-white text-center w-auto text-[clamp(1rem,2vw,1.5rem)] font-bold mt-[clamp(0.25rem,1vw,0.5rem)] mb-[clamp(2rem,5vw,2.5rem)] drop-shadow">
            Search and refine your choice to discover the perfect restaurant.
          </p>
          {/* Search Bar */}
          <div className="w-full max-w-[500px] flex items-center bg-white rounded-[2rem] shadow-lg px-[clamp(1.5rem,3vw,2rem)] py-[clamp(0.5rem,2vw,1rem)] mt-0">
            <svg
              className="w-5 h-5 text-gray-500"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="Search restaurants, food and drink"
              className="w-full bg-transparent outline-none border-none ring-0 text-gray-900 text-[clamp(0.9rem,1vw,1rem)] font-normal px-1.5"
            />
          </div>
        </div>
        <img
          src="/images/overlay.svg"
          alt="Overlay"
          className="absolute inset-0 z-10 w-full h-full object-cover pointer-events-none rounded-none"
        />
      </div>
      {/* Category Icons Section */}
      <div className="w-full bg-white z-30 pt-[clamp(2rem,5vw,3rem)] px-[clamp(1rem,8vw,120px)]">
        <div className="grid grid-cols-3 md:grid-cols-6 gap-x-[clamp(1.5rem,5vw,47px)] gap-y-[clamp(1rem,3vw,2rem)]">
          {[
            { icon: '/icons/all_restaurant.svg', label: 'All Restaurant' },
            { icon: '/icons/nearby.svg', label: 'Nearby' },
            { icon: '/icons/discount.svg', label: 'Discount' },
            { icon: '/icons/best_seller.svg', label: 'Best Seller' },
            { icon: '/icons/delivery.svg', label: 'Delivery' },
            { icon: '/icons/lunch.svg', label: 'Lunch' },
          ].map((cat) => (
            <div
              key={cat.label}
              className="flex flex-col items-center justify-center min-w-0 px-0 py-0 bg-transparent cursor-pointer"
            >
              <div className="flex items-center justify-center w-full h-[100px] bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-200">
                <img
                  src={cat.icon}
                  alt={cat.label}
                  className="w-[clamp(2.5rem,6vw,4.0625rem)] h-[clamp(2.5rem,6vw,4.0625rem)] object-contain"
                />
              </div>
              <div className="mt-1 text-[clamp(0.9rem,2vw,1.1rem)] font-bold text-gray-900 text-center">
                {cat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Recommended Section - Selalu tampil */}
      <div className="w-full px-[clamp(1rem,8vw,120px)] py-[clamp(2rem,5vw,3rem)]">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-[clamp(1rem,2vw,1.5rem)] gap-2">
          <h2 className="font-bold text-[clamp(1.2rem,3vw,1.7rem)] text-gray-900">Recommended</h2>
          <button className="text-primary font-semibold text-[clamp(0.95rem,2vw,1.1rem)] hover:underline">
            See All
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 justify-center">
          {isLoading &&
            Array.from({ length: 6 }).map((_, idx) => (
              <div
                key={idx}
                className="bg-gray-100 animate-pulse rounded-2xl shadow-md p-5 min-h-[152px] w-full"
              />
            ))}
          {error && (
            <div className="col-span-3 text-center text-primary">
              Failed to load restaurant data.
            </div>
          )}
          {restaurants &&
            restaurants.length > 0 &&
            restaurants.map((item: Restaurant) => (
              <div
                key={item.id}
                className={`bg-white rounded-2xl shadow-md p-5 flex flex-col gap-2 border border-gray-100 hover:shadow-xl transition-all w-full min-h-[152px] ${
                  isLoggedIn ? 'cursor-pointer' : 'cursor-not-allowed opacity-70'
                }`}
                onClick={() => {
                  if (isLoggedIn) {
                    navigate(`/restaurant/${item.id}`);
                  }
                }}
                title={isLoggedIn ? `Lihat detail ${item.name}` : 'Login untuk melihat detail'}
                style={!isLoggedIn ? { pointerEvents: 'auto' } : {}}
              >
                <div className="flex items-center gap-3 h-full">
                  <img
                    src={item.logo || '/logos/foody_logo.svg'}
                    alt={item.name}
                    className="h-12 w-12 object-contain rounded-xl border border-gray-200"
                  />
                  <div className="flex-1">
                    <div className="font-bold text-[clamp(1rem,1.2vw,1.15rem)] text-gray-900 leading-tight">
                      {item.name}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span className="flex items-center gap-1 text-yellow-500 font-semibold">
                        ★ {item.star ?? '-'}
                      </span>
                      <span>{item.place ?? '-'}</span>
                    </div>
                  </div>
                </div>
                {!isLoggedIn && (
                  <div className="mt-2 text-xs text-primary font-semibold">
                    Login to view restaurant details
                  </div>
                )}
              </div>
            ))}
        </div>
        <div className="flex justify-center mt-[clamp(2rem,5vw,3rem)]">
          <button className="px-8 py-2 rounded-full bg-white border border-gray-300 shadow text-[clamp(1rem,2vw,1.1rem)] font-semibold hover:bg-gray-50 transition">
            Show More
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
