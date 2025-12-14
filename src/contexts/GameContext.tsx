import React, { createContext, useContext, useState, ReactNode } from 'react';

interface GameState {
  playerName: string;
  coins: number;
  currentLevel: number;
  currentLocation: 'forest' | 'desert' | 'castle';
  completedLevels: number[];
  inventory: string[];
  soundEnabled: boolean;
  musicVolume: number;
}

interface GameContextType {
  gameState: GameState;
  setPlayerName: (name: string) => void;
  addCoins: (amount: number) => void;
  spendCoins: (amount: number) => boolean;
  completeLevel: (level: number) => void;
  setCurrentLevel: (level: number) => void;
  setCurrentLocation: (location: 'forest' | 'desert' | 'castle') => void;
  addToInventory: (item: string) => void;
  toggleSound: () => void;
  setMusicVolume: (volume: number) => void;
  resetGame: () => void;
}

const initialState: GameState = {
  playerName: '',
  coins: 50,
  currentLevel: 1,
  currentLocation: 'forest',
  completedLevels: [],
  inventory: [],
  soundEnabled: true,
  musicVolume: 70,
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [gameState, setGameState] = useState<GameState>(initialState);

  const setPlayerName = (name: string) => {
    setGameState(prev => ({ ...prev, playerName: name }));
  };

  const addCoins = (amount: number) => {
    setGameState(prev => ({ ...prev, coins: prev.coins + amount }));
  };

  const spendCoins = (amount: number): boolean => {
    if (gameState.coins >= amount) {
      setGameState(prev => ({ ...prev, coins: prev.coins - amount }));
      return true;
    }
    return false;
  };

  const completeLevel = (level: number) => {
    setGameState(prev => ({
      ...prev,
      completedLevels: [...new Set([...prev.completedLevels, level])],
      coins: prev.coins + 20,
    }));
  };

  const setCurrentLevel = (level: number) => {
    setGameState(prev => ({ ...prev, currentLevel: level }));
  };

  const setCurrentLocation = (location: 'forest' | 'desert' | 'castle') => {
    setGameState(prev => ({ ...prev, currentLocation: location }));
  };

  const addToInventory = (item: string) => {
    setGameState(prev => ({
      ...prev,
      inventory: [...prev.inventory, item],
    }));
  };

  const toggleSound = () => {
    setGameState(prev => ({ ...prev, soundEnabled: !prev.soundEnabled }));
  };

  const setMusicVolume = (volume: number) => {
    setGameState(prev => ({ ...prev, musicVolume: volume }));
  };

  const resetGame = () => {
    setGameState({ ...initialState, playerName: gameState.playerName });
  };

  return (
    <GameContext.Provider
      value={{
        gameState,
        setPlayerName,
        addCoins,
        spendCoins,
        completeLevel,
        setCurrentLevel,
        setCurrentLocation,
        addToInventory,
        toggleSound,
        setMusicVolume,
        resetGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
