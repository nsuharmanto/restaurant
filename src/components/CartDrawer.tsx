import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../features/store';
import { updateQty, removeFromCart, clearCart } from '../features/cart/cartSlice';
import { Dialog, DialogTrigger } from './ui/dialog';
import { Button } from './ui/button';
import { useState } from 'react';

export default function CartDrawer() {
  const [open, setOpen] = useState(false);
  const cart = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>
        Keranjang ({cart.length})
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
  <DialogTrigger asChild />
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-lg font-bold mb-4">Keranjang</h2>
            {cart.length === 0 ? (
              <div className="text-gray-500">Keranjang kosong.</div>
            ) : (
              <div className="space-y-4">
                {cart.map(item => (
                  <div key={item.id} className="flex items-center gap-2">
                    <img src={item.imageUrl} alt={item.name} className="h-10 w-10 object-cover rounded" />
                    <div className="flex-1">
                      <div className="font-bold">{item.name}</div>
                      <div className="text-sm text-gray-500">Rp {item.price}</div>
                    </div>
                    <input
                      type="number"
                      min={1}
                      value={item.qty}
                      onChange={e => dispatch(updateQty({ id: item.id, qty: Number(e.target.value) }))}
                      className="w-16 border rounded px-2 py-1"
                    />
                    <Button variant="destructive" onClick={() => dispatch(removeFromCart(item.id))}>
                      Hapus
                    </Button>
                  </div>
                ))}
                <div className="font-bold text-right">Total: Rp {total}</div>
                <Button className="w-full" onClick={() => { dispatch(clearCart()); setOpen(false); }}>
                  Checkout
                </Button>
              </div>
            )}
            <Button className="mt-4 w-full" variant="outline" onClick={() => setOpen(false)}>
              Tutup
            </Button>
          </div>
        </div>
      </Dialog>
    </>
  );
}
