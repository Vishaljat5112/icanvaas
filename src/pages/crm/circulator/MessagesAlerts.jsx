import React, { useState } from 'react';
import {
  MessageSquare,
  Bell,
  Search,
  Pin,
  Send,
  Image as ImageIcon,
  Mail,
  Smartphone,
  Shield,
  ShieldCheck,
  ShieldAlert,
  Plus,
  Trash2,
  Eye,
  Filter,
  CheckCircle2,
  Clock,
  User,
  Users,
  AlertTriangle,
  UploadCloud,
  X,
  FileText,
  Lock,
  Unlock,
  ChevronRight,
  Info,
  Edit3,
  Paperclip
} from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import { useToast } from '../../../context/ToastContext';

export const MessagesAlerts = () => {
  const { crmUser } = useAuth();
  const { addToast } = useToast();

  // Active Tab
  const [activeTab, setActiveTab] = useState('bulletin'); // 'bulletin' | 'gallery' | 'chat' | 'dispatch' | 'auth'
  
  // Authorization simulation state (allows reviewing both Authorized and Read-Only states)
  const [isAuthorizedPoster, setIsAuthorizedPoster] = useState(
    crmUser?.role === 'manager' || crmUser?.role === 'coordinator' || crmUser?.role === 'sub_coordinator' || crmUser?.role === 'super_admin'
  );

  // ----------------------------------------------------
  // 3.1 BULLETIN BOARD DATA & STATE
  // ----------------------------------------------------
  const [bulletinFilter, setBulletinFilter] = useState('all'); // 'all' | 'pinned' | 'alerts' | 'general'
  const [bulletinSearch, setBulletinSearch] = useState('');
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [isCreateAnnouncementOpen, setIsCreateAnnouncementOpen] = useState(false);
  const [editingAnnouncementId, setEditingAnnouncementId] = useState(null);
  const [announcementPreviewMode, setAnnouncementPreviewMode] = useState(false);

  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      title: '🚨 CRITICAL: Location Re-assignment for Westside Mall',
      category: 'alert',
      isPinned: true,
      sender: 'Sarah Jenkins (Campaign Coordinator)',
      senderRole: 'Coordinator',
      date: 'Today at 10:45 AM',
      readTime: '2 min read',
      content:
        'All signature gatherers assigned to Westside Mall: Management has instructed our teams to relocate from the South Courtyard to the Main North Entrance immediately due to scheduled construction. Do not gather signatures near the loading dock. Security has approved the North plaza awning.',
      recipients: 'Westside Field Team',
      attachment: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=800&q=80',
      attachmentName: 'Mall_North_Entrance_Permit_Zone.jpg',
      status: 'Published'
    },
    {
      id: 2,
      title: '📋 Prop 12 Signature Benchmark Reached — Weekend Goal Set',
      category: 'general',
      isPinned: true,
      sender: 'Marcus Sterling (Field Director)',
      senderRole: 'Management',
      date: 'Yesterday at 4:30 PM',
      readTime: '3 min read',
      content:
        'Great work team! We officially crossed 25,000 verified signatures for Proposition 12. For this upcoming weekend, all teams reaching over 120 valid signatures per shift will qualify for the $75 tier-1 weekend performance bonus.',
      recipients: 'Entire Campaign Staff',
      attachment: null,
      status: 'Published'
    },
    {
      id: 3,
      title: '⚠️ Weather Notice: High Heat Protocol in Effect',
      category: 'alert',
      isPinned: false,
      sender: 'Field Logistics Operations',
      senderRole: 'Safety Team',
      date: 'Oct 04, 2026',
      readTime: '1 min read',
      content:
        'Temperatures across Downtown District are expected to exceed 95°F today. Mandatory 15-minute hydration breaks every hour. Ice chests and water supplies are restocked at the mobile coordination van parked on 4th & Elm.',
      recipients: 'District 4 Circulators',
      attachment: null,
      status: 'Published'
    },
    {
      id: 4,
      title: '✅ Validation Turn-In Cutoff Time Extended',
      category: 'general',
      isPinned: false,
      sender: 'Validation Team Admin',
      senderRole: 'Compliance Desk',
      date: 'Oct 02, 2026',
      readTime: '2 min read',
      content:
        'The nightly turn-in window at headquarters has been extended until 8:30 PM this Friday to accommodate evening petition drives. Ensure all circulator affidavits are signed and dated prior to turn-in.',
      recipients: 'All Active Circulators',
      attachment: null,
      status: 'Published'
    }
  ]);

  // New Announcement Form State
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: '',
    category: 'general',
    recipients: 'Entire Team',
    content: '',
    isPinned: false,
    attachment: null,
    attachmentName: ''
  });

  // ----------------------------------------------------
  // 3.3 IMAGE UPLOAD & GALLERY STATE
  // ----------------------------------------------------
  const [gallerySearch, setGallerySearch] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [isUploadImageOpen, setIsUploadImageOpen] = useState(false);
  const [uploadFormData, setUploadFormData] = useState({
    caption: '',
    category: 'Field Territory',
    previewUrl: '',
    fileName: ''
  });

  const [galleryImages, setGalleryImages] = useState([
    {
      id: 1,
      title: 'North Plaza Approved Staging Area',
      caption: 'Permitted petition gathering zone outside City Hall North Plaza.',
      url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
      uploader: 'Sarah Jenkins (Coordinator)',
      date: 'Oct 05, 2026',
      category: 'Field Territory',
      size: '2.4 MB'
    },
    {
      id: 2,
      title: 'Official Prop 12 Info Card & Clipboard Setup',
      caption: 'Correct clipboard header positioning and voter summary flyer display.',
      url: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80',
      uploader: 'Marcus Sterling (Management)',
      date: 'Oct 04, 2026',
      category: 'Petition Guides',
      size: '1.8 MB'
    },
    {
      id: 3,
      title: 'Valid Voter Signature Affidavit Example',
      caption: 'Sample completed petition page showing legible printed names and clean date format.',
      url: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80',
      uploader: 'Validation Desk',
      date: 'Oct 03, 2026',
      category: 'Compliance Sample',
      size: '3.1 MB'
    },
    {
      id: 4,
      title: 'District 4 Farmers Market Staging Point',
      caption: 'Setup photo for the Saturday morning public transit hub registration drive.',
      url: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=800&q=80',
      uploader: 'Field Logistics',
      date: 'Oct 01, 2026',
      category: 'Field Territory',
      size: '2.9 MB'
    }
  ]);

  // ----------------------------------------------------
  // 3.4 CHAT INTERFACE STATE
  // ----------------------------------------------------
  const [chatSearch, setChatSearch] = useState('');
  const [activeContactId, setActiveContactId] = useState(1);
  const [chatInput, setChatInput] = useState('');
  const [isMobileChatOpen, setIsMobileChatOpen] = useState(false);

  const contacts = [
    {
      id: 1,
      name: 'Campaign Operations Command',
      role: 'Broadcast & Field Dispatch',
      avatar: 'CO',
      online: true,
      lastMsg: 'Field check-ins are due at 2:00 PM today.',
      time: '10:48 AM',
      unread: 1,
      isGroup: true
    },
    {
      id: 2,
      name: 'Sarah Jenkins',
      role: 'Field Coordinator (Downtown)',
      avatar: 'SJ',
      online: true,
      lastMsg: 'Clipboards and voter sheets are in the team van.',
      time: '09:30 AM',
      unread: 0,
      isGroup: false
    },
    {
      id: 3,
      name: 'Mike Kowalski',
      role: 'Sub Coordinator (Westside)',
      avatar: 'MK',
      online: false,
      lastMsg: 'Got the update regarding the mall entrance.',
      time: 'Yesterday',
      unread: 0,
      isGroup: false
    },
    {
      id: 4,
      name: 'Validation Audit Support',
      role: 'Compliance & Quality Desk',
      avatar: 'VA',
      online: true,
      lastMsg: 'Batch #8092 has cleared initial review.',
      time: 'Yesterday',
      unread: 0,
      isGroup: false
    }
  ];

  const [chatConversations, setChatConversations] = useState({
    1: [
      { id: 'm1', sender: 'Operations Command', text: 'Good morning team. High turnout reported at City Center.', time: '08:30 AM', isMe: false },
      { id: 'm2', sender: 'Operations Command', text: 'Remember to verify that all signers are registered in the county.', time: '09:05 AM', isMe: false },
      { id: 'm3', sender: 'Me', text: 'Understood. Team Alpha is deployed at Station Plaza.', time: '09:15 AM', isMe: true },
      { id: 'm4', sender: 'Operations Command', text: 'Field check-ins are due at 2:00 PM today.', time: '10:48 AM', isMe: false }
    ],
    2: [
      { id: 'm5', sender: 'Sarah Jenkins', text: 'Hey there! How is the signature rate looking at your intersection?', time: '09:12 AM', isMe: false },
      { id: 'm6', sender: 'Me', text: 'Averaging about 25 signatures an hour. Need a refill on ballot summaries soon.', time: '09:20 AM', isMe: true },
      { id: 'm7', sender: 'Sarah Jenkins', text: 'Clipboards and voter sheets are in the team van.', time: '09:30 AM', isMe: false }
    ],
    3: [
      { id: 'm8', sender: 'Mike Kowalski', text: 'Did you see the announcement regarding the Westside Mall relocation?', time: 'Yesterday', isMe: false },
      { id: 'm9', sender: 'Me', text: 'Yes, setting up by North entrance now.', time: 'Yesterday', isMe: true },
      { id: 'm10', sender: 'Mike Kowalski', text: 'Got the update regarding the mall entrance.', time: 'Yesterday', isMe: false }
    ],
    4: [
      { id: 'm11', sender: 'Validation Audit Support', text: 'Batch #8092 has cleared initial review.', time: 'Yesterday', isMe: false }
    ]
  });

  // ----------------------------------------------------
  // 3.5 SMS AND EMAIL COMPOSITION UI STATE
  // ----------------------------------------------------
  const [dispatchType, setDispatchType] = useState('sms'); // 'sms' | 'email' | 'chat_broadcast'
  const [dispatchForm, setDispatchForm] = useState({
    recipientGroup: 'All Active Circulators (84)',
    subject: '',
    message: '',
    senderId: 'iCanvass PDM Official'
  });
  const [dispatchValidationErr, setDispatchValidationErr] = useState('');

  // ----------------------------------------------------
  // 3.6 MANAGEMENT AUTHORIZATION STATE
  // ----------------------------------------------------
  const [teamMembers, setTeamMembers] = useState([
    { id: 'TM-101', name: 'Sarah Jenkins', email: 's.jenkins@icanvass.io', role: 'Coordinator', status: 'Active', canPost: true, department: 'Field Operations' },
    { id: 'TM-102', name: 'Marcus Sterling', email: 'm.sterling@icanvass.io', role: 'Management', status: 'Active', canPost: true, department: 'Campaign Management' },
    { id: 'TM-103', name: 'Mike Kowalski', email: 'm.kowalski@icanvass.io', role: 'Sub Coordinator', status: 'Active', canPost: true, department: 'Westside Logistics' },
    { id: 'TM-104', name: 'Emma Wilson', email: 'e.wilson@icanvass.io', role: 'Circulator (Gatherer)', status: 'Active', canPost: false, department: 'Field Staff' },
    { id: 'TM-105', name: 'David Ross', email: 'd.ross@icanvass.io', role: 'Circulator (Gatherer)', status: 'Active', canPost: false, department: 'Field Staff' },
    { id: 'TM-106', name: 'Tanya Vance', email: 't.vance@icanvass.io', role: 'Validation Specialist', status: 'Active', canPost: true, department: 'Compliance Desk' }
  ]);
  const [authSearch, setAuthSearch] = useState('');
  const [confirmAuthModal, setConfirmAuthModal] = useState(null); // { member, nextState }

  // ----------------------------------------------------
  // HANDLERS
  // ----------------------------------------------------

  // Open announcement for editing
  const handleEditAnnouncement = (ann) => {
    setEditingAnnouncementId(ann.id);
    setNewAnnouncement({
      title: ann.title,
      category: ann.category,
      recipients: ann.recipients,
      content: ann.content,
      isPinned: ann.isPinned,
      attachment: ann.attachment,
      attachmentName: ann.attachmentName || ''
    });
    setAnnouncementPreviewMode(false);
    setIsCreateAnnouncementOpen(true);
  };

  // Handle image attachment for announcement
  const handleAnnouncementImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        addToast({ title: 'File Too Large', message: 'Please select an image smaller than 5MB.', type: 'warning' });
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        setNewAnnouncement((prev) => ({
          ...prev,
          attachment: event.target?.result,
          attachmentName: file.name
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Save Announcement Draft
  const handleSaveDraftAnnouncement = () => {
    if (!newAnnouncement.title.trim()) {
      addToast({ title: 'Validation Error', message: 'Announcement title is required to save a draft.', type: 'error' });
      return;
    }

    if (editingAnnouncementId) {
      setAnnouncements((prev) =>
        prev.map((a) =>
          a.id === editingAnnouncementId
            ? {
                ...a,
                title: newAnnouncement.title.trim(),
                category: newAnnouncement.category,
                isPinned: newAnnouncement.isPinned,
                content: newAnnouncement.content.trim(),
                recipients: newAnnouncement.recipients,
                attachment: newAnnouncement.attachment,
                attachmentName: newAnnouncement.attachmentName,
                status: 'Draft'
              }
            : a
        )
      );
    } else {
      const draft = {
        id: Date.now(),
        title: newAnnouncement.title.trim(),
        category: newAnnouncement.category,
        isPinned: newAnnouncement.isPinned,
        sender: `${crmUser?.name || 'Authorized Member'} (${crmUser?.role ? crmUser.role.toUpperCase() : 'Management'})`,
        senderRole: 'Management',
        date: 'Draft',
        readTime: 'Draft',
        content: newAnnouncement.content.trim() || 'Draft in progress...',
        recipients: newAnnouncement.recipients,
        attachment: newAnnouncement.attachment,
        attachmentName: newAnnouncement.attachmentName,
        status: 'Draft'
      };
      setAnnouncements([draft, ...announcements]);
    }

    setIsCreateAnnouncementOpen(false);
    setEditingAnnouncementId(null);
    setAnnouncementPreviewMode(false);
    setNewAnnouncement({
      title: '',
      category: 'general',
      recipients: 'Entire Team',
      content: '',
      isPinned: false,
      attachment: null,
      attachmentName: ''
    });

    addToast({
      title: 'Draft Saved',
      message: 'Announcement has been saved as draft.',
      type: 'info'
    });
  };

  // Create or Update Announcement
  const handlePublishAnnouncement = (e) => {
    e.preventDefault();
    if (!newAnnouncement.title.trim() || !newAnnouncement.content.trim()) {
      addToast({ title: 'Validation Error', message: 'Announcement title and message body are required.', type: 'error' });
      return;
    }

    if (editingAnnouncementId) {
      setAnnouncements((prev) =>
        prev.map((a) =>
          a.id === editingAnnouncementId
            ? {
                ...a,
                title: newAnnouncement.title.trim(),
                category: newAnnouncement.category,
                isPinned: newAnnouncement.isPinned,
                content: newAnnouncement.content.trim(),
                recipients: newAnnouncement.recipients,
                attachment: newAnnouncement.attachment,
                attachmentName: newAnnouncement.attachmentName,
                status: 'Published'
              }
            : a
        )
      );
      addToast({
        title: 'Announcement Updated',
        message: 'Existing announcement changes have been published.',
        type: 'success'
      });
    } else {
      const created = {
        id: Date.now(),
        title: newAnnouncement.title.trim(),
        category: newAnnouncement.category,
        isPinned: newAnnouncement.isPinned,
        sender: `${crmUser?.name || 'Authorized Member'} (${crmUser?.role ? crmUser.role.toUpperCase() : 'Management'})`,
        senderRole: 'Management',
        date: 'Just now',
        readTime: '1 min read',
        content: newAnnouncement.content.trim(),
        recipients: newAnnouncement.recipients,
        attachment: newAnnouncement.attachment,
        attachmentName: newAnnouncement.attachmentName,
        status: 'Published'
      };

      setAnnouncements([created, ...announcements]);
      addToast({
        title: 'Announcement Published',
        message: 'New bulletin announcement has been posted to the board.',
        type: 'success'
      });
    }

    setIsCreateAnnouncementOpen(false);
    setEditingAnnouncementId(null);
    setAnnouncementPreviewMode(false);
    setNewAnnouncement({
      title: '',
      category: 'general',
      recipients: 'Entire Team',
      content: '',
      isPinned: false,
      attachment: null,
      attachmentName: ''
    });
  };

  // Image upload preview (safe frontend only)
  const handleImageFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        addToast({ title: 'File Too Large', message: 'Please select an image smaller than 5MB.', type: 'warning' });
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadFormData((prev) => ({
          ...prev,
          previewUrl: event.target?.result,
          fileName: file.name
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveImageToGallery = (e) => {
    e.preventDefault();
    if (!uploadFormData.previewUrl) {
      addToast({ title: 'Image Required', message: 'Please choose an image file to upload.', type: 'error' });
      return;
    }

    const newImg = {
      id: Date.now(),
      title: uploadFormData.caption || uploadFormData.fileName || 'Shared Campaign Media',
      caption: uploadFormData.caption || 'Field uploaded image resource.',
      url: uploadFormData.previewUrl,
      uploader: `${crmUser?.name || 'Authorized Staff'}`,
      date: 'Just now',
      category: uploadFormData.category,
      size: 'Local Preview'
    };

    setGalleryImages([newImg, ...galleryImages]);
    setIsUploadImageOpen(false);
    setUploadFormData({ caption: '', category: 'Field Territory', previewUrl: '', fileName: '' });
    addToast({
      title: 'Image Added to Gallery',
      message: 'Image preview is now viewable in the shared gallery.',
      type: 'success'
    });
  };

  const handleDeleteImage = (imgId) => {
    setGalleryImages(galleryImages.filter((img) => img.id !== imgId));
    if (selectedImage?.id === imgId) setSelectedImage(null);
    addToast({ title: 'Image Removed', message: 'Image was removed from the local gallery view.', type: 'info' });
  };

  // Chat message send
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const newMsg = {
      id: `msg-${Date.now()}`,
      sender: 'Me',
      text: chatInput.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true
    };

    setChatConversations((prev) => ({
      ...prev,
      [activeContactId]: [...(prev[activeContactId] || []), newMsg]
    }));

    setChatInput('');
    addToast({
      title: 'Message Staged',
      message: 'Message added to current conversation session.',
      type: 'info'
    });
  };

  // Dispatch SMS / Email
  const handleDispatchSubmit = (e) => {
    e.preventDefault();
    setDispatchValidationErr('');

    if (dispatchType === 'email' && !dispatchForm.subject.trim()) {
      setDispatchValidationErr('Email subject is required.');
      return;
    }
    if (!dispatchForm.message.trim()) {
      setDispatchValidationErr('Message body cannot be empty.');
      return;
    }

    addToast({
      title: 'Dispatch Staged (UI Phase)',
      message: `Your ${dispatchType.toUpperCase()} composition has been prepared. Backend carrier delivery will connect in production phase.`,
      type: 'info'
    });

    setDispatchForm({
      recipientGroup: 'All Active Circulators (84)',
      subject: '',
      message: '',
      senderId: 'iCanvass PDM Official'
    });
  };

  // Toggle Member Authorization
  const handleConfirmAuthChange = () => {
    if (!confirmAuthModal) return;
    const { member, nextState } = confirmAuthModal;

    setTeamMembers(
      teamMembers.map((m) => (m.id === member.id ? { ...m, canPost: nextState } : m))
    );

    addToast({
      title: nextState ? 'Posting Access Granted' : 'Posting Access Revoked',
      message: `${member.name} has been set to ${nextState ? 'Authorized Poster' : 'Read-Only Member'}.`,
      type: 'info'
    });
    setConfirmAuthModal(null);
  };

  // Filtered lists
  const filteredAnnouncements = announcements.filter((a) => {
    if (bulletinFilter === 'pinned' && !a.isPinned) return false;
    if (bulletinFilter === 'alerts' && a.category !== 'alert') return false;
    if (bulletinFilter === 'general' && a.category !== 'general') return false;
    if (bulletinSearch.trim()) {
      const q = bulletinSearch.toLowerCase();
      return a.title.toLowerCase().includes(q) || a.content.toLowerCase().includes(q) || a.sender.toLowerCase().includes(q);
    }
    return true;
  });

  const filteredGallery = galleryImages.filter((img) => {
    if (!gallerySearch.trim()) return true;
    const q = gallerySearch.toLowerCase();
    return img.title.toLowerCase().includes(q) || img.caption.toLowerCase().includes(q) || img.category.toLowerCase().includes(q);
  });

  const activeChatMessages = chatConversations[activeContactId] || [];
  const currentContact = contacts.find((c) => c.id === activeContactId) || contacts[0];

  return (
    <div className="h-full flex flex-col overflow-hidden" style={{ backgroundColor: 'var(--background)', color: 'var(--text-primary)' }}>
      {/* ---------------------------------------------------- */}
      {/* TOP HEADER & NAVIGATION */}
      {/* ---------------------------------------------------- */}
      <div className="p-4 sm:p-6 shrink-0" style={{ backgroundColor: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl shadow-sm" style={{ backgroundColor: 'var(--info-light)', color: 'var(--info)' }}>
                <MessageSquare className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-extrabold flex items-center gap-2 m-0" style={{ color: 'var(--text-primary)' }}>
                  MyCanvass Message Board Portal
                </h1>
                <p className="mt-0.5 text-xs sm:text-sm m-0" style={{ color: 'var(--text-secondary)' }}>
                  Campaign announcements, shared field media, direct team chat, and member authorization controls.
                </p>
              </div>
            </div>
          </div>

          {/* Role Status Indicator & Simulation Switcher */}
          <div className="flex flex-wrap items-center gap-2">
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold border"
              style={{
                backgroundColor: isAuthorizedPoster ? 'var(--success-light)' : 'var(--warning-light)',
                borderColor: isAuthorizedPoster ? 'var(--success-border)' : 'var(--warning-border)',
                color: isAuthorizedPoster ? 'var(--success)' : 'var(--warning)'
              }}
            >
              {isAuthorizedPoster ? <ShieldCheck className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
              <span>{isAuthorizedPoster ? 'Authorized Poster' : 'Read-Only Member'}</span>
            </div>

            <button
              onClick={() => setIsAuthorizedPoster(!isAuthorizedPoster)}
              className="text-xs px-2.5 py-1.5 rounded-lg border transition-colors cursor-pointer"
              style={{
                backgroundColor: 'var(--surface-secondary)',
                borderColor: 'var(--border)',
                color: 'var(--text-secondary)'
              }}
              title="Toggle to preview member vs manager posting permissions"
            >
              Simulate: {isAuthorizedPoster ? 'Switch to Read-Only' : 'Switch to Authorized'}
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 mt-4 pt-4 overflow-x-auto" style={{ borderTop: '1px solid var(--border)' }}>
          {[
            { id: 'bulletin', label: 'Bulletin Board', icon: Bell, count: announcements.length },
            { id: 'gallery', label: 'Shared Images & Media', icon: ImageIcon, count: galleryImages.length },
            { id: 'chat', label: 'Direct & Group Chat', icon: MessageSquare, count: contacts.reduce((acc, c) => acc + c.unread, 0) },
            { id: 'dispatch', label: 'SMS & Email Composer', icon: Send, badge: 'Management' },
            { id: 'auth', label: 'Posting Authorization', icon: Shield, badge: 'Admin' }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer border"
                style={{
                  backgroundColor: isActive ? 'var(--primary)' : 'var(--surface-secondary)',
                  color: isActive ? 'var(--text-on-primary)' : 'var(--text-secondary)',
                  borderColor: isActive ? 'var(--primary)' : 'var(--border)'
                }}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.count !== undefined && tab.count > 0 && (
                  <span
                    className="px-1.5 py-0.2 rounded-full text-[10px] font-bold"
                    style={{
                      backgroundColor: isActive ? 'rgba(255,255,255,0.25)' : 'var(--border)',
                      color: isActive ? '#fff' : 'var(--text-secondary)'
                    }}
                  >
                    {tab.count}
                  </span>
                )}
                {tab.badge && (
                  <span
                    className="px-1.5 py-0.5 rounded text-[9px] uppercase font-bold tracking-wider"
                    style={{
                      backgroundColor: isActive ? 'rgba(255,255,255,0.2)' : 'var(--info-light)',
                      color: isActive ? '#fff' : 'var(--info)'
                    }}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ---------------------------------------------------- */}
      {/* TAB 1: BULLETIN BOARD */}
      {/* ---------------------------------------------------- */}
      {activeTab === 'bulletin' && (
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="max-w-6xl mx-auto space-y-6">
            {/* Top Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2">
                {[
                  { id: 'all', label: 'All Updates' },
                  { id: 'pinned', label: 'Pinned Only' },
                  { id: 'alerts', label: 'Urgent Alerts' },
                  { id: 'general', label: 'General' }
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setBulletinFilter(f.id)}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer border"
                    style={{
                      backgroundColor: bulletinFilter === f.id ? 'var(--info-light)' : 'var(--surface)',
                      color: bulletinFilter === f.id ? 'var(--info)' : 'var(--text-secondary)',
                      borderColor: bulletinFilter === f.id ? 'var(--info-border)' : 'var(--border)'
                    }}
                  >
                    {f.label}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <div className="relative flex-1 sm:w-64">
                  <Search className="w-4 h-4 absolute text-tertiary" style={{ left: 12, top: '50%', transform: 'translateY(-50%)' }} />
                  <input
                    type="text"
                    value={bulletinSearch}
                    onChange={(e) => setBulletinSearch(e.target.value)}
                    placeholder="Search announcements..."
                    className="w-full text-xs rounded-xl py-2 pl-9 pr-3 focus:outline-none"
                    style={{
                      backgroundColor: 'var(--surface)',
                      color: 'var(--text-primary)',
                      border: '1px solid var(--border)'
                    }}
                  />
                </div>

                {isAuthorizedPoster ? (
                  <button
                    onClick={() => setIsCreateAnnouncementOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer border-none"
                    style={{ backgroundColor: 'var(--info)', color: 'var(--text-on-primary)' }}
                  >
                    <Plus className="w-4 h-4" /> Post Announcement
                  </button>
                ) : (
                  <div className="text-xs px-3 py-1.5 rounded-lg border text-secondary flex items-center gap-1.5" style={{ backgroundColor: 'var(--surface-secondary)' }}>
                    <Lock className="w-3.5 h-3.5 text-secondary" /> Read-Only Access
                  </div>
                )}
              </div>
            </div>

            {/* Read-Only Banner when unauthorized */}
            {!isAuthorizedPoster && (
              <div
                className="p-3.5 rounded-xl border flex items-center gap-3"
                style={{ backgroundColor: 'var(--surface-secondary)', borderColor: 'var(--border)' }}
              >
                <Info className="w-4 h-4 text-info shrink-0" />
                <p className="text-xs m-0" style={{ color: 'var(--text-secondary)' }}>
                  <strong>Circulator / Team Member Mode:</strong> You are viewing campaign announcements published by authorized field leaders. Posting new bulletins requires coordinator authorization.
                </p>
              </div>
            )}

            {/* Announcements List */}
            {filteredAnnouncements.length === 0 ? (
              <div className="text-center py-16 rounded-2xl border" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
                <Bell className="w-12 h-12 mx-auto mb-3 opacity-25" style={{ color: 'var(--text-tertiary)' }} />
                <h3 className="text-base font-bold m-0" style={{ color: 'var(--text-primary)' }}>No announcements found</h3>
                <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>There are no messages matching your active filter criteria.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {filteredAnnouncements.map((ann) => (
                  <div
                    key={ann.id}
                    onClick={() => setSelectedAnnouncement(ann)}
                    className="rounded-2xl p-5 border transition-all cursor-pointer shadow-sm hover:shadow-md"
                    style={{
                      backgroundColor: 'var(--surface)',
                      borderColor: ann.isPinned ? 'var(--info-border)' : 'var(--border)'
                    }}
                  >
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div className="flex flex-wrap items-center gap-2">
                        {ann.isPinned && (
                          <span
                            className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider"
                            style={{ backgroundColor: 'var(--info-light)', color: 'var(--info)' }}
                          >
                            <Pin className="w-3 h-3" /> Pinned
                          </span>
                        )}
                        <span
                          className="px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider"
                          style={{
                            backgroundColor: ann.category === 'alert' ? 'var(--error-light)' : 'var(--surface-secondary)',
                            color: ann.category === 'alert' ? 'var(--error)' : 'var(--text-secondary)'
                          }}
                        >
                          {ann.category === 'alert' ? 'Urgent Alert' : 'Campaign Notice'}
                        </span>
                        <span className="text-xs text-secondary">• {ann.readTime}</span>
                      </div>
                      <span className="text-xs text-tertiary shrink-0">{ann.date}</span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold mb-2 m-0" style={{ color: 'var(--text-primary)' }}>
                      {ann.title}
                    </h3>

                    <p className="text-xs sm:text-sm line-clamp-2 leading-relaxed mb-4 m-0" style={{ color: 'var(--text-secondary)' }}>
                      {ann.content}
                    </p>

                    <div className="flex items-center justify-between pt-3" style={{ borderTop: '1px solid var(--border)' }}>
                      <div className="flex items-center gap-2">
                        <div
                          className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold"
                          style={{ backgroundColor: 'var(--surface-secondary)', color: 'var(--text-primary)', border: '1px solid var(--border)' }}
                        >
                          {ann.sender.charAt(0)}
                        </div>
                        <span className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>{ann.sender}</span>
                        <span className="text-xs text-tertiary">| To: {ann.recipients}</span>
                      </div>

                      <span className="text-xs font-semibold flex items-center gap-1" style={{ color: 'var(--info)' }}>
                        Read full update <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* TAB 2: SHARED IMAGES & MEDIA GALLERY */}
      {/* ---------------------------------------------------- */}
      {activeTab === 'gallery' && (
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="max-w-6xl mx-auto space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold m-0" style={{ color: 'var(--text-primary)' }}>Shared Campaign Media Gallery</h2>
                <p className="text-xs mt-0.5 m-0" style={{ color: 'var(--text-secondary)' }}>
                  Territory maps, approved petition layouts, staging photos, and field resources.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="w-4 h-4 absolute text-tertiary" style={{ left: 12, top: '50%', transform: 'translateY(-50%)' }} />
                  <input
                    type="text"
                    value={gallerySearch}
                    onChange={(e) => setGallerySearch(e.target.value)}
                    placeholder="Search images..."
                    className="text-xs rounded-xl py-2 pl-9 pr-3 focus:outline-none"
                    style={{ backgroundColor: 'var(--surface)', color: 'var(--text-primary)', border: '1px solid var(--border)' }}
                  />
                </div>

                {isAuthorizedPoster ? (
                  <button
                    onClick={() => setIsUploadImageOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer border-none"
                    style={{ backgroundColor: 'var(--info)', color: 'var(--text-on-primary)' }}
                  >
                    <UploadCloud className="w-4 h-4" /> Upload Image
                  </button>
                ) : (
                  <div className="text-xs px-3 py-1.5 rounded-lg border text-secondary flex items-center gap-1.5" style={{ backgroundColor: 'var(--surface-secondary)' }}>
                    <Lock className="w-3.5 h-3.5 text-secondary" /> Gallery Read-Only
                  </div>
                )}
              </div>
            </div>

            {filteredGallery.length === 0 ? (
              <div className="text-center py-16 rounded-2xl border" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
                <ImageIcon className="w-12 h-12 mx-auto mb-3 opacity-25" style={{ color: 'var(--text-tertiary)' }} />
                <h3 className="text-base font-bold m-0" style={{ color: 'var(--text-primary)' }}>No images found</h3>
                <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>Try adjusting your search query or upload a new photo.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredGallery.map((img) => (
                  <div
                    key={img.id}
                    className="rounded-2xl overflow-hidden border transition-all flex flex-col shadow-sm hover:shadow-md"
                    style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}
                  >
                    <div
                      className="relative h-48 w-full overflow-hidden cursor-pointer group"
                      style={{ backgroundColor: 'var(--surface-secondary)' }}
                      onClick={() => setSelectedImage(img)}
                    >
                      <img
                        src={img.url}
                        alt={img.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <span className="px-3 py-1.5 rounded-lg text-xs font-bold bg-white text-slate-900 flex items-center gap-1.5 shadow-lg">
                          <Eye className="w-3.5 h-3.5" /> View Photo
                        </span>
                      </div>
                      <span
                        className="absolute top-3 left-3 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider backdrop-blur-md"
                        style={{ backgroundColor: 'rgba(0,0,0,0.6)', color: '#fff' }}
                      >
                        {img.category}
                      </span>
                    </div>

                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="font-bold text-sm mb-1 m-0" style={{ color: 'var(--text-primary)' }}>{img.title}</h4>
                        <p className="text-xs line-clamp-2 mb-3 m-0" style={{ color: 'var(--text-secondary)' }}>{img.caption}</p>
                      </div>

                      <div className="pt-3 flex items-center justify-between text-[11px]" style={{ borderTop: '1px solid var(--border)', color: 'var(--text-tertiary)' }}>
                        <div>
                          <span>By {img.uploader}</span>
                          <span className="block text-[10px]">{img.date}</span>
                        </div>

                        {isAuthorizedPoster && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteImage(img.id);
                            }}
                            className="p-1.5 rounded-lg hover:bg-red-500/10 text-rose-500 transition-colors cursor-pointer border-none bg-transparent"
                            title="Remove from gallery"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* TAB 3: CHAT INTERFACE */}
      {/* ---------------------------------------------------- */}
      {activeTab === 'chat' && (
        <div className="flex-1 flex overflow-hidden relative">
          {/* Chat Contacts Sidebar */}
          <div
            className={`flex flex-col w-full sm:w-80 border-r flex-shrink-0 transition-transform sm:translate-x-0 ${
              isMobileChatOpen ? '-translate-x-full absolute inset-0 z-10' : 'relative translate-x-0'
            }`}
            style={{ backgroundColor: 'var(--surface-secondary)', borderColor: 'var(--border)' }}
          >
            <div className="p-4 border-b" style={{ borderColor: 'var(--border)' }}>
              <div className="relative">
                <Search className="w-4 h-4 absolute text-tertiary" style={{ left: 12, top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="text"
                  value={chatSearch}
                  onChange={(e) => setChatSearch(e.target.value)}
                  placeholder="Search contacts..."
                  className="w-full text-xs rounded-xl py-2 pl-9 pr-3 focus:outline-none"
                  style={{ backgroundColor: 'var(--surface)', color: 'var(--text-primary)', border: '1px solid var(--border)' }}
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {contacts
                .filter((c) => c.name.toLowerCase().includes(chatSearch.toLowerCase()) || c.role.toLowerCase().includes(chatSearch.toLowerCase()))
                .map((contact) => {
                  const isActive = activeContactId === contact.id;
                  return (
                    <div
                      key={contact.id}
                      onClick={() => {
                        setActiveContactId(contact.id);
                        setIsMobileChatOpen(true);
                      }}
                      className="p-3.5 border-b cursor-pointer transition-colors flex items-center gap-3"
                      style={{
                        borderColor: 'var(--border)',
                        backgroundColor: isActive ? 'var(--info-light)' : 'transparent',
                        borderLeft: isActive ? '3px solid var(--info)' : '3px solid transparent'
                      }}
                    >
                      <div className="relative">
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs"
                          style={{ backgroundColor: 'var(--surface)', color: 'var(--text-primary)', border: '1px solid var(--border)' }}
                        >
                          {contact.avatar}
                        </div>
                        {contact.online && (
                          <span
                            className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2"
                            style={{ backgroundColor: 'var(--success)', borderColor: 'var(--surface)' }}
                          />
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-baseline mb-0.5">
                          <h4 className="text-xs font-bold truncate m-0" style={{ color: 'var(--text-primary)' }}>{contact.name}</h4>
                          <span className="text-[10px]" style={{ color: 'var(--text-tertiary)' }}>{contact.time}</span>
                        </div>
                        <p className="text-[11px] truncate m-0" style={{ color: 'var(--text-secondary)' }}>{contact.lastMsg}</p>
                      </div>

                      {contact.unread > 0 && (
                        <span
                          className="w-4 h-4 rounded-full text-[10px] font-bold flex items-center justify-center"
                          style={{ backgroundColor: 'var(--info)', color: '#fff' }}
                        >
                          {contact.unread}
                        </span>
                      )}
                    </div>
                  );
                })}
            </div>
          </div>

          {/* Active Conversation Panel */}
          <div
            className={`flex-1 flex flex-col h-full w-full absolute inset-0 sm:relative sm:inset-auto transition-transform ${
              isMobileChatOpen ? 'translate-x-0 z-20' : 'translate-x-full sm:translate-x-0'
            }`}
            style={{ backgroundColor: 'var(--background)' }}
          >
            {/* Header */}
            <div
              className="h-16 flex items-center justify-between px-4 sm:px-6 border-b shrink-0"
              style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}
            >
              <div className="flex items-center gap-3">
                <button
                  className="sm:hidden p-2 -ml-2 rounded-lg cursor-pointer border-none bg-transparent"
                  style={{ color: 'var(--text-secondary)' }}
                  onClick={() => setIsMobileChatOpen(false)}
                >
                  &larr; Back
                </button>
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs"
                  style={{ backgroundColor: 'var(--info)', color: 'var(--text-on-primary)' }}
                >
                  {currentContact.avatar}
                </div>
                <div>
                  <h3 className="text-sm font-bold m-0" style={{ color: 'var(--text-primary)' }}>{currentContact.name}</h3>
                  <p className="text-[11px] m-0" style={{ color: currentContact.online ? 'var(--success)' : 'var(--text-tertiary)' }}>
                    {currentContact.online ? '● Online & Active in Territory' : 'Offline'}
                  </p>
                </div>
              </div>

              <span className="text-xs px-2.5 py-1 rounded-md border" style={{ backgroundColor: 'var(--surface-secondary)', borderColor: 'var(--border)', color: 'var(--text-secondary)' }}>
                {currentContact.role}
              </span>
            </div>

            {/* Message History */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
              <div className="text-center text-[11px] my-2" style={{ color: 'var(--text-tertiary)' }}>
                <span>End-to-end encrypted team session • Today</span>
              </div>

              {activeChatMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col max-w-[85%] sm:max-w-[70%] ${msg.isMe ? 'ml-auto items-end' : 'mr-auto items-start'}`}
                >
                  {!msg.isMe && (
                    <span className="text-[10px] mb-1 ml-1" style={{ color: 'var(--text-tertiary)' }}>
                      {msg.sender}
                    </span>
                  )}
                  <div
                    className={`px-4 py-2.5 rounded-2xl ${msg.isMe ? 'rounded-br-sm' : 'rounded-bl-sm'}`}
                    style={{
                      backgroundColor: msg.isMe ? 'var(--info)' : 'var(--surface)',
                      color: msg.isMe ? 'var(--text-on-primary)' : 'var(--text-primary)',
                      border: msg.isMe ? 'none' : '1px solid var(--border)'
                    }}
                  >
                    <p className="text-xs sm:text-sm m-0 leading-relaxed">{msg.text}</p>
                  </div>
                  <span className="text-[10px] mt-1 mx-1" style={{ color: 'var(--text-tertiary)' }}>
                    {msg.time}
                  </span>
                </div>
              ))}
            </div>

            {/* Input Composer */}
            <div className="p-3 sm:p-4 border-t shrink-0" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
              <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder={`Reply to ${currentContact.name}...`}
                  className="flex-1 text-xs sm:text-sm rounded-xl px-4 py-2.5 focus:outline-none"
                  style={{
                    backgroundColor: 'var(--surface-secondary)',
                    color: 'var(--text-primary)',
                    border: '1px solid var(--border)'
                  }}
                />
                <button
                  type="submit"
                  disabled={!chatInput.trim()}
                  className="px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-sm transition-all cursor-pointer border-none disabled:opacity-50"
                  style={{ backgroundColor: 'var(--info)', color: 'var(--text-on-primary)' }}
                >
                  <Send className="w-4 h-4" />
                  <span className="hidden sm:inline">Send</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* TAB 4: SMS & EMAIL COMPOSITION UI */}
      {/* ---------------------------------------------------- */}
      {activeTab === 'dispatch' && (
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="p-5 rounded-2xl border" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
              <div className="flex items-center justify-between gap-4 mb-4 pb-4 border-b" style={{ borderColor: 'var(--border)' }}>
                <div>
                  <h2 className="text-lg font-bold m-0" style={{ color: 'var(--text-primary)' }}>Broadcast Dispatch Hub</h2>
                  <p className="text-xs mt-0.5 m-0" style={{ color: 'var(--text-secondary)' }}>
                    Compose SMS broadcasts, direct field emails, or mass urgent push notifications.
                  </p>
                </div>
                <span className="px-2.5 py-1 rounded-md text-[10px] uppercase font-bold tracking-wider" style={{ backgroundColor: 'var(--info-light)', color: 'var(--info)' }}>
                  Management Interface
                </span>
              </div>

              {/* Channel Selector */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold mb-2 uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
                    Communication Channel
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: 'sms', label: 'SMS Text Message', icon: Smartphone, desc: 'Real-time phone alert' },
                      { id: 'email', label: 'Email Newsletter', icon: Mail, desc: 'Rich briefing copy' },
                      { id: 'chat_broadcast', label: 'Chat Broadcast', icon: MessageSquare, desc: 'In-app team ping' }
                    ].map((chan) => {
                      const Icon = chan.icon;
                      const isSel = dispatchType === chan.id;
                      return (
                        <div
                          key={chan.id}
                          onClick={() => setDispatchType(chan.id)}
                          className="p-3 rounded-xl border cursor-pointer transition-all"
                          style={{
                            backgroundColor: isSel ? 'var(--info-light)' : 'var(--surface-secondary)',
                            borderColor: isSel ? 'var(--info)' : 'var(--border)'
                          }}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <Icon className="w-4 h-4" style={{ color: isSel ? 'var(--info)' : 'var(--text-secondary)' }} />
                            <span className="text-xs font-bold" style={{ color: isSel ? 'var(--info)' : 'var(--text-primary)' }}>{chan.label}</span>
                          </div>
                          <p className="text-[10px] m-0" style={{ color: 'var(--text-tertiary)' }}>{chan.desc}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Form Inputs */}
                <form onSubmit={handleDispatchSubmit} className="space-y-4 pt-2">
                  <div>
                    <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--text-secondary)' }}>Recipient Cohort</label>
                    <select
                      value={dispatchForm.recipientGroup}
                      onChange={(e) => setDispatchForm({ ...dispatchForm, recipientGroup: e.target.value })}
                      className="w-full text-xs rounded-xl px-3 py-2.5 focus:outline-none"
                      style={{ backgroundColor: 'var(--surface-secondary)', color: 'var(--text-primary)', border: '1px solid var(--border)' }}
                    >
                      <option value="All Active Circulators (84)">All Active Circulators (84 members)</option>
                      <option value="District 4 Gathering Team (18)">District 4 Gathering Team (18 members)</option>
                      <option value="Westside Mall Relocation Group (12)">Westside Mall Relocation Group (12 members)</option>
                      <option value="Field Coordinators & Managers (6)">Field Coordinators & Managers (6 members)</option>
                    </select>
                  </div>

                  {dispatchType === 'email' && (
                    <div>
                      <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--text-secondary)' }}>Subject Line</label>
                      <input
                        type="text"
                        value={dispatchForm.subject}
                        onChange={(e) => setDispatchForm({ ...dispatchForm, subject: e.target.value })}
                        placeholder="e.g. Critical Update: Shift Protocol & Weather Precautions"
                        className="w-full text-xs rounded-xl px-3 py-2.5 focus:outline-none"
                        style={{ backgroundColor: 'var(--surface-secondary)', color: 'var(--text-primary)', border: '1px solid var(--border)' }}
                      />
                    </div>
                  )}

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>Message Body</label>
                      {dispatchType === 'sms' && (
                        <span
                          className="text-[10px] font-mono"
                          style={{
                            color: dispatchForm.message.length > 160 ? 'var(--warning)' : 'var(--text-tertiary)'
                          }}
                        >
                          {dispatchForm.message.length}/160 chars ({Math.ceil(dispatchForm.message.length / 160) || 1} SMS segment)
                        </span>
                      )}
                    </div>
                    <textarea
                      rows={5}
                      value={dispatchForm.message}
                      onChange={(e) => setDispatchForm({ ...dispatchForm, message: e.target.value })}
                      placeholder={
                        dispatchType === 'sms'
                          ? 'Enter concise SMS text alert (under 160 characters recommended)...'
                          : 'Write the complete email bulletin body for the team...'
                      }
                      className="w-full text-xs rounded-xl p-3 focus:outline-none"
                      style={{ backgroundColor: 'var(--surface-secondary)', color: 'var(--text-primary)', border: '1px solid var(--border)' }}
                    />
                  </div>

                  {dispatchValidationErr && (
                    <div className="p-2.5 rounded-lg text-xs bg-red-500/10 border border-red-500/20 text-rose-500 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4" /> {dispatchValidationErr}
                    </div>
                  )}

                  <div className="p-3 rounded-xl border flex items-start gap-2.5" style={{ backgroundColor: 'var(--surface-secondary)', borderColor: 'var(--border)' }}>
                    <Info className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                    <p className="text-[11px] m-0" style={{ color: 'var(--text-secondary)' }}>
                      <strong>Frontend Staging Mode:</strong> Message will be queued and validated in the client interface. No external SMS carrier fees or email servers are invoked during UI phase.
                    </p>
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setDispatchForm({ recipientGroup: 'All Active Circulators (84)', subject: '', message: '', senderId: 'iCanvass PDM Official' })}
                      className="px-4 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer border"
                      style={{ backgroundColor: 'transparent', borderColor: 'var(--border)', color: 'var(--text-secondary)' }}
                    >
                      Clear Draft
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer border-none flex items-center gap-2"
                      style={{ backgroundColor: 'var(--info)', color: 'var(--text-on-primary)' }}
                    >
                      <Send className="w-4 h-4" /> Dispatch {dispatchType.toUpperCase()}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* TAB 5: POSTING AUTHORIZATION UI */}
      {/* ---------------------------------------------------- */}
      {activeTab === 'auth' && (
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="max-w-5xl mx-auto space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold m-0" style={{ color: 'var(--text-primary)' }}>Management Authorization Desk</h2>
                <p className="text-xs mt-0.5 m-0" style={{ color: 'var(--text-secondary)' }}>
                  Control which team members have publishing rights to post broadcasts on the Message Board.
                </p>
              </div>

              <div className="relative">
                <Search className="w-4 h-4 absolute text-tertiary" style={{ left: 12, top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="text"
                  value={authSearch}
                  onChange={(e) => setAuthSearch(e.target.value)}
                  placeholder="Filter team members..."
                  className="text-xs rounded-xl py-2 pl-9 pr-3 focus:outline-none"
                  style={{ backgroundColor: 'var(--surface)', color: 'var(--text-primary)', border: '1px solid var(--border)' }}
                />
              </div>
            </div>

            {/* Authorization Table */}
            <div className="rounded-2xl border overflow-hidden" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs" style={{ borderCollapse: 'collapse' }}>
                  <thead style={{ backgroundColor: 'var(--surface-secondary)', borderBottom: '1px solid var(--border)' }}>
                    <tr>
                      <th className="p-3.5 font-semibold text-secondary uppercase">Member</th>
                      <th className="p-3.5 font-semibold text-secondary uppercase">Role & Department</th>
                      <th className="p-3.5 font-semibold text-secondary uppercase">Account Status</th>
                      <th className="p-3.5 font-semibold text-secondary uppercase">Board Permissions</th>
                      <th className="p-3.5 font-semibold text-secondary uppercase text-right">Access Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teamMembers
                      .filter((m) => m.name.toLowerCase().includes(authSearch.toLowerCase()) || m.role.toLowerCase().includes(authSearch.toLowerCase()))
                      .map((member) => (
                        <tr key={member.id} style={{ borderBottom: '1px solid var(--border)' }}>
                          <td className="p-3.5">
                            <div className="font-bold" style={{ color: 'var(--text-primary)' }}>{member.name}</div>
                            <div className="text-[11px]" style={{ color: 'var(--text-tertiary)' }}>{member.email}</div>
                          </td>
                          <td className="p-3.5">
                            <span className="font-semibold block" style={{ color: 'var(--text-secondary)' }}>{member.role}</span>
                            <span className="text-[10px]" style={{ color: 'var(--text-tertiary)' }}>{member.department}</span>
                          </td>
                          <td className="p-3.5">
                            <span
                              className="px-2 py-0.5 rounded text-[10px] font-bold uppercase"
                              style={{ backgroundColor: 'var(--success-light)', color: 'var(--success)' }}
                            >
                              {member.status}
                            </span>
                          </td>
                          <td className="p-3.5">
                            <span
                              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border"
                              style={{
                                backgroundColor: member.canPost ? 'var(--info-light)' : 'var(--surface-secondary)',
                                borderColor: member.canPost ? 'var(--info-border)' : 'var(--border)',
                                color: member.canPost ? 'var(--info)' : 'var(--text-tertiary)'
                              }}
                            >
                              {member.canPost ? <ShieldCheck className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
                              {member.canPost ? 'Authorized Poster' : 'Read-Only Member'}
                            </span>
                          </td>
                          <td className="p-3.5 text-right">
                            <button
                              onClick={() => setConfirmAuthModal({ member, nextState: !member.canPost })}
                              className="px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer border"
                              style={{
                                backgroundColor: member.canPost ? 'transparent' : 'var(--info-light)',
                                borderColor: member.canPost ? 'var(--border)' : 'var(--info-border)',
                                color: member.canPost ? 'var(--error)' : 'var(--info)'
                              }}
                            >
                              {member.canPost ? 'Revoke Access' : 'Grant Posting Rights'}
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="p-4 rounded-xl border flex items-start gap-3" style={{ backgroundColor: 'var(--surface-secondary)', borderColor: 'var(--border)' }}>
              <ShieldAlert className="w-4 h-4 text-warning shrink-0 mt-0.5" />
              <p className="text-xs m-0" style={{ color: 'var(--text-secondary)' }}>
                <strong>Access Control Governance:</strong> Circulators default to Read-Only access to ensure petition directives and urgent alerts remain clear. Only appointed field leads and coordinators are authorized to publish announcements.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* MODAL: ANNOUNCEMENT DETAIL VIEW */}
      {/* ---------------------------------------------------- */}
      {selectedAnnouncement && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setSelectedAnnouncement(null)}
        >
          <div
            className="w-full max-w-2xl rounded-2xl p-6 border shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto"
            style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-2">
                <span
                  className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase"
                  style={{
                    backgroundColor: selectedAnnouncement.category === 'alert' ? 'var(--error-light)' : 'var(--info-light)',
                    color: selectedAnnouncement.category === 'alert' ? 'var(--error)' : 'var(--info)'
                  }}
                >
                  {selectedAnnouncement.category === 'alert' ? 'Urgent Alert' : 'Announcement'}
                </span>
                <span className="text-xs text-secondary">• {selectedAnnouncement.date}</span>
              </div>
              <button
                onClick={() => setSelectedAnnouncement(null)}
                className="p-1 rounded-lg hover:bg-slate-500/20 text-secondary border-none bg-transparent cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <h2 className="text-xl font-extrabold m-0" style={{ color: 'var(--text-primary)' }}>
              {selectedAnnouncement.title}
            </h2>

            <div className="text-xs text-secondary py-1" style={{ borderBottom: '1px solid var(--border)' }}>
              Author: <strong>{selectedAnnouncement.sender}</strong> | Target: <strong>{selectedAnnouncement.recipients}</strong>
            </div>

            <p className="text-sm leading-relaxed whitespace-pre-line m-0" style={{ color: 'var(--text-primary)' }}>
              {selectedAnnouncement.content}
            </p>

            {selectedAnnouncement.attachment && (
              <div className="rounded-xl overflow-hidden border mt-4" style={{ borderColor: 'var(--border)' }}>
                <img
                  src={selectedAnnouncement.attachment}
                  alt={selectedAnnouncement.attachmentName || 'Attachment'}
                  className="w-full h-56 object-cover"
                />
                <div className="p-2.5 text-xs flex items-center justify-between" style={{ backgroundColor: 'var(--surface-secondary)' }}>
                  <span className="truncate">{selectedAnnouncement.attachmentName}</span>
                  <span className="text-[10px] text-info font-bold">Image Attachment</span>
                </div>
              </div>
            )}

            <div className="flex justify-between items-center pt-4" style={{ borderTop: '1px solid var(--border)' }}>
              <div>
                {isAuthorizedPoster && (
                  <button
                    onClick={() => {
                      const ann = selectedAnnouncement;
                      setSelectedAnnouncement(null);
                      handleEditAnnouncement(ann);
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer border"
                    style={{ backgroundColor: 'var(--surface)', color: 'var(--info)', borderColor: 'var(--border)' }}
                  >
                    <Edit3 className="w-3.5 h-3.5" /> Edit Announcement
                  </button>
                )}
              </div>
              <button
                onClick={() => setSelectedAnnouncement(null)}
                className="px-5 py-2 rounded-xl text-xs font-bold cursor-pointer"
                style={{ backgroundColor: 'var(--surface-secondary)', color: 'var(--text-primary)', border: '1px solid var(--border)' }}
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* MODAL: CREATE / EDIT ANNOUNCEMENT */}
      {/* ---------------------------------------------------- */}
      {isCreateAnnouncementOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => {
            setIsCreateAnnouncementOpen(false);
            setEditingAnnouncementId(null);
          }}
        >
          <form
            onSubmit={handlePublishAnnouncement}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xl rounded-2xl p-6 border shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto"
            style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
          >
            <div className="flex items-center justify-between pb-3" style={{ borderBottom: '1px solid var(--border)' }}>
              <h2 className="text-lg font-bold m-0 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                {editingAnnouncementId ? (
                  <>
                    <Edit3 className="w-5 h-5 text-info" /> Edit Announcement
                  </>
                ) : (
                  <>
                    <Plus className="w-5 h-5 text-info" /> Create New Announcement
                  </>
                )}
              </h2>
              <button
                type="button"
                onClick={() => {
                  setIsCreateAnnouncementOpen(false);
                  setEditingAnnouncementId(null);
                }}
                className="p-1 rounded-lg text-secondary border-none bg-transparent cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--text-secondary)' }}>Announcement Title *</label>
              <input
                type="text"
                required
                value={newAnnouncement.title}
                onChange={(e) => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })}
                placeholder="e.g. Schedule Update for Saturday Rally"
                className="w-full text-xs rounded-xl px-3 py-2.5 focus:outline-none"
                style={{ backgroundColor: 'var(--surface-secondary)', color: 'var(--text-primary)', border: '1px solid var(--border)' }}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--text-secondary)' }}>Category</label>
                <select
                  value={newAnnouncement.category}
                  onChange={(e) => setNewAnnouncement({ ...newAnnouncement, category: e.target.value })}
                  className="w-full text-xs rounded-xl px-3 py-2.5 focus:outline-none"
                  style={{ backgroundColor: 'var(--surface-secondary)', color: 'var(--text-primary)', border: '1px solid var(--border)' }}
                >
                  <option value="general">General Campaign Notice</option>
                  <option value="alert">Urgent Alert</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--text-secondary)' }}>Recipients</label>
                <select
                  value={newAnnouncement.recipients}
                  onChange={(e) => setNewAnnouncement({ ...newAnnouncement, recipients: e.target.value })}
                  className="w-full text-xs rounded-xl px-3 py-2.5 focus:outline-none"
                  style={{ backgroundColor: 'var(--surface-secondary)', color: 'var(--text-primary)', border: '1px solid var(--border)' }}
                >
                  <option value="Entire Team">Entire Campaign Staff</option>
                  <option value="District 4 Circulators">District 4 Circulators</option>
                  <option value="Westside Field Team">Westside Field Team</option>
                  <option value="Leadership & Coordinators">Leadership & Coordinators</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--text-secondary)' }}>Announcement Content *</label>
              <textarea
                rows={4}
                required
                value={newAnnouncement.content}
                onChange={(e) => setNewAnnouncement({ ...newAnnouncement, content: e.target.value })}
                placeholder="Write message details clearly..."
                className="w-full text-xs rounded-xl p-3 focus:outline-none"
                style={{ backgroundColor: 'var(--surface-secondary)', color: 'var(--text-primary)', border: '1px solid var(--border)' }}
              />
            </div>

            {/* Optional Image Attachment */}
            <div>
              <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--text-secondary)' }}>
                Optional Image Attachment
              </label>
              {newAnnouncement.attachment ? (
                <div className="flex items-center justify-between p-2.5 rounded-xl border" style={{ backgroundColor: 'var(--surface-secondary)', borderColor: 'var(--border)' }}>
                  <div className="flex items-center gap-3">
                    <img src={newAnnouncement.attachment} alt="Preview" className="w-12 h-12 rounded object-cover" />
                    <div>
                      <p className="text-xs font-semibold m-0 truncate max-w-xs">{newAnnouncement.attachmentName || 'Attached Image'}</p>
                      <span className="text-[10px] text-success">Ready to upload</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setNewAnnouncement((prev) => ({ ...prev, attachment: null, attachmentName: '' }))}
                    className="p-1.5 rounded-lg text-danger border-none bg-transparent cursor-pointer hover:bg-danger/10"
                    title="Remove attachment"
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </button>
                </div>
              ) : (
                <label className="flex items-center justify-center gap-2 p-3 rounded-xl border border-dashed cursor-pointer text-xs" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface-secondary)' }}>
                  <Paperclip className="w-4 h-4 text-secondary" />
                  <span className="text-secondary">Attach flyer or image (PNG, JPG under 5MB)</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAnnouncementImageChange}
                    className="hidden"
                  />
                </label>
              )}
            </div>

            <label className="flex items-center gap-2 cursor-pointer text-xs">
              <input
                type="checkbox"
                checked={newAnnouncement.isPinned}
                onChange={(e) => setNewAnnouncement({ ...newAnnouncement, isPinned: e.target.checked })}
                className="rounded"
              />
              <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>Pin to top of bulletin board</span>
            </label>

            <div className="flex items-center justify-between pt-3" style={{ borderTop: '1px solid var(--border)' }}>
              <button
                type="button"
                onClick={handleSaveDraftAnnouncement}
                className="px-3.5 py-2 rounded-xl text-xs font-semibold cursor-pointer border"
                style={{ backgroundColor: 'var(--surface-secondary)', color: 'var(--text-secondary)', borderColor: 'var(--border)' }}
              >
                Save Draft
              </button>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsCreateAnnouncementOpen(false);
                    setEditingAnnouncementId(null);
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer border"
                  style={{ backgroundColor: 'var(--surface-secondary)', color: 'var(--text-primary)', borderColor: 'var(--border)' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold cursor-pointer border-none shadow-md"
                  style={{ backgroundColor: 'var(--info)', color: 'var(--text-on-primary)' }}
                >
                  {editingAnnouncementId ? 'Update & Publish' : 'Publish Announcement'}
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* MODAL: UPLOAD IMAGE */}
      {/* ---------------------------------------------------- */}
      {isUploadImageOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setIsUploadImageOpen(false)}
        >
          <form
            onSubmit={handleSaveImageToGallery}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md rounded-2xl p-6 border shadow-2xl space-y-4"
            style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
          >
            <div className="flex items-center justify-between pb-3" style={{ borderBottom: '1px solid var(--border)' }}>
              <h2 className="text-lg font-bold m-0 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                <UploadCloud className="w-5 h-5 text-info" /> Upload Shared Image
              </h2>
              <button
                type="button"
                onClick={() => setIsUploadImageOpen(false)}
                className="p-1 rounded-lg text-secondary border-none bg-transparent cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drag drop or file picker */}
            <div>
              <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--text-secondary)' }}>Select Image File</label>
              <div
                className="border-2 border-dashed rounded-xl p-4 text-center cursor-pointer hover:bg-slate-500/5 transition-colors"
                style={{ borderColor: 'var(--border)' }}
              >
                {uploadFormData.previewUrl ? (
                  <div className="space-y-2">
                    <img src={uploadFormData.previewUrl} alt="Preview" className="h-36 w-full object-cover rounded-lg" />
                    <span className="text-xs text-success block font-semibold">✓ {uploadFormData.fileName}</span>
                  </div>
                ) : (
                  <label className="cursor-pointer block py-4">
                    <ImageIcon className="w-8 h-8 mx-auto mb-2 text-tertiary" />
                    <span className="text-xs font-bold block" style={{ color: 'var(--info)' }}>Click to browse or drop image</span>
                    <span className="text-[10px] text-tertiary">PNG, JPG, WEBP up to 5MB</span>
                    <input type="file" accept="image/*" onChange={handleImageFileChange} className="hidden" />
                  </label>
                )}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--text-secondary)' }}>Image Caption / Description</label>
              <input
                type="text"
                value={uploadFormData.caption}
                onChange={(e) => setUploadFormData({ ...uploadFormData, caption: e.target.value })}
                placeholder="e.g. North Plaza Entry Point"
                className="w-full text-xs rounded-xl px-3 py-2.5 focus:outline-none"
                style={{ backgroundColor: 'var(--surface-secondary)', color: 'var(--text-primary)', border: '1px solid var(--border)' }}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--text-secondary)' }}>Category</label>
              <select
                value={uploadFormData.category}
                onChange={(e) => setUploadFormData({ ...uploadFormData, category: e.target.value })}
                className="w-full text-xs rounded-xl px-3 py-2.5 focus:outline-none"
                style={{ backgroundColor: 'var(--surface-secondary)', color: 'var(--text-primary)', border: '1px solid var(--border)' }}
              >
                <option value="Field Territory">Field Territory</option>
                <option value="Petition Guides">Petition Guides</option>
                <option value="Compliance Sample">Compliance Sample</option>
                <option value="Team Logistics">Team Logistics</option>
              </select>
            </div>

            <div className="flex justify-end gap-3 pt-3" style={{ borderTop: '1px solid var(--border)' }}>
              <button
                type="button"
                onClick={() => setIsUploadImageOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer border"
                style={{ backgroundColor: 'var(--surface-secondary)', color: 'var(--text-primary)', borderColor: 'var(--border)' }}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!uploadFormData.previewUrl}
                className="px-5 py-2 rounded-xl text-xs font-bold cursor-pointer border-none shadow-md disabled:opacity-50"
                style={{ backgroundColor: 'var(--info)', color: 'var(--text-on-primary)' }}
              >
                Upload to Gallery
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* MODAL: IMAGE PREVIEW FULL SIZE */}
      {/* ---------------------------------------------------- */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="w-full max-w-3xl rounded-2xl p-4 border shadow-2xl space-y-3"
            style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-2" style={{ borderBottom: '1px solid var(--border)' }}>
              <div>
                <h3 className="text-base font-bold m-0" style={{ color: 'var(--text-primary)' }}>{selectedImage.title}</h3>
                <span className="text-xs text-secondary">{selectedImage.category} • Uploaded by {selectedImage.uploader}</span>
              </div>
              <button
                onClick={() => setSelectedImage(null)}
                className="p-1 rounded-lg text-secondary border-none bg-transparent cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="rounded-xl overflow-hidden max-h-[60vh] flex items-center justify-center bg-black/20">
              <img src={selectedImage.url} alt={selectedImage.title} className="max-h-[60vh] w-auto max-w-full object-contain" />
            </div>

            <p className="text-xs text-secondary m-0">{selectedImage.caption}</p>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* MODAL: CONFIRM AUTHORIZATION CHANGE */}
      {/* ---------------------------------------------------- */}
      {confirmAuthModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setConfirmAuthModal(null)}
        >
          <div
            className="w-full max-w-md rounded-2xl p-6 border shadow-2xl space-y-4"
            style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <div
                className="p-3 rounded-full"
                style={{
                  backgroundColor: confirmAuthModal.nextState ? 'var(--info-light)' : 'var(--error-light)',
                  color: confirmAuthModal.nextState ? 'var(--info)' : 'var(--error)'
                }}
              >
                {confirmAuthModal.nextState ? <ShieldCheck className="w-6 h-6" /> : <Lock className="w-6 h-6" />}
              </div>
              <div>
                <h3 className="text-base font-bold m-0">Confirm Access Update</h3>
                <p className="text-xs text-secondary mt-0.5 m-0">
                  {confirmAuthModal.nextState ? 'Grant publishing rights' : 'Revoke publishing rights'}
                </p>
              </div>
            </div>

            <p className="text-xs text-secondary leading-relaxed">
              Are you sure you want to change <strong>{confirmAuthModal.member.name}</strong>'s posting permission to{' '}
              <strong style={{ color: confirmAuthModal.nextState ? 'var(--info)' : 'var(--error)' }}>
                {confirmAuthModal.nextState ? 'Authorized Poster' : 'Read-Only Member'}
              </strong>
              ?
            </p>

            <div className="flex justify-end gap-3 pt-3" style={{ borderTop: '1px solid var(--border)' }}>
              <button
                onClick={() => setConfirmAuthModal(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer border"
                style={{ backgroundColor: 'var(--surface-secondary)', color: 'var(--text-primary)', borderColor: 'var(--border)' }}
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmAuthChange}
                className="px-5 py-2 rounded-xl text-xs font-bold cursor-pointer border-none shadow-md"
                style={{
                  backgroundColor: confirmAuthModal.nextState ? 'var(--info)' : 'var(--error)',
                  color: '#fff'
                }}
              >
                Confirm Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
