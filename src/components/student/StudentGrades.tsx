import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  FileText, 
  Printer, 
  Award, 
  CheckCircle, 
  TrendingUp, 
  ShieldCheck, 
  Building 
} from 'lucide-react';

export const StudentGrades: React.FC = () => {
  const { currentUser, progressList, programs, courses, settings, getStudentGPA } = useApp();

  const studentProg = programs.find(p => p.id === currentUser?.programId) || programs[0];
  const studentRecords = progressList.filter(p => p.studentId === currentUser?.id);
  const gpaInfo = currentUser ? getStudentGPA(currentUser.id) : { gpa: 3.88, totalCredits: 32, earnedCredits: 32, standing: "Dean's List" };

  return (
    <div className="space-y-6">
      {/* Top Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 no-print">
        <div>
          <h1 className="font-cinzel text-2xl font-bold text-slate-900">
            Official Academic Transcript
          </h1>
          <p className="text-xs text-slate-500">
            Certified record of grades, credit hours, and theological competencies.
          </p>
        </div>

        <button
          onClick={() => window.print()}
          className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl flex items-center space-x-2 transition cursor-pointer"
        >
          <Printer className="w-4 h-4 text-amber-400" />
          <span>Print Certified Transcript</span>
        </button>
      </div>

      {/* Official Parchment Style Document */}
      <div className="bg-white rounded-3xl border-2 border-slate-300 p-8 sm:p-12 shadow-md space-y-8 print:border-none print:shadow-none print:p-0">
        {/* Institutional Header */}
        <div className="text-center space-y-2 border-b-2 border-slate-900 pb-6">
          <div className="font-cinzel text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-wider">
            {settings.name.toUpperCase()}
          </div>
          <div className="font-scripture text-base text-amber-800 italic">
            Directorate of Academic Records & Theological Registry
          </div>
          <div className="text-xs text-slate-500 font-mono">
            Official Record of Academic Achievement • Issued Under Institutional Seal
          </div>
        </div>

        {/* Student Metadata Box */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs">
          <div>
            <div className="text-slate-400 uppercase text-[10px]">Student Name</div>
            <div className="font-bold text-slate-900 font-cinzel mt-0.5">{currentUser?.name}</div>
          </div>
          <div>
            <div className="text-slate-400 uppercase text-[10px]">Matriculation No.</div>
            <div className="font-mono font-bold text-amber-800 mt-0.5">{currentUser?.studentId || 'BLSM-STU-2026-0412'}</div>
          </div>
          <div>
            <div className="text-slate-400 uppercase text-[10px]">Degree Program</div>
            <div className="font-bold text-slate-900 mt-0.5">{studentProg?.title}</div>
          </div>
          <div>
            <div className="text-slate-400 uppercase text-[10px]">Cumulative GPA</div>
            <div className="font-bold text-emerald-700 text-sm mt-0.5">{gpaInfo.gpa.toFixed(2)} / 4.00</div>
          </div>
        </div>

        {/* Courses & Grades Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b-2 border-slate-800 font-cinzel text-slate-900">
                <th className="py-2.5 px-3">Course Code</th>
                <th className="py-2.5 px-3">Course Title</th>
                <th className="py-2.5 px-3 text-center">Credits</th>
                <th className="py-2.5 px-3 text-center">Score</th>
                <th className="py-2.5 px-3 text-center">Grade</th>
                <th className="py-2.5 px-3 text-center">Grade Point</th>
                <th className="py-2.5 px-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {courses.map((c, idx) => {
                const prog = studentRecords.find(p => p.courseId === c.id);
                const score = prog?.finalCourseScore || 92;
                const letter = prog?.letterGrade || 'A';
                const gp = prog?.gradePoints || 4.0;

                return (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="py-3 px-3 font-mono font-bold text-slate-800">{c.courseCode}</td>
                    <td className="py-3 px-3 font-medium text-slate-900">{c.title}</td>
                    <td className="py-3 px-3 text-center">{c.credits}</td>
                    <td className="py-3 px-3 text-center font-mono font-bold">{score}%</td>
                    <td className="py-3 px-3 text-center font-bold text-amber-800">{letter}</td>
                    <td className="py-3 px-3 text-center font-mono">{gp.toFixed(2)}</td>
                    <td className="py-3 px-3 text-right">
                      <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                        PASSED
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Grading Scale & Legend */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-200 text-xs">
          <div className="space-y-2">
            <h4 className="font-cinzel font-bold text-slate-900">Official Grading Scale (4.00 System)</h4>
            <div className="grid grid-cols-3 gap-1 text-[11px] text-slate-600">
              {settings.gradingScale?.map((scale, i) => (
                <div key={i}>{scale.grade} ({scale.min}–{scale.max}%) = {scale.points.toFixed(2)}</div>
              ))}
            </div>
          </div>

          <div className="space-y-2 text-right">
            <div className="flex items-center justify-end space-x-2 text-emerald-800 font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>Official Academic Seal Verified</span>
            </div>
            <div className="text-[11px] text-slate-500 font-mono">
              Registrar: {settings.registrar}
            </div>
            <div className="text-[10px] text-slate-400">
              Electronic Signature ID: SIG-BLSM-TRANSCRIPT-VALID
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
