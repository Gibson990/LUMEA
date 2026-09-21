import React from 'react';
import { LifeBuoy, CheckCircle2, Clock, MessageSquare, AlertCircle } from 'lucide-react';
import { useNotification } from '../context/NotificationContext';

export default function AdminSupport({ tickets, onTicketStatusChange }) {
  const { addToast } = useNotification();

  const handleStatusUpdate = (ticketId, newStatus) => {
    onTicketStatusChange(ticketId, newStatus);
    addToast(`Ticket status updated to ${newStatus}`, 'success');
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Open':
        return 'bg-rose-100 text-rose-800 border-rose-300';
      case 'In Progress':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'Resolved':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="glass-panel p-6 rounded-3xl space-y-1">
        <div className="flex items-center space-x-2 text-xs font-bold text-[#D96C8A]">
          <LifeBuoy className="w-4 h-4" />
          <span>Customer Support Desk</span>
        </div>
        <h3 className="font-serif text-xl font-bold text-[#2B2024]">Support Tickets & Inquiry Resolutions</h3>
        <p className="text-xs text-[#6e5f65]">
          Sub-Admins and Admins can review customer tickets, modify status, and resolve customer issues.
        </p>
      </div>

      {/* Tickets List */}
      <div className="space-y-4">
        {tickets.length === 0 ? (
          <div className="glass-card p-12 text-center text-[#6e5f65] text-xs">
            No support tickets currently recorded.
          </div>
        ) : (
          tickets.map((t) => (
            <div key={t.id} className="glass-card p-6 rounded-3xl space-y-4">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#F4D8DF] pb-3 gap-2">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-serif font-bold text-base text-[#D96C8A]">{t.ticket_code}</span>
                    {t.order_code && (
                      <span className="text-[10px] bg-white border border-[#F4D8DF] px-2 py-0.5 rounded font-bold text-[#2B2024]">
                        Order: {t.order_code}
                      </span>
                    )}
                  </div>
                  <h4 className="font-bold text-sm text-[#2B2024] mt-1">{t.subject}</h4>
                  <span className="text-xs text-[#6e5f65]">From: {t.customer_email}</span>
                </div>

                <div className="flex items-center space-x-3">
                  <select
                    value={t.status}
                    onChange={(e) => handleStatusUpdate(t.id, e.target.value)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold border focus:outline-none ${getStatusBadge(t.status)}`}
                  >
                    <option value="Open">Open</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                  </select>
                </div>
              </div>

              {/* Message Body */}
              <div className="bg-white/80 p-4 rounded-2xl border border-[#F4D8DF] text-xs text-[#2B2024]">
                <p className="leading-relaxed">{t.message}</p>
              </div>

              <div className="flex justify-between items-center text-[10px] text-[#6e5f65]">
                <span>Submitted: {new Date(t.created_at).toLocaleDateString()}</span>
                <span className="font-semibold">Assigned to: Support Team</span>
              </div>

            </div>
          ))
        )}
      </div>

    </div>
  );
}
