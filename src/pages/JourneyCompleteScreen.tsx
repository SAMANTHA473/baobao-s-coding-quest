import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { BaoBaoCharacter } from '@/components/game/BaoBaoCharacter';
import { MommyDragon } from '@/components/game/MommyDragon';
import { useGame } from '@/contexts/GameContext';
import { Trophy, Star, Sparkles, Home } from 'lucide-react';

const JourneyCompleteScreen: React.FC = () => {
  const navigate = useNavigate();
  const { gameState } = useGame();

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-200 via-orange-100 to-rose-200 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Celebration particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          >
            <Star 
              className="text-yellow-400 fill-yellow-400 opacity-80" 
              style={{ width: `${12 + Math.random() * 12}px` }}
            />
          </div>
        ))}
      </div>

      {/* Golden glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-amber-300/50 to-transparent rounded-full blur-3xl" />

      <div className="relative z-10 text-center max-w-2xl mx-auto">
        {/* Trophy */}
        <div className="mb-6 animate-bounce-gentle">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-full shadow-2xl">
            <Trophy className="w-12 h-12 text-white" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
          <span className="text-gradient-warm">Journey Complete!</span>
        </h1>

        <p className="text-xl text-muted-foreground mb-8">
          Congratulations, {gameState.playerName || 'Adventurer'}!
        </p>

        {/* Characters together */}
        <div className="flex items-end justify-center gap-2 mb-8">
          <MommyDragon size="md" className="drop-shadow-xl" />
          <BaoBaoCharacter size="lg" animate emotion="happy" className="drop-shadow-xl" />
        </div>

        {/* Stats card */}
        <div className="bg-card/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl border-2 border-primary/20 mb-8">
          <h2 className="text-xl font-display font-bold text-foreground mb-4 flex items-center justify-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            Your Adventure Stats
            <Sparkles className="w-5 h-5 text-primary" />
          </h2>
          
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-3 bg-forest/10 rounded-xl">
              <p className="text-2xl font-bold text-forest">30</p>
              <p className="text-sm text-muted-foreground">Levels Completed</p>
            </div>
            <div className="p-3 bg-desert/10 rounded-xl">
              <p className="text-2xl font-bold text-desert">3</p>
              <p className="text-sm text-muted-foreground">Locations Explored</p>
            </div>
            <div className="p-3 bg-primary/10 rounded-xl">
              <p className="text-2xl font-bold text-primary">{gameState.coins}</p>
              <p className="text-sm text-muted-foreground">Coins Earned</p>
            </div>
          </div>
        </div>

        {/* Message */}
        <p className="text-lg text-foreground mb-8 leading-relaxed">
          You helped BaoBao find Mommy Dragon by mastering debugging, loops, and syntax! 
          Your coding journey has just begun. Keep learning and exploring!
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            variant="adventure"
            size="lg"
            onClick={() => navigate('/home')}
            className="gap-2"
          >
            <Home className="w-5 h-5" />
            Return Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default JourneyCompleteScreen;
