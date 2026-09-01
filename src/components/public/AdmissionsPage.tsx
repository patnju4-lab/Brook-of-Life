import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  GraduationCap, 
  CheckCircle, 
  Send, 
  FileText, 
  Calculator, 
  ShieldCheck, 
  UserCheck, 
  Sparkles,
  ArrowRight,
  Info
} from 'lucide-react';
import { Program } from '../../types';

export const AdmissionsPage: React.FC = () => {
  const { programs, submitApplication, selectedProgramId, navigateTo, applications } = useApp();

  const [formData, setFormData] = useState({
    applicantName: '',
    email: '',
    phone: '',
    country: 'United States',
    city: '',
    dateOfBirth: '1995-01-01',
    gender: 'Male',
    programId: selectedProgramId || 'bach-theology',
    studyMode: 'Online Distance' as 'Online Distance' | 'Hybrid Intensive' | 'Cohort Modular',
    churchName: '',
    pastorName: '',
    ministryExperienceYears: 2,
    spiritualTestimony: '',
    previousEducation: ''
  });

  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState<'apply' | 'calculator' | 'requirements'>('apply');

  // Scholarship calculator state
  const [calcProgramId, setCalcProgramId] = useState(selectedProgramId || 'bach-theology');
  const [isMissionWorker, setIsMissionWorker] = useState(true);
  const [isDevelopingNation, setIsDevelopingNation] = useState(true);

  const selectedProg = programs.find(p => p.id === calcProgramId) || programs[0];
  const baseTuition = selectedProg ? selectedProg.tuitionPerSemester : 1100;
  let discount = 0;
  if (isMissionWorker) discount += 0.20;
  if (isDevelopingNation) discount += 0.25;
  discount = Math.min(0.50, discount); // cap at 50%
  const finalTuition = Math.round(baseTuition * (1 - discount));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.applicantName || !formData.email) return;

    submitApplication(formData);
    setSubmittedSuccess(true);
  };

  return (
    <div className="container mx-auto px-4 py-12 space-y-10">
      {/* Header Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 border border-slate-800">
        <div className="max-w-3xl space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
            Admissions Directorate • Global Intake
          </span>
          <h1 className="font-cinzel text-3xl sm:text-4xl font-extrabold text-white">
            Online Theological Admissions
          </h1>
          <p className="text-sm text-slate-300">
            Apply today to begin your journey in biblical scholarship, spiritual formation, and kingdom ministry. We welcome Christian leaders, workers, pastors, and believers worldwide.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 overflow-x-auto space-x-4 text-sm font-semibold">
        <button
          onClick={() => setActiveTab('apply')}
          className={`pb-3 px-2 border-b-2 transition whitespace-nowrap cursor-pointer ${activeTab === 'apply' ? 'border-amber-600 text-amber-700 font-bold' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
        >
          Online Application Form
        </button>
        <button
          onClick={() => setActiveTab('calculator')}
          className={`pb-3 px-2 border-b-2 transition whitespace-nowrap cursor-pointer ${activeTab === 'calculator' ? 'border-amber-600 text-amber-700 font-bold' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
        >
          Scholarship & Tuition Calculator
        </button>
        <button
          onClick={() => setActiveTab('requirements')}
          className={`pb-3 px-2 border-b-2 transition whitespace-nowrap cursor-pointer ${activeTab === 'requirements' ? 'border-amber-600 text-amber-700 font-bold' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
        >
          Admission Requirements & Steps
        </button>
      </div>

      {/* TAB 1: APPLICATION FORM */}
      {activeTab === 'apply' && (
        <div className="max-w-4xl mx-auto">
          {submittedSuccess ? (
            <div className="bg-white rounded-3xl border border-emerald-200 p-8 sm:p-12 shadow-sm text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h3 className="font-cinzel text-2xl font-bold text-slate-900">
                Application Submitted Successfully!
              </h3>
              <p className="text-sm text-slate-600 max-w-lg mx-auto">
                Thank you, <strong>{formData.applicantName}</strong>. Your application for the <strong>{programs.find(p => p.id === formData.programId)?.title}</strong> has been received by the Academic Registrar Office.
              </p>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-700 max-w-md mx-auto space-y-1">
                <div><strong>Applicant Email:</strong> {formData.email}</div>
                <div><strong>Submission Status:</strong> Under Admissions Review</div>
                <div><strong>Estimated Response Time:</strong> 24–48 Business Hours</div>
              </div>
              <div className="pt-4 flex justify-center space-x-3">
                <button
                  onClick={() => setSubmittedSuccess(false)}
                  className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs rounded-xl cursor-pointer"
                >
                  Submit Another Application
                </button>
                <button
                  onClick={() => navigateTo('home')}
                  className="px-5 py-2.5 bg-slate-900 text-amber-400 font-bold text-xs rounded-xl hover:bg-slate-800 cursor-pointer"
                >
                  Return to Home
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-8">
              {/* Step 1: Personal Details */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2 border-b border-slate-100 pb-2">
                  <span className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 font-bold text-xs flex items-center justify-center">1</span>
                  <h3 className="font-cinzel font-bold text-base text-slate-900">Personal & Contact Details</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-medium text-slate-700 mb-1">Full Legal Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Samuel David Olawale"
                      value={formData.applicantName}
                      onChange={e => setFormData({ ...formData, applicantName: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-slate-700 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="youremail@example.com"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-slate-700 mb-1">Phone Number (with Country Code) *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+1 (555) 000-0000 / +234..."
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-slate-700 mb-1">Country of Residence *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. United Kingdom, Nigeria, USA, Kenya..."
                      value={formData.country}
                      onChange={e => setFormData({ ...formData, country: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-slate-700 mb-1">Date of Birth</label>
                    <input
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={e => setFormData({ ...formData, dateOfBirth: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-slate-700 mb-1">Gender</label>
                    <select
                      value={formData.gender}
                      onChange={e => setFormData({ ...formData, gender: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500/20 bg-slate-50"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Step 2: Program & Study Mode */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2 border-b border-slate-100 pb-2">
                  <span className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 font-bold text-xs flex items-center justify-center">2</span>
                  <h3 className="font-cinzel font-bold text-base text-slate-900">Academic Program Selection</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-medium text-slate-700 mb-1">Desired Program *</label>
                    <select
                      value={formData.programId}
                      onChange={e => setFormData({ ...formData, programId: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500/20 bg-slate-50 font-semibold text-slate-800"
                    >
                      {programs.map(p => (
                        <option key={p.id} value={p.id}>[{p.level}] {p.title}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-medium text-slate-700 mb-1">Preferred Study Mode</label>
                    <select
                      value={formData.studyMode}
                      onChange={e => setFormData({ ...formData, studyMode: e.target.value as any })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500/20 bg-slate-50"
                    >
                      <option value="Online Distance">100% Online Distance (Self-Paced + Live Webinars)</option>
                      <option value="Hybrid Intensive">Hybrid Intensive (Online + Modular Residency)</option>
                      <option value="Cohort Modular">Cohort Modular (Weekly Interactive Classrooms)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Step 3: Ministry & Spiritual Testimony */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2 border-b border-slate-100 pb-2">
                  <span className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 font-bold text-xs flex items-center justify-center">3</span>
                  <h3 className="font-cinzel font-bold text-base text-slate-900">Ministry Background & Calling</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-medium text-slate-700 mb-1">Local Church / Ministry Affiliation *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Grace Fellowship Baptist Church"
                      value={formData.churchName}
                      onChange={e => setFormData({ ...formData, churchName: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-slate-700 mb-1">Senior Pastor / Referee Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rev. John Smith, Senior Pastor"
                      value={formData.pastorName}
                      onChange={e => setFormData({ ...formData, pastorName: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-slate-700 mb-1">Years of Active Christian Ministry</label>
                    <input
                      type="number"
                      min="0"
                      max="50"
                      value={formData.ministryExperienceYears}
                      onChange={e => setFormData({ ...formData, ministryExperienceYears: parseInt(e.target.value) || 0 })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-slate-700 mb-1">Highest Level of Prior Education</label>
                    <input
                      type="text"
                      placeholder="e.g. High School Diploma, Bachelor of Arts, etc."
                      value={formData.previousEducation}
                      onChange={e => setFormData({ ...formData, previousEducation: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="text-xs">
                  <label className="block font-medium text-slate-700 mb-1">Brief Testimony of Salvation & Calling to Ministry *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Briefly describe your conversion to Jesus Christ, your spiritual growth, and why you are seeking theological education at BLSM..."
                    value={formData.spiritualTestimony}
                    onChange={e => setFormData({ ...formData, spiritualTestimony: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-slate-500 flex items-center space-x-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>No application fee required for initial evaluation.</span>
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold rounded-xl text-xs uppercase tracking-wider shadow-lg transition cursor-pointer flex items-center justify-center space-x-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Formal Application</span>
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      {/* TAB 2: SCHOLARSHIP CALCULATOR */}
      {activeTab === 'calculator' && (
        <div className="max-w-2xl mx-auto bg-white rounded-3xl border border-slate-200 p-8 shadow-sm space-y-6">
          <div className="flex items-center space-x-3">
            <Calculator className="w-8 h-8 text-amber-600" />
            <div>
              <h3 className="font-cinzel text-xl font-bold text-slate-900">Scholarship & Fee Calculator</h3>
              <p className="text-xs text-slate-500">Calculate tuition waivers based on mission status and region</p>
            </div>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Select Program</label>
              <select
                value={calcProgramId}
                onChange={e => setCalcProgramId(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 font-semibold text-slate-800 bg-slate-50"
              >
                {programs.map(p => (
                  <option key={p.id} value={p.id}>[{p.level}] {p.title} - ${p.tuitionPerSemester}/sem</option>
                ))}
              </select>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-100">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isMissionWorker}
                  onChange={e => setIsMissionWorker(e.target.checked)}
                  className="rounded text-amber-600 focus:ring-amber-500"
                />
                <span className="text-slate-700 font-medium">Active Pastor / Full-time Missionary / Church Planter (20% Grant)</span>
              </label>

              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isDevelopingNation}
                  onChange={e => setIsDevelopingNation(e.target.checked)}
                  className="rounded text-amber-600 focus:ring-amber-500"
                />
                <span className="text-slate-700 font-medium">Resident of Developing Nation / Global South (25% Mission Subsidy)</span>
              </label>
            </div>

            {/* Results Box */}
            <div className="p-6 bg-slate-900 text-white rounded-2xl space-y-3 mt-4">
              <div className="flex justify-between text-slate-400">
                <span>Standard Semester Tuition:</span>
                <span className="line-through">${baseTuition} USD</span>
              </div>
              <div className="flex justify-between text-amber-400 font-medium">
                <span>Total Scholarship Grant ({(discount * 100).toFixed(0)}%):</span>
                <span>-${Math.round(baseTuition * discount)} USD</span>
              </div>
              <div className="border-t border-slate-800 pt-3 flex justify-between text-base font-bold">
                <span>Estimated Net Tuition:</span>
                <span className="text-emerald-400 text-lg">${finalTuition} USD <span className="text-xs font-normal text-slate-400">/ semester</span></span>
              </div>
            </div>

            <button
              onClick={() => setActiveTab('apply')}
              className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs uppercase tracking-wider transition cursor-pointer"
            >
              Apply With This Program
            </button>
          </div>
        </div>
      )}

      {/* TAB 3: REQUIREMENTS & STEPS */}
      {activeTab === 'requirements' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-sm">
            <h3 className="font-cinzel text-base font-bold text-slate-900 border-b border-slate-100 pb-2">
              4-Step Admission Journey
            </h3>
            <ol className="space-y-3 text-xs text-slate-600">
              <li className="flex items-start space-x-2">
                <span className="w-5 h-5 rounded-full bg-slate-900 text-amber-400 font-bold flex items-center justify-center shrink-0">1</span>
                <div>
                  <strong className="text-slate-800 block">Submit Online Application:</strong>
                  Complete the personal details, spiritual testimony, and academic program selection.
                </div>
              </li>
              <li className="flex items-start space-x-2">
                <span className="w-5 h-5 rounded-full bg-slate-900 text-amber-400 font-bold flex items-center justify-center shrink-0">2</span>
                <div>
                  <strong className="text-slate-800 block">Admissions Review & Recommendation:</strong>
                  The Registrar Directorate evaluates testimonies, pastoral endorsements, and scholarship eligibility.
                </div>
              </li>
              <li className="flex items-start space-x-2">
                <span className="w-5 h-5 rounded-full bg-slate-900 text-amber-400 font-bold flex items-center justify-center shrink-0">3</span>
                <div>
                  <strong className="text-slate-800 block">Official Admission Letter:</strong>
                  Successful candidates receive their formal acceptance letter and Student ID number.
                </div>
              </li>
              <li className="flex items-start space-x-2">
                <span className="w-5 h-5 rounded-full bg-slate-900 text-amber-400 font-bold flex items-center justify-center shrink-0">4</span>
                <div>
                  <strong className="text-slate-800 block">Enrollment & Portal Access:</strong>
                  Log in to the LMS classroom, download syllabus notes, and begin courses!
                </div>
              </li>
            </ol>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-sm">
            <h3 className="font-cinzel text-base font-bold text-slate-900 border-b border-slate-100 pb-2">
              General Admission Prerequisites
            </h3>
            <ul className="space-y-2 text-xs text-slate-600">
              <li className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Personal profession of faith in Jesus Christ as Lord and Savior.</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Active membership or service in a recognized local church or Christian ministry.</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Endorsement letter or contact info of your pastor or ministry supervisor.</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Commitment to uphold the BLSM Student Honor Code and Statement of Faith.</span>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
