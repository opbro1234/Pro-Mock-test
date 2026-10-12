import React, { useState } from 'react';
import { UserProfile } from '../types';
import { 
  GraduationCap, 
  BookOpen, 
  Target, 
  Layers, 
  TrendingUp, 
  Bookmark, 
  User, 
  ShieldCheck, 
  Menu, 
  X, 
  Flame,
  Award,
  Sparkles,
  Clock,
  Home,
  LogOut,
  Copy,
  Check,
  Key
} from 'lucide-react';
import { Avatar } from './Avatar';
import { ThemeToggle } from '../context/ThemeContext';

interface NavbarProps {
  activeTab: 'home' | 'ca' | 'mock' | 'practice' | 'analytics' | 'bookmarks' | 'profile' | 'admin';
  onSelectTab: (tab: 'home' | 'ca' | 'mock' | 'practice' | 'analytics' | 'bookmarks' | 'profile' | 'admin') => void;
  user: UserProfile;
  onOpenAuthModal: () => void;
  caBookmarksCount: number;
  onNavigateToLanding?: () => void;
  onLogout?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onSelectTab,
  user,
  onOpenAuthModal,
  caBookmarksCount,
  onNavigateToLanding,
  onLogout
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copiedSession, setCopiedSession] = useState(false);

  const handleCopySessionId = (e: React.MouseEvent) => {
    e.stopPropagation();
    const sid = user.sessionId || 'SES-2026-NMF-8924A';
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(sid);
      setCopiedSession(true);
      setTimeout(() => setCopiedSession(false), 2000);
    }
  };

  const navItems = [
    { id: 'home', label: 'Home', icon: GraduationCap },
    { id: 'ca', label: 'Current Affairs', icon: BookOpen },
    { id: 'mock', label: 'Mock Tests', icon: Target },
    { id: 'practice', label: 'Topic Practice', icon: Layers },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'bookmarks', label: 'Revision Deck', icon: Bookmark, badge: caBookmarksCount > 0 ? caBookmarksCount : null },
  ];

  const handleNavClick = (id: any) => {
    onSelectTab(id);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-xs transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo & Portal Identity */}
            <div 
              onClick={() => handleNavClick('home')}
              className="flex items-center space-x-2.5 sm:space-x-3 cursor-pointer group shrink-0"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center text-slate-950 shadow-sm shadow-amber-500/20 group-hover:scale-105 transition-transform">
                <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="max-w-[190px] sm:max-w-none">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-xs sm:text-base text-slate-900 dark:text-white tracking-tight font-serif truncate">
                    Current Affairs & Exam Portal
                  </span>
                  <span className="hidden md:inline-block px-1.5 py-0.2 bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 border border-amber-300 dark:border-amber-800/80 rounded text-[9px] font-bold">
                    2026-27
                  </span>
                </div>
                <p className="text-[9px] sm:text-[10px] text-slate-500 dark:text-slate-400 font-medium truncate max-w-[180px] sm:max-w-xs">
                  Nirmala Memorial Foundation College (Autonomous)
                </p>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 relative cursor-pointer ${
                      isActive
                        ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-300 border border-amber-300 dark:border-amber-700/60 shadow-xs'
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/80 font-medium'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-600 dark:text-amber-400' : 'text-slate-500 dark:text-slate-400'}`} />
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="ml-1 px-1.5 py-0.2 bg-amber-500 text-slate-950 text-[10px] font-black rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Right Action: Session ID Chip, Theme Toggle & Persona Controls */}
            <div className="hidden sm:flex items-center space-x-2">
              {/* Active Session ID Chip */}
              <button
                onClick={handleCopySessionId}
                className="hidden sm:inline-flex items-center space-x-1.5 px-2.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 text-[11px] font-mono text-slate-600 dark:text-slate-300 hover:border-amber-400 dark:hover:border-amber-600 hover:bg-amber-50/50 dark:hover:bg-amber-950/30 transition-all cursor-pointer"
                title="Candidate Portal Session ID (Click to Copy)"
              >
                <Key className="w-3 h-3 text-amber-600 dark:text-amber-400 shrink-0" />
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-sans font-semibold uppercase tracking-wider hidden md:inline">Session:</span>
                <span className="font-bold text-amber-800 dark:text-amber-400 truncate max-w-[120px]">{user.sessionId || 'SES-2026-NMF-8924A'}</span>
                {copiedSession ? (
                  <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5 text-slate-400" />
                )}
              </button>

              {/* Global Theme Toggle */}
              <ThemeToggle />

              {/* Streak Counter */}
              <div className="px-2.5 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 flex items-center space-x-1 text-xs text-amber-800 dark:text-amber-300 font-bold" title="Study Streak">
                <Flame className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                <span>{user.streakDays}d</span>
              </div>

              {/* Admin Portal Quick Tab */}
              <button
                onClick={() => handleNavClick('admin')}
                className={`p-2 rounded-xl border text-xs font-bold transition-all flex items-center space-x-1 cursor-pointer ${
                  activeTab === 'admin'
                    ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-sm shadow-amber-500/20'
                    : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:text-amber-700 dark:hover:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/30 hover:border-amber-300 dark:hover:border-amber-700'
                }`}
                title="Admin & Faculty Management"
              >
                <ShieldCheck className="w-4 h-4" />
                <span className="hidden xl:inline text-[11px]">Admin</span>
              </button>

              {/* Profile Avatar Button */}
              <button
                onClick={() => handleNavClick('profile')}
                className={`flex items-center space-x-2 pl-1.5 pr-3 py-1 rounded-xl border transition-all cursor-pointer ${
                  activeTab === 'profile'
                    ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-700 text-amber-900 dark:text-amber-300 shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-200/60 dark:hover:bg-slate-700/60'
                }`}
              >
                <Avatar
                  src={user.avatar}
                  name={user.name}
                  role={user.role}
                  size="xs"
                  showBorder={false}
                />
                <span className="text-xs font-bold max-w-[110px] truncate">
                  {user.role === 'admin' ? 'Admin' : user.name.split(' ')[0]}
                </span>
              </button>

              {/* Switch / Login */}
              <button
                onClick={onOpenAuthModal}
                className="p-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-700 cursor-pointer"
                title="Switch Persona / Candidate Profile"
              >
                <User className="w-4 h-4" />
              </button>

              {/* Back to Landing Page */}
              {onNavigateToLanding && (
                <button
                  onClick={onNavigateToLanding}
                  className="p-2 text-slate-500 dark:text-slate-400 hover:text-amber-700 dark:hover:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/30 rounded-xl transition-colors border border-transparent hover:border-amber-200 dark:hover:border-amber-800 cursor-pointer"
                  title="Return to Portal Landing Page"
                >
                  <Home className="w-4 h-4" />
                </button>
              )}

              {onLogout && (
                <button
                  onClick={onLogout}
                  className="p-2 text-slate-500 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-xl transition-colors border border-transparent hover:border-rose-200 dark:border-rose-800 cursor-pointer"
                  title="Log Out & Switch User"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Mobile Navigation Header Controls */}
            <div className="flex lg:hidden items-center space-x-1 sm:space-x-1.5">
              {/* Mobile Header Session ID Chip */}
              <button
                type="button"
                onClick={handleCopySessionId}
                className="inline-flex items-center gap-1 px-2 py-1 rounded-xl bg-amber-50 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-300 font-mono text-[10px] font-bold cursor-pointer transition-transform active:scale-95 shadow-2xs"
                title={`Candidate Session ID: ${user.sessionId || 'SES-2026-NMF-8924A'} (Tap to Copy)`}
              >
                <Key className="w-3 h-3 text-amber-600 dark:text-amber-400 shrink-0" />
                <span className="truncate max-w-[85px] xs:max-w-[120px]">
                  {user.sessionId || 'SES-8924A'}
                </span>
                {copiedSession ? (
                  <Check className="w-2.5 h-2.5 text-emerald-600 shrink-0" />
                ) : (
                  <Copy className="w-2.5 h-2.5 text-amber-700/60 dark:text-amber-400/60 shrink-0" />
                )}
              </button>

              <ThemeToggle size="sm" />

              <button
                onClick={onOpenAuthModal}
                className="p-1.5 sm:p-2 text-amber-700 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/40 rounded-xl cursor-pointer"
                title="Profile / Persona"
              >
                <User className="w-5 h-5" />
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-1.5 sm:p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl cursor-pointer"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 text-amber-600 dark:text-amber-400" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 pt-2 pb-6 space-y-3 shadow-lg animate-in slide-in-from-top-2 duration-200">
            {/* Mobile Session ID Banner */}
            <div className="p-3 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 flex items-center justify-between text-xs">
              <div className="space-y-0.5">
                <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 block tracking-wider">
                  Active Portal Session ID
                </span>
                <p className="font-mono font-bold text-amber-800 dark:text-amber-300 text-xs">
                  {user.sessionId || 'SES-2026-NMF-8924A'}
                </p>
              </div>
              <button
                onClick={handleCopySessionId}
                className="px-2.5 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-amber-300 dark:border-amber-700 text-slate-800 dark:text-slate-200 text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
              >
                {copiedSession ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />}
                <span>{copiedSession ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full px-4 py-3 rounded-xl text-xs font-bold flex items-center justify-between cursor-pointer transition-all ${
                    isActive
                      ? 'bg-amber-500 text-slate-950 shadow-sm'
                      : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-amber-900 dark:text-amber-300 text-[10px] font-black rounded-full">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}

            <div className="pt-2 border-t border-slate-200 dark:border-slate-800 grid grid-cols-2 gap-2">
              <button
                onClick={() => handleNavClick('profile')}
                className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center justify-center gap-2 hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer"
              >
                <User className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span>Candidate Profile</span>
              </button>

              <button
                onClick={() => handleNavClick('admin')}
                className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-amber-800 dark:text-amber-400 flex items-center justify-center gap-2 hover:bg-amber-50 dark:hover:bg-amber-950/40 cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span>Admin Panel</span>
              </button>
            </div>

            {(onNavigateToLanding || onLogout) && (
              <div className="pt-1 grid grid-cols-2 gap-2">
                {onNavigateToLanding && (
                  <button
                    onClick={() => { setMobileMenuOpen(false); onNavigateToLanding(); }}
                    className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[11px] font-bold text-slate-700 dark:text-slate-200 flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Home className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                    <span>Landing Page</span>
                  </button>
                )}
                {onLogout && (
                  <button
                    onClick={() => { setMobileMenuOpen(false); onLogout(); }}
                    className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 text-[11px] font-bold text-rose-700 dark:text-rose-300 flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
                    <span>Sign Out</span>
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </header>

      {/* Optimized Fixed Mobile Bottom Navigation Bar (Persistent 1-Tap Mobile Navigation) */}
      <nav 
        aria-label="Mobile Bottom Navigation"
        className="lg:hidden fixed bottom-0 inset-x-0 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 shadow-lg px-1.5 py-1 flex items-center justify-around"
      >
        {[
          { id: 'home', label: 'Home', icon: GraduationCap },
          { id: 'mock', label: 'Mock Tests', icon: Target },
          { id: 'ca', label: 'Current Affairs', icon: BookOpen },
          { id: 'practice', label: 'Practice', icon: Layers },
          { id: 'analytics', label: 'Analytics', icon: TrendingUp }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleNavClick(tab.id)}
              className={`flex-1 min-w-0 py-1.5 px-1 rounded-xl transition-all flex flex-col items-center justify-center cursor-pointer ${
                isActive 
                  ? 'text-amber-800 dark:text-amber-300 font-extrabold bg-amber-50 dark:bg-amber-950/50' 
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
              <span className="text-[10px] mt-0.5 tracking-tight truncate max-w-full">
                {tab.label}
              </span>
            </button>
          );
        })}
      </nav>
    </>
  );
};

