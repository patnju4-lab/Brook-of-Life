import React from 'react';
import { useApp } from '../../context/AppContext';
import { BROOKS_LOGO_SRC } from '../../assets/logo';
import { 
  BookOpen, 
  Mail, 
  Phone, 
  MapPin, 
  ShieldCheck, 
  Award, 
  FileCheck, 
  ExternalLink,
  Heart
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigateTo, settings, schools } = useApp();

  return (
    <footer className="bg-[#0a0a0b] text-slate-400 text-sm border-t border-white/5 no-print" id="institutional-footer">
      {/* Top Banner */}
      <div className="bg-[#0f0f11] border-b border-white/5 py-8 px-4">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
          <div className="flex items-center space-x-3 col-span-1 md:col-span-2">
            <div className="w-12 h-12 rounded-lg overflow-hidden bg-black/60 border border-[#c4a47c]/40 flex items-center justify-center shrink-0 shadow-lg shadow-amber-950/20">
              <img 
                src={BROOKS_LOGO_SRC} 
                alt="Brooks of Life Schools of Ministry -UK-" 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover" 
              />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-white tracking-wide flex items-center gap-1.5 flex-wrap">
                Brooks of Life 
                <span className="text-[#c4a47c] text-xs font-serif px-1.5 py-0.5 rounded bg-[#c4a47c]/10 border border-[#c4a47c]/30">
                  Schools of Ministry -UK-
                </span>
              </h3>
              <p className="text-xs text-[#c4a47c]/90 font-serif italic">
                “Equipping • Empowering • Enriching” — 2 Timothy 2:2
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4 md:justify-end col-span-1 md:col-span-2">
            <button
              onClick={() => navigateTo('admissions')}
              className="px-5 py-2 bg-[#c4a47c] hover:bg-[#d5b791] text-[#0a0a0b] font-bold rounded text-xs tracking-wider uppercase transition shadow-md cursor-pointer"
            >
              Apply for Fall 2026
            </button>
            <button
              onClick={() => navigateTo('verify-certificate')}
              className="px-4 py-2 bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 font-semibold rounded text-xs transition cursor-pointer flex items-center space-x-1.5"
            >
              <FileCheck className="w-3.5 h-3.5 text-[#c4a47c]" />
              <span>Verify Certificate</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="container mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 text-xs">
        {/* Col 1: About & Info */}
        <div className="lg:col-span-2 space-y-3">
          <h4 className="font-serif text-sm font-semibold text-white tracking-wide border-b border-white/10 pb-2">
            Institutional Overview
          </h4>
          <p className="leading-relaxed text-slate-400">
            Brooks of Life School of Ministry (BLSM) is an international theological institution dedicated to the rigorous biblical, doctrinal, and spiritual formation of pastors, evangelists, missionaries, chaplains, and Christian leaders across the globe.
          </p>
          <div className="space-y-2 text-slate-300 pt-1">
            <div className="flex items-start space-x-2">
              <MapPin className="w-3.5 h-3.5 text-[#c4a47c] shrink-0 mt-0.5" />
              <span className="text-slate-400">{settings.address}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="w-3.5 h-3.5 text-[#c4a47c] shrink-0" />
              <span className="text-slate-400">{settings.contactEmail}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="w-3.5 h-3.5 text-[#c4a47c] shrink-0" />
              <span className="text-slate-400">{settings.contactPhone}</span>
            </div>
          </div>
        </div>

        {/* Col 2: Academic Schools */}
        <div className="space-y-3">
          <h4 className="font-serif text-sm font-semibold text-white tracking-wide border-b border-white/10 pb-2">
            Academic Schools
          </h4>
          <ul className="space-y-2">
            {schools.slice(0, 6).map(s => (
              <li key={s.id}>
                <button
                  onClick={() => navigateTo('programs')}
                  className="hover:text-[#c4a47c] transition text-left cursor-pointer truncate max-w-full block text-slate-400"
                >
                  {s.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3: Academic Portals */}
        <div className="space-y-3">
          <h4 className="font-serif text-sm font-semibold text-white tracking-wide border-b border-white/10 pb-2">
            Online Portals
          </h4>
          <ul className="space-y-2 text-slate-400">
            <li>
              <button onClick={() => navigateTo('student-dashboard')} className="hover:text-[#c4a47c] transition">
                Student & Candidate LMS
              </button>
            </li>
            <li>
              <button onClick={() => navigateTo('student-exams')} className="hover:text-[#c4a47c] transition">
                TEMS Examination Center
              </button>
            </li>
            <li>
              <button onClick={() => navigateTo('faculty-dashboard')} className="hover:text-[#c4a47c] transition">
                Faculty Portal
              </button>
            </li>
            <li>
              <button onClick={() => navigateTo('library')} className="hover:text-[#c4a47c] transition">
                Digital Theological Library
              </button>
            </li>
            <li>
              <button onClick={() => navigateTo('ministry-resources')} className="hover:text-[#c4a47c] transition">
                Ministry Resource Center
              </button>
            </li>
          </ul>
        </div>

        {/* Col 4: Legal & Accreditations */}
        <div className="space-y-3">
          <h4 className="font-serif text-sm font-semibold text-white tracking-wide border-b border-white/10 pb-2">
            Faith & Standing
          </h4>
          <div className="space-y-2 text-slate-400">
            <p className="text-[11px] leading-relaxed">
              BLSM operates under the spiritual oversight of Brooks Ministry International. Committed to Biblical Inerrancy, Historic Trinitarianism, and the Great Commission.
            </p>
            <div className="pt-2">
              <button
                onClick={() => navigateTo('about')}
                className="text-[#c4a47c] hover:underline flex items-center space-x-1"
              >
                <span>Read Statement of Faith</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Strip */}
      <div className="bg-[#0a0a0b] border-t border-white/5 py-4 px-4 text-[10px] text-slate-400 uppercase tracking-widest font-mono">
        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>© 2026 Brooks of Life School of Ministry • All Rights Reserved</span>
          <span>Institutional Access • Version 4.1.2</span>
        </div>
      </div>
    </footer>
  );
};
