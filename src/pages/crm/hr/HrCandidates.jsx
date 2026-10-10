import React, { useState } from 'react';
import {
  Users,
  UserCheck,
  Search,
  Filter,
  Star,
  Sparkles,
  FileText,
  Mail,
  Phone,
  Calendar,
  CheckCircle2,
  Clock,
  ChevronRight,
  Plus,
  Briefcase
} from 'lucide-react';
import {
  Breadcrumb,
  Card,
  CardHeader,
  CardBody,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  Badge,
  KPICard,
  Button,
  Drawer,
  Input
} from '../../../components/ui';
import { useHr } from '../../../context/HrContext';
import { useToast } from '../../../context/ToastContext';

export const HrCandidates = () => {
  const { candidates } = useHr();
  const { addToast } = useToast();

  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [stageFilter, setStageFilter] = useState('All');

  const detailedCandidates = [
    {
      id: 'CAN-801',
      name: 'Sarah Lin',
      position: 'Senior Supply Chain Director',
      stage: 'Executive Panel',
      score: '96% AI Match',
      email: 's.lin@techlogistics.org',
      phone: '+1 (555) 432-8910',
      experience: '9 Years',
      appliedDate: '2026-09-08',
      skills: ['Supply Chain Operations', 'ERP NetSuite', 'Freight Logistics', 'Vendor Negotiations'],
      summary: 'Proven supply chain executive with Fortune 500 leadership experience. Handled $140M annual freight logistics.',
    },
    {
      id: 'CAN-802',
      name: 'Marcus Sterling',
      position: 'Enterprise Deal Structuring Lead',
      stage: 'Offer Extended',
      score: '94% AI Match',
      email: 'm.sterling@investorcapital.com',
      phone: '+1 (555) 678-1234',
      experience: '7 Years',
      appliedDate: '2026-09-04',
      skills: ['Auto Desking', 'Commercial Debt Lines', 'Contract Redlining', 'B2B Sales'],
      summary: 'Former desking manager for multi-location franchise auto group. Generated $32M in financed automotive volume.',
    },
    {
      id: 'CAN-803',
      name: 'Elena Rostova',
      position: 'Senior Full-Stack AI Engineer',
      stage: 'Technical Interview',
      score: '91% AI Match',
      email: 'elena.rostova@ai-cloud.io',
      phone: '+1 (555) 890-4567',
      experience: '6 Years',
      appliedDate: '2026-09-11',
      skills: ['React', 'Python Neural RAG', 'PostgreSQL', 'FastAPI'],
      summary: 'Specializes in semantic search, vector embeddings, and real-time enterprise telemetry pipelines.',
    },
    {
      id: 'CAN-804',
      name: 'David Chen',
      position: 'Senior Financial Controller',
      stage: 'Screened',
      score: '88% AI Match',
      email: 'd.chen@auditglobal.com',
      phone: '+1 (555) 321-9876',
      experience: '8 Years',
      appliedDate: '2026-09-13',
      skills: ['GAAP Compliance', 'ERP General Ledgers', 'Cash Flow Modeling', 'Tax Filings'],
      summary: 'CPA certified controller with extensive experience in multi-entity consolidation and automated audits.',
    },
  ];

  const filteredCandidates = detailedCandidates.filter((c) => {
    const matchesStage = stageFilter === 'All' || c.stage === stageFilter;
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.position.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStage && matchesSearch;
  });

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <Breadcrumb items={[{ label: 'iCanvass PDM' }, { label: 'HR & Recruiting' }, { label: 'Candidates ATS Pool' }]} />
          <div className="flex items-center gap-3 mt-1">
            <h1 className="text-2xl font-bold font-display tracking-tight text-primary flex items-center gap-2">
              Applicant Tracking & Candidate Pool
            </h1>
            <Badge variant="primary" className="bg-sky-500 text-primary font-bold text-xs uppercase tracking-wider">
              AI Resume Matching
            </Badge>
          </div>
          <p className="text-xs text-secondary mt-0.5">
            Screen applicant profiles, inspect AI skill affinity scores, and manage hiring stages across all open corporate requisitions.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          icon={Plus}
          onClick={() => addToast({ title: 'Add Candidate', message: 'Manual candidate entry modal opened.', type: 'info' })}
        >
          Add Candidate Dossier
        </Button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KPICard title="Total Active Applicants" value="64 Candidates" change="4 Open Requisitions" changeType="positive" icon={Users} />
        <KPICard title="In Interview Stages" value="12 Candidates" change="Panel & Technical" changeType="positive" icon={UserCheck} />
        <KPICard title="Average Time to Hire" value="16 Days" change="-4 Days Faster" changeType="positive" icon={Clock} />
        <KPICard title="Offer Acceptance Rate" value="92.4%" change="Above Industry Benchmark" changeType="positive" icon={CheckCircle2} />
      </div>

      {/* Filter Bar */}
      <Card className="border shadow-sm p-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto scrollbar-thin">
            {['All', 'Screened', 'Technical Interview', 'Executive Panel', 'Offer Extended'].map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => setStageFilter(st)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer border ${
                  stageFilter === st
                    ? 'bg-blue-600 text-primary border-blue-600 shadow-sm'
                    : 'bg-surface text-secondary border-border hover:border-sky-400'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          <div className="w-full md:w-64">
            <Input
              placeholder="Search candidate or title..."
              icon={Search}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </Card>

      {/* Candidate Table */}
      <Card className="border shadow-sm">
        <CardHeader title="Candidate Dossier Roster" subtitle="Click any candidate to open the comprehensive profile drawer" />
        <CardBody className="p-0 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell isHeader>Candidate</TableCell>
                <TableCell isHeader>Applied Position</TableCell>
                <TableCell isHeader>Pipeline Stage</TableCell>
                <TableCell isHeader>AI Match Affinity</TableCell>
                <TableCell isHeader>Experience</TableCell>
                <TableCell isHeader>Applied Date</TableCell>
                <TableCell isHeader>Action</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCandidates.map((c) => (
                <TableRow
                  key={c.id}
                  onClick={() => setSelectedCandidate(c)}
                  className="cursor-pointer hover:bg-surface-secondary transition-colors"
                >
                  <TableCell>
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-600 font-bold text-xs flex items-center justify-center">
                        {c.name.split(' ').map((n) => n[0]).join('')}
                      </div>
                      <div>
                        <span className="font-bold text-primary block">{c.name}</span>
                        <span className="text-[10px] font-mono text-tertiary">{c.id}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell><span className="font-semibold text-primary">{c.position}</span></TableCell>
                  <TableCell>
                    <Badge variant={c.stage === 'Offer Extended' ? 'success' : c.stage === 'Executive Panel' ? 'primary' : 'default'}>
                      {c.stage}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className="font-bold text-emerald-600 text-xs flex items-center gap-1">
                      <Sparkles size={12} />
                      {c.score}
                    </span>
                  </TableCell>
                  <TableCell><span className="text-xs text-secondary">{c.experience}</span></TableCell>
                  <TableCell><span className="text-xs text-secondary">{c.appliedDate}</span></TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" icon={ChevronRight} className="text-sky-600">
                      View Profile
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>

      {/* Candidate Profile Drawer */}
      {selectedCandidate && (
        <Drawer
          isOpen={Boolean(selectedCandidate)}
          onClose={() => setSelectedCandidate(null)}
          title={`Candidate Dossier: ${selectedCandidate.name}`}
          position="right"
          width="480px"
        >
          <div className="p-5 flex flex-col gap-5">
            {/* Header Identity Card */}
            <div className="p-4 rounded-2xl bg-surface-secondary border border-border flex items-start justify-between">
              <div>
                <h3 className="text-base font-bold text-primary">{selectedCandidate.name}</h3>
                <p className="text-xs font-semibold text-sky-600">{selectedCandidate.position}</p>
                <div className="flex items-center gap-3 mt-2 text-xs text-secondary">
                  <span className="flex items-center gap-1"><Mail size={12} /> {selectedCandidate.email}</span>
                  <span className="flex items-center gap-1"><Phone size={12} /> {selectedCandidate.phone}</span>
                </div>
              </div>
              <Badge variant="success" className="font-mono text-xs">{selectedCandidate.score}</Badge>
            </div>

            {/* Stage Progress */}
            <div>
              <label className="text-xs font-bold text-primary mb-1.5 block">Active Interview Stage</label>
              <div className="p-3 rounded-xl border border-border bg-surface flex items-center justify-between">
                <span className="text-xs font-bold text-primary">{selectedCandidate.stage}</span>
                <Badge variant="primary">Advancement Eligible</Badge>
              </div>
            </div>

            {/* Candidate Summary */}
            <div>
              <label className="text-xs font-bold text-primary mb-1.5 block">Executive Background Summary</label>
              <p className="text-xs text-secondary leading-relaxed p-3 rounded-xl bg-surface border border-border">
                {selectedCandidate.summary}
              </p>
            </div>

            {/* Skills Badges */}
            <div>
              <label className="text-xs font-bold text-primary mb-1.5 block">Verified Technical Competencies</label>
              <div className="flex flex-wrap gap-1.5">
                {selectedCandidate.skills.map((sk, i) => (
                  <span key={i} className="px-2.5 py-1 rounded-lg bg-surface border border-border text-xs font-semibold text-primary">
                    {sk}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-border flex items-center gap-2">
              <Button
                variant="primary"
                size="sm"
                className="flex-1 font-bold"
                onClick={() => addToast({ title: 'Stage Advanced', message: `${selectedCandidate.name} moved to next round.`, type: 'success' })}
              >
                Advance to Next Stage
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => addToast({ title: 'Schedule Call', message: 'Calendar invitation queued.', type: 'info' })}
              >
                Schedule Panel
              </Button>
            </div>
          </div>
        </Drawer>
      )}
    </div>
  );
};

export default HrCandidates;
