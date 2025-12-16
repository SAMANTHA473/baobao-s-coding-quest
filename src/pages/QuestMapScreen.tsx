import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { BaoBaoCharacter } from '@/components/game/BaoBaoCharacter';
import { CoinDisplay } from '@/components/game/CoinDisplay';
import { useGame } from '@/contexts/GameContext';
import { useAudio } from '@/contexts/AudioContext';
import { isLocationUnlocked, getLocationForLevel } from '@/data/puzzles/index';
import { TreeDeciduous, Mountain, Castle, Check, ArrowLeft, Lock, Sparkles } from 'lucide-react';

interface LocationState {
  justCompleted?: 'forest' | 'desert' | 'castle';
  newlyUnlocked?: 'forest' | 'desert' | 'castle';
}

const QuestMapScreen: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { gameState, setCurrentLevel, setCurrentLocation } = useGame();
  const { playSound, playMusic } = useAudio();
  const [hoveredLocation, setHoveredLocation] = useState<string | null>(null);
  
  // Animation states
  const locationState = location.state as LocationState | null;
  const [showUnlockAnimation, setShowUnlockAnimation] = useState(false);
  const [animatingBaoBao, setAnimatingBaoBao] = useState(false);
  const [showNewChallengeMessage, setShowNewChallengeMessage] = useState(false);

  const getCompletedLevelsForLocation = (locationId: string) => {
    if (locationId === 'forest') {
      return gameState.completedLevels.filter(l => l >= 1 && l <= 10).length;
    }
    if (locationId === 'desert') {
      return gameState.completedLevels.filter(l => l >= 11 && l <= 20).length;
    }
    return gameState.completedLevels.filter(l => l >= 21 && l <= 30).length;
  };

  const getStartingLevelForLocation = (locationId: string) => {
    const completed = getCompletedLevelsForLocation(locationId);
    if (locationId === 'forest') return Math.min(1 + completed, 10);
    if (locationId === 'desert') return Math.min(11 + completed, 20);
    return Math.min(21 + completed, 30);
  };

  const locations = [
    {
      id: 'forest',
      name: 'Forest of Bugs',
      description: 'Learn to find and fix errors in code',
      icon: TreeDeciduous,
      color: 'from-emerald-500 to-green-700',
      levels: '1-10',
      unlocked: isLocationUnlocked('forest', gameState.completedLevels),
      completed: getCompletedLevelsForLocation('forest'),
      startLevel: getStartingLevelForLocation('forest'),
    },
    {
      id: 'desert',
      name: 'Desert of Loops',
      description: 'Master the art of repetition',
      icon: Mountain,
      color: 'from-amber-500 to-orange-600',
      levels: '11-20',
      unlocked: isLocationUnlocked('desert', gameState.completedLevels),
      completed: getCompletedLevelsForLocation('desert'),
      startLevel: getStartingLevelForLocation('desert'),
    },
    {
      id: 'castle',
      name: 'Castle of Syntax',
      description: 'Perfect your coding grammar',
      icon: Castle,
      color: 'from-purple-500 to-indigo-700',
      levels: '21-30',
      unlocked: isLocationUnlocked('castle', gameState.completedLevels),
      completed: getCompletedLevelsForLocation('castle'),
      startLevel: getStartingLevelForLocation('castle'),
    },
  ];

  const currentLocation = getLocationForLevel(gameState.currentLevel);

  // Start map music on mount
  useEffect(() => {
    playMusic('map');
  }, [playMusic]);

  // Handle unlock animation when arriving from completed location
  useEffect(() => {
    if (locationState?.justCompleted && locationState?.newlyUnlocked) {
      // Start animation sequence
      setAnimatingBaoBao(true);
      
      // After BaoBao walks, show unlock animation
      const unlockTimer = setTimeout(() => {
        setAnimatingBaoBao(false);
        setShowUnlockAnimation(true);
        playSound('unlock');
      }, 1500);
      
      // Show new challenge message
      const messageTimer = setTimeout(() => {
        setShowNewChallengeMessage(true);
      }, 2500);
      
      // Clear location state after animations
      const cleanupTimer = setTimeout(() => {
        window.history.replaceState({}, document.title);
      }, 5000);

      return () => {
        clearTimeout(unlockTimer);
        clearTimeout(messageTimer);
        clearTimeout(cleanupTimer);
      };
    }
  }, [locationState, playSound]);

  const handleLocationClick = (locationItem: typeof locations[0]) => {
    if (!locationItem.unlocked) return;
    playSound('click');
    setCurrentLevel(locationItem.startLevel);
    setCurrentLocation(locationItem.id as 'forest' | 'desert' | 'castle');
    navigate('/adventure');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky via-sky/80 to-emerald-200 flex flex-col items-center p-6 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 text-6xl animate-float opacity-60">☁️</div>
        <div className="absolute top-32 right-16 text-5xl animate-float opacity-50" style={{ animationDelay: '1s' }}>☁️</div>
        <div className="absolute top-48 left-1/4 text-4xl animate-float opacity-40" style={{ animationDelay: '2s' }}>☁️</div>
      </div>

      {/* Header */}
      <div className="w-full max-w-4xl flex items-center justify-between mb-4 relative z-10">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            playSound('click');
            navigate('/home');
          }}
          className="text-foreground"
        >
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <CoinDisplay />
      </div>

      {/* Title */}
      <div className="relative z-10 text-center mb-8 animate-slide-down">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-gradient-gold drop-shadow-lg">
          BAOBAO'S QUEST MAP
        </h1>
        <p className="font-body text-lg text-foreground/80 mt-2">
          Choose your path, {gameState.playerName}! Help BaoBao reach Mommy Dragon!
        </p>
      </div>

      {/* Map container */}
      <div className="relative z-10 w-full max-w-4xl flex-1 flex flex-col items-center justify-center">
        {/* Path connecting locations */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
          <defs>
            <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.6" />
            </linearGradient>
          </defs>
          <path
            d="M 200 450 Q 300 350 400 350 Q 500 350 600 250 Q 700 150 750 150"
            fill="none"
            stroke="url(#pathGradient)"
            strokeWidth="8"
            strokeDasharray="20 10"
            strokeLinecap="round"
          />
        </svg>

        {/* Locations */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full relative z-10">
          {locations.map((locationItem, index) => {
            const Icon = locationItem.icon;
            const isHovered = hoveredLocation === locationItem.id;
            const isNewlyUnlocked = locationState?.newlyUnlocked === locationItem.id;
            const isJustCompleted = locationState?.justCompleted === locationItem.id;
            const isFullyCompleted = locationItem.completed === 10;

            return (
              <div
                key={locationItem.id}
                className={`relative animate-slide-up`}
                style={{ animationDelay: `${index * 0.2}s` }}
                onMouseEnter={() => setHoveredLocation(locationItem.id)}
                onMouseLeave={() => setHoveredLocation(null)}
                onClick={() => handleLocationClick(locationItem)}
              >
                <div
                  className={`
                    card-fantasy p-6 text-center transition-all duration-300 cursor-pointer relative overflow-hidden
                    ${locationItem.unlocked ? 'hover:scale-105 hover:shadow-glow-gold' : 'opacity-60 cursor-not-allowed grayscale'}
                    ${isHovered && locationItem.unlocked ? 'border-primary shadow-glow-gold' : ''}
                    ${isNewlyUnlocked && showUnlockAnimation ? 'animate-unlock-glow border-primary' : ''}
                    ${isFullyCompleted ? 'border-green-400/50' : ''}
                  `}
                >
                  {/* Completed stamp overlay */}
                  {isFullyCompleted && (
                    <div className="absolute top-4 right-4 z-20">
                      <div className="bg-green-500 text-white rounded-full p-2 shadow-lg transform rotate-12 animate-bounce-slow">
                        <Check className="w-6 h-6" />
                      </div>
                    </div>
                  )}

                  {/* Lock overlay */}
                  {!locationItem.unlocked && (
                    <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm rounded-3xl flex flex-col items-center justify-center z-10 gap-2">
                      <Lock className="w-10 h-10 text-white/80" />
                      <span className="font-display text-sm text-white/80">Complete previous location</span>
                    </div>
                  )}

                  {/* Icon */}
                  <div
                    className={`
                      w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${locationItem.color}
                      flex items-center justify-center shadow-lg
                      ${isHovered && locationItem.unlocked ? 'animate-bounce-slow' : ''}
                      ${isNewlyUnlocked && showUnlockAnimation ? 'animate-pulse-glow' : ''}
                    `}
                  >
                    <Icon className="w-10 h-10 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="font-display text-xl font-bold text-foreground mb-2">
                    {locationItem.name}
                  </h3>
                  <p className="font-body text-sm text-muted-foreground mb-3">
                    {locationItem.description}
                  </p>
                  <div className="flex items-center justify-center gap-2 flex-wrap">
                    <div className="inline-block bg-muted px-3 py-1 rounded-full">
                      <span className="font-display text-sm font-semibold text-muted-foreground">
                        Levels {locationItem.levels}
                      </span>
                    </div>
                    {isFullyCompleted && (
                      <div className="inline-flex items-center gap-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 py-1 rounded-full shadow-md">
                        <Check className="w-4 h-4" />
                        <span className="font-display text-sm font-bold">CLEARED!</span>
                      </div>
                    )}
                  </div>
                  {locationItem.unlocked && locationItem.completed < 10 && (
                    <p className="font-body text-xs text-muted-foreground mt-2">
                      {locationItem.completed}/10 completed
                    </p>
                  )}

                  {/* Play button for unlocked locations */}
                  {locationItem.unlocked && (
                    <Button
                      variant={locationItem.id === 'forest' ? 'forest' : locationItem.id === 'desert' ? 'coral' : 'castle'}
                      size="sm"
                      className="mt-4"
                    >
                      {isFullyCompleted ? 'Replay' : locationItem.completed > 0 ? 'Continue' : 'Start'} →
                    </Button>
                  )}
                </div>

                {/* BaoBao indicator - animated when transitioning */}
                {locationItem.id === currentLocation && locationItem.unlocked && !animatingBaoBao && (
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2">
                    <BaoBaoCharacter size="sm" emotion="excited" />
                  </div>
                )}

                {/* Animating BaoBao from completed to new location */}
                {isJustCompleted && animatingBaoBao && (
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 animate-path-walk">
                    <BaoBaoCharacter size="sm" emotion="happy" animate />
                  </div>
                )}

                {/* New challenge message */}
                {isNewlyUnlocked && showNewChallengeMessage && (
                  <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-48 animate-slide-up">
                    <div className="bg-primary text-primary-foreground px-4 py-2 rounded-xl shadow-lg text-center">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <Sparkles className="w-4 h-4" />
                        <span className="font-display text-sm font-bold">NEW!</span>
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <p className="font-body text-xs">A new challenge awaits!</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Mommy dragon silhouette in distance */}
      <div className="absolute bottom-0 right-0 opacity-20 transform scale-50 translate-x-20 translate-y-20">
        <div className="text-9xl">🐉</div>
      </div>
    </div>
  );
};

export default QuestMapScreen;
