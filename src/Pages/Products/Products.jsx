import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import Loading from '../../Components/Loading/Loading';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('All');
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

  const displayProducts =
    category === 'All'
      ? products
      : products.filter((product) => product.category === category);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-2">All Jerseys</h1>
      <p className="mb-8 text-gray-600">Browse the full collection.</p>

      <div className="flex gap-3 mb-8 flex-wrap">
        {categories.map((item) => (
          <button
            key={item}
            onClick={() => setCategory(item)}
            className={`px-4 py-2 rounded-xl ${
              category === item ? 'bg-[#0B3D2E] text-white' : 'bg-gray-200'
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {displayProducts.map((product) => (
          <Link key={product.id} to={`/products/${product.id}`}>
            <div className="bg-gray-100 rounded-lg p-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-52 object-contain "
              />

              <h3 className="mt-3 font-semibold text-center mb-2">
                {product.name}
              </h3>

              <div className="flex justify-around items-center">
                <p className="text-gray-600">৳{product.price}</p>
                <p>
                  <span
                    className={
                      product.inStock ? 'text-green-600' : 'text-red-600'
                    }
                  >
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Products;
