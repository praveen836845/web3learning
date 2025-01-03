import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../Home/Home'
import Login from '../Pages/Login';
import Header from '../Pages/Header';
import Listing from '../Pages/Listing';
import ProductDetail from '../components/ProductDetail';
import ProfilePage from '../components/ProfilePage';


const Navigation = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/listing' element={<Listing />} />
          <Route path='/product-detail' element={<ProductDetail />} />
          <Route path='/profile' element={<ProfilePage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default Navigation