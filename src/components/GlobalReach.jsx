import React from 'react';
import { motion } from 'framer-motion';

const GlobalReach = () => {
  const stats = [
    { title: '50+ Countries', description: 'Serving clients across North America, Europe, Asia, and more.' },
    { title: 'ISO 9001 Certified', description: 'Meeting global quality and safety standards.' },
    { title: '24/7 Support', description: 'Round-the-clock assistance with regional offices worldwide.' },
  ];

  return (
    <section id="global-reach" className="section global-reach py-12 px-4 bg-gray-50">
      <h2 className="text-3xl font-bold text-blue-900 text-center mb-6">Our Global Reach</h2>
      <p className="section-intro text-lg text-gray-600 mb-8 max-w-4xl mx-auto">
        Clattron Machines serves industries worldwide with a presence in over 50 countries and internationally recognized certifications.
      </p>
      <div className="global-grid grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            className="global-card bg-blue-900 text-white p-6 rounded-lg hover:bg-blue-800 transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-xl font-semibold mb-2">{stat.title}</h3>
            <p className="text-gray-200">{stat.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default GlobalReach;