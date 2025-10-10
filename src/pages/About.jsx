import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <main>
      {/* About Hero Section */}
      <section id="about-hero" className="relative py-16 bg-gradient-to-br from-blue-900 to-blue-600 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-4xl font-bold mb-4 text-white">About Clattron Private Limited</h2>
          <p className="text-lg mb-6">
            Leading the way in precision industrial machinery, Clattron Machines delivers innovative solutions to empower industries worldwide.
          </p>
          <Link to={"/contact"}className="inline-block bg-yellow-400 text-blue-900 font-bold py-3 px-6 rounded hover:bg-yellow-300 transition-all duration-300">
            Get in Touch
          </Link>
        </motion.div>
      </section>

      {/* About Overview */}
      <section id="about-overview" className="max-w-5xl mx-auto text-center py-12 px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-blue-900 mb-8"
        >
          Who We Are
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg text-gray-700 mb-8 max-w-3xl mx-auto"
        >
          Founded in 2000, Clattron Machines is a global leader in industrial automation, providing cutting-edge machinery for manufacturing, prototyping, and assembly. With a commitment to quality, innovation, and customer satisfaction, we serve industries across 50+ countries, backed by ISO 9001 certification and a passion for excellence.
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <motion.div
            whileHover={{ y: -10, boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2)' }}
            className="bg-gray-200 p-6 rounded-lg transition-all duration-300"
          >
            <h3 className="text-xl font-semibold text-blue-900 mb-2">Our Mission</h3>
            <p className="text-gray-700">
              To empower industries with state-of-the-art machinery that enhances productivity, precision, and sustainability.
            </p>
          </motion.div>
          <motion.div
            whileHover={{ y: -10, boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2)' }}
            className="bg-gray-200 p-6 rounded-lg transition-all duration-300"
          >
            <h3 className="text-xl font-semibold text-blue-900 mb-2">Our Vision</h3>
            <p className="text-gray-700">
              To redefine industrial automation by delivering innovative, reliable, and customized solutions globally.
            </p>
          </motion.div>
          <motion.div
            whileHover={{ y: -10, boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2)' }}
            className="bg-gray-200 p-6 rounded-lg transition-all duration-300"
          >
            <h3 className="text-xl font-semibold text-blue-900 mb-2">Our Values</h3>
            <p className="text-gray-700">
              Integrity, innovation, and customer focus drive everything we do, ensuring trust and excellence in every solution.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Team Section */}
      <section id="team" className="max-w-5xl mx-auto text-center py-12 px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-blue-900 mb-8"
        >
          Our Leadership Team
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg text-gray-700 mb-8 max-w-3xl mx-auto"
        >
          Meet the experts driving Clattron’s mission to transform industries.
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <motion.div
            whileHover={{ y: -10, boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2)' }}
            className="bg-gray-200 p-6 rounded-lg transition-all duration-300"
          >
            <i className="fas fa-user-tie text-3xl text-blue-900 mb-4"></i>
            <h3 className="text-xl font-semibold text-blue-900 mb-2">John Doe</h3>
            <p className="text-yellow-400 mb-2">CEO</p>
            <p className="text-gray-700">
              With 25 years in industrial automation, John leads Clattron with a vision for innovation.
            </p>
          </motion.div>
          <motion.div
            whileHover={{ y: -10, boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2)' }}
            className="bg-gray-200 p-6 rounded-lg transition-all duration-300"
          >
            <i className="fas fa-user-tie text-3xl text-blue-900 mb-4"></i>
            <h3 className="text-xl font-semibold text-blue-900 mb-2">Jane Smith</h3>
            <p className="text-yellow-400 mb-2">CTO</p>
            <p className="text-gray-700">
              Jane oversees technology development, ensuring cutting-edge solutions.
            </p>
          </motion.div>
          <motion.div
            whileHover={{ y: -10, boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2)' }}
            className="bg-gray-200 p-6 rounded-lg transition-all duration-300"
          >
            <i className="fas fa-user-tie text-3xl text-blue-900 mb-4"></i>
            <h3 className="text-xl font-semibold text-blue-900 mb-2">Michael Lee</h3>
            <p className="text-yellow-400 mb-2">Head of Sales</p>
            <p className="text-gray-700">
              Michael drives global partnerships and customer success.
            </p>
          </motion.div>
          <motion.div
            whileHover={{ y: -10, boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2)' }}
            className="bg-gray-200 p-6 rounded-lg transition-all duration-300"
          >
            <i className="fas fa-user-tie text-3xl text-blue-900 mb-4"></i>
            <h3 className="text-xl font-semibold text-blue-900 mb-2">Emily Chen</h3>
            <p className="text-yellow-400 mb-2">Head of Operations</p>
            <p className="text-gray-700">
              Emily ensures seamless production and delivery worldwide.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="max-w-5xl mx-auto text-center py-12 px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-blue-900 mb-8"
        >
          Our Certifications
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg text-gray-700 mb-8 max-w-3xl mx-auto"
        >
          Our commitment to quality is backed by internationally recognized standards.
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-blue-900 text-white p-6 rounded-lg transition-all duration-300"
          >
            <i className="fas fa-certificate text-3xl mb-4"></i>
            <h3 className="text-xl font-semibold mb-2">ISO 9001 Certified</h3>
            <p className="text-gray-200">
              Adhering to global standards for quality management and customer satisfaction.
            </p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-blue-900 text-white p-6 rounded-lg transition-all duration-300"
          >
            <i className="fas fa-certificate text-3xl mb-4"></i>
            <h3 className="text-xl font-semibold mb-2">CE Marking</h3>
            <p className="text-gray-200">
              Ensuring our machines meet European safety and performance standards.
            </p>
          </motion.div>
        </motion.div>
      </section>
    </main>
  );
};

export default About;