import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BaoBaoCharacter } from '@/components/game/BaoBaoCharacter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useGame } from '@/contexts/GameContext';

const WelcomeScreen: React.FC = () => {
  const [name, setName] = useState('');
  const { setPlayerName } = useGame();
  const navigate = useNavigate();

  const handleStart = () => {
    if (name.trim()) {
      setPlayerName(name.trim());
      navigate('/story');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleStart();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-sky flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 text-6xl animate-float opacity-60">☁️</div>
        <div className="absolute top-20 right-20 text-5xl animate-float opacity-50" style={{ animationDelay: '1s' }}>☁️</div>
        <div className="absolute bottom-40 left-20 text-4xl animate-float opacity-40" style={{ animationDelay: '2s' }}>☁️</div>
        <div className="absolute bottom-20 right-10 text-5xl animate-float opacity-50" style={{ animationDelay: '0.5s' }}>☁️</div>
        
        {/* Floating stars */}
        <div className="absolute top-32 left-1/4 text-3xl animate-sparkle">⭐</div>
        <div className="absolute top-48 right-1/4 text-2xl animate-sparkle" style={{ animationDelay: '0.7s' }}>✨</div>
        <div className="absolute bottom-48 left-1/3 text-2xl animate-sparkle" style={{ animationDelay: '1.2s' }}>⭐</div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center max-w-lg w-full">
        {/* Title */}
        <h1 className="font-display text-5xl md:text-6xl font-bold text-gradient-gold drop-shadow-lg mb-2 text-center animate-slide-down">
          BAOBAO'S QUEST
        </h1>
        <p className="font-display text-xl text-amber-100 mb-8 animate-fade-in">
          A Coding Adventure
        </p>

        {/* BaoBao Character */}
        <div className="animate-scale-in">
          <BaoBaoCharacter size="xl" animate emotion="excited" />
        </div>

        {/* Welcome card */}
        <div className="card-fantasy w-full mt-8 animate-slide-up">
          <p className="text-center text-lg text-foreground mb-6 font-body">
            Welcome to the Island! Enter your name to begin our adventure and help me find my mommy dragon! 🐉
          </p>

          <div className="space-y-4">
            <Input
              type="text"
              placeholder="Enter your name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyPress={handleKeyPress}
              maxLength={20}
              className="text-center text-xl"
            />

            <Button
              variant="adventure"
              size="xl"
              className="w-full"
              onClick={handleStart}
              disabled={!name.trim()}
            >
              Start Adventure! 🚀
            </Button>
          </div>
        </div>

        {/* Footer hint */}
        <p className="mt-6 text-sm text-sky-foreground/80 font-body animate-fade-in" style={{ animationDelay: '1s' }}>
          Learn to code while helping BaoBao on an epic journey!
        </p>
      </div>
    </div>
  );
};

export default WelcomeScreen;
