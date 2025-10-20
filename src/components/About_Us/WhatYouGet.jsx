// components/WhatYouGet.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { FaUserTie, FaClock, FaFlask, FaGraduationCap, FaBolt } from 'react-icons/fa';

const WhatYouGet = () => {
  const benefits = [
    { icon: FaUserTie, title: 'Direct Engineer Access', desc: 'Talk directly to engineers who know packaging equipment inside and out.' },
    { icon: FaClock, title: 'Realistic Lead Times', desc: 'We give you honest timelines and meet them consistently.' },
    { icon: FaFlask, title: 'Product Testing', desc: 'Machines tested with your actual products before installation.' },
    { icon: FaGraduationCap, title: 'Complete Training', desc: 'Full installation and operator training included with every machine.' },
    { icon: FaBolt, title: 'Fast Technical Support', desc: 'Quick-response support after installation keeps you running.' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="py-20 px-4 sm:px-8 bg-indigo-900">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-3xl sm:text-4xl font-bold mb-12 text-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          What You Get Working With Clattron
        </motion.h2>
        {/* Timeline - visible on md+ */}
        <motion.div
          className="relative w-full mb-8 hidden md:block"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="w-full h-1 bg-purple-400 relative z-0">
            <div className="absolute inset-0 flex justify-around items-center">
              {benefits.map((_, i) => (
                <div key={i} className="w-3 h- bg-purple-400  mx-1"></div>
              ))}
            </div>
          </div>
          <div className="absolute inset-x-0 top-0 flex justify-around items-start -mt-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-indigo-900 p-2 rounded-full shadow-lg z-10">
                <benefit.icon className="text-2xl text-purple-400" />
              </div>
            ))}
          </div>
        </motion.div>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              className="text-center md:pt-4"
              variants={itemVariants}
            >
              {/* Icon for mobile */}
              <div className="md:hidden mb-4">
                <benefit.icon className="text-4xl text-purple-400 mx-auto" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-white">{benefit.title}</h3>
              <p className="text-gray-300 text-sm leading-relaxed">{benefit.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhatYouGet;