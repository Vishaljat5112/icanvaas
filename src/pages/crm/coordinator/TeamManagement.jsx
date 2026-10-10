import React, { useState } from 'react';
import { Users, UserPlus, Shield, TrendingUp, Search, Filter, MoreVertical, Trash2, Mail } from 'lucide-react';

export const TeamManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showInviteModal, setShowInviteModal] = useState(false);

  const teamMembers = [
    { id: 1, name: 'Sarah Jenkins', role: 'Sub Coordinator', teamSize: 12, performance: '98%', status: 'Active' },
    { id: 2, name: 'Michael Chen', role: 'Manager', teamSize: 8, performance: '92%', status: 'Active' },
    { id: 3, name: 'David Ross', role: 'Circulator', teamSize: 0, performance: '85%', status: 'Pending Review' },
    { id: 4, name: 'Emma Wilson', role: 'Circulator', teamSize: 0, performance: '95%', status: 'Active' },
  ];

  return (
    <div className="h-full overflow-y-auto pb-10" style={{ backgroundColor: 'var(--background)', color: 'var(--text-primary)' }}>
      {/* Header */}
      <div className="p-6 sticky top-0 z-20" style={{ backgroundColor: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-3 text-primary">
              <div className="p-2 rounded-lg" style={{ backgroundColor: 'var(--info-light)' }}>
                <Users className="w-6 h-6" style={{ color: 'var(--info)' }} />
              </div>
              Team Management
            </h1>
            <p className="mt-1 text-sm text-secondary">
              Recruit, train, and manage your circulators and sub-coordinators with white-label access.
            </p>
          </div>
          
          <button 
            onClick={() => setShowInviteModal(true)}
            className="flex items-center justify-center gap-2 rounded-xl font-bold transition-all shadow-lg"
            style={{ padding: '0.75rem 1.5rem', backgroundColor: 'var(--info)', color: 'var(--text-on-primary)' }}
          >
            <UserPlus className="w-5 h-5" />
            Invite Member
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-8 space-y-6">
        
        {/* Top Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
          <div className="rounded-2xl p-5 shadow-sm" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
            <div className="flex items-center gap-3 mb-2">
              <Users className="w-5 h-5" style={{ color: 'var(--info)' }} />
              <h3 className="font-medium text-secondary">Total Team Size</h3>
            </div>
            <p className="text-3xl font-bold text-primary">124</p>
          </div>
          <div className="rounded-2xl p-5 shadow-sm" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
            <div className="flex items-center gap-3 mb-2">
              <Shield className="w-5 h-5" style={{ color: 'var(--success)' }} />
              <h3 className="font-medium text-secondary">Compliance Rate</h3>
            </div>
            <p className="text-3xl font-bold text-primary">96.5%</p>
          </div>
          <div className="rounded-2xl p-5 shadow-sm" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-5 h-5" style={{ color: 'var(--warning)' }} />
              <h3 className="font-medium text-secondary">Active Circulators</h3>
            </div>
            <p className="text-3xl font-bold text-primary">82</p>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="p-4 rounded-2xl shadow-sm" style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
          <div className="relative" style={{ flex: '1 1 300px', maxWidth: '400px' }}>
            <Search className="w-5 h-5 absolute text-tertiary" style={{ left: '0.75rem', top: '50%', transform: 'translateY(-50%)' }} />
            <input 
              type="text" 
              placeholder="Search team members..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-xl text-primary focus:outline-none"
              style={{ padding: '0.5rem 1rem 0.5rem 2.5rem', backgroundColor: 'var(--background)', border: '1px solid var(--border)' }}
            />
          </div>
          <button className="flex items-center justify-center gap-2 rounded-xl transition-colors text-secondary" style={{ padding: '0.5rem 1rem', backgroundColor: 'var(--background)', border: '1px solid var(--border)', flex: '0 0 auto' }}>
            <Filter className="w-4 h-4" />
            Filters
          </button>
        </div>

        {/* Team Table */}
        <div className="rounded-2xl overflow-hidden shadow-sm" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead style={{ backgroundColor: 'var(--surface-secondary)', borderBottom: '1px solid var(--border)' }}>
                <tr>
                  <th className="p-4 text-xs font-semibold uppercase tracking-wider text-secondary">Name</th>
                  <th className="p-4 text-xs font-semibold uppercase tracking-wider text-secondary">Role</th>
                  <th className="p-4 text-xs font-semibold uppercase tracking-wider text-secondary">Team Size</th>
                  <th className="p-4 text-xs font-semibold uppercase tracking-wider text-secondary">Performance</th>
                  <th className="p-4 text-xs font-semibold uppercase tracking-wider text-secondary">Status</th>
                  <th className="p-4 text-xs font-semibold uppercase tracking-wider text-right text-secondary">Actions</th>
                </tr>
              </thead>
              <tbody style={{ divideY: '1px solid var(--border)' }}>
                {teamMembers.map((member, idx) => (
                  <tr key={member.id} className="transition-colors hover-bg-surface-secondary" style={{ borderBottom: idx !== teamMembers.length - 1 ? '1px solid var(--border)' : 'none' }}>
                    <td className="p-4 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0" style={{ backgroundColor: 'var(--info-light)', color: 'var(--info)' }}>
                        {member.name.charAt(0)}
                      </div>
                      <span className="font-semibold text-primary whitespace-nowrap">{member.name}</span>
                    </td>
                    <td className="p-4 text-secondary whitespace-nowrap">{member.role}</td>
                    <td className="p-4 text-secondary">{member.teamSize > 0 ? member.teamSize : '-'}</td>
                    <td className="p-4 font-medium" style={{ color: 'var(--success)' }}>{member.performance}</td>
                    <td className="p-4">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-md whitespace-nowrap" style={{ 
                        backgroundColor: member.status === 'Active' ? 'var(--success-light)' : 'var(--warning-light)',
                        color: member.status === 'Active' ? 'var(--success)' : 'var(--warning)',
                        border: `1px solid ${member.status === 'Active' ? 'var(--success-border)' : 'var(--warning-border)'}`
                      }}>
                        {member.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button className="p-2 transition-colors text-tertiary">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
            <div className="p-6 flex justify-between items-center" style={{ borderBottom: '1px solid var(--border)', backgroundColor: 'var(--surface-secondary)' }}>
              <h2 className="text-xl font-bold text-primary">Invite Team Member</h2>
              <button onClick={() => setShowInviteModal(false)} className="text-secondary">
                <span className="text-2xl leading-none">&times;</span>
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-secondary">Email Address</label>
                <div className="relative">
                  <Mail className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-tertiary" />
                  <input type="email" placeholder="name@example.com" className="w-full rounded-xl py-2 pl-10 pr-4 focus:outline-none text-primary" style={{ backgroundColor: 'var(--background)', border: '1px solid var(--border)' }} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-secondary">Assign Role</label>
                <select className="w-full rounded-xl py-2 px-4 focus:outline-none appearance-none text-primary" style={{ backgroundColor: 'var(--background)', border: '1px solid var(--border)' }}>
                  <option>Sub Coordinator (White Label)</option>
                  <option>Team Manager</option>
                  <option>Circulator</option>
                </select>
              </div>
            </div>
            <div className="p-6 flex gap-3 justify-end" style={{ borderTop: '1px solid var(--border)', backgroundColor: 'var(--surface-secondary)' }}>
              <button onClick={() => setShowInviteModal(false)} className="px-4 py-2 font-medium transition-colors rounded-xl text-secondary" style={{ border: '1px solid var(--border)', backgroundColor: 'var(--surface)' }}>
                Cancel
              </button>
              <button onClick={() => setShowInviteModal(false)} className="px-6 py-2 rounded-xl font-bold transition-all shadow-lg" style={{ backgroundColor: 'var(--info)', color: 'var(--text-on-primary)' }}>
                Send Invite
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
