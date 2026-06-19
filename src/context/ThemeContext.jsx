/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const ThemeContext = createContext();

/**
 * Provider component for Theme context
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @returns {JSX.Element}
 */
export const ThemeProvider = ({ children }) => {
  // Use local storage custom hook for dark mode, defaulting to false
  const [isDarkMode, setIsDarkMode] = useLocalStorage('startup-crm-theme', false);

  useEffect(() => {
    // Only apply/remove the DOM class, no need to touch localStorage here
    // since useLocalStorage handles saving the value automatically.
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  /**
   * Toggles the current theme between light and dark mode
   */
  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

/**
 * Custom hook to use the Theme context
 * @returns {{ isDarkMode: boolean, toggleTheme: Function }}
 * @throws {Error} If used outside of ThemeProvider
 */
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeContext;
