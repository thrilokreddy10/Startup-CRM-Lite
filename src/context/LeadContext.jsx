/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { sampleLeads } from '../data/sampleLeads';

/**
 * Shape of the Lead object
 * @typedef {Object} Lead
 * @property {string} id - Unique identifier for the lead
 * @property {string} name - Full name of the lead
 * @property {string} company - Company name
 * @property {string} email - Email address
 * @property {string} phone - Phone number
 * @property {'New' | 'Contacted' | 'Meeting Scheduled' | 'Proposal Sent' | 'Won' | 'Lost'} status - Current status of the lead
 * @property {'Website' | 'Referral' | 'LinkedIn' | 'Cold Call' | 'Email Campaign' | 'Other'} source - Source of the lead
 * @property {string} createdAt - ISO date string of when the lead was created
 */

const LeadContext = createContext();

/**
 * Provider component for Lead context
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @returns {JSX.Element}
 */
export const LeadProvider = ({ children }) => {
  // Use local storage custom hook, with sample leads as initial data
  const [leads, setLeads] = useLocalStorage('startup-crm-leads', sampleLeads);

  /**
   * Adds a new lead
   * @param {Omit<Lead, 'id' | 'createdAt'>} leadData - The lead data to add
   */
  const addLead = (leadData) => {
    const newLead = {
      ...leadData,
      id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    setLeads((prev) => [newLead, ...prev]);
  };

  /**
   * Updates an existing lead
   * @param {string} id - The ID of the lead to update
   * @param {Partial<Lead>} updatedData - The new data for the lead
   */
  const updateLead = (id, updatedData) => {
    setLeads((prev) => prev.map((lead) => (lead.id === id ? { ...lead, ...updatedData } : lead)));
  };

  /**
   * Deletes a lead by ID
   * @param {string} id - The ID of the lead to delete
   */
  const deleteLead = (id) => {
    setLeads((prev) => prev.filter((lead) => lead.id !== id));
  };

  /**
   * Retrieves a lead by ID
   * @param {string} id - The ID of the lead
   * @returns {Lead | undefined} The lead object or undefined if not found
   */
  const getLeadById = (id) => {
    return leads.find((lead) => lead.id === id);
  };

  return (
    <LeadContext.Provider value={{ leads, addLead, updateLead, deleteLead, getLeadById }}>
      {children}
    </LeadContext.Provider>
  );
};

/**
 * Custom hook to use the Lead context
 * @returns {{ leads: Lead[], addLead: Function, updateLead: Function, deleteLead: Function, getLeadById: Function }}
 * @throws {Error} If used outside of LeadProvider
 */
export const useLeads = () => {
  const context = useContext(LeadContext);
  if (context === undefined) {
    throw new Error('useLeads must be used within a LeadProvider');
  }
  return context;
};

export default LeadContext;
