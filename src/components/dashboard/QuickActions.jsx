import { Plus, Users, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useLeads } from '../../context/LeadContext';

/**
 * Component providing quick access to common actions.
 * 
 * @returns {JSX.Element}
 */
const QuickActions = () => {
  const navigate = useNavigate();
  const { leads } = useLeads();

  const handleExport = () => {
    if (!leads || leads.length === 0) {
      toast.error('No leads available to export');
      return;
    }
    
    const headers = ['Name', 'Company', 'Email', 'Phone', 'Status', 'Source', 'Date Added'];
    const csvContent = [
      headers.join(','),
      ...leads.map(l => [
        `"${l.name || ''}"`,
        `"${l.company || ''}"`,
        `"${l.email || ''}"`,
        `"${l.phone || ''}"`,
        `"${l.status || ''}"`,
        `"${l.source || ''}"`,
        `"${new Date(l.createdAt || Date.now()).toLocaleDateString()}"`
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'startup-crm-leads.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Leads exported successfully');
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 p-6 h-full flex flex-col justify-center">
      <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">Quick Actions</h3>
      <div className="grid grid-cols-1 gap-3">
        <button 
          onClick={() => navigate('/leads', { state: { action: 'add' } })}
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors shadow-sm w-full"
        >
          <Plus size={18} />
          <span>Add New Lead</span>
        </button>
        <button 
          onClick={() => navigate('/leads')}
          className="flex items-center justify-center gap-2 bg-white dark:bg-gray-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 dark:hover:text-white py-3 px-4 rounded-lg font-medium transition-colors shadow-sm w-full"
        >
          <Users size={18} />
          <span>View All Leads</span>
        </button>
        <button 
          onClick={handleExport}
          className="flex items-center justify-center gap-2 bg-white dark:bg-gray-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 dark:hover:text-white py-3 px-4 rounded-lg font-medium transition-colors shadow-sm w-full"
        >
          <Download size={18} />
          <span>Export Data</span>
        </button>
      </div>
    </div>
  );
};

export default QuickActions;
