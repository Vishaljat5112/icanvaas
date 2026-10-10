import React, { useState, useRef } from 'react';
import {
  Sparkles,
  Video,
  Image as ImageIcon,
  Music,
  Mic,
  Box,
  Workflow,
  FolderGit2,
  UploadCloud,
  Play,
  Download,
  Loader2,
  Wand2,
  Zap,
  Cpu,
  Layers,
  Film,
  MessageSquare,
  Volume2,
  Radio,
  Palette,
  Camera,
  ChevronRight,
  Database,
  Activity,
  CheckCircle2,
  ShieldCheck,
  Flame,
  ExternalLink,
  Copy,
  Check,
  FileText,
  Code,
  Headphones,
  Pause,
  VolumeX,
  AlertCircle
} from 'lucide-react';
import { Breadcrumb } from '../../components/ui';
import { useToast } from '../../context/ToastContext';
import { useNavigate } from 'react-router-dom';
import { generateStudioContent } from '../../services/geminiService';
import { generateElevenLabsSpeech, ELEVEN_VOICES } from '../../services/elevenLabsService';

export const CrmAiStudio = () => {
  const { addToast } = useToast();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  // The Client-Specified 15 Sub-Studios with Nova Drive #006742 Palette Alignment
  const subStudios = [
    { id: 'bestie', name: 'Bestie — My AI Agent', category: 'AI Agent', icon: Sparkles, desc: 'Your 24/7 business operating partner and conversational workflow controller.', badge: 'Live AI Core' },
    { id: 'muzik', name: 'AAI Muzik Hit Studio', category: 'Audio & Music', icon: Music, desc: 'Generate original commercial background tracks, jingles, and brand soundtracks in any genre.', badge: 'Dolby Atmos' },
    { id: 'realtalk', name: 'AAI Real Talk', category: 'Voice & Speech', icon: Radio, desc: 'Ultra-realistic human conversational dialogues and podcast speech generation with natural emotion.', badge: 'Neural Voice' },
    { id: 'audio-writer', name: 'AI Audio Writer', category: 'Audio & Music', icon: Mic, desc: 'Voiceover scriptwriting, voice modulation, and sonic identity branding synthesizer.', badge: 'Script Sync' },
    { id: 'contalk', name: 'AI ConTalk', category: 'Voice & Speech', icon: MessageSquare, desc: 'Continuous conversational agents for sales desking, client FAQs, and customer outreach.', badge: 'Interactive' },
    { id: 'film-maker', name: 'AI Film Maker', category: 'Video Production', icon: Film, desc: 'Full multi-scene cinematic movie and commercial generation from simple script outlines.', badge: 'Cinema 4K' },
    { id: 'image-talkr', name: 'AI Image TalkR', category: 'Avatar & 3D', icon: ImageIcon, desc: 'Animate any still portrait or executive headshot into a speaking, synchronized video presenter.', badge: 'LipSync v3' },
    { id: 'logo-gen', name: 'AI Logo Generator', category: 'Branding', icon: Palette, desc: 'Create vector logos, app icons, and corporate identities with eiCanvass aura effects.', badge: 'Vector SVGs' },
    { id: 'photo-life', name: 'AI Photo Life', category: 'Image Studio', icon: Camera, desc: 'Transform ordinary lot & product photography into studio-grade showroom visual assets.', badge: '100+ Backdrops' },
    { id: 'video-crew', name: 'AI Video Crew', category: 'Video Production', icon: Video, desc: 'Automated multi-camera angle switching, virtual director, and post-production rendering.', badge: 'Virtual Crew' },
    { id: 'visual-workflow', name: 'AI Visual Workflow', category: 'Automations', icon: Workflow, desc: 'Visual node-based pipeline connecting AI prompts directly to CRM and ERP triggers.', badge: 'No-Code Nodes' },
    { id: 'voicex-change', name: 'AI VoiceX Change', category: 'Voice & Speech', icon: Volume2, desc: 'Instant multi-language accent translation and corporate voice cloning in 40+ languages.', badge: '40+ Languages' },
    { id: 'big-movies', name: 'AAI BIG Movies Lab', category: 'Video Production', icon: Box, desc: 'Long-form narrative generation, documentary storytelling, and high-impact investor pitches.', badge: 'IMAX Render' },
    { id: 'train-speak', name: 'Train AI to Speak', category: 'Model Training', icon: Cpu, desc: 'Train fine-tuned custom voice models on executive speech samples with zero robotic artifacts.', badge: 'Custom LLM' },
    { id: 'video-agent', name: 'AI Video Agent', category: 'Video Production', icon: Video, desc: 'Say it, See it, Shape it, Ship it. Rapid video pipeline for social channels and ads.', badge: '4-Step Pipeline' },
  ];

  const [activeStudio, setActiveStudio] = useState('bestie');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [prompt, setPrompt] = useState('Produce a sleek 4K product trailer for our iCanvass PDM platform highlighting enterprise logistics and real-time desking.');
  const [aspectRatio, setAspectRatio] = useState('16:9');
  const [modelPreset, setModelPreset] = useState('UltraCinema v4.2');
  const [referenceFile, setReferenceFile] = useState(null);

  // Generation state
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [generatedAsset, setGeneratedAsset] = useState(null);
  const [savedLibrary, setSavedLibrary] = useState([
    { id: '1', title: 'Corporate Logistics Fleet Rendering', type: 'Image', studio: 'AI Photo Life', date: '2 hours ago', url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&auto=format&fit=crop&q=80' },
    { id: '2', title: 'Executive Spokesperson Commercial Pitch', type: 'Video', studio: 'AI Image TalkR', date: '1 day ago', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80' },
    { id: '3', title: 'Enterprise Brand Anthem Score', type: 'Audio', studio: 'AAI Muzik Hit Studio', date: '2 days ago', url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80' },
  ]);

  const categories = ['All', 'Video Production', 'Voice & Speech', 'Audio & Music', 'Image Studio', 'Avatar & 3D', 'Branding', 'Automations', 'Model Training'];

  const filteredStudios = selectedCategory === 'All'
    ? subStudios
    : subStudios.filter((s) => s.category === selectedCategory);

  const activeStudioObj = subStudios.find((s) => s.id === activeStudio) || subStudios[0];

  const [monitorTab, setMonitorTab] = useState('output'); // 'output' | 'viewport'
  const [copiedText, setCopiedText] = useState(false);
  const [isImageRendering, setIsImageRendering] = useState(false);

  // ElevenLabs Voice State
  const [selectedVoice, setSelectedVoice] = useState('21m00Tcm4TlvDq8ikWAM'); // Rachel by default
  const [isSynthesizingVoice, setIsSynthesizingVoice] = useState(false);
  const [audioBlobUrl, setAudioBlobUrl] = useState(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const audioRef = useRef(null);

  const toggleAudioPlay = () => {
    if (!audioRef.current) return;
    if (isPlayingAudio) {
      audioRef.current.pause();
      setIsPlayingAudio(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlayingAudio(true);
      }).catch((e) => {
        console.error('Audio play error:', e);
      });
    }
  };

  const handleSynthesizeVoice = async () => {
    if (!generatedAsset?.content) {
      addToast({ title: 'No Script Found', message: 'Generate a script first before synthesizing voice.', type: 'error' });
      return;
    }

    setIsSynthesizingVoice(true);
    try {
      const url = await generateElevenLabsSpeech(generatedAsset.content, selectedVoice);
      setAudioBlobUrl(url);
      setIsPlayingAudio(true);
      addToast({
        title: 'Voice Synthesized 🎙️',
        message: 'ElevenLabs generated real human audio stream successfully.',
        type: 'success',
      });
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.src = url;
          audioRef.current.play().catch(() => {});
        }
      }, 200);
    } catch (err) {
      addToast({
        title: 'ElevenLabs Notice',
        message: err.message || 'Could not synthesize voice audio.',
        type: 'error',
      });
    } finally {
      setIsSynthesizingVoice(false);
    }
  };

  const handleLoadFromVault = (item) => {
    setGeneratedAsset(item);
    if (item.prompt) {
      setPrompt(item.prompt);
    }
    if (item.studioId) {
      setActiveStudio(item.studioId);
    }
    if (item.type === 'Image' || item.isFluxImage || monitorTab === 'viewport') {
      setMonitorTab('viewport');
    } else {
      setMonitorTab('output');
    }
    addToast({
      title: 'Loaded from Vault',
      message: `"${item.title}" loaded into canvas monitor.`,
      type: 'info',
    });
  };

  const handleDownload = async () => {
    if (!generatedAsset) return;

    // If currently viewing Visual Canvas or asset is an Image:
    if (monitorTab === 'viewport' || generatedAsset.type === 'Image' || generatedAsset.isFluxImage) {
      try {
        addToast({ title: 'Downloading Image', message: 'Saving 4K image file...', type: 'info' });
        const res = await fetch(generatedAsset.url);
        const blob = await res.blob();
        const blobUrl = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = blobUrl;
        a.download = `${(generatedAsset.studio || 'ai_render').replace(/\s+/g, '_')}_${Date.now()}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(blobUrl);
        addToast({ title: 'Image Saved', message: '4K image downloaded to your device.', type: 'success' });
      } catch (e) {
        // Fallback: open in new tab for direct save if cross-origin restricts direct blob
        window.open(generatedAsset.url, '_blank');
      }
      return;
    }

    // Otherwise download text script
    const element = document.createElement('a');
    const file = new Blob([generatedAsset.content || generatedAsset.title], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${generatedAsset.studio.replace(/\s+/g, '_')}_output.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    addToast({ title: 'Export Complete', message: 'Script downloaded successfully.', type: 'success' });
  };

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) {
      addToast({ title: 'Prompt Required', message: 'Please enter a generation prompt.', type: 'error' });
      return;
    }

    setIsGenerating(true);
    setGenerationProgress(20);
    setGeneratedAsset(null);
    setAudioBlobUrl(null);
    setIsPlayingAudio(false);

    const isImageStudio = activeStudio === 'photo-life' || activeStudio === 'logo-gen' || activeStudioObj.category === 'Image Studio' || activeStudioObj.category === 'Branding';

    // Auto-switch to viewport for visual studios so user sees the real generated image instantly
    if (isImageStudio) {
      setMonitorTab('viewport');
    } else {
      setMonitorTab('output');
    }

    const progressInterval = setInterval(() => {
      setGenerationProgress((p) => {
        if (p >= 85) return 90;
        return p + 15;
      });
    }, 300);

    try {
      const aiResult = await generateStudioContent(activeStudio, prompt, {
        aspectRatio,
        modelPreset,
      });

      clearInterval(progressInterval);
      setGenerationProgress(100);
      setIsGenerating(false);

      // Real FLUX.1 Image generation for photo-life & logo-gen
      let realImageUrl = 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&auto=format&fit=crop&q=80';
      if (isImageStudio) {
        setIsImageRendering(true);
        const cleanPrompt = encodeURIComponent(
          prompt.trim() + (activeStudio === 'photo-life'
            ? ', photorealistic luxury automotive commercial staging, 8k uhd, showroom cinematic lighting, 85mm lens'
            : activeStudio === 'logo-gen'
              ? ', minimalist modern corporate vector logo emblem on clean background, crisp edges'
              : ', 8k cinematic lighting, ultra high resolution')
        );
        const randomSeed = Math.floor(Math.random() * 1000000);
        realImageUrl = `https://image.pollinations.ai/prompt/${cleanPrompt}?width=1024&height=576&nologo=true&seed=${randomSeed}`;
      }

      const newAsset = {
        id: Date.now().toString(),
        title: prompt.slice(0, 42) + (prompt.length > 42 ? '...' : ''),
        studio: activeStudioObj.name,
        studioId: activeStudio,
        type: activeStudioObj.category.includes('Video') ? 'Video' : activeStudioObj.category.includes('Audio') || activeStudioObj.category.includes('Voice') ? 'Audio' : 'Image',
        date: 'Just now',
        url: realImageUrl,
        isFluxImage: isImageStudio,
        prompt,
        content: aiResult.text,
        isRealAi: aiResult.success,
      };

      setGeneratedAsset(newAsset);
      setSavedLibrary((prev) => [newAsset, ...prev]);

      addToast({
        title: aiResult.success ? 'Neural Synthesis Complete' : 'Synthesis Complete (Domain Mode)',
        message: `${activeStudioObj.name} generated real-time asset.`,
        type: 'success',
      });
    } catch (err) {
      clearInterval(progressInterval);
      setGenerationProgress(100);
      setIsGenerating(false);
      addToast({
        title: 'Synthesis Notice',
        message: err.message || 'Error communicating with AI engine.',
        type: 'error',
      });
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '22px',
      maxWidth: '1440px',
      margin: '0 auto',
      paddingBottom: '3rem',
      color: '#1e293b',
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* 1. Nova Drive Themed Premium Banner / Header */}
      <div style={{
        background: 'linear-gradient(135deg, #006742 0%, #004d31 100%)',
        borderRadius: '20px',
        padding: '24px 28px',
        color: '#ffffff',
        boxShadow: '0 12px 28px -6px rgba(0, 103, 66, 0.35)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '18px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Ambient watermark glow */}
        <div style={{
          position: 'absolute',
          right: '-40px',
          top: '-40px',
          width: '240px',
          height: '240px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '11px',
            fontWeight: 800,
            letterSpacing: '1.2px',
            textTransform: 'uppercase',
            color: '#a7f3d0',
            marginBottom: '6px',
          }}>
            <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#34d399', boxShadow: '0 0 10px #34d399' }} />
            REAL-TIME AI PRODUCTION FEED • OPERATIONS CENTER
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <h1 style={{
              fontSize: '28px',
              fontWeight: 900,
              letterSpacing: '-0.5px',
              margin: 0,
              color: '#ffffff',
            }}>
              AI CONTENT STUDIO & PRODUCTION LABS
            </h1>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 12px',
              borderRadius: '20px',
              fontSize: '11px',
              fontWeight: 800,
              letterSpacing: '0.6px',
              textTransform: 'uppercase',
              backgroundColor: 'rgba(255, 255, 255, 0.18)',
              color: '#ffffff',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              backdropFilter: 'blur(8px)',
            }}>
              <Sparkles size={12} />
              15 Specialized Studios
            </span>
          </div>

          <p style={{ fontSize: '13px', color: '#d1fae5', margin: '6px 0 0 0', maxWidth: '850px', lineHeight: 1.5 }}>
            Multi-modal generative engine: commercial cinema creation, talking avatars, neural voice synthesis, and sonic brand soundscapes.
          </p>
        </div>

        {/* Action Header Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', position: 'relative', zIndex: 1 }}>
          <button
            type="button"
            onClick={() => navigate('/crm/bestie')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 18px',
              borderRadius: '12px',
              fontSize: '12px',
              fontWeight: 700,
              backgroundColor: 'rgba(255, 255, 255, 0.14)',
              color: '#ffffff',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              cursor: 'pointer',
              backdropFilter: 'blur(8px)',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.24)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.14)'}
          >
            <Sparkles size={14} color="#a7f3d0" />
            <span>Open Bestie AI</span>
          </button>

          <button
            type="button"
            onClick={() => navigate('/crm/ai-video')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 20px',
              borderRadius: '12px',
              fontSize: '12px',
              fontWeight: 800,
              backgroundColor: '#ffffff',
              color: '#006742',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(0, 0, 0, 0.15)',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 18px rgba(0, 0, 0, 0.25)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 14px rgba(0, 0, 0, 0.15)';
            }}
          >
            <Video size={14} color="#006742" />
            <span>Launch 4-Step Video Agent</span>
          </button>
        </div>
      </div>

      {/* Dynamic Keyframes & Hover Animations for Pic 1 Style Gradient Cards & 3D Isometric Cards */}
      <style>{`
        @keyframes float-bubble {
          0%, 100% { transform: scale(1) translate(0, 0); }
          50% { transform: scale(1.08) translate(-6px, -4px); }
        }
        .pic1-kpi-card {
          position: relative;
          overflow: hidden;
          border-radius: 18px;
          padding: 22px 24px;
          display: flex;
          flex-direction: column;
          justifyContent: space-between;
          min-height: 140px;
          color: #ffffff;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          cursor: default;
          border: none;
        }
        .pic1-kpi-card:hover {
          transform: translateY(-6px) scale(1.015);
        }
        .pic1-watermark-1 {
          position: absolute;
          right: -30px;
          bottom: -30px;
          width: 140px;
          height: 140px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.15);
          pointer-events: none;
          transition: all 0.4s ease;
        }
        .pic1-watermark-2 {
          position: absolute;
          right: 30px;
          bottom: -60px;
          width: 130px;
          height: 130px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
          pointer-events: none;
          transition: all 0.4s ease;
        }
        .pic1-kpi-card:hover .pic1-watermark-1 {
          transform: scale(1.15) translate(-4px, -4px);
        }
        .pic1-kpi-card:hover .pic1-watermark-2 {
          transform: scale(1.1) translate(6px, -2px);
        }

        /* 3D Isometric Perspective Card Styles Matching Reference - Compact & Responsive */
        .card-3d-stage {
          perspective: 1000px;
          perspective-origin: center center;
          padding: 4px 2px 10px 2px;
        }
        .card-3d-container {
          position: relative;
          transform-style: preserve-3d;
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        /* Bottom Stacked Layer Underneath */
        .card-3d-underlay {
          position: absolute;
          inset: 0;
          border-radius: 18px;
          background: #0f172a;
          border: 1px solid rgba(255, 255, 255, 0.08);
          transform: translate3d(-4px, 6px, -15px) rotateZ(-1.5deg);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.16);
          pointer-events: none;
          z-index: 0;
          overflow: hidden;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .card-3d-underlay-corner {
          position: absolute;
          bottom: -10px;
          left: -10px;
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background: #00e676;
        }
        /* Main Floating 3D Card - Compact & Clean */
        .card-3d-main {
          position: relative;
          z-index: 2;
          background: #ffffff;
          border-radius: 18px;
          padding: 14px 14px;
          border: 1.5px solid #e2e8f0;
          box-shadow: -4px 8px 18px -2px rgba(0, 0, 0, 0.08), 0 2px 4px rgba(0, 0, 0, 0.02);
          transform: rotateX(6deg) rotateY(-4deg) rotateZ(0.8deg);
          transform-style: preserve-3d;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          cursor: pointer;
          overflow: hidden;
        }
        /* Interactive 3D Hover */
        .card-3d-container:hover .card-3d-main {
          transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg) translateY(-6px) scale(1.02);
          box-shadow: 0 16px 30px -4px rgba(0, 103, 66, 0.22), 0 0 0 1px #006742;
          border-color: #006742;
        }
        .card-3d-container:hover .card-3d-underlay {
          transform: translate3d(-8px, 10px, -22px) rotateZ(-3deg);
          box-shadow: 0 16px 26px rgba(0, 0, 0, 0.22);
        }
        .card-3d-main.is-active {
          border-color: #006742;
          box-shadow: 0 14px 28px -4px rgba(0, 103, 66, 0.26), 0 0 0 1.5px #006742;
          transform: rotateX(2deg) rotateY(-1.5deg) rotateZ(0.3deg) translateY(-3px);
        }
      `}</style>

      {/* 2. KPI Cards Strip - Pic 1 Vibrant Animated Gradient Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '18px',
        width: '100%',
      }}>
        {/* KPI 1: Coral / Peach Gradient (#FE9496 to #ff7582) */}
        <div
          className="pic1-kpi-card"
          style={{
            background: 'linear-gradient(135deg, #fe9496 0%, #ff6b7a 100%)',
            boxShadow: '0 10px 25px -4px rgba(254, 148, 150, 0.45)',
          }}
        >
          <div className="pic1-watermark-1" />
          <div className="pic1-watermark-2" />

          <div style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', fontWeight: 800, color: 'rgba(255, 255, 255, 0.9)', textTransform: 'uppercase', letterSpacing: '0.6px' }}>
              TOTAL STUDIOS
            </span>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.22)',
              backdropFilter: 'blur(4px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
            }}>
              <Sparkles size={18} />
            </div>
          </div>

          <div style={{ position: 'relative', zIndex: 1, marginTop: '8px' }}>
            <div style={{ fontSize: '28px', fontWeight: 900, color: '#ffffff', letterSpacing: '-0.5px' }}>
              15 Sub-Studios
            </div>
            <div style={{ fontSize: '11.5px', fontWeight: 700, color: 'rgba(255, 255, 255, 0.95)', display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#ffffff', boxShadow: '0 0 8px #ffffff' }} />
              <span>All Neural Cores Online</span>
            </div>
          </div>
        </div>

        {/* KPI 2: Sky Blue Gradient (#4BCBEB to #268bf0) */}
        <div
          className="pic1-kpi-card"
          style={{
            background: 'linear-gradient(135deg, #4bcbeb 0%, #1e87f0 100%)',
            boxShadow: '0 10px 25px -4px rgba(75, 203, 235, 0.45)',
          }}
        >
          <div className="pic1-watermark-1" />
          <div className="pic1-watermark-2" />

          <div style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', fontWeight: 800, color: 'rgba(255, 255, 255, 0.9)', textTransform: 'uppercase', letterSpacing: '0.6px' }}>
              AUDIO / VIDEO RENDERS
            </span>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.22)',
              backdropFilter: 'blur(4px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
            }}>
              <Video size={18} />
            </div>
          </div>

          <div style={{ position: 'relative', zIndex: 1, marginTop: '8px' }}>
            <div style={{ fontSize: '28px', fontWeight: 900, color: '#ffffff', letterSpacing: '-0.5px' }}>
              1,840 Assets
            </div>
            <div style={{ fontSize: '11.5px', fontWeight: 700, color: 'rgba(255, 255, 255, 0.95)', display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
              <Activity size={13} />
              <span>+24% output this week</span>
            </div>
          </div>
        </div>

        {/* KPI 3: Purple / Violet Gradient (#A05AFF to #7c3aed) */}
        <div
          className="pic1-kpi-card"
          style={{
            background: 'linear-gradient(135deg, #a05aff 0%, #7026e8 100%)',
            boxShadow: '0 10px 25px -4px rgba(160, 90, 255, 0.45)',
          }}
        >
          <div className="pic1-watermark-1" />
          <div className="pic1-watermark-2" />

          <div style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', fontWeight: 800, color: 'rgba(255, 255, 255, 0.9)', textTransform: 'uppercase', letterSpacing: '0.6px' }}>
              AVG RENDER LATENCY
            </span>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.22)',
              backdropFilter: 'blur(4px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
            }}>
              <Zap size={18} />
            </div>
          </div>

          <div style={{ position: 'relative', zIndex: 1, marginTop: '8px' }}>
            <div style={{ fontSize: '28px', fontWeight: 900, color: '#ffffff', letterSpacing: '-0.5px' }}>
              1.4 Seconds
            </div>
            <div style={{ fontSize: '11.5px', fontWeight: 700, color: 'rgba(255, 255, 255, 0.95)', display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#ffffff', boxShadow: '0 0 8px #ffffff' }} />
              <span>Real-time Tensor Core GPU</span>
            </div>
          </div>
        </div>

        {/* KPI 4: Mint / Teal Turquoise Gradient (#1BCFB4 to #0fa892) */}
        <div
          className="pic1-kpi-card"
          style={{
            background: 'linear-gradient(135deg, #1bcfb4 0%, #0fa892 100%)',
            boxShadow: '0 10px 25px -4px rgba(27, 207, 180, 0.45)',
          }}
        >
          <div className="pic1-watermark-1" />
          <div className="pic1-watermark-2" />

          <div style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', fontWeight: 800, color: 'rgba(255, 255, 255, 0.9)', textTransform: 'uppercase', letterSpacing: '0.6px' }}>
              STORAGE VAULT
            </span>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.22)',
              backdropFilter: 'blur(4px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
            }}>
              <Database size={18} />
            </div>
          </div>

          <div style={{ position: 'relative', zIndex: 1, marginTop: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '28px', fontWeight: 900, color: '#ffffff', letterSpacing: '-0.5px' }}>482 GB</span>
              <span style={{ fontSize: '12px', fontWeight: 800, color: 'rgba(255, 255, 255, 0.85)' }}>/ 2 TB (24%)</span>
            </div>
            {/* White translucent progress bar */}
            <div style={{ width: '100%', height: '6px', backgroundColor: 'rgba(255, 255, 255, 0.25)', borderRadius: '4px', overflow: 'hidden', marginTop: '8px' }}>
              <div style={{ width: '24%', height: '100%', backgroundColor: '#ffffff', borderRadius: '4px', boxShadow: '0 0 10px #ffffff' }} />
            </div>
          </div>
        </div>
      </div>

      {/* 3. Category Filter Navigation Pills - #006742 Palette */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        overflowX: 'auto',
        padding: '6px',
        borderRadius: '16px',
        backgroundColor: '#ffffff',
        border: '1px solid #e2e8f0',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.03)',
      }}>
        {categories.map((cat) => {
          const isCatActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 16px',
                borderRadius: '12px',
                fontSize: '12px',
                fontWeight: isCatActive ? 800 : 600,
                border: isCatActive ? '1px solid #006742' : '1px solid transparent',
                backgroundColor: isCatActive ? '#006742' : 'transparent',
                color: isCatActive ? '#ffffff' : '#64748b',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.15s ease',
                boxShadow: isCatActive ? '0 4px 12px rgba(0, 103, 66, 0.25)' : 'none',
              }}
              onMouseEnter={(e) => {
                if (!isCatActive) {
                  e.currentTarget.style.backgroundColor = 'rgba(0, 103, 66, 0.06)';
                  e.currentTarget.style.color = '#006742';
                }
              }}
              onMouseLeave={(e) => {
                if (!isCatActive) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#64748b';
                }
              }}
            >
              {cat === 'All' && <Layers size={13} />}
              {cat === 'Video Production' && <Film size={13} />}
              {cat === 'Voice & Speech' && <Mic size={13} />}
              {cat === 'Audio & Music' && <Music size={13} />}
              {cat === 'Image Studio' && <Camera size={13} />}
              {cat === 'Avatar & 3D' && <ImageIcon size={13} />}
              {cat === 'Branding' && <Palette size={13} />}
              {cat === 'Automations' && <Workflow size={13} />}
              {cat === 'Model Training' && <Cpu size={13} />}
              <span>{cat}</span>
            </button>
          );
        })}
      </div>

      {/* 4. The 15 Sub-Studio Grid */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', padding: '0 4px' }}>
          <h2 style={{
            fontSize: '13px',
            fontWeight: 900,
            color: '#006742',
            textTransform: 'uppercase',
            letterSpacing: '0.8px',
            margin: 0,
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <span>SELECT PRODUCTION STUDIO</span>
            <span style={{
              backgroundColor: 'rgba(0, 103, 66, 0.1)',
              color: '#006742',
              padding: '2px 8px',
              borderRadius: '6px',
              fontSize: '11px',
              fontWeight: 800,
            }}>
              {filteredStudios.length} Available
            </span>
          </h2>
          <span style={{ fontSize: '11.5px', color: '#64748b' }}>Click any studio node to mount workspace</span>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(215px, 1fr))',
          gap: '14px',
          width: '100%',
        }}>
          {filteredStudios.map((studio) => {
            const Icon = studio.icon;
            const isSelected = activeStudio === studio.id;
            return (
              <div key={studio.id} className="card-3d-stage">
                <div
                  className="card-3d-container"
                  onClick={() => {
                    setActiveStudio(studio.id);
                    if (studio.id === 'bestie') navigate('/crm/bestie');
                    if (studio.id === 'video-agent') navigate('/crm/ai-video');
                  }}
                >
                  {/* Bottom Stacked 3D Card */}
                  <div className="card-3d-underlay">
                    <div className="card-3d-underlay-corner" />
                  </div>

                  {/* Top Main 3D Tilted Card */}
                  <div className={`card-3d-main ${isSelected ? 'is-active' : ''}`}>
                    {/* 1. Proportional Curved Green Circle Backdrop */}
                    <div style={{
                      position: 'absolute',
                      top: '-20px',
                      right: '-20px',
                      width: '85px',
                      height: '85px',
                      borderRadius: '50%',
                      background: isSelected
                        ? 'linear-gradient(135deg, #006742 0%, #00e676 100%)'
                        : 'linear-gradient(135deg, rgba(0, 103, 66, 0.85) 0%, rgba(0, 230, 118, 0.75) 100%)',
                      boxShadow: '0 4px 14px rgba(0, 103, 66, 0.2)',
                      pointerEvents: 'none',
                      zIndex: 0,
                      transition: 'all 0.3s ease',
                    }} />

                    {/* 2. Top Header with Icon & Rating Badge */}
                    <div style={{ position: 'relative', zIndex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                        {/* Compact Icon */}
                        <div style={{
                          width: '34px',
                          height: '34px',
                          borderRadius: '10px',
                          backgroundColor: '#ffffff',
                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                          border: '1px solid rgba(255, 255, 255, 0.9)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#006742',
                          transform: 'translateZ(14px)',
                        }}>
                          <Icon size={17} color="#006742" strokeWidth={2.4} />
                        </div>

                        {/* Compact Rating Tag */}
                        <div style={{
                          padding: '2px 8px',
                          borderRadius: '14px',
                          backgroundColor: 'rgba(255, 255, 255, 0.95)',
                          boxShadow: '0 2px 6px rgba(0, 0, 0, 0.06)',
                          backdropFilter: 'blur(4px)',
                          fontSize: '9.5px',
                          fontWeight: 800,
                          color: '#006742',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '3px',
                          transform: 'translateZ(10px)',
                        }}>
                          <span style={{ color: '#006742' }}>★</span>
                          <span>{studio.badge}</span>
                        </div>
                      </div>

                      {/* Title & Description */}
                      <div style={{ fontSize: '13px', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.2px', lineHeight: 1.25 }}>
                        {studio.name}
                      </div>
                      <div style={{ fontSize: '10.5px', color: '#64748b', marginTop: '4px', lineHeight: 1.35, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {studio.desc}
                      </div>
                    </div>

                    {/* 3. Compact Dual Pill Buttons */}
                    <div style={{
                      position: 'relative',
                      zIndex: 1,
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '6px',
                      marginTop: '12px',
                      paddingTop: '10px',
                      borderTop: '1px solid #f1f5f9',
                      transform: 'translateZ(10px)',
                    }}>
                      <button
                        type="button"
                        style={{
                          padding: '5px 6px',
                          borderRadius: '16px',
                          border: 'none',
                          backgroundColor: isSelected ? '#006742' : '#00e676',
                          color: isSelected ? '#ffffff' : '#072418',
                          fontSize: '10px',
                          fontWeight: 800,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: '0 2px 8px rgba(0, 230, 118, 0.28)',
                          transition: 'all 0.15s ease',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {isSelected ? '● Active' : 'Enter'}
                      </button>

                      <button
                        type="button"
                        style={{
                          padding: '5px 6px',
                          borderRadius: '16px',
                          border: '1px solid #006742',
                          backgroundColor: '#ffffff',
                          color: '#006742',
                          fontSize: '10px',
                          fontWeight: 800,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '2px',
                          transition: 'all 0.15s ease',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        <span>Launch</span>
                        <ChevronRight size={10} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. Main Studio Workspace Section: Production Lab & Studio Canvas */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))',
        gap: '22px',
      }}>
        {/* Left Side: Production Lab */}
        <div style={{
          backgroundColor: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '20px',
          padding: '24px',
          boxShadow: '0 4px 16px -2px rgba(0, 103, 66, 0.06)',
          display: 'flex',
          flexDirection: 'column',
          gap: '18px',
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#006742' }} />
              <span style={{ fontSize: '11px', fontWeight: 900, color: '#006742', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
                PRODUCTION LAB WORKSTATION
              </span>
            </div>
            <div style={{ fontSize: '20px', fontWeight: 900, color: '#0f172a', marginTop: '4px' }}>
              {activeStudioObj.name}
            </div>
            <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>
              {activeStudioObj.desc}
            </div>
          </div>

          {/* Model Preset Banner in #006742 */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '12px 16px',
            borderRadius: '12px',
            backgroundColor: 'rgba(0, 103, 66, 0.06)',
            border: '1px solid rgba(0, 103, 66, 0.2)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', fontWeight: 700, color: '#006742' }}>
              <Sparkles size={15} color="#006742" />
              <span>Configured Model: <strong style={{ color: '#006742' }}>{modelPreset}</strong></span>
            </div>
            <span style={{ fontSize: '10px', fontWeight: 800, padding: '3px 8px', borderRadius: '6px', backgroundColor: '#006742', color: '#ffffff', textTransform: 'uppercase' }}>
              {activeStudioObj.category}
            </span>
          </div>

          {/* Prompt Directives Box */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 800, color: '#334155' }}>
              <span>Creative Prompt / Directives</span>
              <span style={{ fontWeight: 500, color: '#64748b', fontSize: '11px' }}>{prompt.length} / 500 chars</span>
            </div>
            <textarea
              rows={4}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={`Describe what you want ${activeStudioObj.name} to generate...`}
              style={{
                width: '100%',
                padding: '14px',
                borderRadius: '12px',
                border: '1px solid #cbd5e1',
                backgroundColor: '#f8fafc',
                color: '#0f172a',
                fontSize: '13px',
                resize: 'none',
                boxSizing: 'border-box',
                outline: 'none',
                fontFamily: 'inherit',
                lineHeight: 1.5,
                transition: 'border-color 0.2s ease',
              }}
              onFocus={(e) => e.target.style.borderColor = '#006742'}
              onBlur={(e) => e.target.style.borderColor = '#cbd5e1'}
            />
          </div>

          {/* Controls: Aspect Ratio & Preset */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 800, color: '#475569', marginBottom: '6px' }}>
                Aspect Ratio / Format
              </label>
              <select
                value={aspectRatio}
                onChange={(e) => setAspectRatio(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '10px',
                  border: '1px solid #cbd5e1',
                  backgroundColor: '#f8fafc',
                  color: '#0f172a',
                  fontSize: '12px',
                  fontWeight: 600,
                  outline: 'none',
                }}
              >
                <option value="16:9">16:9 Cinematic Widescreen</option>
                <option value="9:16">9:16 Vertical Story / Reels</option>
                <option value="1:1">1:1 Square Feed Asset</option>
                <option value="4:3">4:3 Classic Broadcast</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 800, color: '#475569', marginBottom: '6px' }}>
                Neural Engine Preset
              </label>
              <select
                value={modelPreset}
                onChange={(e) => setModelPreset(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '10px',
                  border: '1px solid #cbd5e1',
                  backgroundColor: '#f8fafc',
                  color: '#0f172a',
                  fontSize: '12px',
                  fontWeight: 600,
                  outline: 'none',
                }}
              >
                <option value="UltraCinema v4.2">UltraCinema v4.2 (Highest Fidelity)</option>
                <option value="HyperReal v3.0">HyperReal v3.0 (Photorealistic)</option>
                <option value="Commercial Ad Express">Commercial Ad Express (Fast Turnaround)</option>
                <option value="Studio Voice X2">Studio Voice X2 (Broadcast Quality)</option>
              </select>
            </div>
          </div>

          {/* Reference File Box */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px 16px',
            borderRadius: '12px',
            border: '1px dashed #cbd5e1',
            backgroundColor: '#f8fafc',
            fontSize: '12px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#64748b' }}>
              <UploadCloud size={18} color="#006742" />
              <span>{referenceFile ? `Reference: ${referenceFile.name}` : 'Upload style reference audio, portrait or script'}</span>
            </div>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              style={{
                padding: '6px 14px',
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                backgroundColor: '#ffffff',
                color: '#006742',
                fontSize: '11.5px',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              Choose File
            </button>
            <input
              ref={fileInputRef}
              type="file"
              style={{ display: 'none' }}
              onChange={(e) => {
                if (e.target.files[0]) {
                  setReferenceFile(e.target.files[0]);
                  addToast({ title: 'Reference Loaded', message: e.target.files[0].name, type: 'info' });
                }
              }}
            />
          </div>

          {/* Progress Indicator */}
          {isGenerating && (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              padding: '14px',
              borderRadius: '12px',
              backgroundColor: 'rgba(0, 103, 66, 0.08)',
              border: '1px solid rgba(0, 103, 66, 0.25)',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 800, color: '#006742' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Loader2 size={15} className="animate-spin" />
                  Synthesizing Neural Asset via {activeStudioObj.name}...
                </span>
                <span>{generationProgress}%</span>
              </div>
              <div style={{ width: '100%', height: '8px', backgroundColor: '#e2e8f0', borderRadius: '6px', overflow: 'hidden' }}>
                <div style={{ width: `${generationProgress}%`, height: '100%', backgroundColor: '#006742', transition: 'width 0.3s ease' }} />
              </div>
            </div>
          )}

          {/* Generate Button in #006742 */}
          <button
            type="button"
            disabled={isGenerating}
            onClick={handleGenerate}
            style={{
              width: '100%',
              padding: '14px',
              borderRadius: '12px',
              border: 'none',
              backgroundColor: '#006742',
              color: '#ffffff',
              fontSize: '13.5px',
              fontWeight: 800,
              cursor: isGenerating ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              boxShadow: '0 8px 20px -4px rgba(0, 103, 66, 0.4)',
              opacity: isGenerating ? 0.7 : 1,
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              if (!isGenerating) {
                e.currentTarget.style.backgroundColor = '#005234';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isGenerating) {
                e.currentTarget.style.backgroundColor = '#006742';
                e.currentTarget.style.transform = 'translateY(0)';
              }
            }}
          >
            {isGenerating ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                <span>Synthesizing Neural Asset...</span>
              </>
            ) : (
              <>
                <Wand2 size={18} />
                <span>Generate via {activeStudioObj.name}</span>
              </>
            )}
          </button>
        </div>

        {/* Right Side: Studio Canvas Monitor & Recent Vault */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
          {/* Canvas Monitor */}
          <div style={{
            backgroundColor: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '20px',
            padding: '20px',
            boxShadow: '0 4px 16px -2px rgba(0, 103, 66, 0.06)',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '15px', fontWeight: 900, color: '#006742' }}>
                  Studio Canvas Monitor
                </div>
                <div style={{ fontSize: '11.5px', color: '#64748b' }}>
                  Live synthesis preview viewport
                </div>
              </div>
              <span style={{
                fontSize: '10px',
                fontWeight: 800,
                fontFamily: 'monospace',
                padding: '3px 8px',
                borderRadius: '6px',
                backgroundColor: 'rgba(0, 103, 66, 0.1)',
                color: '#006742',
                border: '1px solid rgba(0, 103, 66, 0.25)',
              }}>
                4K UHD • REC [LIVE]
              </span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
              <div>
                <div style={{ fontSize: '15px', fontWeight: 900, color: '#006742', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span>Studio Canvas Monitor</span>
                  {generatedAsset?.isRealAi && (
                    <span style={{ fontSize: '10px', fontWeight: 800, padding: '2px 8px', borderRadius: '6px', backgroundColor: '#dcfce7', color: '#166534', border: '1px solid #bbf7d0' }}>
                      Gemini Live AI
                    </span>
                  )}
                </div>
                <div style={{ fontSize: '11.5px', color: '#64748b' }}>
                  Real-time neural synthesis & generation console
                </div>
              </div>

              {/* View Mode Toggle */}
              <div style={{ display: 'flex', gap: '6px', backgroundColor: '#f1f5f9', padding: '3px', borderRadius: '10px' }}>
                <button
                  type="button"
                  onClick={() => setMonitorTab('output')}
                  style={{
                    padding: '5px 12px',
                    borderRadius: '8px',
                    border: 'none',
                    fontSize: '11px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    backgroundColor: monitorTab === 'output' ? '#006742' : 'transparent',
                    color: monitorTab === 'output' ? '#ffffff' : '#64748b',
                    transition: 'all 0.15s ease',
                  }}
                >
                  AI Output & Script
                </button>
                <button
                  type="button"
                  onClick={() => setMonitorTab('viewport')}
                  style={{
                    padding: '5px 12px',
                    borderRadius: '8px',
                    border: 'none',
                    fontSize: '11px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    backgroundColor: monitorTab === 'viewport' ? '#006742' : 'transparent',
                    color: monitorTab === 'viewport' ? '#ffffff' : '#64748b',
                    transition: 'all 0.15s ease',
                  }}
                >
                  Visual Canvas
                </button>
              </div>
            </div>

            {/* Content Display: AI Output Console vs Visual Viewport */}
            {monitorTab === 'output' ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {/* ElevenLabs Real Voice Audio Player Header Bar (Shown for Voice & Audio Studios) */}
                {(activeStudioObj.category.includes('Voice') || activeStudioObj.category.includes('Audio') || activeStudio === 'realtalk' || activeStudio === 'audio-writer' || activeStudio === 'contalk') && generatedAsset?.content && (
                  <div style={{
                    backgroundColor: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderRadius: '12px',
                    padding: '12px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '10px',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{
                        width: '34px',
                        height: '34px',
                        borderRadius: '8px',
                        backgroundColor: '#006742',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#ffffff',
                      }}>
                        <Headphones size={18} />
                      </div>
                      <div>
                        <div style={{ fontSize: '12.5px', fontWeight: 800, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span>ElevenLabs Voice Synthesizer</span>
                          <span style={{ fontSize: '9.5px', fontWeight: 800, padding: '1px 6px', borderRadius: '4px', backgroundColor: '#dcfce7', color: '#166534', border: '1px solid #bbf7d0' }}>
                            Live Audio API
                          </span>
                        </div>
                        <div style={{ fontSize: '11px', color: '#64748b' }}>
                          Convert script into natural human voice speech
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {/* Voice selector */}
                      <select
                        value={selectedVoice}
                        onChange={(e) => setSelectedVoice(e.target.value)}
                        style={{
                          fontSize: '11px',
                          fontWeight: 700,
                          padding: '6px 10px',
                          borderRadius: '8px',
                          border: '1px solid #cbd5e1',
                          backgroundColor: '#ffffff',
                          color: '#1e293b',
                          cursor: 'pointer',
                          outline: 'none',
                        }}
                      >
                        {ELEVEN_VOICES.map((v) => (
                          <option key={v.id} value={v.id}>{v.label}</option>
                        ))}
                      </select>

                      <button
                        type="button"
                        onClick={handleSynthesizeVoice}
                        disabled={isSynthesizingVoice}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '7px 14px',
                          borderRadius: '8px',
                          fontSize: '11.5px',
                          fontWeight: 800,
                          backgroundColor: '#006742',
                          color: '#ffffff',
                          border: 'none',
                          cursor: isSynthesizingVoice ? 'not-allowed' : 'pointer',
                          opacity: isSynthesizingVoice ? 0.7 : 1,
                          boxShadow: '0 2px 8px rgba(0, 103, 66, 0.2)',
                          transition: 'all 0.15s ease',
                        }}
                      >
                        {isSynthesizingVoice ? (
                          <>
                            <Loader2 size={13} style={{ animation: 'spin 1s linear infinite' }} />
                            <span>Synthesizing...</span>
                          </>
                        ) : (
                          <>
                            <Volume2 size={13} />
                            <span>{audioBlobUrl ? 'Re-Generate Voice' : 'Synthesize Voice 🎙️'}</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Audio Player Controls Bar (When voice audio is generated) */}
                    {audioBlobUrl && (
                      <div style={{
                        width: '100%',
                        backgroundColor: '#ffffff',
                        border: '1px solid #cbd5e1',
                        borderRadius: '10px',
                        padding: '8px 14px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '12px',
                        marginTop: '4px',
                      }}>
                        <audio
                          ref={audioRef}
                          src={audioBlobUrl}
                          onEnded={() => setIsPlayingAudio(false)}
                          style={{ display: 'none' }}
                        />

                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <button
                            type="button"
                            onClick={toggleAudioPlay}
                            style={{
                              width: '32px',
                              height: '32px',
                              borderRadius: '50%',
                              backgroundColor: '#006742',
                              color: '#ffffff',
                              border: 'none',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              cursor: 'pointer',
                            }}
                          >
                            {isPlayingAudio ? <Pause size={14} fill="#ffffff" /> : <Play size={14} fill="#ffffff" style={{ marginLeft: '2px' }} />}
                          </button>
                          <div style={{ fontSize: '11.5px', fontWeight: 800, color: '#006742' }}>
                            {isPlayingAudio ? 'Playing ElevenLabs Audio...' : 'Audio Ready to Play'}
                          </div>
                        </div>

                        {/* Animated Equalizer Waveform */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '3px', height: '18px' }}>
                          {[12, 18, 8, 22, 14, 26, 16, 10, 24, 18, 12, 20].map((h, i) => (
                            <span
                              key={i}
                              style={{
                                width: '3px',
                                height: isPlayingAudio ? `${Math.max(6, (h * (i % 2 === 0 ? 1 : 0.8)))}px` : '6px',
                                backgroundColor: isPlayingAudio ? '#006742' : '#cbd5e1',
                                borderRadius: '2px',
                                transition: 'height 0.2s ease',
                              }}
                            />
                          ))}
                        </div>

                        <a
                          href={audioBlobUrl}
                          download={`${generatedAsset.studio.replace(/\s+/g, '_')}_voice.mp3`}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            fontSize: '11px',
                            fontWeight: 800,
                            color: '#006742',
                            textDecoration: 'none',
                            padding: '4px 8px',
                            borderRadius: '6px',
                            backgroundColor: 'rgba(0, 103, 66, 0.08)',
                          }}
                        >
                          <Download size={12} />
                          <span>MP3</span>
                        </a>
                      </div>
                    )}
                  </div>
                )}

                <div style={{
                  width: '100%',
                  minHeight: '260px',
                  maxHeight: '420px',
                  borderRadius: '14px',
                  overflowY: 'auto',
                  backgroundColor: '#0f172a',
                  border: '2px solid rgba(0, 103, 66, 0.3)',
                  padding: '18px 20px',
                  color: '#f8fafc',
                  fontSize: '13px',
                  lineHeight: 1.65,
                  position: 'relative',
                  boxSizing: 'border-box',
                }}>
                  {generatedAsset?.content ? (
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', paddingBottom: '10px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <Sparkles size={16} color="#34d399" />
                          <span style={{ fontSize: '12px', fontWeight: 800, color: '#34d399', textTransform: 'uppercase', letterSpacing: '0.6px' }}>
                            {generatedAsset.studio} Output
                          </span>
                        </div>
                        <span style={{ fontSize: '11px', color: '#94a3b8' }}>
                          Synthesized {generatedAsset.date}
                        </span>
                      </div>

                      <div style={{
                        whiteSpace: 'pre-wrap',
                        wordBreak: 'break-word',
                        color: '#e2e8f0',
                        fontFamily: generatedAsset.studioId === 'visual-workflow' || generatedAsset.studioId === 'logo-gen' ? 'monospace' : 'inherit',
                        fontSize: '12.5px',
                      }}>
                        {generatedAsset.content}
                      </div>
                    </div>
                  ) : (
                    <div style={{ textAlign: 'center', color: '#64748b', padding: '48px 16px' }}>
                      <FileText size={38} style={{ margin: '0 auto 10px', color: '#34d399', opacity: 0.6 }} />
                      <div style={{ fontSize: '13.5px', fontWeight: 800, color: '#f8fafc' }}>Awaiting Directive Input</div>
                      <div style={{ fontSize: '11.5px', color: '#94a3b8', marginTop: '6px', maxWidth: '300px', margin: '6px auto 0' }}>
                        Enter your prompt on the left and click Generate to see live AI screenplay, lyrics, dialogue, or code here.
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              /* Visual Viewport Box */
              <div style={{
                width: '100%',
                aspectRatio: '16 / 9',
                borderRadius: '14px',
                overflow: 'hidden',
                backgroundColor: '#071911',
                border: '2px solid rgba(0, 103, 66, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
              }}>
                {/* Corner crosshairs in #006742 */}
                <div style={{ position: 'absolute', top: '10px', left: '10px', width: '12px', height: '12px', borderTop: '2px solid #006742', borderLeft: '2px solid #006742', zIndex: 2 }} />
                <div style={{ position: 'absolute', top: '10px', right: '10px', width: '12px', height: '12px', borderTop: '2px solid #006742', borderRight: '2px solid #006742', zIndex: 2 }} />
                <div style={{ position: 'absolute', bottom: '10px', left: '10px', width: '12px', height: '12px', borderBottom: '2px solid #006742', borderLeft: '2px solid #006742', zIndex: 2 }} />
                <div style={{ position: 'absolute', bottom: '10px', right: '10px', width: '12px', height: '12px', borderBottom: '2px solid #006742', borderRight: '2px solid #006742', zIndex: 2 }} />

                {generatedAsset ? (
                  <>
                    {isImageRendering && (
                      <div style={{
                        position: 'absolute',
                        inset: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#071911',
                        zIndex: 4,
                        gap: '10px',
                      }}>
                        <Loader2 size={34} color="#34d399" style={{ animation: 'spin 1s linear infinite' }} />
                        <div style={{ fontSize: '13px', fontWeight: 800, color: '#34d399' }}>
                          Rendering Neural 4K Canvas...
                        </div>
                        <div style={{ fontSize: '11px', color: '#a7f3d0' }}>
                          Synthesizing photorealistic scene via FLUX engine
                        </div>
                      </div>
                    )}
                    <img
                      src={generatedAsset.url}
                      alt={generatedAsset.title}
                      onLoad={() => setIsImageRendering(false)}
                      onError={(e) => {
                        setIsImageRendering(false);
                        e.currentTarget.src = activeStudio === 'logo-gen'
                          ? 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80'
                          : 'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=1200&auto=format&fit=crop&q=80';
                      }}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    {generatedAsset.isFluxImage && (
                      <div style={{
                        position: 'absolute',
                        top: '12px',
                        left: '12px',
                        zIndex: 3,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '3px 8px',
                        borderRadius: '6px',
                        backgroundColor: 'rgba(0, 103, 66, 0.85)',
                        color: '#ffffff',
                        fontSize: '10px',
                        fontWeight: 800,
                        backdropFilter: 'blur(4px)',
                      }}>
                        <Sparkles size={11} color="#a7f3d0" />
                        <span>FLUX.1 Live Neural Render</span>
                      </div>
                    )}
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      backgroundColor: 'rgba(0,0,0,0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      opacity: 0,
                      transition: 'opacity 0.2s ease',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                    onMouseLeave={(e) => e.currentTarget.style.opacity = '0'}
                    >
                      <a
                        href={generatedAsset.url}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          padding: '10px 18px',
                          borderRadius: '12px',
                          backgroundColor: '#ffffff',
                          color: '#006742',
                          textDecoration: 'none',
                          fontSize: '12px',
                          fontWeight: 800,
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                        }}
                      >
                        <ExternalLink size={14} />
                        <span>Open 4K HD Image</span>
                      </a>
                    </div>
                  </>
                ) : (
                  <div style={{ textAlign: 'center', color: '#6ee7b7', padding: '24px' }}>
                    <Film size={34} style={{ margin: '0 auto 8px', color: '#34d399', opacity: 0.8 }} />
                    <div style={{ fontSize: '13px', fontWeight: 800, color: '#ecfdf5' }}>Awaiting Prompt Execution</div>
                    <div style={{ fontSize: '11px', color: '#a7f3d0', marginTop: '4px', maxWidth: '280px' }}>
                      Configure directives on the left to render high-fidelity neural assets.
                    </div>
                  </div>
                )}
              </div>
            )}


            {generatedAsset && (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '4px', flexWrap: 'wrap', gap: '8px' }}>
                <div>
                  <div style={{ fontSize: '12.5px', fontWeight: 800, color: '#0f172a' }}>{generatedAsset.title}</div>
                  <div style={{ fontSize: '11px', color: '#64748b' }}>{generatedAsset.studio} • Just now</div>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {generatedAsset.content && (
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(generatedAsset.content);
                        setCopiedText(true);
                        addToast({ title: 'Copied', message: 'AI output copied to clipboard.', type: 'info' });
                        setTimeout(() => setCopiedText(false), 2000);
                      }}
                      style={{
                        padding: '7px 12px',
                        borderRadius: '8px',
                        border: '1px solid #cbd5e1',
                        backgroundColor: '#ffffff',
                        color: '#334155',
                        fontSize: '11.5px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                      }}
                    >
                      {copiedText ? <Check size={13} color="#006742" /> : <Copy size={13} />}
                      <span>{copiedText ? 'Copied' : 'Copy Output'}</span>
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={handleDownload}
                    style={{
                      padding: '7px 14px',
                      borderRadius: '8px',
                      border: '1px solid rgba(0, 103, 66, 0.25)',
                      backgroundColor: 'rgba(0, 103, 66, 0.08)',
                      color: '#006742',
                      fontSize: '11.5px',
                      fontWeight: 800,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    <Download size={13} />
                    <span>
                      {monitorTab === 'viewport' || generatedAsset.type === 'Image' || generatedAsset.isFluxImage
                        ? 'Download 4K Image'
                        : 'Download Script'}
                    </span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Recent Vault */}
          <div style={{
            backgroundColor: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '20px',
            padding: '20px',
            boxShadow: '0 4px 16px -2px rgba(0, 103, 66, 0.06)',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '14px', fontWeight: 900, color: '#006742' }}>
                  Recent Production Vault
                </div>
                <div style={{ fontSize: '11px', color: '#64748b' }}>
                  Saved multi-studio assets
                </div>
              </div>
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#006742', fontFamily: 'monospace' }}>
                {savedLibrary.length} Items
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {savedLibrary.map((item) => {
                const isSelected = generatedAsset?.id === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => handleLoadFromVault(item)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '9px 12px',
                      borderRadius: '10px',
                      border: isSelected ? '1.5px solid #006742' : '1px solid #f1f5f9',
                      backgroundColor: isSelected ? '#f0fdf4' : '#f8fafc',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                    }}
                    onMouseEnter={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.backgroundColor = '#f1f5f9';
                        e.currentTarget.style.borderColor = '#cbd5e1';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.backgroundColor = '#f8fafc';
                        e.currentTarget.style.borderColor = '#f1f5f9';
                      }
                    }}
                  >
                    <img
                      src={item.url}
                      alt={item.title}
                      style={{ width: '48px', height: '36px', borderRadius: '6px', objectFit: 'cover', flexShrink: 0 }}
                    />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: '12px', fontWeight: 800, color: '#0f172a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {item.title}
                      </div>
                      <div style={{ fontSize: '10.5px', color: '#64748b' }}>
                        {item.studio} • {item.date}
                      </div>
                    </div>
                    <span style={{
                      fontSize: '10px',
                      fontWeight: 800,
                      padding: '2px 7px',
                      borderRadius: '4px',
                      backgroundColor: isSelected ? 'rgba(0, 103, 66, 0.18)' : 'rgba(0, 103, 66, 0.08)',
                      color: '#006742',
                      border: '1px solid rgba(0, 103, 66, 0.2)',
                      textTransform: 'uppercase',
                    }}>
                      {item.type}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrmAiStudio;
