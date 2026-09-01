import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  GraduationCap, 
  BookOpen, 
  CheckCircle, 
  Clock, 
  Award, 
  Search, 
  Filter, 
  ArrowRight,
  Sparkles,
  ChevronDown
} from 'lucide-react';
import { ProgramLevel } from '../../types';

export const ProgramsCatalog: React.FC = () => {
  const { programs, schools, courses, navigateTo } = useApp();

  const [selectedLevel, setSelectedLevel] = useState<string>('All');
  const [selectedSchool, setSelectedSchool] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedProgramId, setExpandedProgramId] = useState<string | null>(null);

  const levels: (ProgramLevel | 'All')[] = ['All', 'Certificate', 'Diploma', 'Bachelor', 'Master', 'Doctoral'];

  const filteredPrograms = programs.filter(prog => {
    const matchesLevel = selectedLevel === 'All' || prog.level === selectedLevel;
    const matchesSchool = selectedSchool === 'All' || prog.schoolId === selectedSchool;
    const matchesSearch = prog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          prog.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          prog.code.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesLevel && matchesSchool && matchesSearch;
  });

  return (
    <div className="container mx-auto px-4 py-12 space-y-10">
      {/* Header Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 border border-slate-800">
        <div className="max-w-3xl space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
            Comprehensive Academic Catalog
          </span>
          <h1 className="font-cinzel text-3xl sm:text-4xl font-extrabold text-white">
            Schools & Academic Programs
          </h1>
          <p className="text-sm text-slate-300">
            Explore 14+ structured theological programs ranging from 6-month Certificates to Doctor of Ministry degrees. Every program is grounded in Sacred Scripture and designed for practical Kingdom deployment.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
          {/* Search Box */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search programs by keyword, title, or code..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
            />
          </div>

          {/* School Selector */}
          <div className="w-full md:w-auto flex items-center space-x-2">
            <span className="text-xs font-semibold text-slate-600 whitespace-nowrap">Filter by School:</span>
            <select
              value={selectedSchool}
              onChange={e => setSelectedSchool(e.target.value)}
              className="px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 bg-slate-50 font-medium"
            >
              <option value="All">All 9 Academic Schools</option>
              {schools.map(s => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Level Tabs */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100">
          <span className="text-xs font-semibold text-slate-500 py-1.5 mr-2">Award Level:</span>
          {levels.map(lvl => (
            <button
              key={lvl}
              onClick={() => setSelectedLevel(lvl)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${selectedLevel === lvl ? 'bg-amber-600 text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
            >
              {lvl}
            </button>
          ))}
        </div>
      </div>

      {/* Program Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredPrograms.length > 0 ? (
          filteredPrograms.map(program => {
            const school = schools.find(s => s.id === program.schoolId);
            const isExpanded = expandedProgramId === program.id;
            const programCourses = courses.filter(c => c.programId === program.id);

            return (
              <div 
                key={program.id}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Top Badges */}
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 bg-amber-100 text-amber-800 font-bold text-xs rounded-md">
                      {program.level}
                    </span>
                    <span className="font-mono text-xs text-slate-400 font-bold">
                      {program.code}
                    </span>
                  </div>

                  {/* Program Title & School */}
                  <div>
                    <h3 className="font-cinzel text-lg font-bold text-slate-900 leading-snug">
                      {program.title}
                    </h3>
                    <p className="text-xs text-amber-700 font-medium mt-1">
                      {school?.name || 'Academic School'}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {program.description}
                  </p>

                  {/* Key Stats */}
                  <div className="grid grid-cols-3 gap-2 p-3 bg-slate-50 rounded-xl text-center text-xs">
                    <div>
                      <div className="text-[10px] text-slate-400 uppercase">Duration</div>
                      <div className="font-bold text-slate-800">{program.duration.split('(')[0]}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400 uppercase">Credits</div>
                      <div className="font-bold text-slate-800">{program.totalCredits} Credits</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400 uppercase">Tuition</div>
                      <div className="font-bold text-emerald-700">${program.tuitionPerSemester}/sem</div>
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {isExpanded && (
                    <div className="pt-4 border-t border-slate-100 space-y-3 text-xs">
                      <div>
                        <strong className="text-slate-800 block mb-1">Learning Outcomes:</strong>
                        <ul className="space-y-1">
                          {program.objectives.map((obj, i) => (
                            <li key={i} className="flex items-start space-x-1.5 text-slate-600">
                              <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                              <span>{obj}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <strong className="text-slate-800 block mb-1">Ministry & Career Outcomes:</strong>
                        <div className="flex flex-wrap gap-1.5">
                          {program.careerOutcomes.map((career, i) => (
                            <span key={i} className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded text-[11px]">
                              {career}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <strong className="text-slate-800 block mb-1">Admission Requirements:</strong>
                        <ul className="space-y-1">
                          {program.requirements.map((req, i) => (
                            <li key={i} className="text-slate-600 list-disc list-inside">
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Actions */}
                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => setExpandedProgramId(isExpanded ? null : program.id)}
                    className="text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer flex items-center space-x-1"
                  >
                    <span>{isExpanded ? 'Show Less' : 'Program Details & Syllabus'}</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                  </button>

                  <button
                    onClick={() => navigateTo('admissions', undefined, undefined, program.id)}
                    className="px-4 py-2 bg-slate-900 hover:bg-amber-500 hover:text-slate-950 text-white font-bold rounded-xl text-xs transition cursor-pointer flex items-center space-x-1.5"
                  >
                    <span>Apply Now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-2 py-12 text-center text-slate-500 space-y-2">
            <BookOpen className="w-10 h-10 mx-auto text-slate-400" />
            <div className="text-sm font-semibold">No programs matched your filters</div>
            <p className="text-xs">Try clearing the search or switching the academic school.</p>
          </div>
        )}
      </div>
    </div>
  );
};
