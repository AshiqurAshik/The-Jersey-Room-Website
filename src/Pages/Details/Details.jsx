import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import Swal from 'sweetalert2';
import { HiArrowLeft } from 'react-icons/hi';
import Loading from '../../Components/Loading/Loading';

const Details = () => {
  const { id } = useParams();
  const Navigate = useNavigate();

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
    if (!product.inStock) return;

    if (!selectedSize) {
      Swal.fire({
        icon: 'warning',
        title: 'Select a Size',
        text: 'Please select a size before adding the product to your cart.',
        confirmButtonColor: '#0B3D2E',
      });
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

    Swal.fire({
      icon: 'success',
      title: 'Added to Cart!',
      text: `${product.name} has been added to your cart.`,
      confirmButtonText: 'Go to Cart',
      cancelButtonText: 'Continue Shopping',
      showCancelButton: true,
      confirmButtonColor: '#0B3D2E',
      cancelButtonColor: '#6B7280',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        Navigate('/cart');
      }
    });
  };

  if (!product) {
    return <Loading></Loading>;
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <button
        onClick={() => Navigate(-1)}
        className="mb-6 flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-[#0B3D2E] transition-colors"
      >
        <HiArrowLeft size={18} />
        Back
      </button>

      <div className="grid md:grid-cols-2 gap-12 items-start">
        <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 border border-black/5 md:sticky md:top-24">
          <span
            className={`absolute top-5 left-5 rounded-full px-3 py-1 text-xs font-semibold shadow-sm ${
              product.inStock
                ? 'bg-[#C8F169]/30 text-[#0B3D2E]'
                : 'bg-red-100 text-red-600'
            }`}
          >
            {product.inStock ? 'In Stock' : 'Out of Stock'}
          </span>

          <img
            src={product.image}
            alt={product.name}
            className={`w-full h-[500px] object-contain transition-transform duration-500  ${
              !product.inStock ? 'opacity-60 grayscale' : ''
            }`}
          />
        </div>

        <div>
          <span className="inline-block rounded-full bg-[#0B3D2E] text-white px-3 py-1 text-sm font-medium">
            {product.category}
          </span>

          <h1 className="text-4xl font-extrabold tracking-tight mt-4 text-[#0A0A0A]">
            {product.name}
          </h1>

          <p className="text-gray-500 mt-1">{product.team}</p>

          <div className="flex items-baseline gap-3 mt-5">
            <p className="text-3xl font-bold text-[#0B3D2E]">
              ৳ {product.price}
            </p>
            <span className="flex items-center gap-1 text-sm font-semibold text-gray-500">
              ⭐ {product.rating}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-8">
            <div className="rounded-xl bg-gray-50 border border-black/5 p-4">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                Sport
              </h3>
              <p className="mt-1 font-medium text-[#0A0A0A]">{product.sport}</p>
            </div>

            <div className="rounded-xl bg-gray-50 border border-black/5 p-4">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                Type
              </h3>
              <p className="mt-1 font-medium text-[#0A0A0A]">{product.type}</p>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="font-semibold text-lg mb-2 text-[#0A0A0A]">
              Description
            </h3>
            <p className="text-gray-600 leading-7">{product.description}</p>
          </div>

          <div className="mt-8">
            <h3 className="font-semibold text-lg mb-3 text-[#0A0A0A]">
              Available Colors
            </h3>

            <div className="flex flex-wrap gap-2">
              {product.colors.map((color) => (
                <span
                  key={color}
                  className="px-3 py-1.5 bg-gray-100 border border-black/5 rounded-full text-sm font-medium text-gray-700"
                >
                  {color}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <h3 className="font-semibold text-lg mb-3 text-[#0A0A0A]">
              Select Size
            </h3>

            <div className="flex flex-wrap gap-3">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => product.inStock && setSelectedSize(size)}
                  disabled={!product.inStock}
                  className={`w-12 h-12 rounded-lg border-2 font-semibold transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed ${
                    selectedSize === size
                      ? 'bg-[#0B3D2E] text-white border-[#0B3D2E] shadow-md shadow-[#0B3D2E]/20 scale-105'
                      : 'bg-white border-gray-200 hover:border-[#0B3D2E]/40 hover:bg-gray-50'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <h3 className="font-semibold text-lg mb-3 text-[#0A0A0A]">
              Quantity
            </h3>

            <div className="flex items-center gap-4">
              <button
                onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                disabled={!product.inStock || quantity <= 1}
                className="w-10 h-10 rounded-lg bg-gray-100 border border-black/5 text-xl font-medium text-gray-700 transition hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed"
              >-</button>

              <span className="w-8 text-center text-xl font-semibold text-[#0A0A0A]">
                {quantity}
              </span>

              <button
                onClick={() => setQuantity(quantity + 1)}
                disabled={!product.inStock}
                className="w-10 h-10 rounded-lg bg-gray-100 border border-black/5 text-xl font-medium text-gray-700 transition hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                +
              </button>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className={`group relative mt-10 w-full md:w-auto overflow-hidden px-10 py-4 rounded-xl font-semibold transition-all duration-300 ${
              product.inStock
                ? 'bg-[#0B3D2E] text-white shadow-lg shadow-[#0B3D2E]/20 hover:shadow-xl hover:shadow-[#0B3D2E]/30 hover:-translate-y-0.5'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            <span className="relative z-10">
              {product.inStock ? 'Add to Cart' : 'Out of Stock'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Details;
