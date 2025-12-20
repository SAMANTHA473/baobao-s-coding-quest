import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface GameState {
  playerName: string;
  coins: number;
  currentLevel: number;
  currentLocation: 'forest' | 'desert' | 'castle';
  completedLevels: number[];
  completedAdventures: ('forest' | 'desert' | 'castle')[];
  inventory: string[];
  soundEnabled: boolean;
  musicEnabled: boolean;
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
  toggleMusic: () => void;
  setMusicVolume: (volume: number) => void;
  markAdventureComplete: (location: 'forest' | 'desert' | 'castle') => void;
  isAdventureComplete: (location: 'forest' | 'desert' | 'castle') => boolean;
  resetGame: () => void;
}

const STORAGE_KEY = 'baobao-quest-state';

const loadSavedState = (): Partial<GameState> => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.log('Failed to load saved state');
  }
  return {};
};

const initialState: GameState = {
  playerName: '',
  coins: 50,
  currentLevel: 1,
  currentLocation: 'forest',
  completedLevels: [],
  completedAdventures: [],
  inventory: [],
  soundEnabled: true,
  musicEnabled: true,
  musicVolume: 70,
  ...loadSavedState(),
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [gameState, setGameState] = useState<GameState>(initialState);

  // Persist state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(gameState));
    } catch (e) {
      console.log('Failed to save state');
    }
  }, [gameState]);

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

  const toggleMusic = () => {
    setGameState(prev => ({ ...prev, musicEnabled: !prev.musicEnabled }));
  };

  const setMusicVolume = (volume: number) => {
    setGameState(prev => ({ ...prev, musicVolume: volume }));
  };

  const markAdventureComplete = (location: 'forest' | 'desert' | 'castle') => {
    setGameState(prev => ({
      ...prev,
      completedAdventures: [...new Set([...prev.completedAdventures, location])],
    }));
  };

  const isAdventureComplete = (location: 'forest' | 'desert' | 'castle'): boolean => {
    return gameState.completedAdventures.includes(location);
  };

  const resetGame = () => {
    const resetState = {
      ...initialState,
      playerName: gameState.playerName,
      soundEnabled: gameState.soundEnabled,
      musicEnabled: gameState.musicEnabled,
      musicVolume: gameState.musicVolume,
      completedAdventures: [],
    };
    setGameState(resetState);
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
        toggleMusic,
        setMusicVolume,
        markAdventureComplete,
        isAdventureComplete,
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
