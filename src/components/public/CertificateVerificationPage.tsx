import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BROOKS_LOGO_SRC } from '../../assets/logo';
import { 
  FileCheck, 
  Search, 
  CheckCircle2, 
  XCircle, 
  ShieldCheck, 
  Award, 
  Calendar, 
  User, 
  Building,
  QrCode,
  Printer
} from 'lucide-react';
import { DigitalCertificate } from '../../types';

export const CertificateVerificationPage: React.FC = () => {
  const { verifyCertificate, certificates } = useApp();
  const [certInput, setCertInput] = useState('BLSM-CERT-2026-0894');
  const [result, setResult] = useState<DigitalCertificate | null>(() => verifyCertificate('BLSM-CERT-2026-0894'));
  const [searched, setSearched] = useState(true);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!certInput.trim()) return;
    const found = verifyCertificate(certInput.trim());
    setResult(found);
    setSearched(true);
  };

  return (
    <div className="container mx-auto px-4 py-12 space-y-10">
      {/* Header Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 text-center max-w-3xl mx-auto">
        <div className="w-20 h-20 rounded-2xl overflow-hidden bg-black/80 border-2 border-amber-400/60 p-0.5 shadow-xl mx-auto mb-4">
          <img
            src={BROOKS_LOGO_SRC}
            alt="Brooks of Life Schools of Ministry -UK-"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover rounded-xl"
          />
        </div>
        <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
          Official Institutional Registry • UK
        </span>
        <h1 className="font-cinzel text-3xl sm:text-4xl font-extrabold text-white mt-1">
          Certificate Verification Portal
        </h1>
        <p className="text-sm text-slate-300 mt-2">
          Verify the authenticity of awards, certificates, and diplomas issued by Brooks of Life Schools of Ministry -UK- worldwide.
        </p>

        {/* Search Form */}
        <form onSubmit={handleVerify} className="mt-8 flex flex-col sm:flex-row gap-2 max-w-xl mx-auto">
          <div className="relative flex-1">
            <input
              type="text"
              required
              placeholder="Enter Certificate Number (e.g. BLSM-CERT-2026-0894)"
              value={certInput}
              onChange={e => setCertInput(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-400 text-xs sm:text-sm font-mono focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs uppercase tracking-wider transition cursor-pointer flex items-center justify-center space-x-2"
          >
            <Search className="w-4 h-4" />
            <span>Verify Authenticity</span>
          </button>
        </form>

        <div className="mt-4 text-[11px] text-slate-400">
          Try sample certificate: <span className="font-mono text-amber-300 cursor-pointer underline" onClick={() => { setCertInput('BLSM-CERT-2026-0894'); setResult(verifyCertificate('BLSM-CERT-2026-0894')); }}>BLSM-CERT-2026-0894</span>
        </div>
      </div>

      {/* Verification Result Display */}
      {searched && (
        <div className="max-w-2xl mx-auto">
          {result ? (
            <div className="bg-white rounded-3xl border-2 border-emerald-500/30 p-6 sm:p-10 shadow-xl space-y-6">
              {/* Header Status */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-cinzel text-lg font-bold text-slate-900">
                      Official Record Authenticated
                    </h3>
                    <p className="text-xs text-emerald-700 font-semibold">
                      Status: Active & Validly Issued
                    </p>
                  </div>
                </div>
                <div className="hidden sm:block text-right">
                  <div className="text-[10px] text-slate-400 uppercase">Verification Registry</div>
                  <div className="font-mono text-xs text-slate-700 font-bold">{result.certificateNumber}</div>
                </div>
              </div>

              {/* Verified Details Card */}
              <div className="p-6 bg-amber-50/50 rounded-2xl border border-amber-200/80 space-y-4">
                <div className="text-center space-y-2 pb-4 border-b border-amber-200/60 flex flex-col items-center">
                  <div className="w-14 h-14 rounded-xl overflow-hidden bg-black/80 border border-amber-400/60 p-0.5 shadow-md">
                    <img
                      src={BROOKS_LOGO_SRC}
                      alt="BLSM Crest"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <div className="text-xs text-amber-900 font-bold uppercase tracking-wider font-cinzel">
                    Brooks of Life Schools of Ministry -UK-
                  </div>
                  <div className="text-xs text-slate-500 italic font-scripture text-base">
                    This certifies that the following academic award is bona fide:
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <div className="text-slate-500 font-medium">Recipient / Student:</div>
                    <div className="text-base font-bold text-slate-900 font-cinzel mt-0.5">{result.studentName}</div>
                  </div>

                  <div>
                    <div className="text-slate-500 font-medium">Academic Program:</div>
                    <div className="text-sm font-bold text-amber-900 mt-0.5">{result.programTitle}</div>
                  </div>

                  <div>
                    <div className="text-slate-500 font-medium">Award Classification:</div>
                    <div className="font-semibold text-slate-800 mt-0.5">{result.awardLevel}</div>
                  </div>

                  <div>
                    <div className="text-slate-500 font-medium">Date of Conferral:</div>
                    <div className="font-semibold text-slate-800 mt-0.5">{result.issueDate}</div>
                  </div>

                  <div>
                    <div className="text-slate-500 font-medium">Academic Registrar:</div>
                    <div className="text-slate-800 mt-0.5">{result.registrarName}</div>
                  </div>

                  <div>
                    <div className="text-slate-500 font-medium">Chancellor:</div>
                    <div className="text-slate-800 mt-0.5">{result.presidentName}</div>
                  </div>
                </div>
              </div>

              {/* Footer Trust Guarantee */}
              <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4 pt-2">
                <div className="flex items-center space-x-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>Verified directly from BLSM Academic Records Database.</span>
                </div>
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-xl text-xs flex items-center space-x-1.5 cursor-pointer no-print"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Verification</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-rose-200 p-8 shadow-sm text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
                <XCircle className="w-8 h-8" />
              </div>
              <h3 className="font-cinzel text-lg font-bold text-slate-900">
                Certificate Not Found
              </h3>
              <p className="text-xs text-slate-600 max-w-md mx-auto">
                No official record was found matching the certificate number <strong>"{certInput}"</strong>. Please double-check for typographical errors or contact the Registrar Directorate.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
