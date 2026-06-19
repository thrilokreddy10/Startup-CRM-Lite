import React from 'react';
import { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, Sector } from 'recharts';
import { STATUS_COLORS } from '../../constants/analyticsColors';

const renderActiveShape = (props) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;
  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 8}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
    </g>
  );
};

const CustomTooltip = ({ active, payload, totalLeads }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const percent = totalLeads > 0 ? Math.round((data.value / totalLeads) * 100) : 0;
    return (
      <div className="bg-white dark:bg-gray-800 p-3 border border-slate-200 dark:border-slate-700 rounded-lg shadow-sm z-50">
        <p className="font-semibold text-slate-800 dark:text-slate-200">{data.name}</p>
        <p className="text-slate-600 dark:text-slate-400">{data.value} Leads</p>
        <p className="text-slate-500 dark:text-slate-400 text-sm">
          {percent}%
        </p>
      </div>
    );
  }
  return null;
};

const PieChartCard = ({ data, totalLeads }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  const renderLegend = (props) => {
    const { payload } = props;
    return (
      <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-8">
        {payload.map((entry, index) => {
          const percent = totalLeads > 0 ? Math.round((entry.payload.value / totalLeads) * 100) : 0;
          return (
            <li key={`item-${index}`} className="flex items-center text-sm">
              <span 
                className="w-3 h-3 rounded-full mr-2" 
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-slate-600 dark:text-slate-400 mr-1">{entry.value}:</span>
              <span className="font-medium text-slate-800 dark:text-slate-200">{entry.payload.value} ({percent}%)</span>
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm hover:shadow-md transition-all h-[450px] flex flex-col">
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">Lead Status Distribution</h3>
      <div className="flex-1 relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            {/* Perfectly centered text using strict SVG positioning matching the Pie cx/cy */}
            <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle">
              <tspan x="50%" dy="-5" fontSize="36" fontWeight="bold" fill="#64748b">{totalLeads}</tspan>
              <tspan x="50%" dy="24" fontSize="12" fill="#64748b" fontWeight="600" className="uppercase tracking-wide">TOTAL LEADS</tspan>
            </text>
            
            <Pie
              activeIndex={activeIndex}
              activeShape={renderActiveShape}
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={110}
              paddingAngle={2}
              dataKey="value"
              onMouseEnter={onPieEnter}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={STATUS_COLORS[entry.name] || '#94A3B8'} />
              ))}
            </Pie>
            
            <Tooltip content={<CustomTooltip totalLeads={totalLeads} />} />
            <Legend 
              content={renderLegend} 
              layout="horizontal" 
              verticalAlign="bottom" 
              align="center" 
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default React.memo(PieChartCard);
