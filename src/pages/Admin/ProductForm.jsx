import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useForm, useFieldArray } from 'react-hook-form';
import axios from 'axios';
import { motion } from 'framer-motion';
const URL = import.meta.env.VITE_API_URL


export default function ProductForm() {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);
  const { register, handleSubmit, control, reset, formState: { errors } } = useForm({
    defaultValues: { name: '', description: '', category: '', specs: [{ key: '', value: '' }] },
  });
  const { fields, append, remove } = useFieldArray({ control, name: 'specs' });
  const [image, setImage] = useState(null);

  useEffect(() => {
    fetchCategories();
    if (isEdit) {
      fetchProduct();
    }
  }, [id]);

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/categories`);
      setCategories(data);
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  const fetchProduct = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/products/${id}`);
      reset({
        name: data.name,
        description: data.description,
        category: data.category._id,
        specs: Object.entries(data.specs || {}).map(([key, value]) => ({ key, value })),
      });
      setPreviewImage(data.image ? `${URL}${data.image}` : null);
      // setPreviewImage(data.image || null);
    } catch (err) {
      console.error('Error fetching product:', err);
    }
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('category', data.category);
    formData.append('specs', JSON.stringify(data.specs.reduce((acc, { key, value }) => ({ ...acc, [key]: value }), {})));
    if (image) formData.append('image', image);

    try {
      if (isEdit) {
        await axios.put(`${import.meta.env.VITE_API_URL}/api/admin/products/${id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      } else {
        await axios.post(`${import.meta.env.VITE_API_URL}/api/admin/products`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      }
      navigate('/admin/products');
    } catch (err) {
      console.error('Error saving product:', err);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreviewImage(file ? URL.createObjectURL(file) : null);
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreviewImage(null);
    // Reset the file input field
    document.getElementById('imageInput').value = '';
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

  return (
    <motion.div
      className="bg-[#f5f5f5] p-2 sm:p-4 lg:p-6 min-h-screen"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumbs */}
        <nav className="text-xs sm:text-sm mb-3 sm:mb-4">
          <Link to="/admin/products" className="text-blue-600 hover:underline">Product List</Link> / {isEdit ? 'Edit Product' : 'Add Product'}
        </nav>

        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-6">{isEdit ? 'Edit Product' : 'Add Product'}</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-3 sm:p-6 rounded-xl shadow-2xl border border-gray-200 bg-gradient-to-br from-gray-50 to-gray-100 space-y-3 sm:space-y-4">
          <motion.div variants={itemVariants} className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Product Name</label>
            <input
              {...register('name', { required: 'Name is required' })}
              placeholder="Product Name"
              className="block w-full border border-gray-300 rounded-lg p-2 sm:p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.name && <p className="text-red-500 text-xs sm:text-sm">{errors.name.message}</p>}
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <select
              {...register('category', { required: 'Category is required' })}
              className="block w-full border border-gray-300 rounded-lg p-2 sm:p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Category</option>
              {categories.map(cat => (
                <option key={cat._id} value={cat._id}>{cat.name}</option>
              ))}
            </select>
            {errors.category && <p className="text-red-500 text-xs sm:text-sm">{errors.category.message}</p>}
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              {...register('description', { required: 'Description is required' })}
              placeholder="Description"
              className="block w-full border border-gray-300 rounded-lg p-2 sm:p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3" // Reduced for mobile
            />
            {errors.description && <p className="text-red-500 text-xs sm:text-sm">{errors.description.message}</p>}
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
            >
              {isEdit ? 'Update Product' : 'Create Product'}
            </motion.button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}