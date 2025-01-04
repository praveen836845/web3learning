import { useParams } from "react-router-dom";
import { useReadContract } from "wagmi";
import { REFERRAL, REFERRAL_ABI } from "../blockchain/constant";
import { useAccount } from "wagmi";

const ProductDetail = () => {
  const { id } = useParams();
  const { address } = useAccount();

  console.log(address);

  const { data: productDetail, refetch: refetchProductDetail } =
    useReadContract({
      address: REFERRAL,
      abi: REFERRAL_ABI,
      functionName: "getProduct",
      args: [id],
      watch: true,
    });

  const { data: influencerDetails, refetch: refetchInfluencerDetails } =
    useReadContract({
      address: REFERRAL,
      abi: REFERRAL_ABI,
      functionName: "getProductInfluencers",
      args: [id],
      watch: true,
    });

  const { data: accountDetails, refetch: refetchAccountDetails } =
    useReadContract({
      address: REFERRAL,
      abi: REFERRAL_ABI,
      functionName: "getInfluencerStats",
      args: [address],
      watch: true,
    });

  console.log("Account Details:", accountDetails);
  console.log("Product Detail:", productDetail);
  console.log("Influencers:", influencerDetails);

  let uniqueCodefound = true;
  let uniqueCode = "asdfghj";

  if (accountDetails) {
    const registerArray = accountDetails[4];

    if (Array.isArray(registerArray)) {
      if (registerArray.includes(id)) {
        uniqueCodefound = true;
        const { uniqueCode: code } = influencerDetails?.[0] || {};
        uniqueCode = code;
        console.log("Found unique code:", uniqueCode);
      } else {
        console.log("Not Found");
      }
    } else {
      console.log("registerArray is not an array");
    }
  }
  const copyToClipboard = () => {
    const textToCopy = `${uniqueCode} - ${id}`;
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        alert("Copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };

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
          <h1 className="text-3xl font-bold text-gray-800">
            Entertainment Center
          </h1>
          <div className="flex items-center mt-2 space-x-2">
            <span className="text-yellow-500">★★★★☆</span>
            <p className="text-sm text-gray-600">100 customer reviews</p>
          </div>
          <p className="mt-4 text-2xl font-semibold text-red-500">
            <span className="text-gray-600"> Price Money :-</span> 599.99
          </p>
          <p className="mt-4 text-gray-600">
            Cloud bread VHS hell of banjo bicycle rights jianbing umami
            mumblecore etsy 8-bit pok pok +1 wolf. Vexillologist yr dreamcatcher
            waistcoat, authentic chillwave trust fund.
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

          {uniqueCodefound ? (
            <div>
              <p
                className="text-blue-500 mt-2 cursor-pointer hover:bg-blue-100 hover:text-blue-700 px-2 py-1 rounded-md transition-all duration-200"
                onClick={copyToClipboard} // Trigger copy on click
              >
                {uniqueCode} - {id}
              </p>
            </div>
          ) : (
            <div className="flex items-center mt-6 space-x-4">
              <button className="px-6 py-2 text-white bg-blue-600 rounded hover:bg-brown-500">
                Generate Referral Code
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
