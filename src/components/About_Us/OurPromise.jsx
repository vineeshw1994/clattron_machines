// components/OurPromise.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { FaHammer, FaShieldAlt, FaRocket } from 'react-icons/fa';

const OurPromise = () => {
  const promises = [
    { icon: FaHammer, title: 'Build Good Equipment', desc: 'Machines that hold up under real production conditions.' },
    { icon: FaShieldAlt, title: 'Support It Properly', desc: 'Answer technical questions the same day you ask them.' },
    { icon: FaRocket, title: 'Show Up When Needed', desc: 'Be there when you need us, not just when it\'s convenient.' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
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
          Our Promise to You
        </motion.h2>
        <motion.div
          className="flex flex-col md:flex-row justify-between items-stretch gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {promises.map((promise, index) => (
            <motion.div
              key={index}
              className={`flex-1 border border-white hover:opacity-5 p-6 rounded-lg relative `}
              variants={itemVariants}
            >
              <div className="text-4xl mb-4">{<promise.icon />}</div>
              <h3 className="text-xl font-semibold mb-4">{promise.title}</h3>
              <p className="text-gray-300">{promise.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default OurPromise;