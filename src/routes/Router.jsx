import {Routes, Route} from 'react-router-dom';

// pages
import LandingPage from '../pages/Customer/LandingPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import ProductPage from '../pages/Customer/ProductPage';
import CartPage from '../pages/Customer/CartPage';
import OrderPage from '../pages/Customer/OrderPage';
import PaymentPage from '../pages/Customer/PaymentPage';
import SuccessPage from '../pages/Customer/SuccessPage';
import HistoryPage from '../pages/Customer/HistoryPage';

// admin pages
import Dashboard from '../pages/admin/Dashboard';

import TemplateIndex from '../pages/admin/template/TemplateIndex';
import TemplateCreate from '../pages/admin/template/TemplateCreate';
import TemplateEdit from '../pages/admin/template/TemplateEdit';

import { Toaster } from 'react-hot-toast';

function Router() {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        {/* customer routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/history" element={<HistoryPage />} />

        {/* admin routes */}
        <Route path="/admin/dashboard" element={<Dashboard />} />

        {/* template route */}
        <Route path="/admin/template" element={<TemplateIndex />} />
        <Route path="/admin/template/create" element={<TemplateCreate />} />
        <Route path="/admin/template/edit" element={<TemplateEdit />} />

        
      </Routes>
    </>
  )
}

export default Router;
