import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';  // Assuming axios is installed and configured
const URL = import.meta.env.VITE_API_URL


const Machines = () => {
  const [machines, setMachines] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
    fetchMachines();
  }, []);

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get(`${URL}/api/categories`);  // Adjust endpoint if needed
      setCategories(data);
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  const fetchMachines = async () => {
    try {
      const { data } = await axios.get(`${URL}/api/admin/products-clients`);  // Or /api/products if using that
      setMachines(data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching machines:', err);
      setLoading(false);
    }
  };

  const filteredMachines = selectedCategory === 'all'
    ? machines
    : machines.filter(machine => machine.category._id === selectedCategory);

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const handleViewDetails = (id) => {
    navigate(`/machines/${id}`);
  };

 if (loading) {
  return (
    <main className="section machines py-16 px-4 bg-gradient-to-b from-gray-50 via-blue-50 to-indigo-100 relative overflow-hidden min-h-screen flex justify-center items-center">
      {/* Animated background elements for richness */}
      <div className="absolute inset-0 opacity-10">
        <motion.div
          className="absolute top-10 left-10 w-20 h-20 bg-blue-200 rounded-full"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-32 h-32 bg-indigo-200 rounded-full blur-xl"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
      </div>

      <div className="relative z-10 text-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"
        />
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl sm:text-3xl font-bold text-blue-900 tracking-wide"
        >
          Loading Machines...
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-gray-600 mt-2"
        >
          Preparing your premium selection
        </motion.p>
      </div>
    </main>
  );
}

  return (
    <main>
      <section id="machines-hero" className="hero section bg-blue-900 text-white text-center py-20 px-4" aria-labelledby="hero-title">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <h1 id="hero-title" className="text-4xl font-bold mb-4">Discover Clattron Machines</h1>
          <p className="text-lg mb-6">Leading precision machinery for industrial innovation and efficiency.</p>
          <a href="#machines" className="inline-block bg-yellow-400 text-blue-900 font-bold py-3 px-6 rounded hover:bg-yellow-300 transition-all duration-300" aria-label="Explore our machines">
            Explore Machines
          </a>
        </motion.div>
      </section>

      <section id="machines" className="section machines-page py-12 px-4" aria-labelledby="machines-title">
        <h2 id="machines-title" className="text-3xl font-bold text-blue-900 mb-8 text-center">Our Machines</h2>
        <div className="machines-container flex flex-col lg:flex-row gap-6 max-w-6xl mx-auto">
          <aside className="categories w-full lg:w-64" role="complementary" aria-label="Machine categories">
            <h3 className="text-xl font-semibold text-blue-900 mb-4">Categories</h3>
            <ul className="category-list space-y-2">
              <li key="all">
                <a
                  href="#"
                  className={`category-link block p-2 rounded ${selectedCategory === 'all' ? 'bg-yellow-400 text-blue-900' : 'text-blue-900 hover:bg-yellow-200'} transition-all duration-300`}
                  onClick={(e) => { e.preventDefault(); handleCategoryClick('all'); }}
                >
                  All Machines
                </a>
              </li>
              {categories?.map((category) => (
                <li key={category._id}>
                  <a
                    href="#"
                    className={`category-link block p-2 rounded ${selectedCategory === category._id ? 'bg-yellow-400 text-blue-900' : 'text-blue-900 hover:bg-yellow-200'} transition-all duration-300`}
                    onClick={(e) => { e.preventDefault(); handleCategoryClick(category._id); }}
                  >
                    {category.name} Machines
                  </a>
                </li>
              ))}
            </ul>
          </aside>
          <div className="machines-list flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" role="region" aria-label="Machine listings">
            {filteredMachines.map((machine) => (
              <motion.div
                key={machine._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: machine._id * 0.1 }}  // Note: _id is string, so this delay might not stagger well—consider index-based if needed
                className="machine-card bg-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg hover:-translate-y-2 transition-all duration-300 cursor-pointer"
                onClick={() => handleViewDetails(machine._id)}
              >
                <img 
                  src={`${URL}${machine.image}`} 
                  alt={machine.name} 
                  className="w-full h-48 object-cover" 
                  loading="lazy" 
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-blue-900 mb-2">{machine.name}</h3>
                  <p className="text-gray-700 mb-4">{machine.description.split('.')[0]}.</p>
                  <a className="card-button bg-blue-900 text-white p-2 rounded hover:bg-yellow-400 hover:text-blue-900 transition-colors duration-300 inline-block" aria-label={`View details for ${machine.name}`}>
                    View Details
                  </a>
                </div>
              </motion.div>
            ))}
            {filteredMachines.length === 0 && (
              <p className="col-span-full text-center text-gray-500">No machines found in this category.</p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Machines;