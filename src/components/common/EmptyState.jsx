import React from 'react';
import { SearchX, FolderOpen } from 'lucide-react';

const EmptyState = ({ totalLeadsCount, onClearFilters }) => {
  if (totalLeadsCount === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 bg-white rounded-xl border border-slate-200 shadow-sm col-span-full">
        <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mb-4">
          <FolderOpen size={32} />
        </div>
        <h3 className="text-lg font-semibold text-slate-800 mb-2">No leads yet</h3>
        <p className="text-slate-500 text-center max-w-sm mb-6">
          You don't have any leads in the system yet. Add your first lead to get started!
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 bg-white rounded-xl border border-slate-200 shadow-sm col-span-full">
      <div className="w-16 h-16 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center mb-4">
        <SearchX size={32} />
      </div>
      <h3 className="text-lg font-semibold text-slate-800 mb-2">No leads found</h3>
      <p className="text-slate-500 text-center max-w-sm mb-6">
        We couldn't find any leads matching your current search and filter criteria.
      </p>
      <button
        onClick={onClearFilters}
        className="text-blue-600 hover:text-blue-700 font-medium text-sm hover:underline transition-all"
      >
        Clear filters
      </button>
    </div>
  );
};

export default EmptyState;
