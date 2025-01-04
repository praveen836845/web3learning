import ProductCard from '../components/ProductCard'

import PaymentFormWithImageUpload from '../components/PaymentFormWithImageUpload'
import ProfilePage from '../components/ProfilePage'
import UpdateUserForm from '../components/UpdateUserForm'
import { useAccount, useReadContract } from 'wagmi'
import { REFERRAL, REFERRAL_ABI } from '../blockchain/constant'
import toast from 'react-hot-toast';
import { writeContract, waitForTransactionReceipt } from 'wagmi/actions';
import { config } from '../utils/config'

const Home = () => {

  const {address} = useAccount();

  const registerUser = async () => {
    console.log('Registering User');
    try {
      await toast.promise((async () => {
        const hash = await writeContract(config, {
          address: REFERRAL,
          abi: REFERRAL_ABI,
          functionName: 'registerUser',
          args: [address],
        });
        await waitForTransactionReceipt(config, { hash, pollingInterval: 1000, confirmations: 2 });
        console.log('User Registered:', hash);
      })(), {
        loading: "Registering User...",
        success: "Registered user successfully!",
        error: "Register User error:",
      })
    } catch (error) {
      console.log(error);
    }
  }

  const registerInfluencer = async () => {
    console.log('Registering influencer');
    try {
      await toast.promise((async () => {
        const hash = await writeContract(config, {
          address: REFERRAL,
          abi: REFERRAL_ABI,
          functionName: 'registerInfluencer',
          args: [],
        });
        await waitForTransactionReceipt(config, { hash, pollingInterval: 1000, confirmations: 2 });
        console.log('User Registered:', hash);
      })(), {
        loading: "Registering Influencer...",
        success: "Registerer Influencer successfully!",
        error: "Register Influencer error:",
      })
    } catch (error) {
      console.log(error);
    }
  }


  const { data : productDetails, refetch : refetchProductDetails } = useReadContract({
    address: REFERRAL,
    abi: REFERRAL_ABI,
    functionName: 'getAllProducts',
    args: [0, 10],
    watch: true,
  });

  console.log(productDetails);

  return (
    <div>Home

        <ProductCard />
        <PaymentFormWithImageUpload />
        <button onClick={registerInfluencer}>Call</button>
        <ProfilePage />


    </div>
  )
}

export default Home