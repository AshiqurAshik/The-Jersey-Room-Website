import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import {
  HiOutlineTrash,
  HiOutlineShoppingBag,
  HiArrowLeft,
} from 'react-icons/hi';
import Loading from '../../Components/Loading/Loading';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
      setCart(savedCart);
      setLoading(false);
    }, 500);
  }, []);

  const handleRemove = (id, size) => {
    const updatedCart = cart.filter(
      (item) => !(item.id === id && item.size === size),
    );

    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleCheckout = () => {
    Swal.fire({
      title: 'Confirm Order?',
      text: 'Are you sure you want to place this order?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Place Order',
      cancelButtonText: 'Continue Shopping',
      confirmButtonColor: '#0B3D2E',
      cancelButtonColor: '#6B7280',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('cart');
        setCart([]);

        Swal.fire({
          icon: 'success',
          title: '🎉 Order Confirmed!',
          html: `
            <p>Your order has been placed successfully.</p>
            <small>Thank you for shopping with us.</small>
          `,
          confirmButtonColor: '#0B3D2E',
        }).then(() => {
          navigate('/');
        });
      }
    });
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-[#0B3D2E] transition-colors"
      >
        <HiArrowLeft size={18} />
        Back
      </button>

      <div className="flex items-center gap-3 mb-8">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#C8F169]/20">
          <HiOutlineShoppingBag size={22} className="text-[#0B3D2E]" />
        </div>
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#0A0A0A]">
            Shopping Cart
          </h1>
          {cart.length > 0 && (
            <p className="text-sm text-gray-500">
              {totalItems} {totalItems === 1 ? 'item' : 'items'} in your cart
            </p>
          )}
        </div>
      </div>

      {cart.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
            <HiOutlineShoppingBag size={36} className="text-gray-400" />
          </div>

          <h2 className="mt-6 text-2xl font-semibold text-gray-700">
            Your cart is empty
          </h2>
          <p className="mt-1 text-gray-500">
            Looks like you haven't added any jerseys yet.
          </p>

          <button
            onClick={() => navigate('/products')}
            className="group relative mt-8 overflow-hidden px-8 py-3 bg-[#0B3D2E] text-white rounded-lg font-semibold shadow-lg shadow-[#0B3D2E]/20 transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
          >
            <span className="relative z-10">Continue Shopping</span>
          </button>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Cart items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div
                key={`${item.id}-${item.size}`}
                className="flex flex-col sm:flex-row items-center gap-5 rounded-2xl bg-gray-50 border border-black/5 p-5 transition-shadow duration-300 hover:shadow-md"
              >
                <div className="shrink-0 rounded-xl bg-white p-2">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-28 h-28 object-contain"
                  />
                </div>

                <div className="flex-1 text-center sm:text-left">
                  <h2 className="text-lg font-semibold text-[#0A0A0A]">
                    {item.name}
                  </h2>

                  <div className="mt-1 flex flex-wrap justify-center sm:justify-start gap-x-4 gap-y-1 text-sm text-gray-500">
                    <span>Size: {item.size}</span>
                    <span>Qty: {item.quantity}</span>
                    <span>৳{item.price} each</span>
                  </div>

                  <p className="font-bold text-[#0B3D2E] mt-2">
                    Total: ৳{item.price * item.quantity}
                  </p>
                </div>

                <button
                  onClick={() => handleRemove(item.id, item.size)}
                  className="flex items-center gap-2 rounded-lg border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50"
                >
                  <HiOutlineTrash size={16} />
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Order summary */}
          <div className="lg:sticky lg:top-24 rounded-2xl bg-gray-50 border border-black/5 p-6">
            <h2 className="text-xl font-bold text-[#0A0A0A] mb-5">
              Order Summary
            </h2>

            <div className="flex justify-between text-sm text-gray-600 mb-3">
              <span>Total Items</span>
              <span className="font-medium text-[#0A0A0A]">{totalItems}</span>
            </div>

            <div className="flex justify-between text-xl font-bold border-t border-black/10 pt-4">
              <span>Total</span>
              <span className="text-[#0B3D2E]">৳{totalPrice}</span>
            </div>

            <button
              onClick={handleCheckout}
              className="group relative w-full mt-6 overflow-hidden py-3.5 rounded-xl bg-[#0B3D2E] text-white font-semibold shadow-lg shadow-[#0B3D2E]/20 transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
            >
              <span className="relative z-10">Proceed to Checkout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
