// Import the React library, necessary for defining React components
import React from 'react';
// Import BrowserRouter from react-router-dom to enable routing functionality.
// It uses the HTML5 history API to keep the application's UI in sync with the URL.
import { BrowserRouter } from 'react-router-dom';
// Import the unified routing configuration we set up in the routes directory
import AppRoutes from './routes';

// Define the root App component
function App() {
  // Render the root structure of the application
  return (
    // Wrap the entire application tree with BrowserRouter.
    // This provides the routing context required by any routing hooks or components (like Routes, Route, Link, NavLink) 
    // used anywhere deeper in the component tree.
    <BrowserRouter>
      {/* Render the actual routes and layout defined in our routes component */}
      <AppRoutes />
    </BrowserRouter>
  );
}

// Export the App component as the default export so it can be mounted in main.jsx
export default App;
