import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  BookOpen, 
  Play, 
  Pause, 
  CheckCircle, 
  FileText, 
  Download, 
  ChevronLeft, 
  ChevronRight, 
  Volume2, 
  HelpCircle, 
  Send, 
  Award, 
  Sparkles, 
  Layers, 
  Check, 
  MessageSquare,
  Globe,
  Clock,
  Printer,
  ChevronDown,
  Mic
} from 'lucide-react';
import { CourseModule, Unit, Lesson } from '../../types';
import { VoiceToTextRecorder } from './VoiceToTextRecorder';

export const CoursePlayer: React.FC = () => {
  const { 
    selectedCourseId, 
    courses, 
    currentUser, 
    progressList, 
    markLessonComplete,
    submitQuizScore, 
    submitAssignment,
    navigateTo 
  } = useApp();

  // Find course or default to first course
  const currentCourse = courses.find(c => c.id === selectedCourseId) || courses[0];
  const userProgress = progressList.find(p => p.courseId === currentCourse?.id && p.studentId === currentUser?.id);

  // Active module and lesson states
  const [activeModuleIndex, setActiveModuleIndex] = useState(0);
  const [activeUnitIndex, setActiveUnitIndex] = useState(0);
  const [activeLessonIndex, setActiveLessonIndex] = useState(0);

  const [activeTab, setActiveTab] = useState<'notes' | 'lexicon' | 'quiz' | 'assignment'>('notes');
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [mediaMode, setMediaMode] = useState<'video' | 'audio'>('video');

  // Quiz state
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState<number | null>(null);

  // Assignment text state
  const [assignmentText, setAssignmentText] = useState('');
  const [assignmentSuccess, setAssignmentSuccess] = useState(false);
  const [assignmentVoiceMode, setAssignmentVoiceMode] = useState(true);
  const [recordedVoiceAudioUrl, setRecordedVoiceAudioUrl] = useState<string | null>(null);
  const [recordedVoiceDuration, setRecordedVoiceDuration] = useState<number>(0);
  const [recordedVoiceTerms, setRecordedVoiceTerms] = useState<string[]>([]);

  const activeModule: CourseModule | undefined = currentCourse?.modules[activeModuleIndex] || currentCourse?.modules[0];
  const activeUnit: Unit | undefined = activeModule?.units[activeUnitIndex] || activeModule?.units[0];
  const activeLesson: Lesson | undefined = activeUnit?.lessons[activeLessonIndex] || activeUnit?.lessons[0];

  const handleLessonChange = (modIdx: number, unitIdx: number, lesIdx: number) => {
    setActiveModuleIndex(modIdx);
    setActiveUnitIndex(unitIdx);
    setActiveLessonIndex(lesIdx);
    setQuizAnswers({});
    setQuizSubmitted(false);
    setQuizScore(null);
    setAssignmentSuccess(false);
  };

  const handleMarkComplete = () => {
    if (!currentCourse || !activeLesson) return;
    markLessonComplete(currentCourse.id, activeLesson.id);
  };

  const handleQuizSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeLesson?.quiz || activeLesson.quiz.length === 0) return;

    let correct = 0;
    activeLesson.quiz.forEach((q, idx) => {
      if (quizAnswers[idx] === q.correctIndex) {
        correct++;
      }
    });

    const score = Math.round((correct / activeLesson.quiz.length) * 100);
    setQuizScore(score);
    setQuizSubmitted(true);

    submitQuizScore(currentCourse.id, activeLesson.id, score, 100);
  };

  const handleAssignmentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!assignmentText.trim() || !activeLesson) return;

    const assignment = currentCourse.assignments[0];
    const assignId = assignment ? assignment.id : `assign-${currentCourse.id}`;

    submitAssignment(
      assignId, 
      assignmentText, 
      recordedVoiceAudioUrl ? 'Spoken_Oral_Practicum_Audio.webm' : 'Lesson_Practicum_Paper.pdf',
      {
        isVoiceToText: assignmentVoiceMode || !!recordedVoiceAudioUrl,
        audioUrl: recordedVoiceAudioUrl || undefined,
        recordingDurationSeconds: recordedVoiceDuration > 0 ? recordedVoiceDuration : undefined,
        theologicalTermsDetected: recordedVoiceTerms.length > 0 ? recordedVoiceTerms : undefined
      }
    );

    setAssignmentSuccess(true);
    setAssignmentText('');
    setRecordedVoiceAudioUrl(null);
    setRecordedVoiceDuration(0);
  };

  if (!currentCourse) {
    return (
      <div className="p-8 text-center bg-white rounded-2xl border border-slate-200">
        <h3 className="font-cinzel text-lg font-bold text-slate-900">No Course Selected</h3>
        <button
          onClick={() => navigateTo('student-courses')}
          className="mt-4 px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold"
        >
          Browse Courses
        </button>
      </div>
    );
  }

  const completedLessonIds = userProgress?.completedLessonIds || [];

  // Calculate total lessons in course
  let totalLessonsInCourse = 0;
  currentCourse.modules.forEach(m => {
    m.units.forEach(u => {
      totalLessonsInCourse += u.lessons.length;
    });
  });

  const progressPercent = totalLessonsInCourse > 0 
    ? Math.round((completedLessonIds.length / totalLessonsInCourse) * 100) 
    : 0;

  return (
    <div className="space-y-6">
      {/* Course Top Header Bar */}
      <div className="bg-slate-900 text-white rounded-2xl p-4 sm:p-6 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => navigateTo('student-courses')}
              className="text-xs text-amber-400 hover:underline flex items-center space-x-1 cursor-pointer"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Back to Courses</span>
            </button>
            <span className="text-slate-600">•</span>
            <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono text-xs font-bold">
              {currentCourse.courseCode}
            </span>
          </div>
          <h1 className="font-cinzel text-xl sm:text-2xl font-bold text-white">
            {currentCourse.title}
          </h1>
          <p className="text-xs text-slate-300">
            Instructor: <strong>{currentCourse.instructorName}</strong> ({currentCourse.instructorTitle}) • {currentCourse.credits} Credit Hours
          </p>
        </div>

        <div className="flex items-center space-x-3 shrink-0">
          <div className="text-right hidden sm:block">
            <div className="text-[10px] text-slate-400 uppercase">Course Completion</div>
            <div className="text-sm font-mono font-bold text-amber-400">
              {progressPercent}%
            </div>
          </div>
          <div className="w-24 bg-slate-800 rounded-full h-2 overflow-hidden hidden sm:block">
            <div 
              className="bg-amber-500 h-full rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main LMS Layout: 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT / TOP: Main Lesson Area (2 Cols) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Lecture Media Player Component */}
          <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-lg">
            {/* Player Screen Mockup */}
            <div className="relative aspect-video bg-gradient-to-tr from-slate-950 via-slate-900 to-slate-950 flex flex-col items-center justify-center p-6 text-center text-white">
              <div className="w-16 h-16 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center mb-3 shadow-lg">
                {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
              </div>

              <div className="space-y-1 max-w-md">
                <span className="text-[11px] font-mono text-amber-400 font-bold uppercase tracking-wider">
                  Module {activeModuleIndex + 1} • Lesson {activeLessonIndex + 1}
                </span>
                <h3 className="font-cinzel text-lg sm:text-xl font-bold text-white leading-snug">
                  {activeLesson?.title || 'Course Lecture Presentation'}
                </h3>
                <p className="text-xs text-slate-400">
                  Audio & Video Stream • Professor {currentCourse.instructorName}
                </p>
              </div>

              {/* Player Overlay Controls */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950 p-4 flex items-center justify-between text-xs">
                <div className="flex items-center space-x-3">
                  <button 
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-1.5 rounded-lg bg-amber-500 text-slate-950 hover:bg-amber-400 font-bold cursor-pointer"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>
                  <span className="text-[11px] font-mono text-slate-300">
                    {activeLesson?.durationMinutes || 45}:00 mins
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setMediaMode(mediaMode === 'video' ? 'audio' : 'video')}
                    className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-amber-300 text-[11px] font-medium cursor-pointer"
                  >
                    {mediaMode === 'video' ? '🎧 Audio Mode' : '📹 Video Mode'}
                  </button>

                  <select
                    value={playbackSpeed}
                    onChange={e => setPlaybackSpeed(parseFloat(e.target.value))}
                    className="px-2 py-1 rounded bg-slate-800 text-slate-200 text-[11px] font-mono focus:outline-none"
                  >
                    <option value="0.75">0.75x</option>
                    <option value="1">1.0x</option>
                    <option value="1.25">1.25x</option>
                    <option value="1.5">1.5x</option>
                    <option value="2">2.0x</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Lesson Actions Bar */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-slate-800">
                {activeLesson?.title}
              </span>
            </div>

            <div className="flex items-center space-x-2">
              {activeLesson && completedLessonIds.includes(activeLesson.id) ? (
                <span className="px-3 py-1.5 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center space-x-1.5">
                  <Check className="w-4 h-4" />
                  <span>Lesson Completed</span>
                </span>
              ) : (
                <button
                  onClick={handleMarkComplete}
                  className="px-4 py-1.5 bg-emerald-700 hover:bg-emerald-600 text-white font-bold rounded-xl text-xs flex items-center space-x-1.5 transition cursor-pointer"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>Mark as Completed</span>
                </button>
              )}

              <button
                onClick={() => window.print()}
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer no-print"
                title="Print Notes"
              >
                <Printer className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Lesson Study Tools Tabs */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-6">
            <div className="flex border-b border-slate-200 space-x-4 text-xs font-bold">
              <button
                onClick={() => setActiveTab('notes')}
                className={`pb-3 border-b-2 transition cursor-pointer ${activeTab === 'notes' ? 'border-amber-600 text-amber-700' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
              >
                Lecture Notes & Exegesis
              </button>
              <button
                onClick={() => setActiveTab('lexicon')}
                className={`pb-3 border-b-2 transition cursor-pointer ${activeTab === 'lexicon' ? 'border-amber-600 text-amber-700' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
              >
                Greek/Hebrew Lexicon & Cross-Refs
              </button>
              <button
                onClick={() => setActiveTab('quiz')}
                className={`pb-3 border-b-2 transition cursor-pointer ${activeTab === 'quiz' ? 'border-amber-600 text-amber-700' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
              >
                Theological Comprehension Quiz
              </button>
              <button
                onClick={() => setActiveTab('assignment')}
                className={`pb-3 border-b-2 transition cursor-pointer ${activeTab === 'assignment' ? 'border-amber-600 text-amber-700' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
              >
                Submit Practicum Assignment
              </button>
            </div>

            {/* TAB: LECTURE NOTES */}
            {activeTab === 'notes' && (
              <div className="space-y-4">
                {activeLesson?.learningObjectives && activeLesson.learningObjectives.length > 0 && (
                  <div className="p-4 bg-amber-50/80 rounded-2xl border border-amber-200/70 space-y-2">
                    <div className="font-cinzel text-xs font-bold text-amber-900">
                      Module Learning Objectives
                    </div>
                    <ul className="list-disc list-inside space-y-1 text-xs text-amber-800">
                      {activeLesson.learningObjectives.map((obj, i) => (
                        <li key={i}>{obj}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-700 leading-relaxed font-sans whitespace-pre-line bg-slate-50 p-6 rounded-2xl border border-slate-100">
                  {activeLesson?.theologicalContent || "Lecture transcript and theological notes are loading for this module..."}
                </div>
              </div>
            )}

            {/* TAB: GREEK / HEBREW LEXICON */}
            {activeTab === 'lexicon' && (
              <div className="space-y-4">
                <div className="bg-amber-50 rounded-2xl border border-amber-200 p-4 space-y-2">
                  <h4 className="font-cinzel text-xs font-bold text-amber-900">
                    Original Language Parsing & Lexicon Support
                  </h4>
                  <p className="text-xs text-amber-800">
                    Examine root biblical terms, Strong's concordance numbering, and morphological classifications.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  {activeLesson?.greekHebrewInsights && activeLesson.greekHebrewInsights.length > 0 ? (
                    activeLesson.greekHebrewInsights.map((insight, idx) => (
                      <div key={idx} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                        <div className="font-mono text-base font-bold text-slate-900">
                          {insight.term} ({insight.transliteration})
                        </div>
                        <div className="text-[11px] text-amber-700 font-semibold">{insight.strongs}</div>
                        <p className="text-slate-600 mt-1">{insight.meaning}</p>
                      </div>
                    ))
                  ) : (
                    <>
                      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                        <div className="font-mono text-base font-bold text-slate-900">θεόπνευστος (theopneustos)</div>
                        <div className="text-[11px] text-amber-700 font-semibold">Strong's G2315 • Adjective</div>
                        <p className="text-slate-600 mt-1">
                          Literally "God-breathed" or inspired by God. Used in 2 Timothy 3:16 denoting the divine origin and supernatural inspiration of the scriptures.
                        </p>
                      </div>

                      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                        <div className="font-mono text-base font-bold text-slate-900">בָּרָא (bara)</div>
                        <div className="text-[11px] text-amber-700 font-semibold">Strong's H1254 • Verb (Qal)</div>
                        <p className="text-slate-600 mt-1">
                          To create out of nothing (Creatio Ex Nihilo). An exclusive divine activity reserved for Yahweh in Genesis 1:1.
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* TAB: COMPREHENSION QUIZ */}
            {activeTab === 'quiz' && (
              <div className="space-y-6">
                {activeLesson?.quiz && activeLesson.quiz.length > 0 ? (
                  <form onSubmit={handleQuizSubmit} className="space-y-6">
                    {activeLesson.quiz.map((q, qIdx) => (
                      <div key={q.id} className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3 text-xs">
                        <div className="font-bold text-slate-900 font-cinzel">
                          Question {qIdx + 1}: {q.question}
                        </div>

                        <div className="space-y-2">
                          {q.options.map((opt, optIdx) => {
                            const isSelected = quizAnswers[qIdx] === optIdx;
                            const isCorrect = q.correctIndex === optIdx;

                            return (
                              <label
                                key={optIdx}
                                className={`flex items-center space-x-3 p-3 rounded-xl border transition cursor-pointer ${
                                  quizSubmitted
                                    ? isCorrect
                                      ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                                      : isSelected
                                      ? 'bg-rose-50 border-rose-300 text-rose-900'
                                      : 'bg-white border-slate-200 opacity-60'
                                    : isSelected
                                    ? 'bg-amber-50 border-amber-400 text-slate-900'
                                    : 'bg-white border-slate-200 hover:border-slate-300'
                                }`}
                              >
                                <input
                                  type="radio"
                                  name={`question-${qIdx}`}
                                  checked={isSelected}
                                  onChange={() => setQuizAnswers({ ...quizAnswers, [qIdx]: optIdx })}
                                  disabled={quizSubmitted}
                                  className="text-amber-600 focus:ring-amber-500"
                                />
                                <span className="font-medium">{opt}</span>
                              </label>
                            );
                          })}
                        </div>

                        {quizSubmitted && (
                          <div className="p-3 bg-white rounded-xl border border-slate-200 text-slate-600 text-[11px]">
                            <strong>Doctrinal Rationale:</strong> {q.explanation}
                          </div>
                        )}
                      </div>
                    ))}

                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                      {quizSubmitted ? (
                        <div className="flex items-center space-x-2">
                          <span className={`text-sm font-bold ${quizScore! >= 70 ? 'text-emerald-700' : 'text-rose-700'}`}>
                            Your Score: {quizScore}% {quizScore! >= 70 ? '• PASSED' : '• RETRY'}
                          </span>
                        </div>
                      ) : (
                        <div className="text-xs text-slate-500">
                          Pass mark is 70%. Answers update lesson completion automatically.
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={quizSubmitted}
                        className="px-6 py-2.5 bg-slate-900 hover:bg-amber-500 hover:text-slate-950 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition disabled:opacity-50 cursor-pointer"
                      >
                        {quizSubmitted ? 'Quiz Evaluated' : 'Submit Quiz for Grading'}
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="p-8 text-center text-slate-500 text-xs">
                    No quiz questions attached to this lesson module.
                  </div>
                )}
              </div>
            )}

            {/* TAB: ASSIGNMENT PRACTICUM */}
            {activeTab === 'assignment' && (
              <div className="space-y-4">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 text-xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="font-cinzel font-bold text-slate-900 flex items-center space-x-2">
                      <Mic className="w-4 h-4 text-amber-600" />
                      <span>Weekly Exegetical Practicum / Ministry Application</span>
                    </div>

                    <div className="flex items-center space-x-1 bg-slate-200/70 p-0.5 rounded-lg text-[11px] font-semibold">
                      <button
                        type="button"
                        onClick={() => setAssignmentVoiceMode(true)}
                        className={`px-2.5 py-1 rounded-md transition cursor-pointer flex items-center space-x-1 ${
                          assignmentVoiceMode ? 'bg-amber-600 text-white' : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        <Mic className="w-3 h-3" />
                        <span>Voice-to-Text</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setAssignmentVoiceMode(false)}
                        className={`px-2.5 py-1 rounded-md transition cursor-pointer flex items-center space-x-1 ${
                          !assignmentVoiceMode ? 'bg-amber-600 text-white' : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        <FileText className="w-3 h-3" />
                        <span>Standard Text</span>
                      </button>
                    </div>
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    {currentCourse.assignments[0]?.instructions || "Write or speak a 300–500 word homiletical reflection or doctrinal defense demonstrating how this lesson's theological truths apply to church leadership or personal evangelism."}
                  </p>
                </div>

                {assignmentSuccess ? (
                  <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-2">
                    <CheckCircle className="w-10 h-10 text-emerald-600 mx-auto" />
                    <h4 className="font-cinzel text-base font-bold text-slate-900">
                      Assignment & Spoken Reflection Uploaded!
                    </h4>
                    <p className="text-xs text-slate-600">
                      Your coursework has been queued for faculty review and rubric evaluation.
                    </p>
                    <button
                      onClick={() => setAssignmentSuccess(false)}
                      className="text-xs text-amber-700 font-bold underline cursor-pointer"
                    >
                      Submit Another Reflection
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleAssignmentSubmit} className="space-y-4 text-xs">
                    {assignmentVoiceMode && (
                      <VoiceToTextRecorder
                        currentText={assignmentText}
                        onTranscriptChange={(text, isAppend) => {
                          if (isAppend) {
                            setAssignmentText(prev => {
                              if (!prev.trim()) return text.trim();
                              if (['.', ',', '!', '?', ';', ':'].includes(text.trim()[0])) {
                                return `${prev.trimEnd()}${text}`;
                              }
                              return `${prev.trimEnd()} ${text}`;
                            });
                          } else {
                            setAssignmentText(text);
                          }
                        }}
                        onAudioRecorded={(url, duration, terms) => {
                          setRecordedVoiceAudioUrl(url);
                          setRecordedVoiceDuration(duration);
                          setRecordedVoiceTerms(terms);
                        }}
                        placeholder="Speak into your microphone to record your spoken coursework reflection..."
                      />
                    )}

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="block font-semibold text-slate-700">
                          {assignmentVoiceMode ? 'Transcribed Reflection & Citations *' : 'Your Exegetical Paper / Reflection *'}
                        </label>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {assignmentText.trim() ? assignmentText.trim().split(/\s+/).length : 0} words
                        </span>
                      </div>
                      <textarea
                        rows={6}
                        required
                        placeholder="Type or dictate your theological response, thesis, scripture citations, and pastoral conclusions here..."
                        value={assignmentText}
                        onChange={e => setAssignmentText(e.target.value)}
                        className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-amber-500/20 text-xs sm:text-sm text-slate-900"
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                      <span className="text-[11px] text-slate-500">
                        Evaluated by <strong>{currentCourse.instructorName}</strong>
                        {recordedVoiceAudioUrl && <span className="ml-1 text-amber-700 font-semibold">• Spoken Audio Attached</span>}
                      </span>
                      <button
                        type="submit"
                        disabled={!assignmentText.trim()}
                        className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-slate-950 font-bold rounded-xl text-xs uppercase tracking-wider transition cursor-pointer flex items-center justify-center space-x-1.5 shadow-md disabled:opacity-50"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Submit to Faculty</span>
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT: Course Curriculum Syllabus & Modules List */}
        <div className="space-y-4">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <Layers className="w-5 h-5 text-amber-600" />
                <h3 className="font-cinzel text-base font-bold text-slate-900">
                  Course Curriculum
                </h3>
              </div>
            </div>

            <div className="space-y-4">
              {currentCourse.modules.map((mod, modIdx) => (
                <div key={mod.id} className="space-y-2">
                  <div className="text-xs font-bold text-slate-800 font-cinzel">
                    Module {modIdx + 1}: {mod.title}
                  </div>

                  {mod.units.map((unit, unitIdx) => (
                    <div key={unit.id} className="space-y-1.5 pl-2 border-l-2 border-slate-100">
                      <div className="text-[11px] text-slate-500 font-semibold">
                        {unit.title}
                      </div>

                      {unit.lessons.map((les, lesIdx) => {
                        const isCurrent = activeModuleIndex === modIdx && activeUnitIndex === unitIdx && activeLessonIndex === lesIdx;
                        const isCompleted = completedLessonIds.includes(les.id);

                        return (
                          <button
                            key={les.id}
                            onClick={() => handleLessonChange(modIdx, unitIdx, lesIdx)}
                            className={`w-full text-left p-2.5 rounded-xl text-xs flex items-center justify-between transition cursor-pointer ${
                              isCurrent
                                ? 'bg-amber-100 text-amber-900 font-bold border border-amber-300'
                                : 'bg-slate-50 hover:bg-slate-100 text-slate-700'
                            }`}
                          >
                            <div className="flex items-center space-x-2 truncate">
                              {isCompleted ? (
                                <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                              ) : (
                                <div className="w-3.5 h-3.5 rounded-full border border-slate-300 shrink-0" />
                              )}
                              <span className="truncate">{les.title}</span>
                            </div>
                            <span className="text-[10px] text-slate-400 font-mono shrink-0 ml-1">
                              {les.durationMinutes}m
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Academic Honor Code Reminder */}
          <div className="p-4 bg-slate-900 text-white rounded-2xl border border-slate-800 space-y-2 text-xs">
            <div className="flex items-center space-x-1.5 text-amber-400 font-bold font-cinzel">
              <Award className="w-4 h-4" />
              <span>Seminary Honor Code</span>
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              All coursework is submitted under the pledge of theological honesty and personal integrity before the Lord.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
