import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Clock, 
  Calendar, 
  AlertTriangle, 
  CheckCircle2, 
  FileText, 
  ShieldCheck, 
  ArrowRight, 
  Mic, 
  Sparkles,
  Filter,
  Layers,
  ChevronRight,
  Flame,
  Award,
  BookOpen
} from 'lucide-react';
import { Course, Assignment, Examination } from '../../types';

export interface DeadlineItem {
  id: string;
  type: 'assignment' | 'examination';
  title: string;
  course: Course;
  dueDate: string; // ISO string
  weightagePercent: number;
  totalMarks: number;
  instructions?: string;
  submissionType?: string;
  examType?: string;
  durationMinutes?: number;
  isSubmitted: boolean;
  submissionDate?: string;
  score?: number;
  isVoiceSubmitted?: boolean;
}

export const UpcomingDeadlinesWidget: React.FC = () => {
  const { 
    courses, 
    currentUser, 
    submissions, 
    examAttempts, 
    navigateTo 
  } = useApp();

  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [filterType, setFilterType] = useState<'all' | 'assignments' | 'exams' | 'urgent' | 'completed'>('all');

  // Update clock every second for live real-time countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Collect all assignments and exams across courses
  const allDeadlines: DeadlineItem[] = [];

  courses.forEach(course => {
    // 1. Process Assignments
    course.assignments.forEach(assignment => {
      const studentSub = submissions.find(
        s => (s.assignmentId === assignment.id || s.assignmentId === `assign-${course.id}`) &&
             (s.studentId === currentUser?.id || s.studentName === currentUser?.name)
      );

      allDeadlines.push({
        id: assignment.id,
        type: 'assignment',
        title: assignment.title,
        course,
        dueDate: assignment.dueDate,
        weightagePercent: assignment.weightagePercent || 20,
        totalMarks: assignment.totalMarks || 100,
        instructions: assignment.instructions,
        submissionType: assignment.submissionType,
        isSubmitted: Boolean(studentSub),
        submissionDate: studentSub?.submittedAt,
        score: studentSub?.score,
        isVoiceSubmitted: studentSub?.isVoiceToText
      });
    });

    // 2. Process Examinations
    if (course.examination) {
      const exam = course.examination;
      const studentAttempt = examAttempts.find(
        a => a.examId === exam.id && a.studentId === currentUser?.id
      );

      allDeadlines.push({
        id: exam.id,
        type: 'examination',
        title: exam.title,
        course,
        dueDate: exam.endDate,
        weightagePercent: exam.weightagePercent || 40,
        totalMarks: exam.totalMarks || 100,
        instructions: exam.instructions,
        examType: exam.type,
        durationMinutes: exam.durationMinutes,
        isSubmitted: Boolean(studentAttempt),
        submissionDate: studentAttempt?.submittedAt,
        score: studentAttempt?.score
      });
    }
  });

  // Calculate countdown components for a target date
  const getCountdown = (targetDateStr: string) => {
    const target = new Date(targetDateStr).getTime();
    const now = currentTime.getTime();
    const diff = target - now;

    if (diff <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        totalSeconds: 0,
        isOverdue: true,
        isUrgent: false
      };
    }

    const totalSeconds = Math.floor(diff / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return {
      days,
      hours,
      minutes,
      seconds,
      totalSeconds,
      isOverdue: false,
      isUrgent: totalSeconds < 86400 * 3 // Less than 3 days
    };
  };

  // Sort deadlines by earliest due date
  const sortedDeadlines = [...allDeadlines].sort((a, b) => {
    const dateA = new Date(a.dueDate).getTime();
    const dateB = new Date(b.dueDate).getTime();
    return dateA - dateB;
  });

  // Filter items based on active tab
  const filteredDeadlines = sortedDeadlines.filter(item => {
    const cd = getCountdown(item.dueDate);
    if (filterType === 'completed') return item.isSubmitted;
    if (filterType === 'assignments') return item.type === 'assignment' && !item.isSubmitted;
    if (filterType === 'exams') return item.type === 'examination' && !item.isSubmitted;
    if (filterType === 'urgent') return !item.isSubmitted && cd.isUrgent && !cd.isOverdue;
    return filterType === 'all';
  });

  const pendingCount = allDeadlines.filter(d => !d.isSubmitted).length;
  const assignmentsPendingCount = allDeadlines.filter(d => d.type === 'assignment' && !d.isSubmitted).length;
  const examsPendingCount = allDeadlines.filter(d => d.type === 'examination' && !d.isSubmitted).length;
  const urgentCount = allDeadlines.filter(d => {
    const cd = getCountdown(d.dueDate);
    return !d.isSubmitted && cd.isUrgent && !cd.isOverdue;
  }).length;

  return (
    <div className="bg-[#121214] border border-[#27272a] rounded-2xl p-5 sm:p-7 shadow-2xl space-y-6 relative overflow-hidden">
      {/* Decorative Gold Radial Glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#c4a47c]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#27272a] pb-5">
        <div>
          <div className="flex items-center space-x-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#c4a47c]">
              Real-Time Academic Clock
            </span>
            <span className="text-[10px] text-slate-500 font-mono">
              • {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
            </span>
          </div>

          <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-white tracking-wide mt-1 flex items-center space-x-2.5">
            <Clock className="w-5 h-5 text-[#c4a47c]" />
            <span>Upcoming Deadlines & Examination Schedule</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Live countdown indicators for active coursework submissions, exegetical practicums, and proctored examinations.
          </p>
        </div>

        {/* Quick Filter Tabs */}
        <div className="flex items-center space-x-1.5 overflow-x-auto bg-[#18181b] p-1 rounded-xl border border-[#27272a] text-xs font-semibold self-start lg:self-center">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1.5 rounded-lg transition whitespace-nowrap cursor-pointer ${
              filterType === 'all'
                ? 'bg-[#c4a47c] text-[#0a0a0b] font-bold shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            All Active ({pendingCount})
          </button>
          <button
            onClick={() => setFilterType('assignments')}
            className={`px-3 py-1.5 rounded-lg transition whitespace-nowrap cursor-pointer flex items-center space-x-1 ${
              filterType === 'assignments'
                ? 'bg-[#c4a47c] text-[#0a0a0b] font-bold shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <FileText className="w-3 h-3" />
            <span>Papers ({assignmentsPendingCount})</span>
          </button>
          <button
            onClick={() => setFilterType('exams')}
            className={`px-3 py-1.5 rounded-lg transition whitespace-nowrap cursor-pointer flex items-center space-x-1 ${
              filterType === 'exams'
                ? 'bg-[#c4a47c] text-[#0a0a0b] font-bold shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <ShieldCheck className="w-3 h-3" />
            <span>Exams ({examsPendingCount})</span>
          </button>
          <button
            onClick={() => setFilterType('urgent')}
            className={`px-3 py-1.5 rounded-lg transition whitespace-nowrap cursor-pointer flex items-center space-x-1 ${
              filterType === 'urgent'
                ? 'bg-amber-500 text-slate-950 font-bold shadow'
                : 'text-amber-400 hover:text-amber-300'
            }`}
          >
            <Flame className="w-3 h-3" />
            <span>Urgent ({urgentCount})</span>
          </button>
          <button
            onClick={() => setFilterType('completed')}
            className={`px-3 py-1.5 rounded-lg transition whitespace-nowrap cursor-pointer flex items-center space-x-1 ${
              filterType === 'completed'
                ? 'bg-emerald-600 text-white font-bold shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <CheckCircle2 className="w-3 h-3" />
            <span>Submitted</span>
          </button>
        </div>
      </div>

      {/* Grid of Deadline Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredDeadlines.map(item => {
          const countdown = getCountdown(item.dueDate);
          const dueDateObj = new Date(item.dueDate);
          const isExam = item.type === 'examination';

          return (
            <div 
              key={item.id}
              className={`rounded-2xl border p-5 transition-all duration-300 flex flex-col justify-between space-y-4 shadow-lg relative overflow-hidden ${
                item.isSubmitted
                  ? 'bg-[#151a17] border-emerald-900/50 hover:border-emerald-700/60'
                  : countdown.isUrgent
                    ? 'bg-gradient-to-b from-[#1f1614] to-[#141212] border-amber-500/40 hover:border-amber-500/70 shadow-amber-950/20'
                    : 'bg-[#18181b] border-[#27272a] hover:border-[#3f3f46]'
              }`}
            >
              {/* Top Meta Badges */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="px-2.5 py-0.5 rounded-md bg-[#c4a47c]/15 border border-[#c4a47c]/30 text-[#c4a47c] text-xs font-mono font-bold">
                      {item.course.courseCode}
                    </span>
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                      isExam
                        ? 'bg-purple-950/70 border border-purple-800/60 text-purple-300'
                        : 'bg-blue-950/70 border border-blue-800/60 text-blue-300'
                    }`}>
                      {isExam ? 'TEMS Exam' : 'Practicum Paper'}
                    </span>
                  </div>

                  {item.isSubmitted ? (
                    <span className="px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-400 text-[10px] font-bold flex items-center space-x-1">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>{item.score !== undefined ? `Graded ${item.score}%` : 'Submitted'}</span>
                    </span>
                  ) : countdown.isOverdue ? (
                    <span className="px-2 py-0.5 rounded-full bg-rose-950/80 border border-rose-800 text-rose-400 text-[10px] font-bold">
                      Window Closed
                    </span>
                  ) : countdown.isUrgent ? (
                    <span className="px-2 py-0.5 rounded-full bg-amber-950/80 border border-amber-600/70 text-amber-300 text-[10px] font-bold flex items-center space-x-1 animate-pulse">
                      <Flame className="w-3 h-3 text-amber-400" />
                      <span>Due Soon</span>
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-full bg-slate-800/80 border border-slate-700 text-slate-300 text-[10px] font-semibold">
                      Open Window
                    </span>
                  )}
                </div>

                {/* Title */}
                <div>
                  <h3 className="font-cinzel text-sm sm:text-base font-bold text-white line-clamp-2 leading-snug">
                    {item.title}
                  </h3>
                  <div className="text-[11px] text-slate-400 mt-1 flex items-center space-x-1">
                    <span>{item.course.title}</span>
                  </div>
                </div>

                {/* Weightage & Duration */}
                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-white/5">
                  <span><strong>Weight:</strong> {item.weightagePercent}% of Final</span>
                  <span><strong>Total:</strong> {item.totalMarks} Marks</span>
                  {isExam && item.durationMinutes && (
                    <span><strong>Duration:</strong> {item.durationMinutes}m</span>
                  )}
                </div>

                {/* REAL-TIME COUNTDOWN TIMER BOXES */}
                {!item.isSubmitted && !countdown.isOverdue && (
                  <div className="space-y-1.5 pt-1">
                    <div className="flex justify-between items-center text-[10px] uppercase font-mono font-semibold text-slate-400">
                      <span className="flex items-center space-x-1">
                        <Clock className="w-3 h-3 text-[#c4a47c]" />
                        <span>Time Remaining:</span>
                      </span>
                      <span className="text-[#c4a47c]">
                        Due {dueDateObj.toLocaleDateString([], { month: 'short', day: 'numeric' })}
                      </span>
                    </div>

                    <div className="grid grid-cols-4 gap-1.5 text-center">
                      <div className="p-2 bg-[#0e0e10] border border-[#27272a] rounded-lg">
                        <div className="font-mono text-base font-bold text-white">
                          {String(countdown.days).padStart(2, '0')}
                        </div>
                        <div className="text-[9px] font-mono uppercase text-slate-400 mt-0.5">
                          Days
                        </div>
                      </div>

                      <div className="p-2 bg-[#0e0e10] border border-[#27272a] rounded-lg">
                        <div className="font-mono text-base font-bold text-white">
                          {String(countdown.hours).padStart(2, '0')}
                        </div>
                        <div className="text-[9px] font-mono uppercase text-slate-400 mt-0.5">
                          Hours
                        </div>
                      </div>

                      <div className="p-2 bg-[#0e0e10] border border-[#27272a] rounded-lg">
                        <div className="font-mono text-base font-bold text-[#c4a47c]">
                          {String(countdown.minutes).padStart(2, '0')}
                        </div>
                        <div className="text-[9px] font-mono uppercase text-slate-400 mt-0.5">
                          Mins
                        </div>
                      </div>

                      <div className="p-2 bg-[#0e0e10] border border-[#27272a] rounded-lg relative overflow-hidden">
                        <div className="font-mono text-base font-bold text-amber-400 animate-pulse">
                          {String(countdown.seconds).padStart(2, '0')}
                        </div>
                        <div className="text-[9px] font-mono uppercase text-slate-400 mt-0.5">
                          Secs
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Submitted / Completed Info Banner */}
                {item.isSubmitted && (
                  <div className="p-3 bg-emerald-950/40 border border-emerald-800/40 rounded-xl space-y-1">
                    <div className="text-xs font-semibold text-emerald-300 flex items-center space-x-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Submission Received</span>
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono">
                      Submitted on {item.submissionDate ? new Date(item.submissionDate).toLocaleDateString() : 'Active Term'}
                      {item.isVoiceSubmitted && ' • Spoken Voice Attached'}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-[#27272a]">
                {item.isSubmitted ? (
                  <button
                    onClick={() => navigateTo(isExam ? 'student-exams' : 'student-assignments')}
                    className="w-full py-2 bg-emerald-950/60 hover:bg-emerald-900/60 text-emerald-300 font-semibold rounded-xl text-xs transition cursor-pointer flex items-center justify-center space-x-1.5 border border-emerald-800/50"
                  >
                    <span>View Submission Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : isExam ? (
                  <button
                    onClick={() => navigateTo('student-exams')}
                    className="w-full py-2.5 bg-gradient-to-r from-[#c4a47c] to-[#b39166] hover:from-[#d5b58d] hover:to-[#c4a47c] text-[#0a0a0b] font-bold rounded-xl text-xs uppercase tracking-wider transition cursor-pointer flex items-center justify-center space-x-1.5 shadow-md shadow-[#c4a47c]/10"
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Enter TEMS Exam Hall</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => navigateTo('student-assignments')}
                      className="py-2.5 bg-[#c4a47c] hover:bg-[#d5b791] text-[#0a0a0b] font-bold rounded-xl text-xs transition cursor-pointer flex items-center justify-center space-x-1 shadow-md"
                    >
                      <Mic className="w-3 h-3" />
                      <span>Spoken Voice</span>
                    </button>
                    <button
                      onClick={() => navigateTo('student-course-player', item.course.id)}
                      className="py-2.5 bg-[#1f1f23] hover:bg-[#27272a] text-slate-200 hover:text-white font-semibold rounded-xl text-xs transition cursor-pointer flex items-center justify-center space-x-1 border border-[#27272a]"
                    >
                      <span>Open Lesson</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {filteredDeadlines.length === 0 && (
        <div className="p-8 text-center bg-[#18181b] rounded-2xl border border-[#27272a] text-slate-400 space-y-2">
          <CheckCircle2 className="w-8 h-8 mx-auto text-emerald-400" />
          <div className="font-cinzel text-sm font-bold text-white">No Pending Deadlines In This Category</div>
          <p className="text-xs text-slate-400">
            You are completely up-to-date with your academic coursework and examinations.
          </p>
        </div>
      )}
    </div>
  );
};
