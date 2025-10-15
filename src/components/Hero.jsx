import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet'; // Use react-helmet-async for better SSR support
import { fetchCompanyInfo } from '../store/slices/companySlice';

const URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const Hero = () => {
  const company = useSelector((state) => state.company.companyInfo);
  const dispatch = useDispatch();

  // Fetch company info on mount for dynamic video/logo/meta
  useEffect(() => {
    dispatch(fetchCompanyInfo());
  }, [dispatch]);

  // Dynamic title
  const title = company?.name || 'Clattron Machines';

  // Motion variants
  const heroVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  const buttonVariants = {
    hover: { scale: 1.05, boxShadow: '0 8px 25px rgba(251, 191, 36, 0.4)' },
    tap: { scale: 0.98 },
  };

  return (
    <>
      {/* Helmet for dynamic meta tags */}
      <Helmet>
        <title>{title} | Clattron Pvt Limited</title>
        <meta name="description" content={company?.about || 'Empowering Industries with Precision Technology Worldwide'} />
        <meta name="keywords" content="machines, industrial, precision, clattron, engineering" />
        
        {/* Open Graph for social sharing */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={company?.about || 'Leading precision machinery for industrial innovation.'} />
        <meta property="og:image" content={company?.logo ? `${URL}${company.logo}` : '/default-og-image.jpg'} />
        <meta property="og:url" content="https://genzcodershub.com" />
        <meta property="og:type" content="website" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={company?.about || 'Empowering Industries with Precision Technology Worldwide'} />
        <meta name="twitter:image" content={company?.logo ? `${URL}${company.logo}` : '/default-twitter-image.jpg'} />
        
        {/* Favicon */}
        {company?.favicon && <link rel="icon" href={`${URL}${company.favicon}`} />}
        {!company?.favicon && <link rel="icon" href="/favicon.ico" />}
      </Helmet>

      <section
        id="home"
        className="hero section relative h-screen flex items-center justify-center text-center overflow-hidden bg-gradient-to-b from-gray-900 to-gray-800"
        role="banner"
        aria-label="Hero section"
      >
        {/* Background video or iframe */}
        <div className="absolute inset-0">
          {company?.video ? (
            <video
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              poster={company.logo ? `${URL}${company.logo}` : undefined} // Optional poster from logo
              aria-hidden="true"
            >
              <source src={`${URL}${company.video}`} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <iframe
              className="w-full h-full object-cover"
              src="https://www.youtube.com/embed/your-video-id?autoplay=1&mute=1&loop=1&playlist=your-video-id&controls=0&showinfo=0&rel=0"
              frameBorder="0"
              allow="autoplay; encrypted-media; fullscreen"
              allowFullScreen
              style={{ border: 'none' }}
              aria-hidden="true"
              title="Background video"
            />
          )}
        </div>

        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-black/40 z-10" aria-hidden="true" />

        {/* Hero content */}
        <motion.div
          className="relative z-20 px-4 sm:px-6 lg:px-8 max-w-4xl w-full"
          variants={heroVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div
            className="space-y-4 sm:space-y-6 text-center"
            variants={contentVariants}
          >
            {/* Title */}
            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
              variants={itemVariants}
            >
              {(() => {
                if (!company?.name) return 'Clattron Private Limited';
                const name = company.name.trim();
                const parts = name.split('Private Limited');
                return (
                  <>
                    {parts[0]}{parts[0] && parts[1] && <span className="text-gray-200"> Private</span>}
                    {parts[1] && <span style={{ color: 'rgb(251,5,8)' }}>Limited</span>}
                    {parts[1] && !name.endsWith('Limited') && ' Limited'}
                  </>
                );
              })()}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="text-base sm:text-lg md:text-xl text-gray-200 max-w-2xl mx-auto"
              variants={itemVariants}
            >
              {company?.about || 'Empowering Industries with Precision Technology Worldwide'}
            </motion.p>

            {/* CTA Button */}
            <motion.div variants={itemVariants}>
              <Link
                to="/machines"
                className="inline-block bg-gradient-to-r from-yellow-400 to-yellow-500 text-blue-900 font-bold py-3 px-8 rounded-lg hover:from-yellow-500 hover:to-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 shadow-lg hover:shadow-xl transition-all duration-300 uppercase tracking-wide"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                aria-label="Discover Our Machines"
              >
                Discover Our Machines
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
};

export default Hero;