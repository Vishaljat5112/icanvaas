import React, { useState } from 'react';
import {
  Boxes,
  Package,
  AlertTriangle,
  RefreshCw,
  Plus,
  Search,
  Filter,
  Warehouse,
  CheckCircle2,
  TrendingDown,
  ArrowDownRight
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
  Select,
  Input
} from '../../../components/ui';
import { useToast } from '../../../context/ToastContext';

export const ErpInventory = () => {
  const { addToast } = useToast();
  const [selectedWarehouse, setSelectedWarehouse] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const warehouses = [
    { value: 'all', label: 'All Warehouses (Global Consolidated)' },
    { value: 'wh-austin', label: 'Austin Central Distribution Hub (Texas)' },
    { value: 'wh-dallas', label: 'Dallas Logistics & Freight Terminal' },
    { value: 'wh-houston', label: 'Houston Maritime Port Vault' },
  ];

  const inventoryItems = [
    { id: 'SKU-8910', name: 'Commercial Telemetry GPS Gateways', category: 'Hardware', stock: 450, minThreshold: 100, warehouse: 'Austin Central', unitCost: '$120.00', status: 'Optimal' },
    { id: 'SKU-8911', name: 'Optical LiDAR Obstacle Sensors', category: 'Sensors', stock: 42, minThreshold: 50, warehouse: 'Austin Central', unitCost: '$480.00', status: 'Low Stock' },
    { id: 'SKU-8912', name: 'Fleet Diagnostic CAN-Bus Cables', category: 'Cables', stock: 1200, minThreshold: 200, warehouse: 'Dallas Logistics', unitCost: '$18.50', status: 'Optimal' },
    { id: 'SKU-8913', name: 'Industrial Edge AI Processing Units', category: 'Compute', stock: 18, minThreshold: 25, warehouse: 'Houston Port', unitCost: '$1,450.00', status: 'Critical Reorder' },
    { id: 'SKU-8914', name: 'Smart Vehicle Security Transponders', category: 'Hardware', stock: 680, minThreshold: 150, warehouse: 'Dallas Logistics', unitCost: '$65.00', status: 'Optimal' },
  ];

  const filteredItems = inventoryItems.filter((item) => {
    const matchesWarehouse = selectedWarehouse === 'all' || item.warehouse.toLowerCase().includes(selectedWarehouse.replace('wh-', ''));
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || item.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesWarehouse && matchesSearch;
  });

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <Breadcrumb items={[{ label: 'iCanvass PDM' }, { label: 'ERP & Operations' }, { label: 'Inventory & Warehousing' }]} />
          <div className="flex items-center gap-3 mt-1">
            <h1 className="text-2xl font-bold font-display tracking-tight text-primary flex items-center gap-2">
              Warehouse Inventory & Multi-Hub Stock
            </h1>
            <Badge variant="primary" className="bg-sky-500 text-primary font-bold text-xs uppercase tracking-wider">
              Autonomous Replenishment
            </Badge>
          </div>
          <p className="text-xs text-secondary mt-0.5">
            Multi-location inventory tracking, automated minimum stock alerts, and direct procurement dispatch.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="primary"
            size="sm"
            icon={Plus}
            onClick={() => addToast({ title: 'New Stock Item', message: 'Add SKU modal launched.', type: 'info' })}
          >
            Add SKU Catalog Item
          </Button>
        </div>
      </div>

      {/* KPI Highlights */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KPICard title="Total Active SKUs" value="482 Items" change="3 Hub Locations" changeType="positive" icon={Boxes} />
        <KPICard title="Total Inventory Valuation" value="$2.34M" change="At Cost Basis" changeType="positive" icon={Package} />
        <KPICard title="Stock Reorder Triggers" value="2 Items Low" change="Automated PR Prepared" changeType="warning" icon={AlertTriangle} />
        <KPICard title="Inventory Accuracy" value="99.8%" change="Barcode Scan Verified" changeType="positive" icon={CheckCircle2} />
      </div>

      {/* Warehouse Filter Bar */}
      <Card className="border shadow-sm p-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="w-full md:w-80">
            <label className="text-xs font-bold text-primary mb-1 block">Active Warehouse Node</label>
            <Select
              value={selectedWarehouse}
              onChange={(e) => setSelectedWarehouse(e.target.value)}
              options={warehouses}
            />
          </div>

          <div className="w-full md:w-72">
            <label className="text-xs font-bold text-primary mb-1 block">Filter SKU / Part</label>
            <Input
              placeholder="Search by SKU or item name..."
              icon={Search}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </Card>

      {/* Inventory Table */}
      <Card className="border shadow-sm">
        <CardHeader
          title="Consolidated SKU Stock Positions"
          subtitle="Showing items matching selected warehouse and criteria"
        />
        <CardBody className="p-0 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell isHeader>SKU Code</TableCell>
                <TableCell isHeader>Product Name</TableCell>
                <TableCell isHeader>Category</TableCell>
                <TableCell isHeader>Current Stock</TableCell>
                <TableCell isHeader>Min Threshold</TableCell>
                <TableCell isHeader>Warehouse Node</TableCell>
                <TableCell isHeader>Unit Cost</TableCell>
                <TableCell isHeader>Stock Status</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell><span className="font-mono text-xs font-bold text-sky-600">{item.id}</span></TableCell>
                  <TableCell><span className="font-semibold text-primary">{item.name}</span></TableCell>
                  <TableCell><Badge variant="default">{item.category}</Badge></TableCell>
                  <TableCell><span className="font-black text-sm text-primary">{item.stock} units</span></TableCell>
                  <TableCell><span className="text-xs text-secondary">{item.minThreshold} units</span></TableCell>
                  <TableCell><span className="text-xs font-medium text-primary">{item.warehouse}</span></TableCell>
                  <TableCell><span className="font-mono text-xs font-bold text-primary">{item.unitCost}</span></TableCell>
                  <TableCell>
                    <Badge variant={item.status === 'Optimal' ? 'success' : item.status === 'Low Stock' ? 'warning' : 'error'}>
                      {item.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
};

export default ErpInventory;
