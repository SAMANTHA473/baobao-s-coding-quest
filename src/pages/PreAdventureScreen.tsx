import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useGame } from '@/contexts/GameContext';
import { getAdventureForLocation, AnimalLesson } from '@/data/adventureLessons';
import { ArrowRight } from 'lucide-react';

const PreAdventureScreen: React.FC = () => {
  const navigate = useNavigate();
  const { gameState, markAdventureComplete } = useGame();
  const [currentEncounter, setCurrentEncounter] = useState(0);
  const [isWalking, setIsWalking] = useState(true);
  const [showDialogue, setShowDialogue] = useState(false);
  const [showReadyMessage, setShowReadyMessage] = useState(false);
  const [backgroundOffset, setBackgroundOffset] = useState(0);
  const walkingRef = useRef<NodeJS.Timeout | null>(null);

  const adventure = getAdventureForLocation(gameState.currentLocation);
  const currentAnimal: AnimalLesson | undefined = adventure.animals[currentEncounter];

  // Walking animation - scroll background
  useEffect(() => {
    if (isWalking && currentEncounter < 10) {
      walkingRef.current = setInterval(() => {
        setBackgroundOffset(prev => prev + 2);
      }, 50);

      // Stop walking after a short duration to meet animal
      const stopTimer = setTimeout(() => {
        setIsWalking(false);
        setShowDialogue(true);
      }, 1500);

      return () => {
        if (walkingRef.current) clearInterval(walkingRef.current);
        clearTimeout(stopTimer);
      };
    }
  }, [isWalking, currentEncounter]);

  const handleNextEncounter = () => {
    setShowDialogue(false);
    
    if (currentEncounter >= 9) {
      // All 10 animals encountered
      setShowReadyMessage(true);
    } else {
      // Move to next animal
      setCurrentEncounter(prev => prev + 1);
      setIsWalking(true);
    }
  };

  const handleStartQuestions = () => {
    markAdventureComplete(gameState.currentLocation);
    navigate('/adventure');
  };

  const getLocationBackground = () => {
    switch (gameState.currentLocation) {
      case 'forest':
        return 'from-emerald-200 via-green-100 to-emerald-200';
      case 'desert':
        return 'from-amber-200 via-orange-100 to-amber-200';
      case 'castle':
        return 'from-purple-200 via-indigo-100 to-purple-200';
      default:
        return 'from-emerald-200 via-green-100 to-emerald-200';
    }
  };

  const getLocationDecorations = () => {
    switch (gameState.currentLocation) {
      case 'forest':
        return (
          <>
            <span className="text-6xl">🌲</span>
            <span className="text-5xl">🌳</span>
            <span className="text-6xl">🌲</span>
            <span className="text-4xl">🌿</span>
            <span className="text-5xl">🌳</span>
            <span className="text-6xl">🌲</span>
            <span className="text-4xl">🍃</span>
            <span className="text-5xl">🌳</span>
            <span className="text-6xl">🌲</span>
            <span className="text-5xl">🌳</span>
          </>
        );
      case 'desert':
        return (
          <>
            <span className="text-6xl">🌵</span>
            <span className="text-4xl">🏜️</span>
            <span className="text-5xl">🌵</span>
            <span className="text-6xl">☀️</span>
            <span className="text-5xl">🌵</span>
            <span className="text-4xl">🏜️</span>
            <span className="text-6xl">🌵</span>
            <span className="text-5xl">🏜️</span>
            <span className="text-6xl">🌵</span>
            <span className="text-4xl">🏜️</span>
          </>
        );
      case 'castle':
        return (
          <>
            <span className="text-5xl">🏰</span>
            <span className="text-4xl">⚔️</span>
            <span className="text-6xl">🏯</span>
            <span className="text-5xl">👑</span>
            <span className="text-4xl">🛡️</span>
            <span className="text-6xl">🏰</span>
            <span className="text-5xl">⚔️</span>
            <span className="text-4xl">🏯</span>
            <span className="text-5xl">👑</span>
            <span className="text-6xl">🏰</span>
          </>
        );
      default:
        return null;
    }
  };

  const getGroundPattern = () => {
    switch (gameState.currentLocation) {
      case 'forest':
        return 'from-green-600 via-green-700 to-green-600';
      case 'desert':
        return 'from-amber-500 via-amber-600 to-amber-500';
      case 'castle':
        return 'from-slate-500 via-slate-600 to-slate-500';
      default:
        return 'from-green-600 via-green-700 to-green-600';
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-b ${getLocationBackground()} flex flex-col overflow-hidden relative`}>
      {/* Sky background decorations */}
      <div className="absolute top-0 left-0 right-0 h-1/3 overflow-hidden pointer-events-none">
        <div className="absolute top-8 left-10 text-5xl animate-float opacity-60">☁️</div>
        <div className="absolute top-16 right-20 text-4xl animate-float opacity-50" style={{ animationDelay: '1s' }}>☁️</div>
        <div className="absolute top-24 left-1/3 text-3xl animate-float opacity-40" style={{ animationDelay: '2s' }}>☁️</div>
      </div>

      {/* Progress indicator */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20">
        <div className="bg-card/90 backdrop-blur-sm rounded-full px-6 py-2 shadow-lg border border-border">
          <p className="font-display text-sm font-bold text-foreground">
            {adventure.locationName} • Meeting {Math.min(currentEncounter + 1, 10)} of 10
          </p>
        </div>
      </div>

      {/* Progress dots */}
      <div className="absolute top-16 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {adventure.animals.map((_, idx) => (
          <div
            key={idx}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              idx < currentEncounter
                ? 'bg-primary scale-100'
                : idx === currentEncounter
                ? 'bg-primary animate-pulse scale-125'
                : 'bg-muted scale-75'
            }`}
          />
        ))}
      </div>

      {/* Main scene area */}
      <div className="flex-1 relative flex items-end justify-center pb-32">
        {/* Scrolling background decorations */}
        <div 
          className="absolute bottom-24 left-0 right-0 flex gap-32 items-end transition-transform"
          style={{ transform: `translateX(-${backgroundOffset}px)` }}
        >
          {getLocationDecorations()}
          {getLocationDecorations()}
          {getLocationDecorations()}
        </div>

        {/* Ground */}
        <div className={`absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-r ${getGroundPattern()}`}>
          {/* Ground texture */}
          <div className="absolute inset-0 opacity-30">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 rounded-full bg-black/20"
                style={{
                  left: `${(i * 5 + Math.random() * 3) % 100}%`,
                  top: `${Math.random() * 60 + 20}%`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Path */}
        <div className="absolute bottom-20 left-0 right-0 h-4 bg-gradient-to-r from-amber-300/50 via-amber-400/50 to-amber-300/50" />

        {/* Player Character */}
        <div 
          className={`absolute bottom-28 left-1/4 z-10 transition-all duration-300 ${
            isWalking ? 'animate-character-walk' : 'animate-character-idle'
          }`}
        >
          {/* Character shadow */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-16 h-4 bg-black/20 rounded-full blur-sm" />
          
          {/* Player character - cartoon adventurer */}
          <div className="relative">
            {/* Body */}
            <div className="w-16 h-20 bg-gradient-to-b from-blue-400 to-blue-600 rounded-t-2xl rounded-b-lg relative">
              {/* Head */}
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-14 h-14 bg-gradient-to-b from-amber-200 to-amber-300 rounded-full border-4 border-amber-100">
                {/* Face */}
                <div className="absolute top-4 left-2 w-2 h-2 bg-slate-800 rounded-full" /> {/* Left eye */}
                <div className="absolute top-4 right-2 w-2 h-2 bg-slate-800 rounded-full" /> {/* Right eye */}
                <div className={`absolute bottom-3 left-1/2 -translate-x-1/2 w-4 h-2 bg-pink-400 rounded-full ${
                  !isWalking ? 'animate-pulse' : ''
                }`} /> {/* Smile */}
              </div>
              {/* Hair */}
              <div className="absolute -top-14 left-1/2 -translate-x-1/2 w-16 h-8 bg-gradient-to-b from-amber-600 to-amber-700 rounded-t-full" />
              {/* Hat */}
              <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-18 h-6 bg-gradient-to-r from-red-500 to-red-600 rounded-full" />
              {/* Arms */}
              <div className={`absolute top-2 -left-3 w-4 h-10 bg-gradient-to-b from-blue-400 to-blue-600 rounded-full ${
                isWalking ? 'animate-arm-swing' : ''
              }`} />
              <div className={`absolute top-2 -right-3 w-4 h-10 bg-gradient-to-b from-blue-400 to-blue-600 rounded-full ${
                isWalking ? 'animate-arm-swing-reverse' : ''
              }`} />
            </div>
            {/* Legs */}
            <div className="flex justify-center gap-1">
              <div className={`w-5 h-8 bg-gradient-to-b from-slate-600 to-slate-800 rounded-b-lg ${
                isWalking ? 'animate-leg-walk' : ''
              }`} />
              <div className={`w-5 h-8 bg-gradient-to-b from-slate-600 to-slate-800 rounded-b-lg ${
                isWalking ? 'animate-leg-walk-reverse' : ''
              }`} />
            </div>
            {/* Backpack */}
            <div className="absolute top-4 -right-2 w-6 h-10 bg-gradient-to-b from-orange-400 to-orange-600 rounded-lg" />
          </div>
        </div>

        {/* Animal character */}
        {currentAnimal && !showReadyMessage && (
          <div 
            className={`absolute bottom-28 right-1/4 z-10 transition-all duration-500 ${
              showDialogue ? 'opacity-100 scale-100' : 'opacity-0 scale-75 translate-x-20'
            }`}
          >
            {/* Animal shadow */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-20 h-4 bg-black/20 rounded-full blur-sm" />
            
            {/* Animal */}
            <div className="text-7xl animate-animal-idle transform -scale-x-100">
              {currentAnimal.emoji}
            </div>
          </div>
        )}
      </div>

      {/* Dialogue box */}
      {showDialogue && currentAnimal && !showReadyMessage && (
        <div className="absolute bottom-8 left-4 right-4 z-30 animate-slide-up">
          <div className="max-w-2xl mx-auto bg-card/95 backdrop-blur-md rounded-3xl p-6 shadow-2xl border-2 border-primary/30">
            {/* Animal name */}
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">{currentAnimal.emoji}</span>
              <h3 className="font-display text-xl font-bold text-primary">
                {currentAnimal.name}
              </h3>
            </div>
            
            {/* Lesson text */}
            <p className="font-body text-lg text-foreground leading-relaxed mb-4">
              "{currentAnimal.lesson}"
            </p>

            {/* Next button */}
            <div className="flex justify-end">
              <Button
                variant="adventure"
                size="lg"
                onClick={handleNextEncounter}
                className="gap-2"
              >
                Next
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Ready message */}
      {showReadyMessage && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-6 animate-fade-in">
          <div className="card-fantasy max-w-md w-full text-center animate-celebration-pop">
            <div className="text-6xl mb-4">⚔️</div>
            <h2 className="font-display text-3xl font-bold text-gradient-gold mb-4">
              You are now ready for the challenge!
            </h2>
            <p className="font-body text-muted-foreground mb-6">
              You've learned from all the wise creatures. Time to put your knowledge to the test!
            </p>
            <Button
              variant="adventure"
              size="lg"
              onClick={handleStartQuestions}
              className="gap-2"
            >
              Start Challenge
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PreAdventureScreen;
