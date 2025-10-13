import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useForm, useFieldArray } from 'react-hook-form';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowLeft, FiAlertCircle } from 'react-icons/fi';
import { useSelector } from 'react-redux';

const URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function ProductForm() {
  const { token } = useSelector((state) => state.user);
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, control, reset, setError: setFormError, clearErrors, formState: { errors } } = useForm({
    defaultValues: {
      name: '',
      description: '',
      category: '',
      specs: [{ key: '', value: '' }],
      image: null // For file validation
    },
  });
  const { fields, append, remove } = useFieldArray({ control, name: 'specs' });
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (!token) {
      navigate('/admin/login');
      return;
    }
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    fetchCategories();
    if (isEdit) {
      fetchProduct();
    }
  }, [id, token, navigate]);

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get(`${URL}/api/admin/categories`);
      setCategories(data);
    } catch (err) {
      console.error('Error fetching categories:', err);
      setError('Failed to load categories');
    }
  };

  const fetchProduct = async () => {
    try {
      const { data } = await axios.get(`${URL}/api/admin/products/${id}`);
      reset({
        name: data.name,
        description: data.description,
        category: data.category._id,
        specs: Object.entries(data.specs || {}).map(([key, value]) => ({ key, value })),
        image: null,
      });
      setPreviewImage(data.image ? `${URL}${data.image}` : null);
    } catch (err) {
      console.error('Error fetching product:', err);
      setError('Failed to load product');
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setFormError('image', { message: 'Image size must be less than 5MB' });
        setImage(null);
        setPreviewImage(null);
        return;
      }
      clearErrors('image');
      setImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreviewImage(null);
    clearErrors('image');
    document.getElementById('imageInput').value = '';
  };

  const onSubmit = async (data) => {
    setError('');
    setSuccess('');
    setIsLoading(true);

    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value) formData.append(key, value);
    });
    if (image) formData.append('image', image);

    try {
      if (isEdit) {
        await axios.put(`${URL}/api/admin/products/${id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      } else {
        await axios.post(`${URL}/api/admin/products`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }
      setSuccess(isEdit ? 'Product updated successfully!' : 'Product created successfully!');
      setTimeout(() => {
        navigate('/admin/products');
      }, 1500);
    } catch (err) {
      console.error('Error saving product:', err);
      setError(err.response?.data?.message || 'Failed to save product. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Framer Motion variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  const messageVariants = {
    hidden: { opacity: 0, y: -20, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -20, scale: 0.95, transition: { duration: 0.2 } },
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
          to="/admin/products"
          className="flex items-center text-blue-600 hover:text-blue-800"
        >
          <FiArrowLeft className="mr-2" />
          Product List
        </Link>
        <span className="mx-2 text-gray-400">/</span>
        <span className="text-gray-700 font-medium"> {isEdit ? 'Edit Product' : 'Add Product'}</span>
      </motion.nav>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-6">{isEdit ? 'Edit Product' : 'Add Product'}</h1>

        {/* Success/Error Messages */}
        <AnimatePresence>
          {error && (
            <motion.div
              className="bg-red-50 border-l-4 border-red-500 text-red-700 p-3 rounded-lg mb-4 flex items-center shadow-md text-sm"
              variants={messageVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <FiAlertCircle className="mr-2 text-lg flex-shrink-0" />
              <p className="font-medium">{error}</p>
            </motion.div>
          )}
          {success && (
            <motion.div
              className="bg-green-50 border-l-4 border-green-500 text-green-700 p-3 rounded-lg mb-4 flex items-center shadow-md text-sm"
              variants={messageVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <FiCheckCircle className="mr-2 text-lg flex-shrink-0" />
              <p className="font-medium">{success}</p>
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-3 sm:p-6 rounded-xl shadow-2xl border border-gray-200 bg-gradient-to-br from-gray-50 to-gray-100 space-y-3 sm:space-y-4">
          <motion.div variants={itemVariants} className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Product Name</label>
            <input
              {...register('name', { required: 'Name is required' })}
              placeholder="Product Name"
              className="block w-full border border-gray-300 rounded-lg p-2 sm:p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.name && <p className="text-red-500 text-xs sm:text-sm flex items-center"><FiAlertCircle className="mr-1" />{errors.name.message}</p>}
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <select
              {...register('category', { required: 'Category is required' })}
              className="block w-full border border-gray-300 rounded-lg p-2 sm:p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Category</option>
              {categories?.map(cat => (
                <option key={cat._id} value={cat._id}>{cat.name}</option>
              ))}
            </select>
            {errors.category && <p className="text-red-500 text-xs sm:text-sm flex items-center"><FiAlertCircle className="mr-1" />{errors.category.message}</p>}
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              {...register('description', { required: 'Description is required' })}
              placeholder="Description"
              className="block w-full border border-gray-300 rounded-lg p-2 sm:p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
            />
            {errors.description && <p className="text-red-500 text-xs sm:text-sm flex items-center"><FiAlertCircle className="mr-1" />{errors.description.message}</p>}
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Image</label>
            <input
              id="imageInput"
              type="file"
              onChange={handleImageChange}
              className="block w-full border border-gray-300 rounded-lg p-2 sm:p-3"
              accept="image/*"
            />
            {errors.image && <p className="text-red-500 text-xs sm:text-sm flex items-center"><FiAlertCircle className="mr-1" />{errors.image.message}</p>}
            {previewImage && (
              <div className="relative mt-2 sm:mt-4">
                <img
                  src={previewImage}
                  alt="Product Preview"
                  className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-lg"
                />
                <motion.button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute -top-1 -right-1 sm:top-0 sm:right-0 bg-red-500 text-white text-xs font-bold w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center rounded-full hover:bg-red-600"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  X
                </motion.button>
              </div>
            )}
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Product Specs</label>
            {fields.map((field, index) => (
              <div key={field.id} className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 mt-2">
                <input
                  {...register(`specs.${index}.key`, { required: 'Key is required' })}
                  placeholder="Key (e.g., Power)"
                  className="flex-1 border border-gray-300 rounded-lg p-2"
                />
                <input
                  {...register(`specs.${index}.value`, { required: 'Value is required' })}
                  placeholder="Value (e.g., 100W)"
                  className="flex-1 border border-gray-300 rounded-lg p-2"
                />
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 w-full sm:w-auto"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => append({ key: '', value: '' })}
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full sm:w-auto"
            >
              Add Spec
            </button>
            {errors.specs && <p className="text-red-500 text-xs sm:text-sm">Specs are required</p>}
          </motion.div>

          <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-2 pt-4">
            <Link to="/admin/products" className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 text-center w-full sm:w-auto">
              Cancel
            </Link>
            <motion.button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 w-full sm:w-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={isLoading}
            >
              {isEdit ? 'Update Product' : 'Create Product'}
            </motion.button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}