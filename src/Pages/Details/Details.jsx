import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

const Details = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch('/Products.json')
      .then((res) => res.json())
      .then((data) => {
        const singleProduct = data.find((item) => item.id == id);
        setProduct(singleProduct);
      });
  }, [id]);

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

          <h1 className="text-4xl font-bold mt-4">
            {product.name}
          </h1>

          <p className="text-gray-500 mt-2">
            {product.team}
          </p>

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
                className={
                  product.inStock
                    ? 'text-green-600'
                    : 'text-red-600'
                }
              >
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </p>
            </div>

          </div>

          <div className="mt-8">
            <h3 className="font-semibold text-lg mb-2">
              Available Colors
            </h3>

            <div className="flex gap-2">
              {product.colors.map((color) => (
                <span
                  key={color}
                  className="px-3 py-1 bg-gray-200 rounded-full text-sm"
                >
                  {color}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <h3 className="font-semibold text-lg mb-2">
              Available Sizes
            </h3>

            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <span
                  key={size}
                  className="w-12 h-12 border rounded-lg flex items-center justify-center font-medium"
                >
                  {size}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <h3 className="font-semibold text-lg mb-2">
              Description
            </h3>

            <p className="text-gray-600 leading-7">
              {product.description}
            </p>
          </div>

          <button
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