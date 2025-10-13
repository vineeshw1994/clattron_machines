import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, NavLink, Outlet } from 'react-router-dom';
import { logout } from '../store/slices/userSlice';
import { clearCompany } from '../store/slices/companySlice';
import { FaBars, FaTimes, FaHome, FaTags, FaBox, FaBuilding, FaUser, FaUsers, FaSignOutAlt } from 'react-icons/fa';

export default function AdminLayout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.user);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCompany()); // Optional: Clear company info
    navigate('/admin/login');
    setIsSidebarOpen(false);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Mobile Backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0  bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar – Fixed on mobile, sticky on desktop with full viewport height */}
      <aside className={`fixed lg:sticky lg:top-0 lg:h-screen inset-y-0 left-0 z-50 w-64 bg-gray-800 text-white p-6 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 transition-transform duration-300 ease-in-out overflow-y-auto`}>
        <div className="flex justify-between items-center mb-6 lg:hidden">
          <h2 className="text-2xl font-bold">Admin Panel</h2>
          <button onClick={toggleSidebar} className="text-white hover:text-gray-300">
            <FaTimes size={20} />
          </button>
        </div>
        <h2 className="text-2xl font-bold mb-6 hidden lg:block">Admin Panel</h2>
        <nav className="space-y-2">
          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) =>
              `flex items-center py-2 px-4 rounded ${isActive ? 'bg-blue-600' : 'hover:bg-gray-700'}`
            }
            onClick={() => setIsSidebarOpen(false)}
          >
            <FaHome className="mr-3" />
            Dashboard
          </NavLink>
          <NavLink
            to="/admin/categories"
            className={({ isActive }) =>
              `flex items-center py-2 px-4 rounded ${isActive ? 'bg-blue-600' : 'hover:bg-gray-700'}`
            }
            onClick={() => setIsSidebarOpen(false)}
          >
            <FaTags className="mr-3" />
            Categories
          </NavLink>
          <NavLink
            to="/admin/products"
            className={({ isActive }) =>
              `flex items-center py-2 px-4 rounded ${isActive ? 'bg-blue-600' : 'hover:bg-gray-700'}`
            }
            onClick={() => setIsSidebarOpen(false)}
          >
            <FaBox className="mr-3" />
            Products
          </NavLink>
          <NavLink
            to="/admin/customers"
            className={({ isActive }) =>
              `flex items-center py-2 px-4 rounded ${isActive ? 'bg-blue-600' : 'hover:bg-gray-700'}`
            }
            onClick={() => setIsSidebarOpen(false)}
          >
            <FaUsers className="mr-3" />
            Customers
          </NavLink>
          <NavLink
            to="/admin/company-info"
            className={({ isActive }) =>
              `flex items-center py-2 px-4 rounded ${isActive ? 'bg-blue-600' : 'hover:bg-gray-700'}`
            }
            onClick={() => setIsSidebarOpen(false)}
          >
            <FaBuilding className="mr-3" />
            Company Info
          </NavLink>
          <NavLink
            to="/admin/profile"
            className={({ isActive }) =>
              `flex items-center py-2 px-4 rounded ${isActive ? 'bg-blue-600' : 'hover:bg-gray-700'}`
            }
            onClick={() => setIsSidebarOpen(false)}
          >
            <FaUser className="mr-3" />
            Profile
          </NavLink>
          <button
            onClick={handleLogout}
            className="w-full text-left py-2 px-4 rounded hover:bg-red-600 flex items-center"
          >
            <FaSignOutAlt className="mr-3" />
            Logout
          </button>
        </nav>
      </aside>

      {/* Main Content – Scrolls independently */}
      <div className="flex-1 flex flex-col">
        {/* Header with Hamburger */}
        <header className="bg-white shadow-sm p-4 lg:p-8 flex items-center justify-between  sticky top-0 z-10 lg:z-0">
          <div className="flex items-center">
            <button
              onClick={toggleSidebar}
              className="lg:hidden mr-4 text-gray-700 hover:text-gray-900"
            >
              <FaBars size={20} />
            </button>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 capitalize">
              Welcome, {userInfo?.name || 'Admin'}
            </h1>
          </div>
          {/* Add any other header elements here if needed */}
        </header>
        <main className="flex-1 p-1 lg:p-2 overflow-y-auto">
          <Outlet /> {/* Render nested admin routes */}
        </main>
      </div>
    </div>
  );
}