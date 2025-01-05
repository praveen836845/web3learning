import { useParams } from "react-router-dom";
import { useReadContract } from "wagmi";
import { writeContract, waitForTransactionReceipt } from 'wagmi/actions';
import { config } from '../utils/config'
import { REFERRAL, REFERRAL_ABI } from "../blockchain/constant";
import { useAccount } from "wagmi";
import toast from "react-hot-toast";

const ProductDetail = () => {
  const { id } = useParams();
  const { address } = useAccount();

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

  console.log(productDetail);


  const generateCode = async () => {
    try {
      await toast.promise((async () => {
        const hash = await writeContract(config, {
          address: REFERRAL,
          abi: REFERRAL_ABI,
          functionName: 'generateProductReferralCode',
          args: [id],
        });
        await waitForTransactionReceipt(config, { hash, pollingInterval: 1000, confirmations: 2 });
        await refetchProductDetail();
        console.log('Generated Code:', hash);
      })(), {
        loading: "Generating Code...",
        success: "Generated code successfully!",
        error: "Generating code error:",
      })
    } catch (error) {
      console.log(error);
    }
  }

  const vote = async (referralCode) => {
    try {
      await toast.promise((async () => {
        const hash = await writeContract(config, {
          address: REFERRAL,
          abi: REFERRAL_ABI,
          functionName: 'voteWithReferral',
          args: [id, referralCode],
        });
        await waitForTransactionReceipt(config, { hash, pollingInterval: 1000, confirmations: 2 });
        console.log('Voting: ', hash);
      })(), {
        loading: "Voting...",
        success: "Vote successfully!",
        error: "Vote error:",
      })
    } catch (error) {
      console.log(error);
    }
  }

  let uniqueCodefound = false;
  let uniqueCode = "";

  if (accountDetails) {
    const registerArray = accountDetails[4];

    if (Array.isArray(registerArray)) {
      if (registerArray.includes(id)) {
        uniqueCodefound = true;
        const { uniqueCode: code } = influencerDetails?.[0] || {};
        uniqueCode = code;
      }
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

  // Loading state
  if (!productDetail || !influencerDetails) {
    return (
      <div className="p-8 bg-gray-50">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

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
              src=  {productDetail[0].images[0].imageUrl}
              alt="Entertainment Center"
            />
          </div>
        </div>

        {/* Right Section: Product Details */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            {productDetail[0]?.name || 'Product Name Not Available'}
          </h1>
          <p className="mt-4 text-2xl font-semibold text-red-500"></p>
          <p className="mt-4 text-gray-600">
            {productDetail[0]?.description || 'Description Not Available'}
          </p>
          <div className="mt-6 space-y-4">
            <p>
              <span className="font-bold">Category:</span>{' '}
              {productDetail[0]?.specifications || 'Not Available'}
            </p>
            <p>
        <span className="font-bold">Tags:</span>{' '}
        {productDetail[0]?.tags && productDetail[0]?.tags.length > 0 ? (
          <div className="flex flex-wrap gap-3 mt-2">
            {productDetail[0].tags.map((tag, index) => (
              <span
                key={index}
                className={`px-4 py-2 bg-gray-200 text-gray-700 rounded-full shadow-md 
                hover:scale-105 transform transition-all ease-in-out 
                animate-fadeIn`}
                style={{
                  animationDelay: `${index * 0.2}s`, // Staggered animation effect for each tag
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        ) : (
          'Not Available'
        )}
      </p>
          </div>

          {uniqueCodefound ? (
            <div>
              <p
                className="text-blue-500 mt-2 cursor-pointer hover:bg-blue-100 hover:text-blue-700 px-2 py-1 rounded-md transition-all duration-200"
                onClick={copyToClipboard}
              >
                {uniqueCode} - {id}
              </p>
            </div>
          ) : (
            <div className="flex items-center mt-6 space-x-4">
              <button 
                className="px-6 py-2 text-white bg-blue-600 rounded hover:bg-brown-500" 
                onClick={generateCode}
              >
                Generate Referral Code
              </button>
            </div>
          )}
        </div>
      </div>

      {/* New Section: Influencers List */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Influencers List</h2>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Influencer Address
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Unique Code
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Referral Votes
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {influencerDetails && influencerDetails.map((influencer, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {influencer.influencerAddress}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                    {influencer.uniqueCode}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {influencer.referralVotes.toString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
  
};

export default ProductDetail;