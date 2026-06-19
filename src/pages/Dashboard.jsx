import { Users, DollarSign, Target, Activity } from 'lucide-react';
import StatsCard from '../components/dashboard/StatsCard';
import PipelineOverview from '../components/dashboard/PipelineOverview';
import RecentLeads from '../components/dashboard/RecentLeads';
import QuickActions from '../components/dashboard/QuickActions';
import { useLeads } from '../context/LeadContext';

/**
 * Main Dashboard page component assembling all dashboard widgets.
 * Uses sample data for the initial implementation.
 * 
 * @returns {JSX.Element}
 */
const Dashboard = () => {
  const { leads } = useLeads();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-200">Dashboard</h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Welcome back! Here's what's happening with your leads today.</p>
          </div>
        </div>

        {/* Stats Row: 1 col on mobile, 2 on tablet, 4 on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total Leads"
            value="1,284"
            icon={Users}
            change={12.5}
            color="primary"
          />
          <StatsCard
            title="Win Rate"
            value="75.2%"
            icon={Target}
            change={4.1}
            color="success"
          />
          <StatsCard
            title="Active Proposals"
            value="42"
            icon={Activity}
            change={-2.4}
            color="warning"
          />
          <StatsCard
            title="Revenue Pipeline"
            value="$1.2M"
            icon={DollarSign}
            change={8.2}
            color="success"
          />
        </div>

        {/* Pipeline & Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <PipelineOverview leads={leads} />
          </div>
          <div className="lg:col-span-1">
            <QuickActions />
          </div>
        </div>

        <div className="grid grid-cols-1">
          <RecentLeads leads={leads} />
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
