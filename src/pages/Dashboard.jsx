import React, { useState, useEffect } from 'react';
import { Users, DollarSign, Target, Activity, AlertCircle } from 'lucide-react';
import StatsCard from '../components/dashboard/StatsCard';
import PipelineOverview from '../components/dashboard/PipelineOverview';
import RecentLeads from '../components/dashboard/RecentLeads';
import QuickActions from '../components/dashboard/QuickActions';
import { useLeads } from '../context/LeadContext';
import { leadService } from '../services/leadService';

/**
 * Main Dashboard page component assembling all dashboard widgets.
 * 
 * @returns {JSX.Element}
 */
const Dashboard = () => {
  const { leads } = useLeads();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await leadService.getLeadStats();
        
        // leadService returns response.data from axios, so it should be the JSON payload
        if (response && response.success && response.data) {
          setStats(response.data);
        } else {
          // Fallback just in case the structure is different
          setStats(response || {
            totalLeads: 0,
            wonLeads: 0,
            lostLeads: 0,
            conversionRate: 0,
          });
        }
      } catch (err) {
        console.error("Failed to fetch dashboard stats:", err);
        setError("Unable to load dashboard statistics. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, []);

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

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-lg flex items-center gap-3">
            <AlertCircle className="w-5 h-5" />
            <p>{error}</p>
          </div>
        )}

        {/* Stats Row: 1 col on mobile, 2 on tablet, 4 on desktop */}
        {!loading && !error && stats && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatsCard
              title="Total Leads"
              value={stats.totalLeads?.toString() || "0"}
              icon={Users}
              color="primary"
            />
            <StatsCard
              title="Win Rate"
              value={`${stats.conversionRate || 0}%`}
              icon={Target}
              color="success"
            />
            <StatsCard
              title="Won Leads"
              value={stats.wonLeads?.toString() || "0"}
              icon={DollarSign}
              color="success"
            />
            <StatsCard
              title="Lost Leads"
              value={stats.lostLeads?.toString() || "0"}
              icon={Activity}
              color="warning"
            />
          </div>
        )}

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
