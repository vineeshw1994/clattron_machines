// components/WhereWeServe.jsx
import React from 'react';
import { motion } from 'framer-motion';

const WhereWeServe = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.3 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <section className="py-20 px-8 bg-blue">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-4xl font-bold mb-12 text-center lg:text-start"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          Where We Serve
        </motion.h2>
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={itemVariants}>
            <h3 className="text-2xl font-semibold mb-4">Based in Coimbatore</h3>
            <p className="text-lg leading-relaxed">
              Our manufacturing facility is located in Coimbatore, Tamil Nadu—a hub for industrial manufacturing in South India.
            </p>
          </motion.div>
          <motion.div variants={itemVariants}>
            <h3 className="text-2xl font-semibold mb-4">Expanding Reach</h3>
            <p className="text-lg leading-relaxed">
              Currently serving manufacturers across South India, with service network expanding to reach more regions as we grow.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhereWeServe;