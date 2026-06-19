// Import React and useState hook for managing the mobile sidebar open/close state
import { useState } from 'react';
// Import NavLink for routing
import { NavLink } from 'react-router-dom';
// Import icons from lucide-react for visual enhancement
import { LayoutDashboard, Users, BarChart2, Menu, X } from 'lucide-react';
import DarkModeToggle from './common/DarkModeToggle';

// Define the Sidebar component
const Sidebar = () => {
  // State to control whether the sidebar is open on mobile devices
  const [isOpen, setIsOpen] = useState(false);

  // Define navigation items with corresponding icons
  const navItems = [
    { name: 'Dashboard', path: '/', icon: <LayoutDashboard className="w-5 h-5" /> },
    { name: 'Leads', path: '/leads', icon: <Users className="w-5 h-5" /> },
    { name: 'Analytics', path: '/analytics', icon: <BarChart2 className="w-5 h-5" /> },
  ];

  // Function to toggle the mobile sidebar state
  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Mobile Top Header: Visible only on small screens (hidden on md and up) */}
      <div className="md:hidden flex items-center justify-between bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3 z-20 shadow-sm relative transition-colors duration-200">
        <div className="flex items-center">
          <span className="text-xl font-black text-blue-600 dark:text-blue-500 tracking-tight">
            CRM <span className="text-gray-900 dark:text-white font-light">Lite</span>
          </span>
        </div>
        {/* Hamburger button to open/close the mobile sidebar */}
        <button
          onClick={toggleSidebar}
          className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none transition-colors p-1"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Overlay for mobile: Displays a dark background when the sidebar is open */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-gray-900 bg-opacity-50 z-30 transition-opacity"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar Container
          - Mobile: Fixed position, slides in from the left (using -translate-x-full when closed).
          - Desktop (md+): Static flex item, always visible, taking up fixed width.
      */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 shadow-xl md:shadow-none transform transition-all duration-300 ease-in-out flex flex-col
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
          md:relative md:translate-x-0
        `}
      >
        {/* Sidebar Header (Logo area) */}
        <div className="h-16 flex items-center px-6 border-b border-gray-100 dark:border-gray-700 hidden md:flex transition-colors duration-200">
          <span className="text-2xl font-black text-blue-600 dark:text-blue-500 tracking-tight cursor-pointer">
            STARTUP CRM <span className="text-gray-900 dark:text-white font-light">Lite</span>
          </span>
        </div>

        {/* Navigation Links List */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              // Close the sidebar on mobile whenever a link is clicked
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 group ${isActive
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-200/50 dark:shadow-none'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-white'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {/* Icon wrapper - color adapts based on active state */}
                  <span className={`mr-3 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-blue-600'}`}>
                    {item.icon}
                  </span>
                  {item.name}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Optional User Profile / Bottom section */}
        <div className="p-4 border-t border-gray-100 dark:border-gray-700 transition-colors duration-200">
          <div className="flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl transition-colors duration-200">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-sm">
                U
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900 dark:text-white">User</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Admin</p>
              </div>
            </div>
            <DarkModeToggle />
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
