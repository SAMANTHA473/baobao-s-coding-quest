import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { BaoBaoCharacter } from '@/components/game/BaoBaoCharacter';
import { TreeDeciduous, Mountain, Castle, Star, Sparkles } from 'lucide-react';

interface LocationCompletionOverlayProps {
  locationId: 'forest' | 'desert' | 'castle';
  onContinue: () => void;
}

const locationData = {
  forest: {
    name: 'Forest of Bugs',
    icon: TreeDeciduous,
    gradient: 'from-emerald-500 to-green-700',
    bgColor: 'bg-emerald-500/20',
  },
  desert: {
    name: 'Desert of Loops',
    icon: Mountain,
    gradient: 'from-amber-500 to-orange-600',
    bgColor: 'bg-amber-500/20',
  },
  castle: {
    name: 'Castle of Syntax',
    icon: Castle,
    gradient: 'from-purple-500 to-indigo-700',
    bgColor: 'bg-purple-500/20',
  },
};

export const LocationCompletionOverlay: React.FC<LocationCompletionOverlayProps> = ({
  locationId,
  onContinue,
}) => {
  const [showContent, setShowContent] = useState(false);
  const location = locationData[locationId];
  const Icon = location.icon;

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // Generate confetti particles
  const confettiColors = ['#fbbf24', '#34d399', '#f472b6', '#60a5fa', '#a78bfa', '#fb923c'];
  const confetti = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 2}s`,
    duration: `${2 + Math.random() * 2}s`,
    color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
    size: 8 + Math.random() * 8,
  }));

  // Generate sparkles
  const sparkles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: `${10 + Math.random() * 80}%`,
    top: `${10 + Math.random() * 80}%`,
    delay: `${Math.random() * 3}s`,
    scale: 0.5 + Math.random() * 0.5,
  }));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Blurred/darkened background */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in" />

      {/* Confetti */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {confetti.map((c) => (
          <div
            key={c.id}
            className="absolute top-0 animate-confetti-fall"
            style={{
              left: c.left,
              animationDelay: c.delay,
              animationDuration: c.duration,
            }}
          >
            <div
              className="rounded-sm"
              style={{
                width: c.size,
                height: c.size,
                backgroundColor: c.color,
                transform: `rotate(${Math.random() * 360}deg)`,
              }}
            />
          </div>
        ))}
      </div>

      {/* Sparkles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {sparkles.map((s) => (
          <Sparkles
            key={s.id}
            className="absolute text-yellow-300 animate-sparkle-pulse"
            style={{
              left: s.left,
              top: s.top,
              animationDelay: s.delay,
              transform: `scale(${s.scale})`,
            }}
            size={24}
          />
        ))}
      </div>

      {/* Main content card */}
      <div
        className={`
          relative z-10 max-w-lg w-full mx-6 p-8 rounded-3xl
          bg-gradient-to-b from-card to-card/95 border-4 border-primary/30
          shadow-2xl shadow-primary/20
          ${showContent ? 'animate-celebration-pop' : 'opacity-0 scale-50'}
        `}
      >
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-yellow-400/20 via-primary/20 to-yellow-400/20 animate-glow-pulse blur-xl -z-10" />

        {/* Trophy/Star decoration */}
        <div className="absolute -top-8 left-1/2 -translate-x-1/2">
          <div className="relative">
            <Star className="w-16 h-16 text-yellow-400 fill-yellow-400 animate-bounce-slow drop-shadow-lg" />
            <Star className="absolute inset-0 w-16 h-16 text-yellow-300 fill-yellow-300 animate-ping opacity-50" />
          </div>
        </div>

        {/* Content */}
        <div className="text-center pt-8">
          {/* Location icon */}
          <div
            className={`
              w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${location.gradient}
              flex items-center justify-center shadow-lg animate-bounce-slow
            `}
          >
            <Icon className="w-12 h-12 text-white" />
          </div>

          {/* Congratulations text */}
          <h2 className="font-display text-4xl font-bold text-gradient-gold mb-4 animate-shimmer">
            🎉 CONGRATULATIONS! 🎉
          </h2>
          <p className="font-display text-2xl text-foreground mb-2">
            You have completed the
          </p>
          <p className={`font-display text-3xl font-bold bg-gradient-to-r ${location.gradient} bg-clip-text text-transparent mb-6`}>
            {location.name}!
          </p>

          {/* BaoBao celebration */}
          <div className="flex justify-center mb-6">
            <BaoBaoCharacter size="lg" emotion="excited" animate />
          </div>

          {/* Stats */}
          <div className="flex justify-center gap-6 mb-8">
            <div className="text-center">
              <p className="font-display text-3xl font-bold text-primary">10</p>
              <p className="font-body text-sm text-muted-foreground">Levels Cleared</p>
            </div>
            <div className="text-center">
              <p className="font-display text-3xl font-bold text-yellow-500">+200</p>
              <p className="font-body text-sm text-muted-foreground">Coins Earned</p>
            </div>
          </div>

          {/* Continue button */}
          <Button
            variant="adventure"
            size="lg"
            onClick={onContinue}
            className="w-full text-xl py-6 animate-pulse-gentle"
          >
            Continue Journey →
          </Button>
        </div>
      </div>
    </div>
  );
};
