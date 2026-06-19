// Import React to create the component
// Import Link component from React Router for client-side navigation
import { Link } from 'react-router-dom';

// Define the NotFound functional component to display when a route doesn't match
const NotFound = () => {
  // Render the 404 UI
  return (
    // Center all content both vertically and horizontally within the full screen height
    <div className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 text-center">
      {/* Large stylized '404' text acting as the main visual element */}
      <h1 className="text-9xl font-black text-blue-100 tracking-tighter">404</h1>
      
      {/* Secondary heading indicating what the error is */}
      <h2 className="text-4xl font-bold text-gray-900 dark:text-white mt-4 mb-3">Page Not Found</h2>
      
      {/* Friendly descriptive text explaining why the user might be seeing this page */}
      <p className="text-lg text-gray-600 dark:text-gray-400 dark:text-gray-400 mb-8 max-w-md">
        Oops! The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      
      {/* Navigation link to guide the user back to a safe route (the dashboard) */}
      <Link 
        to="/" 
        // Tailwind styling for a prominent button-like link
        className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-semibold shadow-lg hover:shadow-xl"
      >
        Return to Dashboard
      </Link>
    </div>
  );
};

// Export the NotFound component to be used in the routing configuration
export default NotFound;
