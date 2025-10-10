import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';  // Assuming axios is installed and configured
const URL = import.meta.env.VITE_API_URL

const ProductView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`${URL}/api/admin/products/${id}`);  // Or /api/products/${id} if using that
        setProduct(data);
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Product not found or server error');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-600">Loading product details...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="text-center py-12 text-red-600">
        {error || 'Product not found'}
        <button
          onClick={() => navigate('/machines')}
          className="ml-4 bg-blue-900 text-white py-2 px-4 rounded hover:bg-yellow-400 hover:text-blue-900 transition-colors duration-300"
        >
          Back to Machines
        </button>
      </div>
    );
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
        <img 
          src={`http://localhost:5000${product.image}`} 
          alt={product.name} 
          className="w-full h-64 object-cover rounded mb-4" 
        />
        <h2 className="text-2xl font-bold text-blue-900 mb-2">{product.name}</h2>
        <p className="text-gray-700 mb-4">{product.description}</p>
        <div className="mb-4">
          <p className="text-gray-700"><strong>Category:</strong> {product.category?.name}</p>
          {product.featured && <p className="text-yellow-600"><strong>Featured Product</strong></p>}
          {!product.disabled ? <p className="text-green-600"><strong>Available</strong></p> : <p className="text-red-600"><strong>Disabled</strong></p>}
        </div>
        {product.specs && (
          <div className="mb-4">
            <strong>Specs:</strong>
            <ul className="list-disc list-inside mt-2">
              {Object.entries(product.specs).map(([key, value]) => (
                <li key={key} className="text-gray-700">{key}: {value}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ProductView;