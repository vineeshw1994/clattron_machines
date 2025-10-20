// components/Hero.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();
  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  const contact = () => {
    navigate('/contact');
  }

  return (
    <section className="relative bg-indigo-900 py-20 px-8 overflow-hidden min-h-screen">
      {/* Background Illustration - Placeholder for image */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 to-blue-800 opacity-50"></div>
      <div className="absolute top-0 right-0 w-1/2 h-full bg-cover bg-center" style={{ backgroundImage: "url('path/to/boxes-illustration.jpg')" }}></div>

      <motion.div
        className="relative max-w-6xl mx-auto  z-10 md:py-18 lg:py-18"
        variants={itemVariants}
      >
        <motion.h1
          className="text-5xl font-bold mb-6 leading-tight"
          variants={itemVariants}
        >
          Packaging Machines Built to Last
        </motion.h1>
        <motion.p
          className="text-xl mb-8   leading-relaxed"
          variants={itemVariants}
        >
          Industrial machinery and automation equipment for factories across India. Machines that work reliably, day after day, keeping operations moving without unnecessary stops.
        </motion.p>
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-start"
          variants={itemVariants}
        >
          <motion.button onClick={contact} className="px-6 py-3 bg-purple-400 rounded-lg hover:bg-purple-700 transition-colors">
            Contact Us
          </motion.button>
          <motion.button className="px-6 py-3 bg-transparent border-2 border-purple-600 rounded-lg text-purple-600 bg-dark hover:bg-white hover:text-indigo-900 transition-colors">
            View Solutions
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;