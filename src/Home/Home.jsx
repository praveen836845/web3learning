import ProductCard from '../components/ProductCard'

import PaymentFormWithImageUpload from '../components/PaymentFormWithImageUpload'
import ProfilePage from '../components/ProfilePage'
import UpdateUserForm from '../components/UpdateUserForm'
import { useReadContract } from 'wagmi'
import { REFERRAL, REFERRAL_ABI } from '../blockchain/constant'

const Home = () => {

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
        <ProfilePage />


    </div>
  )
}

export default Home