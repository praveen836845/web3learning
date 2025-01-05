import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { writeContract, waitForTransactionReceipt } from 'wagmi/actions';
import { REFERRAL, REFERRAL_ABI } from "../blockchain/constant";
import { useAccount } from 'wagmi';
import { motion, AnimatePresence } from 'framer-motion';
import { config } from '../utils/config';
import toast from 'react-hot-toast';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

const ProductForm = ({ setAddSection }) => {
  const { address } = useAccount();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [images, setImages] = useState([]);
  const [showDropzone, setShowDropzone] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    stockQuantity: "",
    specifications: "",
    tags: [],
  });

  const onDrop = useCallback((acceptedFiles) => {
    const newImages = acceptedFiles.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      isPrimary: images.length === 0
    }));
    setImages(prev => [...prev, ...newImages]);
    setShowDropzone(false);
  }, [images]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    multiple: true
  });

  const removeImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    if (images.length <= 1) {
      setShowDropzone(true);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTagsChange = (e) => {
    const tags = e.target.value.split(',').map(tag => tag.trim());
    setFormData(prev => ({
      ...prev,
      tags
    }));
  };

  const uploadToIPFS = async (file) => {
    return `ipfs://${file.name}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!address) {
      toast.error('Please connect your wallet first');
      return;
    }

    try {
      setIsSubmitting(true);
      const uploadedImages = await Promise.all(
        images.map(async (img) => ({
          imageUrl: await uploadToIPFS(img.file),
          description: formData.description,
          isPrimary: img.isPrimary
        }))
      );

      const params = [
        formData.name,
        formData.description,
        formData.category,
        BigInt(parseFloat(formData.price) * 1e18),
        BigInt(formData.stockQuantity),
        formData.tags,
        formData.specifications,
        uploadedImages
      ];

      const hash  = await writeContract(config,{
        address: REFERRAL,
        abi: REFERRAL_ABI,
        functionName: 'createProduct',
        args: params,
      });

      await waitForTransactionReceipt(hash);
      toast.success('Product created successfully!');
      setAddSection(false);

    } catch (error) {
      console.error('Error creating product:', error);
      toast.error(error.message || 'Failed to create product');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-2xl p-6 mx-auto bg-white border rounded-lg shadow-md"
    >
      <motion.h2 
        initial={{ x: -20 }}
        animate={{ x: 0 }}
        className="text-2xl font-semibold"
      >
        Add Product
      </motion.h2>
      <p className="text-sm text-gray-500 mb-6">Fill out the details to create your product on the blockchain.</p>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">Product Images</label>
          
          <AnimatePresence>
            {showDropzone && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                {...getRootProps()}
                className={`p-8 border-2 border-dashed rounded-lg transition-colors duration-300 cursor-pointer
                  ${isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-blue-400"}`}
              >
                <input {...getInputProps()} />
                <div className="flex flex-col items-center space-y-2">
                  <Upload className="w-12 h-12 text-gray-400" />
                  <p className="text-center text-gray-500">
                    {isDragActive ? "Drop images here" : "Drag & drop images or click to select"}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div 
            layout
            className="grid grid-cols-3 gap-4"
          >
            <AnimatePresence>
              {images.map((img, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  layout
                  className="relative group"
                >
                  <img
                    src={img.preview}
                    alt={`Product ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg shadow-sm"
                  />
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-4 h-4" />
                  </motion.button>
                </motion.div>
              ))}
            </AnimatePresence>

            {!showDropzone && images.length < 5 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                {...getRootProps()}
                className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex items-center justify-center cursor-pointer hover:border-blue-400 transition-colors"
              >
                <input {...getInputProps()} />
                <ImageIcon className="w-8 h-8 text-gray-400" />
              </motion.div>
            )}
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 gap-4"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700">Product Name</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleInputChange}
              className="block w-full px-4 py-2 mt-1 border rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500 transition-shadow"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <input
              type="text"
              name="category"
              required
              value={formData.category}
              onChange={handleInputChange}
              className="block w-full px-4 py-2 mt-1 border rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500 transition-shadow"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            required
            value={formData.description}
            onChange={handleInputChange}
            rows="3"
            className="block w-full px-4 py-2 mt-1 border rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500 transition-shadow"
          />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 gap-4"
        >
        {/* {  <div>
            <label className="block text-sm font-medium text-gray-700">Price (ETH)</label>
            <input
              type="number"
              name="price"
              required
              step="0.000001"
              value={formData.price}
              onChange={handleInputChange}
              className="block w-full px-4 py-2 mt-1 border rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500 transition-shadow"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Stock Quantity</label>
            <input
              type="number"
              name="stockQuantity"
              required
              value={formData.stockQuantity}
              onChange={handleInputChange}
              className="block w-full px-4 py-2 mt-1 border rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500 transition-shadow"
            />
          </div>} */}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <label className="block text-sm font-medium text-gray-700">Tags (comma-separated)</label>
          <input
            type="text"
            name="tags"
            value={formData.tags.join(', ')}
            onChange={handleTagsChange}
            placeholder="tag1, tag2, tag3"
            className="block w-full px-4 py-2 mt-1 border rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500 transition-shadow"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <label className="block text-sm font-medium text-gray-700">Specifications</label>
          <textarea
            name="specifications"
            value={formData.specifications}
            onChange={handleInputChange}
            rows="3"
            className="block w-full px-4 py-2 mt-1 border rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500 transition-shadow"
          />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isSubmitting}
            className="flex-1 px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 disabled:bg-gray-400 transition-colors"
          >
            {isSubmitting ? 'Creating...' : 'Create Product'}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="button"
            onClick={() => setAddSection(false)}
            className="flex-1 px-4 py-2 text-white bg-gray-500 rounded-lg hover:bg-gray-600 transition-colors"
          >
            Cancel
          </motion.button>
        </motion.div>
      </form>
    </motion.div>
  );
};

export default ProductForm;