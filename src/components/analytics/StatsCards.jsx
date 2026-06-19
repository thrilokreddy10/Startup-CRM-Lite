import React from 'react';
import { Users, Target, DollarSign, Activity, Clock, TrendingDown } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, change, suffix = '', prefix = '' }) => {
  const isPositive = change >= 0;
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">{title}</p>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
            {prefix}{value}{suffix}
          </h3>
        </div>
        <div className={`p-3 rounded-lg ${isPositive ? 'bg-green-50 dark:bg-green-900/20 text-green-600' : 'bg-red-50 dark:bg-red-900/20 text-red-600'}`}>
          <Icon size={20} />
        </div>
      </div>
      {change !== undefined && (
        <div className="mt-4 flex items-center gap-2">
          <span className={`text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {isPositive ? '+' : ''}{change}%
          </span>
          <span className="text-sm text-slate-500 dark:text-slate-400">vs last period</span>
        </div>
      )}
    </div>
  );
};

const StatsCards = ({ metrics }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
      <StatCard 
        title="Total Leads" 
        value={metrics.totalLeads} 
        change={metrics.leadGrowth} 
        icon={Users} 
      />
      <StatCard 
        title="Conversion Rate" 
        value={metrics.conversionRate} 
        suffix="%" 
        icon={Target} 
      />
      <StatCard 
        title="Pipeline Value" 
        value={metrics.pipelineValue.toLocaleString()} 
        prefix="₹" 
        icon={Activity} 
      />
      <StatCard 
        title="Won Revenue" 
        value={metrics.wonRevenue.toLocaleString()} 
        prefix="₹" 
        icon={DollarSign} 
      />
      <StatCard 
        title="Avg Sales Cycle" 
        value={metrics.avgSalesCycle} 
        suffix=" Days" 
        icon={Clock} 
      />
      <StatCard 
        title="Lost Rate" 
        value={metrics.lostRate} 
        suffix="%" 
        icon={TrendingDown} 
      />
    </div>
  );
};

export default React.memo(StatsCards);
