import React, { useState } from 'react';
import {
  Grid,
  Star,
  Search,
  Maximize2,
  Minimize2,
  ExternalLink,
  Plus,
  Sparkles,
  Layers,
  MessageSquare,
  DollarSign,
  TrendingUp,
  FileText,
  Boxes,
  Compass,
  CheckCircle2,
  X,
  Smartphone,
  Monitor
} from 'lucide-react';
import { Breadcrumb, Button, Card, CardHeader, CardBody, Badge, Input } from '../../../components/ui';
import { useToast } from '../../../context/ToastContext';

export const MyFavApps = () => {
  const { addToast } = useToast();

  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [isBigScreenOpen, setIsBigScreenOpen] = useState(false);
  const [activeApp, setActiveApp] = useState(null);

  const categories = ['All', 'Favorites', 'Business Operations', 'Communication', 'Finance & Payments', 'Productivity', 'Analytics'];

  const [apps, setApps] = useState([
    { id: 'app-1', name: 'Slack Workplace', category: 'Communication', isFavorite: true, icon: MessageSquare, color: '#4a154b', url: 'https://slack.com', desc: 'Team communication and alerts webhook' },
    { id: 'app-2', name: 'QuickBooks Online', category: 'Finance & Payments', isFavorite: true, icon: DollarSign, color: '#2ca01c', url: 'https://quickbooks.intuit.com', desc: 'Enterprise accounting, payroll & tax' },
    { id: 'app-3', name: 'DocuSign E-Signature', category: 'Productivity', isFavorite: true, icon: FileText, color: '#2b579a', url: 'https://docusign.com', desc: 'Cloud purchase contract and NDA e-signatures' },
    { id: 'app-4', name: 'Stripe Merchant Dashboard', category: 'Finance & Payments', isFavorite: false, icon: DollarSign, color: '#635bff', url: 'https://stripe.com', desc: 'Payment gateway and recurring billing telemetry' },
    { id: 'app-5', name: 'Google Workspace Docs', category: 'Productivity', isFavorite: true, icon: FileText, color: '#4285f4', url: 'https://docs.google.com', desc: 'Collaborative cloud documents and spreadsheets' },
    { id: 'app-6', name: 'Tableau Business Intelligence', category: 'Analytics', isFavorite: false, icon: TrendingUp, color: '#e97627', url: 'https://tableau.com', desc: 'Advanced corporate data visualization' },
    { id: 'app-7', name: 'Shopify Logistics Hub', category: 'Business Operations', isFavorite: false, icon: Boxes, color: '#96bf48', url: 'https://shopify.com', desc: 'Omnichannel inventory fulfillment' },
    { id: 'app-8', name: 'Zoom Enterprise Meetings', category: 'Communication', isFavorite: false, icon: MessageSquare, color: '#2d8cff', url: 'https://zoom.us', desc: 'HD video conferencing and team webinars' },
  ]);

  const toggleFavorite = (appId, e) => {
    e.stopPropagation();
    setApps((prev) =>
      prev.map((app) => (app.id === appId ? { ...app, isFavorite: !app.isFavorite } : app))
    );
    addToast({ title: 'Favorites Updated', message: 'App preference saved.', type: 'info' });
  };

  const handleLaunchApp = (app) => {
    setActiveApp(app);
    setIsBigScreenOpen(true);
    addToast({
      title: `Launching ${app.name}`,
      message: 'Opening in Expandable Big Screen Viewport.',
      type: 'info',
    });
  };

  const filteredApps = apps.filter((app) => {
    const matchesCategory =
      activeCategory === 'All'
        ? true
        : activeCategory === 'Favorites'
        ? app.isFavorite
        : app.category === activeCategory;
    const matchesSearch =
      app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <Breadcrumb items={[{ label: 'iCanvass PDM' }, { label: 'My Ecosystem' }, { label: 'My Fav Apps' }]} />
          <div className="flex items-center gap-3 mt-1">
            <h1 className="text-2xl font-bold font-display tracking-tight text-primary flex items-center gap-2">
              My Fav APPs Launcher & Big Screen
            </h1>
            <Badge variant="primary" className="bg-sky-500 text-primary font-bold text-xs uppercase tracking-wider">
              Expandable Viewport
            </Badge>
          </div>
          <p className="text-xs text-secondary mt-0.5">
            Organize daily external cloud tools, accounting software, and merchant portals with real-time in-app Big Screen simulation.
          </p>
        </div>

        <Button
          variant="primary"
          icon={Plus}
          onClick={() => addToast({ title: 'Add Application', message: 'Enter app URL and icon to bookmark.', type: 'info' })}
          className="text-xs font-bold"
        >
          Add New Application
        </Button>
      </div>

      {/* Search & Category Filter Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 w-full md:w-auto scrollbar-thin">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer border ${
                activeCategory === cat
                  ? 'bg-blue-600 text-primary border-blue-600 shadow-sm'
                  : 'bg-surface text-secondary border-border hover:border-sky-400'
              }`}
            >
              {cat === 'Favorites' && <Star size={12} className="inline mr-1 fill-current text-amber-300" />}
              {cat}
            </button>
          ))}
        </div>

        <div className="w-full md:w-64">
          <Input
            placeholder="Search apps..."
            icon={Search}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* App Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredApps.map((app) => {
          const Icon = app.icon;
          return (
            <div
              key={app.id}
              onClick={() => handleLaunchApp(app)}
              className="p-4 rounded-2xl border border-border bg-surface hover:border-sky-400 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start justify-between mb-3">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center text-primary shadow-sm flex-shrink-0"
                    style={{ backgroundColor: app.color }}
                  >
                    <Icon size={22} />
                  </div>
                  <button
                    type="button"
                    onClick={(e) => toggleFavorite(app.id, e)}
                    className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                      app.isFavorite ? 'text-amber-400' : 'text-secondary hover:text-amber-400'
                    }`}
                    title={app.isFavorite ? 'Remove Favorite' : 'Mark as Favorite'}
                  >
                    <Star size={16} className={app.isFavorite ? 'fill-current' : ''} />
                  </button>
                </div>

                <h3 className="font-bold text-sm text-primary group-hover:text-sky-600 transition-colors">
                  {app.name}
                </h3>
                <span className="text-[11px] font-mono text-tertiary block mt-0.5">{app.category}</span>
                <p className="text-xs text-secondary mt-2 line-clamp-2 leading-relaxed">
                  {app.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-xs font-semibold text-sky-600">
                <span>Launch in Big Screen</span>
                <ExternalLink size={13} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Expandable Big Screen Viewport Modal */}
      {isBigScreenOpen && activeApp && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 md:p-8 animate-fadeIn">
          <div className="w-full max-w-6xl h-[85vh] bg-surface rounded-2xl border border-border shadow-2xl flex flex-col overflow-hidden">
            {/* Big Screen Header */}
            <div className="px-5 py-3.5 border-b border-border bg-surface-secondary flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-primary"
                  style={{ backgroundColor: activeApp.color }}
                >
                  <activeApp.icon size={16} />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-primary flex items-center gap-2">
                    <span>{activeApp.name}</span>
                    <Badge variant="success" className="text-[10px]">Active Connected Session</Badge>
                  </h3>
                  <span className="text-[11px] font-mono text-tertiary">{activeApp.url}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  icon={ExternalLink}
                  onClick={() => window.open(activeApp.url, '_blank')}
                >
                  Open External Tab
                </Button>
                <button
                  type="button"
                  onClick={() => setIsBigScreenOpen(false)}
                  className="p-1.5 rounded-lg text-tertiary hover:text-primary hover:bg-surface transition-colors cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Big Screen Interactive Viewport Content */}
            <div className="flex-1 bg-background p-6 flex flex-col items-center justify-center text-center text-primary relative overflow-hidden">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-primary mb-4 shadow-xl" style={{ backgroundColor: activeApp.color }}>
                <activeApp.icon size={32} />
              </div>
              <h2 className="text-xl font-bold font-display">{activeApp.name} Simulated Workspace</h2>
              <p className="text-xs text-secondary max-w-md mt-2 leading-relaxed">
                Client roadmapped "Big Screen" viewport enables switching between external merchant apps directly inside the iCanvass PDM unified cockpit without opening extra browser tabs.
              </p>

              <div className="mt-6 flex items-center gap-3">
                <Button variant="primary" size="sm" icon={Sparkles} onClick={() => addToast({ title: 'Bestie Sync', message: 'Extracted telemetry from ' + activeApp.name, type: 'success' })}>
                  Sync Telemetry with Bestie AI
                </Button>
                <Button variant="outline" size="sm" onClick={() => setIsBigScreenOpen(false)}>
                  Close Big Screen
                </Button>
              </div>

              <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-[11px] text-secondary font-mono">
                <span>Viewport Resolution: 1920 x 1080 (HD Container)</span>
                <span>Isolated Sandboxed Frame • 0ms Latency</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyFavApps;
