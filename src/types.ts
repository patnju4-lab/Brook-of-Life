export type UserRole = 
  | 'student' 
  | 'lecturer' 
  | 'registrar' 
  | 'examination_officer' 
  | 'finance_officer' 
  | 'admin' 
  | 'super_admin' 
  | 'librarian'
  | 'alumni';

export type ProgramLevel = 
  | 'Certificate' 
  | 'Diploma' 
  | 'Advanced Diploma'
  | 'Bachelor' 
  | 'Master' 
  | 'Doctoral';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatarUrl?: string;
  phone?: string;
  studentId?: string;
  facultyId?: string;
  programId?: string;
  country?: string;
  churchAffiliation?: string;
  ministryRole?: string;
  bio?: string;
  createdAt: string;
  academicStanding?: 'Good Standing' | 'Dean’s List' | 'Academic Probation' | 'Graduated';
}

export interface AcademicSchool {
  id: string;
  name: string;
  code: string;
  description: string;
  deanName: string;
  deanTitle: string;
  icon: string;
  accentColor: string;
  coursesCount: number;
}

export interface Program {
  id: string;
  schoolId: string;
  code: string;
  title: string;
  level: ProgramLevel;
  duration: string;
  totalCredits: number;
  tuitionPerSemester: number;
  description: string;
  objectives: string[];
  careerOutcomes: string[];
  requirements: string[];
  featured?: boolean;
}

export interface LessonQuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  scriptureReference?: string;
}

export interface Lesson {
  id: string;
  unitId: string;
  title: string;
  sequence: number;
  durationMinutes: number;
  learningObjectives: string[];
  summary: string;
  scriptureReferences: { passage: string; text: string }[];
  theologicalContent: string; // rich markdown / educational notes
  greekHebrewInsights?: { term: string; transliteration: string; strongs: string; meaning: string }[];
  reflectionQuestions: string[];
  videoUrl?: string;
  audioTeachingUrl?: string;
  downloadableNotesUrl?: string;
  quiz?: LessonQuizQuestion[];
}

export interface Unit {
  id: string;
  moduleId: string;
  title: string;
  sequence: number;
  description: string;
  lessons: Lesson[];
}

export interface CourseModule {
  id: string;
  courseId: string;
  title: string;
  sequence: number;
  description: string;
  units: Unit[];
}

export interface Assignment {
  id: string;
  courseId: string;
  title: string;
  instructions: string;
  rubric: { criteria: string; maxMarks: number }[];
  totalMarks: number;
  weightagePercent: number; // e.g. 20%
  dueDate: string;
  submissionType: 'text' | 'document' | 'hermeneutical_paper' | 'sermon_outline';
}

export interface AssignmentSubmission {
  id: string;
  assignmentId: string;
  studentId: string;
  studentName: string;
  submittedAt: string;
  content: string;
  fileAttachment?: string;
  score?: number;
  gradedBy?: string;
  gradedAt?: string;
  feedback?: string;
  status: 'submitted' | 'graded' | 'resubmission_requested';
  isVoiceToText?: boolean;
  audioUrl?: string;
  recordingDurationSeconds?: number;
  theologicalTermsDetected?: string[];
}

export type ExamQuestionType = 
  | 'multiple_choice' 
  | 'true_false' 
  | 'short_answer' 
  | 'essay' 
  | 'scripture_interpretation' 
  | 'ministry_case_study';

export interface ExamQuestion {
  id: string;
  examId?: string;
  courseId: string;
  type: ExamQuestionType;
  questionText: string;
  options?: string[];
  correctAnswer?: string | number;
  marks: number;
  scriptureAnchor?: string;
  modelAnswer?: string;
}

export interface Examination {
  id: string;
  courseId: string;
  title: string;
  type: 'midterm' | 'final' | 'comprehensive' | 'cat';
  instructions: string;
  durationMinutes: number;
  totalMarks: number;
  passMarkPercent: number;
  weightagePercent: number; // e.g. 40%
  startDate: string;
  endDate: string;
  status: 'draft' | 'scheduled' | 'active' | 'closed';
  questions: ExamQuestion[];
}

export interface ExamAttempt {
  id: string;
  examId: string;
  studentId: string;
  studentName: string;
  courseId: string;
  startedAt: string;
  submittedAt?: string;
  answers: { questionId: string; answer: string | number; scoreAwarded?: number; comments?: string }[];
  totalScore?: number;
  maxScore: number;
  percentage?: number;
  passed?: boolean;
  status: 'in_progress' | 'submitted' | 'graded';
  gradedBy?: string;
  gradedAt?: string;
}

export interface Course {
  id: string;
  programId: string;
  schoolId: string;
  courseCode: string;
  title: string;
  credits: number;
  level: string;
  instructorName: string;
  instructorTitle: string;
  instructorAvatar?: string;
  description: string;
  learningOutcomes: string[];
  requiredReading: string[];
  syllabusOverview: string;
  modules: CourseModule[];
  assignments: Assignment[];
  examination?: Examination;
  gradingBreakdown: {
    assignments: number; // e.g. 20
    quizzes: number;      // e.g. 10
    midterm: number;      // e.g. 20
    finalExam: number;    // e.g. 40
    ministryPracticum: number; // e.g. 10
  };
}

export interface StudentCourseProgress {
  id: string;
  studentId: string;
  courseId: string;
  enrolledAt: string;
  completedLessonIds: string[];
  quizScores: { lessonId: string; score: number; maxScore: number; passed: boolean }[];
  assignmentGrade?: number; // 0-100
  quizGrade?: number;        // 0-100
  midtermGrade?: number;     // 0-100
  finalExamGrade?: number;   // 0-100
  practicumGrade?: number;   // 0-100
  finalCourseScore?: number; // 0-100
  letterGrade?: 'A' | 'A-' | 'B+' | 'B' | 'B-' | 'C+' | 'C' | 'D' | 'F';
  gradePoints?: number;      // 0.0 - 4.0
  isCompleted: boolean;
  completionDate?: string;
}

export interface AdmissionApplication {
  id: string;
  userId?: string;
  applicantName: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  dateOfBirth: string;
  gender: string;
  programId: string;
  studyMode: 'Online Distance' | 'Hybrid Intensive' | 'Cohort Modular';
  churchName: string;
  pastorName: string;
  ministryExperienceYears: number;
  spiritualTestimony: string;
  previousEducation: string;
  status: 'Draft' | 'Submitted' | 'Under Review' | 'Accepted' | 'Rejected' | 'Enrolled';
  submittedAt: string;
  reviewedBy?: string;
  decisionDate?: string;
  scholarshipGrantedPercent?: number;
  admissionsNotes?: string;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  studentId: string;
  studentName: string;
  programTitle: string;
  semester: string;
  issueDate: string;
  dueDate: string;
  items: { description: string; amount: number }[];
  subtotal: number;
  scholarshipDiscount: number;
  totalDue: number;
  amountPaid: number;
  balance: number;
  status: 'Paid' | 'Partial' | 'Unpaid' | 'Overdue';
}

export interface PaymentTransaction {
  id: string;
  invoiceId: string;
  studentId: string;
  amount: number;
  currency: string;
  method: 'Card' | 'Bank Transfer' | 'Mobile Money' | 'Scholarship Grant' | 'Campus Cash';
  reference: string;
  date: string;
  status: 'Completed' | 'Pending' | 'Failed';
  receiptNumber: string;
}

export interface DigitalCertificate {
  id: string;
  certificateNumber: string;
  studentId: string;
  studentName: string;
  programId: string;
  programTitle: string;
  awardLevel: string;
  issueDate: string;
  registrarName: string;
  presidentName: string;
  honors?: string;
  qrCodeValue: string;
  status: 'Valid' | 'Revoked';
}

export interface LibraryResource {
  id: string;
  title: string;
  author: string;
  category: 'Biblical Studies' | 'Systematic Theology' | 'Church History' | 'Pastoral Ministry' | 'Missions & Evangelism' | 'Christian Counseling' | 'Sermon Resources' | 'Greek & Hebrew Tools';
  description: string;
  pagesCount: number;
  publicationYear: string;
  downloadFormat: 'PDF' | 'EPUB' | 'Audio MP3' | 'Study Guide';
  accessLevel: 'All Students' | 'Degree Students' | 'Faculty & Alumni';
  fileSize: string;
  downloadsCount: number;
  featured?: boolean;
}

export interface MinistryResource {
  id: string;
  title: string;
  category: 'Sermon Outlines' | 'Bible Study Guides' | 'Discipleship Curriculum' | 'Church Planting Manuals' | 'Leadership Handbooks' | 'Prayer Guides' | 'Youth & Family';
  author: string;
  scriptureTheme: string;
  summary: string;
  contentBody: string;
  downloadUrl?: string;
  dateAdded: string;
}

export interface EventItem {
  id: string;
  title: string;
  category: 'Academic' | 'Spiritual' | 'Virtual Classroom' | 'Graduation' | 'Faculty Seminar';
  date: string;
  time: string;
  location: string;
  speaker: string;
  description: string;
  zoomLink?: string;
  isPublic: boolean;
}

export interface AnnouncementItem {
  id: string;
  title: string;
  category: 'Academic' | 'Admissions' | 'Institutional' | 'Spiritual Devotion';
  date: string;
  author: string;
  content: string;
  isImportant?: boolean;
}

export interface DiscussionPost {
  id: string;
  courseId: string;
  lessonId?: string;
  authorId: string;
  authorName: string;
  authorRole: UserRole;
  authorAvatar?: string;
  title: string;
  content: string;
  createdAt: string;
  likes: number;
  replies: {
    id: string;
    authorId: string;
    authorName: string;
    authorRole: UserRole;
    content: string;
    createdAt: string;
  }[];
}

export interface SupportTicket {
  id: string;
  ticketNumber: string;
  userId: string;
  userName: string;
  userEmail: string;
  category: 'Academic Support' | 'Course Material' | 'Examinations' | 'Billing & Payments' | 'Technical/Portal' | 'Admissions';
  subject: string;
  description: string;
  status: 'Open' | 'In Progress' | 'Resolved' | 'Closed';
  priority: 'Low' | 'Medium' | 'High';
  createdAt: string;
  updatedAt: string;
  messages: { sender: string; role: string; message: string; timestamp: string }[];
}

export interface InstitutionSettings {
  name: string;
  motto: string;
  acronym: string;
  foundedYear: string;
  president: string;
  registrar: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  accreditationNote: string;
  announcementTicker: string;
  gradingScale: { grade: string; min: number; max: number; points: number }[];
}
