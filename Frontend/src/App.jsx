import './App.css'
import About from './pages/About'
import { Cart } from './pages/Cart'
import { Collection } from './pages/Collection'
import { Contact } from './pages/Contact'
import { Form } from './pages/Form'
import { Home } from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import { PrivacyPolicy } from './pages/PrivacyPolicy'
import { GameDetails } from './pages/GameDetails'
import { Navbar } from './Components/Navbar'
import { Footer } from './Components/Footer'
import { CategoryPage } from './pages/CategoryPage'
import CheckoutPage from './pages/CheckoutPage'
import { ScrollBtn } from './Components/ScrollBtn'

import { ToastContainer } from 'react-toastify';
import { EmailVerify } from './pages/EmailVerify'
import { ForgotPassword } from './pages/ForgotPassword'

function App() {


  return (

    <div>

      <Navbar />
      <ToastContainer position="bottom-center"
        autoClose={3000} theme="dark" pauseOnHover={false}  />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/collections' element={<Collection />} />
        <Route path='/collections/:slug' element={<GameDetails />} />
        <Route path='/category/:type' element={<CategoryPage />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/account' element={<Form />} />
        <Route path='/cart-page' element={<Cart />} />
        <Route path='/privacy-policy' element={<PrivacyPolicy />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/email-verify" element={<EmailVerify />} />
        <Route path="/reset-password" element={<ForgotPassword />} />
      </Routes>

      <ScrollBtn />

      <Footer />

    </div>
  )
}

export default App
