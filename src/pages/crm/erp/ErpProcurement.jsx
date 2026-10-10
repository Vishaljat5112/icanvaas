import React, { useState } from 'react';
import {
  FileText,
  ShoppingBag,
  Building2,
  CheckCircle2,
  Clock,
  Plus,
  ArrowRight,
  Filter,
  DollarSign,
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
  Button
} from '../../../components/ui';
import { useToast } from '../../../context/ToastContext';

export const ErpProcurement = () => {
  const { addToast } = useToast();
  const [activeTab, setActiveTab] = useState('orders');

  const purchaseOrders = [
    { id: 'PO-2026-401', vendor: 'Apex Semiconductor Fab', amount: '$64,000', date: '2026-09-12', items: '500x Telemetry Chips', status: 'Approved', eta: 'Sep 22, 2026' },
    { id: 'PO-2026-402', vendor: 'Texas Optical Sensor Corp', amount: '$32,500', date: '2026-09-10', items: '100x LiDAR Modules', status: 'In Transit', eta: 'Sep 18, 2026' },
    { id: 'PO-2026-403', vendor: 'Global Logistics Cables Inc.', amount: '$9,200', date: '2026-09-08', items: '1,000x Diagnostic Harnesses', status: 'Delivered', eta: 'Received' },
    { id: 'PO-2026-404', vendor: 'BioGenix Edge Systems', amount: '$18,500', date: '2026-09-02', items: '25x Edge AI Racks', status: 'Pending Approval', eta: 'Awaiting Sign-off' },
  ];

  const vendors = [
    { id: 'VND-01', name: 'Apex Semiconductor Fab', rating: '99.2% Reliability', category: 'Silicon / Compute', spendYtd: '$480,000', status: 'Tier 1 Preferred' },
    { id: 'VND-02', name: 'Texas Optical Sensor Corp', rating: '96.8% Reliability', category: 'Optics & LiDAR', spendYtd: '$240,000', status: 'Tier 1 Preferred' },
    { id: 'VND-03', name: 'Global Logistics Cables Inc.', rating: '98.5% Reliability', category: 'Wiring & Harnesses', spendYtd: '$95,000', status: 'Approved Vendor' },
  ];

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <Breadcrumb items={[{ label: 'iCanvass PDM' }, { label: 'ERP & Operations' }, { label: 'Procurement & Purchasing' }]} />
          <div className="flex items-center gap-3 mt-1">
            <h1 className="text-2xl font-bold font-display tracking-tight text-primary flex items-center gap-2">
              Procurement & Vendor Purchase Orders
            </h1>
            <Badge variant="primary" className="bg-sky-500 text-primary font-bold text-xs uppercase tracking-wider">
              Automated PO Requisitions
            </Badge>
          </div>
          <p className="text-xs text-secondary mt-0.5">
            Purchase requests, electronic PO approvals, supplier performance scorecards, and incoming delivery tracking.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          icon={Plus}
          onClick={() => addToast({ title: 'New PO Requisition', message: 'PO creation wizard initiated.', type: 'info' })}
        >
          Create Purchase Order
        </Button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KPICard title="Active Purchase Orders" value="12 Orders" change="$124,200 Total Value" changeType="positive" icon={ShoppingBag} />
        <KPICard title="Pending Sign-Off" value="1 Order" change="Requires CEO Approval" changeType="warning" icon={Clock} />
        <KPICard title="Preferred Vendors" value="18 Suppliers" change="98.4% On-Time Delivery" changeType="positive" icon={Building2} />
        <KPICard title="YTD Procurement Spend" value="$815,000" change="-8.2% Under Budget" changeType="positive" icon={DollarSign} />
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-border pb-2">
        <button
          type="button"
          onClick={() => setActiveTab('orders')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'orders'
              ? 'bg-blue-600 text-primary shadow-sm'
              : 'text-secondary hover:text-primary hover:bg-surface-secondary'
          }`}
        >
          Purchase Orders (POs)
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('vendors')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'vendors'
              ? 'bg-blue-600 text-primary shadow-sm'
              : 'text-secondary hover:text-primary hover:bg-surface-secondary'
          }`}
        >
          Approved Vendor Directory
        </button>
      </div>

      {/* Table Content */}
      {activeTab === 'orders' ? (
        <Card className="border shadow-sm">
          <CardHeader title="Purchase Order Requisitions" subtitle="Live tracking from requisition to warehouse receipt" />
          <CardBody className="p-0 overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableCell isHeader>PO Number</TableCell>
                  <TableCell isHeader>Supplier Name</TableCell>
                  <TableCell isHeader>Items Ordered</TableCell>
                  <TableCell isHeader>Order Date</TableCell>
                  <TableCell isHeader>Amount</TableCell>
                  <TableCell isHeader>Estimated Arrival</TableCell>
                  <TableCell isHeader>Approval Status</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {purchaseOrders.map((po) => (
                  <TableRow key={po.id}>
                    <TableCell><span className="font-mono text-xs font-bold text-sky-600">{po.id}</span></TableCell>
                    <TableCell><span className="font-semibold text-primary">{po.vendor}</span></TableCell>
                    <TableCell><span className="text-xs text-secondary">{po.items}</span></TableCell>
                    <TableCell><span className="text-xs text-secondary">{po.date}</span></TableCell>
                    <TableCell><span className="font-bold text-sm text-primary">{po.amount}</span></TableCell>
                    <TableCell><span className="text-xs font-medium text-primary">{po.eta}</span></TableCell>
                    <TableCell>
                      <Badge variant={po.status === 'Approved' || po.status === 'Delivered' ? 'success' : po.status === 'In Transit' ? 'primary' : 'warning'}>
                        {po.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardBody>
        </Card>
      ) : (
        <Card className="border shadow-sm">
          <CardHeader title="Enterprise Vendor Directory" subtitle="Evaluated suppliers and annual spend tracking" />
          <CardBody className="p-0 overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableCell isHeader>Vendor Code</TableCell>
                  <TableCell isHeader>Company Name</TableCell>
                  <TableCell isHeader>Commodity Category</TableCell>
                  <TableCell isHeader>Reliability Score</TableCell>
                  <TableCell isHeader>YTD Total Spend</TableCell>
                  <TableCell isHeader>Supplier Status</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {vendors.map((v) => (
                  <TableRow key={v.id}>
                    <TableCell><span className="font-mono text-xs font-bold text-primary">{v.id}</span></TableCell>
                    <TableCell><span className="font-semibold text-primary">{v.name}</span></TableCell>
                    <TableCell><span className="text-xs text-secondary">{v.category}</span></TableCell>
                    <TableCell><span className="font-bold text-emerald-600 text-xs">{v.rating}</span></TableCell>
                    <TableCell><span className="font-bold text-sm text-primary">{v.spendYtd}</span></TableCell>
                    <TableCell><Badge variant="success">{v.status}</Badge></TableCell>
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

export default ErpProcurement;
