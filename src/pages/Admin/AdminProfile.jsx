import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { FiCheckCircle, FiAlertCircle, FiArrowLeft, FiEdit3, FiUser, FiMail, FiPhone, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';

const URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function AdminProfilePage() {
  const { token, userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { register, handleSubmit, reset, formState: { errors }, getValues } = useForm({
    defaultValues: {
      name: '',
      email: '',
      mobile: '',
      username: '',
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
  });

  // Check authentication and fetch admin profile
  useEffect(() => {
    if (!token) {
      navigate('/admin/login');
      return;
    }
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    fetchProfile();
  }, [navigate, token]);

  const fetchProfile = async () => {
    try {
      const { data } = await axios.get(`${URL}/api/admin/profile`);
      reset(data);
    } catch (err) {
      console.error(err);
      // setError('Failed to fetch profile. Please try again.');
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to fetch profile. Please try again.',
        timer: 3000,
        showConfirmButton: false,
      });
    }
  };

  const onSubmit = async (data) => {
    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      // Separate password update if new password is provided
      if (data.newPassword) {
        if (data.newPassword !== data.confirmNewPassword) {
          // setError('New passwords do not match');
          Swal.fire({
            icon: 'warning',
            title: 'Mismatch!',
            text: 'New passwords do not match',
            timer: 3000,
            showConfirmButton: false,
          });
          setIsLoading(false);
          return;
        }
        await axios.put(`${URL}/api/admin/profile/password`, {
          currentPassword: data.currentPassword,
          newPassword: data.newPassword,
        });
        // Clear password fields
        reset((values) => ({
          ...values,
          currentPassword: '',
          newPassword: '',
          confirmNewPassword: '',
        }));
        // setSuccess('Password updated successfully!');
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Password updated successfully!',
          timer: 2000,
          showConfirmButton: false,
        });
      }

      // Update profile info if changed
      const updateData = {
        name: data.name || undefined,
        email: data.email || undefined,
        mobile: data.mobile || undefined,
        username: data.username || undefined,
      };

      if (Object.values(updateData).some(val => val !== undefined)) {
        const profileResponse = await axios.put(`${URL}/api/admin/profile`, updateData);

        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Profile updated successfully!',
          timer: 2000,
          showConfirmButton: false,
        });
        // Update Redux with new profile data (excludes password)
        await fetchProfile();
      }

    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: err.response?.data?.message || 'Failed to update profile. Please try again.',
        timer: 3000,
        showConfirmButton: false,
      });
      // setError(err.response?.data?.message || 'Failed to update profile. Please try again.');
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
      className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-1 sm:p-1 lg:p-1"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Breadcrumbs */}
      <motion.nav className="flex items-center mb-4 text-sm" variants={itemVariants}>
        <Link
          to="/admin/dashboard"
          className="flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200"
          aria-label="Back to dashboard"
        >
          <FiArrowLeft className="mr-2" />
          Dashboard
        </Link>
        <span className="mx-2 text-gray-400">/</span>
        <span className="text-gray-700 font-medium">Profile</span>
      </motion.nav>
      <div className="max-w-2xl mx-auto">


        {/* Header */}
        <motion.div className="text-center mb-8" variants={itemVariants}>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2 tracking-tight">
            Admin Profile
          </h1>
          <p className="text-gray-600 max-w-md mx-auto">
            Update your personal information and change your password securely.
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
          {/* Profile Info Section */}
          <motion.div
            className="p-6 sm:p-8 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-100"
            variants={itemVariants}
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <FiUser className="mr-2 text-blue-600" />
              Personal Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Full Name
                </label>
                <input
                  {...register('name')}
                  placeholder="Enter your full name"
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Username <span className="text-red-500">*</span>
                </label>
                <input
                  {...register('username', { required: 'Username is required' })}
                  placeholder="Enter username"
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                {errors.username && <p className="text-red-500 text-xs mt-1 flex items-center"><FiAlertCircle className="mr-1" />{errors.username.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  <FiMail className="inline mr-1" />
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  {...register('email', {
                    required: 'Email is required',
                    pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' },
                  })}
                  type="email"
                  placeholder="your.email@example.com"
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1 flex items-center"><FiAlertCircle className="mr-1" />{errors.email.message}</p>}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  <FiPhone className="inline mr-1" />
                  Mobile
                </label>
                <input
                  {...register('mobile')}
                  placeholder="Enter mobile number"
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
            </div>
          </motion.div>

          {/* Password Section */}
          <motion.div className="p-6 sm:p-8 bg-gradient-to-r from-indigo-50 to-purple-50 border-t border-gray-100" variants={itemVariants}>
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <FiLock className="mr-2 text-purple-600" />
              Change Password
            </h2>
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2 relative">
                <label className="block text-sm font-semibold text-gray-700">Current Password</label>
                <input
                  {...register('currentPassword')}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter current password"
                  className="w-full border border-gray-300 rounded-lg p-3 pr-10 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-[3.25rem] text-gray-500 hover:text-gray-700 transition-colors"
                  aria-label="Toggle current password visibility"
                >
                  {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </button>
              </div>

              <div className="space-y-2 relative">
                <label className="block text-sm font-semibold text-gray-700">New Password</label>
                <input
                  {...register('newPassword', {
                    minLength: { value: 6, message: 'Password must be at least 6 characters' },
                  })}
                  type={showNewPassword ? 'text' : 'password'}
                  placeholder="Enter new password"
                  className="w-full border border-gray-300 rounded-lg p-3 pr-10 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-[3.25rem] text-gray-500 hover:text-gray-700 transition-colors"
                  aria-label="Toggle new password visibility"
                >
                  {showNewPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </button>
                {errors.newPassword && <p className="text-red-500 text-xs mt-1 flex items-center"><FiAlertCircle className="mr-1" />{errors.newPassword.message}</p>}
              </div>

              <div className="space-y-2 relative">
                <label className="block text-sm font-semibold text-gray-700">Confirm New Password</label>
                <input
                  {...register('confirmNewPassword', {
                    validate: value => value === getValues('newPassword') || 'Passwords do not match',
                  })}
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm new password"
                  className="w-full border border-gray-300 rounded-lg p-3 pr-10 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-[3.25rem] text-gray-500 hover:text-gray-700 transition-colors"
                  aria-label="Toggle confirm password visibility"
                >
                  {showConfirmPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </button>
                {errors.confirmNewPassword && <p className="text-red-500 text-xs mt-1 flex items-center"><FiAlertCircle className="mr-1" />{errors.confirmNewPassword.message}</p>}
              </div>
            </div>
          </motion.div>

          {/* Submit Section */}
          <motion.div className="p-6 sm:p-4 border-t border-gray-100 bg-gray-50 flex justify-end space-x-3" variants={itemVariants}>
            <Link
              to="/admin/dashboard"
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-3 sm:py-1 md:py2 rounded-lg transition-colors flex items-center font-medium"
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
              aria-label="Update admin profile"
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
                  Update Profile
                </>
              )}
            </motion.button>
          </motion.div>
        </motion.form>
      </div>
    </motion.div>
  );
}