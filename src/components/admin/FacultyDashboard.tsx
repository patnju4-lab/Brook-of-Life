import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Users, 
  BookOpen, 
  CheckCircle, 
  MessageSquare, 
  Award, 
  Edit3, 
  Plus, 
  Clock, 
  Sparkles,
  Send,
  Layers,
  Mic,
  Volume2
} from 'lucide-react';
import { AssignmentSubmission } from '../../types';

export const FacultyDashboard: React.FC = () => {
  const { 
    currentUser, 
    courses, 
    submissions, 
    gradeSubmission, 
    navigateTo 
  } = useApp();

  const [selectedSubmission, setSelectedSubmission] = useState<AssignmentSubmission | null>(null);
  const [gradeScore, setGradeScore] = useState('95');
  const [gradeFeedback, setGradeFeedback] = useState('Excellent exegetical insight and biblical synthesis. Well defended!');
  const [showGradeModal, setShowGradeModal] = useState(false);

  // Faculty courses
  const facultyCourses = courses.filter(c => c.instructorName.toLowerCase().includes(currentUser?.name.toLowerCase() || '') || true);

  // Pending grading submissions
  const pendingSubmissions = submissions.filter(a => a.status === 'submitted');

  const handleOpenGrade = (submission: AssignmentSubmission) => {
    setSelectedSubmission(submission);
    setGradeScore(submission.score?.toString() || '92');
    setGradeFeedback(submission.feedback || 'Thorough hermeneutical engagement. Approved.');
    setShowGradeModal(true);
  };

  const handleSaveGrade = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSubmission) return;

    const scoreNum = parseInt(gradeScore) || 0;
    gradeSubmission(selectedSubmission.id, scoreNum, gradeFeedback);
    setShowGradeModal(false);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded bg-blue-500/20 text-blue-300 font-mono text-xs font-bold">
              Faculty / Dean Portal
            </span>
            <span className="text-xs text-slate-400">Brooks of Life School of Ministry</span>
          </div>
          <h1 className="font-cinzel text-2xl sm:text-3xl font-bold text-white">
            Professor {currentUser?.name}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            {currentUser?.ministryRole || 'Professor of Biblical Studies & Systematic Theology'}
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <div className="p-3 bg-slate-800/80 rounded-2xl border border-slate-700 text-center">
            <div className="text-xl font-cinzel font-bold text-amber-400">{facultyCourses.length}</div>
            <div className="text-[10px] text-slate-400">Assigned Courses</div>
          </div>
          <div className="p-3 bg-slate-800/80 rounded-2xl border border-slate-700 text-center">
            <div className="text-xl font-cinzel font-bold text-emerald-400">{pendingSubmissions.length}</div>
            <div className="text-[10px] text-slate-400">Pending Papers</div>
          </div>
        </div>
      </div>

      {/* Assignment Grading Queue */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center space-x-2">
            <MessageSquare className="w-5 h-5 text-amber-600" />
            <h2 className="font-cinzel text-base font-bold text-slate-900">
              Student Practicum Submissions Queue ({submissions.length})
            </h2>
          </div>
          <span className="text-xs text-slate-400 font-medium">Click to grade & provide feedback</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-semibold">
                <th className="py-2.5 px-3">Student Name</th>
                <th className="py-2.5 px-3">Paper / Assignment Excerpt</th>
                <th className="py-2.5 px-3">Date Submitted</th>
                <th className="py-2.5 px-3 text-center">Status</th>
                <th className="py-2.5 px-3 text-center">Score</th>
                <th className="py-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {submissions.map(item => (
                <tr key={item.id} className="hover:bg-slate-50">
                  <td className="py-3 px-3 font-semibold text-slate-900 font-cinzel">
                    <div className="flex items-center space-x-1.5">
                      <span>{item.studentName}</span>
                      {item.isVoiceToText && (
                        <span className="p-1 rounded bg-amber-100 text-amber-800" title="Spoken Voice-to-Text Practicum">
                          <Mic className="w-3 h-3" />
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-3 text-slate-700 font-medium line-clamp-1 max-w-xs">
                    {item.content}
                  </td>
                  <td className="py-3 px-3 text-slate-500">{new Date(item.submittedAt).toLocaleDateString()}</td>
                  <td className="py-3 px-3 text-center">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      item.status === 'graded' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-center font-mono font-bold">
                    {item.score !== undefined ? `${item.score}%` : '—'}
                  </td>
                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={() => handleOpenGrade(item)}
                      className="px-3 py-1 bg-slate-900 hover:bg-amber-500 hover:text-slate-950 text-white font-bold rounded-lg text-xs transition cursor-pointer"
                    >
                      {item.status === 'graded' ? 'Re-Grade' : 'Grade Paper'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Faculty Courses Assigned */}
      <div className="space-y-4">
        <h2 className="font-cinzel text-lg font-bold text-slate-900">
          Faculty Teaching Roster & Courses
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {facultyCourses.map(course => (
            <div key={course.id} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded bg-amber-100 text-amber-800 font-mono text-xs font-bold">
                  {course.courseCode}
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  {course.credits} Credits • {course.modules.length} Modules
                </span>
              </div>

              <h3 className="font-cinzel text-base font-bold text-slate-900">
                {course.title}
              </h3>

              <p className="text-xs text-slate-600 line-clamp-2">
                {course.description}
              </p>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500">
                  Core Theological Faculty
                </span>
                <button
                  onClick={() => navigateTo('student-course-player', course.id)}
                  className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-lg cursor-pointer"
                >
                  View LMS Classroom
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Grade Assignment Modal */}
      {showGradeModal && selectedSubmission && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-lg w-full p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-cinzel text-lg font-bold text-slate-900">
                Grade Practicum Submission
              </h3>
              <button 
                onClick={() => setShowGradeModal(false)}
                className="text-slate-400 hover:text-slate-700"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <div>
                  <strong>Student:</strong> {selectedSubmission.studentName}
                </div>
                {selectedSubmission.isVoiceToText && (
                  <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-mono font-bold flex items-center space-x-1 text-[10px]">
                    <Mic className="w-3 h-3" />
                    <span>Voice-Transcribed Oral Practicum</span>
                  </span>
                )}
              </div>

              {selectedSubmission.audioUrl && (
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 flex items-center space-x-3">
                  <Volume2 className="w-4 h-4 text-amber-700 shrink-0" />
                  <div className="flex-1">
                    <div className="font-semibold text-amber-950">Student Spoken Audio Recording</div>
                    <audio src={selectedSubmission.audioUrl} controls className="h-7 w-full mt-1" />
                  </div>
                </div>
              )}

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-slate-700 max-h-40 overflow-y-auto space-y-1">
                <span className="font-semibold block text-slate-900">Student Paper / Reflection:</span>
                <p className="italic leading-relaxed">"{selectedSubmission.content}"</p>
              </div>

              {selectedSubmission.theologicalTermsDetected && selectedSubmission.theologicalTermsDetected.length > 0 && (
                <div className="flex flex-wrap gap-1 items-center">
                  <span className="text-[10px] text-slate-500 font-semibold">Doctrinal Terms Found:</span>
                  {selectedSubmission.theologicalTermsDetected.map(term => (
                    <span key={term} className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 font-mono text-[10px]">
                      {term}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <form onSubmit={handleSaveGrade} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Rubric Score Percentage (0–100%) *</label>
                <input
                  type="number"
                  required
                  min="0"
                  max="100"
                  value={gradeScore}
                  onChange={e => setGradeScore(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 font-mono font-bold text-sm"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Faculty Doctrinal Feedback & Remarks *</label>
                <textarea
                  rows={3}
                  required
                  value={gradeFeedback}
                  onChange={e => setGradeFeedback(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200"
                />
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowGradeModal(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-slate-900 hover:bg-amber-500 hover:text-slate-950 text-white font-bold rounded-xl transition cursor-pointer"
                >
                  Save & Publish Grade
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
