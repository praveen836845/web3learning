const ProductCard = ({ image, description, price, name, category, tags }) => {
  console.log("checking", name);
  return (
    <div className="flex flex-col items-center w-48 bg-white rounded-lg shadow-lg p-4">
      {/* Image */}
      <div className="w-full h-32">
        <img
          className="object-cover w-full h-full rounded-t-lg"
          src={image || "https://via.placeholder.com/150"}
          alt={name}
        />
      </div>
      
      {/* Title */}
      <div className="text-center mt-4">
        <p className="text-lg font-bold text-gray-800">{name}</p>
      </div>
      
      {/* Description */}
      <div className="text-left w-full text-gray-600 mt-2">
        <p>{description}</p>
      </div>
      
      {/* Price */}
      <div className="text-left w-full text-gray-800 font-semibold mt-2">
        <p>Price: {price} Wei</p>
      </div>
      
      {/* Category */}
      <div className="text-left w-full text-gray-500 text-sm mt-1">
        <p>Category: {category}</p>
      </div>
      
      {/* Tags */}
      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-gray-200 rounded-full text-xs text-gray-700"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductCard;
