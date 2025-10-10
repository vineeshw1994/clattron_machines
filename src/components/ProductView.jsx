import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import machines from './machines.json';

const ProductView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const foundProduct = machines.find(p => p.id === parseInt(id));
    setProduct(foundProduct);
  }, [id]);

  if (!product) {
    return <div className="text-center py-12 text-red-600">Product not found</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto py-12 px-4"
    >
      <button
        onClick={() => navigate('/machines')}
        className="mb-6 bg-blue-900 text-white py-2 px-4 rounded hover:bg-yellow-400 hover:text-blue-900 transition-colors duration-300"
      >
        Back to Machines
      </button>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <img src={product.image} alt={product.alt} className="w-full h-64 object-cover rounded mb-4" />
        <h2 className="text-2xl font-bold text-blue-900 mb-2">{product.name}</h2>
        <p className="text-gray-700 mb-4">{product.description}</p>
        <p className="text-gray-700"><strong>Specs:</strong> {product.specs}</p>
      </div>
    </motion.div>
  );
};

export default ProductView;