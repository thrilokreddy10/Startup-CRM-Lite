import React from 'react';
import { Pencil, Trash2, Mail, Phone, Building } from 'lucide-react';
import StatusBadge from './StatusBadge';

/**
 * Card view of a single lead.
 * @param {{ lead: object, onEdit: function, onDelete: function }} props 
 */
const LeadCard = ({ lead, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-800">{lead.name}</h3>
          <div className="flex items-center gap-2 text-slate-600 mt-1">
            <Building size={14} />
            <span className="text-sm">{lead.company}</span>
          </div>
        </div>
        <StatusBadge status={lead.status} />
      </div>
      
      <div className="space-y-2 mb-6">
        <div className="flex items-center gap-2 text-slate-600 text-sm">
          <Mail size={14} className="text-slate-400" />
          <a href={`mailto:${lead.email}`} className="hover:text-blue-600 truncate">{lead.email}</a>
        </div>
        {lead.phone && (
          <div className="flex items-center gap-2 text-slate-600 text-sm">
            <Phone size={14} className="text-slate-400" />
            <a href={`tel:${lead.phone}`} className="hover:text-blue-600">{lead.phone}</a>
          </div>
        )}
      </div>
      
      <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100">
        <button 
          onClick={() => onEdit(lead)}
          className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          aria-label={`Edit ${lead.name}`}
        >
          <Pencil size={18} />
        </button>
        <button 
          onClick={() => onDelete(lead.id)}
          className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          aria-label={`Delete ${lead.name}`}
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};

export default LeadCard;
