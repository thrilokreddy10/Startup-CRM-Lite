import { useState, useMemo, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Plus, LayoutGrid, List, ArrowUpDown } from 'lucide-react';
import { Toaster, toast } from 'react-hot-toast';
import LeadTable from '../components/leads/LeadTable';
import LeadCard from '../components/leads/LeadCard';
import LeadForm from '../components/leads/LeadForm';
import SearchBar from '../components/common/SearchBar';
import FilterBar from '../components/common/FilterBar';
import EmptyState from '../components/common/EmptyState';

import { useLeads } from '../context/LeadContext';


/**
 * Main Leads page component.
 * Manages the state for leads, modal, and view mode, along with search, filter, and sort functionality.
 */
const Leads = () => {
  const { leads, addLead, updateLead, deleteLead } = useLeads();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'card'

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.action === 'add') {
      setIsModalOpen(true);
      // Clean up the state so it doesn't reopen if the user refreshes
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

  // Search, Filter, and Sort State
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [sortBy, setSortBy] = useState('dateAdded');
  const [sortOrder, setSortOrder] = useState('desc');

  // Derived state: filtered and sorted leads
  const filteredLeads = useMemo(() => {
    return leads
      .filter(lead => activeFilter === 'All' || lead.status === activeFilter)
      .filter(lead =>
        lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .sort((a, b) => {
        let valA = a[sortBy];
        let valB = b[sortBy];
        
        // Convert dates to timestamps for comparison
        if (sortBy === 'dateAdded' || sortBy === 'createdAt') {
          valA = new Date(valA || a.createdAt || a.dateAdded || 0).getTime();
          valB = new Date(valB || b.createdAt || b.dateAdded || 0).getTime();
        } else {
          valA = String(valA).toLowerCase();
          valB = String(valB).toLowerCase();
        }

        if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
        if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
        return 0;
      });
  }, [leads, searchQuery, activeFilter, sortBy, sortOrder]);

  const handleOpenModal = (lead = null) => {
    setSelectedLead(lead);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedLead(null);
    setIsModalOpen(false);
  };

  const handleSubmit = (leadData) => {
    if (selectedLead) {
      // Edit mode
      updateLead(selectedLead.id, leadData);
      toast.success('Lead updated successfully!', { duration: 3000, position: 'bottom-right' });
    } else {
      // Create mode
      addLead(leadData);
      toast.success('Lead created successfully!', { duration: 3000, position: 'bottom-right' });
    }
    handleCloseModal();
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this lead?')) {
      deleteLead(id);
      toast.error('Lead deleted', { duration: 3000, position: 'bottom-right' });
    }
  };

  const toggleSortOrder = () => {
    setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-4 md:p-8">
      <Toaster />
      
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-200">Leads</h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Manage and track your sales leads.</p>
          </div>
          
          <div className="flex items-center gap-3">
            {/* View Toggle */}
            <div className="hidden sm:flex items-center bg-white dark:bg-gray-800 border border-slate-200 dark:border-slate-700 rounded-lg p-1">
              <button 
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded-md ${viewMode === 'table' ? 'bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50'}`}
                aria-label="Table view"
              >
                <List size={18} />
              </button>
              <button 
                onClick={() => setViewMode('card')}
                className={`p-1.5 rounded-md ${viewMode === 'card' ? 'bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50'}`}
                aria-label="Card view"
              >
                <LayoutGrid size={18} />
              </button>
            </div>
            
            <button 
              onClick={() => handleOpenModal()}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-sm"
            >
              <Plus size={18} />
              <span>Add Lead</span>
            </button>
          </div>
        </div>

        {/* Toolbar: Search, Filter, Sort */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 flex flex-col gap-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <SearchBar value={searchQuery} onChange={setSearchQuery} />

            {/* Sort Options */}
            <div className="flex items-center gap-2 w-full lg:w-auto justify-end">
              <span className="text-sm text-slate-500 dark:text-slate-400 hidden sm:inline-block">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800"
              >
                <option value="createdAt">Date Added</option>
                <option value="name">Name</option>
                <option value="company">Company</option>
                <option value="status">Status</option>
              </select>
              <button 
                onClick={toggleSortOrder}
                className="p-2 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400 transition-colors"
                title={sortOrder === 'asc' ? 'Ascending' : 'Descending'}
              >
                <ArrowUpDown size={16} className={sortOrder === 'asc' ? 'rotate-180 transition-transform' : 'transition-transform'} />
              </button>
            </div>
          </div>
          
          <div className="border-t border-slate-100 dark:border-slate-700 pt-4">
            <FilterBar activeFilter={activeFilter} onFilterChange={setActiveFilter} leads={leads} />
          </div>
        </div>

        {/* Content Section */}
        <div className="block sm:hidden">
          {/* Always show cards on mobile */}
          <div className="grid grid-cols-1 gap-4">
            {filteredLeads.length > 0 ? (
              filteredLeads.map(lead => (
                <LeadCard key={lead.id} lead={lead} onEdit={handleOpenModal} onDelete={handleDelete} />
              ))
            ) : (
              <EmptyState totalLeadsCount={leads.length} onClearFilters={() => { setSearchQuery(''); setActiveFilter('All'); }} />
            )}
          </div>
        </div>
        
        <div className="hidden sm:block">
          {/* Desktop view depends on viewMode toggle */}
          {viewMode === 'table' ? (
            filteredLeads.length > 0 ? (
              <LeadTable leads={filteredLeads} onEdit={handleOpenModal} onDelete={handleDelete} />
            ) : (
              <EmptyState totalLeadsCount={leads.length} onClearFilters={() => { setSearchQuery(''); setActiveFilter('All'); }} />
            )
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredLeads.length > 0 ? (
                filteredLeads.map(lead => (
                  <LeadCard key={lead.id} lead={lead} onEdit={handleOpenModal} onDelete={handleDelete} />
                ))
              ) : (
                <EmptyState totalLeadsCount={leads.length} onClearFilters={() => { setSearchQuery(''); setActiveFilter('All'); }} />
              )}
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center sticky top-0 bg-white dark:bg-gray-800 z-10">
              <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200">
                {selectedLead ? 'Edit Lead' : 'Add New Lead'}
              </h2>
              <button 
                onClick={handleCloseModal}
                className="text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:text-slate-400 p-1"
                aria-label="Close modal"
              >
                &times;
              </button>
            </div>
            <div className="p-6">
              <LeadForm 
                initialData={selectedLead} 
                onSubmit={handleSubmit} 
                onCancel={handleCloseModal} 
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Leads;
