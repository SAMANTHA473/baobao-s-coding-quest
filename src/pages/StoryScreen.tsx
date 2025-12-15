import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

// Import story images
import introHappy from '@/assets/story/intro-1-happy.jpg';
import introStorm from '@/assets/story/intro-2-storm.jpg';
import introJourney from '@/assets/story/intro-3-journey.jpg';
import introQuest from '@/assets/story/intro-4-quest.jpg';

interface StoryFrame {
  id: number;
  image: string;
  text: string;
  duration: number; // in milliseconds
  animation: 'zoom' | 'pan-left' | 'pan-right';
}

const storyFrames: StoryFrame[] = [
  {
    id: 1,
    image: introHappy,
    text: "In the magical Dragon Island, little BaoBao lived happily with Mommy Dragon...",
    duration: 6000,
    animation: 'zoom',
  },
  {
    id: 2,
    image: introStorm,
    text: "One stormy night, a great wind swept through the island, separating BaoBao from Mommy...",
    duration: 6000,
    animation: 'pan-left',
  },
  {
    id: 3,
    image: introJourney,
    text: "Now BaoBao must journey through enchanted lands, solving coding puzzles to find the way home!",
    duration: 6000,
    animation: 'pan-right',
  },
  {
    id: 4,
    image: introQuest,
    text: "Will you help BaoBao reunite with Mommy Dragon? The adventure begins now!",
    duration: 6000,
    animation: 'zoom',
  },
];

const StoryScreen: React.FC = () => {
  const navigate = useNavigate();
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const frame = storyFrames[currentFrame];

  const goToNextFrame = useCallback(() => {
    if (currentFrame < storyFrames.length - 1) {
      setIsTransitioning(true);
      setShowSubtitle(false);
      
      setTimeout(() => {
        setCurrentFrame(prev => prev + 1);
        setIsTransitioning(false);
      }, 1500);
    } else {
      setIsComplete(true);
      setTimeout(() => {
        navigate('/quest-map');
      }, 2000);
    }
  }, [currentFrame, navigate]);

  // Auto-advance frames
  useEffect(() => {
    if (isComplete) return;

    // Show subtitle after a brief delay
    const subtitleTimer = setTimeout(() => {
      setShowSubtitle(true);
    }, 500);

    // Auto-advance to next frame
    const advanceTimer = setTimeout(() => {
      goToNextFrame();
    }, frame.duration);

    return () => {
      clearTimeout(subtitleTimer);
      clearTimeout(advanceTimer);
    };
  }, [currentFrame, frame.duration, goToNextFrame, isComplete]);

  const handleSkip = () => {
    navigate('/quest-map');
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
          isTransitioning ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <img
          key={frame.id}
          src={frame.image}
          alt={`Story scene ${frame.id}`}
          className={`w-full h-full object-cover ${getAnimationClass(frame.animation)}`}
        />
        {/* Darkening overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/40" />
      </div>

      {/* Skip button */}
      <Button
        variant="ghost"
        className="absolute top-4 right-4 z-50 text-white/80 hover:text-white hover:bg-white/10"
        onClick={handleSkip}
      >
        Skip Story →
      </Button>

      {/* Progress indicator */}
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

      {/* Subtitle area */}
      <div className="absolute bottom-0 left-0 right-0 z-40 p-8 pb-16">
        <div 
          className={`max-w-3xl mx-auto transition-all duration-700 ${
            showSubtitle && !isTransitioning 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="bg-black/60 backdrop-blur-md rounded-2xl px-8 py-6 border border-white/10">
            <p className="text-center text-xl md:text-2xl lg:text-3xl text-white font-body leading-relaxed">
              {frame.text}
            </p>
          </div>
        </div>
      </div>

      {/* Completion overlay */}
      {isComplete && (
        <div className="absolute inset-0 z-50 bg-black/80 flex items-center justify-center animate-cinematic-fade">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-display text-primary mb-4 animate-glow-pulse">
              The Quest Begins...
            </h2>
          </div>
        </div>
      )}

      {/* Magical particles overlay */}
      <div className="absolute inset-0 pointer-events-none z-30">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-primary/60 rounded-full animate-magic-particles"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default StoryScreen;
