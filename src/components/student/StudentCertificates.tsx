import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BROOKS_LOGO_SRC } from '../../assets/logo';
import { 
  Award, 
  Printer, 
  ShieldCheck, 
  QrCode, 
  ExternalLink, 
  CheckCircle,
  Copy,
  Check
} from 'lucide-react';
import { DigitalCertificate } from '../../types';

export const StudentCertificates: React.FC = () => {
  const { certificates, currentUser, settings } = useApp();
  
  const studentCerts = certificates.filter(c => c.studentId === currentUser?.id || c.studentName === currentUser?.name);
  const displayCerts = studentCerts.length > 0 ? studentCerts : certificates;
  const [selectedCert, setSelectedCert] = useState<DigitalCertificate>(displayCerts[0]);
  const [copied, setCopied] = useState(false);

  const handleCopyLink = (certNum: string) => {
    navigator.clipboard.writeText(`https://brooksoflife.edu/verify?cert=${certNum}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 no-print">
        <div>
          <h1 className="font-cinzel text-2xl font-bold text-slate-900">
            Digital Diplomas & Certificates
          </h1>
          <p className="text-xs text-slate-500">
            Verifiable digital theological credentials with anti-fraud institutional security seals.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleCopyLink(selectedCert?.certificateNumber || 'BLSM-CERT-2026-0894')}
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs rounded-xl flex items-center space-x-1.5 transition cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Link Copied' : 'Share Verification Link'}</span>
          </button>

          <button
            onClick={() => window.print()}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl flex items-center space-x-1.5 transition cursor-pointer"
          >
            <Printer className="w-4 h-4 text-amber-400" />
            <span>Print Diploma</span>
          </button>
        </div>
      </div>

      {/* Diplomas Selection Ribbon if multiple */}
      {displayCerts.length > 1 && (
        <div className="flex space-x-3 overflow-x-auto pb-2 no-print">
          {displayCerts.map(c => (
            <button
              key={c.id}
              onClick={() => setSelectedCert(c)}
              className={`p-3 rounded-2xl border text-left text-xs transition cursor-pointer whitespace-nowrap ${
                selectedCert?.id === c.id ? 'bg-amber-50 border-amber-400 font-bold text-amber-900 shadow-sm' : 'bg-white border-slate-200 text-slate-700'
              }`}
            >
              <div className="text-[10px] text-slate-400 font-mono">{c.certificateNumber}</div>
              <div>{c.programTitle}</div>
            </button>
          ))}
        </div>
      )}

      {/* Flagship Classical Diploma View */}
      {selectedCert && (
        <div className="bg-gradient-to-br from-amber-50/70 via-white to-amber-50/70 rounded-3xl border-8 border-double border-amber-800/40 p-8 sm:p-14 shadow-2xl space-y-8 relative overflow-hidden text-center print:border-none print:shadow-none">
          {/* Subtle Watermark Emblem */}
          <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
            <img
              src={BROOKS_LOGO_SRC}
              alt="Watermark Crest"
              referrerPolicy="no-referrer"
              className="w-[420px] h-[420px] object-contain filter grayscale"
            />
          </div>

          {/* Top Seminary Header */}
          <div className="space-y-3 relative z-10 flex flex-col items-center">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-black/90 border-2 border-amber-500/80 p-0.5 shadow-xl shadow-amber-950/20">
              <img
                src={BROOKS_LOGO_SRC}
                alt="Official BLSM Crest"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover rounded-xl"
              />
            </div>

            <div className="font-cinzel text-xl sm:text-3xl font-extrabold text-slate-900 tracking-widest uppercase">
              Brooks of Life Schools of Ministry -UK-
            </div>
            <p className="font-scripture text-base sm:text-lg text-amber-900 italic font-medium">
              “Equipping • Empowering • Enriching” — 2 Timothy 2:2
            </p>
            <div className="text-[11px] text-slate-500 uppercase tracking-widest font-semibold pt-1">
              Upon the recommendation of the Faculty and by the Authority of the Board of Regents
            </div>
          </div>

          {/* Diploma Conferral Statement */}
          <div className="space-y-4 py-4 relative z-10">
            <div className="text-xs text-slate-600 uppercase tracking-wider font-medium">
              Has conferred upon
            </div>

            <div className="font-cinzel text-2xl sm:text-4xl font-bold text-slate-900 underline decoration-amber-500/50 decoration-2 underline-offset-8">
              {selectedCert.studentName}
            </div>

            <div className="text-xs text-slate-600 uppercase tracking-wider pt-2">
              The Academic Degree / Award of
            </div>

            <div className="font-cinzel text-xl sm:text-3xl font-extrabold text-amber-900">
              {selectedCert.programTitle}
            </div>

            <p className="max-w-xl mx-auto text-xs text-slate-600 leading-relaxed pt-2">
              With all the Honors, Rights, and Privileges thereunto appertaining, having satisfactorily completed all prescribed theological curricula, exegetical examinations, and ministry practicums.
            </p>
          </div>

          {/* Signatures & Seal Section */}
          <div className="pt-8 border-t border-amber-900/20 grid grid-cols-1 sm:grid-cols-3 items-end gap-6 relative z-10">
            {/* Registrar */}
            <div className="space-y-1 text-center">
              <div className="font-scripture text-xl text-slate-800 font-bold italic">
                {selectedCert.registrarName}
              </div>
              <div className="h-0.5 bg-slate-300 w-36 mx-auto"></div>
              <div className="text-[11px] font-bold text-slate-700 font-cinzel">Academic Registrar</div>
            </div>

            {/* Institutional Gold Seal with QR Code */}
            <div className="flex flex-col items-center justify-center space-y-1">
              <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-amber-600 via-amber-400 to-amber-600 p-1 shadow-2xl flex items-center justify-center text-slate-950">
                <div className="w-full h-full rounded-full overflow-hidden border-2 border-slate-950/60 flex items-center justify-center bg-black/90 p-0.5">
                  <img
                    src={BROOKS_LOGO_SRC}
                    alt="Official Seal"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="font-mono text-[10px] text-slate-700 font-bold pt-1">
                {selectedCert.certificateNumber}
              </div>
            </div>

            {/* President / Chancellor */}
            <div className="space-y-1 text-center">
              <div className="font-scripture text-xl text-slate-800 font-bold italic">
                {selectedCert.presidentName}
              </div>
              <div className="h-0.5 bg-slate-300 w-36 mx-auto"></div>
              <div className="text-[11px] font-bold text-slate-700 font-cinzel">President & Chancellor</div>
            </div>
          </div>

          <div className="text-[10px] text-slate-400 pt-4 font-mono relative z-10">
            Date of Conferral: {selectedCert.issueDate} • Verification Link: brooksoflife.edu/verify?cert={selectedCert.certificateNumber}
          </div>
        </div>
      )}
    </div>
  );
};
