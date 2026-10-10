import React, { useState } from 'react';
import {
  BookOpen,
  Search,
  FileText,
  Folder,
  ChevronRight,
  HelpCircle,
  Sparkles,
  ThumbsUp,
  ThumbsDown,
  Eye,
  Plus,
  ArrowLeft,
  ExternalLink,
  Tag
} from 'lucide-react';
import { Breadcrumb, Button, Card, CardHeader, CardBody, Badge, Input } from '../../../components/ui';
import { useToast } from '../../../context/ToastContext';

export const KnowledgeBase = () => {
  const { addToast } = useToast();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeArticle, setActiveArticle] = useState(null);

  const categories = [
    { id: 'all', label: 'All Articles', count: 18 },
    { id: 'crm', label: 'CRM & Pipeline', count: 5 },
    { id: 'erp', label: 'ERP & Logistics', count: 4 },
    { id: 'ai', label: 'AI SuperHouse & Bestie', count: 6 },
    { id: 'billing', label: 'Billing & Compliance', count: 3 },
  ];

  const articles = [
    {
      id: 'KB-101',
      title: 'How to Connect Your Auto Dealership DMS Feed',
      category: 'CRM & Pipeline',
      readTime: '4 min read',
      views: 1240,
      likes: 98,
      updated: 'Sep 10, 2026',
      summary: 'Step-by-step guide to syncing real-time vehicle inventory into iCanvass PDM without manual CSV exports.',
      content: `### Automatic DMS Feed Synchronization\n\n1. **Obtain FTP or API Credentials:** Contact your Dealer Management System (DealerTrack, CDK Global, or Reynolds).\n2. **Navigate to Integration Settings:** Go to *Administration > DMS Integrations*.\n3. **Map Inventory Fields:** Ensure VIN, Stock Number, Mileage, and Photos sync every 15 minutes.\n4. **Enable ADP Verification:** Once verified, all listings receive the official {ADP Verified} trust badge.`,
    },
    {
      id: 'KB-102',
      title: 'Configuring Bestie AI Autonomous Event Triggers',
      category: 'AI SuperHouse & Bestie',
      readTime: '6 min read',
      views: 2480,
      likes: 215,
      updated: 'Sep 12, 2026',
      summary: 'Learn how to instruct Bestie to automatically draft follow-up agreements when deals enter the Negotiation stage.',
      content: `### Bestie Autonomous Workflows\n\nBestie AI listens to state transitions across your sales pipeline.\n\n- **Trigger Condition:** Opportunity enters "Contract Review".\n- **AI Action:** Generate standard NDA and service agreement pre-filled with CRM customer data.\n- **Human-in-the-loop:** Prompts executive for 1-click confirmation before client dispatch.`,
    },
    {
      id: 'KB-103',
      title: 'ERP Reorder Points and Automated Purchase Requests',
      category: 'ERP & Logistics',
      readTime: '5 min read',
      views: 940,
      likes: 72,
      updated: 'Aug 28, 2026',
      summary: 'Set automated inventory thresholds across Austin, Dallas, and regional warehouse fulfillment centers.',
      content: `### Inventory Reorder Logic\n\nWhen stock dips below the buffer threshold (typically 20% of monthly average consumption), an automated Purchase Request (PR) is dispatched to procurement managers.`,
    },
    {
      id: 'KB-104',
      title: 'Multi-Location Umbrella Accounts & Licensing',
      category: 'Billing & Compliance',
      readTime: '3 min read',
      views: 780,
      likes: 64,
      updated: 'Sep 05, 2026',
      summary: 'Understanding OMP Executive central office reporting and per-store operational licenses.',
      content: `### Central Office Management\n\nCorporations with multiple locations can register under a single master account. Each physical store operates with its own license, while corporate executives view consolidated real-time profit and sales velocity.`,
    },
  ];

  const filteredArticles = articles.filter((a) => {
    const matchesCategory = selectedCategory === 'All' || a.category.includes(selectedCategory);
    const matchesSearch =
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto" style={{ width: '100%', boxSizing: 'border-box' }}>
      {/* Page Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <Breadcrumb items={[{ label: 'iCanvass PDM' }, { label: 'Support & Help' }, { label: 'Knowledge Base' }]} />
          <div className="flex items-center gap-3 mt-1 flex-wrap">
            <h1 className="text-2xl font-bold font-display tracking-tight text-primary flex items-center gap-2">
              Centralized AI Knowledge Base
            </h1>
            <Badge variant="primary" className="font-bold text-xs uppercase tracking-wider">
              AI RAG Powered
            </Badge>
          </div>
          <p className="text-xs text-secondary mt-0.5">
            Verified documentation, operational runbooks, and enterprise FAQs serving all 100+ platform workflows.
          </p>
        </div>

        <Button
          variant="primary"
          icon={Plus}
          onClick={() => addToast({ title: 'New Article Draft', message: 'Article editor opened.', type: 'info' })}
          className="text-xs font-bold"
        >
          Draft New Article
        </Button>
      </div>

      {/* Hero Search Section */}
      <div
        style={{
          padding: '2.5rem 1.5rem',
          borderRadius: '16px',
          background: 'linear-gradient(135deg, #070b19 0%, #0f172a 50%, #0369a1 100%)',
          color: '#ffffff',
          boxShadow: '0 12px 30px -8px rgba(0, 0, 0, 0.35)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: '1rem',
          boxSizing: 'border-box',
        }}
      >
        <div style={{ maxWidth: '640px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
          <span
            style={{
              fontSize: '11px',
              fontFamily: 'var(--font-mono)',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              padding: '3px 10px',
              borderRadius: '9999px',
              backgroundColor: 'rgba(255, 255, 255, 0.12)',
              color: '#38bdf8',
              fontWeight: 700,
              border: '1px solid rgba(255, 255, 255, 0.15)',
            }}
          >
            Self-Service Knowledge Hub
          </span>
          <h2 style={{ fontSize: '26px', fontWeight: 800, margin: 0, color: '#ffffff', letterSpacing: '-0.02em' }}>
            How can we assist you today?
          </h2>
          <p style={{ fontSize: '13px', color: '#cbd5e1', margin: 0, lineHeight: 1.5 }}>
            Search our comprehensive knowledge base or let Bestie AI find immediate answers from verified enterprise docs.
          </p>
        </div>

        <div style={{ width: '100%', maxWidth: '580px', marginTop: '0.5rem' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.75rem 1.25rem',
              borderRadius: '14px',
              backgroundColor: '#ffffff',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.25)',
              boxSizing: 'border-box',
            }}
          >
            <Search size={20} style={{ color: '#0284c7', flexShrink: 0 }} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Ask a question or enter keywords (e.g., DMS sync, Bestie triggers, ERP ledgers)..."
              style={{
                flex: 1,
                border: 'none',
                outline: 'none',
                fontSize: '13px',
                fontWeight: 500,
                color: '#0f172a',
                backgroundColor: 'transparent',
                width: '100%',
              }}
            />
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Category Navigation (3 cols) */}
        <div className="lg:col-span-3 flex flex-col gap-2">
          <h3 style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em', padding: '0 0.5rem', margin: '0 0 0.25rem 0' }}>
            Knowledge Clusters
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {categories.map((c) => {
              const isSelected = (selectedCategory === 'All' && c.id === 'all') || selectedCategory.includes(c.label.split(' ')[0]);
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setSelectedCategory(c.id === 'all' ? 'All' : c.label.split(' ')[0])}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    borderRadius: '12px',
                    border: isSelected ? '1px solid #0284c7' : '1px solid var(--border)',
                    backgroundColor: isSelected ? 'rgba(56, 189, 248, 0.1)' : 'var(--surface)',
                    color: isSelected ? '#0284c7' : 'var(--text-secondary)',
                    fontWeight: isSelected ? 700 : 500,
                    fontSize: '13px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    transition: 'all 200ms ease',
                    boxShadow: isSelected ? '0 2px 8px rgba(2, 132, 199, 0.15)' : 'none',
                    textAlign: 'left',
                  }}
                >
                  <span>{c.label}</span>
                  <span
                    style={{
                      fontSize: '11px',
                      padding: '2px 8px',
                      borderRadius: '9999px',
                      backgroundColor: isSelected ? '#0284c7' : 'var(--surface-secondary)',
                      color: isSelected ? '#ffffff' : 'var(--text-tertiary)',
                      fontWeight: 700,
                    }}
                  >
                    {c.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Articles List (9 cols) */}
        <div className="lg:col-span-9 flex flex-col gap-4">
          {activeArticle ? (
            /* Article Reader View */
            <Card className="border shadow-sm">
              <CardHeader
                title={activeArticle.title}
                subtitle={`${activeArticle.category} • Updated ${activeArticle.updated}`}
              />
              <CardBody className="p-6 flex flex-col gap-4">
                <Button variant="outline" size="sm" icon={ArrowLeft} onClick={() => setActiveArticle(null)}>
                  Back to Articles
                </Button>

                <div className="p-4 rounded-xl bg-surface-secondary border border-border text-xs text-primary leading-relaxed font-semibold">
                  {activeArticle.summary}
                </div>

                <div className="text-sm text-primary leading-relaxed whitespace-pre-line font-normal" style={{ lineHeight: 1.7 }}>
                  {activeArticle.content}
                </div>

                <div className="pt-6 border-t border-border flex items-center justify-between text-xs text-tertiary flex-wrap gap-3">
                  <span>Was this article helpful?</span>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      icon={ThumbsUp}
                      onClick={() => addToast({ title: 'Feedback Recorded', message: 'Marked as helpful.', type: 'success' })}
                    >
                      Helpful ({activeArticle.likes})
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      icon={ThumbsDown}
                      onClick={() => addToast({ title: 'Feedback Recorded', message: 'We will improve this document.', type: 'info' })}
                    >
                      Not Helpful
                    </Button>
                  </div>
                </div>
              </CardBody>
            </Card>
          ) : (
            /* Articles Grid */
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between text-xs font-bold text-secondary px-1">
                <span>Verified Articles ({filteredArticles.length})</span>
                <span>Sorted by Views</span>
              </div>

              {filteredArticles.map((art) => (
                <div
                  key={art.id}
                  onClick={() => setActiveArticle(art)}
                  style={{
                    padding: '1.25rem',
                    borderRadius: '14px',
                    border: '1px solid var(--border)',
                    backgroundColor: 'var(--surface)',
                    cursor: 'pointer',
                    transition: 'all 200ms ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1rem',
                  }}
                  className="hover:border-sky-500 hover:shadow-md group"
                >
                  <div className="flex flex-col gap-1.5 flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span
                        style={{
                          fontSize: '11px',
                          fontWeight: 700,
                          fontFamily: 'var(--font-mono)',
                          padding: '2px 8px',
                          borderRadius: '6px',
                          backgroundColor: 'var(--surface-secondary)',
                          color: '#0284c7',
                        }}
                      >
                        {art.category}
                      </span>
                      <span className="text-[11px] text-tertiary">{art.readTime}</span>
                    </div>
                    <h3 className="font-bold text-sm text-primary group-hover:text-sky-600 transition-colors" style={{ margin: 0 }}>
                      {art.title}
                    </h3>
                    <p className="text-xs text-secondary leading-relaxed" style={{ margin: 0, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {art.summary}
                    </p>
                    <div className="flex items-center gap-3 text-[11px] text-tertiary pt-1">
                      <span className="flex items-center gap-1"><Eye size={12} /> {art.views.toLocaleString()} views</span>
                      <span>•</span>
                      <span>Updated {art.updated}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-xs font-bold text-sky-600 group-hover:translate-x-1 transition-transform flex-shrink-0">
                    <span>Read Guide</span>
                    <ChevronRight size={15} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default KnowledgeBase;
