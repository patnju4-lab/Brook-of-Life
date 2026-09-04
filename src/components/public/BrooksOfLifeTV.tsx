import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BROOKS_LOGO_SRC } from '../../assets/logo';
import { 
  Tv, 
  Radio, 
  Play, 
  Search, 
  Calendar, 
  Clock, 
  Share2, 
  ExternalLink, 
  Sparkles, 
  BookOpen, 
  GraduationCap, 
  Globe, 
  Users, 
  Flame, 
  Check, 
  X, 
  ChevronRight,
  Filter,
  Youtube,
  Volume2,
  Bookmark,
  Shield,
  Power,
  Sliders,
  Heart,
  MessageSquare,
  AlertCircle
} from 'lucide-react';

export interface TVVideo {
  id: string;
  title: string;
  description: string;
  category: string;
  speaker: string;
  speakerRole: string;
  duration: string;
  publishedDate: string;
  scriptureReference: string;
  youtubeId: string; // Valid YouTube video ID for embed
  thumbnail: string;
  views: string;
  isFeatured?: boolean;
  isRequiredForSchool?: boolean;
  tags: string[];
}

export const BrooksOfLifeTV: React.FC = () => {
  const { currentUser, switchRole, navigateTo } = useApp();
  const isAdmin = currentUser?.role === 'admin' || currentUser?.role === 'super_admin';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeVideoModal, setActiveVideoModal] = useState<TVVideo | null>(null);
  const [isLiveActive, setIsLiveActive] = useState(true);
  const [copiedLink, setCopiedLink] = useState(false);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);

  // Live Broadcast state & simulated metrics
  const [liveProgramTitle, setLiveProgramTitle] = useState('Global Sunday Holy Communion & Apostolic Impartation Service');
  const [liveSpeaker, setLiveSpeaker] = useState('Rev. Dr. Emmanuel O. Brooks, Th.D.');
  const [liveSpeakerRole, setLiveSpeakerRole] = useState('President & Senior Chancellor, BLSM');
  const [liveScripture, setLiveScripture] = useState('Leviticus 6:12-13; 2 Timothy 1:6-7');
  const [liveViewerCount, setLiveViewerCount] = useState(1482);
  const [liveStreamId, setLiveStreamId] = useState('WwX8G1e59k4');
  const [amenCount, setAmenCount] = useState(542);
  const [blessCount, setBlessCount] = useState(389);
  const [fireCount, setFireCount] = useState(714);
  const [broadcastAlert, setBroadcastAlert] = useState<string | null>(null);

  // Admin Live Broadcast Toggle handler
  const toggleLiveBroadcast = () => {
    const nextStatus = !isLiveActive;
    setIsLiveActive(nextStatus);
    if (nextStatus) {
      setBroadcastAlert('BROADCAST ON AIR: The official Brooks of Life TV live transmission is now ACTIVE. Hero section updated to live video player instance and LIVE NOW banner displayed.');
    } else {
      setBroadcastAlert('BROADCAST OFF AIR: Live stream has been taken off-air. The hero has returned to standby slate mode.');
    }
    setTimeout(() => setBroadcastAlert(null), 5000);
  };

  // Categorized Video Library
  const categories = [
    'All',
    'Sermons',
    'Bible Studies',
    'Theology Classroom',
    'Ministry Leadership',
    'Pastors\' Forum',
    'Worship',
    'Missions & Evangelism',
    'Conferences',
    'Christian Family'
  ];

  const featuredVideos: TVVideo[] = [
    {
      id: 'vid-1',
      title: 'The Fire on the Altar: Spiritual Authority & Doctrinal Purity',
      description: 'A stirring keynote exposition by Rev. Dr. Emmanuel O. Brooks on the vital balance between theological scholarship and the unquenchable power of the Holy Spirit in 21st-century church leadership.',
      category: 'Sermons',
      speaker: 'Rev. Dr. Emmanuel O. Brooks, Th.D.',
      speakerRole: 'President & Senior Chancellor, BLSM',
      duration: '52:18',
      publishedDate: 'Sept 2, 2026',
      scriptureReference: 'Leviticus 6:12-13; 2 Timothy 1:6-7',
      youtubeId: 'WwX8G1e59k4',
      thumbnail: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=1200&auto=format&fit=crop',
      views: '14.2K',
      isFeatured: true,
      isRequiredForSchool: true,
      tags: ['Holy Spirit', 'Spiritual Authority', 'Pulpit Ministry', 'Revival']
    },
    {
      id: 'vid-2',
      title: 'Exegesis of Romans 8: Unpacking the Spirit of Life in Christ',
      description: 'Dr. Arthur Sterling guides theological candidates through the original Pauline Greek syntax of Romans 8:1-17, addressing justification, sanctification, and eternal security.',
      category: 'Theology Classroom',
      speaker: 'Prof. Arthur C. Sterling, Ph.D.',
      speakerRole: 'Dean of Biblical Theology & Exegesis',
      duration: '45:40',
      publishedDate: 'Aug 28, 2026',
      scriptureReference: 'Romans 8:1-17 (Koine Greek)',
      youtubeId: 'dQw4w9WgXcQ',
      thumbnail: 'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=1200&auto=format&fit=crop',
      views: '8.9K',
      isFeatured: true,
      isRequiredForSchool: true,
      tags: ['Pauline Theology', 'Greek Exegesis', 'Romans', 'Hermeneutics']
    },
    {
      id: 'vid-3',
      title: 'Strategic Church Governance & Financial Integrity for Pastors',
      description: 'Essential administrative standards for apostolic pioneers, covering congregational by-laws, board ethics, and financial transparency that honors Christ.',
      category: 'Ministry Leadership',
      speaker: 'Dr. Timothy W. Sterling',
      speakerRole: 'Dean of Leadership & Administration',
      duration: '38:15',
      publishedDate: 'Aug 22, 2026',
      scriptureReference: 'Titus 1:5-9; 1 Corinthians 4:1-2',
      youtubeId: 'kJQP7kiw5Fk',
      thumbnail: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1200&auto=format&fit=crop',
      views: '6.4K',
      isFeatured: false,
      isRequiredForSchool: true,
      tags: ['Church Governance', 'Administration', 'Leadership Ethics']
    },
    {
      id: 'vid-4',
      title: 'Deeper in the Word: Covenant Realities from Genesis to Revelation',
      description: 'An illuminating masterclass on biblical covenants, tracing the Abrahamic, Mosaic, Davidic, and New Covenant fulfillments in the resurrected Messiah.',
      category: 'Bible Studies',
      speaker: 'Dr. Arthur C. Sterling & Faculty',
      speakerRole: 'Department of Biblical Studies',
      duration: '58:02',
      publishedDate: 'Aug 17, 2026',
      scriptureReference: 'Genesis 15; Jeremiah 31:31-34; Hebrews 8',
      youtubeId: '3JZ_D3ELwOQ',
      thumbnail: 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?q=80&w=1200&auto=format&fit=crop',
      views: '11.1K',
      isFeatured: false,
      isRequiredForSchool: false,
      tags: ['Biblical Covenants', 'Old Testament', 'Christology']
    },
    {
      id: 'vid-5',
      title: 'Pastors\' Colloquium: Shepherding Ministers in Times of Cultural Crisis',
      description: 'Senior bishops and international pastors convene to discuss theological fortitude, guarding the flock against heresy, and ministering to families in a changing world.',
      category: 'Pastors\' Forum',
      speaker: 'Bishop David K. Vance & Guest Panel',
      speakerRole: 'Visiting Apostolic Fellow',
      duration: '1:04:12',
      publishedDate: 'Aug 10, 2026',
      scriptureReference: 'Acts 20:28-32; 1 Peter 5:1-4',
      youtubeId: 'fJ9rUzIMcZQ',
      thumbnail: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=1200&auto=format&fit=crop',
      views: '9.7K',
      isFeatured: false,
      isRequiredForSchool: false,
      tags: ['Pastoral Care', 'Shepherding', 'Apologetics', 'Panel']
    },
    {
      id: 'vid-6',
      title: 'Night of Global Prophetic Worship & Intercession for Nations',
      description: 'An atmosphere of reverent adoration, choral anthems, and fervent intercessory prayer led by the Brooks of Life International Choir and Worship Guild.',
      category: 'Worship',
      speaker: 'BLSM Ministry Worship Guild',
      speakerRole: 'Department of Sacred Music & Praise',
      duration: '1:15:30',
      publishedDate: 'Aug 04, 2026',
      scriptureReference: 'Psalm 95:1-7; Revelation 5:8-13',
      youtubeId: '2Vv-BfVoq4g',
      thumbnail: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1200&auto=format&fit=crop',
      views: '19.8K',
      isFeatured: false,
      isRequiredForSchool: false,
      tags: ['Worship', 'Prayer', 'Spiritual Warfare', 'Praise']
    },
    {
      id: 'vid-7',
      title: 'Frontier Church Planting in Sub-Saharan Africa and Central Asia',
      description: 'Field reports, strategic missiology guidelines, and testimonies of unreached people groups receiving the Gospel through ordained BLSM mission graduates.',
      category: 'Missions & Evangelism',
      speaker: 'Rev. Jonathan M. Adeyemi',
      speakerRole: 'Director of Global Missions',
      duration: '42:10',
      publishedDate: 'July 29, 2026',
      scriptureReference: 'Matthew 28:18-20; Romans 15:20-21',
      youtubeId: 'L_LUpnjgPso',
      thumbnail: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1200&auto=format&fit=crop',
      views: '5.6K',
      isFeatured: false,
      isRequiredForSchool: true,
      tags: ['World Missions', 'Church Planting', 'Evangelism']
    },
    {
      id: 'vid-8',
      title: 'Building a Christ-Centered Home: Biblical Marriage & Generational Faith',
      description: 'Practical, biblically grounded counsel on marital fidelity, parental stewardship, and establishing an altar of prayer that impacts future generations.',
      category: 'Christian Family',
      speaker: 'Dr. Miriam E. Thorne',
      speakerRole: 'Dean of Christian Counseling & Family Life',
      duration: '49:25',
      publishedDate: 'July 21, 2026',
      scriptureReference: 'Ephesians 5:21-33; Deuteronomy 6:4-9',
      youtubeId: 'OPf0YbXqDm0',
      thumbnail: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=1200&auto=format&fit=crop',
      views: '7.3K',
      isFeatured: false,
      isRequiredForSchool: false,
      tags: ['Family Life', 'Marriage', 'Parenting', 'Counseling']
    },
    {
      id: 'vid-9',
      title: 'Annual International Theological Conference: The Authority of Scripture',
      description: 'Opening plenary session of the 2026 BLSM Global Theological Symposium defending the inerrancy, sufficiency, and timeless relevance of Sacred Scripture.',
      category: 'Conferences',
      speaker: 'President Emmanuel O. Brooks & Keynote Scholars',
      speakerRole: 'Board of Regents & Academic Senate',
      duration: '1:32:00',
      publishedDate: 'July 15, 2026',
      scriptureReference: '2 Timothy 3:16-17; 2 Peter 1:20-21',
      youtubeId: 'kJQP7kiw5Fk',
      thumbnail: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1200&auto=format&fit=crop',
      views: '22.4K',
      isFeatured: true,
      isRequiredForSchool: false,
      tags: ['Theological Conference', 'Biblical Inerrancy', 'Scholars']
    }
  ];

  // Daily TV Programming Schedule
  const dailySchedule = [
    { time: '06:00 GMT', title: 'The Word Today: Morning Bread & Devotion', speaker: 'Rev. Emmanuel O. Brooks', status: 'completed' },
    { time: '08:30 GMT', title: 'Biblical Hebrew & Greek Foundations', speaker: 'Prof. Arthur Sterling', status: 'completed' },
    { time: '11:00 GMT', title: 'Global Sunday Holy Communion Service', speaker: 'Rev. Dr. Emmanuel O. Brooks', status: 'live' },
    { time: '14:00 GMT', title: 'Ministry Leadership: Pastoral Administration', speaker: 'Dr. Timothy Sterling', status: 'upcoming' },
    { time: '17:00 GMT', title: 'Pastors\' Round-Table & Forum', speaker: 'Senior Faculty Panel', status: 'upcoming' },
    { time: '19:30 GMT', title: 'Evening Prophetic Sermon & Exposition', speaker: 'Guest Apostolic Ministers', status: 'upcoming' },
    { time: '21:30 GMT', title: 'Night of Global Intercession & Worship', speaker: 'BLSM Ministry Worship Guild', status: 'upcoming' }
  ];

  const filteredVideos = featuredVideos.filter(vid => {
    const matchesCategory = selectedCategory === 'All' || vid.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      vid.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vid.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vid.speaker.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vid.scriptureReference.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vid.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarkedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleShare = (vid: TVVideo, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`https://www.youtube.com/watch?v=${vid.youtubeId}`);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-slate-200 pb-20 selection:bg-[#c4a47c] selection:text-[#0a0a0b]">
      
      {/* Broadcast State Notification Toast */}
      {broadcastAlert && (
        <div className="bg-gradient-to-r from-rose-900 to-amber-900 text-white text-xs px-4 py-2 text-center font-medium flex items-center justify-center space-x-2 border-b border-white/20 animate-fadeIn">
          <AlertCircle className="w-4 h-4 text-amber-300 shrink-0" />
          <span>{broadcastAlert}</span>
        </div>
      )}

      {/* Admin Broadcast Master Control Console Bar */}
      {isAdmin ? (
        <div className="bg-[#121622] border-b border-[#c4a47c]/30 py-2.5 px-4 sticky top-0 z-40 shadow-xl backdrop-blur-md">
          <div className="container mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded bg-[#c4a47c]/15 text-[#e6caa2] border border-[#c4a47c]/40 font-bold uppercase tracking-wider text-[10px]">
                <Shield className="w-3.5 h-3.5 text-[#c4a47c]" />
                <span>ADMIN CONTROL ROOM</span>
              </div>
              <span className="text-slate-300">
                Operator: <strong className="text-white">{currentUser?.name}</strong> <span className="text-slate-400">({currentUser?.role === 'super_admin' ? 'Chancellor / Super Admin' : 'Administrator'})</span>
              </span>
              <span className="text-slate-500 hidden sm:inline">•</span>
              <span className="flex items-center space-x-1 text-slate-300">
                <span>Signal:</span>
                <span className={`font-mono font-bold px-1.5 py-0.5 rounded text-[10px] ${isLiveActive ? 'bg-rose-950 text-rose-300 border border-rose-700' : 'bg-slate-800 text-slate-400'}`}>
                  {isLiveActive ? '● ON AIR' : '○ STANDBY'}
                </span>
              </span>
            </div>

            {/* Core Admin Live Broadcast Toggle Button */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={toggleLiveBroadcast}
                className={`px-3.5 py-1.5 rounded-lg font-bold text-xs uppercase tracking-wider flex items-center space-x-2 transition shadow-md cursor-pointer ${
                  isLiveActive
                    ? 'bg-rose-600 hover:bg-rose-700 text-white shadow-rose-950/60 ring-2 ring-rose-400/40'
                    : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-950/60 ring-2 ring-emerald-400/40'
                }`}
                title={isLiveActive ? 'Take stream off-air and show standby slate' : 'Go live and display active live video player in hero'}
              >
                <Power className="w-3.5 h-3.5" />
                <span>{isLiveActive ? 'Stop Broadcast (Take Off Air)' : 'Go Live Now (Start Broadcast)'}</span>
              </button>

              {/* Admin Quick Program Preset Selector */}
              <div className="hidden lg:flex items-center space-x-1 border-l border-white/10 pl-2">
                <span className="text-[10px] text-slate-400 font-mono">Preset:</span>
                <button
                  onClick={() => {
                    setLiveProgramTitle('Global Sunday Holy Communion & Apostolic Impartation Service');
                    setLiveSpeaker('Rev. Dr. Emmanuel O. Brooks, Th.D.');
                    setLiveScripture('Leviticus 6:12-13; 2 Timothy 1:6-7');
                    setIsLiveActive(true);
                  }}
                  className="px-2 py-1 rounded bg-white/5 hover:bg-white/10 text-[10px] text-slate-300 hover:text-white"
                  title="Load Sunday Global Service preset"
                >
                  Sunday Service
                </button>
                <button
                  onClick={() => {
                    setLiveProgramTitle('International Theological Symposium: Inerrancy of Scripture');
                    setLiveSpeaker('Academic Senate & Faculty Plenary');
                    setLiveScripture('2 Timothy 3:16-17; 2 Peter 1:20-21');
                    setIsLiveActive(true);
                  }}
                  className="px-2 py-1 rounded bg-white/5 hover:bg-white/10 text-[10px] text-slate-300 hover:text-white"
                  title="Load Theological Symposium preset"
                >
                  Symposium
                </button>
                <button
                  onClick={() => {
                    setLiveProgramTitle('Night of Global Prophetic Intercession & Holy Worship');
                    setLiveSpeaker('BLSM Ministry Worship Guild');
                    setLiveScripture('Psalm 95:1-7; Revelation 5:8-13');
                    setIsLiveActive(true);
                  }}
                  className="px-2 py-1 rounded bg-white/5 hover:bg-white/10 text-[10px] text-slate-300 hover:text-white"
                  title="Load Prophetic Worship preset"
                >
                  Night Prayer
                </button>
              </div>

              {/* Viewer simulation buttons */}
              <div className="hidden xl:flex items-center space-x-1 border-l border-white/10 pl-2">
                <button
                  onClick={() => setLiveViewerCount(v => v + 150)}
                  className="px-1.5 py-0.5 rounded bg-white/5 hover:bg-white/10 text-[10px] text-emerald-400 font-mono"
                  title="Simulate 150 more viewers joining"
                >
                  +150 Viewers
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Non-admin helper banner with 1-click test switcher */
        <div className="bg-[#10131c] border-b border-white/10 px-4 py-2 text-xs text-slate-400">
          <div className="container mx-auto flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center space-x-2">
              <Shield className="w-3.5 h-3.5 text-[#c4a47c]" />
              <span>
                Brooks of Life TV Broadcast Station • Logged in as <strong className="text-white">{currentUser?.name || 'Viewer / Student'}</strong>
              </span>
            </div>
            <button
              onClick={() => {
                switchRole('super_admin');
                navigateTo('brooks-of-life-tv');
              }}
              className="px-2.5 py-1 rounded bg-[#c4a47c]/20 hover:bg-[#c4a47c]/30 border border-[#c4a47c]/40 text-[#e6caa2] font-semibold text-[11px] transition flex items-center space-x-1.5 cursor-pointer"
              title="Switch user role to Chancellor / Super Admin to manage the live broadcast"
            >
              <Shield className="w-3 h-3 text-[#c4a47c]" />
              <span>Switch to Administrator (to toggle Live Broadcast)</span>
            </button>
          </div>
        </div>
      )}

      {/* Top Broadcast Ticker */}
      <div className="bg-[#0a0c10] border-b border-white/10 py-2 px-4 backdrop-blur-md">
        <div className="container mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center space-x-3">
            {/* Live Indicator */}
            <div className={`flex items-center space-x-2 px-2.5 py-1 rounded-full font-bold uppercase tracking-wider text-[11px] shadow-sm ${
              isLiveActive 
                ? 'bg-rose-950/80 text-rose-300 border border-rose-600/50 shadow-rose-950' 
                : 'bg-slate-900 text-slate-400 border border-slate-700'
            }`}>
              <span className={`w-2 h-2 rounded-full ${isLiveActive ? 'bg-rose-500 animate-ping' : 'bg-slate-500'}`}></span>
              <span className={`w-2 h-2 rounded-full -ml-3 ${isLiveActive ? 'bg-rose-500' : 'bg-slate-500'}`}></span>
              <span>BROOKS OF LIFE TV • {isLiveActive ? 'LIVE BROADCAST' : 'OFF AIR / STANDBY'}</span>
            </div>
            
            <span className="hidden md:inline text-slate-400">
              Broadcasting to <strong className="text-white">120+ Nations</strong> • 24/7 Christian Digital Television
            </span>
          </div>

          <div className="flex items-center space-x-3">
            {/* Admin Live Toggle Quick Button */}
            {isAdmin && (
              <button 
                onClick={toggleLiveBroadcast}
                className={`px-2.5 py-1 text-[11px] font-mono rounded border transition flex items-center space-x-1.5 cursor-pointer ${
                  isLiveActive 
                    ? 'bg-rose-950/80 text-rose-200 border-rose-600/60 hover:bg-rose-900' 
                    : 'bg-emerald-950/80 text-emerald-200 border-emerald-600/60 hover:bg-emerald-900'
                }`}
                title="Admin Quick Toggle Live Broadcast Status"
              >
                <Power className="w-3 h-3" />
                <span>Admin Status: <strong>{isLiveActive ? 'ON AIR' : 'OFF AIR'}</strong></span>
              </button>
            )}

            <a 
              href="https://www.youtube.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded bg-red-600 hover:bg-red-700 text-white font-bold text-[11px] transition shadow-sm"
            >
              <Youtube className="w-3.5 h-3.5" />
              <span>YouTube Channel</span>
            </a>
          </div>
        </div>
      </div>

      {/* DEDICATED LIVE NOW BANNER (When Broadcast is Active) OR OFF-AIR BANNER */}
      {isLiveActive ? (
        <div className="bg-gradient-to-r from-rose-950 via-red-950 to-[#120a10] border-y-2 border-rose-500/60 py-3.5 px-4 shadow-2xl relative overflow-hidden">
          {/* Subtle Ambient Pulse Light */}
          <div className="absolute -left-10 top-0 w-40 h-full bg-rose-500/20 blur-xl pointer-events-none"></div>

          <div className="container mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3 relative z-10">
            <div className="flex items-center space-x-3.5">
              {/* Pulsating 'LIVE NOW' Badge */}
              <div className="flex items-center space-x-2 bg-rose-600 text-white px-3 py-1.5 rounded-full font-black text-xs tracking-wider uppercase shadow-lg shadow-rose-950 animate-pulse shrink-0">
                <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping"></span>
                <span>LIVE NOW</span>
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2 text-white font-serif font-bold text-sm sm:text-base">
                  <span>{liveProgramTitle}</span>
                  <span className="px-2 py-0.5 rounded bg-black/60 text-[#e6caa2] border border-[#c4a47c]/40 text-[10px] font-mono uppercase">
                    TRANSMITTING LIVE
                  </span>
                </div>
                <div className="text-xs text-rose-200/90 flex flex-wrap items-center gap-x-2 gap-y-0.5 mt-0.5">
                  <span className="font-semibold text-white">{liveSpeaker}</span>
                  <span>•</span>
                  <span className="text-[#e6caa2] font-serif italic">{liveScripture}</span>
                  <span>•</span>
                  <span className="font-mono text-emerald-400 font-medium">1080p HD Studio Feed</span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3 shrink-0">
              <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-black/60 border border-rose-500/30 text-rose-200 font-mono text-xs shadow-inner">
                <Users className="w-3.5 h-3.5 text-rose-400" />
                <strong className="text-white font-bold">{liveViewerCount.toLocaleString()}</strong>
                <span>watching now</span>
              </div>
              <button
                onClick={() => {
                  const el = document.getElementById('hero-live-player-instance');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-3.5 py-1.5 rounded-lg bg-[#c4a47c] hover:bg-[#d5b791] text-[#0a0a0b] font-bold text-xs transition shadow-md cursor-pointer flex items-center space-x-1"
              >
                <span>Live Feed Player</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Off-Air Standby Banner */
        <div className="bg-[#0e1017] border-y border-white/10 py-2.5 px-4 text-xs text-slate-300">
          <div className="container mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 font-bold text-[11px] uppercase tracking-wider font-mono">
                <Clock className="w-3 h-3 text-amber-400" />
                <span>OFF AIR • STANDBY</span>
              </div>
              <span className="text-slate-300">
                BROOKS OF LIFE TV IS CURRENTLY OFF AIR — Next scheduled broadcast: <strong className="text-white">14:00 GMT</strong> (Ministry Leadership & Pastoral Administration)
              </span>
            </div>
            {isAdmin && (
              <button
                onClick={toggleLiveBroadcast}
                className="inline-flex items-center space-x-1.5 text-xs font-bold text-emerald-400 hover:text-emerald-300 bg-emerald-950/60 border border-emerald-500/40 px-3 py-1 rounded transition cursor-pointer"
              >
                <Radio className="w-3.5 h-3.5" />
                <span>Admin: Start Live Broadcast</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* HERO SECTION - Television Style Cinema Banner */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0b1220] via-[#090b10] to-[#0a0a0b] border-b border-white/10">
        {/* Subtle Ambient Glows */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-[#c4a47c]/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="container mx-auto px-4 py-12 lg:py-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Headline & Meta */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Badge & Official Identity */}
              <div className="inline-flex items-center space-x-2.5 px-3 py-1.5 rounded-full bg-[#c4a47c]/15 border border-[#c4a47c]/40 text-[#e6caa2] text-xs font-semibold tracking-wider uppercase">
                <div className="w-4 h-4 rounded-full overflow-hidden border border-[#c4a47c] shrink-0">
                  <img src={BROOKS_LOGO_SRC} alt="Crest" className="w-full h-full object-cover" />
                </div>
                <span>The Media Ministry of Brooks of Life School of Ministry</span>
              </div>

              {/* Title */}
              <div className="space-y-2">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-extrabold tracking-tight text-white leading-tight">
                  BROOKS OF LIFE <br />
                  <span className="bg-gradient-to-r from-[#e6caa2] via-[#c4a47c] to-[#9b7e56] bg-clip-text text-transparent">
                    TELEVISION
                  </span>
                </h1>
                <p className="text-lg sm:text-xl font-serif italic text-[#c4a47c]/90">
                  “Teaching the Word. Transforming Lives. Reaching the Nations.”
                </p>
              </div>

              {/* Description */}
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
                Equipping God&apos;s people through biblical teaching, theological education, ministry training and Christian broadcasting—reaching learners, ministers, and viewers across the nations.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <button 
                  onClick={() => {
                    if (isLiveActive) {
                      const el = document.getElementById('hero-live-player-instance');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    } else {
                      setActiveVideoModal(featuredVideos[0]);
                    }
                  }}
                  className="px-6 py-3 rounded-lg bg-[#c4a47c] hover:bg-[#d5b791] text-[#0a0a0b] font-bold text-sm flex items-center space-x-2.5 shadow-lg shadow-amber-950/40 transition transform active:scale-95 cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>{isLiveActive ? 'WATCH LIVE STREAM' : 'WATCH RECENT SERMON'}</span>
                </button>

                <button 
                  onClick={() => {
                    if (isLiveActive) {
                      const el = document.getElementById('hero-live-player-instance');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    } else {
                      setActiveVideoModal(featuredVideos[0]);
                    }
                  }}
                  className={`px-6 py-3 rounded-lg font-bold text-sm flex items-center space-x-2 shadow-lg transition transform active:scale-95 cursor-pointer ${
                    isLiveActive 
                      ? 'bg-rose-600 hover:bg-rose-700 text-white shadow-rose-950/40' 
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-white/10'
                  }`}
                >
                  <Radio className={`w-4 h-4 ${isLiveActive ? 'animate-pulse' : ''}`} />
                  <span>{isLiveActive ? 'LIVE STREAMING' : 'OFF AIR (WATCH REPLAY)'}</span>
                </button>

                {isAdmin && (
                  <button 
                    onClick={toggleLiveBroadcast}
                    className={`px-5 py-3 rounded-lg font-semibold text-sm flex items-center space-x-2 border transition cursor-pointer ${
                      isLiveActive
                        ? 'bg-rose-950/80 hover:bg-rose-900 border-rose-600/60 text-rose-200'
                        : 'bg-emerald-950/80 hover:bg-emerald-900 border-emerald-600/60 text-emerald-200'
                    }`}
                    title="Admin: Toggle Live Broadcast Simulation"
                  >
                    <Power className="w-4 h-4" />
                    <span>Admin: {isLiveActive ? 'End Live Broadcast' : 'Go Live Now'}</span>
                  </button>
                )}

                <a 
                  href="https://www.youtube.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-5 py-3 rounded-lg bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold text-sm flex items-center space-x-2 transition"
                >
                  <Youtube className="w-4 h-4 text-red-500" />
                  <span>ON YOUTUBE</span>
                </a>
              </div>

              {/* Broadcast Badges */}
              <div className="pt-4 flex flex-wrap items-center gap-4 text-xs text-slate-400 border-t border-white/10">
                <div className="flex items-center space-x-1.5">
                  <Globe className="w-4 h-4 text-[#c4a47c]" />
                  <span>Global 24/7 Satellite & Digital</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <GraduationCap className="w-4 h-4 text-[#c4a47c]" />
                  <span>BLSM Academic Integration</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <Tv className="w-4 h-4 text-[#c4a47c]" />
                  <span>Full HD Christian Programming</span>
                </div>
              </div>

            </div>

            {/* Right Hero Column: Displays Live Video Player Instance when LIVE NOW, or Standby Preview when Off Air */}
            <div className="lg:col-span-5">
              {isLiveActive ? (
                /* ACTIVE LIVE VIDEO PLAYER INSTANCE */
                <div id="hero-live-player-instance" className="relative rounded-2xl overflow-hidden bg-black border-2 border-rose-500/70 shadow-2xl shadow-rose-950/60 ring-2 ring-rose-500/30 group">
                  {/* Top Live Studio Control Bar */}
                  <div className="bg-[#0f1118] px-3.5 py-2.5 border-b border-rose-500/40 flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping"></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500 -ml-4.5"></span>
                      <span className="font-mono font-bold text-rose-400 uppercase tracking-wider text-[11px]">
                        LIVE BROADCAST FEED • STUDIO A (LONDON)
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 text-[10px] font-mono">
                      <span className="px-1.5 py-0.5 rounded bg-rose-950/80 text-rose-300 border border-rose-800/60 font-bold">
                        ON AIR
                      </span>
                      <span className="text-emerald-400 font-bold">1080p60</span>
                      <span className="text-slate-400 hidden sm:inline">• 4.8 Mbps</span>
                    </div>
                  </div>

                  {/* Active Embedded Live Video Player Instance */}
                  <div className="relative aspect-video w-full bg-black">
                    <iframe
                      src={`https://www.youtube-nocookie.com/embed/${liveStreamId}?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1`}
                      title="Brooks of Life TV Live Broadcast"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="w-full h-full border-0"
                    ></iframe>
                  </div>

                  {/* Live Stream Details and Interactive Reactions Bar */}
                  <div className="p-4 bg-[#0e1118] space-y-3 border-t border-white/10">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="text-[10px] uppercase font-bold text-rose-400 font-mono">LIVE NOW</span>
                          <span className="text-slate-500 text-xs">•</span>
                          <span className="text-xs font-serif text-[#c4a47c] italic truncate max-w-[220px]">{liveScripture}</span>
                        </div>
                        <h4 className="font-serif font-bold text-white text-sm mt-0.5 line-clamp-1">
                          {liveProgramTitle}
                        </h4>
                        <p className="text-slate-400 text-xs mt-0.5">{liveSpeaker} ({liveSpeakerRole})</p>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="text-[10px] text-slate-400 font-mono uppercase">LIVE VIEWERS</div>
                        <div className="text-xs font-bold text-white font-mono flex items-center justify-end space-x-1">
                          <Users className="w-3 h-3 text-rose-400" />
                          <span>{liveViewerCount.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    {/* Viewer Reaction Buttons */}
                    <div className="flex items-center justify-between pt-2 border-t border-white/5 text-xs">
                      <div className="flex items-center space-x-1.5">
                        <button 
                          onClick={() => setAmenCount(c => c + 1)}
                          className="px-2.5 py-1 rounded bg-white/5 hover:bg-[#c4a47c]/20 hover:text-[#c4a47c] border border-white/10 text-slate-300 transition text-xs flex items-center space-x-1 cursor-pointer active:scale-95"
                          title="Click to send Amen"
                        >
                          <span>🙏 Amen</span>
                          <span className="font-mono text-[10px] text-slate-400">({amenCount})</span>
                        </button>
                        <button 
                          onClick={() => setBlessCount(c => c + 1)}
                          className="px-2.5 py-1 rounded bg-white/5 hover:bg-rose-500/20 hover:text-rose-300 border border-white/10 text-slate-300 transition text-xs flex items-center space-x-1 cursor-pointer active:scale-95"
                          title="Click to send Blessing"
                        >
                          <span>❤️ Bless</span>
                          <span className="font-mono text-[10px] text-slate-400">({blessCount})</span>
                        </button>
                        <button 
                          onClick={() => setFireCount(c => c + 1)}
                          className="px-2.5 py-1 rounded bg-white/5 hover:bg-amber-500/20 hover:text-amber-300 border border-white/10 text-slate-300 transition text-xs flex items-center space-x-1 cursor-pointer active:scale-95"
                          title="Click to send Holy Fire"
                        >
                          <span>🔥 Fire</span>
                          <span className="font-mono text-[10px] text-slate-400">({fireCount})</span>
                        </button>
                      </div>

                      <a 
                        href={`https://www.youtube.com/watch?v=${liveStreamId}`}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-[#c4a47c] hover:underline flex items-center space-x-1 text-[11px] font-semibold"
                      >
                        <span>YouTube Live</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              ) : (
                /* STANDBY / OFF AIR HERO SLATE */
                <div className="relative rounded-2xl overflow-hidden bg-slate-900 border border-white/15 shadow-2xl group">
                  {/* Video Preview Image with Off Air Screen */}
                  <div className="relative aspect-video w-full overflow-hidden bg-black">
                    <img 
                      src={featuredVideos[0].thumbnail} 
                      alt={featuredVideos[0].title}
                      className="w-full h-full object-cover opacity-40 filter grayscale-[40%]"
                    />
                    
                    {/* Standby Dark Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/75 to-black/40"></div>

                    {/* Standby Content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center space-y-3">
                      <div className="p-3.5 rounded-full bg-slate-800/90 border border-white/20 text-slate-300 shadow-xl">
                        <Tv className="w-8 h-8 text-amber-400" />
                      </div>
                      <div>
                        <span className="px-2.5 py-1 rounded bg-amber-500/20 border border-amber-500/40 text-amber-300 font-bold text-[10px] uppercase tracking-wider font-mono">
                          STANDBY • NEXT TRANSMISSION AT 14:00 GMT
                        </span>
                        <h3 className="text-base font-serif font-bold text-white mt-1.5">
                          Brooks of Life TV is Currently Off Air
                        </h3>
                        <p className="text-xs text-slate-300 max-w-xs mt-1">
                          Live transmission has concluded. Explore the on-demand library below or watch recorded sermons.
                        </p>
                      </div>

                      {isAdmin ? (
                        <button
                          onClick={toggleLiveBroadcast}
                          className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider flex items-center space-x-1.5 shadow-lg shadow-emerald-950 transition cursor-pointer"
                        >
                          <Radio className="w-3.5 h-3.5" />
                          <span>Admin: Start Live Broadcast</span>
                        </button>
                      ) : (
                        <button 
                          onClick={() => setActiveVideoModal(featuredVideos[0])}
                          className="px-4 py-2 rounded-lg bg-[#c4a47c] text-[#0a0a0b] font-bold text-xs flex items-center space-x-1.5 hover:bg-[#d5b791] transition cursor-pointer"
                        >
                          <Play className="w-3.5 h-3.5 fill-current" />
                          <span>Watch Recorded Sermon Replay</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Sub-card live info */}
                  <div className="p-4 bg-[#0e1118] space-y-2 border-t border-white/10">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400">Next Scheduled Program:</span>
                      <span className="font-semibold text-white">Ministry Leadership: Pastoral Administration</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400">Transmission Time:</span>
                      <span className="text-[#c4a47c] font-medium">14:00 GMT (London UK Time)</span>
                    </div>
                    <div className="flex items-center justify-between pt-1">
                      <button 
                        onClick={() => setActiveVideoModal(featuredVideos[0])}
                        className="text-xs text-[#c4a47c] hover:underline font-medium flex items-center space-x-1 cursor-pointer"
                      >
                        <span>Open Featured Recorded Video</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-[11px] text-slate-500 font-mono">
                        Channel 1 Standby
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* DAILY PROGRAMMING SCHEDULE TICKER / BAR */}
      <section className="border-b border-white/10 bg-[#0d0f14] py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded bg-amber-500/10 text-[#c4a47c] border border-amber-500/20">
                <Calendar className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-serif text-sm font-bold text-white uppercase tracking-wider">
                  Brooks of Life TV Daily Broadcast Schedule
                </h3>
                <p className="text-xs text-slate-400">
                  Program times displayed in GMT / London UK Time • Re-streamed 24/7 globally
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2 text-xs">
              <span className="flex items-center space-x-1 text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="font-semibold">ON NOW</span>
              </span>
              <span className="text-slate-500">•</span>
              <span className="text-slate-400 font-semibold">UP NEXT: 14:00 GMT</span>
            </div>
          </div>

          {/* Schedule Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {dailySchedule.slice(0, 4).map((prog, idx) => (
              <div 
                key={idx}
                className={`p-3.5 rounded-lg border text-xs transition ${
                  prog.status === 'live' 
                    ? 'bg-rose-950/30 border-rose-600/50 shadow-md shadow-rose-950/40 ring-1 ring-rose-500/30' 
                    : 'bg-[#14161d] border-white/10 hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-mono text-[11px] font-bold text-[#c4a47c]">{prog.time}</span>
                  {prog.status === 'live' && (
                    <span className="px-1.5 py-0.5 rounded bg-rose-600 text-white font-bold text-[9px] uppercase tracking-wider">
                      LIVE NOW
                    </span>
                  )}
                  {prog.status === 'completed' && (
                    <span className="text-slate-500 text-[10px]">REPLAY</span>
                  )}
                  {prog.status === 'upcoming' && (
                    <span className="text-slate-400 text-[10px]">COMING UP</span>
                  )}
                </div>
                <h4 className="font-serif font-bold text-white line-clamp-1">{prog.title}</h4>
                <p className="text-slate-400 text-[11px] mt-0.5 truncate">{prog.speaker}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VIDEO LIBRARY & CATEGORY EXPLORER */}
      <section id="tv-library-grid" className="container mx-auto px-4 py-12 space-y-8">
        
        {/* Section Title & Search */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <span className="text-xs font-bold uppercase tracking-widest text-[#c4a47c]">
              Digital Broadcast Catalog
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
              Explore Broadcasts & Theological Lectures
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Access sermons, in-depth Bible studies, School of Ministry academic classes, and leadership conferences on demand.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input 
              type="text"
              placeholder="Search sermons, teachers, scriptures..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[#14161d] border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-[#c4a47c] transition"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Category Pills Slider */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-thin">
          <Filter className="w-4 h-4 text-slate-500 shrink-0 ml-1 mr-2" />
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#c4a47c] text-[#0a0a0b] font-bold shadow-md shadow-amber-950/30'
                  : 'bg-[#14161d] text-slate-300 hover:bg-[#1a1d26] border border-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Video Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map(vid => {
            const isBookmarked = bookmarkedIds.includes(vid.id);
            return (
              <div 
                key={vid.id}
                onClick={() => setActiveVideoModal(vid)}
                className="group bg-[#12141a] rounded-xl border border-white/10 hover:border-[#c4a47c]/50 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-black/50 cursor-pointer flex flex-col"
              >
                {/* Thumbnail Stage */}
                <div className="relative aspect-video w-full overflow-hidden bg-black">
                  <img 
                    src={vid.thumbnail} 
                    alt={vid.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30"></div>

                  {/* Top Badges */}
                  <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-[#c4a47c] font-semibold text-[10px] uppercase tracking-wider border border-white/10">
                      {vid.category}
                    </span>

                    <button
                      onClick={(e) => toggleBookmark(vid.id, e)}
                      className={`p-1.5 rounded-full backdrop-blur-md transition ${
                        isBookmarked ? 'bg-[#c4a47c] text-black' : 'bg-black/60 text-white hover:bg-black'
                      }`}
                      title="Save to Watch Later"
                    >
                      <Bookmark className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Center Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-12 h-12 rounded-full bg-[#c4a47c] text-[#0a0a0b] flex items-center justify-center shadow-lg">
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    </div>
                  </div>

                  {/* Bottom Duration & Views Badge */}
                  <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between text-[11px] font-mono text-slate-300">
                    <span className="flex items-center space-x-1 bg-black/60 px-1.5 py-0.5 rounded">
                      <Clock className="w-3 h-3 text-[#c4a47c]" />
                      <span>{vid.duration}</span>
                    </span>
                    <span className="bg-black/60 px-1.5 py-0.5 rounded">
                      {vid.views} views
                    </span>
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-1.5">
                    {vid.isRequiredForSchool && (
                      <span className="inline-block px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20 text-[10px] font-medium uppercase tracking-wider">
                        BLSM Course Study Resource
                      </span>
                    )}
                    <h3 className="font-serif font-bold text-white text-base group-hover:text-[#c4a47c] transition-colors line-clamp-2">
                      {vid.title}
                    </h3>
                    <p className="text-slate-400 text-xs line-clamp-2 leading-relaxed">
                      {vid.description}
                    </p>
                  </div>

                  {/* Speaker & Scripture */}
                  <div className="pt-2 border-t border-white/5 space-y-1.5 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Teacher:</span>
                      <span className="text-slate-200 font-medium truncate max-w-[170px]">{vid.speaker}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Text:</span>
                      <span className="text-[#c4a47c] font-serif italic truncate max-w-[170px]">{vid.scriptureReference}</span>
                    </div>
                  </div>

                  {/* Quick Watch & External Action */}
                  <div className="pt-2 flex items-center justify-between">
                    <button 
                      onClick={() => setActiveVideoModal(vid)}
                      className="text-xs font-bold text-[#c4a47c] hover:underline flex items-center space-x-1"
                    >
                      <Play className="w-3 h-3 fill-current" />
                      <span>Watch Here</span>
                    </button>

                    <a 
                      href={`https://www.youtube.com/watch?v=${vid.youtubeId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-[11px] text-slate-400 hover:text-red-400 flex items-center space-x-1"
                    >
                      <Youtube className="w-3.5 h-3.5" />
                      <span>YouTube</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredVideos.length === 0 && (
          <div className="text-center py-16 bg-[#12141a] rounded-2xl border border-white/10 space-y-3">
            <Tv className="w-12 h-12 text-slate-600 mx-auto" />
            <h3 className="font-serif text-lg text-white font-bold">No Broadcasts Found</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              No programs matched &ldquo;{searchQuery}&rdquo; in category &ldquo;{selectedCategory}&rdquo;. Try clearing your filters.
            </p>
            <button 
              onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
              className="px-4 py-1.5 rounded bg-[#c4a47c] text-black text-xs font-bold"
            >
              Reset Filters
            </button>
          </div>
        )}

      </section>

      {/* YOUTUBE CHANNEL OFFICIAL CONNECTION BANNER */}
      <section className="container mx-auto px-4 py-8">
        <div className="rounded-2xl bg-gradient-to-r from-red-950/40 via-[#161820] to-slate-900 border border-red-500/20 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-2xl bg-red-600 flex items-center justify-center text-white shrink-0 shadow-lg shadow-red-950/50">
              <Youtube className="w-9 h-9" />
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-bold tracking-widest text-red-400 uppercase font-mono">
                Official Broadcast Channel
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
                Subscribe to Brooks of Life TV on YouTube
              </h3>
              <p className="text-xs sm:text-sm text-slate-300">
                Join thousands of believers worldwide. Receive notifications for new sermons, live streams, and theology seminars.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3 shrink-0">
            <a 
              href="https://www.youtube.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm flex items-center space-x-2 shadow-lg transition"
            >
              <Youtube className="w-4 h-4" />
              <span>SUBSCRIBE NOW</span>
            </a>
          </div>
        </div>
      </section>

      {/* GLOBAL REACH - FROM CLASSROOM TO NATIONS */}
      <section className="container mx-auto px-4 py-12">
        <div className="bg-[#0e1118] rounded-2xl border border-white/10 p-8 text-center space-y-6">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold uppercase tracking-wider">
            <Globe className="w-3.5 h-3.5" />
            <span>Reaching the Nations</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white max-w-2xl mx-auto">
            “From the classroom to the nations, Brooks of Life School of Ministry is equipping God&apos;s people through biblical education and digital ministry.”
          </h2>

          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs font-semibold text-[#c4a47c]">
            {['Africa', 'North America', 'Europe', 'Asia', 'Middle East', 'Australia', 'Caribbean', 'Latin America'].map((region, i) => (
              <span key={i} className="px-3 py-1.5 rounded-md bg-[#161822] border border-white/10">
                {region}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CALL TO ACTION: WATCH. LEARN. GROW. SERVE. */}
      <section className="container mx-auto px-4 pt-4">
        <div className="rounded-2xl bg-gradient-to-b from-[#181b24] to-[#0f1117] border border-[#c4a47c]/30 p-8 sm:p-12 text-center space-y-6 shadow-2xl">
          <div className="w-16 h-16 rounded-2xl overflow-hidden bg-black mx-auto border border-[#c4a47c] p-0.5 shadow-xl">
            <img src={BROOKS_LOGO_SRC} alt="Crest" className="w-full h-full object-cover rounded-xl" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold tracking-widest text-[#c4a47c] uppercase font-mono">
              Academic & Ministry Advancement
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-white">
              WATCH. LEARN. GROW. SERVE.
            </h2>
            <p className="text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
              Watch Brooks of Life TV. Study with Brooks of Life School of Ministry. Grow in God&apos;s Word. Serve your generation.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button 
              onClick={() => {
                const el = document.getElementById('tv-library-grid');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-6 py-3 rounded-lg bg-[#c4a47c] text-[#0a0a0b] font-bold text-xs sm:text-sm hover:bg-[#d5b791] transition cursor-pointer"
            >
              WATCH BROOKS OF LIFE TV
            </button>
            <button 
              onClick={() => navigateTo('admissions')}
              className="px-6 py-3 rounded-lg bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold text-xs sm:text-sm transition cursor-pointer"
            >
              ENROLL IN SCHOOL OF MINISTRY
            </button>
            <button 
              onClick={() => navigateTo('programs')}
              className="px-6 py-3 rounded-lg text-slate-300 hover:text-white border border-transparent hover:border-white/10 font-medium text-xs sm:text-sm transition cursor-pointer"
            >
              View Accredited Degrees
            </button>
          </div>
        </div>
      </section>

      {/* EMBEDDED MODAL VIDEO PLAYER */}
      {activeVideoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-6 animate-in fade-in">
          <div className="bg-[#0f1118] border border-[#c4a47c]/40 rounded-2xl w-full max-w-4xl max-h-[95vh] overflow-hidden flex flex-col shadow-2xl">
            
            {/* Modal Header */}
            <div className="px-5 py-3.5 bg-[#141620] border-b border-white/10 flex items-center justify-between text-xs">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping"></span>
                <span className="font-serif font-bold text-white uppercase tracking-wider">
                  Brooks of Life TV Studio • {activeVideoModal.category}
                </span>
              </div>
              <button 
                onClick={() => setActiveVideoModal(null)}
                className="p-1 rounded text-slate-400 hover:text-white hover:bg-white/10 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Player Frame */}
            <div className="relative aspect-video w-full bg-black">
              <iframe 
                src={`https://www.youtube-nocookie.com/embed/${activeVideoModal.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                title={activeVideoModal.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full border-0"
              ></iframe>
            </div>

            {/* Video Metadata & Controls */}
            <div className="p-5 overflow-y-auto space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-[11px] font-mono text-[#c4a47c] font-semibold uppercase">
                    {activeVideoModal.speakerRole}
                  </span>
                  <h2 className="font-serif text-lg sm:text-xl font-bold text-white">
                    {activeVideoModal.title}
                  </h2>
                  <p className="text-xs text-[#c4a47c] font-serif italic">
                    Scripture Anchor: {activeVideoModal.scriptureReference}
                  </p>
                </div>

                <div className="flex items-center space-x-2 shrink-0">
                  <button 
                    onClick={(e) => handleShare(activeVideoModal, e)}
                    className="px-3 py-1.5 rounded bg-white/10 hover:bg-white/20 text-xs text-white font-medium flex items-center space-x-1.5 transition"
                  >
                    {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
                    <span>{copiedLink ? 'Copied' : 'Share'}</span>
                  </button>

                  <a 
                    href={`https://www.youtube.com/watch?v=${activeVideoModal.youtubeId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded bg-red-600 hover:bg-red-700 text-xs text-white font-bold flex items-center space-x-1.5 transition"
                  >
                    <Youtube className="w-3.5 h-3.5" />
                    <span>Watch on YouTube</span>
                  </a>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {activeVideoModal.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/10">
                {activeVideoModal.tags.map((tag, i) => (
                  <span key={i} className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] text-slate-400">
                    #{tag}
                  </span>
                ))}
              </div>

              {/* School of Ministry Context */}
              {activeVideoModal.isRequiredForSchool && (
                <div className="p-3.5 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-2.5 text-amber-200">
                    <GraduationCap className="w-4 h-4 text-[#c4a47c] shrink-0" />
                    <span>This lecture is part of the BLSM Certificate & Diploma curriculum.</span>
                  </div>
                  <button 
                    onClick={() => {
                      setActiveVideoModal(null);
                      navigateTo('programs');
                    }}
                    className="px-3 py-1 rounded bg-[#c4a47c] text-black font-bold text-[11px] shrink-0 hover:bg-[#d5b791]"
                  >
                    Enroll in Course
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
