import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BROOKS_LOGO_SRC } from '../../assets/logo';
import { 
  X, 
  User, 
  Lock, 
  Mail, 
  GraduationCap, 
  CheckCircle, 
  Sparkles, 
  ShieldCheck,
  Building,
  KeyRound
} from 'lucide-react';
import { UserRole } from '../../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { loginUser, registerUser, switchRole, programs } = useApp();
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('password123');
  const [name, setName] = useState('');
  const [country, setCountry] = useState('United Kingdom');
  const [programId, setProgramId] = useState('bach-theology');
  const [churchAffiliation, setChurchAffiliation] = useState('Grace Bible Fellowship');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setErrorMsg('Please enter an email address.');
      return;
    }
    const success = loginUser(email);
    if (success) {
      onClose();
    } else {
      setErrorMsg('Account not found with this email. Try our demo accounts below or create an account!');
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      setErrorMsg('Please provide your full name and email.');
      return;
    }
    registerUser({
      name,
      email,
      country,
      programId,
      churchAffiliation,
      role: 'student'
    });
    onClose();
  };

  const handleQuickRole = (role: UserRole) => {
    switchRole(role);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-lg w-full overflow-hidden">
        {/* Modal Header */}
        <div className="bg-slate-900 text-white p-6 relative">
          <button 
            onClick={onClose}
            className="absolute right-4 top-4 p-1 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-xl overflow-hidden bg-black/60 border border-amber-400/50 flex items-center justify-center shadow-lg shrink-0">
              <img 
                src={BROOKS_LOGO_SRC} 
                alt="Brooks of Life Schools of Ministry -UK-" 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover" 
              />
            </div>
            <div>
              <h3 className="font-cinzel text-base sm:text-lg font-bold text-white leading-tight">
                {isRegister ? 'Student Portal Registration' : 'Theological Portal Authentication'}
              </h3>
              <p className="text-[11px] text-amber-300 font-medium">
                Brooks of Life Schools of Ministry -UK-
              </p>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          {/* Quick Switch Demo Bar */}
          <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200/80 space-y-2">
            <div className="flex items-center space-x-1.5 text-xs font-bold text-amber-900">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>1-Click Institutional Demo Logins:</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 text-[11px]">
              <button
                type="button"
                onClick={() => handleQuickRole('student')}
                className="px-2 py-1.5 bg-white border border-amber-300/80 rounded-lg hover:bg-amber-100/60 font-semibold text-slate-800 text-left truncate cursor-pointer"
              >
                🎓 Student Portal
              </button>
              <button
                type="button"
                onClick={() => handleQuickRole('lecturer')}
                className="px-2 py-1.5 bg-white border border-blue-300/80 rounded-lg hover:bg-blue-50 font-semibold text-blue-900 text-left truncate cursor-pointer"
              >
                👨‍🏫 Faculty / Dean
              </button>
              <button
                type="button"
                onClick={() => handleQuickRole('examination_officer')}
                className="px-2 py-1.5 bg-white border border-purple-300/80 rounded-lg hover:bg-purple-50 font-semibold text-purple-900 text-left truncate cursor-pointer"
              >
                📝 TEMS Exam Officer
              </button>
              <button
                type="button"
                onClick={() => handleQuickRole('registrar')}
                className="px-2 py-1.5 bg-white border border-indigo-300/80 rounded-lg hover:bg-indigo-50 font-semibold text-indigo-900 text-left truncate cursor-pointer"
              >
                📜 Registrar
              </button>
              <button
                type="button"
                onClick={() => handleQuickRole('finance_officer')}
                className="px-2 py-1.5 bg-white border border-amber-300/80 rounded-lg hover:bg-amber-50 font-semibold text-amber-900 text-left truncate cursor-pointer"
              >
                💳 Finance & Bursar
              </button>
              <button
                type="button"
                onClick={() => handleQuickRole('super_admin')}
                className="px-2 py-1.5 bg-white border border-rose-300/80 rounded-lg hover:bg-rose-50 font-semibold text-rose-900 text-left truncate cursor-pointer"
              >
                👑 Super Admin
              </button>
            </div>
          </div>

          {errorMsg && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 font-medium">
              {errorMsg}
            </div>
          )}

          {!isRegister ? (
            /* LOGIN FORM */
            <form onSubmit={handleLogin} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Institutional Email</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="email"
                    required
                    placeholder="e.g. samuel.adebayo@student.brooksoflife.edu"
                    value={email}
                    onChange={e => { setEmail(e.target.value); setErrorMsg(''); }}
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500/20"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500/20"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold rounded-xl text-xs uppercase tracking-wider transition cursor-pointer"
              >
                Sign In to Campus Portal
              </button>

              <div className="text-center pt-2 text-xs text-slate-500">
                Don't have an enrolled account?{' '}
                <button
                  type="button"
                  onClick={() => { setIsRegister(true); setErrorMsg(''); }}
                  className="text-amber-700 font-bold hover:underline cursor-pointer"
                >
                  Create Student Account
                </button>
              </div>
            </form>
          ) : (
            /* REGISTRATION FORM */
            <form onSubmit={handleRegister} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Full Legal Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Samuel Adebayo"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="you@example.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500/20"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Country *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. United Kingdom"
                    value={country}
                    onChange={e => setCountry(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500/20"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Academic Program to Enroll</label>
                <select
                  value={programId}
                  onChange={e => setProgramId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 font-medium"
                >
                  {programs.map(p => (
                    <option key={p.id} value={p.id}>[{p.level}] {p.title}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Local Church Affiliation</label>
                <input
                  type="text"
                  placeholder="e.g. Grace Community Church"
                  value={churchAffiliation}
                  onChange={e => setChurchAffiliation(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500/20"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold rounded-xl text-xs uppercase tracking-wider transition cursor-pointer"
              >
                Create Account & Enter Portal
              </button>

              <div className="text-center pt-1 text-xs text-slate-500">
                Already have credentials?{' '}
                <button
                  type="button"
                  onClick={() => { setIsRegister(false); setErrorMsg(''); }}
                  className="text-amber-700 font-bold hover:underline cursor-pointer"
                >
                  Sign In
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
