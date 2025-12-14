import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { BaoBaoCharacter } from '@/components/game/BaoBaoCharacter';
import { CoinDisplay } from '@/components/game/CoinDisplay';
import { useGame } from '@/contexts/GameContext';
import { Gamepad2, ShoppingBag, Settings } from 'lucide-react';

const HomeScreen: React.FC = () => {
  const navigate = useNavigate();
  const { gameState } = useGame();

  const menuItems = [
    {
      id: 'adventure',
      label: 'Game Adventure',
      icon: Gamepad2,
      variant: 'adventure' as const,
      path: '/adventure',
      emoji: '🎮',
    },
    {
      id: 'store',
      label: 'Store',
      icon: ShoppingBag,
      variant: 'forest' as const,
      path: '/shop',
      emoji: '🛒',
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      variant: 'sky' as const,
      path: '/settings',
      emoji: '⚙️',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-100 via-orange-50 to-yellow-100 flex flex-col items-center p-6 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-secondary/10 rounded-full blur-3xl" />
        <div className="absolute top-20 right-10 text-4xl animate-float">🌟</div>
        <div className="absolute bottom-32 left-10 text-3xl animate-float" style={{ animationDelay: '1s' }}>✨</div>
        <div className="absolute top-1/3 left-1/4 text-2xl animate-sparkle">⭐</div>
      </div>

      {/* Header with coins */}
      <div className="w-full max-w-lg flex justify-end mb-4 relative z-10 animate-slide-down">
        <CoinDisplay />
      </div>

      {/* Welcome message */}
      <div className="relative z-10 text-center mb-6 animate-slide-down">
        <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">
          Welcome aboard, <span className="text-gradient-gold">{gameState.playerName}</span>!
        </h1>
        <p className="font-body text-lg text-muted-foreground mt-2">
          The magic of Dragon Island awaits! ✨
        </p>
      </div>

      {/* BaoBao */}
      <div className="relative z-10 mb-8 animate-scale-in">
        <BaoBaoCharacter size="lg" emotion="happy" />
      </div>

      {/* Menu buttons */}
      <div className="w-full max-w-md space-y-4 relative z-10">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Button
                variant={item.variant}
                size="xl"
                className="w-full justify-between px-8"
                onClick={() => navigate(item.path)}
              >
                <div className="flex items-center gap-4">
                  <Icon className="w-6 h-6" />
                  <span>{item.label}</span>
                </div>
                <span className="text-2xl">{item.emoji}</span>
              </Button>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="mt-auto pt-8 relative z-10 animate-fade-in" style={{ animationDelay: '0.5s' }}>
        <p className="font-body text-sm text-muted-foreground text-center">
          Progress: Level {gameState.currentLevel} / 30 • {gameState.completedLevels.length} levels completed
        </p>
      </div>
    </div>
  );
};

export default HomeScreen;
