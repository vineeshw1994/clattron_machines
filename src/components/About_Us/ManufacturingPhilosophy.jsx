// components/ManufacturingPhilosophy.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { FaClipboardList, FaLightbulb, FaPhoneAlt } from 'react-icons/fa';

const ManufacturingPhilosophy = () => {
  const cards = [
    { icon: FaClipboardList, title: 'Understanding First', desc: 'We visit your facility, study your production process, and understand specific challenges before recommending solutions.' },
    { icon: FaLightbulb, title: 'Credible Suggestions', desc: 'If a standard machine works better than custom, we\'ll tell you. We recommend what actually helps your operation.' },
    { icon: FaPhoneAlt, title: 'Real Support', desc: 'After installation, we stay available. Technical questions get answered quickly. Your production can\'t wait.' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="py-20 px-4 sm:px-8 bg-purple-300">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-3xl sm:text-4xl font-bold mb-7 text-center lg:text-left py-8 text-black"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          Our Manufacturing Philosophy
        </motion.h2>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {cards.map((card, index) => (
            <motion.div
              key={index}
              className="bg-indigo-800 p-6 rounded-lg text-center lg:text-left hover:bg-indigo-700 transition-colors"
              variants={itemVariants}
            >
              <card.icon className="text-4xl mb-4 mx-auto lg:ml-0 text-purple-300" />
              <h3 className="text-xl font-semibold mb-4 text-white">{card.title}</h3>
              <p className="text-gray-300 leading-relaxed">{card.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ManufacturingPhilosophy;