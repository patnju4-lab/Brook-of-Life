import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Library, 
  Search, 
  Download, 
  BookOpen, 
  FileText, 
  ShieldCheck, 
  ExternalLink,
  Filter,
  Check
} from 'lucide-react';
import { LibraryResource } from '../../types';

export const DigitalLibraryPublicPage: React.FC = () => {
  const { libraryResources, currentUser } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [downloadSuccessId, setDownloadSuccessId] = useState<string | null>(null);

  const categories = [
    'All',
    'Systematic Theology',
    'Biblical Studies',
    'Pastoral Ministry',
    'Greek & Hebrew Tools',
    'Missions & Evangelism',
    'Church History'
  ];

  const filtered = libraryResources.filter(res => {
    const matchesCat = selectedCategory === 'All' || res.category === selectedCategory;
    const matchesSearch = res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          res.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          res.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleDownload = (id: string) => {
    setDownloadSuccessId(id);
    setTimeout(() => setDownloadSuccessId(null), 2500);
  };

  return (
    <div className="container mx-auto px-4 py-12 space-y-10">
      {/* Header */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 border border-slate-800">
        <div className="max-w-3xl space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
            BLSM Theological Repository
          </span>
          <h1 className="font-cinzel text-3xl sm:text-4xl font-extrabold text-white">
            Digital Theological Library
          </h1>
          <p className="text-sm text-slate-300">
            Access classic and contemporary theological masterworks, biblical lexicons, Calvin's Institutes, Puritans, and peer-reviewed journals.
          </p>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search by author, book title, theological subject..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
          />
        </div>

        <div className="flex flex-wrap gap-1.5 w-full md:w-auto">
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

      {/* Books Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(book => (
          <div 
            key={book.id}
            className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded bg-amber-100 text-amber-800 text-[11px] font-bold">
                  {book.category}
                </span>
                <span className="text-[11px] text-slate-400 font-mono">
                  {book.fileSize} • {book.downloadFormat}
                </span>
              </div>

              <h3 className="font-cinzel text-base font-bold text-slate-900 leading-snug">
                {book.title}
              </h3>

              <div className="text-xs text-amber-800 font-medium">
                <strong>Author:</strong> {book.author} ({book.publicationYear})
              </div>

              <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                {book.description}
              </p>

              <div className="pt-2 text-[11px] text-slate-500 flex items-center justify-between border-t border-slate-100">
                <span>{book.pagesCount} Pages</span>
                <span className="text-emerald-700 font-semibold">{book.accessLevel}</span>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">
                {book.downloadsCount} Downloads
              </span>
              <button
                onClick={() => handleDownload(book.id)}
                className="px-3.5 py-1.5 bg-slate-900 hover:bg-amber-500 hover:text-slate-950 text-white text-xs font-bold rounded-xl transition cursor-pointer flex items-center space-x-1.5"
              >
                {downloadSuccessId === book.id ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Access Granted!</span>
                  </>
                ) : (
                  <>
                    <Download className="w-3.5 h-3.5" />
                    <span>Download {book.downloadFormat}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
