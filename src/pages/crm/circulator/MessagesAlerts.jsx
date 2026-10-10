import React, { useState } from 'react';
import { MessageSquare, Bell, Search, Info } from 'lucide-react';

export const MessagesAlerts = () => {
  const [toast, setToast] = useState('');
  
  const notify = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };
  const alerts = [
    { id: 1, sender: 'Manager: Sarah Jenkins', title: 'Location Change', msg: 'Move to the North Entrance of the mall immediately.', time: '10:45 AM', isUnread: true },
    { id: 2, sender: 'System Alerts', title: 'Commission Processed', msg: 'Your payout of $820.00 has been sent to ADP.', time: 'Yesterday', isUnread: false },
    { id: 3, sender: 'Sub Coordinator: Mike', title: 'Need more clipboards?', msg: 'I will be driving by your territory in 20 mins. Let me know.', time: 'Oct 02', isUnread: false },
  ];

  return (
    <div className="h-full bg-surface text-primary overflow-y-auto pb-10">
      <div className="border-b border-border bg-surface-secondary p-6 backdrop-blur-xl sticky top-0 z-20">
        <h1 className="text-2xl font-bold text-primary flex items-center gap-3">
          <div className="p-2 bg-indigo-500/20 rounded-lg">
            <MessageSquare className="w-6 h-6 text-indigo-400" />
          </div>
          Messages & Alerts
        </h1>
        <p className="mt-1 text-sm text-secondary">
          Read direct messages and important alerts from your Team Leaders and Coordinators.
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-6 mt-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="text-lg font-bold text-primary flex items-center gap-2 m-0">
            <Bell className="w-5 h-5 text-rose-400" /> Inbox
          </h2>
          <div className="relative w-full sm:w-auto">
            <Search className="w-4 h-4 text-secondary absolute left-3 top-1/2 -translate-y-1/2" />
            <input type="text" onChange={() => notify('Searching alerts...')} placeholder="Search messages..." className="w-full sm:w-64 bg-surface-secondary border border-border rounded-xl py-2 pl-9 pr-4 text-sm text-primary focus:outline-none focus:border-indigo-500 transition-all box-border" />
          </div>
        </div>

        <div className="space-y-4">
          {alerts.map(alert => (
            <div key={alert.id} onClick={() => notify('Alert opened')} className={`p-5 rounded-2xl border transition-colors cursor-pointer ${
              alert.isUnread ? 'bg-indigo-500/10 border-indigo-500/30' : 'bg-surface-secondary border-border hover:border-border'
            }`}>
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  {alert.isUnread && <span className="w-2 h-2 rounded-full bg-indigo-500" />}
                  <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">{alert.sender}</span>
                </div>
                <span className="text-xs text-secondary">{alert.time}</span>
              </div>
              <h3 className={`text-lg mb-1 ${alert.isUnread ? 'font-bold text-primary' : 'font-semibold text-secondary'}`}>{alert.title}</h3>
              <p className="text-sm text-secondary">{alert.msg}</p>
            </div>
          ))}
        </div>

        <div className="bg-surface-secondary border border-border rounded-xl p-4 flex items-start gap-3 mt-8">
          <Info className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
          <p className="text-sm text-secondary">
            Note: As a Circulator, you cannot initiate new broadcast messages. You can only reply directly to your managers or read alerts.
          </p>
        </div>
      </div>
      
      {toast && (
        <div className="fixed bottom-6 right-6 z-[120] px-6 py-3 rounded-xl shadow-xl font-bold animate-in slide-in-from-bottom-4" style={{ backgroundColor: 'var(--success)', color: 'var(--text-on-primary)' }}>
          {toast}
        </div>
      )}
    </div>
  );
};
