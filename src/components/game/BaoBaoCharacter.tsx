import React from 'react';
import { cn } from '@/lib/utils';

interface BaoBaoCharacterProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  animate?: boolean;
  emotion?: 'happy' | 'sad' | 'excited' | 'thinking';
  className?: string;
}

const sizeClasses = {
  sm: 'w-24 h-24',
  md: 'w-40 h-40',
  lg: 'w-56 h-56',
  xl: 'w-72 h-72',
};

export const BaoBaoCharacter: React.FC<BaoBaoCharacterProps> = ({
  size = 'lg',
  animate = true,
  emotion = 'happy',
  className,
}) => {
  const eyeExpression = {
    happy: { left: '◕', right: '◕' },
    sad: { left: '◔', right: '◔' },
    excited: { left: '★', right: '★' },
    thinking: { left: '◑', right: '◐' },
  };

  const mouthExpression = {
    happy: '◡',
    sad: '︵',
    excited: '▽',
    thinking: '～',
  };

  return (
    <div
      className={cn(
        'relative flex items-center justify-center',
        sizeClasses[size],
        animate && 'animate-float',
        className
      )}
    >
      {/* Dragon body */}
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full drop-shadow-2xl"
        style={{ filter: 'drop-shadow(0 10px 30px rgba(251, 191, 36, 0.4))' }}
      >
        {/* Wing left */}
        <ellipse
          cx="40"
          cy="100"
          rx="25"
          ry="40"
          fill="url(#wingGradient)"
          className={animate ? 'animate-pulse' : ''}
        />
        {/* Wing right */}
        <ellipse
          cx="160"
          cy="100"
          rx="25"
          ry="40"
          fill="url(#wingGradient)"
          className={animate ? 'animate-pulse' : ''}
        />

        {/* Body */}
        <ellipse cx="100" cy="115" rx="55" ry="50" fill="url(#bodyGradient)" />

        {/* Belly */}
        <ellipse cx="100" cy="125" rx="35" ry="30" fill="url(#bellyGradient)" />

        {/* Head */}
        <circle cx="100" cy="70" r="45" fill="url(#bodyGradient)" />

        {/* Horns */}
        <path d="M65 35 L55 10 L70 40" fill="url(#hornGradient)" />
        <path d="M135 35 L145 10 L130 40" fill="url(#hornGradient)" />

        {/* Ears/spikes */}
        <ellipse cx="60" cy="50" rx="12" ry="20" fill="url(#spikeGradient)" transform="rotate(-20 60 50)" />
        <ellipse cx="140" cy="50" rx="12" ry="20" fill="url(#spikeGradient)" transform="rotate(20 140 50)" />

        {/* Eyes */}
        <circle cx="82" cy="65" r="12" fill="#fff" />
        <circle cx="118" cy="65" r="12" fill="#fff" />
        <circle cx="84" cy="67" r="7" fill="#2d1f0a" />
        <circle cx="120" cy="67" r="7" fill="#2d1f0a" />
        <circle cx="86" cy="64" r="3" fill="#fff" />
        <circle cx="122" cy="64" r="3" fill="#fff" />

        {/* Nose */}
        <ellipse cx="100" cy="85" rx="8" ry="5" fill="#e08a52" />
        <circle cx="95" cy="84" r="2" fill="#2d1f0a" />
        <circle cx="105" cy="84" r="2" fill="#2d1f0a" />

        {/* Mouth */}
        <path
          d={
            emotion === 'happy' || emotion === 'excited'
              ? 'M88 95 Q100 110 112 95'
              : emotion === 'sad'
              ? 'M88 100 Q100 90 112 100'
              : 'M88 97 Q100 97 112 97'
          }
          fill="none"
          stroke="#2d1f0a"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Blush */}
        <ellipse cx="70" cy="80" rx="8" ry="5" fill="#ffb3b3" opacity="0.6" />
        <ellipse cx="130" cy="80" rx="8" ry="5" fill="#ffb3b3" opacity="0.6" />

        {/* Feet */}
        <ellipse cx="75" cy="165" rx="18" ry="12" fill="url(#bodyGradient)" />
        <ellipse cx="125" cy="165" rx="18" ry="12" fill="url(#bodyGradient)" />

        {/* Tail */}
        <path
          d="M155 130 Q180 140 170 170 Q160 190 140 180"
          fill="none"
          stroke="url(#bodyGradient)"
          strokeWidth="15"
          strokeLinecap="round"
        />
        <circle cx="140" cy="180" r="10" fill="url(#spikeGradient)" />

        {/* Gradients */}
        <defs>
          <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fcd34d" />
            <stop offset="50%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>
          <linearGradient id="bellyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fef3c7" />
            <stop offset="100%" stopColor="#fde68a" />
          </linearGradient>
          <linearGradient id="wingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fb923c" />
            <stop offset="100%" stopColor="#ea580c" />
          </linearGradient>
          <linearGradient id="hornGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fef3c7" />
            <stop offset="100%" stopColor="#fcd34d" />
          </linearGradient>
          <linearGradient id="spikeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fb923c" />
            <stop offset="100%" stopColor="#f97316" />
          </linearGradient>
        </defs>
      </svg>

      {/* Sparkles */}
      {animate && (
        <>
          <div className="absolute top-2 left-4 text-2xl animate-sparkle">✨</div>
          <div className="absolute top-6 right-2 text-xl animate-sparkle" style={{ animationDelay: '0.5s' }}>⭐</div>
          <div className="absolute bottom-8 left-2 text-lg animate-sparkle" style={{ animationDelay: '1s' }}>✨</div>
        </>
      )}
    </div>
  );
};
