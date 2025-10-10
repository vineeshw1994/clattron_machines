import React from 'react';
import { motion } from 'framer-motion';

const WhyUs = () => {
  const reasons = [
    { title: 'Unmatched Quality', description: 'Crafted with premium materials for durability and performance.' },
    { title: 'Innovative Technology', description: 'Leveraging cutting-edge advancements for industry leadership.' },
    { title: 'Global Support', description: '24/7 expert assistance across 50+ countries.' },
  ];

  return (
    <section id="why-us" className="section why-us py-12 px-4 bg-blue-900 text-white">
      <h2 className="text-3xl font-bold text-center mb-8">Why Choose Clattron?</h2>
      <div className="why-us-grid grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {reasons.map((reason, index) => (
          <motion.div
            key={index}
            className="why-us-item bg-blue-800 p-6 rounded-lg hover:bg-blue-700 transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-xl font-semibold mb-2">{reason.title}</h3>
            <p className="text-gray-200">{reason.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default WhyUs;