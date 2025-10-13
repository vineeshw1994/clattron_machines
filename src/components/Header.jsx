import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'; 
import { fetchCompanyInfo } from '../store/slices/companySlice'; // Adjust path – public fetch
import StaticLogo from '../assets/logo.png'; // Fallback static logo
import { FaBars, FaTimes } from 'react-icons/fa';
const URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isActive, _setIsActive] = useState(false);
  const company = useSelector((state) => state.company.companyInfo); // Get from Redux
  const dispatch = useDispatch();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Fetch company info on mount for dynamic logo/favicon
  useEffect(() => {
    dispatch(fetchCompanyInfo()); // Assumes thunk works for public (no token needed)
  }, [dispatch]);

  // Dynamic logo URL
  const logoSrc = company?.logo ? `${URL}${company.logo}` : StaticLogo;

  return (
    <header role="banner" className="fixed w-full top-0 z-50">
      <nav className="flex justify-between items-center bg-white text-white p-4 shadow-lg">
        <div className="flex items-center">
          <NavLink to="/" className="flex items-center" aria-label="Clattron Machines homepage">
            <img 
              src={logoSrc} 
              alt="Clattron Machines Logo" 
              className="h-18 mr-3 transition-transform duration-300 rounded-md hover:scale-110 sm:h-14" 
              onError={(e) => { e.target.src = StaticLogo; }} // Fallback on load error
            />
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-xl font-bold text-blue-500 sm:text-lg hidden sm:hidden md:block"
            >
              Clattron <span className='text-black'>Private</span>  <span style={{color:'rgb(251,5,8)'}}>Limited</span>
            </motion.h1>
          </NavLink>
        </div>
        <ul
          className={`${isOpen
              ? 'flex flex-col absolute top-16 right-4 bg-gradient-to-br from-blue-900 to-blue-800 p-6 space-y-4 rounded-xl shadow-2xl border border-blue-700/50 backdrop-blur-sm text-center'
              : 'hidden lg:flex lg:items-center lg:space-x-6'
            }`}
        >
          <li>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `nav-link block relative text-blue-500 text-lg font-semibold px-6 py-3 transition-all duration-300 hover:bg-blue-700/70 hover:text-white rounded-lg ${isActive ? 'text-red-600 font-semibold' : ''
                  } sm:text-base sm:px-4 sm:py-2`
                }
                aria-current={isActive ? 'page' : undefined}
                onClick={() => setIsOpen(false)}
              >
                Home
                <motion.div
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1 bg-blue-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: isActive ? '80%' : '0%' }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
              </NavLink>
            </motion.div>
          </li>
          <li>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <NavLink
                to="/machines"
                className={({ isActive }) =>
                  `nav-link block relative text-blue-500 text-lg font-semibold px-6 py-3 transition-all duration-300 hover:bg-blue-700/70 hover:text-white rounded-lg ${isActive ? 'text-red-600 font-semibold' : ''
                  } sm:text-base sm:px-4 sm:py-2`
                }
                aria-current={isActive ? 'page' : undefined}
                onClick={() => setIsOpen(false)}
              >
                Products
                <motion.div
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1 bg-yellow-400 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: isActive ? '80%' : '0%' }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
              </NavLink>
            </motion.div>
          </li>
          <li>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `nav-link block relative text-blue-500 text-lg font-semibold px-6 py-3 transition-all duration-300 hover:bg-blue-700/70 hover:text-white rounded-lg ${isActive ? 'text-red-600 font-semibold' : ''
                  } sm:text-base sm:px-4 sm:py-2`
                }
                aria-current={isActive ? 'page' : undefined}
                onClick={() => setIsOpen(false)}
              >
                About Us
                <motion.div
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1 bg-yellow-400 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: isActive ? '80%' : '0%' }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
              </NavLink>
            </motion.div>
          </li>
          <li>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `nav-link block relative text-blue-500 text-lg font-semibold px-6 py-3 transition-all duration-300 hover:bg-blue-700/70 hover:text-white rounded-lg ${isActive ? 'text-red-600 font-semibold' : ''
                  } sm:text-base sm:px-4 sm:py-2`
                }
                aria-current={isActive ? 'page' : undefined}
                onClick={() => setIsOpen(false)}
              >
                Contact
                <motion.div
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1 bg-yellow-400 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: isActive ? '80%' : '0%' }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
              </NavLink>
            </motion.div>
          </li>
        </ul>
        <div className="lg:hidden">
          <button
            className="hamburger flex items-center justify-center w-10 h-10 cursor-pointer text-blue-800 hover:text-yellow-400 transition-colors duration-300"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
            onClick={toggleMenu}
          >
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;