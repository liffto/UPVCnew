
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { 
  INITIAL_CATEGORIES, 
  INITIAL_PRODUCTS, 
  INITIAL_CATALOGS, 
  INITIAL_SETTINGS, 
  TESTIMONIALS, 
  INITIAL_GALLERY 
} from './constants';

// Pages
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductListPage from './pages/ProductListPage';
import ProductDetailPage from './pages/ProductDetailPage';
import AboutPage from './pages/AboutPage';
import CatalogsPage from './pages/CatalogsPage';
import ContactPage from './pages/ContactPage';
import GalleryPage from './pages/GalleryPage';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminCategories from './pages/AdminCategories';
import AdminProducts from './pages/AdminProducts';
import AdminCatalogs from './pages/AdminCatalogs';
import AdminSettings from './pages/AdminSettings';
import AdminTestimonials from './pages/AdminTestimonials';
import AdminGallery from './pages/AdminGallery';

// Protected Route Component
// Added optional children type to resolve TypeScript inference issues in route elements
const ProtectedRoute = ({ children }: { children?: React.ReactNode }) => {
  const isAuth = sessionStorage.getItem('hitech_auth') === 'true';
  const location = useLocation();

  if (!isAuth) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  const [categories, setCategories] = useState(INITIAL_CATEGORIES);
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [catalogs, setCatalogs] = useState(INITIAL_CATALOGS);
  const [settings, setSettings] = useState(INITIAL_SETTINGS);
  const [testimonials, setTestimonials] = useState(TESTIMONIALS);
  const [gallery, setGallery] = useState(INITIAL_GALLERY);
  const [adminPassword, setAdminPassword] = useState('admin123');

  return (
    <HashRouter>
      <ScrollToTop />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage categories={categories} products={products} catalogs={catalogs} settings={settings} testimonials={testimonials} gallery={gallery} />} />
        <Route path="/about" element={<AboutPage settings={settings} />} />
        <Route path="/products" element={<ProductsPage categories={categories} settings={settings} />} />
        <Route path="/category/:id" element={<ProductListPage categories={categories} products={products} settings={settings} />} />
        <Route path="/product/:id" element={<ProductDetailPage products={products} settings={settings} />} />
        <Route path="/catalogs" element={<CatalogsPage catalogs={catalogs} settings={settings} />} />
        <Route path="/gallery" element={<GalleryPage gallery={gallery} settings={settings} />} />
        <Route path="/contact" element={<ContactPage settings={settings} />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<ProtectedRoute><AdminDashboard categories={categories} products={products} catalogs={catalogs} /></ProtectedRoute>} />
        <Route path="/admin/categories" element={<ProtectedRoute><AdminCategories categories={categories} setCategories={setCategories} /></ProtectedRoute>} />
        <Route path="/admin/products" element={<ProtectedRoute><AdminProducts products={products} categories={categories} setProducts={setProducts} /></ProtectedRoute>} />
        <Route path="/admin/catalogs" element={<ProtectedRoute><AdminCatalogs catalogs={catalogs} setCatalogs={setCatalogs} /></ProtectedRoute>} />
        <Route path="/admin/gallery" element={<ProtectedRoute><AdminGallery gallery={gallery} setGallery={setGallery} /></ProtectedRoute>} />
        <Route path="/admin/testimonials" element={<ProtectedRoute><AdminTestimonials testimonials={testimonials} setTestimonials={setTestimonials} /></ProtectedRoute>} />
        <Route path="/admin/settings" element={<ProtectedRoute><AdminSettings settings={settings} setSettings={setSettings} adminPassword={adminPassword} setAdminPassword={setAdminPassword} /></ProtectedRoute>} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
