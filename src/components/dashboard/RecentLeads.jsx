import { useNavigate } from 'react-router-dom';
import StatusBadge from '../leads/StatusBadge';

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
  const navigate = useNavigate();
  const recentLeads = [...leads].slice(0, 5);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
      <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">Recent Leads</h3>
        <button 
          onClick={() => navigate('/leads')}
          className="text-sm text-blue-600 font-medium hover:text-blue-700 transition-colors"
        >
          View All
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-900 border-b border-slate-100 dark:border-slate-700">
              <th className="py-3 px-6 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Name</th>
              <th className="py-3 px-6 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Company</th>
              <th className="py-3 px-6 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Status</th>
              <th className="py-3 px-6 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Date Added</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {recentLeads.map((lead) => (
              <tr key={lead.id} className="hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-700 transition-colors group">
                <td className="py-4 px-6 text-sm font-medium text-slate-800 dark:text-slate-200 dark:group-hover:text-white transition-colors">{lead.name}</td>
                <td className="py-4 px-6 text-sm text-slate-600 dark:text-slate-400 dark:group-hover:text-white transition-colors">{lead.company}</td>
                <td className="py-4 px-6">
                  <StatusBadge status={lead.status} />
                </td>
                <td className="py-4 px-6 text-sm text-slate-500 dark:text-slate-400 dark:group-hover:text-white transition-colors">
                  {lead.createdAt 
                    ? new Date(lead.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                    : lead.dateAdded}
                </td>
              </tr>
            ))}
            {recentLeads.length === 0 && (
              <tr>
                <td colSpan="4" className="py-8 text-center text-slate-500 dark:text-slate-400 text-sm">
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
