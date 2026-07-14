import React from 'react';

const ActivityHeatmap = ({ data }) => {
  // Simplified heatmap: show last 30 days of activity
  const days = 30;
  const today = new Date();
  const calendar = [];
  
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    
    const dayData = data.find(x => x.date === dateStr);
    const count = dayData ? dayData.count : 0;
    
    calendar.push({
      date: dateStr,
      count,
      intensity: count === 0 ? 0 : count < 3 ? 1 : count < 6 ? 2 : count < 10 ? 3 : 4
    });
  }

  const getColor = (intensity) => {
    switch(intensity) {
      case 0: return 'bg-slate-100';
      case 1: return 'bg-blue-200';
      case 2: return 'bg-blue-400';
      case 3: return 'bg-blue-600';
      case 4: return 'bg-blue-800';
      default: return 'bg-slate-100';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm hover:shadow-md transition-all h-full">
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Activity Heatmap</h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Lead creation and update volume over the last 30 days</p>
      
      <div className="flex flex-wrap gap-2">
        {calendar.map((day) => (
          <div 
            key={day.date}
            title={`${day.count} activities on ${new Date(day.date).toLocaleDateString()}`}
            className={`w-6 h-6 rounded-sm ${getColor(day.intensity)} transition-colors cursor-pointer hover:ring-2 ring-slate-300`}
          />
        ))}
      </div>
      
      <div className="flex items-center gap-2 mt-6 text-xs text-slate-500 dark:text-slate-400 justify-end">
        <span>Less</span>
        <div className="flex gap-1">
          <div className="w-3 h-3 rounded-sm bg-slate-100" />
          <div className="w-3 h-3 rounded-sm bg-blue-200" />
          <div className="w-3 h-3 rounded-sm bg-blue-400" />
          <div className="w-3 h-3 rounded-sm bg-blue-600" />
          <div className="w-3 h-3 rounded-sm bg-blue-800" />
        </div>
        <span>More</span>
      </div>
    </div>
  );
};

export default React.memo(ActivityHeatmap);
