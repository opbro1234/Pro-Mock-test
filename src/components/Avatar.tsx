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

  const isAdmin = role === 'admin' || name.toLowerCase().includes('prof') || name.toLowerCase().includes('admin');

  // Only render an image if it's explicitly uploaded or provided by the user (data URL or blob)
  // Stock photos of people from Unsplash or external portrait directories are excluded
  const isUserProvidedPhoto = Boolean(
    src &&
    !hasError &&
    !src.includes('images.unsplash.com') &&
    (src.startsWith('data:image') || src.startsWith('blob:') || src.startsWith('/uploads/'))
  );

  // Size mapping
  const sizeClasses = {
    xs: 'w-6 h-6 text-[10px]',
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-20 h-20 sm:w-24 sm:h-24 text-xl sm:text-2xl'
  };

  const iconSizes = {
    xs: 'w-3.5 h-3.5',
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-10 h-10 sm:w-12 sm:h-12'
  };

  const borderClass = showBorder 
    ? (isAdmin ? 'border-2 border-amber-500 shadow-sm' : 'border border-slate-300 dark:border-slate-700 shadow-xs')
    : '';

  // If there's an actual user-uploaded image
  if (isUserProvidedPhoto) {
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

  // Clean People Symbol / Icon badge
  return (
    <div
      className={`relative shrink-0 flex items-center justify-center rounded-2xl select-none transition-all ${
        isAdmin 
          ? 'bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 text-slate-950 shadow-sm shadow-amber-500/20' 
          : 'bg-amber-100 dark:bg-amber-950/70 text-amber-900 dark:text-amber-200 border border-amber-300 dark:border-amber-700/60'
      } ${sizeClasses[size]} ${borderClass} ${className}`}
      title={name}
      aria-label={name}
    >
      {isAdmin ? (
        <ShieldCheck className={iconSizes[size]} strokeWidth={2.2} />
      ) : (
        <User className={iconSizes[size]} strokeWidth={2.2} />
      )}
    </div>
  );
};

