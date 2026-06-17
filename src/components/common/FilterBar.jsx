import React from 'react';

const FilterBar = ({ activeFilter, onFilterChange, leads }) => {
  const filters = ['All', 'New', 'Contacted', 'Meeting Scheduled', 'Proposal Sent', 'Won', 'Lost'];

  const getCount = (filter) => {
    if (filter === 'All') return leads.length;
    return leads.filter(lead => lead.status === filter).length;
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      {filters.map(filter => {
        const isActive = activeFilter === filter;
        return (
          <button
            key={filter}
            onClick={() => onFilterChange(filter)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 flex items-center ${
              isActive 
                ? 'bg-blue-600 text-white shadow-sm' 
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {filter} <span className={`ml-1.5 text-xs ${isActive ? 'text-blue-100' : 'text-slate-400'}`}>({getCount(filter)})</span>
          </button>
        );
      })}
    </div>
  );
};

export default FilterBar;
