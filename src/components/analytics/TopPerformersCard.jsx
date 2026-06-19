import React from 'react';
import { Trophy, Medal, Award } from 'lucide-react';

const TopPerformersCard = ({ data }) => {
  const getRankIcon = (index) => {
    switch(index) {
      case 0: return <Trophy size={20} className="text-yellow-500" />;
      case 1: return <Medal size={20} className="text-slate-400 dark:text-slate-500" />;
      case 2: return <Award size={20} className="text-amber-600" />;
      default: return <span className="text-sm font-bold text-slate-400 dark:text-slate-500 w-5 text-center">{index + 1}</span>;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm hover:shadow-md transition-all h-full">
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">Top Performers</h3>
      
      <div className="space-y-4">
        {data.length > 0 ? (
          data.map((rep, index) => (
            <div key={rep.name} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-900 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-8 flex justify-center">
                  {getRankIcon(index)}
                </div>
                <div>
                  <h4 className="font-medium text-slate-900 dark:text-white">{rep.name}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Sales Representative</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-slate-900 dark:text-white">₹{rep.revenue.toLocaleString()}</p>
                <p className="text-xs text-green-600 font-medium">Won Revenue</p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-slate-500 dark:text-slate-400 py-8">
            No top performers found yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(TopPerformersCard);
