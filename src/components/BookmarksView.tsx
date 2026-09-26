import React, { useState } from 'react';
import { CurrentAffairsItem, Question } from '../types';
import { 
  Bookmark, 
  BookOpen, 
  Trash2, 
  HelpCircle, 
  CheckCircle2, 
  Calendar, 
  Clock, 
  Search, 
  Layers, 
  ArrowRight,
  Sparkles,
  Award
} from 'lucide-react';
import { toggleCABookmark, toggleQuestionBookmark } from '../data/storage';

interface BookmarksViewProps {
  currentAffairs: CurrentAffairsItem[];
  questions: Question[];
  caBookmarkIds: string[];
  questionBookmarkIds: string[];
  onBookmarksUpdated: () => void;
  onOpenArticle: (item: CurrentAffairsItem) => void;
}

export const BookmarksView: React.FC<BookmarksViewProps> = ({
  currentAffairs,
  questions,
  caBookmarkIds,
  questionBookmarkIds,
  onBookmarksUpdated,
  onOpenArticle
}) => {
  const [deckTab, setDeckTab] = useState<'ca' | 'questions'>('ca');
  const [searchTerm, setSearchTerm] = useState('');
  const [revealedSolutions, setRevealedSolutions] = useState<Record<string, boolean>>({});

  const savedCAs = currentAffairs.filter(ca => caBookmarkIds.includes(ca.id));
  const savedQuestions不易 = questions.filter(q => questionBookmarkIds.includes(q.id));

  const handleRemoveCA = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    toggleCABookmark(id);
    onBookmarksUpdated();
  };

  const handleRemoveQuestion = (id: string) => {
    toggleQuestionBookmark(id);
    onBookmarksUpdated();
  };

  const toggleSolutionReveal = (id: string) => {
    setRevealedSolutions(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredCAs = savedCAs.filter(ca => 
    ca.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ca.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ca.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredQuestions = savedQuestions不易.filter(q =>
    q.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
    q.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
    q.examCategory.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div id="revision-deck-container" className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8 transition-colors duration-200">
      
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800 text-xs font-bold">
            <Bookmark className="w-3.5 h-3.5" />
            <span>High-Yield Personal Revision Deck</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-serif tracking-tight">
            Saved Articles & Practice Deck
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
            Consolidated collection of bookmarked daily current affairs briefs and challenging examination questions saved for quick pre-exam revision.
          </p>
        </div>

        <div className="flex items-center space-x-3 shrink-0">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-center">
            <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Saved Items</span>
            <span className="text-2xl font-black text-amber-800 dark:text-amber-400 font-mono">
              {savedCAs.length + savedQuestions不易.length}
            </span>
          </div>
        </div>
      </div>

      {/* Tab Switcher & Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        
        {/* Tabs */}
        <div className="flex bg-slate-100 dark:bg-slate-900 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs font-bold">
          <button
            onClick={() => setDeckTab('ca')}
            className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 ${
              deckTab === 'ca'
                ? 'bg-amber-500 text-slate-950 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Current Affairs Briefs ({savedCAs.length})</span>
          </button>

          <button
            onClick={() => setDeckTab('questions')}
            className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 ${
              deckTab === 'questions'
                ? 'bg-amber-500 text-slate-950 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>Question Bank ({savedQuestions不易.length})</span>
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            placeholder="Search saved deck..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-64 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 placeholder:text-slate-400 shadow-xs transition-colors"
          />
        </div>
      </div>

      {/* --- DECK TAB 1: Current Affairs --- */}
      {deckTab === 'ca' && (
        <div className="space-y-4">
          {filteredCAs.length === 0 ? (
            <div className="py-16 text-center text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 space-y-3 shadow-sm">
              <Bookmark className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto" />
              <h3 className="text-lg font-bold text-slate-900 dark:text-white font-serif">No Current Affairs Bookmarked Yet</h3>
              <p className="text-xs max-w-md mx-auto text-slate-500 dark:text-slate-400">
                Click the bookmark icon on any current affairs card to save it here for fast revision.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCAs.map((item) => (
                <div
                  key={item.id}
                  onClick={() => onOpenArticle(item)}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-amber-400 dark:hover:border-amber-500/60 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group cursor-pointer space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-lg text-[10px] font-extrabold bg-amber-50 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                        {item.category}
                      </span>
                      <button
                        onClick={(e) => handleRemoveCA(item.id, e)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                        title="Remove from bookmarks"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors leading-snug line-clamp-2">
                      {item.title}
                    </h3>

                    <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
                      {item.summary}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-amber-700 dark:text-amber-400 font-bold">
                    <span>Read Article & Key Notes</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* --- DECK TAB 2: Bookmarked Questions --- */}
      {deckTab === 'questions' && (
        <div className="space-y-4">
          {filteredQuestions.length === 0 ? (
            <div className="py-16 text-center text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 space-y-3 shadow-sm">
              <HelpCircle className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto" />
              <h3 className="text-lg font-bold text-slate-900 dark:text-white font-serif">No Questions Saved in Revision Deck</h3>
              <p className="text-xs max-w-md mx-auto text-slate-500 dark:text-slate-400">
                Bookmark tricky questions during mock tests or topic drills to review them here anytime.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredQuestions.map((q, idx) => {
                const isRevealed = revealedSolutions[q.id];

                return (
                  <div
                    key={q.id}
                    className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
                      <div className="flex items-center space-x-2">
                        <span className="px-2.5 py-0.5 rounded-lg bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 font-mono text-xs font-bold">
                          #{idx + 1}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-cyan-800 dark:text-cyan-300 text-xs font-semibold border border-slate-200 dark:border-slate-700">
                          {q.examCategory}
                        </span>
                        <span className="text-xs text-slate-500 dark:text-slate-400">{q.topic}</span>
                      </div>

                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => toggleSolutionReveal(q.id)}
                          className="px-3 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold rounded-lg transition-colors"
                        >
                          {isRevealed ? 'Hide Rationale' : 'Reveal Solution'}
                        </button>

                        <button
                          onClick={() => handleRemoveQuestion(q.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                          title="Remove from Deck"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {q.passage && (
                      <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300">
                        <p>{q.passage}</p>
                      </div>
                    )}

                    <p className="text-sm font-semibold text-slate-900 dark:text-white leading-relaxed">
                      {q.text}
                    </p>

                    {/* 4 Options */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {q.options.map((opt) => (
                        <div
                          key={opt.id}
                          className={`p-3 rounded-xl border flex items-center justify-between ${
                            isRevealed && opt.id === q.correctOptionId
                              ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-400 dark:border-emerald-600 text-emerald-900 dark:text-emerald-200 font-bold'
                              : 'bg-slate-50 dark:bg-slate-800/70 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200'
                          }`}
                        >
                          <div className="flex items-center space-x-2">
                            <span className="font-mono uppercase font-bold text-slate-500 dark:text-slate-400">({opt.id})</span>
                            <span>{opt.text}</span>
                          </div>
                          {isRevealed && opt.id === q.correctOptionId && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                          )}
                        </div>
                      ))}
                    </div>

                    {isRevealed && (
                      <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 text-xs text-slate-700 dark:text-slate-300 space-y-1">
                        <span className="font-bold text-amber-800 dark:text-amber-400 uppercase text-[10px]">
                          Solution & Conceptual Concept:
                        </span>
                        <p className="leading-relaxed">{q.explanation}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

    </div>
  );
};
