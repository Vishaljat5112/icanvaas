import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  LifeBuoy,
  Plus,
  Eye,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Search,
  Filter,
  Users
} from 'lucide-react';
import {
  Breadcrumb,
  Button,
  Card,
  CardHeader,
  CardBody,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  Badge,
  Modal,
  Input,
  Select,
  KPICard
} from '../../../components/ui';
import { useSupport } from '../../../context/SupportContext';
import { useToast } from '../../../context/ToastContext';

const ticketStatuses = ['Open', 'In Progress', 'Waiting', 'Resolved', 'Closed'];

export const SupportTickets = () => {
  const navigate = useNavigate();
  const { tickets, addTicket, updateTicketStatus } = useSupport();
  const { addToast } = useToast();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [formData, setFormData] = useState({ subject: '', customer: 'Apex Global', priority: 'Medium', category: 'General' });

  const filteredTickets = tickets.filter((t) => {
    const matchesStatus = filterStatus === 'all' || t.status === filterStatus;
    const matchesSearch = t.subject.toLowerCase().includes(searchQuery.toLowerCase()) || t.customer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleCreate = (e) => {
    e.preventDefault();
    if (!formData.subject) return;
    addTicket(formData);
    addToast({ title: 'Ticket Created', message: `Submitted support ticket for ${formData.customer}`, type: 'success' });
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <Breadcrumb items={[{ label: 'iCanvass PDM' }, { label: 'Customer Support' }, { label: 'Tickets Directory' }]} />
          <div className="flex items-center gap-3 mt-1">
            <h1 className="text-2xl font-bold font-display tracking-tight text-primary flex items-center gap-2">
              Customer Support & SLA Desk
            </h1>
            <Badge variant="primary" className="bg-sky-500 text-primary font-bold text-xs uppercase tracking-wider">
              AI Routing Active
            </Badge>
          </div>
          <p className="text-xs text-secondary mt-0.5">
            Omnichannel ticket queue, automated severity routing, SLA resolution countdowns, and knowledge base integration.
          </p>
        </div>

        <Button variant="primary" size="sm" icon={Plus} onClick={() => setIsModalOpen(true)}>
          Create Support Ticket
        </Button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KPICard title="Total Open Tickets" value={`${tickets.length} Cases`} change="2 Awaiting First Reply" changeType="warning" icon={LifeBuoy} />
        <KPICard title="First Response Time" value="14 Minutes" change="-35% with Bestie" changeType="positive" icon={Clock} />
        <KPICard title="SLA Compliance Rate" value="99.2%" change="Tier-1 Gold SLA" changeType="positive" icon={CheckCircle2} />
        <KPICard title="Customer Satisfaction" value="4.9 / 5.0" change="Based on 140 ratings" changeType="positive" icon={Sparkles} />
      </div>

      {/* Filter Bar */}
      <Card className="border shadow-sm p-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto scrollbar-thin">
            {['all', 'Open', 'In Progress', 'Resolved'].map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => setFilterStatus(st)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer border ${
                  filterStatus === st
                    ? 'bg-blue-600 text-primary border-blue-600 shadow-sm'
                    : 'bg-surface text-secondary border-border hover:border-sky-400'
                }`}
              >
                {st === 'all' ? 'All Tickets' : st}
              </button>
            ))}
          </div>

          <div className="w-full md:w-64">
            <Input
              placeholder="Search tickets or accounts..."
              icon={Search}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </Card>

      {/* Table */}
      <Card className="border shadow-sm">
        <CardHeader title="Active Support Queue" subtitle="Click any ticket to enter the full resolution workspace" />
        <CardBody className="p-0 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell isHeader>Ticket ID</TableCell>
                <TableCell isHeader>Subject</TableCell>
                <TableCell isHeader>Customer Account</TableCell>
                <TableCell isHeader>Priority</TableCell>
                <TableCell isHeader>SLA Target</TableCell>
                <TableCell isHeader>Resolution Status</TableCell>
                <TableCell isHeader align="right">Actions</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTickets.map((tck) => (
                <TableRow key={tck.id}>
                  <TableCell><span className="font-mono text-xs font-bold text-sky-600">{tck.id}</span></TableCell>
                  <TableCell>
                    <Link to={`/crm/support/tickets/${tck.id}`} className="font-semibold text-primary hover:text-sky-600 transition-colors">
                      {tck.subject}
                    </Link>
                  </TableCell>
                  <TableCell><span className="text-xs font-medium text-secondary">{tck.customer}</span></TableCell>
                  <TableCell>
                    <Badge variant={tck.priority === 'High' ? 'error' : tck.priority === 'Medium' ? 'warning' : 'default'}>
                      {tck.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className="text-[11px] font-mono text-emerald-600 font-semibold flex items-center gap-1">
                      <Clock size={12} /> &lt; 2h remaining
                    </span>
                  </TableCell>
                  <TableCell>
                    <Select
                      value={tck.status}
                      onChange={(e) => updateTicketStatus(tck.id, e.target.value)}
                      options={ticketStatuses}
                      style={{ height: '28px', fontSize: '11px', padding: '0 0.5rem' }}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Button variant="ghost" size="sm" icon={Eye} onClick={() => navigate(`/crm/support/tickets/${tck.id}`)}>
                      Workspace
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create Support Ticket">
        <form onSubmit={handleCreate} className="flex flex-col gap-4">
          <Input label="Issue Subject" value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })} required />
          <Input label="Customer Account" value={formData.customer} onChange={(e) => setFormData({ ...formData, customer: e.target.value })} required />
          <Select label="Priority" value={formData.priority} onChange={(e) => setFormData({ ...formData, priority: e.target.value })} options={['High', 'Medium', 'Low']} />
          <Button variant="primary" type="submit">Submit Ticket</Button>
        </form>
      </Modal>
    </div>
  );
};

export default SupportTickets;
