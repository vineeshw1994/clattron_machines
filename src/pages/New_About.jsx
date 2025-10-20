import React from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/About_Us/Hero';
import WhoWeAre from '../components/About_Us/WhoWeAre';
import ManufacturingPhilosophy from '../components/About_Us/ManufacturingPhilosophy';
import QualityStandards from '../components/About_Us/QualityStandards';
import ServiceApproach from '../components/About_Us/ServiceApproach';
import WhatYouGet from '../components/About_Us/WhatYouGet';
import WhereWeServe from '../components/About_Us/WhereWeServe';
import OurPromise from '../components/About_Us/OurPromise';
import BuildingReputation from '../components/About_Us/BuildingReputation';
import ReadyToDiscuss from '../components/About_Us/ReadyToDiscuss';

const ClattronAbout = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  return (
    <div className="bg-indigo-950  text-white">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Hero />
        <WhoWeAre />
        <ManufacturingPhilosophy />
        <QualityStandards />
        <ServiceApproach />
        <WhatYouGet />
        <WhereWeServe />
        <OurPromise />
        <BuildingReputation />
        <ReadyToDiscuss />
      </motion.div>
    
    </div>
  );
};

export default ClattronAbout;