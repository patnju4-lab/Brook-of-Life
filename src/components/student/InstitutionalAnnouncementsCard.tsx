import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AnnouncementItem } from '../../types';
import { 
  Bell, 
  Sparkles, 
  Calendar, 
  ExternalLink, 
  CheckCircle2, 
  AlertTriangle, 
  Search, 
  Filter, 
  Bookmark, 
  ChevronRight, 
  ShieldCheck, 
  Building2, 
  FileText,
  Clock,
  ArrowRight,
  Info
} from 'lucide-react';

export const InstitutionalAnnouncementsCard: React.FC = () => {
  const { announcements, navigateTo } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [acknowledgedIds, setAcknowledgedIds] = useState<string[]>([]);
  const [selectedModalAnnouncement, setSelectedModalAnnouncement] = useState<AnnouncementItem | null>(null);

  const categories = ['All', 'Academic', 'Admissions', 'Spiritual Devotion', 'General'];

  const filteredAnnouncements = announcements.filter(item => {
    const matchesCat = selectedCategory === 'All' || item.category.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const toggleAcknowledge = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setAcknowledgedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleAction = (item: AnnouncementItem, e: React.MouseEvent) => {
    e.stopPropagation();
    if (item.category.toLowerCase().includes('academic') || item.title.toLowerCase().includes('exam')) {
      navigateTo('student-exams');
    } else if (item.category.toLowerCase().includes('admission') || item.title.toLowerCase().includes('scholarship')) {
      navigateTo('student-finance');
    } else if (item.category.toLowerCase().includes('spiritual') || item.title.toLowerCase().includes('chapel')) {
      navigateTo('events');
    } else {
      setSelectedModalAnnouncement(item);
    }
  };

  return (
    <div className="bg-[#161618] border border-white/10 rounded-xl p-5 sm:p-6 text-slate-200 shadow-xl space-y-5" id="institutional-announcements-card">
      {/* Header with Administration Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#c4a47c] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#c4a47c]"></span>
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#c4a47c]">
              Institutional Notices
            </span>
            <span className="text-[10px] bg-white/5 border border-white/10 px-2 py-0.5 rounded text-slate-400 font-mono">
              Live Feed
            </span>
          </div>
          <h3 className="text-xl font-serif font-bold text-white tracking-wide flex items-center gap-2">
            Institutional Announcements
          </h3>
          <p className="text-xs text-slate-400">
            Official communications, academic decrees & administrative reminders from the seminary leadership
          </p>
        </div>

        <div className="flex items-center space-x-2 self-start sm:self-auto">
          <span className="text-[11px] text-slate-400 bg-white/5 px-2.5 py-1 rounded-lg border border-white/5 flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5 text-[#c4a47c]" />
            <span>Office of Administration</span>
          </span>
        </div>
      </div>

      {/* Filter Tabs & Search */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-1">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none text-xs">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition cursor-pointer whitespace-nowrap ${
                selectedCategory === cat 
                  ? 'bg-[#c4a47c] text-[#0a0a0b] font-bold shadow-sm' 
                  : 'bg-white/5 text-slate-400 hover:text-slate-200 hover:bg-white/10'
              }`}
            >
              {cat === 'All' ? 'All Notices' : cat}
            </button>
          ))}
        </div>

        {/* Quick Search */}
        <div className="relative min-w-[200px] sm:w-64">
          <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search announcements..."
            className="w-full pl-8 pr-3 py-1.5 bg-[#0f0f11] border border-white/10 rounded-md text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-[#c4a47c] transition"
          />
        </div>
      </div>

      {/* Announcement List */}
      <div className="space-y-3">
        {filteredAnnouncements.length === 0 ? (
          <div className="p-8 text-center bg-white/5 rounded-lg border border-white/5 space-y-2">
            <Info className="w-6 h-6 text-slate-500 mx-auto" />
            <p className="text-xs text-slate-400">No institutional announcements match your search filters.</p>
            <button
              onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
              className="text-xs text-[#c4a47c] hover:underline"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredAnnouncements.map(item => {
            const isAcknowledged = acknowledgedIds.includes(item.id);
            const isExpanded = expandedId === item.id;

            return (
              <div
                key={item.id}
                onClick={() => setExpandedId(isExpanded ? null : item.id)}
                className={`p-4 rounded-lg transition-all cursor-pointer border ${
                  item.isImportant 
                    ? 'bg-[#1c1c20] border-[#c4a47c]/40 hover:border-[#c4a47c]' 
                    : 'bg-white/5 border-white/5 hover:border-white/20'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="space-y-1.5 flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 text-[11px]">
                      {item.isImportant && (
                        <span className="px-2 py-0.5 rounded bg-[#c4a47c]/20 text-[#c4a47c] border border-[#c4a47c]/40 font-bold uppercase tracking-wider text-[10px]">
                          ★ Priority Bulletin
                        </span>
                      )}
                      <span className="px-2 py-0.5 rounded bg-white/5 text-slate-300 font-medium text-[10px] uppercase tracking-wider">
                        {item.category}
                      </span>
                      <span className="text-slate-500 text-[11px] flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-500" />
                        <span>{item.date}</span>
                      </span>
                      <span className="text-slate-500 hidden sm:inline">•</span>
                      <span className="text-[#c4a47c]/90 text-[11px] italic font-serif truncate max-w-[200px]">
                        {item.author}
                      </span>
                    </div>

                    <h4 className="text-sm sm:text-base font-medium text-white group-hover:text-[#c4a47c] transition-colors leading-snug">
                      {item.title}
                    </h4>

                    <p className={`text-xs text-slate-300 leading-relaxed ${isExpanded ? '' : 'line-clamp-2'}`}>
                      {item.content}
                    </p>
                  </div>

                  {/* Actions column */}
                  <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2 pt-2 sm:pt-0 shrink-0">
                    <button
                      onClick={(e) => toggleAcknowledge(item.id, e)}
                      title={isAcknowledged ? 'Marked as read' : 'Mark as acknowledged'}
                      className={`flex items-center space-x-1 px-2.5 py-1 rounded text-[11px] font-medium transition cursor-pointer ${
                        isAcknowledged 
                          ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-500/30' 
                          : 'bg-white/5 text-slate-400 hover:text-white border border-white/5 hover:border-white/10'
                      }`}
                    >
                      <CheckCircle2 className={`w-3.5 h-3.5 ${isAcknowledged ? 'text-emerald-400' : 'text-slate-500'}`} />
                      <span>{isAcknowledged ? 'Acknowledged' : 'Acknowledge'}</span>
                    </button>

                    <button
                      onClick={(e) => handleAction(item, e)}
                      className="px-2.5 py-1 bg-[#c4a47c]/10 hover:bg-[#c4a47c] text-[#c4a47c] hover:text-[#0a0a0b] border border-[#c4a47c]/30 rounded text-[11px] font-semibold transition cursor-pointer flex items-center space-x-1"
                    >
                      <span>View Memo</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {isExpanded && (
                  <div className="mt-3 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#c4a47c]" />
                      <span>Verified Administrative Decree • Ref: BLSM-ADM-{item.id.toUpperCase()}</span>
                    </div>
                    <button
                      onClick={(e) => { e.stopPropagation(); setSelectedModalAnnouncement(item); }}
                      className="text-[#c4a47c] hover:underline font-medium flex items-center gap-1"
                    >
                      <span>Read Full Document & Seal</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Footer Banner */}
      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 border-t border-white/5 gap-2">
        <span className="italic font-serif text-[#c4a47c]/80 text-[11px]">
          "Let all things be done decently and in order." — 1 Corinthians 14:40
        </span>
        <button
          onClick={() => navigateTo('events')}
          className="text-slate-400 hover:text-white transition flex items-center space-x-1 text-xs cursor-pointer"
        >
          <span>View Seminary Academic Calendar</span>
          <ChevronRight className="w-3.5 h-3.5 text-[#c4a47c]" />
        </button>
      </div>

      {/* Full Announcement Official Memo Modal */}
      {selectedModalAnnouncement && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#161618] border border-white/20 rounded-xl max-w-lg w-full p-6 text-slate-200 space-y-5 shadow-2xl relative">
            <div className="flex items-start justify-between border-b border-white/10 pb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-[#c4a47c] rounded flex items-center justify-center text-[#0a0a0b] font-serif font-bold text-lg">
                  B
                </div>
                <div>
                  <h4 className="font-serif font-bold text-white text-base">
                    Brooks of Life School of Ministry
                  </h4>
                  <p className="text-[10px] uppercase tracking-wider text-[#c4a47c]">
                    Official Administrative Memorandum
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedModalAnnouncement(null)}
                className="text-slate-400 hover:text-white text-lg font-mono p-1"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-xs text-slate-400 border-b border-white/5 pb-2 font-mono">
                <span>Date: {selectedModalAnnouncement.date}</span>
                <span>Category: {selectedModalAnnouncement.category}</span>
              </div>

              <h3 className="font-serif text-lg font-bold text-white leading-snug">
                {selectedModalAnnouncement.title}
              </h3>

              <div className="p-4 bg-[#0a0a0b] rounded-lg border border-white/10 text-xs text-slate-300 leading-relaxed font-sans space-y-2">
                <p>{selectedModalAnnouncement.content}</p>
                <p className="text-slate-400 pt-2 border-t border-white/5 text-[11px]">
                  All students, faculty members, and cohort registrants are advised to take note of this administrative instruction. For inquiries, contact the registrar desk via the online help portal.
                </p>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-white">{selectedModalAnnouncement.author}</p>
                  <p className="text-[10px] text-[#c4a47c] uppercase tracking-wider">Executive Authority • BLSM</p>
                </div>
                <div className="w-12 h-12 rounded-full border border-[#c4a47c]/40 flex items-center justify-center text-[9px] text-[#c4a47c] font-serif text-center uppercase leading-none p-1 border-dashed">
                  Official Seal
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex justify-end gap-3">
              <button
                onClick={() => setSelectedModalAnnouncement(null)}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-md text-xs font-medium"
              >
                Close Memo
              </button>
              <button
                onClick={() => {
                  if (!acknowledgedIds.includes(selectedModalAnnouncement.id)) {
                    setAcknowledgedIds(prev => [...prev, selectedModalAnnouncement.id]);
                  }
                  setSelectedModalAnnouncement(null);
                }}
                className="px-4 py-2 bg-[#c4a47c] hover:bg-[#d5b791] text-[#0a0a0b] font-bold rounded-md text-xs"
              >
                Acknowledge Notice
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
