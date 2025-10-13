import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { FiCheckCircle, FiAlertCircle, FiArrowLeft, FiUpload, FiImage,  FiMapPin, FiPhone, FiMail, FiEdit3, FiVideo, FiPlayCircle } from 'react-icons/fi';
import { BsBuildings } from "react-icons/bs";
import { fetchCompanyInfo, setCompany } from '../../store/slices/companySlice';
const URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function CompanyInfoPage() {
  const { token } = useSelector((state) => state.user);
  const company = useSelector((state) => state.company.companyInfo);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [previewLogo, setPreviewLogo] = useState(null);
  const [previewFavicon, setPreviewFavicon] = useState(null);
  const [previewVideo, setPreviewVideo] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      name: '',
      address: '',
      city: '',
      state: '',
      zipcode: '',
      phone: '',
      email: '',
      about: '',
    },
  });
  const [logo, setLogo] = useState(null);
  const [favicon, setFavicon] = useState(null);
  const [video, setVideo] = useState(null);

  // Check authentication and fetch company info
  useEffect(() => {
    if (!token) {
      navigate('/admin/login');
      return;
    }
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    dispatch(fetchCompanyInfo());
    fetchInfo();
  }, [navigate, token]);

  // Sync form with Redux data
  useEffect(() => {
    if (company) {
      reset(company);
      setPreviewLogo(company.logo ? `${URL}${company.logo}` : null);
      setPreviewFavicon(company.favicon ? `${URL}${company.favicon}` : null);
      setPreviewVideo(company.video ? `${URL}${company.video}` : null);
    }
  }, [company, reset]);

  const fetchInfo = async () => {
    try {
      const { data } = await axios.get(`${URL}/api/admin/company-info`);
      reset(data);
      setPreviewLogo(data.logo ? `${URL}${data.logo}` : null);
      setPreviewFavicon(data.favicon ? `${URL}${data.favicon}` : null);
      setPreviewVideo(data.video ? `${URL}${data.video}` : null);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch company info. Please try again.');
    }
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 5 * 1024 * 1024) { // 5MB limit
      setError('Logo size must be less than 5MB');
      return;
    }
    setError('');
    setLogo(file);
    setPreviewLogo(file ? URL.createObjectURL(file) : null);
  };

  const handleFaviconChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 1 * 1024 * 1024) { // 1MB limit
      setError('Favicon size must be less than 1MB');
      return;
    }
    setError('');
    setFavicon(file);
    setPreviewFavicon(file ? URL.createObjectURL(file) : null);
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 50 * 1024 * 1024) { // 50MB limit for video
      setError('Video size must be less than 50MB');
      return;
    }
    if (file && !file.type.startsWith('video/')) {
      setError('Please select a valid video file (MP4, WebM)');
      return;
    }
    setError('');
    setVideo(file);
    setPreviewVideo(file ? URL.createObjectURL(file) : null);
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

  const handleRemoveVideo = () => {
    setVideo(null);
    setPreviewVideo(null);
    document.getElementById('videoInput').value = '';
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
    if (video) formData.append('video', video);

    try {
      const response = await axios.put(`${URL}/api/admin/company-info`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setSuccess('Company info updated successfully!');
      // Dispatch to Redux to update state
      dispatch(setCompany(response.data));
      await fetchInfo(); // Refresh data
      setLogo(null);
      setFavicon(null);
      setVideo(null);
      document.getElementById('logoInput').value = '';
      document.getElementById('faviconInput').value = '';
      document.getElementById('videoInput').value = '';
      setTimeout(() => setSuccess(''), 5000); // Auto-hide success
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to update company info. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Framer Motion variants
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, staggerChildren: 0.1, ease: 'easeOut' },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: 'easeOut' } },
    hover: { scale: 1.02, transition: { duration: 0.2 } },
  };

  const messageVariants = {
    hidden: { opacity: 0, y: -20, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -20, scale: 0.95, transition: { duration: 0.2 } },
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-1 sm:p-2 lg:p-2"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Breadcrumbs */}
      <motion.nav className="flex items-center mb-2 text-sm" variants={itemVariants}>
        <Link
          to="/admin/dashboard"
          className="flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200"
          aria-label="Back to dashboard"
        >
          <FiArrowLeft className="mr-2" />
          Dashboard
        </Link>
        <span className="mx-2 text-gray-400">/</span>
        <span className="text-gray-700 font-medium">Company Info</span>
      </motion.nav>
      <div className="max-w-4xl ">


        {/* Header */}
        <motion.div className=" mb-8" variants={itemVariants}>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2 tracking-tight">
            Company Information
          </h1>
          <p className="text-gray-600 max-w-md ">
            Update your company's details, logo, favicon, and landing video to reflect your brand.
          </p>
        </motion.div>

        {/* Success/Error Messages */}
        <AnimatePresence>
          {error && (
            <motion.div
              className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-lg mb-6 flex items-center shadow-md"
              variants={messageVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <FiAlertCircle className="mr-3 text-xl flex-shrink-0" />
              <div>
                <p className="font-medium">{error}</p>
              </div>
            </motion.div>
          )}
          {success && (
            <motion.div
              className="bg-green-50 border-l-4 border-green-500 text-green-700 p-4 rounded-lg mb-6 flex items-center shadow-md"
              variants={messageVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <FiCheckCircle className="mr-3 text-xl flex-shrink-0" />
              <div>
                <p className="font-medium">{success}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Form Card */}
        <motion.form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Basic Info Section */}
          <motion.div
            className="p-6 sm:p-8 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-100"
            variants={itemVariants}
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <BsBuildings className="mr-2 text-blue-600" />
              Basic Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Company Name <span className="text-red-500">*</span>
                </label>
                <input
                  {...register('name', { required: 'Company name is required' })}
                  placeholder="Enter your company name"
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                {errors.name && <p className="text-red-500 text-xs mt-1 flex items-center"><FiAlertCircle className="mr-1" />{errors.name.message}</p>}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Email <span className="text-red-500">*</span></label>
                <input
                  {...register('email', {
                    required: 'Email is required',
                    pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' },
                  })}
                  type="email"
                  placeholder="company@domain.com"
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1 flex items-center"><FiAlertCircle className="mr-1" />{errors.email.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  <FiMapPin className="inline mr-1" />
                  Address
                </label>
                <input
                  {...register('address')}
                  placeholder="Street address"
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">City</label>
                <input
                  {...register('city')}
                  placeholder="City"
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">State</label>
                <input
                  {...register('state')}
                  placeholder="State/Province"
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  <FiPhone className="inline mr-1" />
                  Phone
                </label>
                <input
                  {...register('phone')}
                  placeholder="Phone number"
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700">Zip Code</label>
                <input
                  {...register('zipcode')}
                  placeholder="Zip/Postal Code"
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
            </div>
          </motion.div>

          {/* About Section */}
          <motion.div className="p-6 sm:p-8" variants={itemVariants}>
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <FiEdit3 className="mr-2 text-indigo-600" />
              About Your Company
            </h2>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                <FiMail className="inline mr-1" />
                Description
              </label>
              <textarea
                {...register('about')}
                placeholder="Tell us about your company in 2-3 sentences..."
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none"
                rows="4"
              />
            </div>
          </motion.div>

          {/* Branding Section */}
          <motion.div className="p-6 sm:p-8 bg-gradient-to-r from-indigo-50 to-purple-50 border-t border-gray-100" variants={itemVariants}>
            <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
              <FiImage className="mr-2 text-purple-600" />
              Branding Assets
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Logo */}
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-700 flex items-center">
                  <FiUpload className="mr-2" />
                  Company Logo
                </label>
                <input
                  id="logoInput"
                  type="file"
                  onChange={handleLogoChange}
                  className="w-full border border-gray-300 rounded-lg p-3 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 transition-colors"
                  accept="image/*"
                  aria-label="Upload company logo (JPG, PNG, max 5MB)"
                />
                {previewLogo && (
                  <div className="relative group">
                    <motion.img
                      src={previewLogo}
                      alt="Logo Preview"
                      className="w-32 h-32 object-contain rounded-lg border-2 border-gray-200 shadow-md cursor-pointer group-hover:shadow-xl transition-shadow"
                      whileHover={{ scale: 1.05 }}
                      aria-label="Logo preview"
                    />
                    <motion.button
                      type="button"
                      onClick={handleRemoveLogo}
                      className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full hover:bg-red-600 shadow-sm"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      aria-label="Remove logo"
                    >
                      ×
                    </motion.button>
                  </div>
                )}
                {logo && <p className="text-xs text-gray-500">Selected: {logo.name}</p>}
              </div>

              {/* Favicon */}
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-700 flex items-center">
                  <FiImage className="mr-2" />
                  Favicon (Icon)
                </label>
                <input
                  id="faviconInput"
                  type="file"
                  onChange={handleFaviconChange}
                  className="w-full border border-gray-300 rounded-lg p-3 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100 transition-colors"
                  accept="image/*"
                  aria-label="Upload favicon (ICO, PNG, max 1MB)"
                />
                {previewFavicon && (
                  <div className="relative group">
                    <motion.img
                      src={previewFavicon}
                      alt="Favicon Preview"
                      className="w-16 h-16 object-contain rounded-lg border-2 border-gray-200 shadow-md cursor-pointer group-hover:shadow-xl transition-shadow"
                      whileHover={{ scale: 1.05 }}
                      aria-label="Favicon preview"
                    />
                    <motion.button
                      type="button"
                      onClick={handleRemoveFavicon}
                      className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full hover:bg-red-600 shadow-sm"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      aria-label="Remove favicon"
                    >
                      ×
                    </motion.button>
                  </div>
                )}
                {favicon && <p className="text-xs text-gray-500">Selected: {favicon.name}</p>}
              </div>

              {/* Video */}
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-700 flex items-center">
                  <FiVideo className="mr-2" />
                  Landing Video
                </label>
                <input
                  id="videoInput"
                  type="file"
                  onChange={handleVideoChange}
                  className="w-full border border-gray-300 rounded-lg p-3 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100 transition-colors"
                  accept="video/*"
                  aria-label="Upload landing video (MP4, WebM, max 50MB)"
                />
                {previewVideo && (
                  <div className="relative group">
                    <video
                      src={previewVideo}
                      controls
                      className="w-full max-w-xs h-32 object-cover rounded-lg border-2 border-gray-200 shadow-md cursor-pointer"
                      aria-label="Video preview"
                    >
                      Your browser does not support the video tag.
                    </video>
                    <motion.button
                      type="button"
                      onClick={handleRemoveVideo}
                      className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full hover:bg-red-600 shadow-sm"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      aria-label="Remove video"
                    >
                      ×
                    </motion.button>
                  </div>
                )}
                {video && <p className="text-xs text-gray-500">Selected: {video.name}</p>}
              </div>
            </div>
          </motion.div>

          {/* Submit Section */}
          <motion.div className="p-6 sm:p-8 border-t border-gray-100 bg-gray-50 flex justify-end space-x-3" variants={itemVariants}>
            <Link
              to="/admin/dashboard"
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-3 rounded-lg transition-colors flex items-center font-medium"
              aria-label="Cancel and return to dashboard"
            >
              <FiArrowLeft className="mr-2" />
              Cancel
            </Link>
            <motion.button
              type="submit"
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-3 rounded-lg transition-all flex items-center font-semibold shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isLoading}
              aria-label="Update company information"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12c0-4.418 3.582-8 8-8a7.962 7.962 0 014.291 2z"></path>
                  </svg>
                  Updating...
                </>
              ) : (
                <>
                  <FiCheckCircle className="mr-2" />
                  Update Company
                </>
              )}
            </motion.button>
          </motion.div>
        </motion.form>
      </div>
    </motion.div>
  );
}