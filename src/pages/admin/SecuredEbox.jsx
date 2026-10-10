import React, { useState, useEffect, useRef } from 'react';
import {
  ShieldCheck,
  Lock,
  Send,
  Paperclip,
  CheckCircle2,
  FileText,
  Clock,
  ExternalLink,
  MessageCircle,
  User,
  Sparkles,
  Search,
  RotateCcw,
  Shield,
  ArrowRightLeft,
  CheckCheck,
  Download,
  Terminal,
  KeyRound,
  Cpu,
  RefreshCw,
  PhoneCall,
  ChevronRight,
  Info
} from 'lucide-react';
import { Breadcrumb, Button, Card, Badge } from '../../components/ui';
import { useToast } from '../../context/ToastContext';

// Default seed conversations for the 3 confidential channels
const INITIAL_CONVERSATIONS = {
  'th-1': [
    {
      id: 'ebx-1',
      senderRole: 'ktt',
      sender: 'Kiaan Tech Team (KTT)',
      title: 'Lead Systems Architect',
      time: 'Sep 09, 12:13 PM',
      text: 'Hello Johnny! We have confirmed the 2-week timeline for your Attorney presentation. All core CRM/ERP workflows and the AI Content Studio differentiators vs Salesforce are actively mounted in the showcase.',
      attachment: { name: 'Master_Roadmap_V3.pdf', size: '2.4 MB' },
    },
    {
      id: 'ebx-2',
      senderRole: 'johnny',
      sender: 'Johnny (Super Executive Admin)',
      title: 'SEA / Business Owner',
      time: 'Sep 10, 09:20 AM',
      text: 'Thank you team. Make sure the eiCanvass effect in the logo is glowing and digital, and the entry screen gives that high-tech AI feel.',
      attachment: null,
    },
    {
      id: 'ebx-3',
      senderRole: 'ktt',
      sender: 'Kiaan Tech Team (KTT)',
      title: 'Lead Systems Architect',
      time: 'Sep 11, 04:45 PM',
      text: 'Understood. The AI eiCanvass logo now features concentric digital eiCanvass arcs with live plasma pulsations in the center blue area, and the login page has been elevated into a futuristic dark AI gateway.',
      attachment: null,
    },
    {
      id: 'ebx-4',
      senderRole: 'johnny',
      sender: 'Johnny (Super Executive Admin)',
      title: 'SEA / Business Owner',
      time: 'Sep 12, 11:30 AM',
      text: 'Also need our Secured Communications eBox verified for the attorney diligence so they can see only SEA can communicate with KTT.',
      attachment: null,
    },
    {
      id: 'ebx-5',
      senderRole: 'ktt',
      sender: 'Kiaan Tech Team (KTT)',
      title: 'Lead Systems Architect',
      time: 'Sep 12, 01:15 PM',
      text: 'Secured eBox is active with AES-256 Vault Encryption. Only SEA identity and KTT core engineering tokens have decryption privileges in this workspace. Zero data leakage to regular CRM staff.',
      attachment: { name: 'Cryptographic_Audit_Certificate.pdf', size: '1.1 MB' },
    },
  ],
  'th-2': [
    {
      id: 'ebx-201',
      senderRole: 'attorney',
      sender: 'Legal Counsel (Corporate Diligence)',
      title: 'Senior Diligence Attorney',
      time: 'Sep 14, 10:00 AM',
      text: 'Johnny, we have reviewed the IP assignments and trade secret protections for the proprietary AI gateway orchestration architecture. All documentation is prepared for the presentation.',
      attachment: { name: 'IP_Protection_Brief_2026.pdf', size: '1.8 MB' },
    },
    {
      id: 'ebx-202',
      senderRole: 'johnny',
      sender: 'Johnny (Super Executive Admin)',
      title: 'SEA / Business Owner',
      time: 'Sep 14, 02:45 PM',
      text: 'Excellent. Please ensure the NDA provisions strictly cover our 15 AI Studio pipelines before we share the investor data room.',
      attachment: null,
    },
    {
      id: 'ebx-203',
      senderRole: 'attorney',
      sender: 'Legal Counsel (Corporate Diligence)',
      title: 'Senior Diligence Attorney',
      time: 'Sep 15, 09:15 AM',
      text: 'Confirmed. Strict NDA and zero-knowledge data isolation clauses are applied to all 15 Studio engines.',
      attachment: null,
    }
  ],
  'th-3': [
    {
      id: 'ebx-301',
      senderRole: 'ktt',
      sender: 'Lead Systems Architect (KTT)',
      title: 'KTT Principal Engineer',
      time: 'Sep 15, 08:30 AM',
      text: 'Johnny, sprint roadmap for CRM iCanvass v2.6 includes real-time ElevenLabs voice synthesis and Pollinations FLUX.1 generative image engines, now live in staging.',
      attachment: { name: 'Architecture_Topology_v2.6.pdf', size: '3.1 MB' },
    },
    {
      id: 'ebx-302',
      senderRole: 'johnny',
      sender: 'Johnny (Super Executive Admin)',
      title: 'SEA / Business Owner',
      time: 'Sep 15, 11:00 AM',
      text: 'Make sure the speed benchmarks vs Salesforce Einstein are prominently featured in the roadmap PDF.',
      attachment: null,
    }
  ],
};

const STORAGE_KEY = 'crm_iCanvass_secured_ebox_v3';

export const SecuredEbox = () => {
  const { addToast } = useToast();
  const [inputText, setInputText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeThreadId, setActiveThreadId] = useState('th-1');
  const [activePersona, setActivePersona] = useState('johnny'); // 'johnny' | 'ktt' | 'attorney'
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Initialize messages from localStorage or default
  const [threadStore, setThreadStore] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('eBox storage read error:', e);
    }
    return INITIAL_CONVERSATIONS;
  });

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(threadStore));
    } catch (e) {
      console.warn('eBox storage save error:', e);
    }
  }, [threadStore]);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [threadStore, activeThreadId, activePersona, isTyping]);

  const threads = [
    {
      id: 'th-1',
      title: 'KTT Architecture Team',
      subtitle: 'Johnny (SEA) ↔ Kiaan Tech Team (KTT)',
      badge: 'SEA ↔ KTT Hotline',
      partnerName: 'Kiaan Tech Team',
      partnerRole: 'ktt',
      color: '#0284c7',
      accentBg: 'rgba(2, 132, 199, 0.12)',
      icon: Shield,
    },
    {
      id: 'th-2',
      title: 'Attorney & Pitch Review',
      subtitle: 'Johnny (SEA) ↔ Legal Diligence Team',
      badge: 'Attorney Vault',
      partnerName: 'Legal Diligence Counsel',
      partnerRole: 'attorney',
      color: '#059669',
      accentBg: 'rgba(5, 150, 105, 0.12)',
      icon: Lock,
    },
    {
      id: 'th-3',
      title: 'Executive Roadmaps',
      subtitle: 'Johnny (SEA) ↔ Systems Architect',
      badge: 'Private Strategy',
      partnerName: 'Lead Systems Architect',
      partnerRole: 'ktt',
      color: '#7c3aed',
      accentBg: 'rgba(124, 58, 237, 0.12)',
      icon: Cpu,
    },
  ];

  const currentThread = threads.find((t) => t.id === activeThreadId) || threads[0];
  const activeMessages = threadStore[activeThreadId] || [];

  // Automated intelligent responder for realistic two-way interaction
  const triggerAutoReply = (userMessage, targetThreadId, senderRole) => {
    // Only auto-reply if Johnny sends the message
    if (senderRole !== 'johnny') return;

    setIsTyping(true);

    setTimeout(() => {
      let replyText = '';
      let replySender = 'Kiaan Tech Team (KTT)';
      let replyTitle = 'Lead Systems Architect';
      let replyRole = 'ktt';

      const lower = userMessage.toLowerCase();

      if (targetThreadId === 'th-2') {
        replySender = 'Legal Counsel (Corporate Diligence)';
        replyTitle = 'Senior Diligence Attorney';
        replyRole = 'attorney';
        if (lower.includes('nda') || lower.includes('ip') || lower.includes('patent')) {
          replyText = 'Johnny, all proprietary algorithms and AI gateway wrappers are sealed under multi-jurisdictional NDAs. Data room is ready for presentation.';
        } else if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey')) {
          replyText = 'Hello Johnny. Legal Diligence desk is active. We are finalizing the presentation exhibit binder for your scheduled meeting.';
        } else {
          replyText = `Johnny, received: "${userMessage}". Our legal counsel has annotated this into the attorney pitch review dossier.`;
        }
      } else {
        // KTT threads
        if (lower.includes('hello') || lower.includes('hi') || lower.includes('test') || lower.includes('hey')) {
          replyText = 'Hello Johnny! Kiaan Tech Team is actively monitoring this encrypted channel. All 15 AI studios, auto DMS marketplace, and attorney demo environments are 100% operational.';
        } else if (lower.includes('roadmap') || lower.includes('timeline') || lower.includes('sprint')) {
          replyText = 'Confirmed Johnny. Sprint milestones are locked. The updated PDF roadmap has been compiled and is ready in your vault.';
        } else if (lower.includes('logo') || lower.includes('design') || lower.includes('ui')) {
          replyText = 'Understood. The digital glowing eiCanvass effect and high-tech AI gateway aesthetics are synchronized across all modules.';
        } else {
          replyText = `Received instruction: "${userMessage}". Kiaan Tech Team core engineers have logged this in the active sprint docket.`;
        }
      }

      const replyMsg = {
        id: `ebx-${Date.now()}`,
        senderRole: replyRole,
        sender: replySender,
        title: replyTitle,
        time: 'Just now',
        text: replyText,
        attachment: null,
      };

      setThreadStore((prev) => ({
        ...prev,
        [targetThreadId]: [...(prev[targetThreadId] || []), replyMsg],
      }));

      setIsTyping(false);

      addToast({
        title: `Reply Received from ${replySender}`,
        message: replyText.slice(0, 75) + '...',
        type: 'info',
      });
    }, 1400);
  };

  const handleSend = (e) => {
    e?.preventDefault();
    if (!inputText.trim()) return;

    let senderName = 'Johnny (Super Executive Admin)';
    let senderTitle = 'SEA / Business Owner';
    if (activePersona === 'ktt') {
      senderName = 'Kiaan Tech Team (KTT)';
      senderTitle = 'Lead Systems Architect';
    } else if (activePersona === 'attorney') {
      senderName = 'Legal Counsel (Corporate Diligence)';
      senderTitle = 'Senior Diligence Attorney';
    }

    const newMsg = {
      id: `ebx-${Date.now()}`,
      senderRole: activePersona,
      sender: senderName,
      title: senderTitle,
      time: 'Just now',
      text: inputText.trim(),
      attachment: null,
    };

    const currentMsgText = inputText.trim();
    const sentPersona = activePersona;
    const threadId = activeThreadId;

    setThreadStore((prev) => ({
      ...prev,
      [threadId]: [...(prev[threadId] || []), newMsg],
    }));

    setInputText('');

    addToast({
      title: 'Message Dispatched to Vault',
      message: `Delivered to ${sentPersona === 'johnny' ? currentThread.partnerName : 'Johnny (SEA)'}.`,
      type: 'success',
    });

    // If sent by Johnny, simulate realistic instant recipient reply
    if (sentPersona === 'johnny') {
      triggerAutoReply(currentMsgText, threadId, sentPersona);
    }
  };

  const handleResetDemo = () => {
    setThreadStore(INITIAL_CONVERSATIONS);
    localStorage.removeItem(STORAGE_KEY);
    addToast({
      title: 'Demo Conversation Reset',
      message: 'Restored original executive thread history.',
      type: 'info',
    });
  };

  const filteredMessages = activeMessages.filter(
    (m) =>
      m.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.sender.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Quick chips based on persona
  const quickSuggestions =
    activePersona === 'johnny'
      ? [
          'Hello KTT, confirm attorney presentation status.',
          'Please verify 15 AI Studio pipelines.',
          'Confirm zero-leakage security is active.',
        ]
      : activePersona === 'ktt'
      ? [
          'Understood Johnny, engineering sprint deployed.',
          'Confirmed: staging ready for attorney review.',
          'All models connected with zero-data leakage.',
        ]
      : [
          'Attorney diligence memorandum filed.',
          'All IP trade secrets and NDA provisions approved.',
          'Ready for executive investor review.',
        ];

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        width: '100%',
        maxWidth: '1240px',
        margin: '0 auto',
        fontFamily: 'var(--font-sans)',
        boxSizing: 'border-box',
      }}
    >
      {/* Top Header Row */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          paddingBottom: '16px',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <div>
          <Breadcrumb items={[{ label: 'iCanvass PDM' }, { label: 'Executive Governance' }, { label: 'Secured eBox' }]} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '6px', flexWrap: 'wrap' }}>
            <h1
              style={{
                fontSize: '22px',
                fontWeight: 800,
                color: 'var(--text-primary)',
                margin: 0,
                letterSpacing: '-0.02em',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <Lock size={22} style={{ color: 'var(--eiCanvass-sky, #0284c7)' }} />
              Secured Communications eBox
            </h1>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 700,
                fontFamily: 'var(--font-mono, monospace)',
                color: '#059669',
                backgroundColor: 'rgba(5, 150, 105, 0.1)',
                border: '1px solid rgba(5, 150, 105, 0.25)',
                padding: '3px 10px',
                borderRadius: '6px',
                textTransform: 'uppercase',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
              }}
            >
              <span
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: '#059669',
                  boxShadow: '0 0 8px #059669',
                }}
              />
              SEA ↔ KTT Restricted Vault
            </span>
          </div>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: '4px 0 0 0' }}>
            Direct encrypted channel between <strong>Super Executive Admin [SEA]</strong> and <strong>Kiaan Tech Team [KTT]</strong>. Non-SEA staff strictly isolated.
          </p>
        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={handleResetDemo}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '7px 14px',
              fontSize: '12px',
              fontWeight: 600,
              borderRadius: '8px',
              border: '1px solid var(--border)',
              backgroundColor: 'var(--surface)',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              transition: 'all 150ms ease',
            }}
          >
            <RotateCcw size={14} />
            Reset History
          </button>

          <button
            type="button"
            onClick={() => window.open('https://api.whatsapp.com', '_blank')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '7px 14px',
              fontSize: '12px',
              fontWeight: 600,
              borderRadius: '8px',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              backgroundColor: 'rgba(16, 185, 129, 0.08)',
              color: '#059669',
              cursor: 'pointer',
              transition: 'all 150ms ease',
            }}
          >
            <MessageCircle size={14} />
            WhatsApp Hotline
          </button>
        </div>
      </div>

      {/* TWO-WAY PERSONA CONTROLLER BAR */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '14px',
          padding: '14px 18px',
          borderRadius: '12px',
          background:
            activePersona === 'johnny'
              ? 'linear-gradient(135deg, rgba(2, 132, 199, 0.08) 0%, rgba(37, 99, 235, 0.04) 100%)'
              : activePersona === 'ktt'
              ? 'linear-gradient(135deg, rgba(79, 70, 229, 0.08) 0%, rgba(124, 58, 237, 0.04) 100%)'
              : 'linear-gradient(135deg, rgba(5, 150, 105, 0.08) 0%, rgba(16, 185, 129, 0.04) 100%)',
          border:
            activePersona === 'johnny'
              ? '1px solid rgba(2, 132, 199, 0.35)'
              : activePersona === 'ktt'
              ? '1px solid rgba(79, 70, 229, 0.35)'
              : '1px solid rgba(5, 150, 105, 0.35)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              backgroundColor:
                activePersona === 'johnny' ? '#0284c7' : activePersona === 'ktt' ? '#4f46e5' : '#059669',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              flexShrink: 0,
            }}
          >
            {activePersona === 'johnny' ? <User size={20} /> : activePersona === 'ktt' ? <Shield size={20} /> : <Lock size={20} />}
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)' }}>
                Active Operator Identity:
              </span>
              <span
                style={{
                  fontSize: '12px',
                  fontWeight: 700,
                  color: '#ffffff',
                  backgroundColor:
                    activePersona === 'johnny' ? '#0284c7' : activePersona === 'ktt' ? '#4f46e5' : '#059669',
                  padding: '2px 8px',
                  borderRadius: '6px',
                }}
              >
                {activePersona === 'johnny'
                  ? 'Johnny (Super Executive Admin [SEA])'
                  : activePersona === 'ktt'
                  ? 'Kiaan Tech Team (KTT - Lead Systems Architect)'
                  : 'Corporate Legal Counsel (Attorney)'}
              </span>
            </div>
            <p style={{ fontSize: '11px', color: 'var(--text-secondary)', margin: '2px 0 0 0' }}>
              {activePersona === 'johnny'
                ? 'Type instructions below to test sending to KTT. KTT will instantly acknowledge via real-time vault responder.'
                : 'You are now viewing as the Recipient. You can read Johnny’s instructions and type custom replies.'}
            </p>
          </div>
        </div>

        {/* Segmented Persona Switcher */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            padding: '4px',
            borderRadius: '9px',
            backgroundColor: 'var(--surface)',
            border: '1px solid var(--border)',
          }}
        >
          <button
            type="button"
            onClick={() => setActivePersona('johnny')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              borderRadius: '7px',
              fontSize: '12px',
              fontWeight: 700,
              cursor: 'pointer',
              border: 'none',
              transition: 'all 150ms ease',
              backgroundColor: activePersona === 'johnny' ? '#0284c7' : 'transparent',
              color: activePersona === 'johnny' ? '#ffffff' : 'var(--text-secondary)',
              boxShadow: activePersona === 'johnny' ? '0 2px 6px rgba(2, 132, 199, 0.3)' : 'none',
            }}
          >
            <User size={13} />
            Johnny (SEA)
          </button>

          <button
            type="button"
            onClick={() => setActivePersona('ktt')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              borderRadius: '7px',
              fontSize: '12px',
              fontWeight: 700,
              cursor: 'pointer',
              border: 'none',
              transition: 'all 150ms ease',
              backgroundColor: activePersona === 'ktt' ? '#4f46e5' : 'transparent',
              color: activePersona === 'ktt' ? '#ffffff' : 'var(--text-secondary)',
              boxShadow: activePersona === 'ktt' ? '0 2px 6px rgba(79, 70, 229, 0.3)' : 'none',
            }}
          >
            <Shield size={13} />
            KTT (Dev Team)
          </button>

          <button
            type="button"
            onClick={() => setActivePersona('attorney')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              borderRadius: '7px',
              fontSize: '12px',
              fontWeight: 700,
              cursor: 'pointer',
              border: 'none',
              transition: 'all 150ms ease',
              backgroundColor: activePersona === 'attorney' ? '#059669' : 'transparent',
              color: activePersona === 'attorney' ? '#ffffff' : 'var(--text-secondary)',
              boxShadow: activePersona === 'attorney' ? '0 2px 6px rgba(5, 150, 105, 0.3)' : 'none',
            }}
          >
            <Lock size={13} />
            Attorney Desk
          </button>
        </div>
      </div>

      {/* MAIN TWO-COLUMN WORKSPACE CONTAINER */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '320px 1fr',
          gap: '20px',
          alignItems: 'start',
        }}
        className="ebox-main-grid"
      >
        {/* LEFT COLUMN: CHANNELS VAULT */}
        <div
          style={{
            backgroundColor: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '14px',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
            height: '620px',
            boxSizing: 'border-box',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Encrypted Vaults
            </span>
            <span
              style={{
                fontSize: '11px',
                fontFamily: 'var(--font-mono)',
                backgroundColor: 'var(--surface-secondary)',
                border: '1px solid var(--border)',
                padding: '2px 8px',
                borderRadius: '6px',
                color: 'var(--text-secondary)',
              }}
            >
              {threads.length} Channels
            </span>
          </div>

          {/* Search Box */}
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <Search size={14} style={{ position: 'absolute', left: '10px', color: 'var(--text-tertiary)' }} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search encrypted history..."
              style={{
                width: '100%',
                padding: '8px 12px 8px 32px',
                fontSize: '12px',
                borderRadius: '8px',
                border: '1px solid var(--border)',
                backgroundColor: 'var(--surface-secondary)',
                color: 'var(--text-primary)',
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
          </div>

          {/* Channels List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', overflowY: 'auto', flex: 1, paddingRight: '2px' }}>
            {threads.map((th) => {
              const isActive = activeThreadId === th.id;
              const msgCount = (threadStore[th.id] || []).length;
              const IconComp = th.icon;

              return (
                <div
                  key={th.id}
                  onClick={() => setActiveThreadId(th.id)}
                  style={{
                    padding: '12px',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    border: isActive ? `1.5px solid ${th.color}` : '1px solid var(--border)',
                    backgroundColor: isActive ? th.accentBg : 'var(--surface)',
                    transition: 'all 150ms ease',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div
                        style={{
                          width: '26px',
                          height: '26px',
                          borderRadius: '6px',
                          backgroundColor: th.color,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#ffffff',
                          flexShrink: 0,
                        }}
                      >
                        <IconComp size={14} />
                      </div>
                      <span
                        style={{
                          fontSize: '13px',
                          fontWeight: 700,
                          color: isActive ? th.color : 'var(--text-primary)',
                        }}
                      >
                        {th.title}
                      </span>
                    </div>
                    <span
                      style={{
                        fontSize: '10px',
                        fontFamily: 'var(--font-mono)',
                        backgroundColor: 'var(--surface)',
                        border: '1px solid var(--border)',
                        padding: '1px 6px',
                        borderRadius: '4px',
                        color: 'var(--text-secondary)',
                      }}
                    >
                      {msgCount} msgs
                    </span>
                  </div>

                  <span style={{ fontSize: '11px', color: 'var(--text-secondary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {th.subtitle}
                  </span>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '10px', color: 'var(--text-tertiary)', marginTop: '2px' }}>
                    <span style={{ fontWeight: 600 }}>{th.badge}</span>
                    <span style={{ color: '#059669', display: 'flex', alignItems: 'center', gap: '3px', fontWeight: 600 }}>
                      <CheckCheck size={11} /> E2EE Vault
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Cryptographic Compliance Footer */}
          <div
            style={{
              paddingTop: '10px',
              borderTop: '1px solid var(--border)',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '8px',
              fontSize: '10px',
              color: 'var(--text-tertiary)',
              lineHeight: 1.4,
            }}
          >
            <KeyRound size={14} style={{ color: '#059669', flexShrink: 0, marginTop: '2px' }} />
            <span>
              <strong>Zero-Leakage Security:</strong> Strictly SEA cryptographic session tokens. Standard employees cannot decrypt.
            </span>
          </div>
        </div>

        {/* RIGHT COLUMN: ACTIVE CONVERSATION & TWO-WAY COMPOSER */}
        <div
          style={{
            backgroundColor: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '14px',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
            height: '620px',
            overflow: 'hidden',
            boxSizing: 'border-box',
          }}
        >
          {/* Thread Header */}
          <div
            style={{
              padding: '14px 18px',
              borderBottom: '1px solid var(--border)',
              backgroundColor: 'var(--surface-secondary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px',
              flexWrap: 'wrap',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                  {currentThread.title}
                </h3>
                <span
                  style={{
                    fontSize: '10px',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 700,
                    color: '#059669',
                    backgroundColor: 'rgba(5, 150, 105, 0.12)',
                    border: '1px solid rgba(5, 150, 105, 0.25)',
                    padding: '2px 6px',
                    borderRadius: '4px',
                  }}
                >
                  AES-256-GCM LIVE
                </span>
              </div>
              <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                {currentThread.subtitle}
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>Chatting as:</span>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  padding: '3px 8px',
                  borderRadius: '6px',
                  backgroundColor:
                    activePersona === 'johnny' ? '#0284c7' : activePersona === 'ktt' ? '#4f46e5' : '#059669',
                  color: '#ffffff',
                }}
              >
                {activePersona === 'johnny' ? 'Johnny (SEA)' : activePersona === 'ktt' ? 'KTT (Dev)' : 'Attorney'}
              </span>
            </div>
          </div>

          {/* Messages Body */}
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '16px 20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
              backgroundColor: 'var(--surface)',
            }}
          >
            {filteredMessages.length === 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--text-tertiary)' }}>
                <Search size={28} style={{ opacity: 0.4, marginBottom: '8px' }} />
                <span style={{ fontSize: '13px', fontWeight: 600 }}>No messages matching "{searchQuery}"</span>
              </div>
            ) : (
              filteredMessages.map((m) => {
                const isMine = m.senderRole === activePersona;

                return (
                  <div
                    key={m.id}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: isMine ? 'flex-end' : 'flex-start',
                      width: '100%',
                    }}
                  >
                    {/* Meta info: Sender & Time */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        marginBottom: '4px',
                        fontSize: '11px',
                        color: 'var(--text-tertiary)',
                      }}
                    >
                      <span
                        style={{
                          fontWeight: 700,
                          color: isMine
                            ? activePersona === 'johnny'
                              ? '#0284c7'
                              : '#4f46e5'
                            : 'var(--text-primary)',
                        }}
                      >
                        {m.sender}
                      </span>
                      <span>•</span>
                      <span>{m.time}</span>
                      {isMine && (
                        <span style={{ color: '#059669', display: 'flex', alignItems: 'center', gap: '2px', fontSize: '10px', marginLeft: '4px' }}>
                          <CheckCheck size={12} /> Delivered
                        </span>
                      )}
                    </div>

                    {/* Speech Bubble */}
                    <div
                      style={{
                        maxWidth: '75%',
                        padding: '12px 16px',
                        borderRadius: '16px',
                        borderTopRightRadius: isMine ? '2px' : '16px',
                        borderTopLeftRadius: !isMine ? '2px' : '16px',
                        fontSize: '13px',
                        lineHeight: '1.5',
                        background: isMine
                          ? activePersona === 'johnny'
                            ? 'linear-gradient(135deg, #0284c7 0%, #1d4ed8 100%)'
                            : activePersona === 'ktt'
                            ? 'linear-gradient(135deg, #4f46e5 0%, #6366f1 100%)'
                            : 'linear-gradient(135deg, #059669 0%, #047857 100%)'
                          : m.senderRole === 'johnny'
                          ? 'rgba(2, 132, 199, 0.08)'
                          : 'var(--surface-secondary)',
                        color: isMine ? '#ffffff' : 'var(--text-primary)',
                        border: isMine ? 'none' : '1px solid var(--border)',
                        boxShadow: isMine ? '0 3px 10px rgba(0,0,0,0.12)' : '0 2px 6px rgba(0,0,0,0.04)',
                      }}
                    >
                      <p
                        style={{
                          margin: 0,
                          whiteSpace: 'pre-wrap',
                          color: isMine ? '#ffffff' : 'var(--text-primary)',
                          fontWeight: isMine ? 500 : 400,
                          fontSize: '13px',
                          lineHeight: '1.5',
                        }}
                      >
                        {m.text}
                      </p>

                      {/* Attachment if present */}
                      {m.attachment && (
                        <div
                          onClick={() =>
                            addToast({
                              title: 'Encrypted Document Opened',
                              message: `Verified & decrypted: ${m.attachment.name}`,
                              type: 'info',
                            })
                          }
                          style={{
                            marginTop: '10px',
                            paddingTop: '8px',
                            borderTop: isMine ? '1px solid rgba(255,255,255,0.3)' : '1px solid var(--border)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: '10px',
                            cursor: 'pointer',
                            fontSize: '11px',
                            fontWeight: 600,
                            color: isMine ? '#ffffff' : 'var(--eiCanvass-sky, #0284c7)',
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: isMine ? '#ffffff' : 'inherit' }}>
                            <FileText size={15} style={{ color: isMine ? '#ffffff' : 'inherit' }} />
                            <span style={{ color: isMine ? '#ffffff' : 'inherit', textDecoration: isMine ? 'none' : 'underline' }}>
                              {m.attachment.name}
                            </span>
                          </div>
                          <span style={{ opacity: 0.9, fontSize: '10px', color: isMine ? '#ffffff' : 'var(--text-tertiary)' }}>
                            ({m.attachment.size})
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            )}

            {/* Live Typing Indicator for Realistic Interaction */}
            {isTyping && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 12px', borderRadius: '8px', backgroundColor: 'var(--surface-secondary)', width: 'fit-content' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#0284c7', animation: 'pulse 1s infinite' }} />
                <span style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 600 }}>
                  {currentThread.partnerName} is typing encrypted response...
                </span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestion Chips */}
          <div
            style={{
              padding: '8px 16px',
              borderTop: '1px solid var(--border)',
              backgroundColor: 'var(--surface-secondary)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              overflowX: 'auto',
            }}
          >
            <span style={{ fontSize: '10px', fontWeight: 800, color: 'var(--text-tertiary)', textTransform: 'uppercase', flexShrink: 0 }}>
              Quick Action:
            </span>
            {quickSuggestions.map((text, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setInputText(text)}
                style={{
                  fontSize: '11px',
                  padding: '4px 10px',
                  borderRadius: '16px',
                  border: '1px solid var(--border)',
                  backgroundColor: 'var(--surface)',
                  color: 'var(--text-secondary)',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 150ms ease',
                }}
              >
                {text}
              </button>
            ))}
          </div>

          {/* Composer Input Bar */}
          <div
            style={{
              padding: '12px 16px',
              borderTop: '1px solid var(--border)',
              backgroundColor: 'var(--surface)',
            }}
          >
            <form onSubmit={handleSend} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button
                type="button"
                onClick={() =>
                  addToast({
                    title: 'Attach Roadmap or Audit Brief',
                    message: 'Encrypted document picker ready for SEA vault.',
                    type: 'info',
                  })
                }
                style={{
                  padding: '9px',
                  borderRadius: '8px',
                  border: '1px solid var(--border)',
                  backgroundColor: 'var(--surface-secondary)',
                  color: 'var(--text-secondary)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                title="Attach encrypted file"
              >
                <Paperclip size={16} />
              </button>

              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={
                  activePersona === 'johnny'
                    ? `Instruct ${currentThread.partnerName}... (e.g. "Confirm sprint update")`
                    : activePersona === 'ktt'
                    ? 'Reply to Johnny (Super Executive Admin)...'
                    : 'Send legal diligence reply to Johnny...'
                }
                style={{
                  flex: 1,
                  padding: '10px 14px',
                  fontSize: '13px',
                  borderRadius: '8px',
                  border: '1px solid var(--border)',
                  backgroundColor: 'var(--surface-secondary)',
                  color: 'var(--text-primary)',
                  outline: 'none',
                }}
              />

              <button
                type="submit"
                disabled={!inputText.trim()}
                style={{
                  padding: '9px 18px',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: inputText.trim()
                    ? activePersona === 'johnny'
                      ? '#0284c7'
                      : activePersona === 'ktt'
                      ? '#4f46e5'
                      : '#059669'
                    : 'var(--border)',
                  color: '#ffffff',
                  fontSize: '13px',
                  fontWeight: 700,
                  cursor: inputText.trim() ? 'pointer' : 'not-allowed',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'all 150ms ease',
                  boxShadow: inputText.trim() ? '0 2px 8px rgba(0,0,0,0.15)' : 'none',
                }}
              >
                <Send size={14} />
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecuredEbox;
