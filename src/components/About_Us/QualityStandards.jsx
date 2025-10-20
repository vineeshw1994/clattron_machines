// components/QualityStandards.jsx
import React from 'react';
import { motion } from 'framer-motion';
import Image from '../../assets/about.png';

const QualityStandards = () => {
  const standards = [
    { num: '01', title: 'Durable Components', desc: 'We use proven, high-quality materials designed for industrial environments.' },
    { num: '02', title: 'Proven Designs', desc: 'Our machines follow tested engineering principles that deliver consistent performance.' },
    { num: '03', title: 'Thorough Testing', desc: 'Each machine undergoes rigorous quality control before leaving our facility.' },
    { num: '04', title: 'Industry Standards', desc: 'All equipment meets safety and performance requirements for manufacturing operations.' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <section className="py-20 px-4 sm:px-8 bg-indigo-900">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-3xl sm:text-4xl font-bold mb-8 lg:mb-12 text-right pr-4 lg:pr-0"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          Quality Standards
        </motion.h2>
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Left Image Column */}
          <motion.div variants={itemVariants} className="order-last lg:order-first">
            <img 
              src={Image} 
              alt="Quality Standards Illustration" 
              className="w-full h-full sm:h-80 lg:h-[500px] object-cover rounded-lg shadow-lg"
            />
          </motion.div>
          {/* Content - Full width on mobile, right column on lg+ */}
          <motion.div variants={itemVariants} className="space-y-6 lg:pl-8">
            {standards.map((standard, index) => (
              <div
                key={index}
                className="flex-row gap-4"
              >
                <span className="text-md font-bold text-white min-w-[40px] flex-shrink-0">
                  {standard.num}
                </span>
                <div className="flex-1">
                  <div className="h-0.5 w-full mb-2 bg-purple-400"></div>
                  <h3 className="text-xl font-semibold mb-2">{standard.title}</h3>
                  <p className="text-gray-300 text-sm sm:text-base leading-relaxed">{standard.desc}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default QualityStandards;