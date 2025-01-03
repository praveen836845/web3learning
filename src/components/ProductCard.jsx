const ProductCard = () => {
  return (
    <div className="flex flex-col items-center w-48 bg-white rounded-lg shadow-lg p-4">
      {/* Image */}
      <div className="w-full h-32">
        <img
          className="object-cover w-full h-full rounded-t-lg"
          src="https://gratisography.com/wp-content/uploads/2024/11/gratisography-clown-room-1170x780.jpg"
          alt="Gold Mole"
        />
      </div>
      {/* Title */}
      {/* <div className="text-center mt-4">
        <p className="text-lg font-bold text-gray-800">description</p>
      </div> */}
      {/* Price */}
     
      <div className="text-left w-full text-gray-600 mt-4">
        <p>description</p>
     
      </div>
     
      {/* Address */}
      <div className="text-center text-gray-500 text-sm mt-1">
        {/* <p>more details</p> */}
      </div>
    </div>
  );
};

export default ProductCard;
