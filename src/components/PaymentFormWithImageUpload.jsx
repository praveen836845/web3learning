import { useState } from "react";
import { useDropzone } from "react-dropzone";

const ProductForm = ({setAddSection}) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [formData, setFormData] = useState({
    productName: "",
    description: "",
    productLink: "",
    price: "",
  });

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    // You can now send formData to a server or handle the submission accordingly.
  };

  return (
    <div className="max-w-md p-6 mx-auto bg-white border rounded-lg shadow-md">
      <h2 className="text-xl font-semibold">Add Product</h2>
      <p className="text-sm text-gray-500">
        Fill out the details to upload your product.
      </p>

      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        {/* Drag-and-Drop or File Upload */}
        <div
          {...getRootProps()}
          className={`p-4 border-2 border-dashed rounded ${
            isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
          }`}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p className="text-center text-blue-600">Drop the image here...</p>
          ) : (
            <p className="text-center text-gray-500">
              Drag and drop an image here, or click to select one
            </p>
          )}
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Selected"
              className="mt-4 w-full h-48 object-cover rounded"
            />
          )}
        </div>

        {/* Product Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Product Name
          </label>
          <input
            type="text"
            name="productName"
            value={formData.productName}
            onChange={handleInputChange}
            placeholder="Enter product name"
            className="block w-full px-4 py-2 mt-1 border rounded focus:outline-none focus:ring focus:ring-indigo-500"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Enter product description"
            rows="3"
            className="block w-full px-4 py-2 mt-1 border rounded focus:outline-none focus:ring focus:ring-indigo-500"
          ></textarea>
        </div>

        {/* Product Links */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Product Links
          </label>
          <input
            type="url"
            name="productLink"
            value={formData.productLink}
            onChange={handleInputChange}
            placeholder="Enter product link"
            className="block w-full px-4 py-2 mt-1 border rounded focus:outline-none focus:ring focus:ring-indigo-500"
          />
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Price
          </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            placeholder="Enter product price"
            className="block w-full px-4 py-2 mt-1 border rounded focus:outline-none focus:ring focus:ring-indigo-500"
          />
        </div>

        {/* Upload Button */}
        <button
          type="submit"
          className="block w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-gray-800"
        >
          Upload Product
        </button>
        <button
         onClick={()=>setAddSection(false)}

          className="block w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-gray-800"
        >
          close
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
