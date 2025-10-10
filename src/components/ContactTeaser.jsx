import React from 'react';

const ContactTeaser = () => {
  return (
    <section id="contact-teaser" className="section contact-teaser py-12 px-4 bg-gray-200 text-center">
      <h2 className="text-3xl font-bold text-blue-900 mb-4">Ready to Get Started?</h2>
      <p className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto">Contact us today to find the perfect machine solution for your global operations.</p>
      <a href="/contact" className="cta-button bg-yellow-400 text-blue-900 font-bold py-3 px-6 rounded hover:bg-yellow-300 transition-all duration-300">Get in Touch</a>
    </section>
  );
};

export default ContactTeaser;