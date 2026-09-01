import React from 'react';
import { useApp } from '../../context/AppContext';
import { BROOKS_LOGO_SRC } from '../../assets/logo';
import { 
  BookOpen, 
  GraduationCap, 
  ShieldCheck, 
  Globe, 
  Users, 
  Award, 
  CheckCircle, 
  ArrowRight, 
  Calendar, 
  Church, 
  Compass, 
  HeartHandshake, 
  Sparkles,
  FileCheck,
  Library,
  Video
} from 'lucide-react';

interface HeroAndFeaturesProps {
  onOpenAuth: () => void;
}

export const HeroAndFeatures: React.FC<HeroAndFeaturesProps> = ({ onOpenAuth }) => {
  const { navigateTo, schools, programs, events, settings, currentUser } = useApp();

  const iconMap: Record<string, React.ReactNode> = {
    BookOpen: <BookOpen className="w-6 h-6" />,
    Compass: <Compass className="w-6 h-6" />,
    Church: <Church className="w-6 h-6" />,
    ShieldCheck: <ShieldCheck className="w-6 h-6" />,
    HeartHandshake: <HeartHandshake className="w-6 h-6" />,
    Globe: <Globe className="w-6 h-6" />,
    GraduationCap: <GraduationCap className="w-6 h-6" />,
    Music: <Sparkles className="w-6 h-6" />,
    Cross: <ShieldCheck className="w-6 h-6" />
  };

  return (
    <div className="space-y-16 pb-16">
      {/* Grand Academic Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white border-b border-slate-800">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:20px_20px]"></div>
        
        <div className="container mx-auto px-4 py-16 sm:py-24 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            {/* Official Heraldic Crest & Motto Banner */}
            <div className="flex flex-col items-center justify-center space-y-3">
              <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden bg-black/80 border-2 border-amber-400/60 p-1 shadow-2xl shadow-amber-600/30 hover:scale-105 transition-transform duration-300">
                <img
                  src={BROOKS_LOGO_SRC}
                  alt="Brooks of Life Schools of Ministry -UK- Official Emblem"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>

              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold tracking-wider uppercase">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Schools of Ministry -UK- • 2 Timothy 2:2</span>
              </div>
            </div>

            {/* Main Title */}
            <h1 className="font-cinzel text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              BROOKS OF LIFE <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 bg-clip-text text-transparent">
                SCHOOLS OF MINISTRY
              </span>
            </h1>

            {/* Motto */}
            <p className="font-scripture text-xl sm:text-2xl text-amber-200/90 italic font-medium">
              “Equipping • Empowering • Enriching”
            </p>

            {/* Sub-headline */}
            <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Study Scripture with exegetical rigor. Deepen your systematic theological understanding. Develop pastoral competence. Join pastors, missionaries, church planters, and Christian leaders across 42+ nations.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3.5 pt-4">
              <button
                onClick={() => navigateTo('admissions')}
                className="px-6 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold rounded-xl text-sm shadow-xl shadow-amber-900/30 transition-all transform active:scale-95 cursor-pointer flex items-center space-x-2"
              >
                <span>Apply for Admission</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => navigateTo('programs')}
                className="px-6 py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700 font-semibold rounded-xl text-sm transition-colors cursor-pointer flex items-center space-x-2"
              >
                <BookOpen className="w-4 h-4 text-amber-400" />
                <span>Explore 14+ Programs</span>
              </button>

              {!currentUser ? (
                <button
                  onClick={onOpenAuth}
                  className="px-5 py-3.5 bg-slate-900 hover:bg-slate-800 text-amber-300 border border-amber-500/40 font-semibold rounded-xl text-sm transition-colors cursor-pointer flex items-center space-x-2"
                >
                  <Users className="w-4 h-4 text-amber-400" />
                  <span>Student & Faculty Login</span>
                </button>
              ) : (
                <button
                  onClick={() => navigateTo('student-dashboard')}
                  className="px-5 py-3.5 bg-emerald-700 hover:bg-emerald-600 text-white font-semibold rounded-xl text-sm transition-colors cursor-pointer flex items-center space-x-2 shadow-lg"
                >
                  <GraduationCap className="w-4 h-4 text-emerald-200" />
                  <span>Go to My Portal</span>
                </button>
              )}
            </div>

            {/* Key Institutional Metrics */}
            <div className="pt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-slate-800/80 text-left">
              <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
                <div className="text-2xl sm:text-3xl font-cinzel font-bold text-amber-400">9</div>
                <div className="text-xs text-slate-400 mt-0.5">Academic Schools</div>
              </div>
              <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
                <div className="text-2xl sm:text-3xl font-cinzel font-bold text-amber-400">14+</div>
                <div className="text-xs text-slate-400 mt-0.5">Structured Programs</div>
              </div>
              <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
                <div className="text-2xl sm:text-3xl font-cinzel font-bold text-amber-400">100%</div>
                <div className="text-xs text-slate-400 mt-0.5">Online & Hybrid Access</div>
              </div>
              <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
                <div className="text-2xl sm:text-3xl font-cinzel font-bold text-amber-400">42+</div>
                <div className="text-xs text-slate-400 mt-0.5">Nations Represented</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9 Academic Schools Directory */}
      <section className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600">Theological Faculty & Schools</span>
          <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-slate-900">
            Structured Academic Schools
          </h2>
          <p className="text-sm text-slate-600">
            From Biblical Exegesis and Systematic Theology to Pastoral Counseling and Cross-Cultural Missiology, every school is anchored in the infallible Word of God.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {schools.map(school => (
            <div 
              key={school.id}
              className="bg-white rounded-2xl border border-slate-200/90 hover:border-amber-400/80 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                    {iconMap[school.icon] || <BookOpen className="w-6 h-6" />}
                  </div>
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                    {school.code}
                  </span>
                </div>

                <h3 className="font-cinzel text-lg font-bold text-slate-900 group-hover:text-amber-800 transition-colors">
                  {school.name}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {school.description}
                </p>

                <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500">
                  <strong className="text-slate-700">Dean:</strong> {school.deanName}
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-medium text-amber-700">
                  {school.coursesCount} Courses Available
                </span>
                <button
                  onClick={() => navigateTo('programs')}
                  className="text-xs font-semibold text-slate-800 hover:text-amber-600 flex items-center space-x-1 cursor-pointer"
                >
                  <span>View Programs</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Programs Section */}
      <section className="bg-slate-100 py-16 border-y border-slate-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-700">Curriculum & Awards</span>
              <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
                Featured Academic Programs
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                Certificates, Diplomas, Bachelor, Master, and Doctoral degrees.
              </p>
            </div>
            <button
              onClick={() => navigateTo('programs')}
              className="mt-4 md:mt-0 text-sm font-semibold text-amber-700 hover:text-amber-800 flex items-center space-x-1 cursor-pointer"
            >
              <span>Browse All 14+ Programs</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {programs.filter(p => p.featured).slice(0, 3).map(prog => (
              <div 
                key={prog.id}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 bg-amber-100 text-amber-800 text-xs font-bold rounded-md">
                      {prog.level}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">
                      {prog.duration}
                    </span>
                  </div>

                  <h3 className="font-cinzel text-lg font-bold text-slate-900 leading-snug">
                    {prog.title}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-3">
                    {prog.description}
                  </p>

                  <div className="space-y-1.5 pt-2">
                    <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">Key Objectives:</div>
                    {prog.objectives.slice(0, 2).map((obj, i) => (
                      <div key={i} className="flex items-start space-x-2 text-xs text-slate-600">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{obj}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase">Tuition</div>
                    <div className="text-sm font-bold text-slate-900">${prog.tuitionPerSemester} <span className="text-[11px] font-normal text-slate-500">/ sem</span></div>
                  </div>
                  <button
                    onClick={() => navigateTo('admissions')}
                    className="px-4 py-2 bg-slate-900 hover:bg-amber-500 hover:text-slate-950 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why BLSM: Institutional Pillars */}
      <section className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600">Theological Distinctives</span>
          <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-slate-900">
            Why Study at Brooks of Life
          </h2>
          <p className="text-sm text-slate-600">
            We unite academic scholarship with fiery Holy Spirit empowerment for real ministry impact.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-2xl border border-slate-200 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center font-bold">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="font-cinzel text-base font-bold text-slate-900">Biblical & Doctrinal Orthodoxy</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Uncompromising commitment to Sola Scriptura, historic orthodox creeds, inerrancy, and Christ-centered hermeneutics.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-slate-200 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-purple-100 text-purple-800 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-cinzel text-base font-bold text-slate-900">TEMS Examination Rigor</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Theological Examination Management System (TEMS) ensures proctored exams, genuine biblical interpretation, and verified integrity.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-slate-200 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              <Globe className="w-5 h-5" />
            </div>
            <h3 className="font-cinzel text-base font-bold text-slate-900">Global Digital Campus</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Study anywhere in the world on desktop, tablet, or mobile. Access lecture notes, Greek/Hebrew lexical tools, and recorded teachings.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-slate-200 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
              <Church className="w-5 h-5" />
            </div>
            <h3 className="font-cinzel text-base font-bold text-slate-900">Practical Ministry Practicum</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every course connects systematic theology to homiletics, church planting, counseling broken souls, and shepherding the local church.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-slate-200 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-rose-100 text-rose-800 flex items-center justify-center font-bold">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-cinzel text-base font-bold text-slate-900">Verified Transcripts & Diplomas</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Instantly verifiable digital certificates and transcripts with anti-fraud QR codes for denomination and ministry ordination boards.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-slate-200 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-cyan-100 text-cyan-800 flex items-center justify-center font-bold">
              <Library className="w-5 h-5" />
            </div>
            <h3 className="font-cinzel text-base font-bold text-slate-900">Digital Theological Library</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Direct access to hundreds of classical commentaries, Puritan treatises, sermon outlines, and mission research journals.
            </p>
          </div>
        </div>
      </section>

      {/* Upcoming Events / Convocation Banner */}
      <section className="container mx-auto px-4">
        <div className="bg-gradient-to-r from-slate-900 to-slate-950 rounded-2xl border border-slate-800 p-8 text-white">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded bg-amber-500/20 text-amber-300 text-xs font-semibold">
                <Calendar className="w-3.5 h-3.5" />
                <span>Next Academic Event</span>
              </div>
              <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-white">
                {events[0]?.title || 'Global Convocation & Academic Orientation'}
              </h3>
              <p className="text-xs text-slate-300 max-w-xl">
                {events[0]?.description || 'Join students and faculty across 42 nations for the official academic opening.'}
              </p>
              <div className="text-xs text-amber-400 font-mono pt-1">
                Date: {events[0]?.date} • Time: {events[0]?.time}
              </div>
            </div>

            <div className="flex items-center space-x-3 shrink-0">
              <button
                onClick={() => navigateTo('events')}
                className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs uppercase tracking-wider transition cursor-pointer"
              >
                View Full Calendar
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
