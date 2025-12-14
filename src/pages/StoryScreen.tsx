import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BaoBaoCharacter } from '@/components/game/BaoBaoCharacter';
import { MommyDragon } from '@/components/game/MommyDragon';
import { Button } from '@/components/ui/button';

const storyFrames = [
  {
    id: 1,
    text: "In the magical Dragon Island, little BaoBao lived happily with Mommy Dragon...",
    showBoth: true,
    baobaoEmotion: 'happy' as const,
  },
  {
    id: 2,
    text: "One stormy night, a great wind swept through the island, separating BaoBao from Mommy...",
    showBoth: false,
    baobaoEmotion: 'sad' as const,
  },
  {
    id: 3,
    text: "Now BaoBao must journey through enchanted lands, solving coding puzzles to find the way home!",
    showBoth: false,
    baobaoEmotion: 'thinking' as const,
  },
  {
    id: 4,
    text: "Will you help BaoBao reunite with Mommy Dragon? The adventure begins now!",
    showBoth: false,
    baobaoEmotion: 'excited' as const,
  },
];

const StoryScreen: React.FC = () => {
  const navigate = useNavigate();
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [displayedText, setDisplayedText] = useState('');

  const frame = storyFrames[currentFrame];

  // Typewriter effect
  useEffect(() => {
    setIsTyping(true);
    setDisplayedText('');
    let index = 0;
    const text = frame.text;

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
  }, [currentFrame, frame.text]);

  const handleNext = () => {
    if (isTyping) {
      setDisplayedText(frame.text);
      setIsTyping(false);
    } else if (currentFrame < storyFrames.length - 1) {
      setCurrentFrame((prev) => prev + 1);
    } else {
      navigate('/quest-map');
    }
  };

  const handleSkip = () => {
    navigate('/quest-map');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-900 via-purple-900 to-slate-900 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Stars background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-sparkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              opacity: Math.random() * 0.8 + 0.2,
            }}
          />
        ))}
      </div>

      {/* Skip button */}
      <Button
        variant="ghost"
        className="absolute top-4 right-4 text-white/60 hover:text-white"
        onClick={handleSkip}
      >
        Skip Story →
      </Button>

      {/* Story content */}
      <div className="relative z-10 flex flex-col items-center max-w-2xl w-full">
        {/* Characters */}
        <div className="flex items-end justify-center gap-8 mb-8 min-h-[280px]">
          {frame.showBoth ? (
            <>
              <div className="animate-slide-up">
                <MommyDragon size="lg" className="opacity-90" />
              </div>
              <div className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
                <BaoBaoCharacter size="lg" emotion={frame.baobaoEmotion} />
              </div>
            </>
          ) : currentFrame === 1 ? (
            <>
              <div className="animate-fade-in opacity-30 blur-sm transform -translate-x-20">
                <MommyDragon size="md" />
              </div>
              <div className="animate-slide-up">
                <BaoBaoCharacter size="lg" emotion={frame.baobaoEmotion} />
              </div>
            </>
          ) : (
            <div className="animate-scale-in">
              <BaoBaoCharacter size="xl" emotion={frame.baobaoEmotion} />
            </div>
          )}
        </div>

        {/* Story frame */}
        <div className="w-full bg-slate-800/60 backdrop-blur-md rounded-3xl border-2 border-amber-400/30 p-8 shadow-2xl">
          {/* Progress dots */}
          <div className="flex justify-center gap-2 mb-6">
            {storyFrames.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentFrame
                    ? 'bg-primary scale-125'
                    : index < currentFrame
                    ? 'bg-primary/50'
                    : 'bg-white/20'
                }`}
              />
            ))}
          </div>

          {/* Story text */}
          <p className="text-center text-xl md:text-2xl text-white font-body leading-relaxed min-h-[80px]">
            {displayedText}
            {isTyping && <span className="animate-pulse">|</span>}
          </p>

          {/* Action button */}
          <div className="mt-8 flex justify-center">
            <Button
              variant="adventure"
              size="lg"
              onClick={handleNext}
              className="min-w-[200px]"
            >
              {isTyping
                ? 'Skip ⏭️'
                : currentFrame < storyFrames.length - 1
                ? 'Continue →'
                : 'Begin Quest! 🗺️'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryScreen;
