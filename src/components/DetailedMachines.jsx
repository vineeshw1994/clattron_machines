import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const URL = import.meta.env.VITE_API_URL;

const DetailedMachines = () => {
  const [exploredMachines, setExploredMachines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFeaturedMachines = async () => {
      try {
        const { data } = await axios.get(`${URL}/api/admin/explored-machines`);
        setExploredMachines(data);
      } catch (err) {
        console.error('Error fetching featured machines:', err);
        setError('Failed to load explored machines. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedMachines();
  }, []);

  // Motion variants
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    hover: { scale: 1.02, transition: { duration: 0.2 } },
  };

  const emptyVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6, staggerChildren: 0.2 } },
  };

  if (loading) {
    return (
      <section className="section detailed-machines py-16 px-4 bg-gradient-to-b from-gray-50 via-blue-50 to-indigo-100 relative overflow-hidden min-h-screen flex justify-center items-center">
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
            Loading Explored Machines...
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-600 mt-2 text-sm sm:text-base"
          >
            Preparing your premium selection
          </motion.p>
        </div>
      </section>
    );
  }

  if (error || exploredMachines?.length === 0) {
    return (
      <motion.section
        className="section detailed-machines py-16 px-4 bg-gradient-to-b from-gray-50 via-blue-50 to-indigo-100 relative overflow-hidden min-h-screen"
        variants={emptyVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
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
        <div className="relative z-10 text-center max-w-2xl mx-auto">
          <motion.div
            variants={{ opacity: 1 }}
            className="mb-6"
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className="w-24 h-24 mx-auto mb-4 hidden border-4 border-blue-500 border-t-transparent rounded-full shadow-lg"
            />
          </motion.div>
          <motion.h2
            variants={{ opacity: 1 }}
            className="text-3xl sm:text-4xl font-bold text-blue-900 mb-4"
          >
            Upcoming Explored Products
          </motion.h2>
          <motion.p
            variants={{ opacity: 1 }}
            className="text-gray-600 text-lg mb-6"
          >
            We're working on exciting new explorations. Stay tuned for premium machine updates that will revolutionize your workflow.
          </motion.p>
          <motion.button
            variants={{ opacity: 1 }}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/machines')}
          >
            Explore Current Machines
          </motion.button>
        </div>
      </motion.section>
    );
  }

  return (
    <section
      id="detailed-machines"
      className="section detailed-machines py-12 sm:py-16 px-4 bg-gray-50"
      role="region"
      aria-label="Explored machines"
    >
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-900 text-center mb-8 sm:mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Explore Our Machine Range
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {exploredMachines.map((machine, index) => (
              <motion.div
                key={machine._id}
                className="machine-card bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg hover:-translate-y-2 transition-all duration-300 cursor-pointer border border-gray-100"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => navigate(`/machines/${machine._id}`)}
              >
                <div className="relative overflow-hidden h-48 sm:h-56">
                  <img
                    src={`${URL}${machine.image}`}
                    alt={machine.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  {machine.featured && (
                    <span className="absolute top-2 left-2 bg-yellow-400 text-blue-900 text-xs font-bold px-2 py-1 rounded-full">
                      Featured
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-blue-900 mb-2 line-clamp-1">
                    {machine.name}
                  </h3>
                  <p className="text-gray-700 text-sm mb-3 line-clamp-2">
                    {machine.description.split('.')[0]}.
                  </p>
                  {/* Dynamic Specs */}
                  {machine.specs && Object.keys(machine.specs).length > 0 && (
                    <ul className="text-xs text-gray-600 mb-3 space-y-1">
                      {Object.entries(machine.specs).map(([key, value]) => (
                        <li key={key} className="flex justify-between">
                          <span className="font-medium capitalize">{key}:</span>
                          <span>{value}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  <button className="w-full bg-blue-900 text-white py-2 rounded hover:bg-yellow-400 hover:text-blue-900 transition-colors font-medium text-sm">
                    Explore Now
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default DetailedMachines;