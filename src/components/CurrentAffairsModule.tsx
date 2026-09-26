import React, { useState } from 'react';
import { CurrentAffairsItem, CurrentAffairsCategory } from '../types';
import { 
  BookOpen, 
  Bookmark, 
  Search, 
  Calendar, 
  Clock, 
  Tag, 
  ExternalLink, 
  CheckCircle2, 
  X, 
  Sparkles,
  HelpCircle,
  Share2,
  Filter,
  Layers,
  ArrowRight
} from 'lucide-react';
import { toggleCABookmark } from '../data/storage';

interface CurrentAffairsModuleProps {
  currentAffairs: CurrentAffairsItem[];
  bookmarks: string[];
  onBookmarkChange: () => void;
  onLaunchQuickQuiz?: (caItem: CurrentAffairsItem) => void;
}

export const CurrentAffairsModule: React.FC<CurrentAffairsModuleProps> = ({
  currentAffairs,
  bookmarks,
  onBookmarkChange,
  onLaunchQuickQuiz
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedMonth, setSelectedMonth] = useState<string>('All');
  const [activeArticle, setActiveArticle] = useState<CurrentAffairsItem | null>(null);

  // Selected option state for the embedded practice question inside article modal
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);

  const categories: (CurrentAffairsCategory | 'All')[] = [
    'All',
    'National',
    'Economy & Banking',
    'Science & Technology',
    'Government Schemes',
    'Environment & Ecology',
    'Sports',
    'Awards & Honours',
    'International'
  ];

  const filteredArticles = currentAffairs.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesMonth = selectedMonth === 'All' || item.date.startsWith(selectedMonth);

    return matchesCategory && matchesSearch && matchesMonth;
  });

  const handleOpenArticle = (item: CurrentAffairsItem) => {
    setActiveArticle(item);
    setSelectedOption(null);
    setShowAnswer(false);
  };

  const handleToggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    toggleCABookmark(id);
    onBookmarkChange();
  };

  return (
    <div id="current-affairs-module" className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8 transition-colors duration-200">
      
      {/* Header Banner */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 dark:bg-cyan-950/60 text-cyan-800 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
            <span>Daily & Monthly Current Affairs Digest</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-serif tracking-tight">
            Comprehensive Current Affairs for Competitive Exams
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
            Curated daily updates for UPSC Civil Services, SSC CGL, Banking (IBPS/SBI), and Railway exams with key takeaways, syllabus mapping, and attached practice MCQs.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 relative z-10">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center">
            <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Articles Published</span>
            <span className="text-2xl font-black text-amber-800 dark:text-amber-400 font-mono">{currentAffairs.length}</span>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center">
            <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Saved in Deck</span>
            <span className="text-2xl font-black text-cyan-800 dark:text-cyan-400 font-mono">{bookmarks.length}</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Search current affairs, schemes, space missions, or exam tags (e.g. UPSC, RBI, ISRO)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-2xl pl-10 pr-4 py-3 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 placeholder:text-slate-400 dark:placeholder:text-slate-500"
            />
          </div>

          {/* Month Filter */}
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-slate-500 dark:text-slate-400 shrink-0" />
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold rounded-2xl px-4 py-3 focus:ring-2 focus:ring-amber-500"
            >
              <option value="All">All Months (2026 Archive)</option>
              <option value="2026-08">August 2026</option>
              <option value="2026-07">July 2026</option>
              <option value="2026-06">June 2026</option>
            </select>
          </div>
        </div>

        {/* Category Pill Filters */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-thin">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-amber-500 text-slate-950 shadow-xs'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArticles.map((item) => {
          const isSaved = bookmarks.includes(item.id);

          return (
            <div
              key={item.id}
              onClick={() => handleOpenArticle(item)}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-amber-400 dark:hover:border-amber-500 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group cursor-pointer relative"
            >
              <div className="space-y-4">
                {/* Card Top Badges */}
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-lg text-[11px] font-extrabold bg-slate-100 dark:bg-slate-800 text-amber-800 dark:text-amber-300 border border-slate-200 dark:border-slate-700">
                    {item.category}
                  </span>

                  <div className="flex items-center space-x-2">
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {item.readTimeMinutes} min
                    </span>
                    <button
                      onClick={(e) => handleToggleBookmark(item.id, e)}
                      className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                        isSaved 
                          ? 'text-amber-700 dark:text-amber-400 bg-amber-100 dark:bg-amber-950/60' 
                          : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                      title={isSaved ? 'Remove Bookmark' : 'Save to Revision Deck'}
                    >
                      <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-amber-600 dark:fill-amber-400 text-amber-600 dark:text-amber-400' : ''}`} />
                    </button>
                  </div>
                </div>

                {/* Title & Date */}
                <div className="space-y-1.5">
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400">
                    <Calendar className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                    <span>{item.date}</span>
                    <span>•</span>
                    <span className="truncate">{item.source.split('/')[0]}</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors leading-snug line-clamp-2">
                    {item.title}
                  </h3>
                </div>

                {/* Summary */}
                <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
                  {item.summary}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {item.tags.slice(0, 3).map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[10px] font-medium border border-slate-200 dark:border-slate-700"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Action */}
              <div className="pt-5 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                <span className="text-amber-700 dark:text-amber-400 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Read Analysis & Takeaways <ArrowRight className="w-3.5 h-3.5" />
                </span>

                {item.practiceQuestion && (
                  <span className="px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-[10px] font-bold flex items-center gap-1">
                    <HelpCircle className="w-3 h-3 text-emerald-600 dark:text-emerald-400" /> MCQ Included
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {filteredArticles.length === 0 && (
        <div className="py-16 text-center text-slate-600 dark:text-slate-400 space-y-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8">
          <BookOpen className="w-12 h-12 text-slate-400 mx-auto" />
          <h3 className="text-lg font-bold text-slate-900 dark:text-white font-serif">No Current Affairs Match Your Filters</h3>
          <p className="text-xs max-w-md mx-auto text-slate-500 dark:text-slate-400">
            Try adjusting your search keywords or switching categories to explore other current affairs digests.
          </p>
        </div>
      )}

      {/* Expanded Article Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-xl flex flex-col text-slate-900 dark:text-slate-100">
            
            {/* Modal Header */}
            <div className="p-6 bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between sticky top-0 z-10 backdrop-blur-md">
              <div className="flex items-center space-x-2">
                <span className="px-2.5 py-1 rounded-lg text-xs font-extrabold bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
                  {activeArticle.category}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" /> {activeArticle.date}
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={(e) => handleToggleBookmark(activeArticle.id, e)}
                  className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                    bookmarks.includes(activeArticle.id)
                      ? 'bg-amber-100 dark:bg-amber-950/60 border-amber-300 dark:border-amber-800 text-amber-800 dark:text-amber-300'
                      : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                  title="Bookmark Article"
                >
                  <Bookmark className={`w-4 h-4 ${bookmarks.includes(activeArticle.id) ? 'fill-amber-600 dark:fill-amber-400 text-amber-600 dark:text-amber-400' : ''}`} />
                </button>
                <button
                  onClick={() => setActiveArticle(null)}
                  className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 sm:p-8 space-y-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-serif leading-tight">
                  {activeArticle.title}
                </h2>
                <div className="flex flex-wrap items-center gap-2 mt-3 text-xs text-slate-500 dark:text-slate-400">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">Source:</span>
                  <span>{activeArticle.source}</span>
                  <span>•</span>
                  <span>{activeArticle.readTimeMinutes} min read</span>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {activeArticle.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-cyan-800 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800 text-xs font-semibold"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Summary Callout */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border-l-4 border-amber-500 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                {activeArticle.summary}
              </div>

              {/* Full Article Body */}
              <div className="space-y-4 text-sm text-slate-700 dark:text-slate-200 leading-relaxed whitespace-pre-line">
                {activeArticle.fullArticle}
              </div>

              {/* Key Takeaways for Aspirants */}
              {activeArticle.keyTakeaways && activeArticle.keyTakeaways.length > 0 && (
                <div className="p-5 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 space-y-3">
                  <h4 className="text-xs font-black text-amber-900 dark:text-amber-300 uppercase tracking-wider flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-700 dark:text-amber-400" /> High-Yield Key Takeaways for Competitive Exams
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                    {activeArticle.keyTakeaways.map((takeaway, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                        <span>{takeaway}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Interactive Practice Question */}
              {activeArticle.practiceQuestion && (
                <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-3">
                    <span className="text-xs font-bold text-amber-900 dark:text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                      <HelpCircle className="w-4 h-4 text-amber-700 dark:text-amber-400" /> Practice MCQ on this Current Affairs Topic
                    </span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400">Exam Diagnostic Check</span>
                  </div>

                  <p className="text-sm font-medium text-slate-900 dark:text-white">
                    <span className="text-amber-800 dark:text-amber-400 font-bold mr-1.5">Q.</span>
                    {activeArticle.practiceQuestion.questionText}
                  </p>

                  {/* Options */}
                  <div className="space-y-2">
                    {activeArticle.practiceQuestion.options.map(opt => {
                      const isSelected = selectedOption === opt.id;
                      const isCorrect = opt.id === activeArticle.practiceQuestion?.correctOptionId;

                      let btnStyle = 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-750';
                      if (showAnswer) {
                        if (isCorrect) {
                          btnStyle = 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-400 dark:border-emerald-700 text-emerald-900 dark:text-emerald-200 font-bold';
                        } else if (isSelected) {
                          btnStyle = 'bg-rose-50 dark:bg-rose-950/60 border-rose-300 dark:border-rose-800 text-rose-900 dark:text-rose-200';
                        }
                      } else if (isSelected) {
                        btnStyle = 'bg-amber-50 dark:bg-amber-950/40 border-amber-400 dark:border-amber-600 text-amber-950 dark:text-amber-200 font-semibold';
                      }

                      return (
                        <button
                          key={opt.id}
                          onClick={() => {
                            setSelectedOption(opt.id);
                            setShowAnswer(true);
                          }}
                          className={`w-full p-3 rounded-xl border text-left text-xs flex items-center justify-between transition-all cursor-pointer ${btnStyle}`}
                        >
                          <div className="flex items-center space-x-2">
                            <span className="font-mono uppercase font-bold text-slate-500 dark:text-slate-400">({opt.id})</span>
                            <span>{opt.text}</span>
                          </div>
                          {showAnswer && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>

                  {/* Solution Rationale Box */}
                  {showAnswer && (
                    <div className="p-4 rounded-xl bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 text-xs text-slate-700 dark:text-slate-300 space-y-1 mt-2">
                      <span className="font-bold text-amber-900 dark:text-amber-300">Solution Rationale:</span>
                      <p className="leading-relaxed">{activeArticle.practiceQuestion.explanation}</p>
                    </div>
                  )}
                </div>
              )}

            </div>

            {/* Modal Bottom Actions */}
            <div className="p-4 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-500 dark:text-slate-400">Competitive Exam and Current Affairs Mock Test Portal</span>
              <button
                onClick={() => setActiveArticle(null)}
                className="px-5 py-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 font-bold rounded-xl transition-colors cursor-pointer"
              >
                Close Article
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );

};
