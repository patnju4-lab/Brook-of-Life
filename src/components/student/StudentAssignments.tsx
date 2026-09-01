import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  FileText, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  MessageSquare, 
  Award, 
  BookOpen, 
  ArrowRight,
  Mic,
  Send,
  Plus,
  Sparkles,
  Volume2,
  Play,
  Pause,
  UploadCloud,
  Layers,
  ChevronDown
} from 'lucide-react';
import { VoiceToTextRecorder } from './VoiceToTextRecorder';

export const StudentAssignments: React.FC = () => {
  const { submissions, courses, currentUser, submitAssignment, navigateTo } = useApp();

  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState<string>(courses[0]?.id || '');
  const [selectedAssignmentId, setSelectedAssignmentId] = useState<string>(
    courses[0]?.assignments[0]?.id || ''
  );
  const [submissionText, setSubmissionText] = useState('');
  const [submissionMode, setSubmissionMode] = useState<'voice' | 'text'>('voice');
  const [recordedAudioUrl, setRecordedAudioUrl] = useState<string | null>(null);
  const [audioDuration, setAudioDuration] = useState<number>(0);
  const [detectedTerms, setDetectedTerms] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);

  const studentSubmissions = submissions.filter(
    s => s.studentId === currentUser?.id || s.studentName === currentUser?.name
  );

  const activeCourse = courses.find(c => c.id === selectedCourseId) || courses[0];
  const activeAssignment = activeCourse?.assignments.find(a => a.id === selectedAssignmentId) || activeCourse?.assignments[0];

  const handleCourseSelect = (courseId: string) => {
    setSelectedCourseId(courseId);
    const c = courses.find(item => item.id === courseId);
    if (c && c.assignments.length > 0) {
      setSelectedAssignmentId(c.assignments[0].id);
    }
  };

  const handleTranscriptAppend = (text: string, isAppend: boolean = true) => {
    if (isAppend) {
      setSubmissionText(prev => {
        if (!prev.trim()) return text.trim();
        // If text starts with punctuation, don't add space
        if (['.', ',', '!', '?', ';', ':'].includes(text.trim()[0])) {
          return `${prev.trimEnd()}${text}`;
        }
        return `${prev.trimEnd()} ${text}`;
      });
    } else {
      setSubmissionText(text);
    }
  };

  const handleAudioRecorded = (url: string, duration: number, terms: string[]) => {
    setRecordedAudioUrl(url);
    setAudioDuration(duration);
    setDetectedTerms(terms);
  };

  const handleSubmitReflection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!submissionText.trim()) return;

    setIsSubmitting(true);
    const assignId = activeAssignment?.id || `assign-${selectedCourseId}`;

    submitAssignment(
      assignId,
      submissionText,
      recordedAudioUrl ? 'Oral_Voice_Practicum_Recording.webm' : 'Exegetical_Paper_Final.pdf',
      {
        isVoiceToText: submissionMode === 'voice' || !!recordedAudioUrl,
        audioUrl: recordedAudioUrl || undefined,
        recordingDurationSeconds: audioDuration > 0 ? audioDuration : undefined,
        theologicalTermsDetected: detectedTerms.length > 0 ? detectedTerms : undefined
      }
    );

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setTimeout(() => {
        setSubmitSuccess(false);
        setShowSubmitModal(false);
        setSubmissionText('');
        setRecordedAudioUrl(null);
        setAudioDuration(0);
      }, 1800);
    }, 600);
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-[#121214] border border-[#27272a] rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded bg-[#c4a47c]/15 text-[#c4a47c] border border-[#c4a47c]/30 font-mono text-xs font-bold">
              Oral & Written Practicums
            </span>
            <span className="text-xs text-slate-400">Brooks of Life School of Ministry</span>
          </div>
          <h1 className="font-cinzel text-2xl sm:text-3xl font-bold text-white tracking-wide">
            Coursework & Practicum Portal
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Record spoken voice-to-text oral reflections, submit hermeneutical papers, and review comprehensive faculty rubric evaluations.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
          <button
            onClick={() => setShowSubmitModal(!showSubmitModal)}
            className="px-5 py-3 bg-gradient-to-r from-[#c4a47c] to-[#b39166] hover:from-[#d5b58d] hover:to-[#c4a47c] text-[#0a0a0b] font-bold text-xs uppercase tracking-wider rounded-2xl flex items-center justify-center space-x-2 shadow-lg shadow-[#c4a47c]/10 cursor-pointer transition-all hover:scale-[1.02]"
          >
            {showSubmitModal ? (
              <span>Close Submission Studio</span>
            ) : (
              <>
                <Mic className="w-4 h-4 text-[#0a0a0b]" />
                <span>Submit Spoken Reflection</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* SUBMISSION STUDIO (Card/Drawer) */}
      {showSubmitModal && (
        <div className="bg-[#161618] border border-[#c4a47c]/40 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#27272a] pb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-[#c4a47c]/20 border border-[#c4a47c]/30 text-[#c4a47c] flex items-center justify-center">
                <Mic className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-cinzel text-lg font-bold text-white">
                  Oral & Written Reflection Submission Studio
                </h2>
                <p className="text-xs text-slate-400">
                  Select your enrolled course and speak or write your practicum defense.
                </p>
              </div>
            </div>

            {/* Mode Switcher */}
            <div className="flex items-center p-1 bg-[#101012] border border-[#27272a] rounded-xl self-start sm:self-center">
              <button
                type="button"
                onClick={() => setSubmissionMode('voice')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center space-x-1.5 cursor-pointer ${
                  submissionMode === 'voice'
                    ? 'bg-[#c4a47c] text-[#0a0a0b]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Mic className="w-3.5 h-3.5" />
                <span>Voice-to-Text Mode</span>
              </button>
              <button
                type="button"
                onClick={() => setSubmissionMode('text')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center space-x-1.5 cursor-pointer ${
                  submissionMode === 'text'
                    ? 'bg-[#c4a47c] text-[#0a0a0b]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Text Editor Mode</span>
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmitReflection} className="space-y-6">
            {/* Course & Assignment Selector */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-300">
                  Select Enrolled Theological Course:
                </label>
                <select
                  value={selectedCourseId}
                  onChange={e => handleCourseSelect(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#101012] border border-[#27272a] rounded-xl text-xs text-slate-200 focus:outline-none focus:border-[#c4a47c]"
                >
                  {courses.map(course => (
                    <option key={course.id} value={course.id}>
                      {course.courseCode} — {course.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-300">
                  Target Assignment / Practicum Module:
                </label>
                <select
                  value={selectedAssignmentId}
                  onChange={e => setSelectedAssignmentId(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#101012] border border-[#27272a] rounded-xl text-xs text-slate-200 focus:outline-none focus:border-[#c4a47c]"
                >
                  {activeCourse?.assignments.map(a => (
                    <option key={a.id} value={a.id}>
                      {a.title} ({a.weightagePercent || 20}% weight)
                    </option>
                  ))}
                  {(!activeCourse?.assignments || activeCourse.assignments.length === 0) && (
                    <option value={`assign-${activeCourse?.id}`}>
                      Weekly Ministry Practicum Reflection
                    </option>
                  )}
                </select>
              </div>
            </div>

            {/* Assignment Prompt / Rubric Guidance */}
            <div className="p-4 bg-[#101012] border border-[#27272a] rounded-2xl text-xs space-y-1.5">
              <div className="flex items-center space-x-1.5 text-[#c4a47c] font-semibold">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Assignment Prompt & Theological Expectations:</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                {activeAssignment?.instructions || "Articulate a sound theological synthesis demonstrating historical-grammatical exegesis and pastoral application for Christian ministry."}
              </p>
            </div>

            {/* Voice-to-Text Studio Module */}
            {submissionMode === 'voice' && (
              <VoiceToTextRecorder
                onTranscriptChange={handleTranscriptAppend}
                onAudioRecorded={handleAudioRecorded}
                currentText={submissionText}
                placeholder="Speak clearly into your microphone to record your spoken coursework reflection..."
              />
            )}

            {/* Live Text Editing Canvas */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-semibold text-slate-300">
                  {submissionMode === 'voice' ? 'Transcribed Reflection Draft & Notes:' : 'Your Exegetical Paper:'}
                </label>
                <div className="text-[11px] font-mono text-slate-400">
                  {submissionText.trim() ? submissionText.trim().split(/\s+/).length : 0} words
                </div>
              </div>

              <textarea
                rows={7}
                required
                value={submissionText}
                onChange={e => setSubmissionText(e.target.value)}
                placeholder="Your spoken words will transcribe here automatically. You can also edit, format, or type citations directly..."
                className="w-full px-4 py-3.5 bg-[#101012] border border-[#27272a] rounded-2xl text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-[#c4a47c] leading-relaxed font-sans"
              />
            </div>

            {/* Submit Action Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-[#27272a]">
              <div className="flex items-center space-x-2 text-xs text-slate-400">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Evaluator: <strong>{activeCourse?.instructorName}</strong></span>
                {recordedAudioUrl && (
                  <span className="px-2 py-0.5 rounded bg-[#c4a47c]/20 text-[#c4a47c] text-[10px] font-mono font-bold">
                    + Spoken Audio Attached
                  </span>
                )}
              </div>

              <div className="flex items-center space-x-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setShowSubmitModal(false)}
                  className="px-4 py-2.5 bg-[#27272a] hover:bg-[#3f3f46] text-slate-300 font-semibold text-xs rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || !submissionText.trim()}
                  className="flex-1 sm:flex-none px-6 py-2.5 bg-gradient-to-r from-[#c4a47c] to-[#b39166] hover:from-[#d5b58d] hover:to-[#c4a47c] text-[#0a0a0b] font-bold text-xs uppercase tracking-wider rounded-xl flex items-center justify-center space-x-2 shadow-lg shadow-[#c4a47c]/10 transition disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>Submitting Paper...</span>
                  ) : submitSuccess ? (
                    <>
                      <CheckCircle className="w-4 h-4 text-[#0a0a0b]" />
                      <span>Submitted!</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Submit for Faculty Grading</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Submissions List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Layers className="w-5 h-5 text-[#c4a47c]" />
            <h2 className="font-cinzel text-lg font-bold text-white">
              Your Submission History & Evaluations ({studentSubmissions.length})
            </h2>
          </div>
          <span className="text-xs text-slate-400">Official BLSM Academic Records</span>
        </div>

        {studentSubmissions.length > 0 ? (
          studentSubmissions.map(item => {
            let course = courses.find(c => c.assignments.some(a => a.id === item.assignmentId)) || courses[0];
            let assignment = course?.assignments.find(a => a.id === item.assignmentId) || course?.assignments[0];

            return (
              <div 
                key={item.id}
                className="bg-[#121214] rounded-3xl border border-[#27272a] p-6 sm:p-7 shadow-lg space-y-5 transition-all hover:border-[#3f3f46]"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#27272a] pb-4">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="px-2.5 py-0.5 rounded bg-[#18181b] border border-[#27272a] text-[#c4a47c] font-mono text-xs font-bold">
                        {course?.courseCode || 'BLSM-COURSE'}
                      </span>
                      <span className="text-xs font-semibold text-slate-400">{course?.title}</span>
                    </div>
                    <h3 className="font-cinzel text-base sm:text-lg font-bold text-white mt-1">
                      {assignment?.title || 'Weekly Exegetical Practicum Reflection'}
                    </h3>
                  </div>

                  <div className="flex items-center space-x-3 self-start sm:self-center">
                    <div className="text-right">
                      <div className="text-[10px] text-slate-500 uppercase tracking-wider font-mono">Academic Status</div>
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase ${
                        item.status === 'graded' 
                          ? 'bg-emerald-950/80 border border-emerald-700/60 text-emerald-400' 
                          : 'bg-amber-950/80 border border-amber-700/60 text-amber-300'
                      }`}>
                        {item.status}
                      </span>
                    </div>

                    {item.score !== undefined && (
                      <div className="p-2.5 bg-[#18181b] border border-[#27272a] text-white rounded-2xl text-center min-w-[70px]">
                        <div className="text-base font-mono font-bold text-[#c4a47c]">{item.score}%</div>
                        <div className="text-[9px] text-slate-400 font-mono">Score</div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Submission Content */}
                <div className="p-5 bg-[#18181b] rounded-2xl border border-[#27272a] text-xs sm:text-sm text-slate-300 space-y-3">
                  <div className="flex items-center justify-between border-b border-[#27272a] pb-2 text-xs">
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-white">Submitted Exegesis / Reflection:</span>
                      {item.isVoiceToText && (
                        <span className="px-2 py-0.5 rounded bg-[#c4a47c]/15 text-[#c4a47c] border border-[#c4a47c]/25 text-[10px] font-mono flex items-center space-x-1">
                          <Mic className="w-2.5 h-2.5" />
                          <span>Voice-Transcribed</span>
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-slate-500 font-mono">
                      {new Date(item.submittedAt).toLocaleDateString()}
                    </div>
                  </div>

                  <p className="line-clamp-4 leading-relaxed font-sans text-slate-300 italic">
                    "{item.content}"
                  </p>

                  {/* Audio Reflection Player if available */}
                  {item.audioUrl && (
                    <div className="pt-2 flex items-center space-x-3 p-3 bg-[#101012] rounded-xl border border-[#27272a]">
                      <div className="w-8 h-8 rounded-lg bg-[#c4a47c]/20 text-[#c4a47c] flex items-center justify-center">
                        <Volume2 className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <div className="text-xs font-semibold text-white">Student Spoken Audio Recording</div>
                        <div className="text-[10px] text-slate-400">
                          {item.recordingDurationSeconds ? `${item.recordingDurationSeconds}s oral reflection` : 'Oral practicum attachment'}
                        </div>
                      </div>
                      <audio src={item.audioUrl} controls className="h-8 max-w-xs" />
                    </div>
                  )}

                  {/* Theological Terms Detected Badge */}
                  {item.theologicalTermsDetected && item.theologicalTermsDetected.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      <span className="text-[10px] text-slate-500 self-center mr-1">Doctrinal Terms:</span>
                      {item.theologicalTermsDetected.map(term => (
                        <span key={term} className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-900 border border-[#27272a] text-[#c4a47c]">
                          {term}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Faculty Feedback Section */}
                {item.feedback && (
                  <div className="p-5 bg-emerald-950/30 rounded-2xl border border-emerald-800/40 text-xs space-y-2">
                    <div className="flex items-center space-x-1.5 text-emerald-400 font-bold">
                      <MessageSquare className="w-4 h-4" />
                      <span>Faculty Rubric Evaluation ({item.gradedBy || 'Professor'}):</span>
                    </div>
                    <p className="text-emerald-200/90 leading-relaxed font-medium">
                      "{item.feedback}"
                    </p>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="p-12 text-center bg-[#121214] rounded-3xl border border-[#27272a] text-slate-400 space-y-3">
            <FileText className="w-10 h-10 mx-auto text-slate-600" />
            <div className="font-cinzel text-base font-bold text-white">No Assignments Submitted Yet</div>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              Use the "Submit Spoken Reflection" button above or open your classroom lessons to submit your oral and written practicums.
            </p>
            <button
              onClick={() => setShowSubmitModal(true)}
              className="mt-2 px-4 py-2 bg-[#c4a47c] text-[#0a0a0b] font-bold text-xs rounded-xl cursor-pointer"
            >
              Start First Reflection
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
