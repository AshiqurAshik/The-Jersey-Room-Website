import React, { useEffect, useState } from "react";

const Cart = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  const handleRemove = (id, size) => {
    const updatedCart = cart.filter(
      (item) => !(item.id === id && item.size === size)
    );

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>

      {cart.length === 0 ? (
        <h2 className="text-xl text-gray-500">Your cart is empty.</h2>
      ) : (
        <>
          <div className="space-y-6">
            {cart.map((item) => (
              <div
                key={`${item.id}-${item.size}`}
                className="flex justify-between items-center bg-gray-100 rounded-xl p-5"
              >
                <div className="flex items-center gap-5">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-28 h-28 object-contain"
                  />

                  <div>
                    <h2 className="text-xl font-semibold">
                      {item.name}
                    </h2>

                    <p className="text-gray-600">
                      Price: ৳{item.price}
                    </p>

                    <p className="text-gray-600">
                      Size: {item.size}
                    </p>

                    <p className="text-gray-600">
                      Quantity: {item.quantity}
                    </p>

                    <p className="font-semibold text-[#0B3D2E] mt-2">
                      Total: ৳{item.price * item.quantity}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => handleRemove(item.id, item.size)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>


          <div className="mt-10 flex justify-end">
            <div className="w-full md:w-96 bg-gray-100 rounded-xl p-6">
              <h2 className="text-2xl font-bold mb-4">
                Order Summary
              </h2>

              <div className="flex justify-between mb-3">
                <span>Total Items</span>
                <span>{cart.length}</span>
              </div>

              <div className="flex justify-between text-xl font-bold border-t pt-4">
                <span>Total</span>
                <span>৳{totalPrice}</span>
              </div>

              <button className="w-full mt-6 py-3 rounded-lg bg-[#0B3D2E] text-white font-semibold hover:bg-[#07291f] transition">
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