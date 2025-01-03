
const ProductDetail = () => {
  return (
    <div className="p-8 bg-gray-50">
      {/* Back Button */}
      <button className="px-4 py-2 mb-6 text-sm text-white bg-brown-600 rounded hover:bg-brown-500">
        Back to Product
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Section: Product Images */}
        <div>
          <div className="w-full h-80">
            <img
              className="object-cover w-full h-full rounded-lg"
              src="https://gratisography.com/wp-content/uploads/2024/11/gratisography-clown-room-1170x780.jpg"
              alt="Entertainment Center"
            />
          </div>

          
        </div>

        {/* Right Section: Product Details */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Entertainment Center</h1>
          <div className="flex items-center mt-2 space-x-2">
            <span className="text-yellow-500">★★★★☆</span>
            <p className="text-sm text-gray-600">100 customer reviews</p>
          </div>
          <p className="mt-4 text-2xl font-semibold text-red-500"> <span className='text-gray-600'> Price Money :-</span> 599.99</p>
          <p className="mt-4 text-gray-600">
            Cloud bread VHS hell of banjo bicycle rights jianbing umami mumblecore etsy
            8-bit pok pok +1 wolf. Vexillologist yr dreamcatcher waistcoat, authentic
            chillwave trust fund.
          </p>
          <div className="mt-6 space-y-4">
            <p>
              <span className="font-bold">Available:</span> In Stock
            </p>
            <p>
              <span className="font-bold">SKU:</span> RecNZ0koOqEmilmoz
            </p>
            <p>
              <span className="font-bold">Brand:</span> Caressa
            </p>
          </div>
          <div className="mt-6">
            <p className="font-bold">link:-</p>
            <div className="flex items-center mt-2 space-x-2">
            <div className='flex flex-col gap-2'>  <span className=" text-blue-600 cursor-pointer hover:border-gray-500">url 1</span>
              <span className="text-blue-600 cursor-pointer hover:border-gray-500">url 2</span>
              </div> </div>
          </div>
          <div className="flex items-center mt-6 space-x-4">
            <button className="px-6 py-2 text-white bg-blue-600 rounded hover:bg-brown-500">
            Generate token
            </button>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
