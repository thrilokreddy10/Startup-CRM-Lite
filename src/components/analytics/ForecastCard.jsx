import React from 'react';
import { TrendingUp, Info } from 'lucide-react';

const ForecastCard = ({ forecastRevenue }) => {
  return (
    <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl border border-blue-500 p-6 shadow-md h-full text-white">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Revenue Forecast</h3>
        <div className="p-2 bg-blue-500/30 rounded-lg">
          <TrendingUp size={20} />
        </div>
      </div>
      
      <p className="text-blue-100 text-sm mb-6 max-w-[200px]">Projected revenue for the next 30 days based on historical trends.</p>
      
      <div className="mt-auto pt-6">
        <p className="text-sm font-medium text-blue-200 mb-1">Predicted Revenue</p>
        <h4 className="text-4xl font-bold">₹{forecastRevenue.toLocaleString()}</h4>
      </div>
      
      <div className="flex items-center gap-2 mt-6 text-xs text-blue-200 bg-blue-900/20 p-3 rounded-lg">
        <Info size={14} className="shrink-0" />
        <p>Forecast confidence is currently at 85% based on recent pipeline stability.</p>
      </div>
    </div>
  );
};

export default React.memo(ForecastCard);
