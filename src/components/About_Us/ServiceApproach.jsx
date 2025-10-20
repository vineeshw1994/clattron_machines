// components/ServiceApproach.jsx
import React from 'react';
import { motion } from 'framer-motion';

const ServiceApproach = () => {
  const services = [
    { title: 'Fast Response', desc: 'We understand that downtime costs money.' },
    { title: 'Instant Answers', desc: 'Technical questions don\'t wait. Neither do we.' },
    { title: 'Parts in Stock', desc: 'No weeks-long waits for simple repairs.' },
    { title: 'On-Site Support', desc: 'We come to you when needed.' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 }
  };

  return (
    <section className="py-20 px-8 bg-blue">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-4xl font-bold mb-12 text-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          Our Service Approach
        </motion.h2>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="bg-indigo-600 p-6 rounded-lg text-center"
              variants={itemVariants}
            >
              <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
              <p className="text-gray-300">{service.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServiceApproach;