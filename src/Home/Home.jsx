import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import PaymentFormWithImageUpload from "../components/PaymentFormWithImageUpload";
import ProfilePage from "../components/ProfilePage";
import { useAccount, useReadContract } from "wagmi";
import { REFERRAL, REFERRAL_ABI } from "../blockchain/constant";
import toast from "react-hot-toast";
import { writeContract, waitForTransactionReceipt } from "wagmi/actions";
import { config } from "../utils/config";

const Home = () => {
  const { address } = useAccount();
  const [products, setProducts] = useState([]);
  const [addSection, setAddSection] = useState(false);

  const { data: productDetails } = useReadContract({
    address: REFERRAL,
    abi: REFERRAL_ABI,
    functionName: "getAllProducts",
    args: [0, 10],
    watch: true,
  });

  useEffect(() => {
    if (productDetails) {
      setProducts(productDetails);
    }
  }, [productDetails]);

  console.log(">> Destructure", productDetails);

  const registerUser = async () => {
    console.log("Registering User");
    try {
      await toast.promise(
        (async () => {
          const hash = await writeContract(config, {
            address: REFERRAL,
            abi: REFERRAL_ABI,
            functionName: "registerUser",
            args: [address],
          });
          await waitForTransactionReceipt(config, {
            hash,
            pollingInterval: 1000,
            confirmations: 2,
          });
          console.log("User Registered:", hash);
        })(),
        {
          loading: "Registering User...",
          success: "Registered user successfully!",
          error: "Failed to register user.",
        }
      );
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  const registerInfluencer = async () => {
    console.log("Registering Influencer");
    try {
      await toast.promise(
        (async () => {
          const hash = await writeContract(config, {
            address: REFERRAL,
            abi: REFERRAL_ABI,
            functionName: "registerInfluencer",
            args: [],
          });
          await waitForTransactionReceipt(config, {
            hash,
            pollingInterval: 1000,
            confirmations: 2,
          });
          console.log("Influencer Registered:", hash);
        })(),
        {
          loading: "Registering Influencer...",
          success: "Registered Influencer successfully!",
          error: "Failed to register influencer.",
        }
      );
    } catch (error) {
      console.error("Error registering influencer:", error);
    }
  };
  console.log("products.length", products.length);

  return addSection ? (
    <div className="mt-6">
      <PaymentFormWithImageUpload setAddSection={setAddSection} />
    </div>
  ) : (
    <div className="flex">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold mb-4">Home</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[100px]">
          {products.length > 0 ? (
            products.map((product, index) => {
             
              
              return (
                <ProductCard
                  key={index}
                  name={product.name}
                  price={Number(product.price) / 1e18}
                  description={product.description}
                  category={product.category}
                  stockQuantity={Number(product.stockQuantity)}
                  images={product.images}
                  tags={product.tags}
                  id={index}
                />
              );
            })
          ) : (
            <p className="text-gray-500">Loading products...</p>
          )}
        </div>

        <div className="my-6">
          <button
            onClick={registerUser}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Register dappUser
          </button>
          <button
            onClick={registerInfluencer}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 ml-4"
          >
            Register Influencer
          </button>
        </div>

        {/* // <PaymentFormWithImageUpload /> */}
      </div>{" "}
      <div className="mr-12 mt-6">
        {" "}
        <button
          onClick={() => setAddSection(true)}
          className="bg-blue-500 text-white text-nowrap px-4 py-2 rounded hover:bg-blue-600"
        >
          Create Product
        </button>
      </div>
    </div>
  );
};

export default Home;
