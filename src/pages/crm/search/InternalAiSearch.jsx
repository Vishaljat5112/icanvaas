import React, { useState } from 'react';
import {
  Search,
  Sparkles,
  Filter,
  Users,
  Target,
  FileText,
  Boxes,
  LifeBuoy,
  ChevronRight,
  Clock,
  ArrowUpRight,
  BookOpen,
  Bot
} from 'lucide-react';
import { Breadcrumb, Button, Card, CardHeader, CardBody, Badge, Input } from '../../../components/ui';
import { useToast } from '../../../context/ToastContext';
import { useNavigate } from 'react-router-dom';

export const InternalAiSearch = () => {
  const { addToast } = useToast();
  const navigate = useNavigate();

  const [query, setQuery] = useState('Apex Global contract SLA and delivery schedule');
  const [activeFilter, setActiveFilter] = useState('All');

  const filterTabs = ['All', 'Contacts & Accounts', 'Deals & Pipeline', 'ERP Operations', 'Support Tickets', 'Knowledge Articles'];

  const results = [
    {
      id: 'res-1',
      title: 'Apex Global Technologies — Enterprise SaaS Deal ($450,000)',
      category: 'Deals & Pipeline',
      icon: Target,
      snippet: 'Contract Stage: Legal Review. SLA guarantee 99.98% uptime with dedicated tier-1 support desk. Executive sponsor Alexander Wright.',
      path: '/crm/pipeline',
      matchScore: '99% Match',
      date: 'Updated 2 hours ago',
    },
    {
      id: 'res-2',
      title: 'Eleanor Vance (VP of Procurement, Apex Global)',
      category: 'Contacts & Accounts',
      icon: Users,
      snippet: 'Key decision maker for multi-year CRM ERP software contract. Direct line: +1 (555) 234-8901. Email: e.vance@apex.io',
      path: '/crm/contacts',
      matchScore: '96% Match',
      date: 'Updated yesterday',
    },
    {
      id: 'res-3',
      title: 'Sales Order SO-2026-402: Apex Cloud Terminal Provisioning',
      category: 'ERP Operations',
      icon: Boxes,
      snippet: 'Bill of Materials confirmed. Austin Central Warehouse allocated 50 enterprise gateway sensors for dispatch on Friday.',
      path: '/crm/erp/sales-orders',
      matchScore: '92% Match',
      date: '3 days ago',
    },
    {
      id: 'res-4',
      title: 'KB-104: Enterprise Custom SLA Provisioning Guidelines',
      category: 'Knowledge Articles',
      icon: BookOpen,
      snippet: 'Standard protocols for 24/7 dedicated customer success management, emergency hotlines, and downtime penalty credits.',
      path: '/crm/support/kb',
      matchScore: '89% Match',
      date: '1 week ago',
    },
  ];

  const filteredResults = activeFilter === 'All'
    ? results
    : results.filter((r) => r.category === activeFilter);

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <Breadcrumb items={[{ label: 'iCanvass PDM' }, { label: 'Intelligence & Data' }, { label: 'Internal AI Search' }]} />
          <div className="flex items-center gap-3 mt-1">
            <h1 className="text-2xl font-bold font-display tracking-tight text-primary flex items-center gap-2">
              Internal Enterprise AI Search
            </h1>
            <Badge variant="primary" className="bg-sky-500 text-primary font-bold text-xs uppercase tracking-wider">
              Semantic Neural RAG
            </Badge>
          </div>
          <p className="text-xs text-secondary mt-0.5">
            Unified cognitive search engine spanning CRM contacts, ERP inventories, legal contracts, support tickets, and team communications.
          </p>
        </div>
      </div>

      {/* Global Search Input Box */}
      <Card className="border shadow-sm p-2">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-surface-secondary border border-border">
          <Search size={22} className="text-sky-500 flex-shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search across all CRM deals, ERP purchase orders, tickets, contracts or candidates..."
            className="flex-1 bg-transparent border-none outline-none text-base text-primary font-medium placeholder:text-tertiary"
          />
          {query && (
            <Button
              variant="primary"
              size="sm"
              icon={Sparkles}
              onClick={() => addToast({ title: 'RAG Search Refresh', message: 'Scanned 1,420 enterprise records.', type: 'info' })}
            >
              Search
            </Button>
          )}
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto p-2 scrollbar-thin">
          {filterTabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveFilter(tab)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer border ${
                activeFilter === tab
                  ? 'bg-blue-600 text-primary border-blue-600 shadow-sm'
                  : 'bg-surface text-secondary border-border hover:border-sky-400'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </Card>

      {/* AI Synthesized Executive Summary Card */}
      <Card className="border border-sky-500/40 bg-gradient-to-br from-sky-500/5 via-blue-500/5 to-transparent shadow-sm">
        <CardBody className="p-5 flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-bold text-sm text-sky-600 dark:text-sky-400">
              <Bot size={18} />
              <span>AI Executive Answer & Synthesis</span>
            </div>
            <span className="text-[11px] font-mono text-tertiary">Synthesized in 240ms</span>
          </div>
          <p className="text-xs text-primary leading-relaxed">
            Regarding <strong>"{query}"</strong>: Apex Global Technologies is currently in final contract review for a <strong>$450,000 SaaS agreement</strong>. Their primary SLA term demands 99.98% availability, which is backed by Austin Warehouse hardware allocation (SO-2026-402). Lead contact Eleanor Vance is awaiting final redline approval scheduled for delivery by Thursday.
          </p>
          <div className="flex items-center gap-2 pt-1 text-[11px] text-tertiary">
            <span>Verified Sources: 3 Databases (Deals, ERP Orders, Contacts)</span>
            <span>•</span>
            <span className="text-emerald-500 font-semibold">100% Fact-Checked</span>
          </div>
        </CardBody>
      </Card>

      {/* Search Results List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-bold text-secondary px-1">
          <span>Relevant Results ({filteredResults.length})</span>
          <span>Sorted by Neural Relevance</span>
        </div>

        {filteredResults.map((res) => {
          const Icon = res.icon;
          return (
            <div
              key={res.id}
              onClick={() => navigate(res.path)}
              className="p-4 rounded-2xl border border-border bg-surface hover:border-sky-400 hover:shadow-md transition-all cursor-pointer flex flex-col md:flex-row items-start md:items-center justify-between gap-4 group"
            >
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-surface-secondary text-primary flex items-center justify-center flex-shrink-0 group-hover:bg-sky-500 group-hover:text-primary transition-colors">
                  <Icon size={18} />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold font-mono px-2 py-0.5 rounded bg-surface-secondary text-sky-600 dark:text-sky-400">
                      {res.category}
                    </span>
                    <span className="text-[11px] text-emerald-600 font-bold">{res.matchScore}</span>
                  </div>
                  <h3 className="font-bold text-sm text-primary group-hover:text-sky-600 transition-colors">
                    {res.title}
                  </h3>
                  <p className="text-xs text-secondary mt-1 leading-relaxed max-w-3xl">
                    {res.snippet}
                  </p>
                  <span className="text-[10px] text-tertiary mt-2 block">{res.date}</span>
                </div>
              </div>

              <div className="flex items-center gap-1 text-xs font-bold text-sky-600 group-hover:translate-x-1 transition-transform flex-shrink-0">
                <span>View Record</span>
                <ArrowUpRight size={15} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default InternalAiSearch;
