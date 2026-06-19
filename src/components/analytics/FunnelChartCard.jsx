import React from 'react';
import { FunnelChart, Funnel, Tooltip, ResponsiveContainer, Cell, LabelList } from 'recharts';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { name, value } = payload[0].payload;
    return (
      <div className="bg-white dark:bg-gray-800 p-3 border border-slate-200 dark:border-slate-700 rounded-lg shadow-sm">
        <p className="font-semibold text-slate-800 dark:text-slate-200">{name}</p>
        <p className="text-slate-600 dark:text-slate-400">{value} Leads</p>
      </div>
    );
  }
  return null;
};

const FunnelChartCard = ({ data }) => {
  const colors = [
    '#3B82F6', // New (Primary Blue)
    '#60A5FA', // Contacted
    '#93C5FD', // Meeting
    '#C4B5FD', // Proposal
    '#22C55E'  // Won (Success Green)
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm hover:shadow-md transition-all h-[400px] flex flex-col">
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Sales Funnel</h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Lead progression through pipeline stages</p>
      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <FunnelChart>
            <Tooltip content={<CustomTooltip />} />
            <Funnel
              dataKey="value"
              data={data}
              isAnimationActive
            >
              <LabelList position="right" fill="#475569" stroke="none" dataKey="name" />
              <LabelList position="center" fill="#fff" stroke="none" dataKey="value" />
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Funnel>
          </FunnelChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default React.memo(FunnelChartCard);
