import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
const URL = import.meta.env.VITE_API_URL

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: { name: '', description: '' },
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get(`${URL}/api/admin/categories`);
      setCategories(data);
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  const onSubmit = async (data) => {
    try {
      if (editId) {
        await axios.put(`${URL}/api/admin/categories/${editId}`, data);
      } else {
        await axios.post(`${URL}/api/admin/categories`, data);
      }
      fetchCategories();
      setIsModalOpen(false);
      setEditId(null);
      reset();
    } catch (err) {
      console.error('Error saving category:', err);
    }
  };

  const handleEdit = (cat) => {
    reset({ name: cat.name, description: cat.description });
    setEditId(cat._id);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${URL}/api/admin/categories/${id}`);
      fetchCategories();
    } catch (err) {
      console.error('Error deleting category:', err);
    }
  };

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

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } },
  };

  return (
    <motion.div
      className="bg-[#f5f5f5] p-2 sm:p-4 lg:p-6 min-h-screen"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-3 sm:gap-0">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Manage Categories</h1>
          <motion.button
            onClick={() => {
              reset();
              setEditId(null);
              setIsModalOpen(true);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 w-full sm:w-auto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Add Category
          </motion.button>
        </div>

        {/* Categories List */}
        {categories.length === 0 ? (
          <motion.div
            className="bg-white p-4 sm:p-6 rounded-lg shadow-md border border-gray-200 text-center"
            variants={itemVariants}
          >
            <p className="text-gray-600 text-sm sm:text-base">No categories found.</p>
          </motion.div>
        ) : (
          <>
            {/* Mobile/Medium: Cards Layout */}
            {isMobile ? (
              <div className="grid grid-cols-1 gap-3 sm:gap-4" variants={itemVariants}>
                {categories?.map(cat => (
                  <motion.div
                    key={cat._id}
                    className="bg-white p-4 sm:p-6 rounded-lg shadow-md border border-gray-200"
                    variants={itemVariants}
                    whileHover="hover"
                  >
                    <div className="space-y-2 mb-3">
                      <h3 className="text-sm font-semibold text-gray-900">{cat.name}</h3>
                      <p className="text-xs text-gray-500 line-clamp-3">{cat.description}</p>
                    </div>
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => handleEdit(cat)}
                        className="text-blue-600 hover:text-blue-800 text-sm px-2 py-1 rounded"
                      >
                        Edit
                      </button>
                      {/* <button
                        onClick={() => handleDelete(cat._id)}
                        className="text-red-600 hover:text-red-800 text-sm px-2 py-1 rounded"
                      >
                        Delete
                      </button> */}
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
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {categories?.map(cat => (
                      <motion.tr key={cat._id} variants={itemVariants} whileHover="hover">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{cat.name}</td>
                        <td className="px-6 py-4 text-sm text-gray-500 max-w-md line-clamp-2">{cat.description}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => handleEdit(cat)}
                            className="text-blue-600 hover:text-blue-800 mr-4"
                          >
                            Edit
                          </button>
                          {/* <button
                            onClick={() => handleDelete(cat._id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            Delete
                          </button> */}
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </motion.div>
            )}
          </>
        )}

        {/* Modal for Add/Edit Category */}
        <AnimatePresence>
          {isModalOpen && (
            <motion.div
              className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50 p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-white p-4 sm:p-6 rounded-xl shadow-2xl border border-gray-200 w-full max-w-md max-h-[90vh] overflow-y-auto bg-gradient-to-br from-gray-50 to-gray-100"
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">{editId ? 'Edit Category' : 'Add Category'}</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 sm:space-y-4">
                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700">Category Name</label>
                    <input
                      {...register('name', { required: 'Category name is required' })}
                      placeholder="Category Name"
                      className="block w-full border border-gray-300 rounded-lg p-2 sm:p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.name && <p className="text-red-500 text-xs sm:text-sm">{errors.name.message}</p>}
                  </div>
                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                      {...register('description', { required: 'Description is required' })}
                      placeholder="Description"
                      className="block w-full border border-gray-300 rounded-lg p-2 sm:p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows="3"
                    />
                    {errors.description && <p className="text-red-500 text-xs sm:text-sm">{errors.description.message}</p>}
                  </div>
                  <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-2 pt-2 sm:pt-4">
                    <button
                      type="button"
                      onClick={() => {
                        setIsModalOpen(false);
                        reset();
                        setEditId(null);
                      }}
                      className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 w-full sm:w-auto"
                    >
                      Cancel
                    </button>
                    <motion.button
                      type="submit"
                      className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 w-full sm:w-auto"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {editId ? 'Update' : 'Create'}
                    </motion.button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}