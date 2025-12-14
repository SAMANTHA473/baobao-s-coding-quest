import React from 'react';
import { useGame } from '@/contexts/GameContext';
import { cn } from '@/lib/utils';

interface CoinDisplayProps {
  className?: string;
}

export const CoinDisplay: React.FC<CoinDisplayProps> = ({ className }) => {
  const { gameState } = useGame();

  return (
    <div
      className={cn(
        'flex items-center gap-2 bg-gradient-to-r from-amber-400 to-yellow-500 px-4 py-2 rounded-full shadow-lg',
        className
      )}
    >
      <span className="text-2xl">🪙</span>
      <span className="font-display font-bold text-amber-900 text-lg">
        {gameState.coins}
      </span>
    </div>
  );
};
