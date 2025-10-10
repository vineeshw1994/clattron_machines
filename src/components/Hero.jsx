import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section id="home" className="hero section relative h-screen flex items-center justify-center text-center overflow-hidden">
      <iframe
        className="hero-video absolute top-0 left-0 w-full h-full object-cover z-0"
        src="https://www.youtube.com/embed/ZM370LUas2Y?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&modestbranding=1&loop=1&playlist=ZM370LUas2Y"
        frameBorder="0"
        allow="autoplay; encrypted-media"
        allowFullScreen
        style={{ aspectRatio: '16 / 9', pointerEvents: 'none' }}
      ></iframe>
      <div className="hero-content bg-black/50 p-6 rounded-lg z-10">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Clattron Machines</h1>
        <p className="text-lg md:text-xl text-white mb-6">Empowering Industries with Precision Technology Worldwide</p>
        <Link to={'/machines'}  className="cta-button bg-yellow-400 text-blue-900 font-bold py-3 px-6 rounded hover:bg-yellow-300 transition-all duration-300">Discover Our Machines</Link>
      </div>
    </section>
  );
};

export default Hero;