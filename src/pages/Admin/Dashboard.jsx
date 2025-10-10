import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../store/slices/userSlice';
import { clearCompany } from '../../store/slices/companySlice';
const URL = import.meta.env.VITE_API_URL

export default function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo, token } = useSelector((state) => state.user);
  const [stats, setStats] = useState({
    categories: 0,
    products: 0,
    companyInfo: 'Not Set',
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [categoriesRes, productsRes] = await Promise.all([
          axios.get(`${URL}/api/admin/categories`),
          axios.get(`${URL}/api/admin/products`),
          // axios.get(`${URL}/api/admin/company-info),
        ]);
        setStats({
          categories: categoriesRes.data.length,
          products: productsRes.data.length,
          // companyInfo: companyInfoRes.data.name ? 'Updated' : 'Not Set',
        });
      } catch (err) {
        console.error('Error fetching stats:', err);
      }
    };
    fetchStats();
  }, []);

  // Framer Motion variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, staggerChildren: 0.1 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
    hover: { scale: 1.03, boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)', transition: { duration: 0.2 } },
  };

  return (
    <motion.div
      className="bg-[#f5f5f5] p-2 sm:p-4 lg:p-6 min-h-screen"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-7xl mx-auto">
        {/* Welcome Section */}
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg mb-4 sm:mb-6 border border-gray-200 bg-gradient-to-br from-gray-50 to-gray-100">
          <div className="flex flex-col sm:flex-row items-start sm:items-center mb-3 sm:mb-4 gap-3 sm:gap-0">
            <img
              src="https://vineeshw1994.github.io/machines-site/logo.png"
              alt="Clattron Machines Logo"
              className="w-10 h-10 sm:w-12 sm:h-12 object-contain flex-shrink-0"
            />
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 leading-tight">
              Welcome to Clattron Pvt Limited Admin
            </h1>
          </div>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            Manage your categories, products, and company information using the sidebar navigation.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
          <motion.div
            className="bg-blue-100 p-4 sm:p-6 rounded-lg shadow-md border border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100"
            variants={cardVariants}
            whileHover="hover"
            onClick={() => navigate('/admin/categories')}
          >
            <h2 className="text-lg sm:text-xl font-semibold text-blue-800">Categories</h2>
            <p className="text-2xl sm:text-3xl font-bold text-blue-900">{stats.categories}</p>
          </motion.div>
          <motion.div
            className="bg-green-100 p-4 sm:p-6 rounded-lg shadow-md border border-green-200 bg-gradient-to-br from-green-50 to-green-100"
            variants={cardVariants}
            whileHover="hover"
            onClick={() => navigate('/admin/products')}
          >
            <h2 className="text-lg sm:text-xl font-semibold text-green-800">Products</h2>
            <p className="text-2xl sm:text-3xl font-bold text-green-900">{stats.products}</p>
          </motion.div>
          {/* Placeholder for third card if needed, or remove grid-cols-3 and keep md:grid-cols-2 */}
          <motion.div
            className="hidden lg:block bg-purple-100 p-4 sm:p-6 rounded-lg shadow-md border border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100"
            variants={cardVariants}
            whileHover="hover"
          >
            <h2 className="text-lg sm:text-xl font-semibold text-purple-800">Company Info</h2>
            <p className="text-2xl sm:text-3xl font-bold text-purple-900">{stats.companyInfo}</p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}