import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { FiCheckCircle, FiAlertCircle, FiArrowLeft } from 'react-icons/fi'; // For icons
const URL = import.meta.env.VITE_API_URL


/* global process */

export default function CompanyInfoPage() {
      const { token } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const [previewLogo, setPreviewLogo] = useState(null);
  const [previewFavicon, setPreviewFavicon] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false); // For loading state
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      name: '',
      address: '',
      phone: '',
      email: '',
      about: '',
    },
  });
  const [logo, setLogo] = useState(null);
  const [favicon, setFavicon] = useState(null);

  // Check authentication and fetch company info
  useEffect(() => {
    // const token = localStorage.getItem('token');
    if (!token) {
      navigate('/admin/login');
      return;
    }
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    fetchInfo();
  }, [navigate]);

  const fetchInfo = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/company-info`);
      reset(data);
      setPreviewLogo(data.logo ? `${import.meta.env.VITE_API_URL}${data.logo}` : null);
      setPreviewFavicon(data.favicon ? `${import.meta.env.VITE_API_URL}${data.favicon}` : null);
    } catch (err) {
      setError('Failed to fetch company info');
    }
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    setLogo(file);
    setPreviewLogo(file ? URL.createObjectURL(file) : null);
  };

  const handleFaviconChange = (e) => {
    const file = e.target.files[0];
    setFavicon(file);
    setPreviewFavicon(file ? URL.createObjectURL(file) : null);
  };

  const handleRemoveLogo = () => {
    setLogo(null);
    setPreviewLogo(null);
    document.getElementById('logoInput').value = '';
  };

  const handleRemoveFavicon = () => {
    setFavicon(null);
    setPreviewFavicon(null);
    document.getElementById('faviconInput').value = '';
  };

  const onSubmit = async (data) => {
    setError('');
    setSuccess('');
    setIsLoading(true);

    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value) formData.append(key, value);
    });
    if (logo) formData.append('logo', logo);
    if (favicon) formData.append('favicon', favicon);

    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/api/admin/company-info`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setSuccess('Company info updated successfully!');
      await fetchInfo(); // Refresh data
      setLogo(null);
      setFavicon(null);
      document.getElementById('logoInput').value = '';
      document.getElementById('faviconInput').value = '';
    } catch (err) {
      setError('Failed to update company info');
    } finally {
      setIsLoading(false);
    }
  };

  // Framer Motion variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, staggerChildren: 0.1, ease: 'easeOut' },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    hover: { scale: 1.02, transition: { duration: 0.2 } },
  };

  const messageVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
  };

  return (
    <motion.div
      className="bg-gradient-to-br from-gray-100 to-gray-200 p-6 min-h-screen"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-3xl mx-auto">
        {/* Breadcrumbs */}
        <nav className="flex items-center text-sm mb-6">
          <Link
            to="/admin/dashboard"
            className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          >
            <FiArrowLeft className="mr-1" /> Dashboard
          </Link>
          <span className="mx-2 text-gray-500">/</span>
          <span className="text-gray-700">Update Company Info</span>
        </nav>

        <h1 className="text-4xl font-extrabold text-gray-800 mb-8 tracking-tight">
          Update Company Information
        </h1>

        {/* Success/Error Messages */}
        <AnimatePresence>
          {error && (
            <motion.div
              className="bg-red-50 text-red-700 p-4 rounded-lg mb-6 flex items-center shadow-md"
              variants={messageVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <FiAlertCircle className="mr-2 text-lg" />
              {error}
            </motion.div>
          )}
          {success && (
            <motion.div
              className="bg-green-50 text-green-700 p-4 rounded-lg mb-6 flex items-center shadow-md"
              variants={messageVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <FiCheckCircle className="mr-2 text-lg" />
              {success}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white p-8 rounded-2xl shadow-xl border border-gray-200 bg-gradient-to-br from-gray-50 to-gray-100 space-y-6"
        >
          <motion.div variants={itemVariants}>
            <label className="block text-sm font-semibold text-gray-700">Company Name</label>
            <input
              {...register('name', { required: 'Company name is required' })}
              placeholder="Enter company name"
              className="mt-2 block w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </motion.div>

          <motion.div variants={itemVariants}>
            <label className="block text-sm font-semibold text-gray-700">Address</label>
            <input
              {...register('address')}
              placeholder="Enter address"
              className="mt-2 block w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <label className="block text-sm font-semibold text-gray-700">Phone</label>
            <input
              {...register('phone')}
              placeholder="Enter phone number"
              className="mt-2 block w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <label className="block text-sm font-semibold text-gray-700">Email</label>
            <input
              {...register('email', {
                required: 'Email is required',
                pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' },
              })}
              placeholder="Enter email address"
              type="email"
              className="mt-2 block w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </motion.div>

          <motion.div variants={itemVariants}>
            <label className="block text-sm font-semibold text-gray-700">About</label>
            <textarea
              {...register('about')}
              placeholder="Describe your company"
              className="mt-2 block w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              rows="5"
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <label className="block text-sm font-semibold text-gray-700">Company Logo</label>
            <input
              id="logoInput"
              type="file"
              onChange={handleLogoChange}
              className="mt-2 block w-full border border-gray-300 rounded-lg p-3 text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              accept="image/*"
              aria-label="Upload company logo"
            />
            {previewLogo && (
              <div className="relative mt-4 w-32 h-32">
                <motion.img
                  src={previewLogo}
                  alt="Logo Preview"
                  className="w-32 h-32 object-contain rounded-lg border border-gray-200 shadow-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.button
                  type="button"
                  onClick={handleRemoveLogo}
                  className="absolute top-1 right-1 bg-red-500 text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full hover:bg-red-600 shadow-sm"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Remove logo"
                >
                  X
                </motion.button>
              </div>
            )}
          </motion.div>

          <motion.div variants={itemVariants}>
            <label className="block text-sm font-semibold text-gray-700">Favicon</label>
            <input
              id="faviconInput"
              type="file"
              onChange={handleFaviconChange}
              className="mt-2 block w-full border border-gray-300 rounded-lg p-3 text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              accept="image/*"
              aria-label="Upload favicon"
            />
            {previewFavicon && (
              <div className="relative mt-4 w-32 h-32">
                <motion.img
                  src={previewFavicon}
                  alt="Favicon Preview"
                  className="w-32 h-32 object-contain rounded-lg border border-gray-200 shadow-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.button
                  type="button"
                  onClick={handleRemoveFavicon}
                  className="absolute top-1 right-1 bg-red-500 text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full hover:bg-red-600 shadow-sm"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Remove favicon"
                >
                  X
                </motion.button>
              </div>
            )}
          </motion.div>

          <motion.div className="flex justify-end space-x-3" variants={itemVariants}>
            <Link
              to="/admin/dashboard"
              className="bg-gray-200 text-gray-800 px-5 py-2 rounded-lg hover:bg-gray-300 transition-colors flex items-center"
            >
              <FiArrowLeft className="mr-2" /> Cancel
            </Link>
            <motion.button
              type="submit"
              className="bg-gradient-to-r from-green-500 to-green-600 text-white px-5 py-2 rounded-lg hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 flex items-center disabled:opacity-50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={isLoading}
            >
              {isLoading ? (
                <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              ) : (
                <FiCheckCircle className="mr-2" />
              )}
              {isLoading ? 'Updating...' : 'Update'}
            </motion.button>
          </motion.div>
        </form>
      </div>
    </motion.div>
  );
}