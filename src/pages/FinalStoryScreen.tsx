import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useGame } from '@/contexts/GameContext';
import { useAudio } from '@/contexts/AudioContext';
import { useNarration } from '@/hooks/useNarration';
import { Sparkles, Heart, Star, Volume2, VolumeX } from 'lucide-react';

// Import final story images
import finalTriumph from '@/assets/story/final-1-triumph.jpg';
import finalIsland from '@/assets/story/final-2-island.jpg';
import finalApproaching from '@/assets/story/final-3-approaching.jpg';
import finalReunion from '@/assets/story/final-4-reunion.jpg';

interface StoryFrame {
  id: number;
  image: string;
  text: string;
  animation: 'zoom' | 'pan-left' | 'pan-right';
}

const FinalStoryScreen: React.FC = () => {
  const navigate = useNavigate();
  const { gameState } = useGame();
  const { fadeInMusic, fadeOutMusic } = useAudio();
  const { speak, stop: stopNarration } = useNarration();
  
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [isNarrating, setIsNarrating] = useState(false);
  const [narrationEnabled, setNarrationEnabled] = useState(true);
  
  const hasStartedRef = useRef(false);

  const playerName = gameState.playerName || 'our brave adventurer';

  const storyFrames: StoryFrame[] = [
    {
      id: 1,
      image: finalTriumph,
      text: `After a long and challenging journey through the Forest of Bugs, the Desert of Loops, and the Castle of Syntax, ${playerName} finally helped BaoBao reach the top of the magical island.`,
      animation: 'zoom',
    },
    {
      id: 2,
      image: finalIsland,
      text: "The island began to glow with magical light once more. Flowers bloomed, waterfalls sparkled, and hope returned to Dragon Island!",
      animation: 'pan-left',
    },
    {
      id: 3,
      image: finalApproaching,
      text: "And then, through the golden light, BaoBao saw her. Mommy Dragon, waiting with open wings and tears of joy.",
      animation: 'pan-right',
    },
    {
      id: 4,
      image: finalReunion,
      text: `My brave little BaoBao! Mommy Dragon cried, wrapping her wings around her baby. Thanks to ${playerName}, they were finally together again!`,
      animation: 'zoom',
    },
  ];

  const frame = storyFrames[currentFrame];

  // Start story music on mount
  useEffect(() => {
    fadeInMusic('story', 2000);
    return () => {
      stopNarration();
    };
  }, [fadeInMusic, stopNarration]);

  const goToNextFrame = useCallback(() => {
    if (currentFrame < storyFrames.length - 1) {
      setIsTransitioning(true);
      setShowSubtitle(false);
      setIsNarrating(false);
      
      setTimeout(() => {
        setCurrentFrame(prev => prev + 1);
        setIsTransitioning(false);
      }, 1500);
    } else {
      setIsComplete(true);
      fadeOutMusic(2000);
      setTimeout(() => {
        setShowThankYou(true);
      }, 2500);
    }
  }, [currentFrame, storyFrames.length, fadeOutMusic]);

  // Handle narration and frame advancement
  useEffect(() => {
    if (isComplete || isTransitioning) return;

    const subtitleTimer = setTimeout(() => {
      setShowSubtitle(true);
    }, 500);

    // Start narration after subtitle appears
    const narrationTimer = setTimeout(() => {
      if (narrationEnabled) {
        setIsNarrating(true);
        speak({
          text: frame.text,
          rate: 0.75, // Slower for emotional ending
          pitch: 1.0,
          onEnd: () => {
            setIsNarrating(false);
            // Wait a moment after narration ends, then advance
            setTimeout(() => {
              goToNextFrame();
            }, 1000);
          },
        });
      } else {
        // If narration disabled, use fixed timing
        setTimeout(() => {
          goToNextFrame();
        }, 6000);
      }
    }, 700);

    return () => {
      clearTimeout(subtitleTimer);
      clearTimeout(narrationTimer);
    };
  }, [currentFrame, frame.text, goToNextFrame, isComplete, isTransitioning, narrationEnabled, speak]);

  const handleReturnHome = () => {
    stopNarration();
    navigate('/');
  };

  const toggleNarration = () => {
    if (isNarrating) {
      stopNarration();
      setIsNarrating(false);
    }
    setNarrationEnabled(!narrationEnabled);
  };

  const getAnimationClass = (animation: StoryFrame['animation']) => {
    switch (animation) {
      case 'zoom':
        return 'animate-ken-burns-zoom';
      case 'pan-left':
        return 'animate-ken-burns-pan-left';
      case 'pan-right':
        return 'animate-ken-burns-pan-right';
      default:
        return 'animate-ken-burns-zoom';
    }
  };

  return (
    <div className="fixed inset-0 bg-black overflow-hidden">
      {/* Background image with Ken Burns effect */}
      <div 
        className={`absolute inset-0 transition-opacity duration-1000 ${
          isTransitioning || showThankYou ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <img
          key={frame.id}
          src={frame.image}
          alt={`Final story scene ${frame.id}`}
          className={`w-full h-full object-cover ${getAnimationClass(frame.animation)}`}
        />
        {/* Warm overlay for emotional tone */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-amber-900/10 to-black/30" />
      </div>

      {/* Narration toggle (only show during story, not thank you screen) */}
      {!showThankYou && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 z-50 text-white/80 hover:text-white hover:bg-white/10"
          onClick={toggleNarration}
          title={narrationEnabled ? 'Disable narration' : 'Enable narration'}
        >
          {narrationEnabled ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
        </Button>
      )}

      {/* Progress indicator */}
      {!showThankYou && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 flex gap-2">
          {storyFrames.map((_, index) => (
            <div
              key={index}
              className={`h-1 rounded-full transition-all duration-500 ${
                index === currentFrame
                  ? 'w-8 bg-primary'
                  : index < currentFrame
                  ? 'w-4 bg-primary/60'
                  : 'w-4 bg-white/30'
              }`}
            />
          ))}
        </div>
      )}

      {/* Subtitle area */}
      {!showThankYou && (
        <div className="absolute bottom-0 left-0 right-0 z-40 p-8 pb-16">
          <div 
            className={`max-w-3xl mx-auto transition-all duration-700 ${
              showSubtitle && !isTransitioning 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-4'
            }`}
          >
            <div className="bg-black/60 backdrop-blur-md rounded-2xl px-8 py-6 border border-amber-400/20">
              <p className="text-center text-xl md:text-2xl lg:text-3xl text-white font-body leading-relaxed">
                {frame.text}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Magical particles */}
      <div className="absolute inset-0 pointer-events-none z-30">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-magic-particles"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          >
            {i % 3 === 0 ? (
              <Heart className="w-4 h-4 text-rose-400 fill-rose-400 opacity-60" />
            ) : i % 3 === 1 ? (
              <Sparkles className="w-4 h-4 text-amber-300 opacity-70" />
            ) : (
              <Star className="w-3 h-3 text-yellow-300 fill-yellow-300 opacity-60" />
            )}
          </div>
        ))}
      </div>

      {/* Thank you message */}
      {showThankYou && (
        <div className="absolute inset-0 z-50 flex items-center justify-center animate-cinematic-fade">
          {/* Warm gradient background */}
          <div className="absolute inset-0 bg-gradient-to-b from-amber-900/90 via-rose-900/80 to-purple-900/90" />
          
          {/* Glowing orbs */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-rose-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          </div>

          <div className="relative z-10 text-center px-8 max-w-2xl">
            {/* Hearts decoration */}
            <div className="flex justify-center gap-3 mb-8">
              <Heart className="w-8 h-8 text-rose-400 fill-rose-400 animate-bounce-gentle" style={{ animationDelay: '0s' }} />
              <Heart className="w-10 h-10 text-rose-500 fill-rose-500 animate-bounce-gentle" style={{ animationDelay: '0.2s' }} />
              <Heart className="w-8 h-8 text-rose-400 fill-rose-400 animate-bounce-gentle" style={{ animationDelay: '0.4s' }} />
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display text-white mb-6 leading-relaxed">
              You helped BaoBao find his mommy.
            </h2>
            
            <p className="text-xl md:text-2xl text-amber-200 font-body mb-12">
              Thank you for being part of the journey.
            </p>

            <Button
              variant="adventure"
              size="lg"
              onClick={handleReturnHome}
              className="min-w-[200px] animate-glow-pulse"
            >
              Return to Home
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FinalStoryScreen;
