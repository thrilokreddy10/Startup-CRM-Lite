// Import React and tools for lazy loading components
import React, { lazy, Suspense } from 'react';
// Import routing components from React Router v6
import { Routes, Route } from 'react-router-dom';

// Import the new responsive Sidebar component
import Sidebar from '../components/Sidebar';

// Dynamically import the page components using React.lazy for code splitting.
const Dashboard = lazy(() => import('../pages/Dashboard'));
const Leads = lazy(() => import('../pages/Leads'));
const Analytics = lazy(() => import('../pages/Analytics'));
const NotFound = lazy(() => import('../pages/NotFound'));

// Define the AppRoutes component responsible for all routing logic
const AppRoutes = () => {
  return (
    // Wrap the entire application in a flex container that spans the screen's height.
    // 'md:flex-row' ensures side-by-side layout on desktop, and 'flex-col' keeps it stacked on mobile (topbar + content).
    <div className="flex flex-col md:flex-row h-screen bg-gray-50 font-sans text-gray-900 overflow-hidden">

      {/* Sidebar handles both the mobile top header and the sliding/fixed side navigation */}
      <Sidebar />

      {/* Main content area that will expand to fill available space and allow scrolling */}
      <main className="flex-1 overflow-y-auto w-full relative">
        <Suspense
          fallback={
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/leads" element={<Leads />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
};

// Export the AppRoutes component to be included in App.jsx
export default AppRoutes;
