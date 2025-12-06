import React from 'react';
import Hero from '../components/Hero';
import FeaturedMachines from '../components/FeaturedMachines';
import DetailedMachines from '../components/DetailedMachines';
import WhyUs from '../components/WhyUs';
import GlobalReach from '../components/GlobalReach';
import Services from '../components/Services';
import ContactTeaser from '../components/ContactTeaser';
import Testimonials from '../components/Testimonials';
import IndustrialApplications from '../components/IndustrialApplications';
import machines from '../data/mahines.json';
import ClattronHeroPoster from '../components/ClattronHeroPoster';
import ClattronUnderConstruction from '../components/ClattronUnderConstruction';

const Home = () => {
  const featuredMachines = machines.slice(0, 6); // Top 6 machines for carousel
  const detailedMachines = machines.slice(0, 2); // First two for demo

  return (
    <div>
      {/* <ClattronHeroPoster /> */}
      <ClattronUnderConstruction />
      <Hero />
      <FeaturedMachines machines={featuredMachines} />
      <DetailedMachines machines={detailedMachines} />
      <WhyUs />
      <GlobalReach />
      <Services />
      {/* <Testimonials /> */}
      {/* <IndustrialApplications /> */}
      <ContactTeaser />
    </div>
  );
};

export default Home;