import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Play, Square, MapPin, ClipboardList, TrendingUp, CheckCircle, 
  XCircle, Clock, AlertCircle, Award, Target, Activity, LayoutDashboard, Plus
} from 'lucide-react';
import { Modal, Button, Input, Select } from '../../../components/ui';
import { useToast } from '../../../context/ToastContext';

export const ActivityTracker = () => {
  const navigate = useNavigate();
  const { addToast } = useToast();

  const [isTracking, setIsTracking] = useState(true);
  const [shiftSeconds, setShiftSeconds] = useState(14420);
  const [shiftTime, setShiftTime] = useState('04:00:20');

  useEffect(() => {
    let interval = null;
    if (isTracking) {
      interval = setInterval(() => {
        setShiftSeconds((prev) => {
          const next = prev + 1;
          const hrs = String(Math.floor(next / 3600)).padStart(2, '0');
          const mins = String(Math.floor((next % 3600) / 60)).padStart(2, '0');
          const secs = String(next % 60).padStart(2, '0');
          setShiftTime(`${hrs}:${mins}:${secs}`);
          return next;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTracking]);

  const [totalSignatures, setTotalSignatures] = useState(482);
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);
  const [logForm, setLogForm] = useState({
    project: 'Prop 12 - Clean Energy Ballot',
    signatures: '',
    location: 'Downtown Metro Station',
    notes: '',
  });

  const stats = [
    { label: 'Total Signatures', value: totalSignatures.toString(), icon: ClipboardList, color: 'text-blue-400', bg: 'bg-blue-500/20' },
    { label: 'Valid (Est. 85%)', value: Math.round(totalSignatures * 0.85).toString(), icon: CheckCircle, color: 'text-emerald-400', bg: 'bg-emerald-500/20' },
    { label: 'Rejected', value: Math.round(totalSignatures * 0.15).toString(), icon: XCircle, color: 'text-rose-400', bg: 'bg-rose-500/20' },
    { label: 'Est. Commission', value: `$${(totalSignatures * 1.70).toFixed(2)}`, icon: TrendingUp, color: 'text-amber-400', bg: 'bg-amber-500/20' },
  ];

  const [recentActivity, setRecentActivity] = useState([
    { id: 1, date: 'Today, 2:30 PM', project: 'Prop 12 - Clean Energy Ballot', signatures: 45, location: 'Downtown Metro Station', status: 'Pending Validation' },
    { id: 2, date: 'Yesterday, 4:00 PM', project: 'Prop 12 - Clean Energy Ballot', signatures: 82, location: 'City Park Civic Center', status: 'Validated (92%)' },
    { id: 3, date: 'Oct 03, 1:15 PM', project: 'Local Mayor Petition', signatures: 30, location: 'Westside Mall Plaza', status: 'Validated (88%)' },
    { id: 4, date: 'Oct 02, 5:45 PM', project: 'Education Bond Measure C', signatures: 55, location: 'Community Center', status: 'Validated (95%)' },
  ]);

  const handleToggleTracking = () => {
    setIsTracking(!isTracking);
    addToast({
      title: isTracking ? 'Shift Paused' : 'Shift Started',
      message: isTracking ? 'Shift timer paused. Good job out in the field!' : 'Shift tracking resumed.',
      type: isTracking ? 'info' : 'success',
    });
  };

  const handleLogSubmit = (e) => {
    e.preventDefault();
    const sigCount = parseInt(logForm.signatures, 10);
    if (isNaN(sigCount) || sigCount <= 0) {
      addToast({
        title: 'Validation Error',
        message: 'Please enter a valid number of signatures collected.',
        type: 'error',
      });
      return;
    }

    const newLog = {
      id: Date.now(),
      date: 'Just now',
      project: logForm.project,
      signatures: sigCount,
      location: logForm.location,
      status: 'Pending Validation',
    };

    setRecentActivity([newLog, ...recentActivity]);
    setTotalSignatures((prev) => prev + sigCount);

    addToast({
      title: 'Signatures Logged',
      message: `Recorded ${sigCount} signatures for ${logForm.project}.`,
      type: 'success',
    });

    setIsLogModalOpen(false);
    setLogForm({
      project: 'Prop 12 - Clean Energy Ballot',
      signatures: '',
      location: 'Downtown Metro Station',
      notes: '',
    });
  };

  return (
    <div className="h-full bg-surface text-primary overflow-y-auto pb-10">
      
      {/* Header */}
      <div className="border-b border-border bg-surface-secondary p-6 backdrop-blur-xl sticky top-0 z-20">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Button
                variant="ghost"
                size="sm"
                icon={LayoutDashboard}
                onClick={() => navigate('/crm/dashboard')}
                className="text-xs"
              >
                Dashboard
              </Button>
              <span className="text-secondary text-xs">•</span>
              <span className="text-secondary text-xs font-semibold">Circulator Field Portal</span>
            </div>
            <h1 className="text-2xl font-bold text-primary flex items-center gap-3">
              <div className="p-2 bg-indigo-500/20 rounded-lg">
                <Activity className="w-6 h-6 text-indigo-400" />
              </div>
              Activity Tracker
            </h1>
            <p className="mt-1 text-sm text-secondary">
              Log your shifts, track signatures, and monitor real-time commission estimates.
            </p>
          </div>
          
          <div className="flex items-center justify-between sm:justify-start w-full sm:w-auto gap-4 bg-surface-secondary p-2 pl-4 rounded-2xl border border-border">
            <div className="flex flex-col mr-2">
              <span className="text-[10px] text-secondary uppercase font-semibold">Active Shift Time</span>
              <span className={`font-mono text-xl font-bold tracking-wider ${isTracking ? 'text-emerald-400' : 'text-secondary'}`}>
                {shiftTime}
              </span>
            </div>
            <button 
              onClick={handleToggleTracking}
              className={`flex items-center justify-center gap-2 px-4 sm:px-6 py-3 rounded-xl font-bold transition-all shadow-lg text-sm sm:text-base w-full sm:w-auto ${
                isTracking 
                  ? 'bg-rose-500/10 text-rose-400 border border-rose-500/30 hover:bg-rose-500/20' 
                  : 'bg-emerald-600 hover:bg-emerald-500 text-primary shadow-emerald-500/20'
              }`}
            >
              {isTracking ? <Square className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current" />}
              {isTracking ? 'END SHIFT' : 'START SHIFT'}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-8 space-y-6">
        
        {/* Active Project Alert */}
        {isTracking && (
          <div className="animate-in fade-in slide-in-from-top-4 bg-indigo-600/10 border border-indigo-500/30 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-start gap-4">
            <div className="flex items-start gap-4 flex-1">
              <div className="mt-1"><AlertCircle className="w-6 h-6 text-indigo-400" /></div>
              <div className="flex-1">
                <h3 className="text-primary font-semibold flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-indigo-500"></span>
                  </span>
                  Active Field Tracking Enabled
                </h3>
                <p className="text-sm text-secondary mt-1">
                  Your location is logged for territory compliance on the "Prop 12 - Clean Energy" project. Don't forget to submit your signature counts periodically.
                </p>
              </div>
            </div>
            <button 
              onClick={() => setIsLogModalOpen(true)}
              className="px-4 py-2 w-full sm:w-auto bg-indigo-500 hover:bg-indigo-400 text-primary text-sm font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" /> Log Signatures
            </button>
          </div>
        )}

        {/* Top Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={i} className="bg-surface-secondary border border-border rounded-2xl p-5 hover:bg-surface-secondary transition-colors">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                </div>
                <h3 className="text-3xl font-extrabold text-primary mb-1">{stat.value}</h3>
                <p className="text-sm text-secondary font-medium">{stat.label}</p>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Activity Feed */}
          <div className="lg:col-span-2 bg-surface-secondary border border-border rounded-2xl overflow-hidden flex flex-col h-auto min-h-[500px]">
            <div className="p-4 sm:p-5 border-b border-border flex items-center justify-between">
              <h2 className="text-lg font-bold text-primary flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-400" /> Recent Logbook
              </h2>
              <button 
                onClick={() => setIsLogModalOpen(true)}
                className="text-sm text-blue-400 hover:text-blue-300 font-medium flex items-center gap-1"
              >
                <Plus className="w-4 h-4" /> Add Entry
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-2">
              {recentActivity.map((log) => (
                <div key={log.id} className="p-4 mx-2 my-2 rounded-xl border border-border bg-surface-secondary hover:bg-surface-secondary transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-surface-secondary rounded-xl mt-1">
                      <Target className="w-5 h-5 text-indigo-400" />
                    </div>
                    <div>
                      <h4 className="text-primary font-semibold">{log.project}</h4>
                      <div className="flex flex-wrap items-center gap-3 mt-1 text-xs text-secondary">
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {log.date}</span>
                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {log.location}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between sm:flex-col sm:items-end gap-1 px-2">
                    <div className="text-lg font-bold text-primary flex items-center gap-1">
                      +{log.signatures} <span className="text-xs text-secondary font-normal">sigs</span>
                    </div>
                    <span className={`text-xs font-medium px-2 py-1 rounded-md ${
                      log.status.includes('Pending') 
                        ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' 
                        : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    }`}>
                      {log.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Sidebar - Assigned Territory & Goals */}
          <div className="space-y-6">
            <div className="bg-surface-secondary border border-border rounded-2xl p-5">
              <h2 className="text-lg font-bold text-primary mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-rose-400" /> Active Territory
              </h2>
              <div className="aspect-video w-full bg-surface rounded-xl border border-border relative overflow-hidden flex items-center justify-center">
                {/* Mock Map Background */}
                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')] bg-repeat" />
                <MapPin className="w-10 h-10 text-rose-500 absolute z-10" />
                <div className="absolute w-24 h-24 bg-rose-500/20 rounded-full animate-ping" />
              </div>
              <div className="mt-4">
                <p className="text-sm font-semibold text-primary">Downtown District 4</p>
                <p className="text-xs text-secondary mt-1">Assigned by: Leo Fontaine (Manager)</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-indigo-900/50 to-slate-900 border border-indigo-500/30 rounded-2xl p-5">
              <h2 className="text-lg font-bold text-primary mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-400" /> Weekly Goal
              </h2>
              <div className="mb-2 flex justify-between items-end">
                <span className="text-3xl font-extrabold text-primary">{totalSignatures}</span>
                <span className="text-sm text-secondary mb-1">/ 1,000 sigs</span>
              </div>
              
              <div className="w-full h-2 bg-surface-secondary rounded-full overflow-hidden mb-3">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-500" 
                  style={{ width: `${Math.min(Math.round((totalSignatures / 1000) * 100), 100)}%` }}
                />
              </div>
              
              <p className="text-xs text-secondary">
                {1000 - totalSignatures > 0 
                  ? `Keep it up! You need ${1000 - totalSignatures} more signatures to hit your weekly bonus tier.`
                  : 'Weekly bonus threshold reached!'}
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Log Signatures Modal */}
      <Modal
        isOpen={isLogModalOpen}
        onClose={() => setIsLogModalOpen(false)}
        title="Log Field Signatures"
        maxWidth="500px"
      >
        <form onSubmit={handleLogSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-primary">Select Petition Project</label>
            <Select
              value={logForm.project}
              onChange={(e) => setLogForm({ ...logForm, project: e.target.value })}
              options={[
                { value: 'Prop 12 - Clean Energy Ballot', label: 'Prop 12 - Clean Energy Ballot ($3.50/sig)' },
                { value: 'Education Bond Measure C', label: 'Education Bond Measure C ($4.00/sig)' },
                { value: 'Local Mayor Petition', label: 'Local Mayor Petition ($2.00/sig)' },
              ]}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-primary">Signatures Collected *</label>
            <Input
              type="number"
              placeholder="e.g. 35"
              value={logForm.signatures}
              onChange={(e) => setLogForm({ ...logForm, signatures: e.target.value })}
              required
              autoFocus
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-primary">Location</label>
            <Input
              type="text"
              placeholder="e.g. Downtown Metro Station"
              value={logForm.location}
              onChange={(e) => setLogForm({ ...logForm, location: e.target.value })}
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-border">
            <Button variant="ghost" type="button" onClick={() => setIsLogModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Save Entry
            </Button>
          </div>
        </form>
      </Modal>

    </div>
  );
};
