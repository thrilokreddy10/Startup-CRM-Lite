import { createContext, useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { leadService } from '../services/leadService';

const LeadContext = createContext();

export const LeadProvider = ({ children }) => {
  const [leads, setLeads] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pagination, setPagination] = useState({ page: 1, limit: 20, total: 0, pages: 0 });

  const fetchLeads = async (params = {}) => {
    setIsLoading(true);
    try {
      const res = await leadService.getLeads(params);
      if (res.success) {
        setLeads(res.data);
        setPagination(res.pagination);
      }
    } catch (error) {
      const msg = error.response?.data?.message || 'Failed to fetch leads';
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const addLead = async (leadData) => {
    try {
      const res = await leadService.createLead(leadData);
      if (res.success) {
        // Optimistic update
        setLeads((prev) => [res.data, ...prev]);
        toast.success('Lead created successfully!');
      }
    } catch (error) {
      const msg = error.response?.data?.message || 'Failed to create lead';
      toast.error(msg);
      throw error;
    }
  };

  const updateLead = async (id, updatedData) => {
    try {
      const res = await leadService.updateLead(id, updatedData);
      if (res.success) {
        setLeads((prev) => prev.map((lead) => (lead._id === id || lead.id === id ? res.data : lead)));
        toast.success('Lead updated successfully!');
      }
    } catch (error) {
      const msg = error.response?.data?.message || 'Failed to update lead';
      toast.error(msg);
      throw error;
    }
  };

  const updateLeadStatus = async (id, status) => {
    try {
      const res = await leadService.updateLeadStatus(id, status);
      if (res.success) {
        setLeads((prev) => prev.map((lead) => (lead._id === id || lead.id === id ? res.data : lead)));
        toast.success('Status updated successfully!');
      }
    } catch (error) {
      const msg = error.response?.data?.message || 'Failed to update status';
      toast.error(msg);
      throw error;
    }
  };

  const deleteLead = async (id) => {
    try {
      const res = await leadService.deleteLead(id);
      if (res.success) {
        setLeads((prev) => prev.filter((lead) => lead._id !== id && lead.id !== id));
        toast.success('Lead deleted successfully!');
      }
    } catch (error) {
      const msg = error.response?.data?.message || 'Failed to delete lead';
      toast.error(msg);
      throw error;
    }
  };

  const getLeadById = (id) => {
    return leads.find((lead) => lead._id === id || lead.id === id);
  };

  return (
    <LeadContext.Provider value={{ 
      leads, 
      isLoading, 
      pagination, 
      fetchLeads, 
      addLead, 
      updateLead, 
      updateLeadStatus, 
      deleteLead, 
      getLeadById 
    }}>
      {children}
    </LeadContext.Provider>
  );
};

export const useLeads = () => {
  const context = useContext(LeadContext);
  if (context === undefined) {
    throw new Error('useLeads must be used within a LeadProvider');
  }
  return context;
};

export default LeadContext;
