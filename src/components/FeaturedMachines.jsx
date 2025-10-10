import React, { useState, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { motion } from 'framer-motion';
import axios from 'axios';  // Assuming axios is installed and configured
import { useNavigate } from 'react-router-dom';
const URL = import.meta.env.VITE_API_URL

const FeaturedMachines = () => {
  const [featuredMachines, setFeaturedMachines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const swiperRef = useRef(null);

  useEffect(() => {
    const fetchFeaturedMachines = async () => { 
      try {
        const { data } = await axios.get(`${URL}/api/admin/featured-machines`);
        setFeaturedMachines(data);
      } catch (err) {
        console.error('Error fetching featured machines:', err);
        setError('Failed to load featured machines. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedMachines();
  }, []);

  const handleNavigationClick = (direction) => {
    if (swiperRef.current && swiperRef.current.swiper) {
      const swiper = swiperRef.current.swiper;
      const slidesPerView = swiper.params.slidesPerView;
      if (direction === 'slideNext') {
        swiper.slideNext(slidesPerView, true, true); // Slide by visible slides
      } else {
        swiper.slidePrev(slidesPerView, true, true); // Slide by visible slides
      }
    }
  };

  if (loading) {
    return (
      <section className="section machines py-16 px-4 bg-gradient-to-b from-gray-50 to-blue-50">
        <div className="flex justify-center items-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"
          />
          <span className="ml-2 text-gray-600">Loading featured machines...</span>
        </div>
      </section>
    );
  }





  return (
    featuredMachines?.length === 0 ? null :
      <section id="featured" className="section machines py-16 px-4 bg-gradient-to-b from-gray-50 via-blue-50 to-indigo-100 relative overflow-visible">
        {/* Animated background elements for richness */}
        <div className="absolute inset-0 opacity-10">
          <motion.div
            className="absolute top-10 left-10 w-20 h-20 bg-blue-200 rounded-full"
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-20 right-20 w-32 h-32 bg-indigo-200 rounded-full blur-xl"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative z-10"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-blue-900 text-center mb-12 tracking-wide drop-shadow-lg bg-gradient-to-r from-blue-900 to-indigo-900 bg-clip-text text-transparent">
            Our Top Machines
          </h2>
          <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto px-4">
            Discover our premium selection of cutting-edge machines designed for unparalleled performance and efficiency.
          </p>
        </motion.div>

        <div className="carousel-container relative max-w-7xl  z-10 overflow-visible mx-8">
          <Swiper
            ref={swiperRef}
            spaceBetween={20}
            slidesPerView={1}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            navigation={false} // Disable default navigation to use custom
            pagination={{
              clickable: true,
              dynamicBullets: true,
              renderBullet: (index, className) => (
                `<span class="${className} bg-gradient-to-r from-blue-500 to-indigo-500 w-3 h-3 rounded-full"></span>`
              ),
            }}
            modules={[Navigation, Pagination, Autoplay]}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 30
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 40
              },
              1280: {
                slidesPerView: 4,
                spaceBetween: 50
              },
            }}
            className="mySwiper"
            speed={600} // Smoother slide speed
            grabCursor={true} // Cursor changes on hover for drag
          >
            {featuredMachines?.map((machine, index) => (
              <SwiperSlide key={machine._id}>
                <motion.div
                  className="machine-card bg-white backdrop-blur-sm rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl hover:-translate-y-4 transition-all duration-500 border border-white/20 cursor-pointer relative group"
                  // whileHover={{ scale: 1.05, rotateX: 5 }}
                  initial={false} // Disable initial anim since Swiper handles it
                  onClick={() => navigate(`/machines/${machine._id}`)}
                >
                  {/* Overlay for hover effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <img
                    src={`http://localhost:5000${machine.image}`}
                    alt={machine.name}
                    className="w-full h-56 md:h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="p-6 relative z-10">
                    <h3 className="text-xl font-bold text-blue-900 mb-2 line-clamp-1 group-hover:text-indigo-900 transition-colors">
                      {machine.name}
                    </h3>
                    <p className="text-gray-600 mb-4 text-sm line-clamp-2 leading-relaxed">
                      {machine.description.split('.')[0]}.
                    </p>
                    {/* Added price or key feature if available, assuming optional field */}
                    {machine.price && (
                      <div className="mb-4">
                        <span className="text-2xl font-bold text-green-600">${machine.price}</span>
                        <span className="text-sm text-gray-500 ml-2">/month</span>
                      </div>
                    )}
                    <motion.a
                      href={`/machines/${machine._id}`}
                      className="card-button bg-gradient-to-r from-blue-900 to-indigo-900 text-white px-6 py-3 rounded-xl hover:from-yellow-400 hover:to-yellow-300 hover:text-blue-900 transition-all duration-300 inline-block text-center font-semibold shadow-lg hover:shadow-xl"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      View Details →
                    </motion.a>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Buttons - Enhanced visibility with overflow-visible and wider padding */}
          <motion.button
            className="swiper-button-prev-custom absolute top-1/2 -translate-y-1/2 left-[-40px] md:left-[-50px] z-30 bg-gradient-to-r from-gray-800/95 to-gray-600/95 backdrop-blur-md text-white p-4 md:p-5 rounded-full hover:from-yellow-400 hover:to-yellow-300 hover:shadow-2xl transition-all duration-300 shadow-xl border border-white/30 text-shadow-lg hidden sm:block"
            onClick={() => handleNavigationClick('slidePrev')}
            whileHover={{ scale: 1.15, rotate: -5 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Previous slide"
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <svg className="w-6 h-6 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
            </svg>
          </motion.button>

          <motion.button
            className="swiper-button-next-custom absolute top-1/2 -translate-y-1/2 right-[-40px] md:right-[-50px] z-30 bg-gradient-to-r from-gray-800/95 to-gray-600/95 backdrop-blur-md text-white p-4 md:p-5 rounded-full hover:from-yellow-400 hover:to-yellow-300 hover:shadow-2xl transition-all duration-300 shadow-xl border border-white/30 text-shadow-lg hidden sm:block"
            onClick={() => handleNavigationClick('slideNext')}
            whileHover={{ scale: 1.15, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Next slide"
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <svg className="w-6 h-6 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </motion.button>
        </div>

        {/* Stats or quick facts for added richness */}
        <motion.div
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.2 }}
        >
          <motion.div variants={{ opacity: 1 }}>
            <div className="text-3xl font-bold text-blue-600 mb-2">{featuredMachines.length}</div>
            <div className="text-gray-600">Premium Machines</div>
          </motion.div>
          <motion.div variants={{ opacity: 1 }}>
            <div className="text-3xl font-bold text-green-600 mb-2">24/7</div>
            <div className="text-gray-600">Support</div>
          </motion.div>
          <motion.div variants={{ opacity: 1 }}>
            <div className="text-3xl font-bold text-indigo-600 mb-2">100%</div>
            <div className="text-gray-600">Satisfaction</div>
          </motion.div>
        </motion.div>
      </section>
  );
};

export default FeaturedMachines;