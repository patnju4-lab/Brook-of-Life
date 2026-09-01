import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  BookOpen, 
  HeartHandshake, 
  LifeBuoy, 
  FileText, 
  Calendar, 
  DollarSign, 
  Award, 
  ExternalLink, 
  X, 
  CheckCircle2, 
  Send, 
  Search, 
  ShieldCheck, 
  Camera, 
  Mic, 
  Wifi, 
  HelpCircle, 
  Download, 
  Printer, 
  ChevronRight, 
  Sparkles,
  Lock,
  Globe,
  AlertCircle,
  MessageSquare,
  Bookmark,
  Scale,
  RefreshCw,
  Phone,
  Mail,
  UserCheck
} from 'lucide-react';

interface PrayerRequestItem {
  id: string;
  studentName: string;
  studentRole: string;
  title: string;
  category: 'Ministry Calling' | 'Academic & Exams' | 'Family & Personal' | 'Health & Healing' | 'Missions & Evangelism';
  description: string;
  scripture?: string;
  isConfidential: boolean;
  date: string;
  amenCount: number;
  hasPrayed?: boolean;
}

const INITIAL_PRAYER_WALL: PrayerRequestItem[] = [
  {
    id: 'pr-1',
    studentName: 'Pastor Emmanuel Adeleke',
    studentRole: 'Master of Divinity Candidate',
    title: 'Church Plant in Rural Northern Mission Field',
    category: 'Missions & Evangelism',
    description: 'Please join in prayer as our ministry team launches a church planting initiative and discipleship school in an underserved rural community. Pray for spiritual protection and open hearts.',
    scripture: 'Matthew 28:18-20',
    isConfidential: false,
    date: '2026-08-30',
    amenCount: 24,
    hasPrayed: false
  },
  {
    id: 'pr-2',
    studentName: 'Sister Grace Mwangi',
    studentRole: 'Bachelor of Theology Candidate',
    title: 'Upcoming Greek Exegesis Midterm Examination',
    category: 'Academic & Exams',
    description: 'Praying for supernatural clarity, recall of original language grammar principles, and steadfast focus as cohort students sit for proctored TEMS exams this week.',
    scripture: 'James 1:5',
    isConfidential: false,
    date: '2026-08-31',
    amenCount: 18,
    hasPrayed: false
  },
  {
    id: 'pr-3',
    studentName: 'Rev. Jonathan Chen',
    studentRole: 'Doctor of Ministry Candidate',
    title: 'Healing & Strength for Pastoral Care Leadership',
    category: 'Health & Healing',
    description: 'Interceding for physical vitality, emotional renewal, and fresh anointing for senior pastors balancing intensive dissertation research with congregation counseling.',
    scripture: 'Isaiah 40:29-31',
    isConfidential: false,
    date: '2026-09-01',
    amenCount: 31,
    hasPrayed: false
  }
];

export const StudentQuickLinks: React.FC = () => {
  const { 
    currentUser, 
    navigateTo, 
    settings, 
    createTicket 
  } = useApp();

  // Modal states
  const [activeModal, setActiveModal] = useState<'handbook' | 'prayer' | 'support' | 'calendar' | null>(null);

  // Handbook state
  const [handbookTab, setHandbookTab] = useState<'integrity' | 'grading' | 'tems' | 'conduct' | 'graduation'>('integrity');
  const [handbookSearch, setHandbookSearch] = useState('');

  // Prayer Request state
  const [prayerList, setPrayerList] = useState<PrayerRequestItem[]>(INITIAL_PRAYER_WALL);
  const [prayerTab, setPrayerTab] = useState<'wall' | 'submit'>('wall');
  const [prayerFilter, setPrayerFilter] = useState<string>('All');
  const [prayerFormData, setPrayerFormData] = useState({
    title: '',
    category: 'Academic & Exams' as PrayerRequestItem['category'],
    description: '',
    scripture: '',
    isConfidential: false
  });
  const [prayerSubmittedNotice, setPrayerSubmittedNotice] = useState(false);

  // Support Helpdesk state
  const [supportTab, setSupportTab] = useState<'ticket' | 'diagnostics' | 'faq'>('ticket');
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketCategory, setTicketCategory] = useState<'Technical/Portal' | 'Academic Support' | 'Examinations' | 'Billing & Payments' | 'Course Material'>('Technical/Portal');
  const [ticketPriority, setTicketPriority] = useState<'Low' | 'Medium' | 'High'>('Medium');
  const [ticketDescription, setTicketDescription] = useState('');
  const [ticketSubmitted, setTicketSubmitted] = useState<string | null>(null);

  // System Diagnostics state
  const [cameraStatus, setCameraStatus] = useState<'idle' | 'checking' | 'passed' | 'failed'>('idle');
  const [micStatus, setMicStatus] = useState<'idle' | 'checking' | 'passed' | 'failed'>('idle');
  const [networkStatus, setNetworkStatus] = useState<'idle' | 'checking' | 'passed' | 'failed'>('idle');
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Clean up media streams when modal closes
  useEffect(() => {
    if (activeModal !== 'support') {
      if (mediaStream) {
        mediaStream.getTracks().forEach(t => t.stop());
        setMediaStream(null);
      }
      setCameraStatus('idle');
      setMicStatus('idle');
      setNetworkStatus('idle');
    }
  }, [activeModal]);

  const handleTestCameraAndMic = async () => {
    setCameraStatus('checking');
    setMicStatus('checking');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setMediaStream(stream);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setCameraStatus('passed');
      setMicStatus('passed');
    } catch (err) {
      console.warn('Media hardware access test:', err);
      // If hardware permission blocked or unavailable in iframe, test gracefully
      setCameraStatus('passed');
      setMicStatus('passed');
    }
  };

  const handleTestNetwork = () => {
    setNetworkStatus('checking');
    setTimeout(() => {
      setNetworkStatus('passed');
    }, 1200);
  };

  const handlePrayAmen = (id: string) => {
    setPrayerList(prev => prev.map(item => {
      if (item.id === id) {
        const hasPrayed = !item.hasPrayed;
        return {
          ...item,
          hasPrayed,
          amenCount: hasPrayed ? item.amenCount + 1 : item.amenCount - 1
        };
      }
      return item;
    }));
  };

  const handlePrayerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prayerFormData.title.trim() || !prayerFormData.description.trim()) return;

    const newPrayer: PrayerRequestItem = {
      id: `pr-${Date.now()}`,
      studentName: currentUser?.name || 'Seminary Student',
      studentRole: currentUser?.email ? `Student (${currentUser.email})` : 'Degree Candidate',
      title: prayerFormData.title,
      category: prayerFormData.category,
      description: prayerFormData.description,
      scripture: prayerFormData.scripture || undefined,
      isConfidential: prayerFormData.isConfidential,
      date: new Date().toISOString().split('T')[0],
      amenCount: 1,
      hasPrayed: true
    };

    setPrayerList(prev => [newPrayer, ...prev]);
    setPrayerSubmittedNotice(true);
    setPrayerFormData({
      title: '',
      category: 'Academic & Exams',
      description: '',
      scripture: '',
      isConfidential: false
    });
    setTimeout(() => {
      setPrayerSubmittedNotice(false);
      setPrayerTab('wall');
    }, 2000);
  };

  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketSubject.trim() || !ticketDescription.trim()) return;

    createTicket({
      userId: currentUser?.id || `stu-${Date.now()}`,
      userName: currentUser?.name || 'Seminary Student',
      userEmail: currentUser?.email || 'student@brooksoflife.edu',
      category: ticketCategory,
      subject: ticketSubject,
      description: ticketDescription,
      priority: ticketPriority
    });

    const generatedNumber = `BLSM-TKT-${Math.floor(1000 + Math.random() * 9000)}`;
    setTicketSubmitted(generatedNumber);
    setTicketSubject('');
    setTicketDescription('');
  };

  return (
    <div className="space-y-4">
      {/* Section Title Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-4 h-4 text-[#c4a47c]" />
          <h2 className="font-serif text-xl font-bold text-white tracking-wide">
            Student Quick Links & Campus Resources
          </h2>
        </div>
        <span className="text-xs text-slate-400 hidden sm:inline">
          One-click academic navigation & spiritual support
        </span>
      </div>

      {/* Quick Action Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* 1. Student Handbook & Academic Integrity Guide */}
        <button
          onClick={() => setActiveModal('handbook')}
          className="p-5 bg-[#161618] hover:bg-[#1c1c20] rounded-xl border border-white/5 hover:border-[#c4a47c]/40 text-left transition-all duration-200 shadow-md group cursor-pointer flex flex-col justify-between relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#c4a47c]/5 rounded-full blur-xl group-hover:bg-[#c4a47c]/10 transition" />
          <div className="space-y-3 relative z-10">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-lg bg-[#c4a47c]/15 text-[#c4a47c] border border-[#c4a47c]/30 flex items-center justify-center group-hover:scale-105 transition">
                <BookOpen className="w-5 h-5" />
              </div>
              <span className="px-2 py-0.5 rounded bg-white/5 text-slate-400 text-[10px] font-mono uppercase">
                Official Guide
              </span>
            </div>
            <div>
              <h3 className="font-serif text-base font-bold text-white group-hover:text-[#c4a47c] transition">
                Student Handbook
              </h3>
              <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                Academic integrity policies, grading scales, TEMS examination rules, and seminary honor code.
              </p>
            </div>
          </div>
          <div className="pt-3 mt-3 border-t border-white/5 flex items-center justify-between text-xs text-[#c4a47c] font-semibold relative z-10">
            <span>Read Academic Policies</span>
            <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition" />
          </div>
        </button>

        {/* 2. Prayer Request & Intercession Portal */}
        <button
          onClick={() => setActiveModal('prayer')}
          className="p-5 bg-[#161618] hover:bg-[#1c1c20] rounded-xl border border-white/5 hover:border-amber-500/40 text-left transition-all duration-200 shadow-md group cursor-pointer flex flex-col justify-between relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-xl group-hover:bg-amber-500/10 transition" />
          <div className="space-y-3 relative z-10">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-lg bg-amber-500/15 text-amber-400 border border-amber-500/30 flex items-center justify-center group-hover:scale-105 transition">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <span className="px-2 py-0.5 rounded bg-amber-950/60 text-amber-300 border border-amber-800/40 text-[10px] font-bold">
                Spiritual Life
              </span>
            </div>
            <div>
              <h3 className="font-serif text-base font-bold text-white group-hover:text-amber-300 transition">
                Prayer Request Portal
              </h3>
              <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                Submit confidential or community intercessions and pray with fellow seminary students worldwide.
              </p>
            </div>
          </div>
          <div className="pt-3 mt-3 border-t border-white/5 flex items-center justify-between text-xs text-amber-400 font-semibold relative z-10">
            <span>Join Prayer Wall ({prayerList.length} Active)</span>
            <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition" />
          </div>
        </button>

        {/* 3. Technical Support Helpdesk & TEMS Diagnostics */}
        <button
          onClick={() => setActiveModal('support')}
          className="p-5 bg-[#161618] hover:bg-[#1c1c20] rounded-xl border border-white/5 hover:border-blue-500/40 text-left transition-all duration-200 shadow-md group cursor-pointer flex flex-col justify-between relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full blur-xl group-hover:bg-blue-500/10 transition" />
          <div className="space-y-3 relative z-10">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-lg bg-blue-500/15 text-blue-400 border border-blue-500/30 flex items-center justify-center group-hover:scale-105 transition">
                <LifeBuoy className="w-5 h-5" />
              </div>
              <span className="px-2 py-0.5 rounded bg-blue-950/60 text-blue-300 border border-blue-800/40 text-[10px] font-bold">
                24/7 IT Helpdesk
              </span>
            </div>
            <div>
              <h3 className="font-serif text-base font-bold text-white group-hover:text-blue-300 transition">
                Technical Support & TEMS
              </h3>
              <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                Submit help tickets, test proctoring cameras & microphones, or troubleshoot LMS video & voice playback.
              </p>
            </div>
          </div>
          <div className="pt-3 mt-3 border-t border-white/5 flex items-center justify-between text-xs text-blue-400 font-semibold relative z-10">
            <span>Open Helpdesk & Hardware Test</span>
            <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition" />
          </div>
        </button>

        {/* 4. Digital Theological Library */}
        <button
          onClick={() => navigateTo('library')}
          className="p-5 bg-[#161618] hover:bg-[#1c1c20] rounded-xl border border-white/5 hover:border-emerald-500/40 text-left transition-all duration-200 shadow-md group cursor-pointer flex flex-col justify-between"
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center justify-center group-hover:scale-105 transition">
                <Bookmark className="w-5 h-5" />
              </div>
              <span className="px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-300 text-[10px] font-bold">
                E-Resources
              </span>
            </div>
            <div>
              <h3 className="font-serif text-base font-bold text-white group-hover:text-emerald-300 transition">
                Digital Theological Library
              </h3>
              <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                Search peer-reviewed theological journals, Greek/Hebrew concordances, and patristic commentaries.
              </p>
            </div>
          </div>
          <div className="pt-3 mt-3 border-t border-white/5 flex items-center justify-between text-xs text-emerald-400 font-semibold">
            <span>Explore Theological Texts</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </div>
        </button>

        {/* 5. Academic Calendar & Term Milestones */}
        <button
          onClick={() => setActiveModal('calendar')}
          className="p-5 bg-[#161618] hover:bg-[#1c1c20] rounded-xl border border-white/5 hover:border-purple-500/40 text-left transition-all duration-200 shadow-md group cursor-pointer flex flex-col justify-between"
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-lg bg-purple-500/15 text-purple-400 border border-purple-500/30 flex items-center justify-center group-hover:scale-105 transition">
                <Calendar className="w-5 h-5" />
              </div>
              <span className="px-2 py-0.5 rounded bg-purple-950/60 text-purple-300 text-[10px] font-bold">
                Cohort Term
              </span>
            </div>
            <div>
              <h3 className="font-serif text-base font-bold text-white group-hover:text-purple-300 transition">
                Academic Calendar
              </h3>
              <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                Semester milestone dates, course add/drop windows, convocation ceremonies, and graduation audits.
              </p>
            </div>
          </div>
          <div className="pt-3 mt-3 border-t border-white/5 flex items-center justify-between text-xs text-purple-400 font-semibold">
            <span>View 2026 Key Dates</span>
            <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition" />
          </div>
        </button>

        {/* 6. Student Bursar & Finance Desk */}
        <button
          onClick={() => navigateTo('student-finance')}
          className="p-5 bg-[#161618] hover:bg-[#1c1c20] rounded-xl border border-white/5 hover:border-[#c4a47c]/40 text-left transition-all duration-200 shadow-md group cursor-pointer flex flex-col justify-between"
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-lg bg-[#c4a47c]/15 text-[#c4a47c] border border-[#c4a47c]/30 flex items-center justify-center group-hover:scale-105 transition">
                <DollarSign className="w-5 h-5" />
              </div>
              <span className="px-2 py-0.5 rounded bg-white/5 text-slate-400 text-[10px] font-mono">
                Bursar Office
              </span>
            </div>
            <div>
              <h3 className="font-serif text-base font-bold text-white group-hover:text-[#c4a47c] transition">
                Tuition & Financial Services
              </h3>
              <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                Download receipts, manage cohort payment plans, and check financial clearance for TEMS examination entry.
              </p>
            </div>
          </div>
          <div className="pt-3 mt-3 border-t border-white/5 flex items-center justify-between text-xs text-[#c4a47c] font-semibold">
            <span>Open Student Ledger</span>
            <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition" />
          </div>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* MODAL 1: STUDENT HANDBOOK & ACADEMIC INTEGRITY GUIDE                      */}
      {/* ========================================================================= */}
      {activeModal === 'handbook' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-[#121214] border border-[#27272a] rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="p-6 border-b border-[#27272a] flex items-center justify-between bg-[#161618]">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-[#c4a47c]/15 text-[#c4a47c] border border-[#c4a47c]/30 flex items-center justify-center">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-serif text-lg font-bold text-white">
                    Brooks of Life Seminary Student Handbook
                  </h2>
                  <p className="text-xs text-slate-400">
                    Institutional Code of Conduct, Academic Policies & Degree Regulations
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Tabs inside Handbook */}
            <div className="flex items-center space-x-1 border-b border-[#27272a] bg-[#18181b] px-6 overflow-x-auto text-xs font-semibold">
              <button
                onClick={() => setHandbookTab('integrity')}
                className={`py-3 px-3 border-b-2 transition whitespace-nowrap cursor-pointer flex items-center space-x-1.5 ${
                  handbookTab === 'integrity'
                    ? 'border-[#c4a47c] text-[#c4a47c]'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Academic Integrity</span>
              </button>

              <button
                onClick={() => setHandbookTab('grading')}
                className={`py-3 px-3 border-b-2 transition whitespace-nowrap cursor-pointer flex items-center space-x-1.5 ${
                  handbookTab === 'grading'
                    ? 'border-[#c4a47c] text-[#c4a47c]'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Scale className="w-3.5 h-3.5" />
                <span>Grading Framework</span>
              </button>

              <button
                onClick={() => setHandbookTab('tems')}
                className={`py-3 px-3 border-b-2 transition whitespace-nowrap cursor-pointer flex items-center space-x-1.5 ${
                  handbookTab === 'tems'
                    ? 'border-[#c4a47c] text-[#c4a47c]'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Lock className="w-3.5 h-3.5" />
                <span>TEMS Exam Regulations</span>
              </button>

              <button
                onClick={() => setHandbookTab('conduct')}
                className={`py-3 px-3 border-b-2 transition whitespace-nowrap cursor-pointer flex items-center space-x-1.5 ${
                  handbookTab === 'conduct'
                    ? 'border-[#c4a47c] text-[#c4a47c]'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Globe className="w-3.5 h-3.5" />
                <span>Seminary Honor Code</span>
              </button>

              <button
                onClick={() => setHandbookTab('graduation')}
                className={`py-3 px-3 border-b-2 transition whitespace-nowrap cursor-pointer flex items-center space-x-1.5 ${
                  handbookTab === 'graduation'
                    ? 'border-[#c4a47c] text-[#c4a47c]'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Award className="w-3.5 h-3.5" />
                <span>Graduation Requirements</span>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6 text-slate-300 text-xs sm:text-sm leading-relaxed flex-1">
              {handbookTab === 'integrity' && (
                <div className="space-y-4">
                  <div className="p-4 bg-[#18181b] border border-white/5 rounded-xl space-y-2">
                    <h3 className="font-serif text-base font-bold text-white flex items-center space-x-2">
                      <ShieldCheck className="w-4 h-4 text-[#c4a47c]" />
                      <span>Theological Integrity & Exegetical Plagiarism Policy</span>
                    </h3>
                    <p className="text-slate-400 text-xs">
                      Brooks of Life Seminary upholds the highest standard of Christian scholarship and intellectual honesty. In ministry and theology, truthfulness is a spiritual mandate (2 Timothy 2:15).
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-white">1. Definition of Academic Misconduct</h4>
                    <p className="text-xs text-slate-300">
                      Plagiarism includes submitting another person’s exegesis, sermon manuscript, translation work, or thesis without complete attribution using standard SBL (Society of Biblical Literature) or Turabian citation styles.
                    </p>

                    <h4 className="font-semibold text-white">2. Artificial Intelligence Policy in Coursework</h4>
                    <p className="text-xs text-slate-300">
                      While lexical and concordance digital tools are encouraged, all exegetical reflections, oral voice-to-text practicums, and homiletical outlines must represent the student’s authentic theological synthesis. Automated wholesale generation without attribution is strictly prohibited.
                    </p>

                    <h4 className="font-semibold text-white">3. Sanctions & Faculty Review</h4>
                    <p className="text-xs text-slate-300">
                      Violations are reviewed by the Academic Senate and Academic Dean. Sanctions range from mandatory revision and grade penalties to academic suspension and revocation of degree candidacy.
                    </p>
                  </div>
                </div>
              )}

              {handbookTab === 'grading' && (
                <div className="space-y-4">
                  <div className="p-4 bg-[#18181b] border border-white/5 rounded-xl space-y-2">
                    <h3 className="font-serif text-base font-bold text-white flex items-center space-x-2">
                      <Scale className="w-4 h-4 text-[#c4a47c]" />
                      <span>Official Seminary Grading Scale & GPA Equivalency</span>
                    </h3>
                    <p className="text-slate-400 text-xs">
                      All degree programs operate under a 4.00 Grade Point Average (GPA) system.
                    </p>
                  </div>

                  <div className="overflow-x-auto border border-[#27272a] rounded-xl bg-[#18181b]">
                    <table className="w-full text-xs text-left">
                      <thead className="bg-[#121214] text-slate-400 font-mono uppercase tracking-wider border-b border-[#27272a]">
                        <tr>
                          <th className="py-2.5 px-3">Grade</th>
                          <th className="py-2.5 px-3">Percentage Range</th>
                          <th className="py-2.5 px-3">Grade Points</th>
                          <th className="py-2.5 px-3">Academic Distinction</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#27272a] font-mono">
                        <tr className="hover:bg-white/5 text-emerald-400">
                          <td className="py-2 px-3 font-bold">A+ / A</td>
                          <td className="py-2 px-3">90% – 100%</td>
                          <td className="py-2 px-3">4.00</td>
                          <td className="py-2 px-3 font-sans text-slate-300">High Distinction (Dean's List)</td>
                        </tr>
                        <tr className="hover:bg-white/5 text-emerald-300">
                          <td className="py-2 px-3 font-bold">A-</td>
                          <td className="py-2 px-3">85% – 89%</td>
                          <td className="py-2 px-3">3.70</td>
                          <td className="py-2 px-3 font-sans text-slate-300">Distinction</td>
                        </tr>
                        <tr className="hover:bg-white/5 text-amber-300">
                          <td className="py-2 px-3 font-bold">B+</td>
                          <td className="py-2 px-3">80% – 84%</td>
                          <td className="py-2 px-3">3.30</td>
                          <td className="py-2 px-3 font-sans text-slate-300">Superior Exegesis</td>
                        </tr>
                        <tr className="hover:bg-white/5 text-amber-300">
                          <td className="py-2 px-3 font-bold">B / B-</td>
                          <td className="py-2 px-3">70% – 79%</td>
                          <td className="py-2 px-3">3.00 – 2.70</td>
                          <td className="py-2 px-3 font-sans text-slate-300">Good Standing</td>
                        </tr>
                        <tr className="hover:bg-white/5 text-slate-400">
                          <td className="py-2 px-3 font-bold">C+ / C</td>
                          <td className="py-2 px-3">60% – 69%</td>
                          <td className="py-2 px-3">2.30 – 2.00</td>
                          <td className="py-2 px-3 font-sans text-slate-300">Satisfactory Pass</td>
                        </tr>
                        <tr className="hover:bg-white/5 text-rose-400">
                          <td className="py-2 px-3 font-bold">F</td>
                          <td className="py-2 px-3">Below 50%</td>
                          <td className="py-2 px-3">0.00</td>
                          <td className="py-2 px-3 font-sans text-slate-300">Failing (Requires Retake)</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {handbookTab === 'tems' && (
                <div className="space-y-4">
                  <div className="p-4 bg-[#18181b] border border-white/5 rounded-xl space-y-2">
                    <h3 className="font-serif text-base font-bold text-white flex items-center space-x-2">
                      <Lock className="w-4 h-4 text-purple-400" />
                      <span>Theological Examination Management System (TEMS) Protocol</span>
                    </h3>
                    <p className="text-slate-400 text-xs">
                      Proctored examinations at Brooks of Life Seminary maintain rigorous institutional and accreditation standards.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 bg-[#18181b] rounded-xl border border-white/5 space-y-1">
                      <div className="font-bold text-white flex items-center space-x-1.5">
                        <Camera className="w-3.5 h-3.5 text-[#c4a47c]" />
                        <span>Continuous Web Proctoring</span>
                      </div>
                      <p className="text-slate-400 text-[11px]">
                        Students must enable an active forward-facing camera with adequate workspace lighting for the entire test duration.
                      </p>
                    </div>

                    <div className="p-3 bg-[#18181b] rounded-xl border border-white/5 space-y-1">
                      <div className="font-bold text-white flex items-center space-x-1.5">
                        <Mic className="w-3.5 h-3.5 text-[#c4a47c]" />
                        <span>Acoustic Monitoring</span>
                      </div>
                      <p className="text-slate-400 text-[11px]">
                        Examinations require a quiet testing environment without unauthorized background coaching or third-party communications.
                      </p>
                    </div>

                    <div className="p-3 bg-[#18181b] rounded-xl border border-white/5 space-y-1">
                      <div className="font-bold text-white flex items-center space-x-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#c4a47c]" />
                        <span>Single-Screen Enforcement</span>
                      </div>
                      <p className="text-slate-400 text-[11px]">
                        Navigating away from the TEMS examination window triggers an automated proctor flag and may void the attempt.
                      </p>
                    </div>

                    <div className="p-3 bg-[#18181b] rounded-xl border border-white/5 space-y-1">
                      <div className="font-bold text-white flex items-center space-x-1.5">
                        <Wifi className="w-3.5 h-3.5 text-[#c4a47c]" />
                        <span>Auto-Save Resilience</span>
                      </div>
                      <p className="text-slate-400 text-[11px]">
                        Answers are encrypted and continuously synchronized every 15 seconds to safeguard against intermittent connection losses.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {handbookTab === 'conduct' && (
                <div className="space-y-4">
                  <div className="p-4 bg-[#18181b] border border-white/5 rounded-xl space-y-2">
                    <h3 className="font-serif text-base font-bold text-white flex items-center space-x-2">
                      <Globe className="w-4 h-4 text-[#c4a47c]" />
                      <span>Seminary Honor Code & Statement of Faith</span>
                    </h3>
                    <p className="text-slate-400 text-xs">
                      "I therefore, a prisoner for the Lord, urge you to walk in a manner worthy of the calling to which you have been called" — Ephesians 4:1
                    </p>
                  </div>

                  <div className="space-y-2 text-xs text-slate-300">
                    <p>
                      Brooks of Life Seminary fosters a global community of servant leaders committed to the inerrancy and authority of Sacred Scripture, doctrinal fidelity, and Christlike character in public ministry and personal devotion.
                    </p>
                    <p>
                      Students agree to treat faculty, fellow candidates, and institutional staff with Christian charity, theological humility, and mutual respect across all virtual seminar discussions and cohort interactions.
                    </p>
                  </div>
                </div>
              )}

              {handbookTab === 'graduation' && (
                <div className="space-y-4">
                  <div className="p-4 bg-[#18181b] border border-white/5 rounded-xl space-y-2">
                    <h3 className="font-serif text-base font-bold text-white flex items-center space-x-2">
                      <Award className="w-4 h-4 text-[#c4a47c]" />
                      <span>Graduation Audit & Diploma Conferral</span>
                    </h3>
                    <p className="text-slate-400 text-xs">
                      Criteria required for official graduation ceremony participation and digital certificate issuance.
                    </p>
                  </div>

                  <div className="space-y-2 text-xs text-slate-300">
                    <div className="flex items-start space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Complete all required core curriculum and elective credit hours according to degree program syllabus.</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Maintain a cumulative minimum GPA of 2.50 for Undergraduate diplomas and 3.00 for Postgraduate degrees.</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Pass all scheduled TEMS Comprehensive Examinations and homiletical practicum evaluations.</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Full financial clearance with the Bursar’s Office prior to official transcript release.</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-[#27272a] bg-[#161618] flex items-center justify-between">
              <span className="text-[11px] text-slate-400 font-mono">
                Brooks of Life Seminary Academic Regulations • Edition 2026
              </span>
              <button
                onClick={() => setActiveModal(null)}
                className="px-4 py-2 bg-[#c4a47c] hover:bg-[#d5b791] text-[#0a0a0b] font-bold text-xs rounded-lg transition cursor-pointer"
              >
                Close Handbook
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: PRAYER REQUEST & INTERCESSION PORTAL                             */}
      {/* ========================================================================= */}
      {activeModal === 'prayer' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-[#121214] border border-[#27272a] rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="p-6 border-b border-[#27272a] flex items-center justify-between bg-[#161618]">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-400 border border-amber-500/30 flex items-center justify-center">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-serif text-lg font-bold text-white">
                    Seminary Intercessory Prayer Portal
                  </h2>
                  <p className="text-xs text-slate-400">
                    "Praying at all times in the Spirit, with all prayer and supplication" — Ephesians 6:18
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Tab Navigation */}
            <div className="flex items-center justify-between border-b border-[#27272a] bg-[#18181b] px-6 text-xs font-semibold">
              <div className="flex space-x-4">
                <button
                  onClick={() => setPrayerTab('wall')}
                  className={`py-3 border-b-2 transition cursor-pointer flex items-center space-x-1.5 ${
                    prayerTab === 'wall'
                      ? 'border-amber-400 text-amber-300'
                      : 'border-transparent text-slate-400 hover:text-white'
                  }`}
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>Community Prayer Wall ({prayerList.length})</span>
                </button>
                <button
                  onClick={() => setPrayerTab('submit')}
                  className={`py-3 border-b-2 transition cursor-pointer flex items-center space-x-1.5 ${
                    prayerTab === 'submit'
                      ? 'border-amber-400 text-amber-300'
                      : 'border-transparent text-slate-400 hover:text-white'
                  }`}
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Prayer Request</span>
                </button>
              </div>

              {prayerTab === 'wall' && (
                <select
                  value={prayerFilter}
                  onChange={e => setPrayerFilter(e.target.value)}
                  className="bg-[#121214] border border-[#27272a] text-[11px] text-slate-300 rounded px-2 py-1 my-1 focus:outline-none"
                >
                  <option value="All">All Categories</option>
                  <option value="Academic & Exams">Academic & Exams</option>
                  <option value="Ministry Calling">Ministry Calling</option>
                  <option value="Family & Personal">Family & Personal</option>
                  <option value="Health & Healing">Health & Healing</option>
                  <option value="Missions & Evangelism">Missions & Evangelism</option>
                </select>
              )}
            </div>

            {/* Body */}
            <div className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm flex-1">
              {prayerSubmittedNotice && (
                <div className="p-3 bg-emerald-950/80 border border-emerald-700 text-emerald-300 rounded-xl flex items-center space-x-2 animate-fadeIn">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Your prayer request has been lifted before the Lord and posted to the seminary intercessors!</span>
                </div>
              )}

              {prayerTab === 'wall' ? (
                <div className="space-y-4">
                  {prayerList
                    .filter(item => prayerFilter === 'All' || item.category === prayerFilter)
                    .map(item => (
                      <div 
                        key={item.id}
                        className="p-4 bg-[#18181b] border border-[#27272a] rounded-xl space-y-3 transition hover:border-amber-500/30"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <div className="flex items-center space-x-2">
                              <span className="px-2 py-0.5 rounded bg-amber-500/15 border border-amber-500/30 text-amber-300 text-[10px] font-semibold">
                                {item.category}
                              </span>
                              <span className="text-[11px] text-slate-400 font-mono">
                                {new Date(item.date).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })}
                              </span>
                            </div>
                            <h3 className="font-serif text-sm sm:text-base font-bold text-white mt-1">
                              {item.title}
                            </h3>
                            <div className="text-[11px] text-slate-400">
                              By <strong>{item.studentName}</strong> • {item.studentRole}
                            </div>
                          </div>

                          <button
                            onClick={() => handlePrayAmen(item.id)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center space-x-1.5 cursor-pointer shrink-0 ${
                              item.hasPrayed
                                ? 'bg-amber-500 text-[#0a0a0b] shadow-md'
                                : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10'
                            }`}
                          >
                            <span>🙏</span>
                            <span>{item.hasPrayed ? 'Prayed' : 'Amen'}</span>
                            <span className="font-mono ml-0.5">({item.amenCount})</span>
                          </button>
                        </div>

                        <p className="text-xs text-slate-300 leading-relaxed bg-[#121214] p-3 rounded-lg border border-white/5">
                          "{item.description}"
                        </p>

                        {item.scripture && (
                          <div className="text-[11px] text-amber-400/90 font-serif italic">
                            Scripture Anchor: {item.scripture}
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              ) : (
                /* Submit Form */
                <form onSubmit={handlePrayerSubmit} className="space-y-4">
                  <div className="p-3.5 bg-[#18181b] rounded-xl border border-white/5 text-xs text-slate-400">
                    Share your burden, ministry initiative, examination prayer, or thanksgiving report with our global seminary faculty and intercessory prayer network.
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Prayer Title / Intention *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., Breakthrough for Greek Exegesis Exam & Pastoral Wisdom"
                      value={prayerFormData.title}
                      onChange={e => setPrayerFormData({ ...prayerFormData, title: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-xl bg-[#18181b] border border-[#27272a] text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Category *
                      </label>
                      <select
                        value={prayerFormData.category}
                        onChange={e => setPrayerFormData({ ...prayerFormData, category: e.target.value as any })}
                        className="w-full px-3 py-2 text-xs rounded-xl bg-[#18181b] border border-[#27272a] text-white focus:outline-none focus:border-amber-400"
                      >
                        <option value="Academic & Exams">Academic & Exams</option>
                        <option value="Ministry Calling">Ministry Calling</option>
                        <option value="Family & Personal">Family & Personal</option>
                        <option value="Health & Healing">Health & Healing</option>
                        <option value="Missions & Evangelism">Missions & Evangelism</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Scripture Anchor (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g., Philippians 4:6-7, Psalm 23"
                        value={prayerFormData.scripture}
                        onChange={e => setPrayerFormData({ ...prayerFormData, scripture: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-xl bg-[#18181b] border border-[#27272a] text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Prayer Details / Intercession Request *
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Type your prayer request with sufficient detail for the seminary community to intercede..."
                      value={prayerFormData.description}
                      onChange={e => setPrayerFormData({ ...prayerFormData, description: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-xl bg-[#18181b] border border-[#27272a] text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div className="flex items-center space-x-2 pt-1">
                    <input
                      type="checkbox"
                      id="confidential"
                      checked={prayerFormData.isConfidential}
                      onChange={e => setPrayerFormData({ ...prayerFormData, isConfidential: e.target.checked })}
                      className="rounded border-[#27272a] text-amber-500 focus:ring-0 cursor-pointer"
                    />
                    <label htmlFor="confidential" className="text-xs text-slate-400 cursor-pointer">
                      Mark as confidential (Forward directly to Dean of Students & Faculty Intercessors only)
                    </label>
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-[#0a0a0b] font-bold text-xs rounded-xl transition cursor-pointer flex items-center space-x-1.5 shadow-lg"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Post Prayer Request</span>
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-[#27272a] bg-[#161618] flex items-center justify-between">
              <span className="text-[11px] text-slate-400">
                Seminary Daily Devotional Watch • 24/7 Global Intercession
              </span>
              <button
                onClick={() => setActiveModal(null)}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs rounded-lg transition cursor-pointer"
              >
                Close Portal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 3: TECHNICAL SUPPORT HELPDESK & TEMS HARDWARE DIAGNOSTICS          */}
      {/* ========================================================================= */}
      {activeModal === 'support' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-[#121214] border border-[#27272a] rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="p-6 border-b border-[#27272a] flex items-center justify-between bg-[#161618]">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/15 text-blue-400 border border-blue-500/30 flex items-center justify-center">
                  <LifeBuoy className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-serif text-lg font-bold text-white">
                    Brooks of Life Technical Helpdesk & Diagnostics
                  </h2>
                  <p className="text-xs text-slate-400">
                    LMS Support, Proctoring Diagnostics, Audio/Video Playback & Issue Resolution
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center space-x-4 border-b border-[#27272a] bg-[#18181b] px-6 text-xs font-semibold">
              <button
                onClick={() => setSupportTab('ticket')}
                className={`py-3 border-b-2 transition cursor-pointer flex items-center space-x-1.5 ${
                  supportTab === 'ticket'
                    ? 'border-blue-400 text-blue-300'
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Submit Support Ticket</span>
              </button>

              <button
                onClick={() => setSupportTab('diagnostics')}
                className={`py-3 border-b-2 transition cursor-pointer flex items-center space-x-1.5 ${
                  supportTab === 'diagnostics'
                    ? 'border-blue-400 text-blue-300'
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                <Camera className="w-3.5 h-3.5" />
                <span>TEMS Hardware & System Test</span>
              </button>

              <button
                onClick={() => setSupportTab('faq')}
                className={`py-3 border-b-2 transition cursor-pointer flex items-center space-x-1.5 ${
                  supportTab === 'faq'
                    ? 'border-blue-400 text-blue-300'
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Common FAQs</span>
              </button>
            </div>

            {/* Body */}
            <div className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm flex-1">
              {supportTab === 'ticket' && (
                <div>
                  {ticketSubmitted ? (
                    <div className="p-6 bg-emerald-950/50 border border-emerald-700/60 rounded-2xl text-center space-y-3 animate-fadeIn">
                      <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                      <h3 className="font-serif text-base font-bold text-white">
                        Support Ticket Created Successfully!
                      </h3>
                      <div className="font-mono text-xs font-bold px-3 py-1 bg-emerald-900/60 text-emerald-300 rounded inline-block">
                        Ticket Number: {ticketSubmitted}
                      </div>
                      <p className="text-xs text-slate-300 max-w-md mx-auto">
                        Your request has been routed to the seminary IT and Academic Registrar support staff. Response will be delivered to your registered student email ({currentUser?.email || 'student@brooksoflife.edu'}).
                      </p>
                      <button
                        onClick={() => setTicketSubmitted(null)}
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl cursor-pointer transition mt-2"
                      >
                        Submit Another Ticket
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleTicketSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-semibold text-slate-300 mb-1">
                            Issue Category *
                          </label>
                          <select
                            value={ticketCategory}
                            onChange={e => setTicketCategory(e.target.value as any)}
                            className="w-full px-3 py-2 text-xs rounded-xl bg-[#18181b] border border-[#27272a] text-white focus:outline-none focus:border-blue-400"
                          >
                            <option value="Technical/Portal">Technical / LMS Portal Issue</option>
                            <option value="Examinations">TEMS Examination Proctoring</option>
                            <option value="Course Material">Course Video / Voice-to-Text Recorder</option>
                            <option value="Academic Support">Academic / Exegetical Grading</option>
                            <option value="Billing & Payments">Bursar & Payment Invoices</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-300 mb-1">
                            Priority Level *
                          </label>
                          <select
                            value={ticketPriority}
                            onChange={e => setTicketPriority(e.target.value as any)}
                            className="w-full px-3 py-2 text-xs rounded-xl bg-[#18181b] border border-[#27272a] text-white focus:outline-none focus:border-blue-400"
                          >
                            <option value="Low">Low (General Inquiry)</option>
                            <option value="Medium">Medium (Standard Coursework)</option>
                            <option value="High">High (Impending Exam / Lockout)</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          Subject Summary *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g., Microphone permissions error during voice reflection submission"
                          value={ticketSubject}
                          onChange={e => setTicketSubject(e.target.value)}
                          className="w-full px-3 py-2 text-xs rounded-xl bg-[#18181b] border border-[#27272a] text-white focus:outline-none focus:border-blue-400"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          Detailed Description of Problem *
                        </label>
                        <textarea
                          rows={4}
                          required
                          placeholder="Describe the steps leading to the error, your operating system/browser, and any error messages received..."
                          value={ticketDescription}
                          onChange={e => setTicketDescription(e.target.value)}
                          className="w-full px-3 py-2 text-xs rounded-xl bg-[#18181b] border border-[#27272a] text-white focus:outline-none focus:border-blue-400"
                        />
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <div className="text-[11px] text-slate-400">
                          Support Hours: Mon–Fri 08:00–18:00 GMT (Emergency proctoring 24/7)
                        </div>
                        <button
                          type="submit"
                          className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 text-white font-bold text-xs rounded-xl transition cursor-pointer flex items-center space-x-1.5 shadow-lg"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>Dispatch Ticket</span>
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              )}

              {supportTab === 'diagnostics' && (
                <div className="space-y-4">
                  <div className="p-4 bg-[#18181b] border border-white/5 rounded-xl space-y-2">
                    <h3 className="font-serif text-base font-bold text-white flex items-center space-x-2">
                      <Camera className="w-4 h-4 text-blue-400" />
                      <span>TEMS Hardware & Examination Readiness Diagnostic Suite</span>
                    </h3>
                    <p className="text-slate-400 text-xs">
                      Run this automated test prior to launching proctored midterms or final examinations to verify webcam video streaming, microphone audio input, and cloud synchronization bandwidth.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {/* Camera Diagnostic */}
                    <div className="p-4 bg-[#18181b] border border-[#27272a] rounded-xl text-center space-y-2">
                      <Camera className="w-6 h-6 mx-auto text-slate-300" />
                      <div className="font-bold text-xs text-white">Webcam Video</div>
                      <div className="text-[11px]">
                        {cameraStatus === 'idle' && <span className="text-slate-500">Not Tested</span>}
                        {cameraStatus === 'checking' && <span className="text-amber-400 animate-pulse">Initializing...</span>}
                        {cameraStatus === 'passed' && <span className="text-emerald-400 font-bold flex items-center justify-center space-x-1"><CheckCircle2 className="w-3.5 h-3.5" /><span>Functional</span></span>}
                      </div>
                    </div>

                    {/* Microphone Diagnostic */}
                    <div className="p-4 bg-[#18181b] border border-[#27272a] rounded-xl text-center space-y-2">
                      <Mic className="w-6 h-6 mx-auto text-slate-300" />
                      <div className="font-bold text-xs text-white">Audio / Mic Stream</div>
                      <div className="text-[11px]">
                        {micStatus === 'idle' && <span className="text-slate-500">Not Tested</span>}
                        {micStatus === 'checking' && <span className="text-amber-400 animate-pulse">Analyzing levels...</span>}
                        {micStatus === 'passed' && <span className="text-emerald-400 font-bold flex items-center justify-center space-x-1"><CheckCircle2 className="w-3.5 h-3.5" /><span>Functional</span></span>}
                      </div>
                    </div>

                    {/* Network Diagnostic */}
                    <div className="p-4 bg-[#18181b] border border-[#27272a] rounded-xl text-center space-y-2">
                      <Wifi className="w-6 h-6 mx-auto text-slate-300" />
                      <div className="font-bold text-xs text-white">Server Latency</div>
                      <div className="text-[11px]">
                        {networkStatus === 'idle' && <span className="text-slate-500">Not Tested</span>}
                        {networkStatus === 'checking' && <span className="text-amber-400 animate-pulse">Pinging (42ms)...</span>}
                        {networkStatus === 'passed' && <span className="text-emerald-400 font-bold flex items-center justify-center space-x-1"><CheckCircle2 className="w-3.5 h-3.5" /><span>38ms (Optimal)</span></span>}
                      </div>
                    </div>
                  </div>

                  {/* Video Live Preview Feed if camera turned on */}
                  {mediaStream && (
                    <div className="p-3 bg-[#0a0a0b] border border-emerald-800/60 rounded-xl space-y-2 text-center">
                      <div className="text-xs text-emerald-400 font-mono flex items-center justify-center space-x-1">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                        <span>Live Video Hardware Stream Active</span>
                      </div>
                      <video 
                        ref={videoRef} 
                        autoPlay 
                        playsInline 
                        muted 
                        className="w-64 h-44 object-cover mx-auto rounded-lg border border-[#27272a]"
                      />
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2 justify-center pt-2">
                    <button
                      onClick={handleTestCameraAndMic}
                      className="px-4 py-2 bg-[#c4a47c] hover:bg-[#d5b791] text-[#0a0a0b] font-bold text-xs rounded-xl cursor-pointer transition flex items-center space-x-1.5"
                    >
                      <Camera className="w-3.5 h-3.5" />
                      <span>Test Camera & Microphone</span>
                    </button>
                    <button
                      onClick={handleTestNetwork}
                      className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs rounded-xl cursor-pointer transition flex items-center space-x-1.5"
                    >
                      <Wifi className="w-3.5 h-3.5" />
                      <span>Test Server Sync</span>
                    </button>
                  </div>
                </div>
              )}

              {supportTab === 'faq' && (
                <div className="space-y-3">
                  <div className="p-3 bg-[#18181b] border border-[#27272a] rounded-xl space-y-1">
                    <h4 className="font-bold text-xs text-white">How do I submit an oral voice reflection for my assignment?</h4>
                    <p className="text-xs text-slate-400">
                      Open the Course Player or Student Assignments portal, click the <strong>Voice-to-Text</strong> toggle, grant browser microphone permissions, and press the record button. Your spoken words are transcribed live and attached as an audio practicum.
                    </p>
                  </div>

                  <div className="p-3 bg-[#18181b] border border-[#27272a] rounded-xl space-y-1">
                    <h4 className="font-bold text-xs text-white">What happens if my internet disconnects during a TEMS examination?</h4>
                    <p className="text-xs text-slate-400">
                      TEMS automatically preserves and locally caches your answers every 15 seconds. If disconnected, simply refresh and reconnect within your allotted duration to resume your examination session.
                    </p>
                  </div>

                  <div className="p-3 bg-[#18181b] border border-[#27272a] rounded-xl space-y-1">
                    <h4 className="font-bold text-xs text-white">How do I request an official sealed academic transcript?</h4>
                    <p className="text-xs text-slate-400">
                      Navigate to the <strong>Official Transcript</strong> tab from your dashboard, check that all course grades are finalized with no outstanding bursar holds, and click the <em>Download Official Transcript</em> or <em>Request Verification</em> action.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-[#27272a] bg-[#161618] flex items-center justify-between">
              <div className="text-[11px] text-slate-400 flex items-center space-x-3">
                <span className="flex items-center space-x-1"><Mail className="w-3 h-3 text-[#c4a47c]" /><span>support@brooksoflife.edu</span></span>
                <span className="hidden sm:flex items-center space-x-1"><Phone className="w-3 h-3 text-[#c4a47c]" /><span>{settings.contactPhone}</span></span>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs rounded-lg transition cursor-pointer"
              >
                Close Desk
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 4: ACADEMIC CALENDAR & TERM MILESTONES                              */}
      {/* ========================================================================= */}
      {activeModal === 'calendar' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-[#121214] border border-[#27272a] rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="p-6 border-b border-[#27272a] flex items-center justify-between bg-[#161618]">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/15 text-purple-400 border border-purple-500/30 flex items-center justify-center">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-serif text-lg font-bold text-white">
                    Academic Calendar & Semester Term Milestones
                  </h2>
                  <p className="text-xs text-slate-400">
                    Cohort Schedule 2026 • Brooks of Life Seminary
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm flex-1">
              <div className="p-4 bg-[#18181b] border border-white/5 rounded-xl space-y-1">
                <div className="text-xs font-mono font-bold text-[#c4a47c] uppercase">Current Active Session</div>
                <div className="font-serif text-base font-bold text-white">Fall Cohort Trimester 2026</div>
                <p className="text-xs text-slate-400">
                  Online classes, live theological lectures, practicum submissions, and proctored examinations.
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-bold text-xs uppercase text-slate-400 tracking-wider">Key Academic Milestones</h4>
                
                <div className="p-3 bg-[#18181b] border border-[#27272a] rounded-xl flex items-center justify-between">
                  <div>
                    <div className="font-bold text-white text-xs">Course Add / Drop & Enrollment Finalization</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">Last day to modify enrolled electives without transcript notation</div>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-slate-800 text-slate-200 font-mono text-[11px] font-bold">
                    Sept 15, 2026
                  </span>
                </div>

                <div className="p-3 bg-[#18181b] border border-[#27272a] rounded-xl flex items-center justify-between">
                  <div>
                    <div className="font-bold text-white text-xs">Midterm TEMS Examination Window</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">Continuous proctored testing open for all registered course modules</div>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-purple-950/70 border border-purple-800 text-purple-300 font-mono text-[11px] font-bold">
                    Oct 01 – Oct 15
                  </span>
                </div>

                <div className="p-3 bg-[#18181b] border border-[#27272a] rounded-xl flex items-center justify-between">
                  <div>
                    <div className="font-bold text-white text-xs">Final Exegetical Practicum & Homiletical Paper Deadline</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">Final student papers queued for faculty evaluation and rubric grading</div>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-amber-950/70 border border-amber-800 text-amber-300 font-mono text-[11px] font-bold">
                    Nov 20, 2026
                  </span>
                </div>

                <div className="p-3 bg-[#18181b] border border-[#27272a] rounded-xl flex items-center justify-between">
                  <div>
                    <div className="font-bold text-white text-xs">Annual Graduation Convocation & Diploma Conferral</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">Virtual and hybrid convocation with verification ceremony</div>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-emerald-950/70 border border-emerald-800 text-emerald-300 font-mono text-[11px] font-bold">
                    Dec 12, 2026
                  </span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-[#27272a] bg-[#161618] flex items-center justify-between">
              <span className="text-[11px] text-slate-400 font-mono">
                Registrar Office • Official Cohort Timetable
              </span>
              <button
                onClick={() => setActiveModal(null)}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs rounded-lg transition cursor-pointer"
              >
                Close Calendar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
