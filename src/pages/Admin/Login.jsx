import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { loginUser } from '../../store/slices/userSlice';
import { fetchCompanyInfo } from '../../store/slices/companySlice'; // For dynamic logo
import StaticLogo from '../../assets/logo.png'; // Fallback
import { FiUser, FiLock, FiEye, FiEyeOff, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';

const URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, error: loginError } = useSelector((state) => state.user); // Grab error from slice
  const company = useSelector((state) => state.company.companyInfo);
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting }, setError: setFormError, clearErrors } = useForm();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin/dashboard');
    }
  }, [isAuthenticated, navigate]);

  // Fetch company for dynamic logo
  useEffect(() => {
    dispatch(fetchCompanyInfo());
  }, [dispatch]);

  // Clear errors on input change
  const handleInputChange = (field) => (e) => {
    clearErrors(field);
    if (loginError) {
      dispatch({ type: 'user/loginUser/rejected', payload: null }); // Clear Redux error
    }
  };

  const onSubmit = async (data) => {
    try {
      // Clear previous errors
      clearErrors();
      
      await dispatch(loginUser(data)).unwrap(); // Throws if rejected
      navigate('/admin/dashboard');
    } catch (err) {
      // err.message from thunk rejectValue
      setFormError('root', { message: err.message || 'Invalid credentials. Please try again.' });
    }
  };

  const logoSrc = company?.logo ? `${URL}${company.logo}` : StaticLogo;

  // Framer Motion variants
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

  const messageVariants = {
    hidden: { opacity: 0, y: -20, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -20, scale: 0.95, transition: { duration: 0.2 } },
  };

  return (
    <section className="min-h-screen flex flex-col md:flex-row justify-center items-center bg-[#f5f5f5] p-4 md:p-8">
      {/* Left Section: Logo, Company Name */}
      <motion.div
        className="w-full md:w-1/2 flex flex-col items-center justify-center p-6 lg:mr-4 md:p-12 bg-gradient-to-b from-gray-800 to-gray-900 text-white rounded-l-xl"
        variants={leftSectionVariants}
        initial="hidden"
        animate="visible"
      >
        <img
          src={logoSrc}
          alt="Clattron Machines Logo"
          className="w-32 h-32 object-contain mb-6 rounded-lg shadow-lg"
          onError={(e) => { e.target.src = StaticLogo; }}
        />
        <h2 className="text-3xl font-extrabold tracking-tight mb-3">{company?.name ? company?.name : 'Clattron Pvt Limited'}</h2>
        <p className="text-sm text-gray-300 mb-6 text-center max-w-md">
          Empowering Industries with Precision Technology
        </p>
      </motion.div>

      {/* Right Section: Login Form */}
      <motion.div
        className="w-full md:w-1/2 flex items-center justify-center p-2 md:p-12 rounded-r-xl bg-white shadow-2xl border border-gray-200"
        variants={rightSectionVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="w-full max-w-md space-y-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Admin Login</h1>
            <p className="text-gray-600 text-sm">Sign in to your account</p>
          </div>

          {/* Global Error Message (Top Banner - Shows thunk errors too) */}
          <AnimatePresence>
            {errors.root && (
              <motion.div
                className="bg-red-50 border-l-4 border-red-500 text-red-700 p-3 rounded-lg text-center text-sm shadow-md"
                variants={messageVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <FiAlertCircle className="inline mr-2" />
                {errors.root.message}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <motion.div variants={inputVariants} initial="hidden" animate="visible">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                <FiUser className="mr-2 text-gray-500" />
                Username
              </label>
              <motion.input
                id="username"
                type="text"
                {...register('username', { required: 'Username is required' })}
                placeholder="Enter username"
                onChange={handleInputChange('username')}
                className="block w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                variants={inputVariants}
                whileFocus="focus"
              />
              {errors.username && (
                <motion.p
                  className="text-red-500 text-xs mt-1 flex items-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <FiAlertCircle className="mr-1" />
                  {errors.username.message}
                </motion.p>
              )}
            </motion.div>

            <motion.div variants={inputVariants} initial="hidden" animate="visible">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                <FiLock className="mr-2 text-gray-500" />
                Password
              </label>
              <div className="relative">
                <motion.input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  {...register('password', { required: 'Password is required' })}
                  placeholder="Enter password"
                  onChange={handleInputChange('password')}
                  className="block w-full border border-gray-300 rounded-lg p-3 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                  variants={inputVariants}
                  whileFocus="focus"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>
              {errors.password && (
                <motion.p
                  className="text-red-500 text-xs mt-1 flex items-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <FiAlertCircle className="mr-1" />
                  {errors.password.message}
                </motion.p>
              )}
            </motion.div>

            <motion.button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold uppercase tracking-wide shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              variants={buttonVariants}
              whileHover={!isSubmitting ? 'hover' : {}}
              whileTap={!isSubmitting ? 'tap' : {}}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12c0-4.418 3.582-8 8-8a7.962 7.962 0 014.291 2z"></path>
                  </svg>
                  Signing In...
                </>
              ) : (
                'Sign In'
              )}
            </motion.button>
          </form>

          {/* Forgot Password Link */}
          {/* <div className="text-center">
            <Link
              to="/admin/forgot-password"
              className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
            >
              Forgot Password?
            </Link>
          </div> */}
        </div>
      </motion.div>
    </section>
  );
}