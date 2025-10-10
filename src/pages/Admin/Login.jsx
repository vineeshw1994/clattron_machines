import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { AiOutlineTwitter } from 'react-icons/ai';
import { BiLogoFacebook } from 'react-icons/bi';
import { loginUser, logout } from '../../store/slices/userSlice';
import axios from 'axios';
const URL = import.meta.env.VITE_API_URL

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, } = useSelector((state) => state.user);

  // Check if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin/dashboard');
    }
  }, [isAuthenticated, navigate]);

 

  const handleLogin = async (e) => {
    e.preventDefault();

    // Client-side validation
    if (!username || !password) {
      setError('Username and password are required');
      setLoading(false);
      return;
    }

    try {
      const { data } = await axios.post(`${URL}/api/admin/login`, { username, password });
      dispatch(loginUser({ username, password }));
      setSuccess('Login successful! Redirecting...');
      setTimeout(() => navigate('/admin/dashboard'), 1000); // Brief delay for success message
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials. Please try again.');
      setLoading(false);
    }

  };

  // Reset error on input change
  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    if (error) dispatch({ type: 'user/loginUser/rejected', payload: null });
  };

  // Framer Motion variants (unchanged)
  const leftSectionVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  const rightSectionVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut', staggerChildren: 0.1 } },
  };

  const inputVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    focus: { scale: 1.03, borderColor: '#2563eb', boxShadow: '0 0 0 3px rgba(37, 99, 235, 0.2)', transition: { duration: 0.2 } },
    blur: { scale: 1, borderColor: '#d1d5db', boxShadow: 'none', transition: { duration: 0.2 } },
  };

  const buttonVariants = {
    hover: { scale: 1.06, boxShadow: '0 4px 14px rgba(37, 99, 235, 0.3)', transition: { duration: 0.2 } },
    tap: { scale: 0.94 },
  };

  return (
    <section className="min-h-screen flex flex-col md:flex-row justify-center items-center bg-[#f5f5f5] p-4 md:p-8">
      {/* Left Section: Logo, Company Name, Social Icons */}
      <motion.div
        className="w-full md:w-1/2 flex flex-col items-center justify-center p-6 md:p-12 bg-gradient-to-b from-gray-800 to-gray-900 text-white"
        variants={leftSectionVariants}
        initial="hidden"
        animate="visible"
      >
        <img
          src="https://vineeshw1994.github.io/machines-site/logo.png"
          alt="Clattron Machines Logo"
          className="w-32 h-32 object-contain mb-6"
        />
        <h2 className="text-4xl font-extrabold tracking-tight mb-3">Clattron Pvt Limited</h2>
        <p className="text-sm text-gray-300 mb-6">Empowering Precision Engineering</p>
      </motion.div>

      {/* Right Section: Login Form */}
      <motion.div
        className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-12"
        variants={rightSectionVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="bg-white p-8 rounded-xl shadow-2xl border border-gray-200 max-w-md w-full bg-gradient-to-br from-gray-50 to-gray-100">
          <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">Admin Login</h1>

          {/* Error Message */}
          <AnimatePresence>
            {error && (
              <motion.div
                className="bg-red-100 text-red-700 p-3 rounded-lg mb-4 text-center"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            <motion.div variants={inputVariants} initial="hidden" animate="visible">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <motion.input
                id="username"
                type="text"
                value={username}
                onChange={handleInputChange(setUsername)}
                placeholder="Enter username"
                className="mt-1 block w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                variants={inputVariants}
                whileFocus="focus"
                aria-required="true"
              />
            </motion.div>

            <motion.div variants={inputVariants} initial="hidden" animate="visible">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <motion.input
                id="password"
                type="password"
                value={password}
                onChange={handleInputChange(setPassword)}
                placeholder="Enter password"
                className="mt-1 block w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                variants={inputVariants}
                whileFocus="focus"
                aria-required="true"
              />
            </motion.div>

            <motion.button
              type="submit"
              className={`w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold uppercase tracking-wider ${loading ? 'opacity-60 cursor-not-allowed' : ''
                }`}
              variants={buttonVariants}
              whileHover={!loading ? 'hover' : {}}
              whileTap={!loading ? 'tap' : {}}
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </section>
  );
}