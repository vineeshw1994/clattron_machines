import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FiArrowLeft } from 'react-icons/fi';
import { useSelector } from 'react-redux';
const URL = import.meta.env.VITE_API_URL


export default function Products() {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.user);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const productsPerPage = 10;


  useEffect(() => {
    if (!token) {
      navigate('/admin/login');
      return;
    }

    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    fetchProducts();
  }, [navigate, token]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(`${URL}/api/admin/products`);
      setProducts(data);
    } catch (err) {
      console.error('Error fetching products:', err);
    }
  };

  const handleEdit = (id) => {
    navigate(`/admin/products/edit/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${URL}/api/admin/products/${id}`);
      fetchProducts();
    } catch (err) {
      console.error('Error deleting product:', err);
    }
  };

  const handleToggleDisable = async (id, disabled) => {
    try {
      await axios.patch(`${URL}/api/admin/products/${id}/toggle-disable`, { disabled: !disabled });
      fetchProducts();
    } catch (err) {
      console.error('Error toggling product status:', err);
    }
  };

  const handleToggleFeatured = async (id, featured) => {
    try {
      await axios.patch(`${URL}/api/admin/products/${id}/toggle-featured`, { featured: !featured });
      fetchProducts();
    } catch (err) {
      console.error('Error toggling product featured:', err);
    }
  };

  const handleToggleExplored = async (id, explored) => {
    try {
      await axios.patch(`${URL}/api/admin/products/${id}/toggle-explored`, { explored: !explored });
      fetchProducts();
    } catch (err) {
      console.error('Error toggling product featured:', err);
    }
  };

  // Search and Pagination
  const filteredProducts = products?.filter(prod =>
    prod.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  // Framer Motion variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    hover: { scale: 1.02, transition: { duration: 0.2 } },
  };

  return (
    <motion.div
      className="bg-[#f5f5f5] p-2 sm:p-4 lg:p-6 min-h-screen"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
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
        <span className="text-gray-700 font-medium">Products</span>
      </motion.nav>
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-3 sm:gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Manage Products</h1>
          <div className="flex flex-col sm:flex-row w-full sm:w-auto space-y-2 sm:space-y-0 sm:space-x-4">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search products..."
              className="border border-gray-300 rounded-lg p-2 w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <motion.button
              onClick={() => navigate('/admin/products/add')}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 w-full sm:w-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Add Product
            </motion.button>
          </div>
        </div>

        {/* Products List */}
        {filteredProducts.length === 0 ? (
          <motion.div
            className="bg-white p-4 sm:p-6 rounded-lg shadow-md border border-gray-200 text-center"
            variants={itemVariants}
          >
            <p className="text-gray-600">No products found.</p>
          </motion.div>
        ) : (
          <>
            {/* Mobile/Medium: Cards Layout */}
            {isMobile ? (
              <div className="grid grid-cols-1 gap-4" variants={itemVariants}>
                {paginatedProducts?.map(prod => (
                  <motion.div
                    key={prod._id}
                    className="bg-white p-4 sm:p-6 rounded-lg shadow-md border border-gray-200"
                    variants={itemVariants}
                    whileHover="hover"
                  >
                    <div className="flex items-start space-x-3 mb-3">
                      {prod.image ? (
                        <img src={`${URL}${prod?.image}`} alt={prod?.name} className="w-16 h-16 object-cover rounded flex-shrink-0" />
                      ) : (
                        <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center flex-shrink-0">
                          <span className="text-gray-500 text-xs">No Image</span>
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-semibold text-gray-900 mb-1 truncate">{prod.name}</h3>
                        <p className="text-xs text-gray-500 mb-2 line-clamp-2">{prod.description}</p>
                        <p className="text-xs text-gray-600 mb-2">Category: {prod.category?.name || 'Uncategorized'}</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      {/* Checkboxes – Stacked on mobile, row on sm+ */}
                      <div className="flex flex-col sm:flex-row sm:space-x-6 sm:space-y-0 space-y-2 justify-between">
                        <label className="flex items-center space-x-2 text-xs sm:text-sm">
                          <span className="text-gray-700 font-medium">Featured:</span>
                          <input
                            type="checkbox"
                            checked={prod.featured || false}
                            onChange={() => handleToggleFeatured(prod._id, prod.featured)}
                            className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                        </label>
                        <label className="flex items-center space-x-2 text-xs sm:text-sm">
                          <span className="text-gray-700 font-medium">Explored:</span>
                          <input
                            type="checkbox"
                            checked={prod.explored || false}
                            onChange={() => handleToggleExplored(prod._id, prod.explored)}
                            className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                        </label>
                      </div>
                      {/* Actions – Always row, tight spacing */}
                      <div className="flex flex-wrap items-center justify-between gap-1 sm:gap-2 pt-1">
                        <div className="flex flex-wrap gap-1 sm:gap-2">
                          <button
                            onClick={() => handleEdit(prod._id)}
                            className="text-blue-600 hover:text-blue-800 text-xs sm:text-sm px-2 py-1 rounded border border-blue-300 hover:bg-blue-50 transition-colors"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleToggleDisable(prod._id, prod.disabled)}
                            className={`text-xs sm:text-sm px-2 py-1 rounded border ${prod.disabled ? 'text-green-600 border-green-300 hover:bg-green-50' : 'text-yellow-600 border-yellow-300 hover:bg-yellow-50'} hover:text-current transition-colors`}
                          >
                            {prod.disabled ? 'Enable' : 'Disable'}
                          </button>
                          <button
                            onClick={() => handleDelete(prod._id)}
                            className="text-red-600 hover:text-red-800 text-xs sm:text-sm px-2 py-1 rounded border border-red-300 hover:bg-red-50 transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              /* Desktop: Table Layout */
              <motion.div className="overflow-x-auto" variants={itemVariants}>
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Featured</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Explored</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {paginatedProducts.map(prod => (
                      <motion.tr key={prod._id} variants={itemVariants} whileHover="hover">
                        <td className="px-6 py-4 whitespace-nowrap">
                          {prod.image ? (
                            <img src={`http://localhost:5000${prod.image}`} alt={prod.name} className="w-12 h-12 object-cover rounded" />
                          ) : (
                            <span className="text-gray-500">No Image</span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 capitalize">{prod.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">{prod.category?.name || 'Uncategorized'}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <input
                            type="checkbox"
                            checked={prod.featured || false}
                            onChange={() => handleToggleFeatured(prod._id, prod.featured)}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <input
                            type="checkbox"
                            checked={prod.explored || false}
                            onChange={() => handleToggleExplored(prod._id, prod.explored)}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => handleEdit(prod._id)}
                            className="text-blue-600 hover:text-blue-800 mr-4"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleToggleDisable(prod._id, prod.disabled)}
                            className={`mr-4 ${prod.disabled ? 'text-green-600 hover:text-green-800' : 'text-yellow-600 hover:text-yellow-800'}`}
                          >
                            {prod.disabled ? 'Enable' : 'Disable'}
                          </button>
                          <button
                            onClick={() => handleDelete(prod._id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            Delete
                          </button>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </motion.div>
            )}
          </>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-4 sm:mt-6 space-x-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 sm:px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50 text-sm"
            >
              Previous
            </button>
            <span className="px-3 sm:px-4 py-2 text-gray-700 text-sm self-center">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 sm:px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50 text-sm"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}