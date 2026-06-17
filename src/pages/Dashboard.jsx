import React from 'react';
import { Users, DollarSign, Target, Activity } from 'lucide-react';
import StatsCard from '../components/dashboard/StatsCard';
import PipelineOverview from '../components/dashboard/PipelineOverview';
import RecentLeads from '../components/dashboard/RecentLeads';
import QuickActions from '../components/dashboard/QuickActions';

/**
 * Main Dashboard page component assembling all dashboard widgets.
 * Uses sample data for the initial implementation.
 * 
 * @returns {JSX.Element}
 */
const Dashboard = () => {
  // Sample data to be replaced with real data in Phase 8
  const sampleLeads = [
    { id: '1', name: 'John Doe', company: 'Acme Corp', status: 'New', dateAdded: 'Oct 24, 2023' },
    { id: '2', name: 'Jane Smith', company: 'TechStart', status: 'Contacted', dateAdded: 'Oct 23, 2023' },
    { id: '3', name: 'Bob Johnson', company: 'Global Ind.', status: 'Qualified', dateAdded: 'Oct 21, 2023' },
    { id: '4', name: 'Alice Williams', company: 'Design Co', status: 'Proposal', dateAdded: 'Oct 19, 2023' },
    { id: '5', name: 'Charlie Brown', company: 'Logistics LLC', status: 'Won', dateAdded: 'Oct 18, 2023' },
    { id: '6', name: 'Eva Davis', company: 'CloudNet', status: 'New', dateAdded: 'Oct 15, 2023' },
    { id: '7', name: 'Frank Miller', company: 'DataSys', status: 'Contacted', dateAdded: 'Oct 14, 2023' },
    { id: '8', name: 'Grace Wilson', company: 'AI Solutions', status: 'Lost', dateAdded: 'Oct 10, 2023' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
            <p className="text-slate-500 text-sm mt-1">Welcome back! Here's what's happening with your leads today.</p>
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
            <PipelineOverview leads={sampleLeads} />
          </div>
          <div className="lg:col-span-1">
            <QuickActions />
          </div>
        </div>

        {/* Recent Leads Table */}
        <div className="grid grid-cols-1">
          <RecentLeads leads={sampleLeads} />
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
