import React from 'react';
import { motion } from 'framer-motion';

const Testimonials = () => {
  const testimonials = [
    { text: 'Clattron’s CNC machines transformed our production line—unmatched precision!', author: 'John Doe, CEO, TechFab' },
    { text: 'Excellent support and innovative 3D printers—highly recommend!', author: 'Jane Smith, Innovate Designs' },
    { text: 'Global reach with top-notch service—Clattron is a game-changer.', author: 'Ali Khan, Global Manufacturing' },
  ];

  return (
    <section id="testimonials" className="section testimonials py-12 px-4 bg-gray-50">
      <h2 className="text-3xl font-bold text-blue-900 text-center mb-8">What Our Clients Say</h2>
      <div className="testimonials-grid grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            className="testimonial-card bg-white p-6 rounded-lg shadow-md hover:shadow-lg hover:-translate-y-2 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
          >
            <p className="text-gray-700 italic mb-4">{testimonial.text}</p>
            <h4 className="text-blue-900 font-semibold">{testimonial.author}</h4>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;