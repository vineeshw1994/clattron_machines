import React from 'react';
import { motion } from 'framer-motion';
import Logo from '../assets/image.png';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaYoutube, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const socialVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 20
      }
    },
  };

  return (
    <footer role="contentinfo" className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white py-8 px-6 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_1rem_1rem,#e0f2fe,transparent)]" />
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_1rem_1rem,#e0f2fe,transparent)] transform rotate-45" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8"
        >
          {/* Logo & Brand */}
          <motion.div variants={itemVariants} className="footer-logo col-span-1 sm:col-span-2 lg:col-span-1">
            <motion.img
              src={Logo}
              alt="Clattron Machines Logo"
              className="h-16 mb-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              whileHover={{ scale: 1.05, rotate: 2 }}
            />
            <motion.p
              variants={itemVariants}
              className="text-sm font-medium opacity-90"
            >
              Clattron Private Limited © {new Date().getFullYear()}
            </motion.p>
            <motion.p
              variants={itemVariants}
              className="tagline text-yellow-300 text-sm mt-2 font-light italic"
            >
              Empowering Industries with Precision Technology
            </motion.p>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants} className="footer-links">
            <h3 className="text-lg font-bold mb-6 text-whitesmoke border-b border-yellow-400/30 pb-2">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { href: '/', label: 'Home' },
                { href: '/machines', label: 'Machines' },
                { href: '/about', label: 'About Us' },
                { href: '/contact', label: 'Contact' },
              ].map((link,) => (
                <motion.li key={link.href} variants={itemVariants}>
                  <motion.a
                    href={link.href}
                    className="flex items-center text-white/90 hover:text-whitesmoke transition-all duration-300 text-sm group"
                    whileHover={{ x: 4 }}
                  >
                    <span className="w-1 h-1 bg-whitesmoke rounded-full mr-3 group-hover:scale-150 transition-transform" />
                    {link.label}
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants} className="footer-contact">
            <h3 className="text-lg font-bold mb-6 text-whitesmoke border-b border-yellow-400/30 pb-2">Get in Touch</h3>
            <ul className="space-y-3">
              <li className="flex items-center text-white/90 text-sm">
                <FaMapMarkerAlt className="mr-3 text-whitesmoke text-lg" />
                Kaliyakkavilai, Kanyakumari, Tamil Nadu 629153
              </li>
              <li className="flex items-center text-white/90 text-sm">
                <FaPhone className="mr-3 text-whitesmoke text-lg" />
                +91 9600444505
              </li>
              <li className="flex items-center text-white/90 text-sm">
                <FaEnvelope className="mr-3 text-whitesmoke text-lg" />
                sales@clattron.com
              </li>
            </ul>
          </motion.div>

          {/* Social Media */}
          <motion.div variants={itemVariants} className="footer-social lg:col-span-1">
            <h3 className="text-lg font-bold mb-6 text-whitesmoke border-b border-yellow-400/30 pb-2">Follow Us</h3>
            <div className="flex gap-3 justify-start sm:justify-center">
              {[
                { icon: FaFacebookF, href: 'https://facebook.com/clattron', label: 'Facebook' },
                { icon: FaTwitter, href: 'https://twitter.com/clattron', label: 'Twitter' },
                { icon: FaLinkedinIn, href: 'https://linkedin.com/company/clattron', label: 'LinkedIn' },
                { icon: FaInstagram, href: 'https://instagram.com/clattron', label: 'Instagram' },
                { icon: FaYoutube, href: 'https://youtube.com/clattron', label: 'YouTube' },
              ].map((social,) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative"
                  variants={socialVariants}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-yellow-300/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <social.icon className="text-xl relative z-10 text-white/90 group-hover:text-yellow-300 transition-colors duration-300" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent my-4" />

        {/* Privacy & Terms */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center text-sm text-white/70 space-y-2"
        >
          <p>&copy; {new Date().getFullYear()} Clattron Private Limited. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-4">
            {/* <motion.a href="/privacy" className="hover:text-yellow-300 transition-colors" whileHover={{ scale: 1.05 }}>
              Privacy Policy
            </motion.a>
            <motion.a href="/terms" className="hover:text-yellow-300 transition-colors" whileHover={{ scale: 1.05 }}>
              Terms of Service
            </motion.a> */}
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;