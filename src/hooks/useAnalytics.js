import { useState, useMemo } from 'react';
import { useLeads } from '../context/LeadContext';
import * as helpers from '../utils/analyticsHelpers';

export const useAnalytics = () => {
  const { leads } = useLeads();
  const [timeRange, setTimeRange] = useState('30d'); // '7d', '30d', '90d', '1y', 'all'

  const filteredLeads = useMemo(() => {
    if (!leads || timeRange === 'all') return leads || [];
    
    const now = new Date();
    const rangeMap = {
      '7d': 7 * 24 * 60 * 60 * 1000,
      '30d': 30 * 24 * 60 * 60 * 1000,
      '90d': 90 * 24 * 60 * 60 * 1000,
      '1y': 365 * 24 * 60 * 60 * 1000,
    };
    
    const cutoff = new Date(now.getTime() - rangeMap[timeRange]);
    
    return leads.filter(lead => {
      const created = new Date(lead.createdAt);
      return created >= cutoff;
    });
  }, [leads, timeRange]);

  // Previous period calculation for growth metrics
  const previousPeriodLeads = useMemo(() => {
    if (!leads || timeRange === 'all') return [];
    
    const now = new Date();
    const rangeMap = {
      '7d': 7 * 24 * 60 * 60 * 1000,
      '30d': 30 * 24 * 60 * 60 * 1000,
      '90d': 90 * 24 * 60 * 60 * 1000,
      '1y': 365 * 24 * 60 * 60 * 1000,
    };
    
    const currentStart = new Date(now.getTime() - rangeMap[timeRange]);
    const previousStart = new Date(currentStart.getTime() - rangeMap[timeRange]);
    
    return leads.filter(lead => {
      const created = new Date(lead.createdAt);
      return created >= previousStart && created < currentStart;
    });
  }, [leads, timeRange]);

  // Memoized metrics
  const totalLeads = filteredLeads.length;
  const prevTotalLeads = previousPeriodLeads.length;
  const leadGrowth = prevTotalLeads > 0 
    ? Math.round(((totalLeads - prevTotalLeads) / prevTotalLeads) * 100) 
    : (totalLeads > 0 ? 100 : 0);

  const wonLeads = filteredLeads.filter(l => l.status === 'Won').length;
  const conversionRate = totalLeads > 0 ? Math.round((wonLeads / totalLeads) * 100) : 0;
  
  const pipelineValue = helpers.getPipelineValue(filteredLeads);
  const wonRevenue = helpers.getWonRevenue(filteredLeads);
  const avgSalesCycle = helpers.getAverageSalesCycle(filteredLeads);
  const lostRate = helpers.getLostRate(filteredLeads);

  // Memoized chart data
  const statusDistribution = useMemo(() => helpers.getStatusDistribution(filteredLeads), [filteredLeads]);
  const monthlyLeads = useMemo(() => helpers.getMonthlyLeads(filteredLeads), [filteredLeads]);
  const conversionByMonth = useMemo(() => helpers.getConversionByMonth(filteredLeads), [filteredLeads]);
  const revenueByMonth = useMemo(() => helpers.getRevenueByMonth(filteredLeads), [filteredLeads]);
  const leadSourceStats = useMemo(() => helpers.getLeadSourceStats(filteredLeads), [filteredLeads]);
  const funnelData = useMemo(() => helpers.getFunnelData(filteredLeads), [filteredLeads]);
  
  const salesVelocity = useMemo(() => helpers.getSalesVelocity(filteredLeads), [filteredLeads]);
  const prevSalesVelocity = useMemo(() => helpers.getSalesVelocity(previousPeriodLeads), [previousPeriodLeads]);
  const velocityGrowth = prevSalesVelocity > 0 
    ? Math.round(((salesVelocity - prevSalesVelocity) / prevSalesVelocity) * 100) 
    : (salesVelocity > 0 ? 100 : 0);

  const forecastRevenue = useMemo(() => helpers.getForecastRevenue(filteredLeads), [filteredLeads]);
  const topPerformers = useMemo(() => helpers.getTopPerformers(filteredLeads), [filteredLeads]);
  const heatmapData = useMemo(() => helpers.getActivityHeatmapData(filteredLeads), [filteredLeads]);

  return {
    timeRange,
    setTimeRange,
    metrics: {
      totalLeads,
      leadGrowth,
      conversionRate,
      pipelineValue,
      wonRevenue,
      avgSalesCycle,
      lostRate,
      salesVelocity,
      velocityGrowth,
      forecastRevenue
    },
    charts: {
      statusDistribution,
      monthlyLeads,
      conversionByMonth,
      revenueByMonth,
      leadSourceStats,
      funnelData,
      topPerformers,
      heatmapData
    },
    hasData: leads && leads.length > 0
  };
};
