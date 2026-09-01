import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ShieldCheck, 
  Award, 
  FileText, 
  Plus, 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  Layers 
} from 'lucide-react';
import { Examination, ExamQuestion } from '../../types';

export const ExamOfficerDashboard: React.FC = () => {
  const { 
    courses, 
    examAttempts, 
    createExamination, 
    currentUser 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'exams' | 'results' | 'create'>('exams');

  // New exam builder state
  const [selectedCourseId, setSelectedCourseId] = useState(courses[0]?.id || '');
  const [examTitle, setExamTitle] = useState('Comprehensive Doctrinal Examination');
  const [durationMins, setDurationMins] = useState('60');
  const [passMark, setPassMark] = useState('60');
  const [instructions, setInstructions] = useState('Proctored theological examination. Answer all questions honestly before the Lord.');
  const [createSuccess, setCreateSuccess] = useState(false);

  // Collect all exams
  const allExams: { courseTitle: string; courseCode: string; exam: Examination }[] = [];
  courses.forEach(c => {
    if (c.examination) {
      allExams.push({ courseTitle: c.title, courseCode: c.courseCode, exam: c.examination });
    }
  });

  const handleCreateExam = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCourseId || !examTitle) return;

    const sampleQuestions: ExamQuestion[] = [
      {
        id: `q-${Date.now()}-1`,
        courseId: selectedCourseId,
        type: 'multiple_choice',
        questionText: 'Which historical Christian creed famously affirmed the Holy Spirit proceeds from the Father and the Son (Filioque)?',
        options: ['Nicene-Constantinopolitan Creed', 'Athanasian Creed', 'Apostles Creed', 'Chalcedonian Definition'],
        correctAnswer: 'Nicene-Constantinopolitan Creed',
        marks: 20
      },
      {
        id: `q-${Date.now()}-2`,
        courseId: selectedCourseId,
        type: 'true_false',
        questionText: 'True or False: Biblical Inerrancy applies strictly to original autographs in all matters they affirm.',
        options: ['True', 'False'],
        correctAnswer: 'True',
        marks: 20
      },
      {
        id: `q-${Date.now()}-3`,
        courseId: selectedCourseId,
        type: 'scripture_interpretation',
        questionText: 'Exegete 2 Timothy 3:16-17 with respect to the divine inspiration and practical sufficiency of Scripture for pastoral leadership.',
        marks: 60
      }
    ];

    const newExam: Examination = {
      id: `exam-${Date.now()}`,
      courseId: selectedCourseId,
      title: examTitle,
      type: 'final',
      instructions,
      durationMinutes: parseInt(durationMins) || 60,
      totalMarks: 100,
      passMarkPercent: parseInt(passMark) || 60,
      weightagePercent: 40,
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + 30 * 86400000).toISOString(),
      status: 'active',
      questions: sampleQuestions
    };

    createExamination(selectedCourseId, newExam);
    setCreateSuccess(true);
    setTimeout(() => {
      setCreateSuccess(false);
      setActiveTab('exams');
    }, 1500);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded bg-purple-500/20 text-purple-300 font-mono text-xs font-bold">
              TEMS Examination Directorate
            </span>
          </div>
          <h1 className="font-cinzel text-2xl sm:text-3xl font-bold text-white">
            Theological Examination Office
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Proctoring control, doctrinal exam authoring, question banks, and integrity audits.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setActiveTab('create')}
            className="px-4 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-500 text-white font-bold text-xs rounded-xl flex items-center space-x-1.5 shadow-md cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Exam Paper</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 space-x-4 text-xs font-bold">
        <button
          onClick={() => setActiveTab('exams')}
          className={`pb-3 border-b-2 transition cursor-pointer ${activeTab === 'exams' ? 'border-purple-600 text-purple-700' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
        >
          Active Examination Papers ({allExams.length})
        </button>
        <button
          onClick={() => setActiveTab('results')}
          className={`pb-3 border-b-2 transition cursor-pointer ${activeTab === 'results' ? 'border-purple-600 text-purple-700' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
        >
          Proctored Exam Attempts ({examAttempts.length})
        </button>
        <button
          onClick={() => setActiveTab('create')}
          className={`pb-3 border-b-2 transition cursor-pointer ${activeTab === 'create' ? 'border-purple-600 text-purple-700' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
        >
          Author New Exam Paper
        </button>
      </div>

      {/* TAB 1: ALL EXAMS */}
      {activeTab === 'exams' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {allExams.map(({ courseTitle, courseCode, exam }) => (
            <div key={exam.id} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded bg-purple-100 text-purple-800 font-mono text-xs font-bold">
                  {courseCode}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase">
                  {exam.status}
                </span>
              </div>

              <h3 className="font-cinzel text-base font-bold text-slate-900">
                {exam.title}
              </h3>

              <p className="text-xs text-slate-600">
                {exam.instructions}
              </p>

              <div className="p-3 bg-slate-50 rounded-xl grid grid-cols-2 gap-2 text-xs">
                <div>Duration: <strong>{exam.durationMinutes} mins</strong></div>
                <div>Pass Mark: <strong>{exam.passMarkPercent}%</strong></div>
                <div>Questions: <strong>{exam.questions.length} Items</strong></div>
                <div>Weightage: <strong>{exam.weightagePercent}%</strong></div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 2: PROCTORED RESULTS */}
      {activeTab === 'results' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
          <h3 className="font-cinzel text-base font-bold text-slate-900">
            Student Examination Logs & Scores
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 font-semibold">
                  <th className="py-2.5 px-3">Student Name</th>
                  <th className="py-2.5 px-3">Score</th>
                  <th className="py-2.5 px-3">Percentage</th>
                  <th className="py-2.5 px-3 text-center">Doctrinal Assessment</th>
                  <th className="py-2.5 px-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {examAttempts.map(att => (
                  <tr key={att.id} className="hover:bg-slate-50">
                    <td className="py-3 px-3 font-semibold text-slate-900 font-cinzel">{att.studentName}</td>
                    <td className="py-3 px-3 font-mono">{att.totalScore} / {att.maxScore}</td>
                    <td className="py-3 px-3 font-mono font-bold">{att.percentage}%</td>
                    <td className="py-3 px-3 text-center">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        att.passed ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                      }`}>
                        {att.passed ? 'PASSED (Orthodox)' : 'BELOW PASS MARK'}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <span className="text-purple-700 font-bold text-xs">Proctored ✓</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: CREATE NEW EXAM */}
      {activeTab === 'create' && (
        <div className="max-w-xl mx-auto bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center space-x-3 border-b border-slate-100 pb-3">
            <ShieldCheck className="w-6 h-6 text-purple-600" />
            <div>
              <h3 className="font-cinzel text-lg font-bold text-slate-900">
                Author & Deploy Comprehensive Exam
              </h3>
              <p className="text-xs text-slate-500">
                Publish proctored assessments to student LMS examination halls
              </p>
            </div>
          </div>

          {createSuccess ? (
            <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-2">
              <CheckCircle className="w-10 h-10 text-emerald-600 mx-auto" />
              <h4 className="font-cinzel text-base font-bold text-slate-900">
                Exam Paper Published!
              </h4>
              <p className="text-xs text-slate-600">
                The examination is now active for enrolled students with automated proctoring enabled.
              </p>
            </div>
          ) : (
            <form onSubmit={handleCreateExam} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Target Course *</label>
                <select
                  value={selectedCourseId}
                  onChange={e => setSelectedCourseId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 font-medium"
                >
                  {courses.map(c => (
                    <option key={c.id} value={c.id}>{c.courseCode} — {c.title}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Exam Title *</label>
                <input
                  type="text"
                  required
                  value={examTitle}
                  onChange={e => setExamTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 font-cinzel font-bold text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Duration (Minutes) *</label>
                  <input
                    type="number"
                    required
                    min="15"
                    value={durationMins}
                    onChange={e => setDurationMins(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Pass Mark Percentage *</label>
                  <input
                    type="number"
                    required
                    min="50"
                    max="100"
                    value={passMark}
                    onChange={e => setPassMark(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Proctoring Instructions</label>
                <textarea
                  rows={3}
                  value={instructions}
                  onChange={e => setInstructions(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200"
                />
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-500 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition cursor-pointer shadow-md"
                >
                  Deploy Examination Paper
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  );
};
