import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import ScrollToTop from './Components/ScrollToTop.jsx'
import { CartProvider } from './Components/CartContext.jsx'
import { ToastProvider } from './Components/ToastContext.jsx'
import { ScrollToSection } from './Components/ScrollToSection.jsx'
import AuthProvider from '../context/AppContext.jsx'

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <AuthProvider>


            <ScrollToSection />
            <ToastProvider>
                <CartProvider>

                    <ScrollToTop />
                    <App />

                </CartProvider>
            </ToastProvider>
        </AuthProvider>
    </BrowserRouter>


)
