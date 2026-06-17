import React from 'react';

/**
 * @typedef {Object} Lead
 * @property {string} id - Lead ID
 * @property {string} name - Lead name
 * @property {string} company - Lead company
 * @property {string} status - Lead status
 * @property {string} dateAdded - Date lead was added
 */

/**
 * @typedef {Object} RecentLeadsProps
 * @property {Lead[]} leads - Array of lead objects
 */

/**
 * Displays a table of the 5 most recently added leads.
 * 
 * @param {RecentLeadsProps} props
 * @returns {JSX.Element}
 */
const RecentLeads = ({ leads }) => {
  const recentLeads = [...leads].slice(0, 5);

  const getStatusBadgeClass = (status) => {
    switch(status) {
      case 'New': return 'bg-blue-100 text-blue-700';
      case 'Contacted': return 'bg-indigo-100 text-indigo-700';
      case 'Qualified': return 'bg-amber-100 text-amber-700';
      case 'Proposal': return 'bg-orange-100 text-orange-700';
      case 'Won': return 'bg-green-100 text-green-700';
      case 'Lost': return 'bg-red-100 text-red-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="p-6 border-b border-slate-100 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-slate-800">Recent Leads</h3>
        <button className="text-sm text-blue-600 font-medium hover:text-blue-700 transition-colors">
          View All
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              <th className="py-3 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Name</th>
              <th className="py-3 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Company</th>
              <th className="py-3 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
              <th className="py-3 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Date Added</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {recentLeads.map((lead) => (
              <tr key={lead.id} className="hover:bg-slate-50 transition-colors">
                <td className="py-4 px-6 text-sm font-medium text-slate-800">{lead.name}</td>
                <td className="py-4 px-6 text-sm text-slate-600">{lead.company}</td>
                <td className="py-4 px-6">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(lead.status)}`}>
                    {lead.status}
                  </span>
                </td>
                <td className="py-4 px-6 text-sm text-slate-500">{lead.dateAdded}</td>
              </tr>
            ))}
            {recentLeads.length === 0 && (
              <tr>
                <td colSpan="4" className="py-8 text-center text-slate-500 text-sm">
                  No recent leads found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentLeads;
