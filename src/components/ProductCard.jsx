import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const ProductCard = ({
  images,
  description,
  price,
  name,
  category,
  tags,
  id,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate(`/product-detail/${id}`);
  };

  const toggleDescription = () => {
    setIsExpanded((prevState) => !prevState);
  };
  console.log(images[0].imageUrl);

  return (
    <motion.div
      className="flex flex-col items-center bg-white rounded-xl shadow-lg overflow-hidden w-64 p-4 hover:scale-105 transition-all duration-300 ease-in-out"
      onClick={handleNavigation}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.5 }}
    >
      {/* Image */}
      <motion.div
        className="w-full h-40 mb-4 rounded-lg overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <img
          className="object-cover w-full h-full"
          src={images[0].imageUrl || "https://gratisography.com/wp-content/uploads/2024/11/gratisography-clown-room-1170x780.jpg"}
          alt={name}
        />
      </motion.div>

      {/* Title */}
      <div className="text-center mb-3">
        <p className="text-xl font-bold text-gray-800">{name}</p>
      </div>

      {/* Description */}
      <div className="text-left w-full text-gray-600 mt-2 overflow-hidden">
        <p className={`${
          !isExpanded ? "line-clamp-2" : "" // Limit to 2 lines when collapsed
        }`}>
          {description}
        </p>
        <motion.button
          onClick={toggleDescription}
          className="text-sm text-blue-500 mt-2 hover:text-blue-700 transition-all duration-200"
          whileHover={{ scale: 1.05 }} // Hover scale effect on button
        >
          {isExpanded ? "Show Less" : "Show More"}
        </motion.button>
      </div>

      {/* Price */}
      {/* <div className="text-left w-full text-gray-800 font-semibold mt-2">
        <p>Price: {price} Wei</p>
      </div> */}

      {/* Category */}
      <div className="text-left w-full text-gray-500 text-sm mt-1">
        <p>Category: {category}</p>
      </div>

      {/* Tags */}
      {tags && tags.length > 0 && (
        <motion.div
          className="flex flex-wrap gap-2 mt-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          {tags.map((tag, index) => (
            <motion.span
              key={index}
              className="px-3 py-1 bg-gray-200 rounded-full text-xs text-gray-700"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                delay: 0.6 + index * 0.2, // Staggered animation effect for each tag
                duration: 0.4,
              }}
            >
              {tag}
            </motion.span>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
};

export default ProductCard;
