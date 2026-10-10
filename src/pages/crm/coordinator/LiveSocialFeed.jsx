import React, { useState } from 'react';
import { Sparkles, Image as ImageIcon, MapPin, Send, MessageCircle, Heart, Share2, MoreHorizontal, X, Trash2 } from 'lucide-react';

export const LiveSocialFeed = () => {
  const [postText, setPostText] = useState('');
  const [location, setLocation] = useState('');
  const [showLocation, setShowLocation] = useState(false);
  const [mediaName, setMediaName] = useState('');
  const [openMenu, setOpenMenu] = useState(null);
  const [openComments, setOpenComments] = useState(null);
  const [commentText, setCommentText] = useState('');
  const [toast, setToast] = useState('');
  const [posts, setPosts] = useState([
    {
      id: 1, author: 'Sarah Jenkins (Coordinator)', time: 'Just now',
      content: '🚨 ALERT: The mall location has asked us to move to the north entrance. All circulators assigned to Westside Mall, please relocate immediately and confirm here.',
      location: 'Westside Mall', likes: 12, liked: false, isAlert: true, initial: 'S',
      comments: [{ id: 1, text: 'On our way!' }, { id: 2, text: 'Confirmed.' }, { id: 3, text: 'Moving now.' }, { id: 4, text: 'Got it.' }],
    },
    {
      id: 2, author: 'Emma Wilson (Circulator)', time: '15 mins ago',
      content: 'Huge turnout at the downtown farmers market! Just hit my 100th signature for the day. Anyone nearby need extra clipboards?',
      location: 'Downtown District 4', likes: 45, liked: false, isAlert: false, initial: 'E',
      comments: [{ id: 1, text: 'Great job!' }],
    },
  ]);

  const notify = (m) => { setToast(m); setTimeout(() => setToast(''), 2200); };

  const submitPost = () => {
    if (!postText.trim()) return;
    setPosts((p) => [{
      id: Date.now(), author: 'Me (Coordinator)', time: 'Just now',
      content: postText.trim() + (mediaName ? `\n📎 ${mediaName}` : ''),
      location: location.trim(), likes: 0, liked: false, isAlert: false, initial: 'M', comments: [],
    }, ...p]);
    setPostText(''); setLocation(''); setShowLocation(false); setMediaName('');
  };

  const toggleLike = (id) => setPosts((p) => p.map((x) => x.id === id ? { ...x, liked: !x.liked, likes: x.likes + (x.liked ? -1 : 1) } : x));

  const addComment = (id) => {
    if (!commentText.trim()) return;
    setPosts((p) => p.map((x) => x.id === id ? { ...x, comments: [...x.comments, { id: Date.now(), text: commentText.trim() }] } : x));
    setCommentText('');
  };

  const share = async (post) => {
    try { await navigator.clipboard.writeText(post.content); notify('Post copied to clipboard'); }
    catch { notify('Unable to copy'); }
  };

  const deletePost = (id) => { setPosts((p) => p.filter((x) => x.id !== id)); setOpenMenu(null); };

  const ghost = { color: 'var(--text-secondary)' };

  return (
    <div className="h-full overflow-y-auto pb-10" style={{ backgroundColor: 'var(--background)', color: 'var(--text-primary)' }}>
      <div className="p-4 sm:p-6 sticky top-0 z-20" style={{ backgroundColor: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
        <h1 className="text-xl sm:text-2xl font-bold flex items-center gap-3" style={{ color: 'var(--text-primary)' }}>
          <div className="p-2 rounded-lg" style={{ backgroundColor: 'var(--info-light)' }}>
            <Sparkles className="w-6 h-6" style={{ color: 'var(--info)' }} />
          </div>
          Live Social Feed
        </h1>
        <p className="mt-1 text-sm" style={ghost}>
          Communicate with all circulators in real-time. Post alerts, updates, and celebrate wins.
        </p>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 mt-8 space-y-6">
        {/* Create post */}
        <div className="rounded-2xl p-4 shadow-md" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
          <div className="flex gap-3 sm:gap-4">
            <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0" style={{ backgroundColor: 'var(--info)', color: '#fff' }}>ME</div>
            <div className="flex-1 min-w-0">
              <textarea
                placeholder="Broadcast a message or alert to the entire team..."
                className="w-full rounded-lg p-2 focus:outline-none resize-none min-h-[80px]"
                style={{ backgroundColor: 'var(--surface-secondary)', color: 'var(--text-primary)', border: '1px solid var(--border)' }}
                value={postText}
                onChange={(e) => setPostText(e.target.value)}
              />
              {showLocation && (
                <input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Location (e.g. Westside Mall)"
                  className="w-full mt-2 px-3 py-2 rounded-lg text-sm focus:outline-none"
                  style={{ backgroundColor: 'var(--surface-secondary)', color: 'var(--text-primary)', border: '1px solid var(--border)' }}
                />
              )}
              {mediaName && (
                <div className="mt-2 text-xs inline-flex items-center gap-2 px-2 py-1 rounded-lg" style={{ backgroundColor: 'var(--info-light)', color: 'var(--info)' }}>
                  <ImageIcon className="w-3 h-3" /> {mediaName}
                  <button onClick={() => setMediaName('')} aria-label="Remove media"><X className="w-3 h-3" /></button>
                </div>
              )}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-3 mt-2" style={{ borderTop: '1px solid var(--border)' }}>
                <div className="flex gap-2">
                  <label className="p-2 rounded-lg cursor-pointer flex items-center gap-2 text-sm font-medium" style={ghost}>
                    <ImageIcon className="w-4 h-4" /> Media
                    <input type="file" accept="image/*,video/*" className="hidden" onChange={(e) => setMediaName(e.target.files?.[0]?.name || '')} />
                  </label>
                  <button onClick={() => setShowLocation((s) => !s)} className="p-2 rounded-lg flex items-center gap-2 text-sm font-medium" style={{ color: showLocation ? 'var(--error)' : 'var(--text-secondary)' }}>
                    <MapPin className="w-4 h-4" /> Location
                  </button>
                </div>
                <button
                  onClick={submitPost}
                  disabled={!postText.trim()}
                  className="px-6 py-2 rounded-xl font-bold shadow-lg flex items-center gap-2 disabled:opacity-50"
                  style={{ backgroundColor: 'var(--info)', color: '#fff' }}
                >
                  <Send className="w-4 h-4" /> Post
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Posts */}
        <div className="space-y-6">
          {posts.length === 0 && <p className="text-center text-sm" style={ghost}>No posts yet.</p>}
          {posts.map((post) => (
            <div
              key={post.id}
              className="rounded-2xl p-4 sm:p-5 shadow-md"
              style={{
                backgroundColor: post.isAlert ? 'var(--error-light)' : 'var(--surface)',
                border: `1px solid ${post.isAlert ? 'var(--error-border)' : 'var(--border)'}`,
              }}
            >
              <div className="flex justify-between items-start mb-4 relative">
                <div className="flex gap-3 items-center">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold" style={{ backgroundColor: post.isAlert ? 'var(--error)' : 'var(--info)', color: '#fff' }}>
                    {post.initial}
                  </div>
                  <div>
                    <h4 className="font-bold flex flex-wrap items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                      {post.author}
                      {post.isAlert && <span className="px-2 py-0.5 text-[10px] uppercase rounded-full tracking-wider" style={{ backgroundColor: 'var(--error)', color: '#fff' }}>Urgent Alert</span>}
                    </h4>
                    <div className="text-xs flex items-center gap-2" style={ghost}>
                      <span>{post.time}</span>
                      {post.location && (
                        <>
                          <span>•</span>
                          <span className="flex items-center gap-1" style={{ color: 'var(--info)' }}><MapPin className="w-3 h-3" /> {post.location}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <button onClick={() => setOpenMenu(openMenu === post.id ? null : post.id)} style={ghost} aria-label="More">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
                {openMenu === post.id && (
                  <div className="absolute right-0 top-8 z-10 w-40 rounded-xl py-1 shadow-xl" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border-strong)' }}>
                    <button onClick={() => deletePost(post.id)} className="w-full flex items-center gap-2 px-4 py-2 text-sm" style={{ color: 'var(--error)' }}>
                      <Trash2 className="w-4 h-4" /> Delete Post
                    </button>
                  </div>
                )}
              </div>

              <p className="text-sm md:text-base leading-relaxed mb-4 whitespace-pre-line" style={{ color: 'var(--text-primary)', fontWeight: post.isAlert ? 500 : 400 }}>
                {post.content}
              </p>

              <div className="flex items-center gap-4 sm:gap-6 pt-4" style={{ borderTop: '1px solid var(--border)' }}>
                <button onClick={() => toggleLike(post.id)} className="flex items-center gap-2 text-sm font-medium" style={{ color: post.liked ? 'var(--error)' : 'var(--text-secondary)' }}>
                  <Heart className="w-5 h-5" fill={post.liked ? 'currentColor' : 'none'} /> {post.likes}
                </button>
                <button onClick={() => { setOpenComments(openComments === post.id ? null : post.id); setCommentText(''); }} className="flex items-center gap-2 text-sm font-medium" style={{ color: openComments === post.id ? 'var(--info)' : 'var(--text-secondary)' }}>
                  <MessageCircle className="w-5 h-5" /> {post.comments.length} Comments
                </button>
                <button onClick={() => share(post)} className="flex items-center gap-2 text-sm font-medium ml-auto" style={ghost}>
                  <Share2 className="w-5 h-5" /> Share
                </button>
              </div>

              {openComments === post.id && (
                <div className="mt-4 space-y-3">
                  {post.comments.map((c) => (
                    <div key={c.id} className="text-sm px-3 py-2 rounded-lg" style={{ backgroundColor: 'var(--surface-secondary)', color: 'var(--text-primary)' }}>{c.text}</div>
                  ))}
                  <div className="flex gap-2">
                    <input
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && addComment(post.id)}
                      placeholder="Write a comment..."
                      className="flex-1 min-w-0 px-3 py-2 rounded-lg text-sm focus:outline-none"
                      style={{ backgroundColor: 'var(--surface-secondary)', color: 'var(--text-primary)', border: '1px solid var(--border)' }}
                    />
                    <button onClick={() => addComment(post.id)} className="px-4 py-2 rounded-lg text-sm font-bold" style={{ backgroundColor: 'var(--info)', color: '#fff' }}>Send</button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {toast && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-xl shadow-xl font-semibold" style={{ backgroundColor: 'var(--success)', color: '#fff' }}>{toast}</div>
      )}
    </div>
  );
};
