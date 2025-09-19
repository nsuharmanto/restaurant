export default function Footer() {
  return (
    <footer className="bg-[#181818] text-white w-full mt-auto pt-10 pb-6 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8 md:gap-16 justify-between items-start">
        <div className="mb-6 md:mb-0 flex-1">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl font-bold text-red-500">Foody</span>
          </div>
          <p className="text-sm text-gray-300 mb-4 max-w-xs">Enjoy homemade flavors & chef's signature dishes, freshly prepared every day. Order online or visit our nearest branch.</p>
          <div className="flex gap-3">
            <a href="#" className="bg-gray-800 rounded-full p-2 hover:bg-gray-700"><i className="fab fa-facebook-f" /></a>
            <a href="#" className="bg-gray-800 rounded-full p-2 hover:bg-gray-700"><i className="fab fa-instagram" /></a>
            <a href="#" className="bg-gray-800 rounded-full p-2 hover:bg-gray-700"><i className="fab fa-linkedin-in" /></a>
            <a href="#" className="bg-gray-800 rounded-full p-2 hover:bg-gray-700"><i className="fab fa-tiktok" /></a>
          </div>
        </div>
        <div className="flex-1 grid grid-cols-2 gap-8">
          <div>
            <h4 className="font-semibold mb-3 text-base">Explore</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>All Food</li>
              <li>Nearby</li>
              <li>Discount</li>
              <li>Best Seller</li>
              <li>Delivery</li>
              <li>Lunch</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-base">Help</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>How to Order</li>
              <li>Payment Methods</li>
              <li>Track My Order</li>
              <li>FAQ</li>
              <li>Contact Us</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
