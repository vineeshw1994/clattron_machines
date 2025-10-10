import { Routes, Route, Navigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Home from './pages/Home';
import About from './pages/About';
import Machines from './pages/Machines';
import Contact from './pages/Contact';
import ProductView from './pages/ProductView';
import Footer from './components/Footer';
import Header from './components/Header';
import Login from './pages/Admin/Login';
import AdminLayout from './components/AdminLayout';
import Dashboard from './pages/Admin/Dashboard';
import Categories from './pages/Admin/Categories';
import Products from './pages/Admin/Products';
import CompanyInfo from './pages/Admin/CompanyInfo';
import ProductForm from './pages/Admin/ProductForm';
import { useFaviconUpdater } from './hooks/useFaviconUpdater';
import ProtectedRoute from './components/ProtectedRoute'; // Import ProtectedRoute

function Layout({ children }) {
  useFaviconUpdater();
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);
  return (
    <>
      <Header />
      <main className="min-h-[calc(100vh-64px)] pt-16">{children}</main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Layout><Home /></Layout>} />
      <Route path="/about" element={<Layout><About /></Layout>} />
      <Route path="/machines" element={<Layout><Machines /></Layout>} />
      <Route path="/machines/:id" element={<Layout><ProductView /></Layout>} />
      <Route path="/contact" element={<Layout><Contact /></Layout>} />

      {/* Admin Login Route (Public) */}
      <Route path="/admin/login" element={<Login />} />

      {/* Protected Admin Routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/categories" element={<Categories />} />
          <Route path="/admin/products" element={<Products />} />
          <Route path="/admin/company-info" element={<CompanyInfo />} />
          <Route path="/admin/products/add" element={<ProductForm />} />
          <Route path="/admin/products/edit/:id" element={<ProductForm />} />
        </Route>
      </Route>
    </Routes>
  );
}