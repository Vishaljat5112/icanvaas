import React, { useState } from 'react';
import {
  Video,
  Mic,
  Image as ImageIcon,
  FileText,
  Link2,
  Volume2,
  Sparkles,
  Share2,
  Play,
  CheckCircle2,
  Clock,
  ChevronRight,
  Film,
  Globe,
  UserCheck,
  ArrowLeft,
  Tv
} from 'lucide-react';
import { Breadcrumb, Button, Card, CardHeader, CardBody, Badge, Select } from '../../../components/ui';
import { useToast } from '../../../context/ToastContext';

export const AiVideoAgent = () => {
  const { addToast } = useToast();

  // 4 Core Pipeline Steps requested by Client
  const steps = [
    { id: 1, label: 'SAY IT', subtitle: 'Input Concept & Script' },
    { id: 2, label: 'SEE IT', subtitle: 'Scene Generation & Storyboard' },
    { id: 3, label: 'SHAPE IT', subtitle: 'Audio, Voice & Branding' },
    { id: 4, label: 'SHIP IT', subtitle: 'Export & Multi-Channel Publish' },
  ];

  const [currentStep, setCurrentStep] = useState(1);
  const [videoMode, setVideoMode] = useState('text-to-video');
  const [scriptText, setScriptText] = useState(
    'Introducing iCanvass PDM — the all-in-one Enterprise CRM, ERP, and AI SuperHouse designed for high-growth logistics, auto dealerships, and modern corporations.'
  );
  const [voiceModel, setVoiceModel] = useState('Sarah - US Executive Professional');
  const [aspectRatio, setAspectRatio] = useState('16:9');
  const [targetPlatform, setTargetPlatform] = useState('youtube');
  const [isProcessing, setIsProcessing] = useState(false);

  const videoModes = [
    { id: 'text-to-video', label: 'Text → Video', icon: FileText, desc: 'Generate from concept prompt' },
    { id: 'script-to-video', label: 'Script → Video', icon: Film, desc: 'Paste full scene breakdown' },
    { id: 'image-to-video', label: 'Image → Video', icon: ImageIcon, desc: 'Animate products & headshots' },
    { id: 'url-to-video', label: 'URL → Video', icon: Link2, desc: 'Turn web page into promo video' },
    { id: 'audio-to-video', label: 'Audio → Video', icon: Volume2, desc: 'Podcast & voice sync' },
    { id: 'talking-image', label: 'Talking Avatar', icon: UserCheck, desc: 'Photorealistic spokesperson' },
    { id: 'voice-dubbing', label: 'AI Dubbing', icon: Globe, desc: 'Translate voice in 40+ accents' },
  ];

  const scenes = [
    { id: 1, title: 'Scene 1: Futuristic Autonomous Headquarters', duration: '0:05', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&auto=format&fit=crop&q=80', status: 'Rendered' },
    { id: 2, title: 'Scene 2: Real-time Sales Pipeline & AI Desking', duration: '0:07', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80', status: 'Rendered' },
    { id: 3, title: 'Scene 3: Integrated ERP & Global Fleet Analytics', duration: '0:06', image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&auto=format&fit=crop&q=80', status: 'Ready' },
  ];

  const handleNext = () => {
    if (currentStep < 4) {
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        setCurrentStep((prev) => prev + 1);
      }, 350);
    }
  };

  const handleShip = () => {
    addToast({
      title: 'Video Asset Shipped!',
      message: 'Published to configured enterprise channels with automated SEO tags.',
      type: 'success',
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%', maxWidth: '1280px', margin: '0 auto', boxSizing: 'border-box' }}>
      {/* Page Header */}
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <Breadcrumb items={[{ label: 'iCanvass PDM' }, { label: 'AI SuperHouse' }, { label: 'AI Video Agent' }]} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '0.25rem', flexWrap: 'wrap' }}>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              AI Video Agent Pipeline
            </h1>
            <Badge variant="primary" style={{ backgroundColor: '#0284c7', color: '#ffffff', fontWeight: 700, fontSize: '11px', letterSpacing: '0.05em' }}>
              SAY IT → SEE IT → SHAPE IT → SHIP IT
            </Badge>
          </div>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '0.25rem 0 0 0' }}>
            Turn words, ideas, and URLs into broadcast-quality 4K enterprise videos in four structured stages.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '12px', fontWeight: 600 }}>
          <span style={{ color: 'var(--text-tertiary)' }}>Rendering Engine:</span>
          <span style={{ padding: '0.35rem 0.65rem', borderRadius: '8px', backgroundColor: 'var(--surface-secondary)', border: '1px solid var(--border)', fontFamily: 'var(--font-mono)', color: 'var(--text-primary)', fontWeight: 700 }}>
            Bestie CinemaCore 4.0
          </span>
        </div>
      </div>

      {/* 4-Step Pipeline Stepper Bar */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
          gap: '0.875rem',
          width: '100%',
          boxSizing: 'border-box',
        }}
      >
        {steps.map((step) => {
          const isCurrent = currentStep === step.id;
          const isPassed = currentStep > step.id;
          return (
            <div
              key={step.id}
              onClick={() => setCurrentStep(step.id)}
              style={{
                padding: '0.875rem 1rem',
                borderRadius: '14px',
                border: isCurrent
                  ? '1.5px solid #0284c7'
                  : isPassed
                  ? '1.5px solid #10b981'
                  : '1px solid var(--border)',
                backgroundColor: isCurrent
                  ? 'rgba(56, 189, 248, 0.08)'
                  : isPassed
                  ? 'rgba(16, 185, 129, 0.06)'
                  : 'var(--surface)',
                boxShadow: isCurrent ? '0 4px 12px rgba(2, 132, 199, 0.15)' : 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.875rem',
                transition: 'all 200ms ease',
              }}
            >
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '13px',
                  flexShrink: 0,
                  backgroundColor: isPassed ? '#10b981' : isCurrent ? '#0284c7' : 'var(--surface-secondary)',
                  color: isPassed || isCurrent ? '#ffffff' : 'var(--text-secondary)',
                  boxShadow: isCurrent ? '0 2px 8px rgba(2, 132, 199, 0.3)' : 'none',
                }}
              >
                {isPassed ? <CheckCircle2 size={18} /> : step.id}
              </div>
              <div style={{ minWidth: 0 }}>
                <span style={{ fontSize: '12px', fontWeight: 800, letterSpacing: '0.04em', display: 'block', color: isCurrent ? '#0284c7' : 'var(--text-primary)' }}>
                  {step.label}
                </span>
                <span style={{ fontSize: '11px', color: 'var(--text-tertiary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block' }}>
                  {step.subtitle}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Interactive Stage Body */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          gap: '1.5rem',
          alignItems: 'start',
          width: '100%',
          boxSizing: 'border-box',
        }}
      >
        {/* Left Stage Controls (min 58%) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}>
          {/* STEP 1: SAY IT */}
          {currentStep === 1 && (
            <Card className="border shadow-sm" style={{ width: '100%' }}>
              <CardHeader title="Stage 1: SAY IT" subtitle="Define the source input and voice script" />
              <CardBody style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {/* Input Mode Selector */}
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem', display: 'block' }}>
                    Select Creative Input Source
                  </label>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
                      gap: '0.625rem',
                    }}
                  >
                    {videoModes.map((m) => {
                      const Icon = m.icon;
                      const isSelected = videoMode === m.id;
                      return (
                        <button
                          key={m.id}
                          type="button"
                          onClick={() => setVideoMode(m.id)}
                          style={{
                            padding: '0.75rem',
                            borderRadius: '12px',
                            border: isSelected ? '1.5px solid #0284c7' : '1px solid var(--border)',
                            backgroundColor: isSelected ? 'rgba(56, 189, 248, 0.1)' : 'var(--surface)',
                            textAlign: 'left',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.35rem',
                            cursor: 'pointer',
                            transition: 'all 200ms ease',
                          }}
                        >
                          <Icon size={16} style={{ color: isSelected ? '#0284c7' : 'var(--text-secondary)' }} />
                          <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>{m.label}</span>
                          <span style={{ fontSize: '10px', color: 'var(--text-tertiary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {m.desc}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Script Area */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>
                      Narrator Script / Storyboard Prompt
                    </label>
                    <span style={{ color: 'var(--text-tertiary)', fontSize: '11px' }}>{scriptText.length} characters</span>
                  </div>
                  <textarea
                    rows={4}
                    value={scriptText}
                    onChange={(e) => setScriptText(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.875rem',
                      borderRadius: '12px',
                      border: '1px solid var(--border)',
                      backgroundColor: 'var(--surface)',
                      color: 'var(--text-primary)',
                      fontSize: '13px',
                      fontWeight: 500,
                      outline: 'none',
                      fontFamily: 'inherit',
                      lineHeight: 1.6,
                      boxSizing: 'border-box',
                    }}
                    placeholder="Enter narration script or talking points..."
                  />
                </div>

                {/* Aspect Ratio & Format */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.875rem' }}>
                  <div>
                    <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem', display: 'block' }}>
                      Aspect Ratio
                    </label>
                    <Select
                      value={aspectRatio}
                      onChange={(e) => setAspectRatio(e.target.value)}
                      options={[
                        { value: '16:9', label: '16:9 Landscape (YouTube / Desktop)' },
                        { value: '9:16', label: '9:16 Vertical (TikTok / Reels / Shorts)' },
                        { value: '1:1', label: '1:1 Square (LinkedIn / Instagram)' },
                      ]}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem', display: 'block' }}>
                      Resolution Quality
                    </label>
                    <Select
                      value="4k"
                      onChange={() => {}}
                      options={[
                        { value: '4k', label: '4K Ultra HD (3840x2160)' },
                        { value: '1080p', label: '1080p Full HD (1920x1080)' },
                      ]}
                    />
                  </div>
                </div>

                <div style={{ paddingTop: '0.5rem', display: 'flex', justifyContent: 'flex-end' }}>
                  <Button variant="primary" icon={ChevronRight} onClick={handleNext}>
                    Proceed to SEE IT (Storyboard)
                  </Button>
                </div>
              </CardBody>
            </Card>
          )}

          {/* STEP 2: SEE IT */}
          {currentStep === 2 && (
            <Card className="border shadow-sm" style={{ width: '100%' }}>
              <CardHeader title="Stage 2: SEE IT" subtitle="Inspect generated visual scenes and camera directions" />
              <CardBody style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {scenes.map((sc) => (
                    <div
                      key={sc.id}
                      style={{
                        padding: '0.75rem 1rem',
                        borderRadius: '12px',
                        border: '1px solid var(--border)',
                        backgroundColor: 'var(--surface)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                      }}
                    >
                      <img
                        src={sc.image}
                        alt={sc.title}
                        style={{ width: '80px', height: '56px', borderRadius: '8px', objectFit: 'cover', flexShrink: 0 }}
                      />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)', display: 'block' }}>{sc.title}</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.25rem', fontSize: '11px', color: 'var(--text-tertiary)' }}>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Clock size={12} /> {sc.duration}</span>
                          <span>•</span>
                          <span style={{ color: '#10b981', fontWeight: 700 }}>{sc.status}</span>
                        </div>
                      </div>
                      <Badge variant="success">Scene Locked</Badge>
                    </div>
                  ))}
                </div>

                <div style={{ paddingTop: '0.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Button variant="outline" icon={ArrowLeft} onClick={() => setCurrentStep(1)}>
                    Back to SAY IT
                  </Button>
                  <Button variant="primary" icon={ChevronRight} onClick={handleNext}>
                    Proceed to SHAPE IT (Audio & Style)
                  </Button>
                </div>
              </CardBody>
            </Card>
          )}

          {/* STEP 3: SHAPE IT */}
          {currentStep === 3 && (
            <Card className="border shadow-sm" style={{ width: '100%' }}>
              <CardHeader title="Stage 3: SHAPE IT" subtitle="Audio synthesis, voiceover narrator and sonic identity" />
              <CardBody style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem', display: 'block' }}>
                    Neural Voiceover Narrator
                  </label>
                  <Select
                    value={voiceModel}
                    onChange={(e) => setVoiceModel(e.target.value)}
                    options={[
                      { value: 'Sarah - US Executive Professional', label: 'Sarah - US Executive Professional (Warm & Confident)' },
                      { value: 'Alexander - British Documentary Lead', label: 'Alexander - British Documentary Lead (Authoritative)' },
                      { value: 'Mateo - Spanish Enterprise Bilingual', label: 'Mateo - Spanish Enterprise Bilingual (Bilingual ES/EN)' },
                      { value: 'Elena - Dynamic Tech Presenter', label: 'Elena - Dynamic Tech Presenter (High EiCanvass)' },
                    ]}
                  />
                </div>

                <div
                  style={{
                    padding: '0.875rem 1rem',
                    borderRadius: '12px',
                    backgroundColor: 'var(--surface-secondary)',
                    border: '1px solid var(--border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', fontSize: '12px', color: 'var(--text-primary)' }}>
                    <Volume2 size={16} style={{ color: '#0284c7' }} />
                    <span>Background Audio: <strong>AAI Muzik Corporate Anthem #4</strong></span>
                  </div>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: '#0284c7' }}>Volume: 24%</span>
                </div>

                <div style={{ paddingTop: '0.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Button variant="outline" icon={ArrowLeft} onClick={() => setCurrentStep(2)}>
                    Back to SEE IT
                  </Button>
                  <Button variant="primary" icon={ChevronRight} onClick={handleNext}>
                    Proceed to SHIP IT (Final Render)
                  </Button>
                </div>
              </CardBody>
            </Card>
          )}

          {/* STEP 4: SHIP IT */}
          {currentStep === 4 && (
            <Card className="border shadow-sm" style={{ width: '100%' }}>
              <CardHeader title="Stage 4: SHIP IT" subtitle="Export 4K master asset and trigger multi-channel distribution" />
              <CardBody style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div
                  style={{
                    padding: '1rem',
                    borderRadius: '12px',
                    backgroundColor: 'rgba(16, 185, 129, 0.08)',
                    border: '1px solid rgba(16, 185, 129, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                  }}
                >
                  <CheckCircle2 size={24} style={{ color: '#10b981', flexShrink: 0 }} />
                  <div>
                    <h4 style={{ fontSize: '12px', fontWeight: 800, color: '#047857', margin: 0 }}>
                      4K Master Asset Ready for Broadcast
                    </h4>
                    <p style={{ fontSize: '11px', color: '#065f46', margin: '0.25rem 0 0 0' }}>
                      All 3 scenes rendered, voiceover synced, and brand eiCanvass graphics composite complete.
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>Select Distribution Destination</label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.5rem' }}>
                    {['YouTube 4K Channel', 'Enterprise Client Portal', 'LinkedIn Corporate Feed', 'Email Campaign Video Embed'].map((dest, i) => (
                      <div
                        key={i}
                        style={{
                          padding: '0.625rem 0.875rem',
                          borderRadius: '10px',
                          border: '1px solid var(--border)',
                          backgroundColor: 'var(--surface)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          fontSize: '12px',
                          fontWeight: 600,
                          color: 'var(--text-primary)',
                        }}
                      >
                        <CheckCircle2 size={14} style={{ color: '#0284c7' }} />
                        <span>{dest}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ paddingTop: '0.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Button variant="outline" icon={ArrowLeft} onClick={() => setCurrentStep(3)}>
                    Back to SHAPE IT
                  </Button>
                  <Button variant="primary" icon={Share2} onClick={handleShip}>
                    Ship & Publish Asset Now
                  </Button>
                </div>
              </CardBody>
            </Card>
          )}
        </div>

        {/* Right Canvas Monitor (42%) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}>
          <Card className="border shadow-sm" style={{ width: '100%' }}>
            <CardHeader title="Live Monitor Viewport" subtitle="Real-time rendering canvas" />
            <CardBody style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
              <div
                style={{
                  position: 'relative',
                  borderRadius: '14px',
                  overflow: 'hidden',
                  border: '1px solid var(--border)',
                  aspectRatio: '16 / 9',
                  backgroundColor: '#000000',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80"
                  alt="Video Canvas"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <button
                    type="button"
                    onClick={() => addToast({ title: 'Playing 4K Video Preview', message: 'Duration: 0:18 • Codec: ProRes 422', type: 'info' })}
                    style={{
                      padding: '0.875rem',
                      borderRadius: '9999px',
                      backgroundColor: '#ffffff',
                      color: '#0f172a',
                      border: 'none',
                      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'transform 150ms ease',
                    }}
                  >
                    <Play size={22} style={{ fill: '#0f172a' }} />
                  </button>
                </div>
                <div
                  style={{
                    position: 'absolute',
                    bottom: '0.5rem',
                    left: '0.5rem',
                    right: '0.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '11px',
                    color: 'rgba(255, 255, 255, 0.95)',
                    backgroundColor: 'rgba(0, 0, 0, 0.65)',
                    backdropFilter: 'blur(4px)',
                    padding: '0.35rem 0.65rem',
                    borderRadius: '8px',
                  }}
                >
                  <span>0:00 / 0:18</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#38bdf8', fontWeight: 800 }}>
                    4K 60FPS
                  </span>
                </div>
              </div>

              <div
                style={{
                  padding: '0.875rem 1rem',
                  borderRadius: '12px',
                  backgroundColor: 'var(--surface-secondary)',
                  border: '1px solid var(--border)',
                  fontSize: '12px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.375rem',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>Active Mode:</span>
                  <span style={{ fontWeight: 800, color: 'var(--text-primary)', textTransform: 'uppercase' }}>{videoMode}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>Voice Model:</span>
                  <span style={{ fontWeight: 700, color: 'var(--text-primary)', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {voiceModel}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>Format:</span>
                  <span style={{ fontWeight: 800, color: 'var(--text-primary)' }}>{aspectRatio} Widescreen</span>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AiVideoAgent;
