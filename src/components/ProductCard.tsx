import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/cart/cartSlice';
import type { MenuItem } from '../types';

export default function ProductCard({ item }: { item: MenuItem }) {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      qty: 1,
      imageUrl: item.imageUrl,
    }));
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-5 flex flex-col gap-2 border border-gray-100 hover:shadow-xl transition-all min-h-[clamp(120px,18vw,180px)]">
      <div className="flex items-center gap-3">
        <img src={item.imageUrl || '/assets/dummy-logo.png'} alt={item.name} className="h-12 w-12 object-contain rounded-xl border border-gray-200" />
        <div className="flex-1">
          <div className="font-bold text-[clamp(1rem,1.2vw,1.15rem)] text-gray-900 leading-tight">{item.name}</div>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span className="flex items-center gap-1 text-yellow-500 font-semibold">★ {item.rating ?? '-'} </span>
            <span>Jakarta Selatan</span>
            <span>· 2.4 km</span>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between mt-2">
        <div className="text-[clamp(0.95rem,1vw,1.1rem)] text-primary font-semibold">Rp {item.price.toLocaleString('id-ID')}</div>
        <Button className="rounded-full bg-primary text-white font-bold px-4 py-1 text-xs hover:bg-primary/90 transition shadow-sm" onClick={handleAddToCart}>
          Add
        </Button>
      </div>
    </div>
  );
}
