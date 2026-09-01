import React from 'react';
import { useApp } from '../../context/AppContext';
import { BROOKS_LOGO_SRC } from '../../assets/logo';
import { 
  LayoutDashboard, 
  BookOpen, 
  GraduationCap, 
  FileText, 
  CheckSquare, 
  ShieldCheck, 
  Award, 
  CreditCard, 
  Library, 
  MessageSquare, 
  LifeBuoy, 
  User, 
  Users, 
  Building, 
  Calendar, 
  FileCheck, 
  Settings, 
  ChevronRight,
  Sparkles
} from 'lucide-react';

export const PortalSidebar: React.FC = () => {
  const { 
    currentUser, 
    activeView, 
    navigateTo, 
    notificationsCount 
  } = useApp();

  if (!currentUser) return null;

  const role = currentUser.role;

  return (
    <aside className="w-full lg:w-64 bg-[#0f0f11] border border-white/10 rounded-lg text-slate-300 flex flex-col shrink-0 select-none overflow-hidden shadow-xl" id="portal-sidebar">
      {/* Institution Crest Banner */}
      <div 
        onClick={() => navigateTo('home')} 
        className="px-4 py-3 bg-[#0a0a0b] border-b border-white/10 flex items-center space-x-3 cursor-pointer hover:bg-white/5 transition"
      >
        <div className="w-8 h-8 rounded-md overflow-hidden bg-black border border-[#c4a47c]/40 shrink-0">
          <img
            src={BROOKS_LOGO_SRC}
            alt="Brooks of Life Logo"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="min-w-0">
          <div className="font-serif text-xs font-bold text-white tracking-wide truncate">Brooks of Life</div>
          <div className="text-[10px] text-[#c4a47c] truncate font-serif">Schools of Ministry -UK-</div>
        </div>
      </div>

      {/* Student/User Standing Card */}
      <div className="p-4 border-b border-white/10 bg-[#161618]">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full border border-[#c4a47c]/40 p-0.5 shrink-0">
            <img
              src={currentUser.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80'}
              alt={currentUser.name}
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          <div className="overflow-hidden min-w-0">
            <h4 className="font-serif font-bold text-xs text-white truncate">{currentUser.name}</h4>
            <div className="flex items-center space-x-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span className="text-[10px] font-semibold text-[#c4a47c] uppercase tracking-wider truncate font-mono">
                {role.replace('_', ' ')}
              </span>
            </div>
            {currentUser.studentId && (
              <span className="text-[9px] text-slate-400 font-mono block truncate">{currentUser.studentId}</span>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Sections */}
      <div className="flex-1 py-4 px-3 space-y-5 text-xs">
        {/* STUDENT PORTAL MENU */}
        {role === 'student' && (
          <>
            <div>
              <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 font-mono">
                Academic Portal
              </div>
              <div className="space-y-1">
                <button
                  onClick={() => navigateTo('student-dashboard')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded font-medium transition cursor-pointer ${
                    activeView === 'student-dashboard' 
                      ? 'bg-white/10 text-[#c4a47c] border-l-2 border-[#c4a47c]' 
                      : 'hover:bg-white/5 hover:text-white text-slate-400'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <LayoutDashboard className="w-4 h-4 text-[#c4a47c]" />
                    <span>Dashboard</span>
                  </div>
                  {activeView === 'student-dashboard' && <ChevronRight className="w-3.5 h-3.5 text-[#c4a47c]" />}
                </button>

                <button
                  onClick={() => navigateTo('student-courses')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded font-medium transition cursor-pointer ${
                    activeView === 'student-courses' 
                      ? 'bg-white/10 text-[#c4a47c] border-l-2 border-[#c4a47c]' 
                      : 'hover:bg-white/5 hover:text-white text-slate-400'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <BookOpen className="w-4 h-4 text-emerald-400" />
                    <span>Courses & Curriculum</span>
                  </div>
                </button>

                <button
                  onClick={() => navigateTo('student-course-player')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded font-medium transition cursor-pointer ${
                    activeView === 'student-course-player' || activeView === 'course-player' 
                      ? 'bg-white/10 text-[#c4a47c] border-l-2 border-[#c4a47c]' 
                      : 'hover:bg-white/5 hover:text-white text-slate-400'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <BookOpen className="w-4 h-4 text-cyan-400" />
                    <span>LMS Classroom</span>
                  </div>
                  <span className="bg-[#c4a47c]/20 text-[#c4a47c] text-[9px] px-1.5 py-0.5 rounded font-mono font-bold">Live</span>
                </button>

                <button
                  onClick={() => navigateTo('student-assignments')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded font-medium transition cursor-pointer ${
                    activeView === 'student-assignments' 
                      ? 'bg-white/10 text-[#c4a47c] border-l-2 border-[#c4a47c]' 
                      : 'hover:bg-white/5 hover:text-white text-slate-400'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <FileText className="w-4 h-4 text-blue-400" />
                    <span>Practicum Papers</span>
                  </div>
                </button>

                <button
                  onClick={() => navigateTo('student-exams')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded font-medium transition cursor-pointer ${
                    activeView === 'student-exams' 
                      ? 'bg-white/10 text-[#c4a47c] border-l-2 border-[#c4a47c]' 
                      : 'hover:bg-white/5 hover:text-white text-slate-400'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <CheckSquare className="w-4 h-4 text-purple-400" />
                    <span>TEMS Exam Hall</span>
                  </div>
                  <span className="bg-purple-950 text-purple-300 border border-purple-500/30 text-[9px] px-1.5 py-0.5 rounded font-mono">Proctor</span>
                </button>

                <button
                  onClick={() => navigateTo('student-transcript')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded font-medium transition cursor-pointer ${
                    activeView === 'student-transcript' || activeView === 'student-grades' 
                      ? 'bg-white/10 text-[#c4a47c] border-l-2 border-[#c4a47c]' 
                      : 'hover:bg-white/5 hover:text-white text-slate-400'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <Award className="w-4 h-4 text-[#c4a47c]" />
                    <span>Transcript & GPA</span>
                  </div>
                </button>

                <button
                  onClick={() => navigateTo('student-certificates')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded font-medium transition cursor-pointer ${
                    activeView === 'student-certificates' 
                      ? 'bg-white/10 text-[#c4a47c] border-l-2 border-[#c4a47c]' 
                      : 'hover:bg-white/5 hover:text-white text-slate-400'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <FileCheck className="w-4 h-4 text-amber-400" />
                    <span>Digital Diplomas</span>
                  </div>
                </button>
              </div>
            </div>

            <div>
              <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 font-mono">
                Bursary & Account
              </div>
              <div className="space-y-1">
                <button
                  onClick={() => navigateTo('student-finance')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded font-medium transition cursor-pointer ${
                    activeView === 'student-finance' 
                      ? 'bg-white/10 text-[#c4a47c] border-l-2 border-[#c4a47c]' 
                      : 'hover:bg-white/5 hover:text-white text-slate-400'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <CreditCard className="w-4 h-4 text-emerald-400" />
                    <span>Tuition & Bursary</span>
                  </div>
                </button>
              </div>
            </div>
          </>
        )}

        {/* FACULTY PORTAL MENU */}
        {role === 'lecturer' && (
          <div>
            <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 font-mono">
              Faculty Management
            </div>
            <div className="space-y-1">
              <button
                onClick={() => navigateTo('faculty-dashboard')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded font-medium transition cursor-pointer ${activeView === 'faculty-dashboard' ? 'bg-white/10 text-[#c4a47c] border-l-2 border-[#c4a47c]' : 'hover:bg-white/5 hover:text-white text-slate-400'}`}
              >
                <div className="flex items-center space-x-2.5">
                  <LayoutDashboard className="w-4 h-4 text-blue-400" />
                  <span>Faculty Console</span>
                </div>
              </button>

              <button
                onClick={() => navigateTo('student-course-player')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded font-medium transition cursor-pointer ${activeView === 'student-course-player' || activeView === 'course-player' ? 'bg-white/10 text-[#c4a47c] border-l-2 border-[#c4a47c]' : 'hover:bg-white/5 hover:text-white text-slate-400'}`}
              >
                <div className="flex items-center space-x-2.5">
                  <BookOpen className="w-4 h-4 text-emerald-400" />
                  <span>Curriculum & Lessons</span>
                </div>
              </button>
            </div>
          </div>
        )}

        {/* TEMS EXAM OFFICER MENU */}
        {role === 'examination_officer' && (
          <div>
            <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 font-mono">
              TEMS Directorate
            </div>
            <div className="space-y-1">
              <button
                onClick={() => navigateTo('tems-dashboard')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded font-medium transition cursor-pointer ${activeView === 'tems-dashboard' ? 'bg-white/10 text-[#c4a47c] border-l-2 border-[#c4a47c]' : 'hover:bg-white/5 hover:text-white text-slate-400'}`}
              >
                <div className="flex items-center space-x-2.5">
                  <ShieldCheck className="w-4 h-4 text-purple-400" />
                  <span>TEMS Examination Center</span>
                </div>
              </button>
            </div>
          </div>
        )}

        {/* REGISTRAR MENU */}
        {role === 'registrar' && (
          <div>
            <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 font-mono">
              Registrar Office
            </div>
            <div className="space-y-1">
              <button
                onClick={() => navigateTo('registrar-dashboard')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded font-medium transition cursor-pointer ${activeView === 'registrar-dashboard' ? 'bg-white/10 text-[#c4a47c] border-l-2 border-[#c4a47c]' : 'hover:bg-white/5 hover:text-white text-slate-400'}`}
              >
                <div className="flex items-center space-x-2.5">
                  <GraduationCap className="w-4 h-4 text-indigo-400" />
                  <span>Admissions & Registry</span>
                </div>
              </button>
            </div>
          </div>
        )}

        {/* FINANCE OFFICER MENU */}
        {role === 'finance_officer' && (
          <div>
            <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 font-mono">
              Bursar & Finance
            </div>
            <div className="space-y-1">
              <button
                onClick={() => navigateTo('finance-dashboard')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded font-medium transition cursor-pointer ${activeView === 'finance-dashboard' ? 'bg-white/10 text-[#c4a47c] border-l-2 border-[#c4a47c]' : 'hover:bg-white/5 hover:text-white text-slate-400'}`}
              >
                <div className="flex items-center space-x-2.5">
                  <CreditCard className="w-4 h-4 text-[#c4a47c]" />
                  <span>Billing & Stewardship</span>
                </div>
              </button>
            </div>
          </div>
        )}

        {/* SUPER ADMIN MENU */}
        {(role === 'admin' || role === 'super_admin') && (
          <div>
            <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 font-mono">
              Chancellor Admin
            </div>
            <div className="space-y-1">
              <button
                onClick={() => navigateTo('admin-dashboard')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded font-medium transition cursor-pointer ${activeView === 'admin-dashboard' ? 'bg-white/10 text-[#c4a47c] border-l-2 border-[#c4a47c]' : 'hover:bg-white/5 hover:text-white text-slate-400'}`}
              >
                <div className="flex items-center space-x-2.5">
                  <Building className="w-4 h-4 text-rose-400" />
                  <span>Admin Control Center</span>
                </div>
              </button>

              <button
                onClick={() => navigateTo('registrar-dashboard')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded font-medium transition cursor-pointer ${activeView === 'registrar-dashboard' ? 'bg-white/10 text-[#c4a47c] border-l-2 border-[#c4a47c]' : 'hover:bg-white/5 hover:text-white text-slate-400'}`}
              >
                <div className="flex items-center space-x-2.5">
                  <GraduationCap className="w-4 h-4 text-indigo-400" />
                  <span>Admissions & Records</span>
                </div>
              </button>

              <button
                onClick={() => navigateTo('tems-dashboard')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded font-medium transition cursor-pointer ${activeView === 'tems-dashboard' ? 'bg-white/10 text-[#c4a47c] border-l-2 border-[#c4a47c]' : 'hover:bg-white/5 hover:text-white text-slate-400'}`}
              >
                <div className="flex items-center space-x-2.5">
                  <ShieldCheck className="w-4 h-4 text-purple-400" />
                  <span>TEMS Exams</span>
                </div>
              </button>

              <button
                onClick={() => navigateTo('finance-dashboard')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded font-medium transition cursor-pointer ${activeView === 'finance-dashboard' ? 'bg-white/10 text-[#c4a47c] border-l-2 border-[#c4a47c]' : 'hover:bg-white/5 hover:text-white text-slate-400'}`}
              >
                <div className="flex items-center space-x-2.5">
                  <CreditCard className="w-4 h-4 text-[#c4a47c]" />
                  <span>Finance & Invoices</span>
                </div>
              </button>
            </div>
          </div>
        )}

        {/* SHARED THEOLOGICAL RESOURCES */}
        <div>
          <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 font-mono">
            Seminary Resources
          </div>
          <div className="space-y-1">
            <button
              onClick={() => navigateTo('events')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded font-medium transition cursor-pointer ${activeView === 'events' ? 'bg-white/10 text-[#c4a47c] border-l-2 border-[#c4a47c]' : 'hover:bg-white/5 hover:text-white text-slate-400'}`}
            >
              <div className="flex items-center space-x-2.5">
                <Calendar className="w-4 h-4 text-orange-400" />
                <span>Seminary Events</span>
              </div>
            </button>

            <button
              onClick={() => navigateTo('library')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded font-medium transition cursor-pointer ${activeView === 'library' ? 'bg-white/10 text-[#c4a47c] border-l-2 border-[#c4a47c]' : 'hover:bg-white/5 hover:text-white text-slate-400'}`}
            >
              <div className="flex items-center space-x-2.5">
                <Library className="w-4 h-4 text-[#c4a47c]" />
                <span>Theological Library</span>
              </div>
            </button>

            <button
              onClick={() => navigateTo('ministry-resources')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded font-medium transition cursor-pointer ${activeView === 'ministry-resources' ? 'bg-white/10 text-[#c4a47c] border-l-2 border-[#c4a47c]' : 'hover:bg-white/5 hover:text-white text-slate-400'}`}
            >
              <div className="flex items-center space-x-2.5">
                <FileText className="w-4 h-4 text-cyan-400" />
                <span>Ministry Outlines</span>
              </div>
            </button>

            <button
              onClick={() => navigateTo('contact-support')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded font-medium transition cursor-pointer ${activeView === 'contact-support' || activeView === 'contact' ? 'bg-white/10 text-[#c4a47c] border-l-2 border-[#c4a47c]' : 'hover:bg-white/5 hover:text-white text-slate-400'}`}
            >
              <div className="flex items-center space-x-2.5">
                <LifeBuoy className="w-4 h-4 text-rose-400" />
                <span>Support & Help Desk</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Footer Info in Sidebar */}
      <div className="p-3 border-t border-white/5 text-[10px] text-slate-400 text-center bg-[#0a0a0b] font-mono">
        Brooks of Life LMS v4.1.2 • 2026
      </div>
    </aside>
  );
};
