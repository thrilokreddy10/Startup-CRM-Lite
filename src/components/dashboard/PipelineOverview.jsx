import React from 'react';

/**
 * @typedef {Object} Lead
 * @property {string} id - Lead ID
 * @property {string} name - Lead name
 * @property {string} company - Lead company
 * @property {string} status - Lead status (New, Contacted, Qualified, Proposal, Won, Lost)
 * @property {string} dateAdded - Date lead was added
 */

/**
 * @typedef {Object} PipelineOverviewProps
 * @property {Lead[]} leads - Array of lead objects
 */

/**
 * Component that displays a horizontal bar chart visualizing the leads pipeline by status.
 * 
 * @param {PipelineOverviewProps} props
 * @returns {JSX.Element}
 */
const PipelineOverview = ({ leads }) => {
  const statuses = [
    { label: 'New', color: 'bg-blue-500' },
    { label: 'Contacted', color: 'bg-indigo-500' },
    { label: 'Qualified', color: 'bg-amber-500' },
    { label: 'Proposal', color: 'bg-orange-500' },
    { label: 'Won', color: 'bg-green-500' }
  ];

  const pipelineLeads = leads.filter(l => l.status !== 'Lost');
  const total = pipelineLeads.length || 1;

  const getStatusCount = (statusName) => {
    return pipelineLeads.filter(l => l.status === statusName).length;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 h-full flex flex-col justify-center">
      <h3 className="text-lg font-semibold text-slate-800 mb-6">Pipeline Overview</h3>
      
      {/* Horizontal Bar */}
      <div className="h-6 flex rounded-full overflow-hidden mb-8 bg-slate-100">
        {statuses.map(status => {
          const count = getStatusCount(status.label);
          const percentage = (count / total) * 100;
          if (percentage === 0) return null;
          return (
            <div 
              key={status.label} 
              className={`h-full ${status.color} transition-all duration-500`}
              style={{ width: `${percentage}%` }}
              title={`${status.label}: ${count} (${percentage.toFixed(1)}%)`}
            />
          );
        })}
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {statuses.map(status => {
          const count = getStatusCount(status.label);
          return (
            <div key={status.label} className="flex flex-col items-center p-3 bg-slate-50 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <span className={`w-3 h-3 rounded-full ${status.color}`} />
                <span className="text-sm font-medium text-slate-600">{status.label}</span>
              </div>
              <span className="text-2xl font-bold text-slate-800">{count}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PipelineOverview;
