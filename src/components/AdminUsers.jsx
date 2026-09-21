import React, { useState } from 'react';
import { UserCheck, UserPlus, Trash2, ShieldCheck, ShieldAlert, Sparkles, User } from 'lucide-react';
import { useNotification } from '../context/NotificationContext';

export default function AdminUsers({ users, onUserRoleChange, onAddUser, onDeleteUser, currentUserRole }) {
  const { addToast } = useNotification();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'subadmin', password: 'demo' });

  const isSuperAdmin = currentUserRole === 'admin';

  const handleRoleToggle = (user) => {
    if (!isSuperAdmin) {
      addToast('Only Super-Admins can promote users to Sub-Admin.', 'error');
      return;
    }
    const targetRole = user.role === 'subadmin' ? 'customer' : 'subadmin';
    onUserRoleChange(user.id, targetRole);
    addToast(`Updated ${user.name}'s role to ${targetRole.toUpperCase()}`, 'success');
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newUser.name || !newUser.email) return;
    onAddUser(newUser);
    addToast(`User ${newUser.name} created as ${newUser.role.toUpperCase()}`, 'success');
    setNewUser({ name: '', email: '', role: 'subadmin', password: 'demo' });
    setShowAddForm(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 glass-panel p-6 rounded-3xl">
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold text-[#D96C8A]">
            <Sparkles className="w-4 h-4" />
            <span>Account Roles & Permissions</span>
          </div>
          <h3 className="font-serif text-xl font-bold text-[#2B2024] mt-1">User Roster & Sub-Admin Promotion</h3>
          <p className="text-xs text-[#6e5f65]">
            Promote registered customers to Sub-Admin to grant support desk and order fulfillment management rights.
          </p>
        </div>

        {isSuperAdmin && (
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-[#D96C8A] hover:bg-[#c45775] text-white font-bold py-2.5 px-4 rounded-2xl text-xs shadow-md transition-all flex items-center space-x-2 flex-shrink-0"
          >
            <UserPlus className="w-4 h-4" />
            <span>Add New User</span>
          </button>
        )}
      </div>

      {/* Add User Modal/Form */}
      {showAddForm && (
        <form onSubmit={handleAddSubmit} className="glass-card p-6 rounded-3xl space-y-4 text-xs animate-fade-in">
          <h4 className="font-bold text-sm text-[#2B2024]">Add User Account</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-[#6e5f65] font-semibold mb-1">Full Name</label>
              <input
                type="text"
                required
                value={newUser.name}
                onChange={e => setNewUser({ ...newUser, name: e.target.value })}
                placeholder="Name"
                className="w-full p-2.5 rounded-xl border border-[#F4D8DF] bg-white focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[#6e5f65] font-semibold mb-1">Email</label>
              <input
                type="email"
                required
                value={newUser.email}
                onChange={e => setNewUser({ ...newUser, email: e.target.value })}
                placeholder="Email"
                className="w-full p-2.5 rounded-xl border border-[#F4D8DF] bg-white focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[#6e5f65] font-semibold mb-1">Role Assignment</label>
              <select
                value={newUser.role}
                onChange={e => setNewUser({ ...newUser, role: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-[#F4D8DF] bg-white focus:outline-none font-bold"
              >
                <option value="customer">Customer</option>
                <option value="subadmin">Sub-Admin</option>
                <option value="admin">Super Admin</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-[#6e5f65] bg-white border border-[#F4D8DF]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-[#D96C8A]"
            >
              Create Account
            </button>
          </div>
        </form>
      )}

      {/* Users Table */}
      <div className="glass-panel p-6 rounded-3xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#F4D8DF] text-[#6e5f65]">
                <th className="py-3 px-4 font-semibold">User</th>
                <th className="py-3 px-4 font-semibold">Email</th>
                <th className="py-3 px-4 font-semibold">Current Role</th>
                <th className="py-3 px-4 font-semibold">Role Promotion</th>
                {isSuperAdmin && <th className="py-3 px-4 font-semibold">Actions</th>}
              </tr>
            </thead>
            <tbody>
              {users.map((u) => {
                const isAdmin = u.role === 'admin';
                const isSubAdmin = u.role === 'subadmin';

                return (
                  <tr key={u.id} className="border-b border-[#F4D8DF]/40 hover:bg-white/60">
                    <td className="py-3 px-4 font-bold text-[#2B2024] flex items-center space-x-2">
                      <div className="w-7 h-7 rounded-full bg-[#F4D8DF] text-[#D96C8A] font-bold flex items-center justify-center text-[11px]">
                        {u.name.charAt(0)}
                      </div>
                      <span>{u.name}</span>
                    </td>
                    <td className="py-3 px-4 text-[#6e5f65]">{u.email}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                        isAdmin
                          ? 'bg-slate-900 text-white'
                          : isSubAdmin
                          ? 'bg-purple-100 text-purple-800 border border-purple-300'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      {!isAdmin ? (
                        <button
                          onClick={() => handleRoleToggle(u)}
                          disabled={!isSuperAdmin}
                          className={`px-3 py-1.5 rounded-xl font-bold transition-all flex items-center space-x-1.5 ${
                            isSubAdmin
                              ? 'bg-amber-50 text-amber-800 border border-amber-300 hover:bg-amber-100'
                              : 'bg-purple-600 text-white hover:bg-purple-700 shadow-sm'
                          }`}
                        >
                          <ShieldCheck className="w-3.5 h-3.5" />
                          <span>{isSubAdmin ? 'Demote to Customer' : 'Promote to Sub-Admin'}</span>
                        </button>
                      ) : (
                        <span className="text-[10px] text-[#6e5f65] italic">Super Admin (Protected)</span>
                      )}
                    </td>
                    {isSuperAdmin && (
                      <td className="py-3 px-4">
                        {!isAdmin && (
                          <button
                            onClick={() => onDeleteUser(u.id)}
                            className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                            title="Remove User"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
