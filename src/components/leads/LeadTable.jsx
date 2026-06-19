import { Pencil, Trash2 } from 'lucide-react';
import StatusBadge from './StatusBadge';

/**
 * Table view showing all leads.
 * @param {{ leads: array, onEdit: function, onDelete: function }} props 
 */
const LeadTable = ({ leads, onEdit, onDelete }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700">
              <th className="py-3 px-6 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Name</th>
              <th className="py-3 px-6 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Company</th>
              <th className="py-3 px-6 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Status</th>
              <th className="py-3 px-6 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Email</th>
              <th className="py-3 px-6 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Source</th>
              <th className="py-3 px-6 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Date Added</th>
              <th className="py-3 px-6 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-8">LeadID</th>
              <th className="py-3 px-6 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {leads.length === 0 ? (
              <tr>
                <td colSpan="7" className="py-8 text-center text-slate-500 dark:text-slate-400">No leads found.</td>
              </tr>
            ) : (
              leads.map((lead) => (
                <tr key={lead.id} className="hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-700 transition-colors group">
                  <td className="py-4 px-6 text-sm font-medium text-slate-800 dark:text-slate-200 dark:group-hover:text-white transition-colors">{lead.name}</td>
                  <td className="py-4 px-6 text-sm text-slate-600 dark:text-slate-400 dark:group-hover:text-white transition-colors">{lead.company}</td>
                  <td className="py-4 px-6"><StatusBadge status={lead.status} /></td>
                  <td className="py-4 px-6 text-sm text-slate-600 dark:text-slate-400 dark:group-hover:text-white transition-colors">{lead.email}</td>
                  <td className="py-4 px-6 text-sm text-slate-600 dark:text-slate-400 dark:group-hover:text-white transition-colors">{lead.source}</td>
                  <td className="py-4 px-6 text-sm text-slate-500 dark:text-slate-400 dark:group-hover:text-white transition-colors">
                    {lead.createdAt 
                      ? new Date(lead.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                      : lead.dateAdded}
                  </td>
                  <td className="py-4 px-6 text-sm text-slate-600 dark:text-slate-400 dark:group-hover:text-white transition-colors">{lead.id}</td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => onEdit(lead)}
                        className="p-1.5 text-slate-400 dark:text-slate-500 hover:text-blue-600 rounded transition-colors"
                        aria-label={`Edit ${lead.name}`}
                      >
                        <Pencil size={16} />
                      </button>
                      <button 
                        onClick={() => onDelete(lead.id)}
                        className="p-1.5 text-slate-400 dark:text-slate-500 hover:text-red-600 rounded transition-colors"
                        aria-label={`Delete ${lead.name}`}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeadTable;
