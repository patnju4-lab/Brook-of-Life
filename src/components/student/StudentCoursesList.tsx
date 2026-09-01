import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  BookOpen, 
  Search, 
  Filter, 
  ArrowRight, 
  CheckCircle, 
  CheckCircle2,
  Layers, 
  Clock, 
  PlusCircle, 
  Sparkles,
  Award,
  BarChart3,
  GraduationCap,
  ChevronRight,
  TrendingUp,
  UserCheck
} from 'lucide-react';
import { Course, StudentCourseProgress } from '../../types';

export const StudentCoursesList: React.FC = () => {
  const { courses, progressList, currentUser, enrollInCourse, navigateTo, schools } = useApp();
  const [activeTab, setActiveTab] = useState<'enrolled' | 'available'>('enrolled');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSchool, setSelectedSchool] = useState('All');
  const [statusFilter, setStatusFilter] = useState<'all' | 'in_progress' | 'completed' | 'not_started'>('all');
  const [enrolledNotice, setEnrolledNotice] = useState<string | null>(null);

  const studentRecords = progressList.filter(e => e.studentId === currentUser?.id);
  const enrolledCourseIds = studentRecords.map(e => e.courseId);

  // If student has explicit progress or default enrolled
  const enrolledCourses = courses.filter(c => enrolledCourseIds.includes(c.id));
  // If no enrolled courses in progress list, default to initial active courses
  const effectiveEnrolledCourses = enrolledCourses.length > 0 
    ? enrolledCourses 
    : courses.slice(0, 3);

  const availableCourses = courses;

  const currentList = activeTab === 'enrolled' ? effectiveEnrolledCourses : availableCourses;

  // Helper to calculate rich dynamic progress for any course
  const getCourseProgress = (course: Course) => {
    const prog = studentRecords.find(e => e.courseId === course.id);
    const isEnrolled = enrolledCourseIds.includes(course.id) || (enrolledCourses.length === 0 && courses.slice(0, 3).some(c => c.id === course.id));

    // Calculate total lessons in course
    let totalLessons = 0;
    let totalQuizzes = 0;

    course.modules.forEach(m => {
      m.units.forEach(u => {
        totalLessons += u.lessons.length;
        u.lessons.forEach(l => {
          if (l.quiz && l.quiz.length > 0) {
            totalQuizzes++;
          }
        });
      });
    });

    if (totalLessons === 0) totalLessons = 3; // safe fallback

    const completedLessonsCount = prog?.completedLessonIds?.length || (isEnrolled && prog?.isCompleted ? totalLessons : 0);
    const quizzesPassedCount = prog?.quizScores?.filter(q => q.passed)?.length || 0;
    const isCompleted = Boolean(prog?.isCompleted || (totalLessons > 0 && completedLessonsCount >= totalLessons));

    let percent = 0;
    if (isCompleted) {
      percent = 100;
    } else if (isEnrolled) {
      percent = totalLessons > 0 ? Math.min(99, Math.round((completedLessonsCount / totalLessons) * 100)) : 0;
    }

    return {
      prog,
      isEnrolled,
      totalLessons,
      totalQuizzes,
      completedLessonsCount,
      quizzesPassedCount,
      isCompleted,
      percent,
      letterGrade: prog?.letterGrade,
      gradePoints: prog?.gradePoints,
      finalScore: prog?.finalCourseScore
    };
  };

  const filtered = currentList.filter(c => {
    const matchesSchool = selectedSchool === 'All' || c.schoolId === selectedSchool;
    const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.courseCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.instructorName.toLowerCase().includes(searchQuery.toLowerCase());
    
    const { isCompleted, percent, isEnrolled } = getCourseProgress(c);
    let matchesStatus = true;
    if (statusFilter === 'completed') {
      matchesStatus = isCompleted || percent === 100;
    } else if (statusFilter === 'in_progress') {
      matchesStatus = isEnrolled && percent > 0 && percent < 100;
    } else if (statusFilter === 'not_started') {
      matchesStatus = !isEnrolled || percent === 0;
    }

    return matchesSchool && matchesSearch && matchesStatus;
  });

  // Calculate overall student progress stats across all enrolled courses
  const enrolledProgressStats = effectiveEnrolledCourses.map(c => getCourseProgress(c));
  const totalEnrolledCredits = effectiveEnrolledCourses.reduce((acc, c) => acc + (c.credits || 3), 0);
  const completedCoursesCount = enrolledProgressStats.filter(s => s.isCompleted).length;
  const overallCompletionPercentage = enrolledProgressStats.length > 0
    ? Math.round(enrolledProgressStats.reduce((acc, s) => acc + s.percent, 0) / enrolledProgressStats.length)
    : 0;

  const handleEnroll = (course: Course) => {
    if (!currentUser) return;
    enrollInCourse(course.id, currentUser.id);
    setEnrolledNotice(`Successfully enrolled in ${course.courseCode} — ${course.title}!`);
    setTimeout(() => setEnrolledNotice(null), 4000);
  };

  return (
    <div className="space-y-6 text-slate-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded bg-[#c4a47c]/15 border border-[#c4a47c]/30 text-[#c4a47c] text-xs font-mono font-bold">
              Brooks of Life Academic Portal
            </span>
            <span className="text-xs text-slate-400">Semester Term 2026</span>
          </div>
          <h1 className="font-cinzel text-2xl sm:text-3xl font-bold text-white tracking-wide mt-1">
            Course Catalog & Curriculum
          </h1>
          <p className="text-xs text-slate-400">
            Monitor real-time course completions, progress milestones, and enrolled theological electives.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center space-x-2 bg-[#161618] border border-white/10 p-1 rounded-xl text-xs font-semibold self-start sm:self-center">
          <button
            onClick={() => setActiveTab('enrolled')}
            className={`px-4 py-2 rounded-lg transition cursor-pointer flex items-center space-x-1.5 ${
              activeTab === 'enrolled' 
                ? 'bg-gradient-to-r from-[#c4a47c] to-[#b39166] text-[#0a0a0b] font-bold shadow-md' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>My Active Courses ({effectiveEnrolledCourses.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('available')}
            className={`px-4 py-2 rounded-lg transition cursor-pointer flex items-center space-x-1.5 ${
              activeTab === 'available' 
                ? 'bg-gradient-to-r from-[#c4a47c] to-[#b39166] text-[#0a0a0b] font-bold shadow-md' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>All Electives ({availableCourses.length})</span>
          </button>
        </div>
      </div>

      {/* Dynamic Academic Progress Summary Banner */}
      <div className="bg-[#121214] border border-[#27272a] rounded-2xl p-5 sm:p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center space-x-2">
              <BarChart3 className="w-4 h-4 text-[#c4a47c]" />
              <span className="font-cinzel text-sm font-bold text-white uppercase tracking-wider">
                Overall Degree Progress Summary
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Track your module units, lesson completions, quiz mastery, and faculty practicums toward graduation.
            </p>

            {/* Master Progress Bar */}
            <div className="space-y-1.5 pt-1">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400 font-medium">Average Curriculum Completion</span>
                <span className="font-mono font-bold text-[#c4a47c] text-sm">{overallCompletionPercentage}%</span>
              </div>
              <div className="w-full bg-[#0e0e10] border border-[#27272a] rounded-full h-3 p-0.5 overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-500 ${
                    overallCompletionPercentage === 100
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-400'
                      : overallCompletionPercentage >= 70
                        ? 'bg-gradient-to-r from-[#c4a47c] via-amber-400 to-amber-300 shadow-[0_0_12px_rgba(196,164,124,0.4)]'
                        : 'bg-gradient-to-r from-amber-600 to-[#c4a47c]'
                  }`}
                  style={{ width: `${overallCompletionPercentage}%` }}
                />
              </div>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4 w-full lg:w-auto">
            <div className="p-3.5 bg-[#18181b] border border-[#27272a] rounded-xl text-center">
              <div className="text-lg sm:text-xl font-mono font-bold text-white">
                {effectiveEnrolledCourses.length}
              </div>
              <div className="text-[10px] text-slate-400 font-mono uppercase tracking-wider mt-0.5">
                Active Courses
              </div>
            </div>

            <div className="p-3.5 bg-[#18181b] border border-[#27272a] rounded-xl text-center">
              <div className="text-lg sm:text-xl font-mono font-bold text-emerald-400">
                {completedCoursesCount}
              </div>
              <div className="text-[10px] text-slate-400 font-mono uppercase tracking-wider mt-0.5">
                Completed
              </div>
            </div>

            <div className="p-3.5 bg-[#18181b] border border-[#27272a] rounded-xl text-center">
              <div className="text-lg sm:text-xl font-mono font-bold text-[#c4a47c]">
                {totalEnrolledCredits}
              </div>
              <div className="text-[10px] text-slate-400 font-mono uppercase tracking-wider mt-0.5">
                Credit Hours
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enrollment Notice Toast */}
      {enrolledNotice && (
        <div className="p-3 bg-emerald-950/60 border border-emerald-800/60 rounded-xl text-xs text-emerald-300 flex items-center space-x-2 animate-fadeIn">
          <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{enrolledNotice}</span>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row gap-3 bg-[#121214] p-4 rounded-2xl border border-[#27272a] shadow-md">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search courses by code, title, or lecturer..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-[#18181b] border border-[#27272a] text-slate-200 placeholder-slate-500 focus:outline-none focus:border-[#c4a47c]"
          />
        </div>

        {/* Status Filter Chips */}
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 md:pb-0 text-xs">
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-3 py-1.5 rounded-lg font-medium transition whitespace-nowrap cursor-pointer ${
              statusFilter === 'all'
                ? 'bg-[#c4a47c]/20 text-[#c4a47c] border border-[#c4a47c]/40 font-bold'
                : 'bg-[#18181b] text-slate-400 border border-[#27272a] hover:text-white'
            }`}
          >
            All Status
          </button>
          <button
            onClick={() => setStatusFilter('in_progress')}
            className={`px-3 py-1.5 rounded-lg font-medium transition whitespace-nowrap cursor-pointer ${
              statusFilter === 'in_progress'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold'
                : 'bg-[#18181b] text-slate-400 border border-[#27272a] hover:text-white'
            }`}
          >
            In Progress
          </button>
          <button
            onClick={() => setStatusFilter('completed')}
            className={`px-3 py-1.5 rounded-lg font-medium transition whitespace-nowrap cursor-pointer ${
              statusFilter === 'completed'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold'
                : 'bg-[#18181b] text-slate-400 border border-[#27272a] hover:text-white'
            }`}
          >
            Completed
          </button>
          <button
            onClick={() => setStatusFilter('not_started')}
            className={`px-3 py-1.5 rounded-lg font-medium transition whitespace-nowrap cursor-pointer ${
              statusFilter === 'not_started'
                ? 'bg-slate-700/40 text-slate-300 border border-slate-600 font-bold'
                : 'bg-[#18181b] text-slate-400 border border-[#27272a] hover:text-white'
            }`}
          >
            Not Started
          </button>
        </div>

        <select
          value={selectedSchool}
          onChange={e => setSelectedSchool(e.target.value)}
          className="px-3 py-2 text-xs rounded-xl border border-[#27272a] bg-[#18181b] text-slate-200 font-medium focus:outline-none focus:border-[#c4a47c]"
        >
          <option value="All">All Theological Schools</option>
          {schools.map(s => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </select>
      </div>

      {/* Course Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(course => {
          const school = schools.find(s => s.id === course.schoolId);
          const { 
            isEnrolled, 
            totalLessons, 
            totalQuizzes, 
            completedLessonsCount, 
            quizzesPassedCount, 
            isCompleted, 
            percent, 
            letterGrade, 
            finalScore 
          } = getCourseProgress(course);

          return (
            <div 
              key={course.id}
              className="bg-[#121214] rounded-2xl border border-[#27272a] hover:border-[#3f3f46] p-6 shadow-xl transition-all duration-200 flex flex-col justify-between space-y-4 hover:shadow-2xl"
            >
              <div className="space-y-3.5">
                {/* Header Badge Row */}
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-md bg-[#c4a47c]/15 border border-[#c4a47c]/30 text-[#c4a47c] text-xs font-mono font-bold">
                    {course.courseCode}
                  </span>
                  
                  {isCompleted ? (
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-400 text-[11px] font-bold flex items-center space-x-1">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Completed</span>
                    </span>
                  ) : isEnrolled && percent > 0 ? (
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-950/80 border border-amber-700/60 text-amber-300 text-[11px] font-bold flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>In Progress</span>
                    </span>
                  ) : isEnrolled ? (
                    <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 text-[10px] font-semibold border border-slate-700">
                      Enrolled
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-full bg-blue-950/60 border border-blue-800/50 text-blue-300 text-[10px] font-semibold">
                      Elective Available
                    </span>
                  )}
                </div>

                {/* Course Title & School */}
                <div>
                  <h3 className="font-cinzel text-base font-bold text-white leading-snug">
                    {course.title}
                  </h3>
                  <p className="text-xs text-[#c4a47c]/90 italic mt-0.5">
                    {school?.name || 'School of Systematic Theology'}
                  </p>
                </div>

                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {course.description}
                </p>

                {/* Metadata Row */}
                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-[#27272a]">
                  <span><strong>Credits:</strong> {course.credits} Hours</span>
                  <span><strong>Modules:</strong> {course.modules.length}</span>
                  <span><strong>Lecturer:</strong> {course.instructorName.split(' ')[0]} {course.instructorName.split(' ')[1] || ''}</span>
                </div>

                {/* DYNAMIC PROGRESS BAR MODULE */}
                <div className="p-3.5 bg-[#18181b] border border-[#27272a] rounded-xl space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <div className="flex items-center space-x-1.5">
                      <span className="text-slate-300 font-semibold">Completion Status</span>
                      {letterGrade && (
                        <span className="px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] font-mono font-bold">
                          Grade: {letterGrade} {finalScore ? `(${finalScore}%)` : ''}
                        </span>
                      )}
                    </div>
                    <span className={`font-mono font-bold text-xs ${
                      percent === 100 
                        ? 'text-emerald-400' 
                        : percent >= 50 
                          ? 'text-[#c4a47c]' 
                          : 'text-slate-300'
                    }`}>
                      {percent}%
                    </span>
                  </div>

                  {/* Visual Progress Bar Track */}
                  <div className="w-full bg-[#0e0e10] border border-[#27272a] rounded-full h-2.5 p-0.5 overflow-hidden relative">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${
                        percent === 100
                          ? 'bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.4)]'
                          : percent >= 70
                            ? 'bg-gradient-to-r from-[#c4a47c] via-amber-400 to-amber-300 shadow-[0_0_10px_rgba(196,164,124,0.3)]'
                            : percent >= 30
                              ? 'bg-gradient-to-r from-amber-600 to-[#c4a47c]'
                              : percent > 0
                                ? 'bg-gradient-to-r from-amber-700 to-amber-600'
                                : 'bg-slate-700'
                      }`}
                      style={{ width: `${percent}%` }}
                    />
                  </div>

                  {/* Sub-Metric Indicators */}
                  <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono pt-0.5">
                    <span className="flex items-center space-x-1">
                      <BookOpen className="w-3 h-3 text-[#c4a47c]" />
                      <span>{completedLessonsCount} / {totalLessons} Lessons</span>
                    </span>
                    
                    {totalQuizzes > 0 && (
                      <span className="flex items-center space-x-1">
                        <CheckCircle className="w-3 h-3 text-emerald-400" />
                        <span>{quizzesPassedCount} / {totalQuizzes} Quizzes</span>
                      </span>
                    )}

                    {isCompleted && (
                      <span className="text-emerald-400 font-bold">Passed</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2 border-t border-[#27272a]">
                {isEnrolled ? (
                  <button
                    onClick={() => navigateTo('student-course-player', course.id)}
                    className="w-full py-2.5 bg-gradient-to-r from-[#c4a47c] to-[#b39166] hover:from-[#d5b58d] hover:to-[#c4a47c] text-[#0a0a0b] font-bold rounded-xl text-xs uppercase tracking-wider transition cursor-pointer flex items-center justify-center space-x-1.5 shadow-lg shadow-[#c4a47c]/10"
                  >
                    <span>{isCompleted ? 'Review Classroom' : percent > 0 ? 'Resume Course' : 'Enter Classroom'}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#0a0a0b]" />
                  </button>
                ) : (
                  <button
                    onClick={() => handleEnroll(course)}
                    className="w-full py-2.5 bg-[#18181b] hover:bg-[#27272a] text-slate-200 hover:text-white font-semibold rounded-xl text-xs transition cursor-pointer flex items-center justify-center space-x-1.5 border border-[#27272a] hover:border-[#c4a47c]/40"
                  >
                    <PlusCircle className="w-3.5 h-3.5 text-[#c4a47c]" />
                    <span>Enroll in Course</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="p-12 text-center bg-[#121214] rounded-3xl border border-[#27272a] text-slate-400 space-y-3">
          <BookOpen className="w-10 h-10 mx-auto text-slate-600" />
          <div className="font-cinzel text-base font-bold text-white">No Matching Courses Found</div>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Try adjusting your search query, status filters, or school selection.
          </p>
          <button
            onClick={() => { setSearchQuery(''); setSelectedSchool('All'); setStatusFilter('all'); }}
            className="px-4 py-2 bg-[#c4a47c] text-[#0a0a0b] font-bold text-xs rounded-xl cursor-pointer mt-2"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};
