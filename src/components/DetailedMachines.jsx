import React from 'react';
import { motion } from 'framer-motion';

const DetailedMachines = ({ machines }) => {
  return (
    <section id="detailed-machines" className="section detailed-machines py-12 px-4 bg-gray-50">
      <h2 className="text-3xl font-bold text-blue-900 text-center mb-8">Explore Our Machine Range</h2>
      <div className="detailed-machines-grid grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
        {machines.map((machine) => (
          <motion.div
            key={machine.id}
            className="detailed-machine-card bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg hover:-translate-y-2 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
          >
            <img src={machine.image} alt={machine.alt} className="w-full h-64 object-cover" />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-blue-900 mb-2">{machine.name}</h3>
              <p className="text-gray-700 mb-2"><strong>Specs:</strong> {machine.specs}</p>
              <p className="text-gray-700 mb-2"><strong>Features:</strong> Advanced control, high efficiency</p>
              <a href="/machines" className="card-button bg-blue-900 text-white p-2 rounded hover:bg-yellow-400 hover:text-blue-900 transition-colors inline-block">Explore Now</a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default DetailedMachines;