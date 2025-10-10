import React from 'react';
import { motion } from 'framer-motion';
import { FaWrench, FaCogs, FaChalkboardTeacher, FaTools } from 'react-icons/fa';

const Services = () => {
  const services = [
    { icon: FaWrench, title: 'Maintenance & Support', description: '24/7 technical assistance and scheduled maintenance.' },
    { icon: FaCogs, title: 'Custom Solutions', description: 'Tailored machine designs for your industry needs.' },
    { icon: FaChalkboardTeacher, title: 'Training Programs', description: 'Expert-led training to optimize your operations.' },
    { icon: FaTools, title: 'Installation Services', description: 'Professional setup and integration support.' },
    // { icon: FaTools, title: 'Installation Services', description: 'Professional setup and integration support.' },
    // { icon: FaTools, title: 'Installation Services', description: 'Professional setup and integration support.' },

  ];

  return (
    <section id="services" className="section services py-12 px-4 bg-gray-100">
      <h2 className="text-3xl font-bold text-blue-900 text-center mb-6">Our Services</h2>
      <p className="section-intro text-lg text-gray-600 mb-8 max-w-4xl mx-auto">
        Comprehensive support to ensure your machines operate at peak performance globally.
      </p>
      <div className="services-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {services.map((service, index) => (
          <motion.div
            key={index}
            className="service-card bg-white p-6 rounded-lg shadow-md hover:shadow-lg hover:-translate-y-2 transition-all duration-300 flex flex-col items-center"
            whileHover={{ scale: 1.05 }}
          >
            <div className="mb-4 mt-4">
              <service.icon className="text-4xl text-blue-900" />
            </div>
            <h3 className="text-xl font-semibold text-blue-900 mb-2 text-center">{service.title}</h3>
            <p className="text-gray-700 text-center">{service.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Services;