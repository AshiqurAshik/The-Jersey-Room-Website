import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';

const Feature = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('/Products.json')
      .then((res) => res.json())
      .then((data) => {
        const randomProducts = [...data]
          .sort(() => Math.random() - 0.5)
          .slice(0, 4);

        setProducts(randomProducts);
      });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold mb-2">Featured Jerseys</h2>
      <p className="text-gray-600 mb-8">
        Discover some of our featured picks.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link key={product.id} to={`/products/${product.id}`}>
            <div className="bg-gray-100 rounded-lg p-4 hover:shadow-lg transition">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-52 object-contain"
              />

              <h3 className="mt-3 font-semibold text-center">
                {product.name}
              </h3>

              <div className="flex justify-between items-center mt-3 text-sm">
                <p className="font-semibold text-[#0B3D2E]">
                  ৳{product.price}
                </p>

                <p>⭐ {product.rating}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Feature;