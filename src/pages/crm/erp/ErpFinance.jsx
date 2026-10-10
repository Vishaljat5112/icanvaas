import React, { useState } from 'react';
import {
  DollarSign,
  TrendingUp,
  FileText,
  CreditCard,
  Download,
  Filter,
  Plus,
  ArrowUpRight,
  ArrowDownLeft,
  CheckCircle2,
  Clock,
  AlertCircle
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
  Select
} from '../../../components/ui';
import { useToast } from '../../../context/ToastContext';

export const ErpFinance = () => {
  const { addToast } = useToast();
  const [activeTab, setActiveTab] = useState('ledgers');

  const kpis = [
    { title: 'Total Enterprise Assets', value: '$4.28M', change: '+14.2% YoY', changeType: 'positive', icon: DollarSign },
    { title: 'Accounts Receivable (AR)', value: '$480,000', change: '94% Current (Net 30)', changeType: 'positive', icon: ArrowUpRight },
    { title: 'Accounts Payable (AP)', value: '$127,500', change: 'Zero Overdue Penalties', changeType: 'positive', icon: ArrowDownLeft },
    { title: 'Operating Cash Flow', value: '$1.60M', change: '+18.5% Q3 Net', changeType: 'positive', icon: TrendingUp },
  ];

  const ledgers = [
    { id: 'GL-1001', account: 'Corporate Operational Reserves (Chase)', type: 'Asset', balance: '$1,250,000', status: 'Reconciled', updated: 'Today, 08:30 AM' },
    { id: 'GL-1002', account: 'Accounts Receivable (Trade Debtors)', type: 'Asset', balance: '$480,000', status: 'Reconciled', updated: 'Yesterday' },
    { id: 'GL-2001', account: 'Accounts Payable (Vendor Liabilities)', type: 'Liability', balance: '$127,500', status: 'Pending Review', updated: 'Sep 12, 2026' },
    { id: 'GL-2002', account: 'Short-Term Working Capital Facility (OAL)', type: 'Liability', balance: '$350,000', status: 'Active Facility', updated: 'Sep 01, 2026' },
    { id: 'GL-3001', account: 'Retained Enterprise Earnings', type: 'Equity', balance: '$2,072,500', status: 'Audited', updated: 'Q2 Close' },
  ];

  const invoices = [
    { id: 'INV-2026-881', client: 'Apex Global Technologies', amount: '$150,000', date: '2026-09-10', due: '2026-10-10', status: 'Sent' },
    { id: 'INV-2026-880', client: 'Vanguard Capital Partners', amount: '$75,000', date: '2026-09-08', due: '2026-10-08', status: 'Paid' },
    { id: 'INV-2026-879', client: 'BioGenix Labs Inc.', amount: '$42,500', date: '2026-09-01', due: '2026-10-01', status: 'Paid' },
    { id: 'INV-2026-878', client: 'Hyperion Logistics Fleet', amount: '$85,000', date: '2026-08-25', due: '2026-09-25', status: 'Overdue' },
  ];

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <Breadcrumb items={[{ label: 'iCanvass PDM' }, { label: 'ERP & Operations' }, { label: 'Finance & Accounting' }]} />
          <div className="flex items-center gap-3 mt-1">
            <h1 className="text-2xl font-bold font-display tracking-tight text-primary flex items-center gap-2">
              Financial Accounting & General Ledgers
            </h1>
            <Badge variant="primary" className="bg-sky-500 text-primary font-bold text-xs uppercase tracking-wider">
              GAAP & SOC-2 Compliant
            </Badge>
          </div>
          <p className="text-xs text-secondary mt-0.5">
            Real-time balance sheets, receivables, payables, and automated bank reconciliation with OAL Network lending bridges.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            icon={Download}
            onClick={() => addToast({ title: 'Exporting Financial Statements', message: 'PDF Balance Sheet downloaded.', type: 'success' })}
          >
            Export Statements
          </Button>
          <Button
            variant="primary"
            size="sm"
            icon={Plus}
            onClick={() => addToast({ title: 'New Journal Entry', message: 'Double-entry journal modal opened.', type: 'info' })}
          >
            Create Journal Entry
          </Button>
        </div>
      </div>

      {/* Financial KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {kpis.map((kpi, idx) => (
          <KPICard
            key={idx}
            title={kpi.title}
            value={kpi.value}
            change={kpi.change}
            changeType={kpi.changeType}
            icon={kpi.icon}
          />
        ))}
      </div>

      {/* Tabs Switcher */}
      <div className="flex items-center gap-2 border-b border-border pb-2">
        <button
          type="button"
          onClick={() => setActiveTab('ledgers')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'ledgers'
              ? 'bg-blue-600 text-primary shadow-sm'
              : 'text-secondary hover:text-primary hover:bg-surface-secondary'
          }`}
        >
          General Ledgers & Chart of Accounts
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('invoices')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'invoices'
              ? 'bg-blue-600 text-primary shadow-sm'
              : 'text-secondary hover:text-primary hover:bg-surface-secondary'
          }`}
        >
          Invoices & Receivables (AR)
        </button>
      </div>

      {/* Content Section */}
      {activeTab === 'ledgers' ? (
        <Card className="border shadow-sm">
          <CardHeader
            title="General Ledger Chart of Accounts"
            subtitle="Verified balance sheet positions updated in real-time"
          />
          <CardBody className="p-0 overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableCell isHeader>GL Code</TableCell>
                  <TableCell isHeader>Account Title</TableCell>
                  <TableCell isHeader>Classification</TableCell>
                  <TableCell isHeader>Net Balance</TableCell>
                  <TableCell isHeader>Reconciliation Status</TableCell>
                  <TableCell isHeader>Last Sync</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ledgers.map((l) => (
                  <TableRow key={l.id}>
                    <TableCell><span className="font-mono text-xs font-bold text-primary">{l.id}</span></TableCell>
                    <TableCell><span className="font-semibold text-primary">{l.account}</span></TableCell>
                    <TableCell>
                      <Badge variant={l.type === 'Asset' ? 'primary' : l.type === 'Liability' ? 'warning' : 'default'}>
                        {l.type}
                      </Badge>
                    </TableCell>
                    <TableCell><span className="font-black text-sm text-primary">{l.balance}</span></TableCell>
                    <TableCell>
                      <Badge variant={l.status === 'Reconciled' || l.status === 'Audited' ? 'success' : 'warning'}>
                        {l.status}
                      </Badge>
                    </TableCell>
                    <TableCell><span className="text-[11px] text-tertiary">{l.updated}</span></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardBody>
        </Card>
      ) : (
        <Card className="border shadow-sm">
          <CardHeader
            title="Enterprise Accounts Receivable (Invoices)"
            subtitle="Client invoicing lifecycle and automated payment status"
          />
          <CardBody className="p-0 overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableCell isHeader>Invoice #</TableCell>
                  <TableCell isHeader>Client Account</TableCell>
                  <TableCell isHeader>Issued Date</TableCell>
                  <TableCell isHeader>Due Date</TableCell>
                  <TableCell isHeader>Total Amount</TableCell>
                  <TableCell isHeader>Payment Status</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map((inv) => (
                  <TableRow key={inv.id}>
                    <TableCell><span className="font-mono text-xs font-bold text-sky-600">{inv.id}</span></TableCell>
                    <TableCell><span className="font-semibold text-primary">{inv.client}</span></TableCell>
                    <TableCell><span className="text-xs text-secondary">{inv.date}</span></TableCell>
                    <TableCell><span className="text-xs text-secondary">{inv.due}</span></TableCell>
                    <TableCell><span className="font-bold text-sm text-primary">{inv.amount}</span></TableCell>
                    <TableCell>
                      <Badge variant={inv.status === 'Paid' ? 'success' : inv.status === 'Sent' ? 'primary' : 'error'}>
                        {inv.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardBody>
        </Card>
      )}
    </div>
  );
};

export default ErpFinance;
