import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  User, 
  Video, 
  ExternalLink,
  ChevronRight,
  Filter
} from 'lucide-react';

export const EventsCalendarPage: React.FC = () => {
  const { events, navigateTo } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Academic', 'Spiritual', 'Virtual Classroom', 'Graduation', 'Faculty Seminar'];

  const filteredEvents = events.filter(e => {
    return selectedCategory === 'All' || e.category === selectedCategory;
  });

  return (
    <div className="container mx-auto px-4 py-12 space-y-10">
      {/* Header */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 border border-slate-800">
        <div className="max-w-3xl space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
            Institutional Timetable & Virtual Amphitheater
          </span>
          <h1 className="font-cinzel text-3xl sm:text-4xl font-extrabold text-white">
            Academic Calendar & Events Schedule
          </h1>
          <p className="text-sm text-slate-300">
            Stay updated with upcoming global seminary convocations, interactive theological symposiums, TEMS exam windows, and graduation ceremonies.
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-4">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${selectedCategory === cat ? 'bg-amber-600 text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Events List */}
      <div className="space-y-4">
        {filteredEvents.map(event => (
          <div 
            key={event.id}
            className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition flex flex-col md:flex-row md:items-center justify-between gap-6"
          >
            <div className="flex items-start space-x-4">
              {/* Date Box */}
              <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200/80 text-amber-800 flex flex-col items-center justify-center shrink-0">
                <span className="text-[10px] font-bold uppercase">{new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}</span>
                <span className="text-xl font-cinzel font-bold">{new Date(event.date).getDate()}</span>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-bold uppercase tracking-wider">
                    {event.category}
                  </span>
                  <span className="text-xs text-slate-400 font-medium flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{event.time}</span>
                  </span>
                </div>

                <h3 className="font-cinzel text-base font-bold text-slate-900">
                  {event.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed max-w-2xl">
                  {event.description}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
                  <div className="flex items-center space-x-1">
                    <User className="w-3.5 h-3.5 text-amber-600" />
                    <span><strong>Speaker:</strong> {event.speaker}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-3.5 h-3.5 text-amber-600" />
                    <span>{event.location}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action */}
            <div className="shrink-0 flex items-center space-x-3 pt-4 md:pt-0 border-t md:border-t-0 border-slate-100">
              {event.zoomLink && (
                <a
                  href={event.zoomLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl flex items-center space-x-1.5 shadow-sm transition"
                >
                  <Video className="w-3.5 h-3.5" />
                  <span>Join Virtual Classroom</span>
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
