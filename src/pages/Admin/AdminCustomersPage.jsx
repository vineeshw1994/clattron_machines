import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FiSearch, FiDownload, FiCalendar, FiArrowLeft, FiUser, FiMail, FiPhone, FiMessageSquare, FiEye, FiAlertCircle } from 'react-icons/fi';
import { useSelector } from 'react-redux';

const URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function AdminCustomersPage() {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.user);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [downloadLoading, setDownloadLoading] = useState(false);
  const { register, handleSubmit } = useForm();
  const [_success, setSuccess] = useState('');

  const limit = 10;

  const fetchCustomers = async (page = 1, query = '', from = '', to = '') => {
    setLoading(true);
    setError('');
    try {
      const params = new URLSearchParams({
        page,
        limit,
        ...(query && { search: query }),
        ...(from && { fromDate: from }),
        ...(to && { toDate: to }),
      });
      const { data } = await axios.get(`${URL}/api/admin/customers?${params}`);
      setCustomers(data.customers);
      setTotalPages(data.totalPages);
      setCurrentPage(page);
    } catch (err) {
      setError('Failed to fetch customers');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate('/admin/login');
      return;
    }

    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    fetchCustomers(1);
  }, [navigate, token]);

  const handleSearch = (formData) => {
    setSearchQuery(formData.search);
    setDateFrom(formData.dateFrom);
    setDateTo(formData.dateTo);
    fetchCustomers(1, formData.search, formData.dateFrom, formData.dateTo);
  };

  const handleDownload = async () => {
    setDownloadLoading(true);
    try {
      const params = new URLSearchParams({
        ...(dateFrom && { fromDate: dateFrom }),
        ...(dateTo && { toDate: dateTo }),
      });
      const response = await axios.get(`${URL}/api/admin/customers/export?${params}`, {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `customers_${dateFrom || ''}_to_${dateTo || ''}.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      setSuccess('Excel downloaded successfully!');
    } catch (err) {
      setError('Failed to download Excel');
    } finally {
      setDownloadLoading(false);
    }
  };

  const handlePageChange = (page) => {
    fetchCustomers(page, searchQuery, dateFrom, dateTo);
  };

  // Framer Motion variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <motion.div
      className="min-h-screen bg-gray-100 p-2 lg:p-2 sm:p-2"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumbs */}
        <motion.nav className="flex items-center mb-6 text-sm" variants={itemVariants}>
          <Link
            to="/admin/dashboard"
            className="flex items-center text-blue-600 hover:text-blue-800"
          >
            <FiArrowLeft className="mr-2" />
            Dashboard
          </Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-700 font-medium">Customers</span>
        </motion.nav>

        <div className="max-w-7xl">
          {/* Header */}
          <motion.div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8" variants={itemVariants}>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Customers</h1>
              <p className="text-gray-600">Manage and view customer inquiries</p>
            </div>
            <motion.button
              onClick={handleDownload}
              className="mt-4 lg:mt-0 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center"
              whileHover={{ scale: 1.05 }}
              disabled={downloadLoading}
            >
              <FiDownload className="mr-2" />
              {downloadLoading ? 'Downloading...' : 'Download Excel'}
            </motion.button>
          </motion.div>

          {/* Search & Filter Form */}
          <motion.form onSubmit={handleSubmit(handleSearch)} className="bg-white p-4 rounded-lg shadow-md mb-6" variants={itemVariants}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                  <FiSearch className="mr-1" />
                  Search (Name/Email/Phone)
                </label>
                <input
                  {...register('search')}
                  placeholder="Search customers..."
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                  <FiCalendar className="mr-1" />
                  From Date
                </label>
                <input
                  type="date"
                  {...register('dateFrom')}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex items-end space-x-2">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                    <FiCalendar className="mr-1" />
                    To Date
                  </label>
                  <input
                    type="date"
                    {...register('dateTo')}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Filter
                </button>
              </div>
            </div>
          </motion.form>

          {/* Success/Error Messages */}
          {error && (
            <motion.div
              className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-lg mb-6 flex items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <FiAlertCircle className="mr-2" />
              {error}
            </motion.div>
          )}

          {/* Customers Content */}
          {loading ? (
            <motion.div className="text-center py-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
              <p>Loading customers...</p>
            </motion.div>
          ) : (
            <>
              {/* Mobile: Cards Layout */}
              <div className="block md:hidden grid grid-cols-1 gap-4 mb-6">
                {customers?.map((customer) => (
                  <motion.div
                    key={customer._id}
                    className="bg-white rounded-lg shadow-md p-4 border border-gray-200"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-start space-x-3 mb-3">
                      <div className="flex-shrink-0">
                        <FiUser className="text-2xl text-blue-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-semibold text-gray-900 capitalize">{customer.name}</h4>
                        <p className="text-xs text-gray-500 mt-1">{customer.email}</p>
                        <p className="text-xs text-gray-500 mt-1">{customer.phone}</p>
                      </div>
                    </div>
                    <p className="text-xs text-gray-600 mb-3 line-clamp-2">{customer.message}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{new Date(customer.createdAt).toLocaleDateString()}</span>
                      <a
                        href={`tel:+91${customer.phone.replace(/[\s-]/g, '')}`}
                        className="text-green-600 hover:text-green-800 font-medium flex items-center"
                      >
                        <FiPhone className="mr-1" />
                        Call
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Desktop: Table Layout */}
              <div className="hidden md:block">
                <motion.div className="bg-white rounded-lg shadow-md overflow-hidden" variants={itemVariants}>
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {customers?.map((customer) => (
                        <motion.tr key={customer._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 capitalize">{customer.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.email}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.phone}</td>
                          <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate capitalize">{customer.message}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(customer.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <a
                              href={`tel:+91${customer.phone.replace(/[\s-]/g, '')}`}
                              className="text-green-600 hover:text-green-900 mr-3 inline-flex items-center"
                              aria-label={`Call ${customer.name}`}
                            >
                              <FiPhone size={16} />
                            </a>
                            <button className="text-indigo-600 hover:text-indigo-900">
                              <FiEye size={16} />
                            </button>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </motion.div>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <motion.div className="flex justify-center mt-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="px-3 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed bg-gray-200 text-gray-700 hover:bg-gray-300"
                    >
                      Previous
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-3 py-2 rounded ${currentPage === page ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                      >
                        {page}
                      </button>
                    ))}
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="px-3 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed bg-gray-200 text-gray-700 hover:bg-gray-300"
                    >
                      Next
                    </button>
                  </div>
                </motion.div>
              )}
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}