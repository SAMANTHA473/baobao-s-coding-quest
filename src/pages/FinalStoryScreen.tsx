import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { BaoBaoCharacter } from '@/components/game/BaoBaoCharacter';
import { MommyDragon } from '@/components/game/MommyDragon';
import { useGame } from '@/contexts/GameContext';
import { Sparkles, Heart, Star } from 'lucide-react';

const FinalStoryScreen: React.FC = () => {
  const navigate = useNavigate();
  const { gameState } = useGame();
  const [currentScene, setCurrentScene] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  const scenes = [
    {
      text: `After a long and challenging journey through the Forest of Bugs, the Desert of Loops, and the Castle of Syntax, ${gameState.playerName || 'our brave adventurer'} finally helped BaoBao reach the top of the magical island...`,
      showMommy: false,
    },
    {
      text: "And there, waiting with tears of joy in her eyes, was Mommy Dragon! She had been watching over BaoBao's journey all along, proud of every challenge overcome.",
      showMommy: true,
    },
    {
      text: `"My brave little BaoBao!" Mommy Dragon cried, wrapping her wings around her baby. "You learned so much and never gave up. I'm so proud of you!"`,
      showMommy: true,
    },
    {
      text: `Thanks to ${gameState.playerName || 'you'}, BaoBao discovered that the real treasure wasn't just finding Mommy—it was the knowledge, courage, and perseverance gained along the way. The end... or is it just the beginning?`,
      showMommy: true,
    },
  ];

  useEffect(() => {
    const text = scenes[currentScene].text;
    let index = 0;
    setDisplayedText('');
    setIsTyping(true);

    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(text.slice(0, index + 1));
        index++;
      } else {
        setIsTyping(false);
        clearInterval(interval);
      }
    }, 40);

    return () => clearInterval(interval);
  }, [currentScene, gameState.playerName]);

  const handleNext = () => {
    if (currentScene < scenes.length - 1) {
      setCurrentScene(prev => prev + 1);
    } else {
      navigate('/journey-complete');
    }
  };

  const handleSkip = () => {
    if (isTyping) {
      setDisplayedText(scenes[currentScene].text);
      setIsTyping(false);
    } else {
      handleNext();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-100 via-orange-50 to-rose-100 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Magical particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          >
            {i % 3 === 0 ? (
              <Heart className="w-4 h-4 text-rose-400 opacity-60" />
            ) : i % 3 === 1 ? (
              <Sparkles className="w-4 h-4 text-amber-400 opacity-60" />
            ) : (
              <Star className="w-4 h-4 text-yellow-400 opacity-60" />
            )}
          </div>
        ))}
      </div>

      {/* Golden rays */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-radial from-amber-200/40 to-transparent rounded-full blur-3xl" />
      </div>

      {/* Scene indicator */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 flex gap-2">
        {scenes.map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              i === currentScene
                ? 'bg-primary scale-125'
                : i < currentScene
                ? 'bg-primary/60'
                : 'bg-muted'
            }`}
          />
        ))}
      </div>

      {/* Story content */}
      <div className="relative z-10 max-w-2xl mx-auto text-center">
        {/* Characters */}
        <div className="flex items-end justify-center gap-4 mb-8">
          <div className={`transition-all duration-700 ${scenes[currentScene].showMommy ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}>
            <MommyDragon size="lg" className="drop-shadow-2xl" />
          </div>
          <div className="animate-bounce-gentle">
            <BaoBaoCharacter 
              size="lg" 
              animate 
              emotion={scenes[currentScene].showMommy ? 'happy' : 'thinking'}
              className="drop-shadow-2xl"
            />
          </div>
        </div>

        {/* Reunion hearts */}
        {scenes[currentScene].showMommy && (
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 flex gap-2 animate-pulse">
            <Heart className="w-8 h-8 text-rose-500 fill-rose-500" />
            <Heart className="w-6 h-6 text-rose-400 fill-rose-400 mt-2" />
            <Heart className="w-8 h-8 text-rose-500 fill-rose-500" />
          </div>
        )}

        {/* Text box */}
        <div className="bg-card/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl border-2 border-primary/20 mb-6">
          <p className="text-lg md:text-xl text-foreground leading-relaxed min-h-[120px]">
            {displayedText}
            {isTyping && <span className="animate-pulse">|</span>}
          </p>
        </div>

        {/* Navigation */}
        <div className="flex gap-4 justify-center">
          <Button
            variant="outline"
            onClick={handleSkip}
            className="px-6"
          >
            {isTyping ? 'Skip' : currentScene < scenes.length - 1 ? 'Next' : 'Continue'}
          </Button>
          {!isTyping && (
            <Button
              variant="adventure"
              onClick={handleNext}
              className="px-8 animate-pulse"
            >
              {currentScene < scenes.length - 1 ? 'Continue Story' : 'Journey Complete!'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FinalStoryScreen;
