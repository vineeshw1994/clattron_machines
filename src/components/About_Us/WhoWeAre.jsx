// components/WhoWeAre.jsx
import React from 'react';
import { motion } from 'framer-motion';

const WhoWeAre = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <section className="py-20 px-8 bg-dark-blue">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-4xl font-bold mb-12 text-center md:text-left lg:text-left"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          Who We Are
        </motion.h2>
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={itemVariants}>
            <h3 className="text-2xl font-semibold mb-4">Experience That Matters</h3>
            <p className="text-lg leading-relaxed">
              Our team has spent years working with packaging lines, filling systems, material handling equipment, and industrial automation. We know what production managers need because we've been on factory floors ourselves.
            </p>
          </motion.div>
          <motion.div variants={itemVariants}>
            <h3 className="text-2xl font-semibold mb-4">Built on Principles</h3>
            <p className="text-lg leading-relaxed">
              Good packaging equipment should run consistently, be easy to maintain, and have support available when you need it. That foundation drives everything we do at Clattron.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhoWeAre;