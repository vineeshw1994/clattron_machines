import React from 'react';
import { motion } from 'framer-motion';

const IndustrialApplications = () => {
  const applications = [
    { title: 'Automotive', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', description: 'Precision parts manufacturing.' },
    { title: 'Aerospace', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', description: 'High-strength component production.' },
    { title: 'Electronics', image: 'https://images.unsplash.com/photo-1593005510322-8f2c1b2e73b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', description: 'Circuit board prototyping.' },
  ];

  return (
    <section id="industrial-applications" className="section industrial-applications py-12 px-4 bg-gray-100">
      <h2 className="text-3xl font-bold text-blue-900 text-center mb-6">Industrial Applications</h2>
      <p className="section-intro text-lg text-gray-600 mb-8 max-w-4xl mx-auto">
        Clattron machines cater to diverse industries with tailored solutions.
      </p>
      <div className="industrial-grid grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {applications.map((app, index) => (
          <motion.div
            key={index}
            className="industrial-card bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg hover:-translate-y-2 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
          >
            <img src={app.image} alt={`${app.title} application`} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-blue-900 mb-2">{app.title}</h3>
              <p className="text-gray-700">{app.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default IndustrialApplications;