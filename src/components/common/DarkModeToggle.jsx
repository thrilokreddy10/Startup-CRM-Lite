import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const DarkModeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative inline-flex items-center justify-center p-2 rounded-full transition-colors duration-200 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white focus:outline-none"
      aria-label="Toggle Dark Mode"
      title="Toggle Dark Mode"
    >
      <div className="relative w-6 h-6 flex items-center justify-center">
        {/* Sun Icon for Light Mode (Visible when Dark Mode is OFF) */}
        <Sun
          className={`absolute inset-0 w-6 h-6 transition-all duration-300 transform ${
            isDarkMode ? 'opacity-0 rotate-90 scale-50' : 'opacity-100 rotate-0 scale-100'
          }`}
        />
        {/* Moon Icon for Dark Mode (Visible when Dark Mode is ON) */}
        <Moon
          className={`absolute inset-0 w-6 h-6 transition-all duration-300 transform ${
            isDarkMode ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-50'
          }`}
        />
      </div>
    </button>
  );
};

export default DarkModeToggle;
