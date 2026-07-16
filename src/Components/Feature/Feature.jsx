import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import Loading from '../Loading/Loading';

const Feature = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/Products.json')
      .then((res) => res.json())
      .then((data) => {
        const randomProducts = [...data]
          .sort(() => Math.random() - 0.5)
          .slice(0, 4);

        setProducts(randomProducts);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <div className="flex items-end justify-between mb-10">
        <div>
          <span className="text-sm font-semibold uppercase tracking-wider text-[#0B3D2E]/70">
            Hand-picked for you
          </span>
          <h2 className="mt-2 text-3xl md:text-4xl font-extrabold text-[#0A0A0A]">
            Featured Jerseys
          </h2>
          <p className="mt-2 text-gray-500">
            Discover some of our featured picks.
          </p>
        </div>

        <Link
          to="/products"
          className="hidden sm:inline-block font-semibold text-[#0B3D2E] underline-offset-4 hover:underline transition"
        >
          View All →
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link key={product.id} to={`/products/${product.id}`}>
            <div className="group relative overflow-hidden rounded-2xl bg-gray-50 border border-black/5 p-5 transition-all duration-300 hover:shadow-xl hover:shadow-black/10 hover:-translate-y-1">
              <div className="absolute top-3 right-3 rounded-full bg-white/80 backdrop-blur px-2.5 py-1 text-xs font-semibold text-[#0B3D2E] shadow-sm">
                ⭐ {product.rating}
              </div>

              <div className="overflow-hidden rounded-xl">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-52 object-contain transition-transform duration-500 "
                />
              </div>

              <h3 className="mt-4 font-semibold text-center text-[#0A0A0A] line-clamp-1">
                {product.name}
              </h3>

              <div className="flex justify-center items-center mt-2">
                <p className="font-bold text-[#0B3D2E]">
                  ৳{product.price}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Feature;