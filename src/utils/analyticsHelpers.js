/**
 * Utility functions for advanced analytics computations.
 */

const getMonthKey = (dateString) => {
  if (!dateString) return null;
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return null;
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
};

const formatMonthLabel = (monthKey) => {
  if (!monthKey) return '';
  const [year, month] = monthKey.split('-');
  const date = new Date(parseInt(year), parseInt(month) - 1, 1);
  return date.toLocaleString('default', { month: 'short' });
};

export const getStatusDistribution = (leads) => {
  if (!leads || !leads.length) return [];
  const counts = leads.reduce((acc, lead) => {
    const status = lead.status || 'Other';
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});

  return Object.keys(counts).map(status => ({
    name: status,
    value: counts[status]
  })).sort((a, b) => b.value - a.value);
};

export const getMonthlyLeads = (leads) => {
  if (!leads || !leads.length) return [];
  
  const monthlyData = leads.reduce((acc, lead) => {
    const monthKey = getMonthKey(lead.createdAt);
    if (!monthKey) return acc;
    if (!acc[monthKey]) acc[monthKey] = 0;
    acc[monthKey] += 1;
    return acc;
  }, {});

  // Get last 6 months keys
  const last6Months = [];
  const now = new Date();
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    last6Months.push(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`);
  }

  return last6Months.map(key => ({
    month: formatMonthLabel(key),
    leads: monthlyData[key] || 0
  }));
};

export const getConversionByMonth = (leads) => {
  if (!leads || !leads.length) return [];
  
  const monthlyData = leads.reduce((acc, lead) => {
    const monthKey = getMonthKey(lead.createdAt);
    if (!monthKey) return acc;
    if (!acc[monthKey]) acc[monthKey] = { total: 0, won: 0 };
    acc[monthKey].total += 1;
    if (lead.status === 'Won') {
      acc[monthKey].won += 1;
    }
    return acc;
  }, {});

  const last6Months = [];
  const now = new Date();
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    last6Months.push(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`);
  }

  return last6Months.map(key => {
    const data = monthlyData[key] || { total: 0, won: 0 };
    const rate = data.total > 0 ? Math.round((data.won / data.total) * 100) : 0;
    return {
      month: formatMonthLabel(key),
      conversionRate: rate
    };
  });
};

export const getRevenueByMonth = (leads) => {
  if (!leads || !leads.length) return [];
  
  const wonLeads = leads.filter(l => l.status === 'Won' && l.value > 0);
  
  const monthlyData = wonLeads.reduce((acc, lead) => {
    const monthKey = getMonthKey(lead.wonAt || lead.createdAt);
    if (!monthKey) return acc;
    if (!acc[monthKey]) acc[monthKey] = 0;
    acc[monthKey] += (lead.value || 0);
    return acc;
  }, {});

  const last6Months = [];
  const now = new Date();
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    last6Months.push(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`);
  }

  return last6Months.map(key => ({
    month: formatMonthLabel(key),
    revenue: monthlyData[key] || 0
  }));
};

export const getPipelineValue = (leads) => {
  if (!leads || !leads.length) return 0;
  return leads
    .filter(l => !['Won', 'Lost'].includes(l.status))
    .reduce((sum, l) => sum + (Number(l.value) || 0), 0);
};

export const getWonRevenue = (leads) => {
  if (!leads || !leads.length) return 0;
  return leads
    .filter(l => l.status === 'Won')
    .reduce((sum, l) => sum + (Number(l.value) || 0), 0);
};

export const getAverageSalesCycle = (leads) => {
  const wonLeads = leads.filter(l => l.status === 'Won' && l.wonAt && l.createdAt);
  if (!wonLeads.length) return 0;
  
  const totalDays = wonLeads.reduce((sum, l) => {
    const start = new Date(l.createdAt);
    const end = new Date(l.wonAt);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return sum + diffDays;
  }, 0);
  
  return Math.round(totalDays / wonLeads.length);
};

export const getLostRate = (leads) => {
  if (!leads || !leads.length) return 0;
  const lostLeads = leads.filter(l => l.status === 'Lost').length;
  return Math.round((lostLeads / leads.length) * 100);
};

export const getLeadSourceStats = (leads) => {
  if (!leads || !leads.length) return [];
  const counts = leads.reduce((acc, lead) => {
    const source = lead.source || 'Other';
    acc[source] = (acc[source] || 0) + 1;
    return acc;
  }, {});

  return Object.keys(counts)
    .map(source => ({ name: source, value: counts[source] }))
    .sort((a, b) => b.value - a.value);
};

export const getFunnelData = (leads) => {
  if (!leads || !leads.length) return [];
  
  const stages = ['New', 'Contacted', 'Meeting Scheduled', 'Proposal Sent', 'Won'];
  // Refined calculation
  return stages.map((stage, idx) => {
     let count = leads.filter(l => {
         let s = l.status;
         if (s === 'Meeting') s = 'Meeting Scheduled';
         if (s === 'Proposal') s = 'Proposal Sent';
         const sIdx = stages.indexOf(s);
         // If a lead is in a stage further down, it passed through this stage
         return sIdx >= idx;
     }).length;

     // Add lost leads to earlier stages (they dropped out)
     // A simple assumption: lost leads dropped out at 'New'
     if (idx === 0) {
         count += leads.filter(l => l.status === 'Lost').length;
     }

     return {
         name: stage.replace(' Scheduled', '').replace(' Sent', ''),
         value: count
     };
  });
};

export const getSalesVelocity = (leads) => {
  const wonLeads = leads.filter(l => l.status === 'Won');
  if (!leads.length || !wonLeads.length) return 0;

  const totalOpps = leads.length;
  const winRate = wonLeads.length / leads.length;
  const avgDealSize = wonLeads.reduce((sum, l) => sum + (Number(l.value) || 0), 0) / wonLeads.length;
  const salesCycle = getAverageSalesCycle(leads) || 1;

  // (Opportunities * Win Rate * Avg Deal Size) / Sales Cycle
  const velocity = (totalOpps * winRate * avgDealSize) / salesCycle;
  return Math.round(velocity);
};

export const getForecastRevenue = (leads) => {
  if (!leads || !leads.length) return 0;
  
  // Simple forecast: Average monthly won revenue over the last 3-6 months
  const revByMonth = getRevenueByMonth(leads);
  const totalRev = revByMonth.reduce((sum, item) => sum + item.revenue, 0);
  
  return Math.round(totalRev / (revByMonth.length || 1));
};

export const getTopPerformers = (leads) => {
  if (!leads || !leads.length) return [];
  const wonLeads = leads.filter(l => l.status === 'Won');
  
  const repStats = wonLeads.reduce((acc, lead) => {
    const owner = lead.owner || 'Unassigned';
    if (!acc[owner]) acc[owner] = 0;
    acc[owner] += (Number(lead.value) || 0);
    return acc;
  }, {});

  return Object.keys(repStats)
    .map(owner => ({ name: owner, revenue: repStats[owner] }))
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5); // top 5
};

export const getActivityHeatmapData = (leads) => {
  if (!leads || !leads.length) return [];
  
  // Group activities by date
  const dateCounts = leads.reduce((acc, lead) => {
    const cDate = lead.createdAt ? lead.createdAt.split('T')[0] : null;
    if (cDate) {
      acc[cDate] = (acc[cDate] || 0) + 1;
    }
    return acc;
  }, {});

  return Object.keys(dateCounts).map(date => ({
    date,
    count: dateCounts[date]
  })).sort((a, b) => new Date(a.date) - new Date(b.date));
};
