import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  UploadCloud,
  FileText,
  Camera,
  CheckCircle2,
  AlertCircle,
  Eye,
  Trash2,
  Calendar,
  Layers,
  MapPin,
  Clock,
  ShieldCheck,
  Search,
  Filter,
  Image as ImageIcon,
  Check,
  RefreshCw,
  Plus,
  Info,
  ChevronRight,
  ExternalLink,
  FileCheck2,
  FileSpreadsheet,
  Sliders,
  DollarSign
} from 'lucide-react';
import {
  Breadcrumb,
  Button,
  Card,
  Badge,
  ProgressBar,
  Modal,
  Input,
  Select,
} from '../../../components/ui';
import { useAuth } from '../../../context/AuthContext';
import { useToast } from '../../../context/ToastContext';

export const PetitionUploads = () => {
  const navigate = useNavigate();
  const { crmUser } = useAuth();
  const { addToast } = useToast();
  const fileInputRef = useRef(null);

  // Available Projects
  const availableProjects = [
    {
      id: 'PRJ-101',
      title: 'Prop 12 - Clean Energy Ballot Initiative',
      category: 'Statewide Initiative',
      code: 'PROP-12-2026',
      rate: 3.50,
    },
    {
      id: 'PRJ-103',
      title: 'Education Bond Measure C — Public School Upgrades',
      category: 'County Bond',
      code: 'MEASURE-C-BOND',
      rate: 4.00,
    },
    {
      id: 'PRJ-104',
      title: 'Clean Drinking Water & Watershed Protection Act',
      category: 'Statewide Initiative',
      code: 'WATER-ACT-2026',
      rate: 3.75,
    },
    {
      id: 'PRJ-102',
      title: 'Local Mayor Petition (City District 4)',
      category: 'Municipal Election',
      code: 'MAYOR-DIST-4',
      rate: 2.00,
    },
  ];

  // Upload Batch Metadata State
  const [projectId, setProjectId] = useState('PRJ-101');
  const [docType, setDocType] = useState('Signed Petition Sheet (Front)');
  const [sheetNumber, setSheetNumber] = useState('1');
  const [claimedSigs, setClaimedSigs] = useState('10');
  const [selectedCounty, setSelectedCounty] = useState('Los Angeles County');
  const [uploadNotes, setUploadNotes] = useState('');

  // Selected Files Queue for Uploading
  const [stagedFiles, setStagedFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadPhaseText, setUploadPhaseText] = useState('');

  // Modal Inspection State
  const [inspectingSheet, setInspectingSheet] = useState(null);

  // Uploaded Sheets History / Vault Ledger
  const [uploadedSheets, setUploadedSheets] = useState([
    {
      id: 'UPL-9041',
      fileName: 'prop12_sheet_01_front.jpg',
      fileSize: '3.4 MB',
      fileType: 'image/jpeg',
      previewUrl: null,
      docType: 'Signed Petition Sheet (Front)',
      projectTitle: 'Prop 12 - Clean Energy Ballot Initiative',
      category: 'Statewide Initiative',
      projectCode: 'PROP-12-2026',
      sheetNumber: 'Sheet #1',
      claimedSigs: 10,
      detectedSigs: 10,
      county: 'Los Angeles County',
      date: 'Today, 1:45 PM',
      ocrConfidence: '99.2%',
      status: 'OCR Verified (10/10)',
      statusBadge: 'success',
      hash: 'sha256-e9a8f4c2...7b11',
    },
    {
      id: 'UPL-9040',
      fileName: 'prop12_sheet_01_affidavit.jpg',
      fileSize: '2.8 MB',
      fileType: 'image/jpeg',
      previewUrl: null,
      docType: 'Circulator Affidavit & Notary (Back)',
      projectTitle: 'Prop 12 - Clean Energy Ballot Initiative',
      category: 'Statewide Initiative',
      projectCode: 'PROP-12-2026',
      sheetNumber: 'Sheet #1 (Back)',
      claimedSigs: 10,
      detectedSigs: 1,
      county: 'Los Angeles County',
      date: 'Today, 1:42 PM',
      ocrConfidence: '98.5%',
      status: 'Affidavit Signed & Valid',
      statusBadge: 'success',
      hash: 'sha256-3b91fa04...99ac',
    },
    {
      id: 'UPL-9032',
      fileName: 'measure_c_alameda_sheet04.pdf',
      fileSize: '5.1 MB',
      fileType: 'application/pdf',
      previewUrl: null,
      docType: 'Signed Petition Sheet (Front)',
      projectTitle: 'Education Bond Measure C',
      category: 'County Bond',
      projectCode: 'MEASURE-C-BOND',
      sheetNumber: 'Sheet #4',
      claimedSigs: 10,
      detectedSigs: 9,
      county: 'Alameda County',
      date: 'Yesterday, 4:20 PM',
      ocrConfidence: '94.0%',
      status: 'In Review (1 Edge Warning)',
      statusBadge: 'warning',
      hash: 'sha256-78ab31cc...dd04',
    },
    {
      id: 'UPL-9018',
      fileName: 'local_mayor_sheet02_front.jpg',
      fileSize: '4.2 MB',
      fileType: 'image/jpeg',
      previewUrl: null,
      docType: 'Signed Petition Sheet (Front)',
      projectTitle: 'Local Mayor Petition (City District 4)',
      category: 'Municipal Election',
      projectCode: 'MAYOR-DIST-4',
      sheetNumber: 'Sheet #2',
      claimedSigs: 8,
      detectedSigs: 8,
      county: 'Los Angeles County',
      date: 'Oct 07, 2026',
      ocrConfidence: '99.5%',
      status: 'OCR Verified (8/8)',
      statusBadge: 'success',
      hash: 'sha256-ff1982b5...01ee',
    },
  ]);

  // Filter & Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [docFilter, setDocFilter] = useState('All');

  // Handle Local File Selection
  const handleFilesSelected = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const newStaged = files.map((file) => ({
      file,
      name: file.name,
      size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
      type: file.type,
      preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : null,
    }));

    setStagedFiles((prev) => [...prev, ...newStaged]);
    addToast({
      title: `${files.length} File(s) Selected`,
      message: 'Ready for high-resolution OCR upload. Review settings below.',
      type: 'info',
    });
  };

  const removeStagedFile = (idx) => {
    setStagedFiles((prev) => {
      const removed = prev[idx];
      if (removed && removed.preview) {
        URL.revokeObjectURL(removed.preview);
      }
      return prev.filter((_, i) => i !== idx);
    });
  };

  // Simulate Multi-Phase Cloud & OCR Upload
  const handleExecuteUpload = (e) => {
    e.preventDefault();
    if (stagedFiles.length === 0) {
      addToast({
        title: 'No Files Selected',
        message: 'Please choose or drop petition sheets to scan.',
        type: 'error',
      });
      return;
    }

    setIsUploading(true);
    setUploadProgress(15);
    setUploadPhaseText('Uploading document images to secure vault...');

    setTimeout(() => {
      setUploadProgress(45);
      setUploadPhaseText('Running high-contrast optical edge enhancement...');
    }, 700);

    setTimeout(() => {
      setUploadProgress(75);
      setUploadPhaseText('Detecting voter signature lines & zip code bounds...');
    }, 1400);

    setTimeout(() => {
      setUploadProgress(95);
      setUploadPhaseText('Hashing SHA-256 cryptographic compliance stamp...');
    }, 2000);

    setTimeout(() => {
      setUploadProgress(100);
      setIsUploading(false);

      const selectedProject = availableProjects.find((p) => p.id === projectId) || availableProjects[0];
      const parsedSigs = parseInt(claimedSigs, 10) || 10;

      const newUploadedEntries = stagedFiles.map((staged, i) => ({
        id: `UPL-${Math.floor(1000 + Math.random() * 9000)}`,
        fileName: staged.name,
        fileSize: staged.size,
        fileType: staged.type,
        previewUrl: staged.preview,
        docType: docType,
        projectTitle: selectedProject.title,
        category: selectedProject.category,
        projectCode: selectedProject.code,
        sheetNumber: `Sheet #${parseInt(sheetNumber, 10) + i}`,
        claimedSigs: parsedSigs,
        detectedSigs: parsedSigs,
        county: selectedCounty,
        date: 'Just now',
        ocrConfidence: '99.1%',
        status: `OCR Verified (${parsedSigs}/${parsedSigs})`,
        statusBadge: 'success',
        hash: `sha256-${Math.random().toString(16).substring(2, 10)}...`,
      }));

      setUploadedSheets((prev) => [...newUploadedEntries, ...prev]);
      setStagedFiles([]);

      addToast({
        title: 'Upload & OCR Scan Completed',
        message: `Processed ${newUploadedEntries.length} petition sheet(s) for ${selectedProject.title}.`,
        type: 'success',
      });
    }, 2500);
  };

  // Filtered Sheets
  const filteredSheets = uploadedSheets.filter((item) => {
    const matchesDoc = docFilter === 'All' || item.docType.includes(docFilter);
    const matchesSearch =
      item.fileName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.projectTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.county.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDoc && matchesSearch;
  });

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        maxWidth: '1360px',
        margin: '0 auto',
        width: '100%',
        boxSizing: 'border-box',
        paddingBottom: '3rem',
      }}
    >
      {/* 1. Header & Navigation */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <Breadcrumb
            items={[
              { label: 'Circulator Portal', onClick: () => navigate('/crm/dashboard') },
              { label: 'Petition Uploads' },
            ]}
          />
          <h1
            style={{
              fontSize: '1.75rem',
              fontWeight: 800,
              color: 'var(--text-primary)',
              margin: '0.25rem 0 0 0',
              letterSpacing: '-0.02em',
            }}
          >
            Petition & Document Uploads — Physical Sheet Scans
          </h1>
          <p style={{ margin: '0.25rem 0 0 0', fontSize: '13.5px', color: 'var(--text-secondary)' }}>
            Upload high-resolution camera photos or PDF scans of completed signature sheets to fast-track validation.
          </p>
        </div>

        {/* Action Shortcuts */}
        <div className="flex items-center gap-2 flex-wrap">
          <Button
            variant="outline"
            size="sm"
            icon={Calendar}
            onClick={() => navigate('/crm/daily-numbers')}
          >
            My Daily #s
          </Button>

          <Button
            variant="outline"
            size="sm"
            icon={FileSpreadsheet}
            onClick={() => navigate('/crm/turn-in')}
          >
            My Turn In
          </Button>

          <Button
            variant="secondary"
            size="sm"
            icon={Layers}
            onClick={() => navigate('/crm/categories')}
          >
            Petition Categories
          </Button>

          <Button
            variant="primary"
            size="sm"
            icon={Camera}
            onClick={() => fileInputRef.current?.click()}
          >
            Select Camera / Files
          </Button>
        </div>
      </div>

      {/* 2. Top Summary KPI Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))',
          gap: '1rem',
        }}
      >
        <Card style={{ padding: '1rem 1.25rem' }}>
          <div className="flex items-center justify-between mb-2">
            <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>
              Digitized Physical Sheets
            </span>
            <div style={{ padding: '6px', borderRadius: '8px', backgroundColor: 'rgba(14, 165, 233, 0.12)', color: '#0284c7' }}>
              <FileText size={18} />
            </div>
          </div>
          <div className="flex items-baseline gap-2 mb-1">
            <span style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              {uploadedSheets.length} Sheets
            </span>
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#10b981' }}>
              In Vault
            </span>
          </div>
          <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>
            High-res archival record for California SOS validation.
          </div>
        </Card>

        <Card style={{ padding: '1rem 1.25rem' }}>
          <div className="flex items-center justify-between mb-2">
            <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>
              Claimed Signatures Extracted
            </span>
            <div style={{ padding: '6px', borderRadius: '8px', backgroundColor: 'rgba(16, 185, 129, 0.12)', color: '#10b981' }}>
              <CheckCircle2 size={18} />
            </div>
          </div>
          <div className="flex items-baseline gap-2 mb-1">
            <span style={{ fontSize: '1.65rem', fontWeight: 800, color: '#10b981' }}>
              {uploadedSheets.reduce((acc, s) => acc + s.claimedSigs, 0)} Sigs
            </span>
            <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-secondary)' }}>
              (98.8% OCR match)
            </span>
          </div>
          <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>
            Signatures lines bound to voter address records.
          </div>
        </Card>

        <Card style={{ padding: '1rem 1.25rem' }}>
          <div className="flex items-center justify-between mb-2">
            <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>
              OCR Optical Verification
            </span>
            <div style={{ padding: '6px', borderRadius: '8px', backgroundColor: 'rgba(99, 102, 241, 0.12)', color: '#6366f1' }}>
              <ShieldCheck size={18} />
            </div>
          </div>
          <div className="flex items-baseline gap-2 mb-1">
            <span style={{ fontSize: '1.65rem', fontWeight: 800, color: '#6366f1' }}>
              100% Cleared
            </span>
            <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-tertiary)' }}>
              Auto-Crop Active
            </span>
          </div>
          <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>
            Automated border alignment and contrast optimization.
          </div>
        </Card>

        <Card
          style={{ padding: '1rem 1.25rem', cursor: 'pointer' }}
          onClick={() => navigate('/crm/turn-in')}
        >
          <div className="flex items-center justify-between mb-2">
            <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>
              Turn-In Sync Status
            </span>
            <div style={{ padding: '6px', borderRadius: '8px', backgroundColor: 'rgba(245, 158, 11, 0.12)', color: '#f59e0b' }}>
              <Clock size={18} />
            </div>
          </div>
          <div className="flex items-baseline gap-2 mb-1">
            <span style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              Batch TI-1049
            </span>
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#0284c7' }}>
              Assigned
            </span>
          </div>
          <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>
            Physical sheets awaiting drop-off with Leo Fontaine. Click to view ledger →
          </div>
        </Card>
      </div>

      {/* Demo State Disclaimer Banner */}
      <div
        className="p-3.5 rounded-xl flex items-start justify-between gap-3"
        style={{
          backgroundColor: 'rgba(2, 132, 199, 0.08)',
          border: '1px solid rgba(2, 132, 199, 0.25)',
          color: 'var(--text-primary)',
        }}
      >
        <div className="flex items-start gap-2.5">
          <Info size={18} style={{ color: '#0284c7', marginTop: '2px', flexShrink: 0 }} />
          <div>
            <span style={{ fontSize: '13px', fontWeight: 800, color: '#0284c7' }}>
              Simulated Field Digitization & OCR Inspection (Demo State)
            </span>
            <p style={{ margin: '2px 0 0 0', fontSize: '12px', color: 'var(--text-secondary)' }}>
              Selected image and document files generate client-side previews, digital signature count parsing, and audit receipts in local demonstration state. No actual backend server uploads or remote OCR APIs are called.
            </p>
          </div>
        </div>
        <Badge variant="neutral" size="sm">
          Demo Mode
        </Badge>
      </div>

      {/* 3. Multi-File Upload Dropzone & Metadata Form */}
      <Card style={{ padding: '1.5rem' }}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-border">
          <div>
            <h2
              style={{
                fontSize: '1.15rem',
                fontWeight: 800,
                color: 'var(--text-primary)',
                margin: 0,
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              <UploadCloud size={20} style={{ color: '#0284c7' }} />
              Upload Petition Sheets & Affidavits
            </h2>
            <p style={{ margin: '2px 0 0 0', fontSize: '13px', color: 'var(--text-secondary)' }}>
              Capture front voter signature pages and back circulator affidavits. Multiple file selection supported.
            </p>
          </div>

          <Badge variant="primary" size="sm">
            Multi-Sheet Dropzone
          </Badge>
        </div>

        <form onSubmit={handleExecuteUpload} className="flex flex-col gap-4">
          {/* Metadata Selection Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
              gap: '1rem',
            }}
          >
            {/* Project Selection */}
            <div className="flex flex-col gap-1.5">
              <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>
                Target Petition Campaign *
              </label>
              <Select
                value={projectId}
                onChange={(e) => setProjectId(e.target.value)}
                options={availableProjects.map((p) => ({
                  value: p.id,
                  label: `${p.title} (${p.category})`,
                }))}
              />
            </div>

            {/* Document Type */}
            <div className="flex flex-col gap-1.5">
              <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>
                Document Sheet Type *
              </label>
              <Select
                value={docType}
                onChange={(e) => setDocType(e.target.value)}
                options={[
                  { value: 'Signed Petition Sheet (Front)', label: 'Signed Petition Sheet (Front)' },
                  { value: 'Circulator Affidavit & Notary (Back)', label: 'Circulator Affidavit & Notary (Back)' },
                  { value: 'Batch Turn-In Slip Receipt', label: 'Batch Turn-In Slip Receipt' },
                  { value: 'Voter Registration Form', label: 'Voter Registration Form' },
                ]}
              />
            </div>

            {/* County Jurisdiction */}
            <div className="flex flex-col gap-1.5">
              <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>
                County Jurisdiction *
              </label>
              <Select
                value={selectedCounty}
                onChange={(e) => setSelectedCounty(e.target.value)}
                options={[
                  { value: 'Los Angeles County', label: 'Los Angeles County' },
                  { value: 'Alameda County', label: 'Alameda County' },
                  { value: 'Contra Costa County', label: 'Contra Costa County' },
                  { value: 'Orange County', label: 'Orange County' },
                  { value: 'San Diego County', label: 'San Diego County' },
                ]}
              />
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
              gap: '1rem',
            }}
          >
            {/* Sheet Number */}
            <div className="flex flex-col gap-1.5">
              <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>
                Sheet Number / Sequence *
              </label>
              <Input
                type="number"
                min="1"
                placeholder="e.g. 1"
                value={sheetNumber}
                onChange={(e) => setSheetNumber(e.target.value)}
                required
              />
            </div>

            {/* Claimed Signatures on Sheet */}
            <div className="flex flex-col gap-1.5">
              <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>
                Claimed Signatures on Sheet *
              </label>
              <Input
                type="number"
                min="1"
                max="20"
                placeholder="e.g. 10"
                value={claimedSigs}
                onChange={(e) => setClaimedSigs(e.target.value)}
                required
              />
            </div>

            {/* Notes */}
            <div className="flex flex-col gap-1.5">
              <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>
                Batch Serial / Circulator Notes
              </label>
              <Input
                type="text"
                placeholder="e.g. Serial CA-0912; full blue ink sheet."
                value={uploadNotes}
                onChange={(e) => setUploadNotes(e.target.value)}
              />
            </div>
          </div>

          {/* Hidden HTML File Input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,application/pdf"
            multiple
            onChange={handleFilesSelected}
            style={{ display: 'none' }}
          />

          {/* Interactive Drag & Drop Box */}
          <div
            onClick={() => fileInputRef.current?.click()}
            style={{
              border: '2px dashed var(--border)',
              borderRadius: '16px',
              padding: '2.5rem 1.5rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              backgroundColor: 'var(--surface-secondary)',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            className="hover:border-primary"
          >
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '16px',
                backgroundColor: 'rgba(14, 165, 233, 0.12)',
                color: '#0284c7',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '0.85rem',
              }}
            >
              <Camera size={28} />
            </div>

            <h4 style={{ margin: '0 0 4px 0', fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              Click to browse or drag & drop petition sheets
            </h4>
            <p style={{ margin: 0, fontSize: '12.5px', color: 'var(--text-secondary)' }}>
              Supports multiple PNG, JPG, JPEG photos or multi-page PDF files up to 25MB each.
            </p>
          </div>

          {/* Staged Files Preview Strip */}
          {stagedFiles.length > 0 && (
            <div className="flex flex-col gap-2 p-3 rounded-xl border border-border bg-surface-secondary">
              <div className="flex items-center justify-between text-xs font-bold text-primary">
                <span>Selected Files Queue ({stagedFiles.length} file(s) ready)</span>
                <button
                  type="button"
                  onClick={() => setStagedFiles([])}
                  className="text-xs text-rose-400 hover:underline bg-transparent border-0 cursor-pointer"
                >
                  Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mt-1">
                {stagedFiles.map((staged, idx) => (
                  <div
                    key={idx}
                    style={{
                      backgroundColor: 'var(--surface)',
                      borderRadius: '10px',
                      padding: '0.65rem 0.85rem',
                      border: '1px solid var(--border)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '0.5rem',
                    }}
                  >
                    <div className="flex items-center gap-2 overflow-hidden">
                      {staged.preview ? (
                        <img
                          src={staged.preview}
                          alt="preview"
                          style={{
                            width: '36px',
                            height: '36px',
                            borderRadius: '6px',
                            objectFit: 'cover',
                            border: '1px solid var(--border)',
                          }}
                        />
                      ) : (
                        <div
                          style={{
                            width: '36px',
                            height: '36px',
                            borderRadius: '6px',
                            backgroundColor: 'rgba(239, 68, 68, 0.1)',
                            color: '#ef4444',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '10px',
                            fontWeight: 800,
                          }}
                        >
                          PDF
                        </div>
                      )}

                      <div className="overflow-hidden">
                        <div
                          style={{
                            fontSize: '12px',
                            fontWeight: 600,
                            color: 'var(--text-primary)',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                        >
                          {staged.name}
                        </div>
                        <div style={{ fontSize: '10.5px', color: 'var(--text-tertiary)' }}>
                          {staged.size}
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeStagedFile(idx)}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: 'var(--text-tertiary)',
                        cursor: 'pointer',
                        padding: '4px',
                      }}
                      title="Remove file"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Upload Progress Simulation */}
          {isUploading && (
            <div
              style={{
                backgroundColor: 'rgba(14, 165, 233, 0.08)',
                border: '1px solid rgba(14, 165, 233, 0.3)',
                borderRadius: '12px',
                padding: '1rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
              }}
            >
              <div className="flex items-center justify-between text-xs font-bold">
                <span style={{ color: '#0284c7' }}>{uploadPhaseText}</span>
                <span style={{ color: 'var(--text-primary)' }}>{uploadProgress}%</span>
              </div>
              <ProgressBar value={uploadProgress} max={100} variant="primary" size="sm" />
            </div>
          )}

          {/* Notice & Submit Action */}
          <div
            style={{
              paddingTop: '0.85rem',
              borderTop: '1px solid var(--border)',
              display: 'flex',
              flexDirection: 'column',
              smFlexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '1rem',
            }}
          >
            <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--text-secondary)' }}>
              <Info size={15} style={{ color: '#0284c7', flexShrink: 0 }} />
              <span>
                Demo simulation notice: Images are hashed and processed via simulated OCR edge detection.
              </span>
            </div>

            <Button
              variant="primary"
              type="submit"
              icon={UploadCloud}
              disabled={isUploading || stagedFiles.length === 0}
            >
              {isUploading ? 'Processing OCR Scan...' : `Upload & Process ${stagedFiles.length} Sheet(s)`}
            </Button>
          </div>
        </form>
      </Card>

      {/* 4. Uploaded Sheets Vault & Status History Table */}
      <Card style={{ padding: '1.25rem 1.5rem' }}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h3
              style={{
                fontSize: '1.15rem',
                fontWeight: 800,
                color: 'var(--text-primary)',
                margin: 0,
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              <FileCheck2 size={18} style={{ color: '#10b981' }} />
              Digitized Petition Sheets Vault ({filteredSheets.length})
            </h3>
            <p style={{ margin: '2px 0 0 0', fontSize: '12.5px', color: 'var(--text-secondary)' }}>
              Optical recognition log of scanned petition sheets, signature integrity checks, and validation audit stamps.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant="neutral" size="sm">
              Vault Status: Verified
            </Badge>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {['All', 'Signed Petition Sheet', 'Affidavit', 'Receipt'].map((filterOption) => (
              <button
                key={filterOption}
                type="button"
                onClick={() => setDocFilter(filterOption)}
                style={{
                  padding: '5px 12px',
                  borderRadius: '10px',
                  fontSize: '12px',
                  fontWeight: docFilter === filterOption ? 700 : 500,
                  backgroundColor: docFilter === filterOption ? '#0284c7' : 'var(--surface-secondary)',
                  color: docFilter === filterOption ? '#ffffff' : 'var(--text-secondary)',
                  border: '1px solid var(--border)',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.15s ease',
                }}
              >
                {filterOption}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <Search
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2"
              style={{ color: 'var(--text-tertiary)' }}
            />
            <input
              type="text"
              placeholder="Search file name, project, ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '0.55rem 0.75rem 0.55rem 2.2rem',
                borderRadius: '10px',
                border: '1px solid var(--border)',
                backgroundColor: 'var(--surface)',
                color: 'var(--text-primary)',
                fontSize: '13px',
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
          </div>
        </div>

        {/* Table Body */}
        <div className="overflow-x-auto" style={{ borderRadius: '12px', border: '1px solid var(--border)' }}>
          <table className="w-full text-left text-sm" style={{ borderCollapse: 'collapse' }}>
            <thead
              style={{
                backgroundColor: 'var(--surface-secondary)',
                color: 'var(--text-tertiary)',
                fontSize: '11px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                borderBottom: '1px solid var(--border)',
              }}
            >
              <tr>
                <th style={{ padding: '0.85rem 1rem' }}>Scan & File Name</th>
                <th style={{ padding: '0.85rem 1rem' }}>Document Type</th>
                <th style={{ padding: '0.85rem 1rem' }}>Petition Campaign</th>
                <th style={{ padding: '0.85rem 1rem' }}>Sheet # & Sigs</th>
                <th style={{ padding: '0.85rem 1rem' }}>County & Date</th>
                <th style={{ padding: '0.85rem 1rem', textAlign: 'center' }}>OCR Status</th>
                <th style={{ padding: '0.85rem 1rem', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody style={{ divideY: '1px solid var(--border)' }}>
              {filteredSheets.map((sheet) => (
                <tr
                  key={sheet.id}
                  style={{
                    borderBottom: '1px solid var(--border)',
                    backgroundColor: 'transparent',
                    transition: 'background-color 0.15s ease',
                  }}
                  className="hover:bg-surface-secondary"
                >
                  {/* Scan & File Name */}
                  <td style={{ padding: '0.85rem 1rem' }}>
                    <div className="flex items-center gap-2.5">
                      {sheet.previewUrl ? (
                        <img
                          src={sheet.previewUrl}
                          alt="preview"
                          style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '8px',
                            objectFit: 'cover',
                            border: '1px solid var(--border)',
                            cursor: 'pointer',
                          }}
                          onClick={() => setInspectingSheet(sheet)}
                        />
                      ) : (
                        <div
                          style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '8px',
                            backgroundColor: 'rgba(14, 165, 233, 0.12)',
                            color: '#0284c7',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                            cursor: 'pointer',
                          }}
                          onClick={() => setInspectingSheet(sheet)}
                        >
                          <FileText size={20} />
                        </div>
                      )}

                      <div>
                        <div style={{ fontWeight: 700, fontSize: '13px', color: 'var(--text-primary)' }}>
                          {sheet.fileName}
                        </div>
                        <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', marginTop: '2px' }}>
                          {sheet.id} • {sheet.fileSize}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Document Type */}
                  <td style={{ padding: '0.85rem 1rem' }}>
                    <div style={{ fontSize: '12.5px', fontWeight: 600, color: 'var(--text-primary)' }}>
                      {sheet.docType}
                    </div>
                    <div style={{ fontSize: '10.5px', color: 'var(--text-tertiary)', fontFamily: 'monospace' }}>
                      {sheet.hash}
                    </div>
                  </td>

                  {/* Campaign */}
                  <td style={{ padding: '0.85rem 1rem' }}>
                    <div style={{ fontWeight: 700, fontSize: '13px', color: 'var(--text-primary)' }}>
                      {sheet.projectTitle}
                    </div>
                    <div className="flex items-center gap-1.5 mt-1">
                      <span
                        style={{
                          fontSize: '10.5px',
                          color: 'var(--text-tertiary)',
                          backgroundColor: 'var(--surface-secondary)',
                          padding: '1px 6px',
                          borderRadius: '4px',
                          border: '1px solid var(--border)',
                        }}
                      >
                        {sheet.category}
                      </span>
                    </div>
                  </td>

                  {/* Sheet # & Sigs */}
                  <td style={{ padding: '0.85rem 1rem' }}>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>
                      {sheet.sheetNumber}
                    </div>
                    <div style={{ fontSize: '12px', fontWeight: 800, color: '#10b981', marginTop: '1px' }}>
                      {sheet.claimedSigs} Claimed Sigs
                    </div>
                  </td>

                  {/* County & Date */}
                  <td style={{ padding: '0.85rem 1rem' }}>
                    <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)' }}>
                      {sheet.county}
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', marginTop: '2px' }}>
                      {sheet.date}
                    </div>
                  </td>

                  {/* OCR Status */}
                  <td style={{ padding: '0.85rem 1rem', textAlign: 'center' }}>
                    <Badge variant={sheet.statusBadge} size="sm">
                      {sheet.status}
                    </Badge>
                  </td>

                  {/* Actions */}
                  <td style={{ padding: '0.85rem 1rem', textAlign: 'right' }}>
                    <Button
                      variant="ghost"
                      size="sm"
                      icon={Eye}
                      onClick={() => setInspectingSheet(sheet)}
                    >
                      Inspect
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* ======================================================== */}
      {/* MODAL: HIGH-RES SHEET INSPECTION & OCR AUDIT            */}
      {/* ======================================================== */}
      {inspectingSheet && (
        <Modal
          isOpen={Boolean(inspectingSheet)}
          onClose={() => setInspectingSheet(null)}
          title={`Sheet Inspection & OCR Audit — ${inspectingSheet.id}`}
          maxWidth="640px"
        >
          <div className="flex flex-col gap-4">
            {/* Visual Sheet Simulation Frame */}
            <div
              style={{
                backgroundColor: '#ffffff',
                color: '#0f172a',
                borderRadius: '12px',
                padding: '1.25rem',
                border: '2px solid #cbd5e1',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
                fontFamily: 'serif',
                position: 'relative',
              }}
            >
              <div className="flex items-center justify-between border-b pb-2 mb-2">
                <div>
                  <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', color: '#64748b' }}>
                    Official Petition Document Form
                  </div>
                  <h4 style={{ margin: '2px 0 0 0', fontSize: '14px', fontWeight: 800 }}>
                    {inspectingSheet.projectTitle}
                  </h4>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '10px', color: '#64748b' }}>Jurisdiction:</div>
                  <div style={{ fontSize: '11px', fontWeight: 700 }}>{inspectingSheet.county}</div>
                </div>
              </div>

              {/* Simulated Signature Lines */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', margin: '0.75rem 0' }}>
                {[1, 2, 3, 4, 5].map((row) => (
                  <div
                    key={row}
                    style={{
                      borderBottom: '1px dashed #94a3b8',
                      padding: '4px 0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      fontSize: '11px',
                    }}
                  >
                    <span style={{ color: '#64748b', width: '20px' }}>#{row}</span>
                    <span style={{ fontStyle: 'italic', color: '#1e3a8a', fontFamily: 'cursive' }}>
                      Voter Signature Line #{row}
                    </span>
                    <span style={{ color: '#0f172a', fontSize: '10px' }}>
                      100 Main St, Apt {row}01, CA
                    </span>
                    <span style={{ color: '#10b981', fontWeight: 700, fontSize: '10px' }}>
                      ✓ OCR Match
                    </span>
                  </div>
                ))}
              </div>

              {/* Circulator Affidavit Footer */}
              <div
                style={{
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '6px',
                  padding: '6px 10px',
                  fontSize: '10px',
                  color: '#475569',
                }}
              >
                <strong>CIRCULATOR DECLARATION:</strong> I, {userName} (Badge: CIR-88204), declare under penalty of perjury that I circulated this petition sheet and witnessed the signers.
              </div>
            </div>

            {/* OCR Extracted Metadata Summary */}
            <div
              style={{
                backgroundColor: 'var(--surface-secondary)',
                borderRadius: '12px',
                padding: '1rem',
                border: '1px solid var(--border)',
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '0.75rem',
                fontSize: '12px',
              }}
            >
              <div>
                <span style={{ color: 'var(--text-tertiary)' }}>Document Type:</span>
                <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginTop: '2px' }}>
                  {inspectingSheet.docType}
                </div>
              </div>

              <div>
                <span style={{ color: 'var(--text-tertiary)' }}>Optical Confidence:</span>
                <div style={{ fontWeight: 700, color: '#10b981', marginTop: '2px' }}>
                  {inspectingSheet.ocrConfidence} (Verified)
                </div>
              </div>

              <div>
                <span style={{ color: 'var(--text-tertiary)' }}>Sheet Designation:</span>
                <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginTop: '2px' }}>
                  {inspectingSheet.sheetNumber} ({inspectingSheet.claimedSigs} Signatures)
                </div>
              </div>

              <div>
                <span style={{ color: 'var(--text-tertiary)' }}>SHA-256 Audit Hash:</span>
                <div style={{ fontFamily: 'monospace', fontSize: '11px', color: '#0284c7', marginTop: '2px' }}>
                  {inspectingSheet.hash}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-border">
              <Button
                variant="outline"
                size="sm"
                icon={Calendar}
                onClick={() => {
                  setInspectingSheet(null);
                  navigate('/crm/daily-numbers');
                }}
              >
                Log to Daily #s
              </Button>

              <Button
                variant="primary"
                size="sm"
                onClick={() => setInspectingSheet(null)}
              >
                Close Inspector
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default PetitionUploads;
