import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
const URL = import.meta.env.VITE_API_URL

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();
    setLoading(true);
    setMessage('');
    setIsSuccess(false);
    try {
      const response = await fetch(`${URL}/api/send-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setLoading(false);
        setMessage('Message sent successfully!');
        setIsSuccess(true);
        setFormData({ name: '', email: '', phone: '', message: '' });
        formRef.current.reset();
      } else {
        setMessage('Failed to send message. Please try again.');
        setIsSuccess(false);
        setLoading( false)
      }
    } catch (error) {
      setLoading (false);
      setMessage('Error sending message. Please check your connection.');
      setIsSuccess(false);
    }
  };

  return (
    <section id="contact" className="py-12 px-4 bg-gray-100">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold text-blue-900 text-center mb-8"
      >
        Contact Us
      </motion.h2>
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white p-5 rounded-lg shadow-md"
        >
          <h3 className="text-xl font-semibold text-blue-900 mb-4">Send Us a Message</h3>
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-blue-900 text-sm mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                required
                className="w-full p-2 border border-blue-900 rounded focus:border-yellow-400 focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-blue-900 text-sm mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                required
                className="w-full p-2 border border-blue-900 rounded focus:border-yellow-400 focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-blue-900 text-sm mb-1">
                Mobile Number
              </label>
              <input
                type="tel"
                id="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Your Mobile Number"
                required
                className="w-full p-2 border border-blue-900 rounded focus:border-yellow-400 focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-blue-900 text-sm mb-1">
                Message
              </label>
              <textarea
                id="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message"
                required
                className="w-full p-2 border border-blue-900 rounded focus:border-yellow-400 focus:outline-none min-h-[120px] resize-y"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-yellow-400 text-blue-900 font-bold py-2 rounded hover:bg-yellow-300 transition-colors"
              disabled={loading}
            >
              Submit
            </button>
          </form>
          {message && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`mt-4 text-sm ${isSuccess ? 'text-teal-600' : 'text-red-600'}`}
            >
              {message}
            </motion.p>
          )}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white p-5 rounded-lg shadow-md"
        >
          <h3 className="text-xl font-semibold text-blue-900 mb-4">Get in Touch</h3>
          <div className="space-y-4 text-gray-700">
            <p className="flex items-center gap-2">
              <i className="fas fa-envelope text-blue-900"></i>
              Email: <a href="mailto:info@unicaremachines.com" className="text-blue-900 hover:text-yellow-400">sales@clattron.com</a>
            </p>
            <p className="flex items-center gap-2">
              <i className="fas fa-phone text-blue-900"></i>
              Phone: <a href="tel:+919600444505" className="text-blue-900 hover:text-yellow-400">+91 9600444505</a>
            </p>
            <p className="flex items-center gap-2">
              <i className="fas fa-map-marker-alt text-blue-900"></i>
              Address: 9-5-J, Chekkala Vilai Veedu, Mecode, Kaliyakkavilai, Kanyakumari, Tamil Nadu 629153
            </p>
            <p className="flex items-center gap-2">
              <i className="fas fa-clock text-blue-900"></i>
              Hours: Mon-Fri, 9 AM - 5 PM
            </p>
            {/* <p className="flex items-center gap-2">
              <i className="fas fa-envelope text-blue-900"></i>
              Support: <a href="mailto:support@unicaremachines.com" className="text-blue-900 hover:text-yellow-400">support@unicaremachines.com</a>
            </p> */}
            <a
              href="tel:+919600444505"
              className="block mt-4 bg-yellow-400 text-blue-900 font-bold py-2 text-center rounded hover:bg-yellow-300 transition-colors"
            >
              Call Now
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact; 