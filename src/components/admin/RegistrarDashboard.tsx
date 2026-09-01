import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  FileCheck, 
  Users, 
  Award, 
  CheckCircle, 
  XCircle, 
  Plus, 
  Search, 
  GraduationCap, 
  ShieldCheck, 
  Printer 
} from 'lucide-react';
import { AdmissionApplication, DigitalCertificate } from '../../types';

export const RegistrarDashboard: React.FC = () => {
  const { 
    applications, 
    reviewApplication,
    enrollApplicant, 
    certificates, 
    issueCertificate, 
    programs, 
    currentUser,
    settings 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'applications' | 'certificates' | 'issue'>('applications');
  
  // Issue new certificate form state
  const [certStudentName, setCertStudentName] = useState('Samuel Adebayo');
  const [certProgramTitle, setCertProgramTitle] = useState('Bachelor of Theology (B.Th.)');
  const [certProgramId, setCertProgramId] = useState('bach-theology');
  const [certAwardLevel, setCertAwardLevel] = useState('Bachelor Degree');
  const [certStudentId, setCertStudentId] = useState('user-student-1');
  const [issueSuccess, setIssueSuccess] = useState(false);

  const handleApprove = (appId: string) => {
    reviewApplication(appId, 'Accepted', 'Applicant cleared for enrollment. Matriculation package generated.', 25);
    enrollApplicant(appId);
  };

  const handleReject = (appId: string) => {
    reviewApplication(appId, 'Rejected', 'Does not meet minimum prerequisites.');
  };

  const handleIssueCert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!certStudentName || !certProgramTitle) return;

    issueCertificate({
      studentId: certStudentId,
      studentName: certStudentName,
      programId: certProgramId,
      programTitle: certProgramTitle,
      awardLevel: certAwardLevel,
      issueDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      registrarName: currentUser?.name || settings.registrar,
      presidentName: settings.president,
      honors: 'Summa Cum Laude'
    });

    setIssueSuccess(true);
    setTimeout(() => {
      setIssueSuccess(false);
      setActiveTab('certificates');
    }, 1500);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-mono text-xs font-bold">
              Directorate of Academic Records & Registry
            </span>
          </div>
          <h1 className="font-cinzel text-2xl sm:text-3xl font-bold text-white">
            Academic Registrar Office
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Admissions clearance, matriculation registry, transcript validation, and degree conferral.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setActiveTab('issue')}
            className="px-4 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-slate-950 font-bold text-xs rounded-xl flex items-center space-x-1.5 shadow-md cursor-pointer"
          >
            <Award className="w-4 h-4" />
            <span>Confer Degree / Issue Certificate</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 space-x-4 text-xs font-bold">
        <button
          onClick={() => setActiveTab('applications')}
          className={`pb-3 border-b-2 transition cursor-pointer ${activeTab === 'applications' ? 'border-amber-600 text-amber-700' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
        >
          Admissions Applications ({applications.length})
        </button>
        <button
          onClick={() => setActiveTab('certificates')}
          className={`pb-3 border-b-2 transition cursor-pointer ${activeTab === 'certificates' ? 'border-amber-600 text-amber-700' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
        >
          Issued Diplomas & Registry ({certificates.length})
        </button>
        <button
          onClick={() => setActiveTab('issue')}
          className={`pb-3 border-b-2 transition cursor-pointer ${activeTab === 'issue' ? 'border-amber-600 text-amber-700' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
        >
          Confer New Degree
        </button>
      </div>

      {/* TAB 1: ADMISSIONS APPLICATIONS */}
      {activeTab === 'applications' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
          <h3 className="font-cinzel text-base font-bold text-slate-900">
            Prospective Student Inquiries & Applications
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 font-semibold">
                  <th className="py-2.5 px-3">Applicant Name</th>
                  <th className="py-2.5 px-3">Country</th>
                  <th className="py-2.5 px-3">Desired Program</th>
                  <th className="py-2.5 px-3">Church Affiliation</th>
                  <th className="py-2.5 px-3 text-center">Status</th>
                  <th className="py-2.5 px-3 text-right">Admissions Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {applications.map(app => {
                  const prog = programs.find(p => p.id === app.programId);

                  return (
                    <tr key={app.id} className="hover:bg-slate-50">
                      <td className="py-3 px-3">
                        <div className="font-semibold text-slate-900 font-cinzel">{app.applicantName}</div>
                        <div className="text-[11px] text-slate-400">{app.email}</div>
                      </td>
                      <td className="py-3 px-3 text-slate-600">{app.country}</td>
                      <td className="py-3 px-3 font-medium text-amber-800">{prog?.title || app.programId}</td>
                      <td className="py-3 px-3 text-slate-600">{app.churchName}</td>
                      <td className="py-3 px-3 text-center">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          app.status === 'Enrolled' || app.status === 'Accepted' ? 'bg-emerald-100 text-emerald-800' :
                          app.status === 'Rejected' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {app.status}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right space-x-1.5">
                        {app.status === 'Submitted' || app.status === 'Under Review' ? (
                          <>
                            <button
                              onClick={() => handleApprove(app.id)}
                              className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold cursor-pointer"
                            >
                              Approve & Enroll
                            </button>
                            <button
                              onClick={() => handleReject(app.id)}
                              className="px-2.5 py-1 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-xs font-semibold cursor-pointer"
                            >
                              Reject
                            </button>
                          </>
                        ) : (
                          <span className="text-emerald-700 text-xs font-medium">Matriculated ✓</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: ISSUED CERTIFICATES */}
      {activeTab === 'certificates' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
          <h3 className="font-cinzel text-base font-bold text-slate-900">
            Institutional Registry of Conferred Degrees
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 font-semibold">
                  <th className="py-2.5 px-3">Certificate Number</th>
                  <th className="py-2.5 px-3">Recipient Graduate</th>
                  <th className="py-2.5 px-3">Degree Award</th>
                  <th className="py-2.5 px-3">Conferral Date</th>
                  <th className="py-2.5 px-3 text-right">Verification</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {certificates.map(cert => (
                  <tr key={cert.id} className="hover:bg-slate-50">
                    <td className="py-3 px-3 font-mono font-bold text-slate-800">{cert.certificateNumber}</td>
                    <td className="py-3 px-3 font-semibold text-slate-900 font-cinzel">{cert.studentName}</td>
                    <td className="py-3 px-3 text-amber-800 font-medium">{cert.programTitle}</td>
                    <td className="py-3 px-3 text-slate-500">{cert.issueDate}</td>
                    <td className="py-3 px-3 text-right">
                      <span className="text-emerald-700 font-bold text-xs">Direct Verified ✓</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: ISSUE NEW CERTIFICATE */}
      {activeTab === 'issue' && (
        <div className="max-w-xl mx-auto bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center space-x-3 border-b border-slate-100 pb-3">
            <Award className="w-6 h-6 text-amber-600" />
            <div>
              <h3 className="font-cinzel text-lg font-bold text-slate-900">
                Official Degree Conferral & Certificate Issuance
              </h3>
              <p className="text-xs text-slate-500">
                Authorized by the Academic Registrar and President
              </p>
            </div>
          </div>

          {issueSuccess ? (
            <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-2">
              <CheckCircle className="w-10 h-10 text-emerald-600 mx-auto" />
              <h4 className="font-cinzel text-base font-bold text-slate-900">
                Degree Successfully Conferred!
              </h4>
              <p className="text-xs text-slate-600">
                The diploma record and instant verification token have been entered into the institutional registry.
              </p>
            </div>
          ) : (
            <form onSubmit={handleIssueCert} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Graduate Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Samuel David Adebayo"
                  value={certStudentName}
                  onChange={e => setCertStudentName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 font-cinzel font-bold text-sm"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Academic Degree / Program *</label>
                <select
                  value={certProgramTitle}
                  onChange={e => {
                    const prog = programs.find(p => p.title === e.target.value);
                    setCertProgramTitle(e.target.value);
                    if (prog) setCertProgramId(prog.id);
                  }}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 font-semibold bg-slate-50"
                >
                  {programs.map(p => (
                    <option key={p.id} value={p.title}>{p.title} ({p.level})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Award Classification</label>
                <select
                  value={certAwardLevel}
                  onChange={e => setCertAwardLevel(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50"
                >
                  <option value="Bachelor Degree">Bachelor Degree (Summa Cum Laude)</option>
                  <option value="Master Degree">Master Degree (Magna Cum Laude)</option>
                  <option value="Doctoral Degree">Doctoral Degree (Highest Theological Distinction)</option>
                  <option value="Certificate in Christian Ministry">Certificate in Christian Ministry</option>
                  <option value="Diploma in Biblical Studies">Diploma in Biblical Studies</option>
                </select>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-slate-950 font-bold rounded-xl text-xs uppercase tracking-wider transition cursor-pointer shadow-md"
                >
                  Seal & Issue Official Diploma
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  );
};
