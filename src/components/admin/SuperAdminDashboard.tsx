import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ShieldCheck, 
  Settings, 
  Database, 
  RefreshCw, 
  Users, 
  BookOpen, 
  Award, 
  CheckCircle, 
  AlertTriangle,
  Building,
  Key
} from 'lucide-react';
import { UserRole } from '../../types';

export const SuperAdminDashboard: React.FC = () => {
  const { 
    settings, 
    updateSettings, 
    resetToSeedData, 
    courses, 
    applications, 
    certificates, 
    invoices,
    currentUser,
    switchRole
  } = useApp();

  const [institutionName, setInstitutionName] = useState(settings.name);
  const [president, setPresident] = useState(settings.president);
  const [registrar, setRegistrar] = useState(settings.registrar);
  const [motto, setMotto] = useState(settings.motto);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [resetConfirm, setResetConfirm] = useState(false);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      name: institutionName,
      president,
      registrar,
      motto
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const handleResetData = () => {
    resetToSeedData();
    setResetConfirm(false);
    alert('System database reset to standard theological seed dataset.');
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono text-xs font-bold">
              Board of Regents & Executive Administration
            </span>
          </div>
          <h1 className="font-cinzel text-2xl sm:text-3xl font-bold text-white">
            Super Administrator Console
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            System configuration, data synchronization, security rules, and institutional oversight.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setResetConfirm(true)}
            className="px-4 py-2.5 bg-rose-600/80 hover:bg-rose-600 text-white font-bold text-xs rounded-xl flex items-center space-x-1.5 transition cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Reset Seed Database</span>
          </button>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <div className="text-xs text-slate-400 font-medium">Theological Courses</div>
          <div className="text-2xl font-cinzel font-bold text-slate-900">{courses.length}</div>
          <div className="text-[11px] text-amber-700">6 Schools Active</div>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <div className="text-xs text-slate-400 font-medium">Admissions Candidates</div>
          <div className="text-2xl font-cinzel font-bold text-blue-700">{applications.length}</div>
          <div className="text-[11px] text-blue-800">Global Applicants</div>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <div className="text-xs text-slate-400 font-medium">Conferred Degrees</div>
          <div className="text-2xl font-cinzel font-bold text-purple-700">{certificates.length}</div>
          <div className="text-[11px] text-purple-800">Sealed Diplomas</div>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <div className="text-xs text-slate-400 font-medium">Bursary Invoices</div>
          <div className="text-2xl font-cinzel font-bold text-emerald-700">{invoices.length}</div>
          <div className="text-[11px] text-emerald-800">Active Ledgers</div>
        </div>
      </div>

      {/* Role Testing Simulator */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-3xl p-6 border border-slate-700 space-y-4">
        <div className="flex items-center space-x-2">
          <Key className="w-5 h-5 text-amber-400" />
          <h3 className="font-cinzel text-base font-bold text-white">
            Role Persona & RBAC Test Switcher
          </h3>
        </div>
        <p className="text-xs text-slate-300">
          Switch live permissions to evaluate each persona's interface and capabilities in real time:
        </p>

        <div className="flex flex-wrap gap-2 pt-2">
          {([
            { role: 'student' as UserRole, label: 'Student' },
            { role: 'lecturer' as UserRole, label: 'Lecturer' },
            { role: 'registrar' as UserRole, label: 'Registrar' },
            { role: 'examination_officer' as UserRole, label: 'Exam Officer' },
            { role: 'finance_officer' as UserRole, label: 'Finance Officer' },
            { role: 'super_admin' as UserRole, label: 'Super Admin' },
          ]).map(r => (
            <button
              key={r.role}
              onClick={() => switchRole(r.role)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                currentUser?.role === r.role ? 'bg-amber-500 text-slate-950 shadow-md' : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
              }`}
            >
              {r.label} {currentUser?.role === r.role ? '✓ (Active)' : ''}
            </button>
          ))}
        </div>
      </div>

      {/* Institutional Settings Form */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center space-x-3 border-b border-slate-100 pb-3">
          <Building className="w-6 h-6 text-amber-600" />
          <div>
            <h3 className="font-cinzel text-lg font-bold text-slate-900">
              Institutional Metadata & Governance Details
            </h3>
            <p className="text-xs text-slate-500">
              These details dynamically appear on official diplomas, transcripts, and student bursary receipts.
            </p>
          </div>
        </div>

        {savedSuccess && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 font-bold flex items-center space-x-2">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span>Institutional settings saved to local persistence!</span>
          </div>
        )}

        <form onSubmit={handleSaveSettings} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Institution Legal Name *</label>
              <input
                type="text"
                required
                value={institutionName}
                onChange={e => setInstitutionName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 font-cinzel font-bold text-sm"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Institutional Motto / Scripture *</label>
              <input
                type="text"
                required
                value={motto}
                onChange={e => setMotto(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 italic"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">President / Chancellor Signatory *</label>
              <input
                type="text"
                required
                value={president}
                onChange={e => setPresident(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Academic Registrar Signatory *</label>
              <input
                type="text"
                required
                value={registrar}
                onChange={e => setRegistrar(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 bg-slate-900 hover:bg-amber-500 hover:text-slate-950 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition cursor-pointer"
            >
              Update Institutional Parameters
            </button>
          </div>
        </form>
      </div>

      {/* Reset Confirmation Modal */}
      {resetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-md w-full p-6 space-y-4 text-xs">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="font-cinzel text-lg font-bold text-slate-900 text-center">
              Confirm Database Reset
            </h3>
            <p className="text-slate-600 text-center">
              This will restore all courses, quizzes, admissions applications, and mock student grades back to the default theological curriculum seed.
            </p>
            <div className="flex space-x-2 pt-2">
              <button
                onClick={() => setResetConfirm(false)}
                className="w-1/2 py-2.5 bg-slate-100 text-slate-700 font-bold rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={handleResetData}
                className="w-1/2 py-2.5 bg-rose-600 text-white font-bold rounded-xl"
              >
                Confirm Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
