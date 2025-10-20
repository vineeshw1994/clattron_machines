import { useState, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const URL = import.meta.env.VITE_API_URL;
 
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
        swiper.slideNext(slidesPerView, true, true);
      } else {
        swiper.slidePrev(slidesPerView, true, true);
      }
    }
  };

  if (loading) {
    return (
      <section className="section machines py-16 px-2 sm:px-4 lg:px-6 bg-gradient-to-b from-gray-50 to-blue-50 min-h-[50vh] flex justify-center items-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-8 h-8 sm:w-10 sm:h-10 border-4 border-blue-500 border-t-transparent rounded-full"
        />
      </section>
    );
  }

  if (error || featuredMachines?.length === 0) {
    return (
      null
      // <section className="section machines py-16 px-2 sm:px-4 lg:px-6 bg-gradient-to-b from-gray-50 to-blue-50 min-h-[50vh] flex justify-center items-center">
      //   <p className="text-gray-600 text-center text-sm sm:text-base">No featured machines available at the moment.</p>
      // </section>
    );
  }

  // Motion variants
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.section
      id="featured"
      className="section machines py-12 sm:py-16 px-2 sm:px-4 lg:px-6 bg-gradient-to-b from-gray-30 via-blue-400 to-indigo-300 relative overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-8 sm:mb-12  "
          variants={titleVariants}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 tracking-tight">
            Our Top Machines
          </h2>
          <p className="text-gray-600 text-sm sm:text-base max-w-xl mx-auto">
            Discover our premium selection of cutting-edge machines designed for unparalleled performance and efficiency.
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div className="carousel-container relative max-w-6xl mx-auto overflow-hidden">
          <Swiper
            ref={swiperRef}
            spaceBetween={12}
            slidesPerView={1}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            navigation={false}
            pagination={{
              clickable: true,
              dynamicBullets: true,
              renderBullet: (index, className) => `<span class="${className} bg-blue-500 w-2 h-2 rounded-full"></span>`,
            }}
            modules={[Navigation, Pagination, Autoplay]}
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 20 },
              768: { slidesPerView: 2, spaceBetween: 24 },
              1024: { slidesPerView: 3, spaceBetween: 30 },
              1280: { slidesPerView: 4, spaceBetween: 40 },
            }}
            className="mySwiper"
            speed={600}
            grabCursor={true}
          >
            {featuredMachines?.map((machine) => (
              <SwiperSlide key={machine._id}>
                <motion.div
                  className="group cursor-pointer  "
                  initial={false}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => navigate(`/machines/${machine._id}`)}
                >
                  <div className="bg-stone-200 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100">
                    <div className="relative overflow-hidden">
                      <img
                        src={`${URL}${machine.image}`}
                        alt={machine.name}
                        className="w-full h-48 sm:h-52 object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      {machine.featured && (
                        <span className="absolute top-2 left-2 bg-yellow-400 text-blue-900 text-xs font-bold px-2 py-1 rounded-full">
                          Featured
                        </span>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors">
                        {machine.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {machine.description.split('.')[0]}.
                      </p>
                      {machine.price && (
                        <div className="mb-3">
                          <span className="text-xl font-bold text-green-600">${machine.price}</span>
                          <span className="text-sm text-gray-500 ml-1">/month</span>
                        </div>
                      )}
                      <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm">
                        View Details
                      </button>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Custom Navigation Buttons – Mobile Hidden, Desktop Visible */}
        <motion.button
          className="swiper-button-prev-custom absolute top-1/2 -translate-y-1/2 left-4 md:left-[-20px] z-20 bg-white/90 backdrop-blur-sm text-gray-800 p-3 rounded-full hover:bg-yellow-400 hover:text-blue-900 shadow-lg border border-gray-200 hidden sm:block"
          onClick={() => handleNavigationClick('slidePrev')}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Previous slide"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
          </svg>
        </motion.button>

        <motion.button
          className="swiper-button-next-custom absolute top-1/2 -translate-y-1/2 right-4 md:right-[-20px] z-20 bg-white/90 backdrop-blur-sm text-gray-800 p-3 rounded-full hover:bg-yellow-400 hover:text-blue-900 shadow-lg border border-gray-200 hidden sm:block"
          onClick={() => handleNavigationClick('slideNext')}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Next slide"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </motion.button>

        
      </div>
    </motion.section>
  );
};

export default FeaturedMachines;