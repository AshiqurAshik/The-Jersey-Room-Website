import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

const Details = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetch('/Products.json')
      .then((res) => res.json())
      .then((data) => {
        const singleProduct = data.find((item) => item.id == id);
        setProduct(singleProduct);
      });
  }, [id]);

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size.');
      return;
    }

    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    const existingItem = cart.find(
      (item) => item.id === product.id && item.size === selectedSize,
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({
        ...product,
        size: selectedSize,
        quantity,
      });
    }

    localStorage.setItem('cart', JSON.stringify(cart));

    alert('Product added to cart!');
  };

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto py-20 text-center">
        <h2 className="text-2xl font-semibold">Loading...</h2>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="bg-gray-100 rounded-xl p-8">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-[500px] object-contain"
          />
        </div>

        <div>
          <p className="inline-block bg-[#0B3D2E] text-white px-3 py-1 rounded-full text-sm">
            {product.category}
          </p>

          <h1 className="text-4xl font-bold mt-4">{product.name}</h1>

          <p className="text-gray-500 mt-2">{product.team}</p>

          <p className="text-3xl font-bold text-[#0B3D2E] mt-5">
            ৳ {product.price}
          </p>

          <div className="grid grid-cols-2 gap-4 mt-8">
            <div className="bg-gray-100 rounded-lg p-4">
              <h3 className="font-semibold">Sport</h3>
              <p>{product.sport}</p>
            </div>

            <div className="bg-gray-100 rounded-lg p-4">
              <h3 className="font-semibold">Type</h3>
              <p>{product.type}</p>
            </div>

            <div className="bg-gray-100 rounded-lg p-4">
              <h3 className="font-semibold">Rating</h3>
              <p>⭐ {product.rating}</p>
            </div>

            <div className="bg-gray-100 rounded-lg p-4">
              <h3 className="font-semibold">Stock</h3>
              <p
                className={product.inStock ? 'text-green-600' : 'text-red-600'}
              >
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </p>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="font-semibold text-lg mb-2">Description</h3>

            <p className="text-gray-600 leading-7">{product.description}</p>
          </div>

          <div className="mt-8">
            <h3 className="font-semibold text-lg mb-2">Available Colors</h3>

            <div className="flex gap-2">
              {product.colors.map((color) => (
                <span
                  key={color}
                  className="px-3 py-1 bg-gray-200 rounded-full"
                >
                  {color}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <h3 className="font-semibold text-lg mb-2">Select Size</h3>

            <div className="flex flex-wrap gap-3">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-12 h-12 rounded-lg border transition ${
                    selectedSize === size
                      ? 'bg-[#0B3D2E] text-white border-[#0B3D2E]'
                      : 'bg-white hover:bg-gray-100'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <h3 className="font-semibold text-lg mb-2">Quantity</h3>

            <div className="flex items-center gap-4">
              <button
                onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                className="w-10 h-10 rounded-lg bg-gray-200 text-xl"
              >
                -
              </button>

              <span className="text-xl font-semibold">{quantity}</span>

              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 rounded-lg bg-gray-200 text-xl"
              >
                +
              </button>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className="mt-10 w-full md:w-auto px-10 py-4 bg-[#0B3D2E] text-white rounded-lg font-semibold hover:bg-[#07291f] transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Details;
