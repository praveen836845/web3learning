import  { useState } from "react";
import { useDropzone } from "react-dropzone";

const UpdateUserForm = ({setOpenEdit}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
  });
  const [selectedImage, setSelectedImage] = useState(null);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the form submission logic here (e.g., send data to the backend)
    console.log({ ...formData, profilePicture: selectedImage });
    alert("User information updated successfully!");
  };

  return (
    <div className="max-w-md p-6 mx-auto bg-white border rounded-lg shadow-md">
      <h2 className="text-xl font-semibold">Update User Information</h2>
      <p className="text-sm text-gray-500">Edit the details below to update the user's profile.</p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
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
              Drag and drop a profile picture here, or click to select one
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

        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter user's name"
            className="block w-full px-4 py-2 mt-1 border rounded focus:outline-none focus:ring focus:ring-indigo-500"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter user's email"
            className="block w-full px-4 py-2 mt-1 border rounded focus:outline-none focus:ring focus:ring-indigo-500"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Phone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter user's phone number"
            className="block w-full px-4 py-2 mt-1 border rounded focus:outline-none focus:ring focus:ring-indigo-500"
          />
        </div>

        {/* Company */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Company</label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="Enter company name"
            className="block w-full px-4 py-2 mt-1 border rounded focus:outline-none focus:ring focus:ring-indigo-500"
          />
        </div>

        {/* Update Button */}
        <button
          type="submit"
          className="block w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-gray-800"
        >
          Update Information
        </button>
        <button className="p-2 w-full text-white bg-blue-500 rounded" onClick={()=>setOpenEdit(false)}>Close Form</button>

      </form>
      
    </div>
  );
};

export default UpdateUserForm;
