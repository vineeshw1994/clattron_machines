// components/ReadyToDiscuss.jsx
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import logo from '../../assets/logo.png';  // Replace with your building/right-side image path if different
import { fetchCompanyInfo } from '../../store/slices/companySlice'; // For dynamic logo
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const URL = import.meta.env.VITE_API_URL
const ReadyToDiscuss = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const company = useSelector((state) => state.company.companyInfo);
  // Fetch company for dynamic logo
  useEffect(() => {
    dispatch(fetchCompanyInfo());
  }, [dispatch]);
  const itemVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } }
  };

  const contact = () => {
    navigate('/contact');
  }

  return (
    <section className="relative py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-indigo-900">
      <div className="max-w-4xl sm:max-w-6xl mx-auto relative z-10">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-start"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={itemVariants}>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 sm:mb-6 leading-tight">
              Ready to Discuss Your
              <br className="hidden sm:block" />
              <span className="text-purple-400 block">Packaging</span>
              <br className="hidden lg:block" />
              Requirements?
            </h2>
            <p className="text-sm sm:text-base lg:text-lg xl:text-xl mb-6 sm:mb-8 text-gray-300 leading-relaxed">
              Contact Clattron for clear answers about what will work best for your operation. Our team is ready to understand your specific needs and provide practical solutions.
            </p>
            <div className="bg-indigo-800 p-4 sm:p-6 rounded-lg mb-6 sm:mb-8 border-l-4 border-purple-400">
              <h3 className="font-semibold mb-1 sm:mb-2 text-white text-sm sm:text-base">{company?.name ? company?.name : 'Clattron Private Limited'}</h3>
              <p className="mb-1 sm:mb-2 text-gray-300 text-xs sm:text-sm">Industrial Packaging Machinery Manufacturer</p>
              <p className="text-gray-300 text-xs sm:text-sm break-words">
                {company?.city}, Kanyakumari, {company?.state}, {company?.zipcode}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button 
                onClick={contact} 
                className="px-4 sm:px-6 py-2 sm:py-3 bg-red-600 rounded-lg cursor-pointer hover:bg-red-700 transition-colors text-white font-medium text-sm sm:text-base w-full sm:w-auto"
              >
                Get in Touch
              </button>
              <button className="px-4 sm:px-6 py-2 sm:py-3 bg-transparent border-2 border-white rounded-lg hover:bg-white hover:text-indigo-900 transition-colors font-medium text-sm sm:text-base w-full sm:w-auto">
                Learn More
              </button>
            </div>
          </motion.div>
          <motion.div
            variants={itemVariants}
            className="order-first lg:order-last mt-6 sm:mt-8 lg:mt-0"
          >
            <img
              src={logo}
              alt="Clattron Facility"
              className="w-full h-48 sm:h-64 lg:h-80 xl:h-[500px] object-contain rounded-lg shadow-lg"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ReadyToDiscuss;