import React, { useState } from 'react';
import { User, ShieldCheck, GraduationCap } from 'lucide-react';

interface AvatarProps {
  src?: string;
  name: string;
  role?: 'student' | 'admin';
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  showBorder?: boolean;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  name,
  role = 'student',
  className = '',
  size = 'md',
  showBorder = true
}) => {
  const [hasError, setHasError] = useState(false);

  // Derive initials from name (e.g. "Prof. Shraddha Parab" -> "SP" or "Shivraj Gond" -> "SG")
  const getInitials = (fullName: string) => {
    if (!fullName) return 'U';
    const clean = fullName.replace(/^(Prof\.|Dr\.|Mr\.|Ms\.|Mrs\.)\s+/i, '').trim();
    const parts = clean.split(' ').filter(Boolean);
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return (parts[0]?.[0] || 'U').toUpperCase();
  };

  const initials = getInitials(name);
  const isAdmin = role === 'admin' || name.toLowerCase().includes('prof') || name.toLowerCase().includes('admin');

  // Size mapping
  const sizeClasses = {
    xs: 'w-6 h-6 text-[10px]',
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-20 h-20 sm:w-24 sm:h-24 text-xl sm:text-2xl'
  };

  const borderClass = showBorder 
    ? (isAdmin ? 'border-2 border-amber-500 shadow-sm' : 'border border-slate-300 dark:border-slate-700 shadow-xs')
    : '';

  // If there's an image and no load error occurred
  if (src && !hasError) {
    return (
      <div className={`relative shrink-0 overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-800 ${sizeClasses[size]} ${borderClass} ${className}`}>
        <img
          src={src}
          alt={name}
          referrerPolicy="no-referrer"
          onError={() => setHasError(true)}
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  // Fallback Initials / Icon badge
  return (
    <div
      className={`relative shrink-0 flex items-center justify-center font-bold font-serif rounded-2xl select-none transition-all ${
        isAdmin 
          ? 'bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 text-slate-950 shadow-sm shadow-amber-500/20' 
          : 'bg-amber-100 dark:bg-amber-950/70 text-amber-900 dark:text-amber-200 border border-amber-300 dark:border-amber-700/60'
      } ${sizeClasses[size]} ${borderClass} ${className}`}
      title={name}
    >
      {initials ? (
        <span>{initials}</span>
      ) : isAdmin ? (
        <ShieldCheck className="w-1/2 h-1/2" />
      ) : (
        <User className="w-1/2 h-1/2" />
      )}
    </div>
  );
};
