import React from 'react';

const AnalyticsFilters = ({ timeRange, setTimeRange }) => {
  const options = [
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
    { value: '90d', label: 'Last 90 Days' },
    { value: '1y', label: 'This Year' },
    { value: 'all', label: 'All Time' },
  ];

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => setTimeRange(opt.value)}
          className={`px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap transition-colors ${
            timeRange === opt.value
              ? 'bg-blue-600 text-white shadow-sm'
              : 'bg-white dark:bg-gray-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
};

export default React.memo(AnalyticsFilters);
