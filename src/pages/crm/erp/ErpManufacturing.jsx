import React, { useState } from 'react';
import {
  Factory,
  Cpu,
  Layers,
  CheckCircle2,
  Clock,
  Plus,
  Play,
  Settings,
  AlertTriangle,
  GitBranch,
  Boxes
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

export const ErpManufacturing = () => {
  const { addToast } = useToast();
  const [activeTab, setActiveTab] = useState('workorders');

  const workOrders = [
    { id: 'WO-9901', product: 'Autonomous Vehicle Telemetry Unit v4', targetQty: '250 units', completed: '190 units', line: 'Line 1 (Austin)', status: 'In Production', progress: '76%' },
    { id: 'WO-9902', product: 'LiDAR Gateway Enclosure Kit', targetQty: '100 units', completed: '100 units', line: 'Line 2 (Austin)', status: 'QA Passed', progress: '100%' },
    { id: 'WO-9903', product: 'Enterprise CAN-Bus Wiring Harness', targetQty: '500 units', completed: '80 units', line: 'Line 3 (Dallas)', status: 'In Production', progress: '16%' },
  ];

  const bomItems = [
    { part: 'Alloy Chassis Shell #801', parent: 'Telemetry Unit v4', requiredQty: '1 per unit', source: 'Austin Warehouse', cost: '$45.00' },
    { part: 'Quad-Core Neural SoC Board', parent: 'Telemetry Unit v4', requiredQty: '1 per unit', source: 'Apex Semiconductor', cost: '$120.00' },
    { part: 'Heavy-Duty Waterproof Sealant', parent: 'Telemetry Unit v4', requiredQty: '25 ml', source: 'Internal Supplies', cost: '$4.20' },
    { part: 'High-Gain GPS Patch Antenna', parent: 'Telemetry Unit v4', requiredQty: '2 per unit', source: 'Texas Optical', cost: '$18.00' },
  ];

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <Breadcrumb items={[{ label: 'iCanvass PDM' }, { label: 'ERP & Operations' }, { label: 'Manufacturing & Assembly' }]} />
          <div className="flex items-center gap-3 mt-1">
            <h1 className="text-2xl font-bold font-display tracking-tight text-primary flex items-center gap-2">
              Manufacturing Assembly & Work Orders
            </h1>
            <Badge variant="primary" className="bg-sky-500 text-primary font-bold text-xs uppercase tracking-wider">
              Shop Floor Execution
            </Badge>
          </div>
          <p className="text-xs text-secondary mt-0.5">
            Production planning, Multi-level Bill of Materials (BOM), Assembly work orders, and shop-floor yield analytics.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          icon={Plus}
          onClick={() => addToast({ title: 'New Work Order', message: 'Work Order creation wizard launched.', type: 'info' })}
        >
          Issue Work Order
        </Button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KPICard title="Active Assembly Lines" value="3 Production Lines" change="Austin & Dallas" changeType="positive" icon={Factory} />
        <KPICard title="Work Orders in Progress" value="8 Orders" change="850 Units Scheduled" changeType="positive" icon={Layers} />
        <KPICard title="Shop Floor Yield" value="99.4%" change="+0.6% Efficiency" changeType="positive" icon={CheckCircle2} />
        <KPICard title="Overall Equipment (OEE)" value="89.2%" change="Optimal Health" changeType="positive" icon={Cpu} />
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-border pb-2">
        <button
          type="button"
          onClick={() => setActiveTab('workorders')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'workorders'
              ? 'bg-blue-600 text-primary shadow-sm'
              : 'text-secondary hover:text-primary hover:bg-surface-secondary'
          }`}
        >
          Active Work Orders (WO)
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('bom')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'bom'
              ? 'bg-blue-600 text-primary shadow-sm'
              : 'text-secondary hover:text-primary hover:bg-surface-secondary'
          }`}
        >
          Bill of Materials (BOM) Hierarchy
        </button>
      </div>

      {/* Content */}
      {activeTab === 'workorders' ? (
        <Card className="border shadow-sm">
          <CardHeader title="Shop Floor Assembly Orders" subtitle="Real-time completion tracking per manufacturing line" />
          <CardBody className="p-0 overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableCell isHeader>Work Order #</TableCell>
                  <TableCell isHeader>Manufactured Assembly</TableCell>
                  <TableCell isHeader>Target Volume</TableCell>
                  <TableCell isHeader>Completed Units</TableCell>
                  <TableCell isHeader>Assembly Line</TableCell>
                  <TableCell isHeader>Production Progress</TableCell>
                  <TableCell isHeader>Status</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {workOrders.map((wo) => (
                  <TableRow key={wo.id}>
                    <TableCell><span className="font-mono text-xs font-bold text-sky-600">{wo.id}</span></TableCell>
                    <TableCell><span className="font-semibold text-primary">{wo.product}</span></TableCell>
                    <TableCell><span className="text-xs font-bold text-primary">{wo.targetQty}</span></TableCell>
                    <TableCell><span className="text-xs text-secondary">{wo.completed}</span></TableCell>
                    <TableCell><span className="text-xs text-secondary">{wo.line}</span></TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-surface-secondary rounded-full h-2 overflow-hidden border border-border">
                          <div className="bg-sky-500 h-full rounded-full" style={{ width: wo.progress }} />
                        </div>
                        <span className="text-xs font-bold text-primary">{wo.progress}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={wo.status === 'QA Passed' ? 'success' : 'primary'}>{wo.status}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardBody>
        </Card>
      ) : (
        <Card className="border shadow-sm">
          <CardHeader title="Multi-Level Bill of Materials (BOM)" subtitle="Component breakdown and unit cost allocation" />
          <CardBody className="p-0 overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableCell isHeader>Component Part</TableCell>
                  <TableCell isHeader>Parent Assembly</TableCell>
                  <TableCell isHeader>Required Quantity</TableCell>
                  <TableCell isHeader>Primary Source</TableCell>
                  <TableCell isHeader>Unit Component Cost</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bomItems.map((b, i) => (
                  <TableRow key={i}>
                    <TableCell><span className="font-semibold text-primary">{b.part}</span></TableCell>
                    <TableCell><span className="text-xs text-secondary">{b.parent}</span></TableCell>
                    <TableCell><span className="text-xs font-bold text-primary">{b.requiredQty}</span></TableCell>
                    <TableCell><span className="text-xs text-secondary">{b.source}</span></TableCell>
                    <TableCell><span className="font-mono text-xs font-bold text-emerald-600">{b.cost}</span></TableCell>
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

export default ErpManufacturing;
