import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Users, 
  GraduationCap, 
  Mail, 
  BookOpen, 
  MapPin, 
  Award 
} from 'lucide-react';

export const FacultyDirectory: React.FC = () => {
  const { users, schools, courses } = useApp();

  const facultyMembers = users.filter(u => u.role === 'lecturer' || u.role === 'examination_officer' || u.role === 'super_admin' || u.role === 'registrar');

  return (
    <div className="container mx-auto px-4 py-12 space-y-10">
      {/* Header */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 border border-slate-800">
        <div className="max-w-3xl space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
            Academic Leadership & Scholars
          </span>
          <h1 className="font-cinzel text-3xl sm:text-4xl font-extrabold text-white">
            Seminary Faculty & Deans
          </h1>
          <p className="text-sm text-slate-300">
            Our professors and academic deans are seasoned theologians, published authors, and active pastors committed to biblical orthodoxy and mentoring the next generation of Christian leaders.
          </p>
        </div>
      </div>

      {/* Faculty Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {facultyMembers.map(faculty => {
          const taughtCourses = courses.filter(c => c.instructorName.toLowerCase().includes(faculty.name.toLowerCase()) || faculty.role === 'lecturer');

          return (
            <div 
              key={faculty.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <img
                    src={faculty.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
                    alt={faculty.name}
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-amber-500 shadow-md shrink-0"
                  />
                  <div>
                    <h3 className="font-cinzel text-base font-bold text-slate-900 leading-snug">
                      {faculty.name}
                    </h3>
                    <p className="text-xs text-amber-700 font-medium mt-0.5">
                      {faculty.ministryRole || 'Professor of Theology'}
                    </p>
                    <div className="flex items-center space-x-1 text-[11px] text-slate-400 mt-1">
                      <MapPin className="w-3 h-3" />
                      <span>{faculty.country || 'Global Campus'}</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {faculty.bio || 'Dedicated theological educator and researcher equipping believers for global ministry.'}
                </p>

                {faculty.churchAffiliation && (
                  <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-100">
                    <strong className="text-slate-700">Ecclesial Fellowship:</strong> {faculty.churchAffiliation}
                  </div>
                )}
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <div className="flex items-center space-x-1 text-slate-500">
                  <Mail className="w-3.5 h-3.5 text-amber-600" />
                  <span className="truncate max-w-[160px]">{faculty.email}</span>
                </div>
                <span className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded text-[10px] font-mono uppercase font-bold">
                  {faculty.role.replace('_', ' ')}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
