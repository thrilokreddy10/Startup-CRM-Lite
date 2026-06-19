import React from 'react';
import { Zap, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const SalesVelocityCard = ({ velocity, velocityGrowth }) => {
  const isPositive = velocityGrowth >= 0;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm hover:shadow-md transition-all h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Sales Velocity</h3>
        <div className="p-2 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 rounded-lg">
          <Zap size={20} />
        </div>
      </div>
      
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Estimated revenue generated per day based on current win rates and sales cycles.</p>
      
      <div className="flex items-end gap-4 mb-2">
        <h4 className="text-3xl font-bold text-slate-900 dark:text-white">₹{velocity.toLocaleString()}</h4>
        <span className="text-slate-500 dark:text-slate-400 font-medium pb-1">/day</span>
      </div>
      
      <div className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-100 dark:border-slate-700">
        <div className={`flex items-center text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {isPositive ? <ArrowUpRight size={16} className="mr-1" /> : <ArrowDownRight size={16} className="mr-1" />}
          {Math.abs(velocityGrowth)}%
        </div>
        <span className="text-sm text-slate-500 dark:text-slate-400">vs previous period</span>
      </div>
    </div>
  );
};

export default React.memo(SalesVelocityCard);
