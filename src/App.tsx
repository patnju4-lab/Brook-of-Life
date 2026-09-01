import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { PortalSidebar } from './components/layout/PortalSidebar';
import { AuthModal } from './components/public/AuthModal';

// Public Pages
import { HeroAndFeatures } from './components/public/HeroAndFeatures';
import { AboutPage } from './components/public/AboutPage';
import { ProgramsCatalog } from './components/public/ProgramsCatalog';
import { FacultyDirectory } from './components/public/FacultyDirectory';
import { AdmissionsPage } from './components/public/AdmissionsPage';
import { EventsCalendarPage } from './components/public/EventsCalendarPage';
import { CertificateVerificationPage } from './components/public/CertificateVerificationPage';
import { MinistryResourceCenterPage } from './components/public/MinistryResourceCenterPage';
import { DigitalLibraryPublicPage } from './components/public/DigitalLibraryPublicPage';
import { ContactSupportPage } from './components/public/ContactSupportPage';

// Student Portal Pages
import { StudentDashboard } from './components/student/StudentDashboard';
import { CoursePlayer } from './components/student/CoursePlayer';
import { StudentCoursesList } from './components/student/StudentCoursesList';
import { StudentAssignments } from './components/student/StudentAssignments';
import { StudentGrades } from './components/student/StudentGrades';
import { StudentCertificates } from './components/student/StudentCertificates';
import { StudentFinance } from './components/student/StudentFinance';
import { StudentExamsHall } from './components/student/StudentExamsHall';

// Staff & Faculty Dashboards
import { FacultyDashboard } from './components/admin/FacultyDashboard';
import { RegistrarDashboard } from './components/admin/RegistrarDashboard';
import { ExamOfficerDashboard } from './components/admin/ExamOfficerDashboard';
import { FinanceOfficerDashboard } from './components/admin/FinanceOfficerDashboard';
import { SuperAdminDashboard } from './components/admin/SuperAdminDashboard';

const MainContent: React.FC = () => {
  const { activeView, currentUser } = useApp();
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const isPortalView = [
    'student-dashboard',
    'student-courses',
    'student-course-player',
    'course-player',
    'student-assignments',
    'student-transcript',
    'student-grades',
    'student-certificates',
    'student-finance',
    'student-exams',
    'faculty-dashboard',
    'admin-faculty',
    'tems-dashboard',
    'admin-exams',
    'registrar-dashboard',
    'admin-registrar',
    'finance-dashboard',
    'admin-finance',
    'admin-dashboard',
    'admin-super'
  ].includes(activeView);

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0b] text-slate-200 font-sans selection:bg-[#c4a47c] selection:text-[#0a0a0b]">
      {/* Top Main Navigation */}
      <Navbar onOpenAuth={() => setAuthModalOpen(true)} />

      {/* Main Body Area */}
      <div className="flex-1 flex flex-col">
        {isPortalView ? (
          /* Portal Multi-column Layout with Sidebar */
          <div className="container mx-auto px-4 py-6 flex-1 flex flex-col lg:flex-row gap-6">
            <div className="lg:w-64 shrink-0">
              <PortalSidebar />
            </div>

            <main className="flex-1 min-w-0">
              {activeView === 'student-dashboard' && <StudentDashboard />}
              {activeView === 'student-courses' && <StudentCoursesList />}
              {(activeView === 'student-course-player' || activeView === 'course-player') && <CoursePlayer />}
              {activeView === 'student-assignments' && <StudentAssignments />}
              {(activeView === 'student-transcript' || activeView === 'student-grades') && <StudentGrades />}
              {activeView === 'student-certificates' && <StudentCertificates />}
              {activeView === 'student-finance' && <StudentFinance />}
              {activeView === 'student-exams' && <StudentExamsHall />}

              {(activeView === 'faculty-dashboard' || activeView === 'admin-faculty') && <FacultyDashboard />}
              {(activeView === 'registrar-dashboard' || activeView === 'admin-registrar') && <RegistrarDashboard />}
              {(activeView === 'tems-dashboard' || activeView === 'admin-exams') && <ExamOfficerDashboard />}
              {(activeView === 'finance-dashboard' || activeView === 'admin-finance') && <FinanceOfficerDashboard />}
              {(activeView === 'admin-dashboard' || activeView === 'admin-super') && <SuperAdminDashboard />}
            </main>
          </div>
        ) : (
          /* Public Informational Views */
          <main className="flex-1">
            {activeView === 'home' && <HeroAndFeatures onOpenAuth={() => setAuthModalOpen(true)} />}
            {activeView === 'about' && <AboutPage />}
            {activeView === 'programs' && <ProgramsCatalog />}
            {activeView === 'faculty' && <FacultyDirectory />}
            {activeView === 'admissions' && <AdmissionsPage />}
            {activeView === 'events' && <EventsCalendarPage />}
            {activeView === 'verify-certificate' && <CertificateVerificationPage />}
            {activeView === 'ministry-resources' && <MinistryResourceCenterPage />}
            {activeView === 'library' && <DigitalLibraryPublicPage />}
            {(activeView === 'contact' || activeView === 'contact-support') && <ContactSupportPage />}
          </main>
        )}
      </div>

      {/* Institutional Footer */}
      <Footer onOpenAuth={() => setAuthModalOpen(true)} />

      {/* Global Auth / Role Selector Modal */}
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
