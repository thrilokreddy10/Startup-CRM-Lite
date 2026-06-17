import React from 'react';
import { Plus, Users, Download } from 'lucide-react';

/**
 * Component providing quick access to common actions.
 * 
 * @returns {JSX.Element}
 */
const QuickActions = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 h-full flex flex-col justify-center">
      <h3 className="text-lg font-semibold text-slate-800 mb-4">Quick Actions</h3>
      <div className="grid grid-cols-1 gap-3">
        <button className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors shadow-sm w-full">
          <Plus size={18} />
          <span>Add New Lead</span>
        </button>
        <button className="flex items-center justify-center gap-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 py-3 px-4 rounded-lg font-medium transition-colors shadow-sm w-full">
          <Users size={18} />
          <span>View All Leads</span>
        </button>
        <button className="flex items-center justify-center gap-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 py-3 px-4 rounded-lg font-medium transition-colors shadow-sm w-full">
          <Download size={18} />
          <span>Export Data</span>
        </button>
      </div>
    </div>
  );
};

export default QuickActions;
