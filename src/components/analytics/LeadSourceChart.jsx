import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { SOURCE_COLORS } from '../../constants/analyticsColors';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-gray-800 p-3 border border-slate-200 dark:border-slate-700 rounded-lg shadow-sm">
        <p className="font-semibold text-slate-800 dark:text-slate-200">{label}</p>
        <p className="text-slate-600 dark:text-slate-400 font-medium">{payload[0].value} Leads</p>
      </div>
    );
  }
  return null;
};

const LeadSourceChart = ({ data }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm hover:shadow-md transition-all h-[400px] flex flex-col">
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">Lead Source Analytics</h3>
      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ top: 0, right: 20, left: 20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E2E8F0" />
            <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} />
            <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} width={100} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'var(--chart-cursor)' }} />
            <Bar dataKey="value" radius={[0, 4, 4, 0]} animationDuration={1000}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={SOURCE_COLORS[entry.name] || '#64748B'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default React.memo(LeadSourceChart);
