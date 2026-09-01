import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  User, 
  UserRole, 
  AcademicSchool, 
  Program, 
  Course, 
  StudentCourseProgress, 
  AssignmentSubmission, 
  ExamAttempt, 
  AdmissionApplication, 
  Invoice, 
  PaymentTransaction, 
  DigitalCertificate, 
  LibraryResource, 
  MinistryResource, 
  EventItem, 
  AnnouncementItem, 
  DiscussionPost, 
  SupportTicket, 
  InstitutionSettings,
  Examination 
} from '../types';

import {
  INITIAL_INSTITUTION_SETTINGS,
  INITIAL_SCHOOLS,
  INITIAL_PROGRAMS,
  INITIAL_COURSES,
  INITIAL_USERS,
  INITIAL_STUDENT_PROGRESS,
  INITIAL_ASSIGNMENT_SUBMISSIONS,
  INITIAL_EXAM_ATTEMPTS,
  INITIAL_APPLICATIONS,
  INITIAL_INVOICES,
  INITIAL_TRANSACTIONS,
  INITIAL_CERTIFICATES,
  INITIAL_LIBRARY_RESOURCES,
  INITIAL_MINISTRY_RESOURCES,
  INITIAL_EVENTS,
  INITIAL_ANNOUNCEMENTS,
  INITIAL_DISCUSSIONS,
  INITIAL_TICKETS
} from '../data/seedData';

interface AppContextType {
  currentUser: User | null;
  users: User[];
  schools: AcademicSchool[];
  programs: Program[];
  courses: Course[];
  progressList: StudentCourseProgress[];
  submissions: AssignmentSubmission[];
  examAttempts: ExamAttempt[];
  applications: AdmissionApplication[];
  invoices: Invoice[];
  transactions: PaymentTransaction[];
  certificates: DigitalCertificate[];
  libraryResources: LibraryResource[];
  ministryResources: MinistryResource[];
  events: EventItem[];
  announcements: AnnouncementItem[];
  discussions: DiscussionPost[];
  tickets: SupportTicket[];
  settings: InstitutionSettings;
  activeView: string;
  selectedCourseId: string | null;
  selectedLessonId: string | null;
  selectedProgramId: string | null;
  notificationsCount: number;

  // View Routing
  navigateTo: (view: string, courseId?: string, lessonId?: string, programId?: string) => void;

  // Auth & Roles
  switchRole: (role: UserRole) => void;
  loginUser: (email: string) => boolean;
  registerUser: (userData: Partial<User>) => void;
  logout: () => void;

  // Course Progress & Learning
  markLessonComplete: (courseId: string, lessonId: string) => void;
  submitQuizScore: (courseId: string, lessonId: string, score: number, maxScore: number) => void;
  getStudentProgress: (studentId: string, courseId: string) => StudentCourseProgress | undefined;
  getStudentGPA: (studentId: string) => { gpa: number; totalCredits: number; earnedCredits: number; standing: string };
  enrollInCourse: (courseId: string, studentId: string) => void;

  // Assignments & Grading
  submitAssignment: (
    assignmentId: string, 
    content: string, 
    fileAttachment?: string, 
    voiceData?: { 
      isVoiceToText?: boolean; 
      audioUrl?: string; 
      recordingDurationSeconds?: number; 
      theologicalTermsDetected?: string[];
    }
  ) => void;
  gradeSubmission: (submissionId: string, score: number, feedback: string) => void;

  // TEMS Examinations
  submitExamAttempt: (attempt: Omit<ExamAttempt, 'id' | 'startedAt'>) => string;
  gradeExamAttempt: (attemptId: string, answersWithScores: { questionId: string; scoreAwarded: number; comments?: string }[]) => void;
  createExamination: (courseId: string, exam: Examination) => void;

  // Admissions
  submitApplication: (appData: Omit<AdmissionApplication, 'id' | 'status' | 'submittedAt'>) => void;
  reviewApplication: (appId: string, status: AdmissionApplication['status'], notes?: string, scholarshipPercent?: number) => void;
  enrollApplicant: (appId: string) => void;

  // Finance & Payments
  makePayment: (invoiceId: string, amount: number, method: PaymentTransaction['method']) => void;
  issueInvoice: (invoiceData: Omit<Invoice, 'id' | 'invoiceNumber'>) => void;

  // Certificates & Transcripts
  issueCertificate: (certData: Omit<DigitalCertificate, 'id' | 'certificateNumber' | 'qrCodeValue' | 'status'>) => void;
  verifyCertificate: (certNumber: string) => DigitalCertificate | null;

  // Resources & Discussions
  addDiscussionPost: (post: Omit<DiscussionPost, 'id' | 'createdAt' | 'likes' | 'replies'>) => void;
  addDiscussionReply: (postId: string, content: string) => void;
  createTicket: (ticket: Omit<SupportTicket, 'id' | 'ticketNumber' | 'createdAt' | 'updatedAt' | 'messages' | 'status'>) => void;
  replyTicket: (ticketId: string, message: string) => void;
  updateTicketStatus: (ticketId: string, status: SupportTicket['status']) => void;

  // Settings & CMS
  updateSettings: (newSettings: Partial<InstitutionSettings>) => void;
  resetToSeedData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'blsm_theological_app_data_v1';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_user`);
    return saved ? JSON.parse(saved) : INITIAL_USERS[0]; // Default to student
  });

  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_users`);
    return saved ? JSON.parse(saved) : INITIAL_USERS;
  });

  const [schools] = useState<AcademicSchool[]>(INITIAL_SCHOOLS);
  
  const [programs, setPrograms] = useState<Program[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_programs`);
    return saved ? JSON.parse(saved) : INITIAL_PROGRAMS;
  });

  const [courses, setCourses] = useState<Course[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_courses`);
    return saved ? JSON.parse(saved) : INITIAL_COURSES;
  });

  const [progressList, setProgressList] = useState<StudentCourseProgress[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_progress`);
    return saved ? JSON.parse(saved) : INITIAL_STUDENT_PROGRESS;
  });

  const [submissions, setSubmissions] = useState<AssignmentSubmission[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_submissions`);
    return saved ? JSON.parse(saved) : INITIAL_ASSIGNMENT_SUBMISSIONS;
  });

  const [examAttempts, setExamAttempts] = useState<ExamAttempt[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_exam_attempts`);
    return saved ? JSON.parse(saved) : INITIAL_EXAM_ATTEMPTS;
  });

  const [applications, setApplications] = useState<AdmissionApplication[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_applications`);
    return saved ? JSON.parse(saved) : INITIAL_APPLICATIONS;
  });

  const [invoices, setInvoices] = useState<Invoice[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_invoices`);
    return saved ? JSON.parse(saved) : INITIAL_INVOICES;
  });

  const [transactions, setTransactions] = useState<PaymentTransaction[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_transactions`);
    return saved ? JSON.parse(saved) : INITIAL_TRANSACTIONS;
  });

  const [certificates, setCertificates] = useState<DigitalCertificate[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_certificates`);
    return saved ? JSON.parse(saved) : INITIAL_CERTIFICATES;
  });

  const [libraryResources] = useState<LibraryResource[]>(INITIAL_LIBRARY_RESOURCES);
  const [ministryResources] = useState<MinistryResource[]>(INITIAL_MINISTRY_RESOURCES);
  const [events] = useState<EventItem[]>(INITIAL_EVENTS);
  const [announcements] = useState<AnnouncementItem[]>(INITIAL_ANNOUNCEMENTS);

  const [discussions, setDiscussions] = useState<DiscussionPost[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_discussions`);
    return saved ? JSON.parse(saved) : INITIAL_DISCUSSIONS;
  });

  const [tickets, setTickets] = useState<SupportTicket[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_tickets`);
    return saved ? JSON.parse(saved) : INITIAL_TICKETS;
  });

  const [settings, setSettings] = useState<InstitutionSettings>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_settings`);
    return saved ? JSON.parse(saved) : INITIAL_INSTITUTION_SETTINGS;
  });

  // Navigation State
  const [activeView, setActiveView] = useState<string>('home');
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>('course-theo-201');
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>('les-theo-101');
  const [selectedProgramId, setSelectedProgramId] = useState<string | null>('bach-theology');

  // Sync to localStorage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(`${LOCAL_STORAGE_KEY}_user`, JSON.stringify(currentUser));
    } else {
      localStorage.removeItem(`${LOCAL_STORAGE_KEY}_user`);
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_progress`, JSON.stringify(progressList));
  }, [progressList]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_submissions`, JSON.stringify(submissions));
  }, [submissions]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_exam_attempts`, JSON.stringify(examAttempts));
  }, [examAttempts]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_applications`, JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_invoices`, JSON.stringify(invoices));
  }, [invoices]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_transactions`, JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_certificates`, JSON.stringify(certificates));
  }, [certificates]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_discussions`, JSON.stringify(discussions));
  }, [discussions]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_tickets`, JSON.stringify(tickets));
  }, [tickets]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_settings`, JSON.stringify(settings));
  }, [settings]);

  const navigateTo = (view: string, courseId?: string, lessonId?: string, programId?: string) => {
    setActiveView(view);
    if (courseId) setSelectedCourseId(courseId);
    if (lessonId) setSelectedLessonId(lessonId);
    if (programId) setSelectedProgramId(programId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const switchRole = (role: UserRole) => {
    const found = users.find(u => u.role === role);
    if (found) {
      setCurrentUser(found);
      if (role === 'student') navigateTo('student-dashboard');
      else if (role === 'lecturer') navigateTo('faculty-dashboard');
      else if (role === 'registrar') navigateTo('registrar-dashboard');
      else if (role === 'examination_officer') navigateTo('tems-dashboard');
      else if (role === 'finance_officer') navigateTo('finance-dashboard');
      else if (role === 'admin' || role === 'super_admin') navigateTo('admin-dashboard');
      else if (role === 'alumni') navigateTo('alumni-portal');
    }
  };

  const loginUser = (email: string): boolean => {
    const found = users.find(u => u.email.toLowerCase() === email.toLowerCase().trim());
    if (found) {
      setCurrentUser(found);
      if (found.role === 'student') navigateTo('student-dashboard');
      else if (found.role === 'lecturer') navigateTo('faculty-dashboard');
      else navigateTo('admin-dashboard');
      return true;
    }
    return false;
  };

  const registerUser = (userData: Partial<User>) => {
    const newUser: User = {
      id: `user-${Date.now()}`,
      email: userData.email || `student${Date.now()}@student.brooksoflife.edu`,
      name: userData.name || 'New Theological Student',
      role: userData.role || 'student',
      studentId: `BLSM-STU-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      programId: userData.programId || 'bach-theology',
      country: userData.country || 'International',
      churchAffiliation: userData.churchAffiliation || 'Local Christian Church',
      ministryRole: userData.ministryRole || 'Student / Worker',
      avatarUrl: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80`,
      createdAt: new Date().toISOString(),
      academicStanding: 'Good Standing'
    };

    setUsers(prev => [newUser, ...prev]);
    setCurrentUser(newUser);

    // Create an initial invoice for the new student
    const newInvoice: Invoice = {
      id: `inv-${Date.now()}`,
      invoiceNumber: `INV-BLSM-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
      studentId: newUser.id,
      studentName: newUser.name,
      programTitle: programs.find(p => p.id === newUser.programId)?.title || 'Theological Degree',
      semester: 'Fall Semester 2026',
      issueDate: new Date().toISOString().split('T')[0],
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      items: [
        { description: 'Semester Tuition & Digital LMS Curriculum', amount: 900 },
        { description: 'Theological Library & Exegetical Database Access', amount: 150 },
        { description: 'TEMS Examination Fee', amount: 50 }
      ],
      subtotal: 1100,
      scholarshipDiscount: 300,
      totalDue: 800,
      amountPaid: 0,
      balance: 800,
      status: 'Unpaid'
    };
    setInvoices(prev => [newInvoice, ...prev]);

    // Enroll into starter course
    const starterProgress: StudentCourseProgress = {
      id: `prog-${newUser.id}-theo`,
      studentId: newUser.id,
      courseId: 'course-theo-201',
      enrolledAt: new Date().toISOString(),
      completedLessonIds: [],
      quizScores: [],
      isCompleted: false
    };
    setProgressList(prev => [starterProgress, ...prev]);

    navigateTo('student-dashboard');
  };

  const logout = () => {
    setCurrentUser(null);
    navigateTo('home');
  };

  const getStudentProgress = (studentId: string, courseId: string) => {
    return progressList.find(p => p.studentId === studentId && p.courseId === courseId);
  };

  const markLessonComplete = (courseId: string, lessonId: string) => {
    if (!currentUser) return;
    setProgressList(prev => {
      const existingIndex = prev.findIndex(p => p.studentId === currentUser.id && p.courseId === courseId);
      if (existingIndex >= 0) {
        const current = prev[existingIndex];
        if (current.completedLessonIds.includes(lessonId)) return prev;
        const updated = {
          ...current,
          completedLessonIds: [...current.completedLessonIds, lessonId]
        };
        const next = [...prev];
        next[existingIndex] = updated;
        return next;
      } else {
        const newProgress: StudentCourseProgress = {
          id: `prog-${currentUser.id}-${courseId}`,
          studentId: currentUser.id,
          courseId,
          enrolledAt: new Date().toISOString(),
          completedLessonIds: [lessonId],
          quizScores: [],
          isCompleted: false
        };
        return [...prev, newProgress];
      }
    });
  };

  const submitQuizScore = (courseId: string, lessonId: string, score: number, maxScore: number) => {
    if (!currentUser) return;
    const passed = (score / maxScore) >= 0.7;
    setProgressList(prev => {
      const existingIndex = prev.findIndex(p => p.studentId === currentUser.id && p.courseId === courseId);
      if (existingIndex >= 0) {
        const current = prev[existingIndex];
        const updatedQuizzes = current.quizScores.filter(q => q.lessonId !== lessonId);
        updatedQuizzes.push({ lessonId, score, maxScore, passed });
        const updatedCompleted = current.completedLessonIds.includes(lessonId) 
          ? current.completedLessonIds 
          : [...current.completedLessonIds, lessonId];
        const next = [...prev];
        next[existingIndex] = {
          ...current,
          completedLessonIds: updatedCompleted,
          quizScores: updatedQuizzes,
          quizGrade: Math.round((score / maxScore) * 100)
        };
        return next;
      }
      return prev;
    });
  };

  const enrollInCourse = (courseId: string, studentId: string) => {
    setProgressList(prev => {
      if (prev.some(p => p.studentId === studentId && p.courseId === courseId)) return prev;
      const newP: StudentCourseProgress = {
        id: `prog-${studentId}-${courseId}`,
        studentId,
        courseId,
        enrolledAt: new Date().toISOString(),
        completedLessonIds: [],
        quizScores: [],
        isCompleted: false
      };
      return [...prev, newP];
    });
  };

  const getStudentGPA = (studentId: string) => {
    const studentRecords = progressList.filter(p => p.studentId === studentId && p.finalCourseScore !== undefined);
    if (studentRecords.length === 0) {
      return { gpa: 3.85, totalCredits: 32, earnedCredits: 32, standing: 'Dean’s List' };
    }
    const totalPoints = studentRecords.reduce((acc, curr) => acc + (curr.gradePoints || 3.5), 0);
    const avgGPA = Number((totalPoints / studentRecords.length).toFixed(2));
    return {
      gpa: avgGPA,
      totalCredits: studentRecords.length * 3 + 18,
      earnedCredits: studentRecords.length * 3 + 18,
      standing: avgGPA >= 3.75 ? 'Dean’s List' : avgGPA >= 2.5 ? 'Good Standing' : 'Academic Probation'
    };
  };

  const submitAssignment = (
    assignmentId: string, 
    content: string, 
    fileAttachment?: string,
    voiceData?: { 
      isVoiceToText?: boolean; 
      audioUrl?: string; 
      recordingDurationSeconds?: number; 
      theologicalTermsDetected?: string[];
    }
  ) => {
    if (!currentUser) return;
    const newSubmission: AssignmentSubmission = {
      id: `sub-${Date.now()}`,
      assignmentId,
      studentId: currentUser.id,
      studentName: currentUser.name,
      submittedAt: new Date().toISOString(),
      content,
      fileAttachment: fileAttachment || 'Biblical_Exegesis_Paper_Final.pdf',
      status: 'submitted',
      isVoiceToText: voiceData?.isVoiceToText || false,
      audioUrl: voiceData?.audioUrl,
      recordingDurationSeconds: voiceData?.recordingDurationSeconds,
      theologicalTermsDetected: voiceData?.theologicalTermsDetected
    };
    setSubmissions(prev => [newSubmission, ...prev]);
  };

  const gradeSubmission = (submissionId: string, score: number, feedback: string) => {
    setSubmissions(prev => prev.map(s => {
      if (s.id === submissionId) {
        return {
          ...s,
          score,
          feedback,
          gradedBy: currentUser?.name || 'Faculty Examiner',
          gradedAt: new Date().toISOString(),
          status: 'graded'
        };
      }
      return s;
    }));
  };

  const submitExamAttempt = (attemptData: Omit<ExamAttempt, 'id' | 'startedAt'>) => {
    const newId = `attempt-${Date.now()}`;
    const newAttempt: ExamAttempt = {
      ...attemptData,
      id: newId,
      startedAt: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
      submittedAt: new Date().toISOString(),
      status: 'graded' // auto-grade multiple choice / baseline
    };
    setExamAttempts(prev => [newAttempt, ...prev]);
    return newId;
  };

  const gradeExamAttempt = (attemptId: string, answersWithScores: { questionId: string; scoreAwarded: number; comments?: string }[]) => {
    setExamAttempts(prev => prev.map(att => {
      if (att.id === attemptId) {
        const totalScore = answersWithScores.reduce((acc, curr) => acc + curr.scoreAwarded, 0);
        const percentage = Math.round((totalScore / att.maxScore) * 100);
        return {
          ...att,
          totalScore,
          percentage,
          passed: percentage >= 60,
          status: 'graded',
          gradedBy: currentUser?.name || 'Director of Examinations',
          gradedAt: new Date().toISOString()
        };
      }
      return att;
    }));
  };

  const createExamination = (courseId: string, exam: Examination) => {
    setCourses(prev => prev.map(c => {
      if (c.id === courseId) {
        return { ...c, examination: exam };
      }
      return c;
    }));
  };

  const submitApplication = (appData: Omit<AdmissionApplication, 'id' | 'status' | 'submittedAt'>) => {
    const newApp: AdmissionApplication = {
      ...appData,
      id: `app-${Date.now()}`,
      status: 'Submitted',
      submittedAt: new Date().toISOString()
    };
    setApplications(prev => [newApp, ...prev]);
  };

  const reviewApplication = (appId: string, status: AdmissionApplication['status'], notes?: string, scholarshipPercent?: number) => {
    setApplications(prev => prev.map(app => {
      if (app.id === appId) {
        return {
          ...app,
          status,
          admissionsNotes: notes || app.admissionsNotes,
          scholarshipGrantedPercent: scholarshipPercent !== undefined ? scholarshipPercent : app.scholarshipGrantedPercent,
          reviewedBy: currentUser?.name || 'Registrar Office',
          decisionDate: new Date().toISOString()
        };
      }
      return app;
    }));
  };

  const enrollApplicant = (appId: string) => {
    const targetApp = applications.find(a => a.id === appId);
    if (!targetApp) return;

    // Create user if not existing
    const newUser: User = {
      id: `user-student-${Date.now()}`,
      email: targetApp.email,
      name: targetApp.applicantName,
      role: 'student',
      studentId: `BLSM-STU-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      programId: targetApp.programId,
      phone: targetApp.phone,
      country: targetApp.country,
      churchAffiliation: targetApp.churchName,
      createdAt: new Date().toISOString(),
      academicStanding: 'Good Standing'
    };

    setUsers(prev => [newUser, ...prev]);
    reviewApplication(appId, 'Enrolled', 'Student officially enrolled and portal access dispatched.');

    // Enroll into course
    const newProgress: StudentCourseProgress = {
      id: `prog-${newUser.id}-theo`,
      studentId: newUser.id,
      courseId: 'course-theo-201',
      enrolledAt: new Date().toISOString(),
      completedLessonIds: [],
      quizScores: [],
      isCompleted: false
    };
    setProgressList(prev => [newProgress, ...prev]);
  };

  const makePayment = (invoiceId: string, amount: number, method: PaymentTransaction['method']) => {
    const targetInv = invoices.find(i => i.id === invoiceId);
    if (!targetInv) return;

    const receiptNum = `REC-BLSM-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const newTx: PaymentTransaction = {
      id: `tx-${Date.now()}`,
      invoiceId,
      studentId: targetInv.studentId,
      amount,
      currency: 'USD',
      method,
      reference: `REF-ONLINE-${Date.now()}`,
      date: new Date().toISOString(),
      status: 'Completed',
      receiptNumber: receiptNum
    };

    setTransactions(prev => [newTx, ...prev]);

    setInvoices(prev => prev.map(inv => {
      if (inv.id === invoiceId) {
        const newPaid = inv.amountPaid + amount;
        const newBal = Math.max(0, inv.totalDue - newPaid);
        return {
          ...inv,
          amountPaid: newPaid,
          balance: newBal,
          status: newBal === 0 ? 'Paid' : newPaid > 0 ? 'Partial' : 'Unpaid'
        };
      }
      return inv;
    }));
  };

  const issueInvoice = (invoiceData: Omit<Invoice, 'id' | 'invoiceNumber'>) => {
    const newInv: Invoice = {
      ...invoiceData,
      id: `inv-${Date.now()}`,
      invoiceNumber: `INV-BLSM-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`
    };
    setInvoices(prev => [newInv, ...prev]);
  };

  const issueCertificate = (certData: Omit<DigitalCertificate, 'id' | 'certificateNumber' | 'qrCodeValue' | 'status'>) => {
    const certNum = `BLSM-CERT-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const newCert: DigitalCertificate = {
      ...certData,
      id: `cert-${Date.now()}`,
      certificateNumber: certNum,
      qrCodeValue: `https://brooksoflife.edu/verify?cert=${certNum}`,
      status: 'Valid'
    };
    setCertificates(prev => [newCert, ...prev]);
  };

  const verifyCertificate = (certNumber: string): DigitalCertificate | null => {
    const clean = certNumber.trim().toUpperCase();
    return certificates.find(c => c.certificateNumber.toUpperCase() === clean) || null;
  };

  const addDiscussionPost = (post: Omit<DiscussionPost, 'id' | 'createdAt' | 'likes' | 'replies'>) => {
    const newPost: DiscussionPost = {
      ...post,
      id: `disc-${Date.now()}`,
      createdAt: new Date().toISOString(),
      likes: 1,
      replies: []
    };
    setDiscussions(prev => [newPost, ...prev]);
  };

  const addDiscussionReply = (postId: string, content: string) => {
    if (!currentUser) return;
    const newReply = {
      id: `rep-${Date.now()}`,
      authorId: currentUser.id,
      authorName: currentUser.name,
      authorRole: currentUser.role,
      content,
      createdAt: new Date().toISOString()
    };
    setDiscussions(prev => prev.map(p => {
      if (p.id === postId) {
        return {
          ...p,
          replies: [...p.replies, newReply]
        };
      }
      return p;
    }));
  };

  const createTicket = (ticket: Omit<SupportTicket, 'id' | 'ticketNumber' | 'createdAt' | 'updatedAt' | 'messages' | 'status'>) => {
    const newTicket: SupportTicket = {
      ...ticket,
      id: `tick-${Date.now()}`,
      ticketNumber: `BLSM-SUP-${Math.floor(1000 + Math.random() * 9000)}`,
      status: 'Open',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      messages: [
        {
          sender: ticket.userName,
          role: currentUser?.role || 'student',
          message: ticket.description,
          timestamp: new Date().toISOString()
        }
      ]
    };
    setTickets(prev => [newTicket, ...prev]);
  };

  const replyTicket = (ticketId: string, message: string) => {
    if (!currentUser) return;
    setTickets(prev => prev.map(t => {
      if (t.id === ticketId) {
        return {
          ...t,
          updatedAt: new Date().toISOString(),
          messages: [
            ...t.messages,
            {
              sender: currentUser.name,
              role: currentUser.role,
              message,
              timestamp: new Date().toISOString()
            }
          ]
        };
      }
      return t;
    }));
  };

  const updateTicketStatus = (ticketId: string, status: SupportTicket['status']) => {
    setTickets(prev => prev.map(t => t.id === ticketId ? { ...t, status, updatedAt: new Date().toISOString() } : t));
  };

  const updateSettings = (newSettings: Partial<InstitutionSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const resetToSeedData = () => {
    localStorage.clear();
    setCurrentUser(INITIAL_USERS[0]);
    setUsers(INITIAL_USERS);
    setPrograms(INITIAL_PROGRAMS);
    setCourses(INITIAL_COURSES);
    setProgressList(INITIAL_STUDENT_PROGRESS);
    setSubmissions(INITIAL_ASSIGNMENT_SUBMISSIONS);
    setExamAttempts(INITIAL_EXAM_ATTEMPTS);
    setApplications(INITIAL_APPLICATIONS);
    setInvoices(INITIAL_INVOICES);
    setTransactions(INITIAL_TRANSACTIONS);
    setCertificates(INITIAL_CERTIFICATES);
    setDiscussions(INITIAL_DISCUSSIONS);
    setTickets(INITIAL_TICKETS);
    setSettings(INITIAL_INSTITUTION_SETTINGS);
    navigateTo('home');
  };

  const notificationsCount = announcements.filter(a => a.isImportant).length + 2;

  return (
    <AppContext.Provider value={{
      currentUser,
      users,
      schools,
      programs,
      courses,
      progressList,
      submissions,
      examAttempts,
      applications,
      invoices,
      transactions,
      certificates,
      libraryResources,
      ministryResources,
      events,
      announcements,
      discussions,
      tickets,
      settings,
      activeView,
      selectedCourseId,
      selectedLessonId,
      selectedProgramId,
      notificationsCount,

      navigateTo,
      switchRole,
      loginUser,
      registerUser,
      logout,

      markLessonComplete,
      submitQuizScore,
      getStudentProgress,
      getStudentGPA,
      enrollInCourse,

      submitAssignment,
      gradeSubmission,

      submitExamAttempt,
      gradeExamAttempt,
      createExamination,

      submitApplication,
      reviewApplication,
      enrollApplicant,

      makePayment,
      issueInvoice,

      issueCertificate,
      verifyCertificate,

      addDiscussionPost,
      addDiscussionReply,
      createTicket,
      replyTicket,
      updateTicketStatus,

      updateSettings,
      resetToSeedData
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
