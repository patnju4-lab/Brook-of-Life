import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  BookOpen, 
  GraduationCap, 
  Award, 
  Calendar, 
  CheckCircle, 
  Clock, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  FileText, 
  BarChart3,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { InstitutionalAnnouncementsCard } from './InstitutionalAnnouncementsCard';
import { UpcomingDeadlinesWidget } from './UpcomingDeadlinesWidget';
import { StudentQuickLinks } from './StudentQuickLinks';

export const StudentDashboard: React.FC = () => {
  const { 
    currentUser, 
    programs, 
    courses, 
    progressList, 
    certificates, 
    navigateTo,
    getStudentGPA
  } = useApp();

  const studentProgram = programs.find(p => p.id === currentUser?.programId) || programs[0];
  
  // Calculate student specific stats
  const userRecords = progressList.filter(p => p.studentId === currentUser?.id);
  const gpaInfo = currentUser ? getStudentGPA(currentUser.id) : { gpa: 3.88, totalCredits: 32, earnedCredits: 32, standing: "Dean's List" };
  const userCerts = certificates.filter(c => c.studentId === currentUser?.id || c.studentName === currentUser?.name);

  // Collect exams
  const allExams = courses.filter(c => c.examination !== undefined).map(c => ({ course: c, exam: c.examination! }));

  return (
    <div className="space-y-8 text-slate-200">
      {/* Student Welcome Banner in Sophisticated Dark Theme */}
      <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-[#1c1c20] to-[#0a0a0b] border border-white/10 p-6 sm:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-full opacity-10 pointer-events-none">
          <svg viewBox="0 0 100 100" fill="currentColor" className="text-[#c4a47c]">
            <circle cx="100" cy="0" r="80" />
          </svg>
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded bg-[#c4a47c]/20 border border-[#c4a47c]/40 text-[#c4a47c] text-xs font-semibold uppercase tracking-wider font-mono">
                Candidate: {currentUser?.studentId || 'BLSM-STU-2026-0412'}
              </span>
              <span className="px-2.5 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-500/30 text-[11px] font-bold">
                Good Standing • {gpaInfo.standing}
              </span>
            </div>

            <span className="text-[#c4a47c] uppercase tracking-[0.25em] text-[10px] font-bold block pt-1">
              Active Cohort 2026
            </span>

            <h1 className="font-serif text-3xl sm:text-4xl text-white font-bold tracking-wide leading-tight">
              Welcome, {currentUser?.name}
            </h1>

            <p className="text-xs sm:text-sm text-slate-400">
              Enrolled in <strong className="text-slate-200">{studentProgram?.title}</strong> ({studentProgram?.level}) • {studentProgram?.duration}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 relative z-10">
            <button
              onClick={() => navigateTo('student-transcript')}
              className="px-4 py-2.5 bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 font-semibold text-xs rounded-md transition cursor-pointer flex items-center space-x-2"
            >
              <FileText className="w-4 h-4 text-[#c4a47c]" />
              <span>Official Transcript</span>
            </button>

            <button
              onClick={() => navigateTo('student-certificates')}
              className="px-4 py-2.5 bg-[#c4a47c] hover:bg-[#d5b791] text-[#0a0a0b] font-bold text-xs rounded-md shadow-lg transition cursor-pointer flex items-center space-x-2"
            >
              <Award className="w-4 h-4 text-[#0a0a0b]" />
              <span>Diplomas ({userCerts.length})</span>
            </button>
          </div>
        </div>

        {/* Program Progress Bar */}
        <div className="mt-6 pt-6 border-t border-white/10 space-y-2 relative z-10">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 uppercase tracking-wider text-[11px]">
              Degree Completion: <strong className="text-white">{gpaInfo.earnedCredits}</strong> of {studentProgram?.totalCredits || 120} Credits
            </span>
            <span className="font-mono font-bold text-[#c4a47c]">
              {Math.min(100, Math.round((gpaInfo.earnedCredits / (studentProgram?.totalCredits || 120)) * 100))}% Completed
            </span>
          </div>
          <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
            <div 
              className="bg-[#c4a47c] h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, Math.round((gpaInfo.earnedCredits / (studentProgram?.totalCredits || 120)) * 100))}%` }}
            />
          </div>
        </div>
      </div>

      {/* 4 Stat Metric Cards in Sophisticated Dark Theme */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 bg-[#161618] rounded-lg border border-white/5 shadow-md space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs uppercase tracking-wider font-semibold">
            <span>Cumulative GPA</span>
            <TrendingUp className="w-4 h-4 text-[#c4a47c]" />
          </div>
          <div className="text-2xl sm:text-3xl font-serif text-white">
            {gpaInfo.gpa.toFixed(2)} <span className="text-xs font-sans text-slate-500 font-normal">/ 4.00</span>
          </div>
          <div className="text-[11px] text-[#c4a47c] font-medium font-serif italic">First Class Honors Track</div>
        </div>

        <div className="p-5 bg-[#161618] rounded-lg border border-white/5 shadow-md space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs uppercase tracking-wider font-semibold">
            <span>Active Courses</span>
            <BookOpen className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-serif text-white">
            {courses.length} <span className="text-xs font-sans text-slate-500 font-normal">Enrolled</span>
          </div>
          <div className="text-[11px] text-slate-400 font-medium">Curriculum Track</div>
        </div>

        <div className="p-5 bg-[#161618] rounded-lg border border-white/5 shadow-md space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs uppercase tracking-wider font-semibold">
            <span>Earned Credits</span>
            <GraduationCap className="w-4 h-4 text-[#c4a47c]" />
          </div>
          <div className="text-2xl sm:text-3xl font-serif text-white">
            {gpaInfo.earnedCredits} <span className="text-xs font-sans text-slate-500 font-normal">Units</span>
          </div>
          <div className="text-[11px] text-[#c4a47c] font-medium">{studentProgram?.duration}</div>
        </div>

        <div className="p-5 bg-[#161618] rounded-lg border border-white/5 shadow-md space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs uppercase tracking-wider font-semibold">
            <span>TEMS Clearance</span>
            <ShieldCheck className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-serif text-emerald-400">
            Cleared
          </div>
          <div className="text-[11px] text-slate-400 font-medium">Proctoring Active</div>
        </div>
      </div>

      {/* Institutional Announcements Card (Prominently Placed) */}
      <InstitutionalAnnouncementsCard />

      {/* Real-time Upcoming Academic Deadlines & Exam Countdown Widget */}
      <UpcomingDeadlinesWidget />

      {/* Quick Links & Campus Resources Section */}
      <StudentQuickLinks />

      {/* Main Enrolled Courses Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-xl font-bold text-white tracking-wide">
            Enrolled Theological Courses
          </h2>
          <button
            onClick={() => navigateTo('student-courses')}
            className="text-xs font-medium text-[#c4a47c] hover:underline flex items-center space-x-1 cursor-pointer"
          >
            <span>View All Courses</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {courses.map(course => {
            const prog = userRecords.find(p => p.courseId === course.id);
            const percent = prog ? prog.completionPercentage : 75;

            return (
              <div 
                key={course.id}
                className="bg-[#161618] rounded-lg border border-white/5 hover:border-white/15 p-6 shadow-md transition space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 bg-[#c4a47c]/15 text-[#c4a47c] border border-[#c4a47c]/30 rounded font-mono font-bold text-xs">
                      {course.courseCode}
                    </span>
                    <span className="text-xs font-medium text-slate-400">
                      {course.credits} Credits • {course.modules.length} Modules
                    </span>
                  </div>

                  <h3 className="font-serif text-lg font-bold text-white leading-snug">
                    {course.title}
                  </h3>

                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {course.description}
                  </p>

                  <div className="text-[11px] text-slate-400 pt-1">
                    <strong className="text-slate-300">Lecturer:</strong> {course.instructorName}
                  </div>

                  {/* Course Progress */}
                  <div className="space-y-1.5 pt-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400 uppercase tracking-wider text-[10px]">Module Progress</span>
                      <span className="font-mono font-bold text-[#c4a47c]">{percent}%</span>
                    </div>
                    <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
                      <div 
                        className="bg-[#c4a47c] h-full rounded-full"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <div className="text-xs">
                    <span className="text-slate-500">Current Grade: </span>
                    <span className="font-bold text-emerald-400 font-mono">{prog?.letterGrade || 'A (92%)'}</span>
                  </div>

                  <button
                    onClick={() => navigateTo('student-course-player', course.id)}
                    className="px-4 py-2 bg-[#c4a47c] hover:bg-[#d5b791] text-[#0a0a0b] font-bold rounded text-xs transition cursor-pointer flex items-center space-x-1.5"
                  >
                    <span>Enter Classroom</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Upcoming Exams & Assignments Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming TEMS Exams */}
        <div className="bg-[#161618] rounded-lg border border-white/5 p-6 shadow-md space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-5 h-5 text-[#c4a47c]" />
              <h3 className="font-serif text-base font-bold text-white italic">
                TEMS Examination Schedule
              </h3>
            </div>
            <button
              onClick={() => navigateTo('student-exams')}
              className="text-xs font-semibold text-[#c4a47c] hover:underline cursor-pointer"
            >
              Enter Hall
            </button>
          </div>

          <div className="space-y-3">
            {allExams.slice(0, 2).map(({ course, exam }) => (
              <div key={exam.id} className="p-3.5 bg-white/5 rounded border-l-2 border-[#c4a47c] flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-white font-serif">{exam.title}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">{course.courseCode} • {exam.durationMinutes} mins • Pass: {exam.passMarkPercent}%</div>
                </div>
                <button
                  onClick={() => navigateTo('student-exams')}
                  className="px-3 py-1.5 bg-[#c4a47c] hover:bg-[#d5b791] text-[#0a0a0b] text-xs font-bold rounded cursor-pointer transition"
                >
                  Start Exam
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Coursework & Practicums */}
        <div className="bg-[#161618] rounded-lg border border-white/5 p-6 shadow-md space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center space-x-2">
              <FileText className="w-5 h-5 text-[#c4a47c]" />
              <h3 className="font-serif text-base font-bold text-white italic">
                Coursework & Practicums
              </h3>
            </div>
            <button
              onClick={() => navigateTo('student-assignments')}
              className="text-xs font-semibold text-[#c4a47c] hover:underline cursor-pointer"
            >
              Voice-to-Text Portal →
            </button>
          </div>

          <div className="space-y-3">
            {courses.slice(0, 2).map(c => (
              <div key={c.id} className="p-3.5 bg-white/5 rounded border-l-2 border-[#c4a47c] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="text-xs font-bold text-slate-200">{c.assignments[0]?.title || 'Weekly Exegetical Synthesis'}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">{c.courseCode} • Supports Spoken Voice Reflection</div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => navigateTo('student-assignments')}
                    className="px-3 py-1.5 bg-[#c4a47c] hover:bg-[#d5b791] text-[#0a0a0b] text-xs font-bold rounded transition cursor-pointer"
                  >
                    🎙️ Record Voice
                  </button>
                  <button
                    onClick={() => navigateTo('student-course-player', c.id)}
                    className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-slate-200 text-xs font-semibold rounded transition cursor-pointer"
                  >
                    Open Lesson
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
