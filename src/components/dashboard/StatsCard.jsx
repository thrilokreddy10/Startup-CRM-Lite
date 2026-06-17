import React from 'react';

/**
 * @typedef {Object} StatsCardProps
 * @property {string} title - The title of the statistic
 * @property {string|number} value - The main numerical value to display
 * @property {React.ElementType} icon - The Lucide React icon component
 * @property {number} change - The percentage change compared to the previous period
 * @property {string} color - Tailwind CSS color class base ('primary', 'success', 'warning', 'danger')
 */

/**
 * A card component that displays a key statistic with an icon and percentage change.
 * 
 * @param {StatsCardProps} props
 * @returns {JSX.Element}
 */
const StatsCard = ({ title, value, icon: Icon, change, color }) => {
  const isPositive = change >= 0;
  
  const colorMap = {
    primary: 'text-blue-600 bg-blue-100',
    success: 'text-green-600 bg-green-100',
    warning: 'text-amber-500 bg-amber-100',
    danger: 'text-red-500 bg-red-100'
  };

  const iconClasses = colorMap[color] || 'text-gray-600 bg-gray-100';

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-slate-500 text-sm font-medium">{title}</h3>
        <div className={`p-2 rounded-lg ${iconClasses}`}>
          <Icon size={20} />
        </div>
      </div>
      <div className="flex items-baseline gap-2 mb-2">
        <span className="text-3xl font-bold text-slate-800">{value}</span>
      </div>
      <div className="mt-auto">
        <span className={`text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-500'}`}>
          {isPositive ? '+' : ''}{change}%
        </span>
        <span className="text-sm text-slate-500 ml-2">vs last month</span>
      </div>
    </div>
  );
};

export default StatsCard;
