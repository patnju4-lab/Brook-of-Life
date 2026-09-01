import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  FileText, 
  Search, 
  Download, 
  BookOpen, 
  Copy, 
  Check, 
  Share2, 
  ChevronRight 
} from 'lucide-react';
import { MinistryResource } from '../../types';

export const MinistryResourceCenterPage: React.FC = () => {
  const { ministryResources } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeResource, setActiveResource] = useState<MinistryResource | null>(ministryResources[0] || null);
  const [copied, setCopied] = useState(false);

  const categories = [
    'All',
    'Sermon Outlines',
    'Discipleship Curriculum',
    'Bible Study Guides',
    'Church Planting Manuals',
    'Leadership Handbooks',
    'Prayer Guides'
  ];

  const filteredResources = ministryResources.filter(res => {
    const matchesCat = selectedCategory === 'All' || res.category === selectedCategory;
    const matchesSearch = res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          res.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          res.scriptureTheme.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleCopyText = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="container mx-auto px-4 py-12 space-y-10">
      {/* Header */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 border border-slate-800">
        <div className="max-w-3xl space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
            Field Toolkit for Pastors & Evangelists
          </span>
          <h1 className="font-cinzel text-3xl sm:text-4xl font-extrabold text-white">
            Ministry Resource Center
          </h1>
          <p className="text-sm text-slate-300">
            Free downloadable sermon manuscripts, 12-week discipleship blueprints, biblical study outlines, and church governance templates crafted by BLSM faculty.
          </p>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search sermon outlines, topics, scriptures..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
          />
        </div>

        <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${selectedCategory === cat ? 'bg-amber-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 2-Column Reader View */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Resource List */}
        <div className="space-y-3">
          <h3 className="font-cinzel text-sm font-bold text-slate-800 uppercase tracking-wider">
            Available Toolkits ({filteredResources.length})
          </h3>
          {filteredResources.map(item => (
            <div
              key={item.id}
              onClick={() => setActiveResource(item)}
              className={`p-4 rounded-2xl border transition cursor-pointer ${activeResource?.id === item.id ? 'bg-amber-50/80 border-amber-400 shadow-sm' : 'bg-white border-slate-200 hover:border-slate-300'}`}
            >
              <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                <span className="font-bold text-amber-800 bg-amber-100/80 px-2 py-0.5 rounded">{item.category}</span>
                <span>{item.dateAdded}</span>
              </div>
              <h4 className="font-cinzel text-sm font-bold text-slate-900 leading-snug">
                {item.title}
              </h4>
              <p className="text-xs text-slate-600 line-clamp-2 mt-1">
                {item.summary}
              </p>
              <div className="text-[11px] text-slate-500 font-medium mt-2">
                <strong>Scripture:</strong> {item.scriptureTheme}
              </div>
            </div>
          ))}
        </div>

        {/* Right: Full Content Viewer */}
        <div className="lg:col-span-2">
          {activeResource ? (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-4 gap-4">
                <div>
                  <span className="px-2.5 py-1 bg-amber-100 text-amber-800 font-bold text-xs rounded-md">
                    {activeResource.category}
                  </span>
                  <h2 className="font-cinzel text-xl font-bold text-slate-900 mt-2">
                    {activeResource.title}
                  </h2>
                  <div className="text-xs text-slate-500 mt-1">
                    <strong>Author:</strong> {activeResource.author} • <strong>Theme:</strong> {activeResource.scriptureTheme}
                  </div>
                </div>

                <div className="flex items-center space-x-2 shrink-0">
                  <button
                    onClick={() => handleCopyText(activeResource.contentBody)}
                    className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-xl flex items-center space-x-1.5 transition cursor-pointer"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied Text' : 'Copy Outline'}</span>
                  </button>

                  <button
                    onClick={() => window.print()}
                    className="px-3.5 py-2 bg-slate-900 hover:bg-amber-500 hover:text-slate-950 text-white text-xs font-semibold rounded-xl flex items-center space-x-1.5 transition cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Print / Save</span>
                  </button>
                </div>
              </div>

              {/* Body */}
              <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-700 leading-relaxed font-sans whitespace-pre-line bg-slate-50 p-6 rounded-2xl border border-slate-100">
                {activeResource.contentBody}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center text-slate-500">
              Select a resource to view full manuscript.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
