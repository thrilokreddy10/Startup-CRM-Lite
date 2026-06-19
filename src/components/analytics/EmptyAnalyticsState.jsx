import React from 'react';
import { BarChart3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const EmptyAnalyticsState = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-white dark:bg-gray-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm mt-6">
      <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-full mb-4">
        <BarChart3 size={48} className="text-slate-400 dark:text-slate-500" />
      </div>
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No analytics available yet</h3>
      <p className="text-slate-500 dark:text-slate-400 max-w-md mb-6">
        Add your first lead to start tracking business performance, viewing conversion metrics, and forecasting revenue.
      </p>
      <button 
        onClick={() => navigate('/leads')}
        className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
      >
        Add Lead
      </button>
    </div>
  );
};

export default React.memo(EmptyAnalyticsState);
