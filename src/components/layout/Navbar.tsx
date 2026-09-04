import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BROOKS_LOGO_SRC } from '../../assets/logo';
import { 
  BookOpen, 
  GraduationCap, 
  User as UserIcon, 
  LogOut, 
  ChevronDown, 
  Menu, 
  X, 
  Bell, 
  ShieldCheck, 
  FileCheck, 
  Library, 
  Calendar, 
  Phone, 
  Sparkles,
  Users,
  Search
} from 'lucide-react';
import { UserRole } from '../../types';

interface NavbarProps {
  onOpenAuth: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAuth }) => {
  const { 
    currentUser, 
    activeView, 
    navigateTo, 
    switchRole, 
    logout, 
    notificationsCount,
    settings 
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const rolesList: { role: UserRole; label: string; desc: string; badgeColor: string }[] = [
    { role: 'student', label: 'Candidate Portal', desc: 'Samuel Adebayo (B.Th.)', badgeColor: 'bg-[#c4a47c]/20 text-[#c4a47c]' },
    { role: 'lecturer', label: 'Faculty / Professor', desc: 'Dr. Rebecca MacGregor', badgeColor: 'bg-blue-950/60 text-blue-300' },
    { role: 'examination_officer', label: 'TEMS Exam Officer', desc: 'Dr. Elizabeth Vance', badgeColor: 'bg-purple-950/60 text-purple-300' },
    { role: 'registrar', label: 'Academic Registrar', desc: 'Rev. Arthur Pendelton', badgeColor: 'bg-indigo-950/60 text-indigo-300' },
    { role: 'finance_officer', label: 'Finance & Bursar', desc: 'Grace Sterling, CPA', badgeColor: 'bg-amber-950/60 text-amber-300' },
    { role: 'super_admin', label: 'Chancellor / Admin', desc: 'Rev. Dr. Emmanuel Brooks', badgeColor: 'bg-rose-950/60 text-rose-300' },
  ];

  const handleNav = (view: string) => {
    navigateTo(view);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0f0f11] border-b border-white/10 text-slate-200">
      {/* Top Banner Ticker */}
      <div className="bg-[#0a0a0b] text-slate-300 px-4 py-1.5 text-xs font-medium flex items-center justify-between border-b border-white/5">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2 truncate">
            <span className="bg-[#c4a47c]/20 text-[#c4a47c] border border-[#c4a47c]/30 uppercase px-2 py-0.5 rounded text-[9px] font-bold tracking-widest font-mono">
              ANNOUNCEMENT
            </span>
            <span className="truncate text-xs text-slate-300">{settings.announcementTicker || "Fall 2026 Admissions Open • Global South Ministry Scholarships Available"}</span>
          </div>
          <div className="hidden md:flex items-center space-x-4 shrink-0 text-slate-400 text-xs">
            <button 
              onClick={() => handleNav('verify-certificate')} 
              className="hover:text-[#c4a47c] flex items-center space-x-1 cursor-pointer transition"
            >
              <FileCheck className="w-3.5 h-3.5 text-[#c4a47c]" />
              <span>Verify Certificate</span>
            </button>
            <span className="text-slate-700">|</span>
            <button 
              onClick={() => handleNav('events')} 
              className="hover:text-[#c4a47c] flex items-center space-x-1 cursor-pointer transition"
            >
              <Calendar className="w-3.5 h-3.5 text-[#c4a47c]" />
              <span>Academic Calendar</span>
            </button>
            <span className="text-slate-700">|</span>
            <button 
              onClick={() => handleNav('contact-support')} 
              className="hover:text-[#c4a47c] flex items-center space-x-1 cursor-pointer transition"
            >
              <Phone className="w-3.5 h-3.5 text-[#c4a47c]" />
              <span>Admissions Desk</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <div 
          onClick={() => handleNav('home')} 
          className="flex items-center space-x-3 cursor-pointer group select-none"
          id="navbar-brand-logo"
        >
          <div className="w-10 h-10 rounded-lg overflow-hidden bg-black/60 border border-[#c4a47c]/40 flex items-center justify-center group-hover:border-[#c4a47c] group-hover:scale-105 transition-all shadow-md shadow-amber-950/20">
            <img 
              src={BROOKS_LOGO_SRC} 
              alt="Brooks of Life Schools of Ministry -UK-" 
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover" 
            />
          </div>
          <div>
            <span className="text-lg font-serif tracking-wide text-[#f8fafc] group-hover:text-[#c4a47c] transition-colors flex items-center">
              Brooks of Life
              <span className="text-[#c4a47c] text-xs font-serif ml-1.5 px-1.5 py-0.5 rounded bg-[#c4a47c]/10 border border-[#c4a47c]/30 hidden sm:inline">
                Schools of Ministry -UK-
              </span>
            </span>
          </div>
        </div>

        {/* Public Desktop Nav Links */}
        <nav className="hidden lg:flex items-center space-x-6 text-xs uppercase tracking-widest font-medium text-slate-400">
          <button 
            onClick={() => handleNav('home')} 
            className={`transition-colors cursor-pointer pb-0.5 ${activeView === 'home' ? 'text-[#c4a47c] border-b border-[#c4a47c]' : 'hover:text-slate-200'}`}
          >
            Home
          </button>
          <button 
            onClick={() => handleNav('about')} 
            className={`transition-colors cursor-pointer pb-0.5 ${activeView === 'about' ? 'text-[#c4a47c] border-b border-[#c4a47c]' : 'hover:text-slate-200'}`}
          >
            About & Faith
          </button>
          <button 
            onClick={() => handleNav('programs')} 
            className={`transition-colors cursor-pointer pb-0.5 ${activeView === 'programs' ? 'text-[#c4a47c] border-b border-[#c4a47c]' : 'hover:text-slate-200'}`}
          >
            Programs
          </button>
          <button 
            onClick={() => handleNav('faculty')} 
            className={`transition-colors cursor-pointer pb-0.5 ${activeView === 'faculty' ? 'text-[#c4a47c] border-b border-[#c4a47c]' : 'hover:text-slate-200'}`}
          >
            Faculty
          </button>
          <button 
            onClick={() => handleNav('library')} 
            className={`transition-colors cursor-pointer pb-0.5 ${activeView === 'library' ? 'text-[#c4a47c] border-b border-[#c4a47c]' : 'hover:text-slate-200'}`}
          >
            Library
          </button>
          <button 
            onClick={() => handleNav('ministry-resources')} 
            className={`transition-colors cursor-pointer pb-0.5 ${activeView === 'ministry-resources' ? 'text-[#c4a47c] border-b border-[#c4a47c]' : 'hover:text-slate-200'}`}
          >
            Resources
          </button>
          <button 
            onClick={() => handleNav('brooks-of-life-tv')} 
            className={`transition-colors cursor-pointer pb-0.5 flex items-center space-x-1.5 ${activeView === 'brooks-of-life-tv' ? 'text-[#c4a47c] border-b border-[#c4a47c]' : 'text-slate-300 hover:text-[#c4a47c]'}`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"></span>
            <span>Brooks of Life TV</span>
          </button>
          <button 
            onClick={() => handleNav('admissions')} 
            className={`transition-colors cursor-pointer pb-0.5 ${activeView === 'admissions' ? 'text-[#c4a47c] border-b border-[#c4a47c]' : 'hover:text-slate-200'}`}
          >
            Admissions
          </button>
        </nav>

        {/* Action Controls & Role Switcher */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Quick Role Tester Dropdown */}
          <div className="relative">
            <button
              onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
              className="flex items-center space-x-1.5 px-2.5 py-1.5 bg-[#161618] hover:bg-[#1c1c20] border border-white/10 hover:border-[#c4a47c]/50 rounded text-xs font-medium text-[#c4a47c] transition-colors cursor-pointer shadow-sm"
              title="Test all user portals"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#c4a47c]" />
              <span className="hidden sm:inline text-slate-400">Portal:</span>
              <span className="capitalize font-semibold text-slate-200 truncate max-w-[90px] sm:max-w-[120px]">
                {currentUser ? currentUser.role.replace('_', ' ') : 'Guest'}
              </span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {roleDropdownOpen && (
              <div 
                className="absolute right-0 mt-2 w-64 bg-[#161618] border border-white/10 rounded-lg shadow-2xl py-2 z-50 text-slate-200"
                onClick={() => setRoleDropdownOpen(false)}
              >
                <div className="px-3 py-1.5 border-b border-white/10 text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">
                  Switch Portal & Role
                </div>
                {rolesList.map(r => (
                  <button
                    key={r.role}
                    onClick={() => switchRole(r.role)}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-white/5 transition-colors cursor-pointer ${currentUser?.role === r.role ? 'bg-white/10 text-[#c4a47c] font-medium' : ''}`}
                  >
                    <div>
                      <div className="font-medium text-slate-100">{r.label}</div>
                      <div className="text-[10px] text-slate-400 truncate">{r.desc}</div>
                    </div>
                    {currentUser?.role === r.role && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#c4a47c]"></span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* User Auth or Dashboard Button */}
          {currentUser ? (
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center space-x-2 p-1 bg-[#161618] hover:bg-[#1c1c20] border border-white/10 rounded text-xs transition cursor-pointer"
              >
                <div className="text-right hidden sm:block pr-1">
                  <p className="text-[10px] text-slate-400 uppercase tracking-tighter">Candidate</p>
                  <p className="text-xs font-medium text-slate-200 truncate max-w-[110px]">{currentUser.name}</p>
                </div>
                <div className="w-8 h-8 rounded-full border border-[#c4a47c]/30 p-0.5 shrink-0">
                  <img
                    src={currentUser.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80'}
                    alt={currentUser.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
                <ChevronDown className="w-3 h-3 text-slate-400 hidden sm:block" />
              </button>

              {profileDropdownOpen && (
                <div 
                  className="absolute right-0 mt-2 w-56 bg-[#161618] border border-white/10 rounded-lg shadow-2xl py-2 z-50 text-slate-200"
                  onClick={() => setProfileDropdownOpen(false)}
                >
                  <div className="px-4 py-2 border-b border-white/10">
                    <div className="font-semibold text-sm text-white truncate">{currentUser.name}</div>
                    <div className="text-xs text-[#c4a47c] capitalize">{currentUser.role.replace('_', ' ')}</div>
                    {currentUser.studentId && (
                      <div className="text-[10px] text-slate-400 font-mono mt-0.5">{currentUser.studentId}</div>
                    )}
                  </div>
                  
                  {currentUser.role === 'student' && (
                    <>
                      <button 
                        onClick={() => handleNav('student-dashboard')} 
                        className="w-full text-left px-4 py-2 text-xs hover:bg-white/5 flex items-center space-x-2"
                      >
                        <GraduationCap className="w-4 h-4 text-[#c4a47c]" />
                        <span>Student Dashboard</span>
                      </button>
                      <button 
                        onClick={() => handleNav('student-course-player')} 
                        className="w-full text-left px-4 py-2 text-xs hover:bg-white/5 flex items-center space-x-2"
                      >
                        <BookOpen className="w-4 h-4 text-emerald-400" />
                        <span>LMS Classroom</span>
                      </button>
                      <button 
                        onClick={() => handleNav('student-transcript')} 
                        className="w-full text-left px-4 py-2 text-xs hover:bg-white/5 flex items-center space-x-2"
                      >
                        <FileCheck className="w-4 h-4 text-blue-400" />
                        <span>Transcript & Grades</span>
                      </button>
                    </>
                  )}

                  {currentUser.role === 'lecturer' && (
                    <button 
                      onClick={() => handleNav('faculty-dashboard')} 
                      className="w-full text-left px-4 py-2 text-xs hover:bg-white/5 flex items-center space-x-2"
                    >
                      <Users className="w-4 h-4 text-[#c4a47c]" />
                      <span>Faculty Console</span>
                    </button>
                  )}

                  {currentUser.role === 'examination_officer' && (
                    <button 
                      onClick={() => handleNav('tems-dashboard')} 
                      className="w-full text-left px-4 py-2 text-xs hover:bg-white/5 flex items-center space-x-2"
                    >
                      <ShieldCheck className="w-4 h-4 text-purple-400" />
                      <span>TEMS Exam Center</span>
                    </button>
                  )}

                  {currentUser.role === 'registrar' && (
                    <button 
                      onClick={() => handleNav('registrar-dashboard')} 
                      className="w-full text-left px-4 py-2 text-xs hover:bg-white/5 flex items-center space-x-2"
                    >
                      <GraduationCap className="w-4 h-4 text-indigo-400" />
                      <span>Registrar Office</span>
                    </button>
                  )}

                  {currentUser.role === 'finance_officer' && (
                    <button 
                      onClick={() => handleNav('finance-dashboard')} 
                      className="w-full text-left px-4 py-2 text-xs hover:bg-white/5 flex items-center space-x-2"
                    >
                      <ShieldCheck className="w-4 h-4 text-[#c4a47c]" />
                      <span>Bursar Console</span>
                    </button>
                  )}

                  {(currentUser.role === 'admin' || currentUser.role === 'super_admin') && (
                    <button 
                      onClick={() => handleNav('admin-dashboard')} 
                      className="w-full text-left px-4 py-2 text-xs hover:bg-white/5 flex items-center space-x-2"
                    >
                      <ShieldCheck className="w-4 h-4 text-rose-400" />
                      <span>Admin Control Center</span>
                    </button>
                  )}

                  <div className="border-t border-white/10 mt-1 pt-1">
                    <button 
                      onClick={logout} 
                      className="w-full text-left px-4 py-2 text-xs text-rose-400 hover:bg-white/5 flex items-center space-x-2"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <button
                onClick={onOpenAuth}
                className="px-3 py-1.5 text-xs font-semibold text-[#c4a47c] hover:text-white border border-[#c4a47c]/40 rounded hover:bg-[#c4a47c]/10 transition cursor-pointer"
              >
                Sign In
              </button>
              <button
                onClick={() => handleNav('admissions')}
                className="px-3.5 py-1.5 text-xs font-semibold text-[#0a0a0b] bg-[#c4a47c] hover:bg-[#d5b791] rounded shadow-sm transition transform active:scale-95 cursor-pointer"
              >
                Apply Now
              </button>
            </div>
          )}

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-300 hover:text-white rounded hover:bg-white/5"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0f0f11] border-b border-white/10 px-4 py-4 space-y-2 text-xs">
          <button onClick={() => handleNav('home')} className="w-full text-left py-2 px-3 rounded hover:bg-white/5 font-medium">Home</button>
          <button onClick={() => handleNav('about')} className="w-full text-left py-2 px-3 rounded hover:bg-white/5 font-medium">About BLSM & Statement of Faith</button>
          <button onClick={() => handleNav('programs')} className="w-full text-left py-2 px-3 rounded hover:bg-white/5 font-medium">Academic Programs</button>
          <button onClick={() => handleNav('faculty')} className="w-full text-left py-2 px-3 rounded hover:bg-white/5 font-medium">Faculty</button>
          <button onClick={() => handleNav('library')} className="w-full text-left py-2 px-3 rounded hover:bg-white/5 font-medium">Theological Library</button>
          <button onClick={() => handleNav('ministry-resources')} className="w-full text-left py-2 px-3 rounded hover:bg-white/5 font-medium">Ministry Resources</button>
          <button onClick={() => handleNav('events')} className="w-full text-left py-2 px-3 rounded hover:bg-white/5 font-medium">Seminary Events</button>
          <button onClick={() => handleNav('brooks-of-life-tv')} className="w-full text-left py-2 px-3 rounded hover:bg-white/5 font-medium flex items-center justify-between text-[#c4a47c]">
            <span className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
              <span>Brooks of Life TV</span>
            </span>
            <span className="px-1.5 py-0.5 rounded bg-rose-600 text-white text-[9px] font-bold">LIVE</span>
          </button>
          <button onClick={() => handleNav('verify-certificate')} className="w-full text-left py-2 px-3 rounded hover:bg-white/5 font-medium text-[#c4a47c]">Verify Certificate Online</button>
          <button onClick={() => handleNav('admissions')} className="w-full text-left py-2 px-3 rounded bg-[#c4a47c] text-[#0a0a0b] font-bold text-xs">Apply for Admission</button>
        </div>
      )}
    </header>
  );
};
