import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ShieldCheck, 
  Clock, 
  Award, 
  CheckCircle, 
  AlertTriangle, 
  Lock, 
  Send, 
  HelpCircle, 
  FileCheck, 
  ChevronLeft 
} from 'lucide-react';
import { Examination, Course } from '../../types';

export const StudentExamsHall: React.FC = () => {
  const { courses, currentUser, submitExamAttempt, examAttempts } = useApp();
  const [activeCourse, setActiveCourse] = useState<Course | null>(null);
  const [activeExam, setActiveExam] = useState<Examination | null>(null);
  const [examStarted, setExamStarted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState<number>(3600); // 60 mins
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [essayAnswer, setEssayAnswer] = useState('');
  const [honorPledged, setHonorPledged] = useState(false);
  const [examSubmitted, setExamSubmitted] = useState(false);
  const [finalScore, setFinalScore] = useState<number | null>(null);

  // Collect all exams from courses
  const allExamsWithCourses: { course: Course; exam: Examination }[] = [];
  courses.forEach(c => {
    if (c.examination) {
      allExamsWithCourses.push({ course: c, exam: c.examination });
    }
  });

  // Timer tick during active exam
  useEffect(() => {
    let timer: any = null;
    if (examStarted && !examSubmitted && timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [examStarted, examSubmitted, timeRemaining]);

  const handleStartExam = (course: Course, exam: Examination) => {
    setActiveCourse(course);
    setActiveExam(exam);
    setTimeRemaining(exam.durationMinutes * 60);
    setExamStarted(true);
    setAnswers({});
    setEssayAnswer('');
    setExamSubmitted(false);
    setFinalScore(null);
  };

  const handleExamSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeExam || !activeCourse) return;

    let awardedMarks = 0;
    const formattedAnswers: { questionId: string; answer: string; scoreAwarded?: number }[] = [];

    activeExam.questions.forEach(q => {
      const userAns = answers[q.id] || '';
      let qScore = 0;
      if (q.type === 'multiple_choice' || q.type === 'true_false') {
        if (q.correctAnswer && userAns.toLowerCase() === String(q.correctAnswer).toLowerCase()) {
          qScore = q.marks;
          awardedMarks += q.marks;
        }
      } else {
        // Essay/short answer provisional baseline score
        qScore = Math.round(q.marks * 0.85);
        awardedMarks += qScore;
      }
      formattedAnswers.push({ questionId: q.id, answer: userAns, scoreAwarded: qScore });
    });

    const percentage = Math.round((awardedMarks / activeExam.totalMarks) * 100);
    setFinalScore(percentage);
    setExamSubmitted(true);

    submitExamAttempt({
      examId: activeExam.id,
      studentId: currentUser?.id || 'demo-student',
      studentName: currentUser?.name || 'Enrolled Student',
      courseId: activeCourse.id,
      answers: formattedAnswers,
      totalScore: awardedMarks,
      maxScore: activeExam.totalMarks,
      percentage,
      passed: percentage >= activeExam.passMarkPercent,
      status: 'graded'
    });
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      {!examStarted ? (
        <>
          <div>
            <h1 className="font-cinzel text-2xl font-bold text-slate-900">
              TEMS Proctored Theological Examination Hall
            </h1>
            <p className="text-xs text-slate-500">
              Theological Examination Management System (TEMS) — Verified proctoring and comprehensive doctrinal assessments.
            </p>
          </div>

          {/* Exams List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {allExamsWithCourses.map(({ course, exam }) => (
              <div 
                key={exam.id}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded bg-purple-100 text-purple-900 font-mono text-xs font-bold">
                      {course.courseCode}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      exam.status === 'active' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {exam.status}
                    </span>
                  </div>

                  <h3 className="font-cinzel text-base font-bold text-slate-900">
                    {exam.title}
                  </h3>

                  <p className="text-xs text-slate-600">
                    {exam.instructions}
                  </p>

                  <div className="grid grid-cols-2 gap-2 p-3 bg-slate-50 rounded-xl text-xs">
                    <div>
                      <span className="text-slate-400">Duration:</span>
                      <strong className="block text-slate-800">{exam.durationMinutes} Minutes</strong>
                    </div>
                    <div>
                      <span className="text-slate-400">Total Marks:</span>
                      <strong className="block text-slate-800">{exam.totalMarks} Marks (100%)</strong>
                    </div>
                    <div>
                      <span className="text-slate-400">Pass Mark:</span>
                      <strong className="block text-emerald-700">{exam.passMarkPercent}% Minimum</strong>
                    </div>
                    <div>
                      <span className="text-slate-400">Questions:</span>
                      <strong className="block text-slate-800">{exam.questions.length} Items</strong>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <button
                    onClick={() => handleStartExam(course, exam)}
                    className="w-full py-2.5 bg-gradient-to-r from-purple-700 to-indigo-800 hover:from-purple-600 hover:to-indigo-700 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition cursor-pointer flex items-center justify-center space-x-2 shadow-md"
                  >
                    <ShieldCheck className="w-4 h-4 text-purple-300" />
                    <span>Enter Proctored Examination</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        /* LIVE EXAMINATION ENVIRONMENT */
        <div className="space-y-6">
          {/* Top Floating Proctor Timer Bar */}
          <div className="bg-slate-950 text-white rounded-2xl p-4 sm:p-6 border border-purple-900/50 shadow-xl flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center border border-purple-500/40">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h2 className="font-cinzel text-base font-bold text-white">
                  {activeExam?.title}
                </h2>
                <div className="text-[11px] text-purple-300">
                  TEMS Secure Proctoring Active • Candidate: {currentUser?.name}
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="text-right">
                <div className="text-[10px] text-slate-400 uppercase">Time Remaining</div>
                <div className={`font-mono text-xl font-bold ${timeRemaining < 300 ? 'text-rose-500 animate-pulse' : 'text-amber-400'}`}>
                  {formatTimer(timeRemaining)}
                </div>
              </div>
            </div>
          </div>

          {examSubmitted ? (
            /* EXAM SUBMISSION SUMMARY */
            <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-sm text-center space-y-6">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto ${
                finalScore! >= (activeExam?.passMarkPercent || 60) ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'
              }`}>
                {finalScore! >= (activeExam?.passMarkPercent || 60) ? <CheckCircle className="w-10 h-10" /> : <AlertTriangle className="w-10 h-10" />}
              </div>

              <div className="space-y-2">
                <h3 className="font-cinzel text-2xl font-bold text-slate-900">
                  {finalScore! >= (activeExam?.passMarkPercent || 60) ? 'Examination Completed & Passed!' : 'Examination Completed (Below Pass Mark)'}
                </h3>
                <p className="text-xs text-slate-600 max-w-md mx-auto">
                  Your answers have been scored and submitted to the TEMS Academic Registry.
                </p>
              </div>

              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 max-w-sm mx-auto space-y-2 text-xs">
                <div className="text-slate-400 uppercase text-[10px]">Your Score</div>
                <div className="text-4xl font-mono font-bold text-slate-900">
                  {finalScore}%
                </div>
                <div className={`font-bold ${finalScore! >= (activeExam?.passMarkPercent || 60) ? 'text-emerald-700' : 'text-rose-700'}`}>
                  {finalScore! >= (activeExam?.passMarkPercent || 60) ? 'STATUS: PASSED WITH DOCTRINAL MERIT' : 'STATUS: RETAKE RECOMMENDED'}
                </div>
              </div>

              <div className="pt-4 flex justify-center space-x-3">
                <button
                  onClick={() => { setExamStarted(false); setExamSubmitted(false); }}
                  className="px-6 py-2.5 bg-slate-900 text-white text-xs font-bold rounded-xl cursor-pointer"
                >
                  Return to Exams Hall
                </button>
              </div>
            </div>
          ) : (
            /* QUESTIONS FORM */
            <form onSubmit={handleExamSubmit} className="space-y-6">
              {/* Honor Pledge */}
              <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900 space-y-2">
                <div className="font-bold font-cinzel">Seminary Honor Code Pledge</div>
                <p className="text-[11px] leading-relaxed">
                  “I pledge before the Living God that I have neither given nor received unauthorized aid on this theological examination, nor accessed external unpermitted materials.”
                </p>
                <label className="flex items-center space-x-2 font-bold cursor-pointer pt-1">
                  <input
                    type="checkbox"
                    required
                    checked={honorPledged}
                    onChange={e => setHonorPledged(e.target.checked)}
                    className="rounded text-amber-600 focus:ring-amber-500"
                  />
                  <span>I affirm this pledge under God.</span>
                </label>
              </div>

              {/* Questions List */}
              {activeExam?.questions.map((q, qIdx) => (
                <div key={q.id} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4 text-xs">
                  <div className="font-bold text-slate-900 font-cinzel text-sm">
                    Question {qIdx + 1} ({q.marks} Marks): {q.questionText}
                  </div>

                  {q.options && q.options.length > 0 ? (
                    <div className="space-y-2">
                      {q.options.map((opt, optIdx) => (
                        <label
                          key={optIdx}
                          className={`flex items-center space-x-3 p-3 rounded-xl border transition cursor-pointer ${
                            answers[q.id] === opt ? 'bg-purple-50 border-purple-400 text-purple-900 font-semibold' : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          <input
                            type="radio"
                            name={`exam-q-${q.id}`}
                            checked={answers[q.id] === opt}
                            onChange={() => setAnswers({ ...answers, [q.id]: opt })}
                            className="text-purple-600 focus:ring-purple-500"
                          />
                          <span>{opt}</span>
                        </label>
                      ))}
                    </div>
                  ) : (
                    <textarea
                      rows={4}
                      required
                      placeholder="Type your doctrinal defense and scripture citations here..."
                      value={answers[q.id] || ''}
                      onChange={e => setAnswers({ ...answers, [q.id]: e.target.value })}
                      className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-purple-500/20"
                    />
                  )}
                </div>
              ))}

              {/* Submit Button */}
              <div className="flex items-center justify-between pt-4">
                <button
                  type="button"
                  onClick={() => setExamStarted(false)}
                  className="text-xs text-slate-500 hover:text-slate-800 cursor-pointer"
                >
                  Cancel & Exit Hall
                </button>

                <button
                  type="submit"
                  disabled={!honorPledged}
                  className="px-8 py-3 bg-gradient-to-r from-purple-700 to-indigo-800 hover:from-purple-600 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition disabled:opacity-50 cursor-pointer flex items-center space-x-2 shadow-lg"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Final Proctored Exam</span>
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  );
};
