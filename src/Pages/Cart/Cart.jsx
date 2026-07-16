import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
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
      <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>

      {cart.length === 0 ? (
        <div className="text-center py-20">
          <h2 className="text-2xl font-semibold text-gray-700">
            Your cart is empty.
          </h2>

          <button
            onClick={() => navigate('/products')}
            className="mt-6 px-6 py-3 bg-[#0B3D2E] text-white rounded-lg hover:bg-[#07291f]"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <>
          <div className="space-y-6">
            {cart.map((item) => (
              <div
                key={`${item.id}-${item.size}`}
                className="flex flex-col md:flex-row justify-between items-center bg-gray-100 rounded-xl p-5 gap-5"
              >
                <div className="flex items-center gap-5">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-28 h-28 object-contain"
                  />

                  <div>
                    <h2 className="text-xl font-semibold">{item.name}</h2>

                    <p className="text-gray-600">Price: ৳{item.price}</p>

                    <p className="text-gray-600">Size: {item.size}</p>

                    <p className="text-gray-600">Quantity: {item.quantity}</p>

                    <p className="font-semibold text-[#0B3D2E] mt-2">
                      Total: ৳{item.price * item.quantity}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => handleRemove(item.id, item.size)}
                  className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="mt-10 flex justify-end">
            <div className="w-full md:w-96 bg-gray-100 rounded-xl p-6">
              <h2 className="text-2xl font-bold mb-4">Order Summary</h2>

              <div className="flex justify-between mb-3">
                <span>Total Items</span>
                <span>{totalItems}</span>
              </div>

              <div className="flex justify-between text-xl font-bold border-t pt-4">
                <span>Total</span>
                <span>৳{totalPrice}</span>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full mt-6 py-3 rounded-lg bg-[#0B3D2E] text-white font-semibold hover:bg-[#07291f] transition"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
