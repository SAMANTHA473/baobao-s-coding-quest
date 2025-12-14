import React from 'react';
import { cn } from '@/lib/utils';

interface MommyDragonProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
  sm: 'w-32 h-32',
  md: 'w-48 h-48',
  lg: 'w-64 h-64',
};

export const MommyDragon: React.FC<MommyDragonProps> = ({ className, size = 'md' }) => {
  return (
    <div className={cn('relative', sizeClasses[size], className)}>
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full drop-shadow-2xl"
        style={{ filter: 'drop-shadow(0 10px 30px rgba(234, 88, 12, 0.4))' }}
      >
        {/* Wing left */}
        <ellipse cx="25" cy="90" rx="30" ry="50" fill="url(#mommyWingGradient)" />
        {/* Wing right */}
        <ellipse cx="175" cy="90" rx="30" ry="50" fill="url(#mommyWingGradient)" />

        {/* Body */}
        <ellipse cx="100" cy="120" rx="60" ry="55" fill="url(#mommyBodyGradient)" />

        {/* Belly */}
        <ellipse cx="100" cy="130" rx="40" ry="35" fill="url(#mommyBellyGradient)" />

        {/* Head */}
        <circle cx="100" cy="60" r="50" fill="url(#mommyBodyGradient)" />

        {/* Crown/Tiara */}
        <path d="M60 25 L70 5 L85 25 L100 0 L115 25 L130 5 L140 25" fill="url(#crownGradient)" />
        
        {/* Horns */}
        <path d="M55 40 L40 10 L65 45" fill="url(#mommyHornGradient)" />
        <path d="M145 40 L160 10 L135 45" fill="url(#mommyHornGradient)" />

        {/* Ears/spikes */}
        <ellipse cx="50" cy="45" rx="15" ry="25" fill="url(#mommySpikeGradient)" transform="rotate(-20 50 45)" />
        <ellipse cx="150" cy="45" rx="15" ry="25" fill="url(#mommySpikeGradient)" transform="rotate(20 150 45)" />

        {/* Eyes */}
        <ellipse cx="80" cy="55" rx="14" ry="16" fill="#fff" />
        <ellipse cx="120" cy="55" rx="14" ry="16" fill="#fff" />
        <circle cx="82" cy="58" r="8" fill="#2d1f0a" />
        <circle cx="122" cy="58" r="8" fill="#2d1f0a" />
        <circle cx="85" cy="54" r="4" fill="#fff" />
        <circle cx="125" cy="54" r="4" fill="#fff" />
        
        {/* Eyelashes */}
        <path d="M68 48 L62 42" stroke="#2d1f0a" strokeWidth="2" strokeLinecap="round" />
        <path d="M72 45 L68 38" stroke="#2d1f0a" strokeWidth="2" strokeLinecap="round" />
        <path d="M132 48 L138 42" stroke="#2d1f0a" strokeWidth="2" strokeLinecap="round" />
        <path d="M128 45 L132 38" stroke="#2d1f0a" strokeWidth="2" strokeLinecap="round" />

        {/* Nose */}
        <ellipse cx="100" cy="80" rx="10" ry="6" fill="#c2410c" />
        <circle cx="94" cy="79" r="2.5" fill="#2d1f0a" />
        <circle cx="106" cy="79" r="2.5" fill="#2d1f0a" />

        {/* Gentle smile */}
        <path d="M85 92 Q100 108 115 92" fill="none" stroke="#2d1f0a" strokeWidth="3" strokeLinecap="round" />

        {/* Blush */}
        <ellipse cx="65" cy="75" rx="10" ry="6" fill="#ffb3b3" opacity="0.5" />
        <ellipse cx="135" cy="75" rx="10" ry="6" fill="#ffb3b3" opacity="0.5" />

        {/* Feet */}
        <ellipse cx="70" cy="175" rx="22" ry="15" fill="url(#mommyBodyGradient)" />
        <ellipse cx="130" cy="175" rx="22" ry="15" fill="url(#mommyBodyGradient)" />

        {/* Tail */}
        <path
          d="M160 135 Q190 150 180 185 Q170 210 145 195"
          fill="none"
          stroke="url(#mommyBodyGradient)"
          strokeWidth="18"
          strokeLinecap="round"
        />
        <ellipse cx="145" cy="195" rx="12" ry="12" fill="url(#mommySpikeGradient)" />

        {/* Gradients */}
        <defs>
          <linearGradient id="mommyBodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fb923c" />
            <stop offset="50%" stopColor="#f97316" />
            <stop offset="100%" stopColor="#ea580c" />
          </linearGradient>
          <linearGradient id="mommyBellyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fed7aa" />
            <stop offset="100%" stopColor="#fdba74" />
          </linearGradient>
          <linearGradient id="mommyWingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#dc2626" />
            <stop offset="100%" stopColor="#b91c1c" />
          </linearGradient>
          <linearGradient id="mommyHornGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fef3c7" />
            <stop offset="100%" stopColor="#fcd34d" />
          </linearGradient>
          <linearGradient id="mommySpikeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#dc2626" />
            <stop offset="100%" stopColor="#b91c1c" />
          </linearGradient>
          <linearGradient id="crownGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="50%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};
