import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { HiSearch, HiX } from 'react-icons/hi';
import Loading from '../../Components/Loading/Loading';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    fetch('/Products.json')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((err) => console.error(err))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Loading />;
  }

  const categories = ['All', ...new Set(products.map((p) => p.category))];

  const displayProducts = products
    .filter((product) =>
      category === 'All' ? true : product.category === category,
    )
    .filter((product) =>
      product.name.toLowerCase().includes(search.trim().toLowerCase()),
    );

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div>
          <span className="text-sm font-semibold uppercase tracking-wider text-[#0B3D2E]/70">
            Full Collection
          </span>
          <h1 className="mt-2 text-3xl md:text-4xl font-extrabold text-[#0A0A0A]">
            All Jerseys
          </h1>
          <p className="mt-2 text-gray-500">
            Browse the full collection. {displayProducts.length} items
            {category !== 'All' ? ` in ${category}` : ''}.
          </p>
        </div>

        {/* Search bar */}
        <div className="relative w-full md:w-72 shrink-0">
          <HiSearch
            size={20}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search jerseys..."
            className="w-full rounded-full border border-gray-200 bg-gray-50 py-3 pl-11 pr-10 text-sm text-[#0A0A0A] outline-none transition-all duration-300 focus:border-[#0B3D2E]/40 focus:bg-white focus:shadow-md focus:shadow-[#0B3D2E]/5"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#0B3D2E] transition-colors"
              aria-label="Clear search"
            >
              <HiX size={18} />
            </button>
          )}
        </div>
      </div>

      <div className="flex gap-3 mb-10 flex-wrap">
        {categories.map((item) => (
          <button
            key={item}
            onClick={() => setCategory(item)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
              category === item
                ? 'bg-[#0B3D2E] text-white shadow-md shadow-[#0B3D2E]/20'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {displayProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <p className="text-lg font-semibold text-gray-700">
            No jerseys found
          </p>
          <p className="mt-1 text-gray-500">
            {search
              ? `No results for "${search}". Try a different search.`
              : 'Try selecting a different category.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {displayProducts.map((product) => (
            <Link key={product.id} to={`/products/${product.id}`}>
              <div className="group relative overflow-hidden rounded-2xl bg-gray-50 border border-black/5 p-5 transition-all duration-300 hover:shadow-xl hover:shadow-black/10 hover:-translate-y-1">
                <span className="absolute top-3 left-3 flex items-center gap-1 rounded-full bg-white/80 backdrop-blur px-2.5 py-1 text-xs font-semibold text-[#0B3D2E] shadow-sm">
                  ⭐ {product.rating}
                </span>

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
      )}
    </div>
  );
};

export default Products;