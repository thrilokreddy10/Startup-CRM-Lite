import { useAnalytics } from '../hooks/useAnalytics';
import AnalyticsFilters from '../components/analytics/AnalyticsFilters';
import StatsCards from '../components/analytics/StatsCards';
import PieChartCard from '../components/analytics/PieChartCard';
import FunnelChartCard from '../components/analytics/FunnelChartCard';
import BarChartCard from '../components/analytics/BarChartCard';
import LineChartCard from '../components/analytics/LineChartCard';
import RevenueChartCard from '../components/analytics/RevenueChartCard';
import LeadSourceChart from '../components/analytics/LeadSourceChart';
import SalesVelocityCard from '../components/analytics/SalesVelocityCard';
import ForecastCard from '../components/analytics/ForecastCard';
import ActivityHeatmap from '../components/analytics/ActivityHeatmap';
import TopPerformersCard from '../components/analytics/TopPerformersCard';
import EmptyAnalyticsState from '../components/analytics/EmptyAnalyticsState';
import { BarChart3 } from 'lucide-react';

const Analytics = () => {
  const { timeRange, setTimeRange, metrics, charts, hasData } = useAnalytics();

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header & Filters */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 bg-white dark:bg-gray-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
              <BarChart3 size={24} />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Analytics Dashboard</h1>
          </div>
          <p className="text-slate-500 dark:text-slate-400">Track sales performance and growth trends.</p>
        </div>
        <div className="overflow-hidden">
          <AnalyticsFilters timeRange={timeRange} setTimeRange={setTimeRange} />
        </div>
      </div>

      {!hasData ? (
        <EmptyAnalyticsState />
      ) : (
        <div className="animate-in fade-in duration-500 space-y-6">
          {/* KPI Summary Section */}
          <StatsCards metrics={metrics} />

          {/* Main Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <PieChartCard data={charts.statusDistribution} totalLeads={metrics.totalLeads} />
            <FunnelChartCard data={charts.funnelData} />
            
            <BarChartCard data={charts.monthlyLeads} />
            <LineChartCard data={charts.conversionByMonth} />
            
            <RevenueChartCard data={charts.revenueByMonth} />
            <LeadSourceChart data={charts.leadSourceStats} />
            
            {/* Advanced Widgets Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:col-span-2">
              <ActivityHeatmap data={charts.heatmapData} />
              <TopPerformersCard data={charts.topPerformers} />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:col-span-2">
              <ForecastCard forecastRevenue={metrics.forecastRevenue} />
              <SalesVelocityCard velocity={metrics.salesVelocity} velocityGrowth={metrics.velocityGrowth} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Analytics;
