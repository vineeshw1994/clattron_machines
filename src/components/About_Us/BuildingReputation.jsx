// components/BuildingReputation.jsx
import React from 'react';
import { motion } from 'framer-motion';

const BuildingReputation = () => {
  const pillars = [
    { title: 'Reliability', desc: 'Equipment that runs when you need it to run.' },
    { title: 'Availability', desc: 'Parts and support ready when you call.' },
    { title: 'Responsiveness', desc: 'Fast action on technical issues.' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.3 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="py-20 px-8 bg-blue">
      <div className="max-w-6xl mx-auto">
         <motion.h2 className="text-4xl font-bold mb-12 text-center lg:text-start" variants={containerVariants}>
          Building Our Reputation
        </motion.h2>
        <motion.div
          className="border-l-4  border-purple-400 pl-6 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <p className="text-lg italic mb-4">
            Manufacturing packaging equipment worth standing behind. Keeping parts available. Responding to technical issues quickly. Building our reputation one reliable machine at a time.
          </p>
        </motion.div>
       
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {pillars.map((pillar, index) => (
            <motion.div
              key={index}
              className="text-center"
              variants={itemVariants}
            >
              <h3 className="text-2xl font-semibold mb-4">{pillar.title}</h3>
              <p className="text-gray-300">{pillar.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default BuildingReputation;