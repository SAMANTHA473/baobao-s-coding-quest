import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { useGame } from '@/contexts/GameContext';
import { useAudio } from '@/contexts/AudioContext';
import { ArrowLeft, Volume2, VolumeX, Music, Settings, Music2 } from 'lucide-react';

const SettingsScreen: React.FC = () => {
  const navigate = useNavigate();
  const { gameState, toggleSound, toggleMusic, setMusicVolume, resetGame } = useGame();
  const { playSound } = useAudio();

  const handleToggleSound = () => {
    toggleSound();
    if (!gameState.soundEnabled) {
      // Will play after toggle (was off, now on)
      setTimeout(() => playSound('click'), 50);
    }
  };

  const handleToggleMusic = () => {
    toggleMusic();
    playSound('click');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 via-gray-50 to-slate-100 flex flex-col p-4 md:p-6 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 text-5xl opacity-20">⚙️</div>
        <div className="absolute top-32 right-16 text-4xl opacity-15">🔧</div>
        <div className="absolute bottom-40 left-20 text-6xl opacity-10">⚡</div>
      </div>

      {/* Header */}
      <div className="flex items-center gap-4 mb-8 relative z-10 animate-slide-down">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            playSound('click');
            navigate('/home');
          }}
          className="text-foreground"
        >
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <h1 className="font-display text-2xl font-bold flex items-center gap-2">
          <Settings className="w-6 h-6" />
          SETTINGS
        </h1>
      </div>

      {/* Settings content */}
      <div className="flex-1 max-w-md mx-auto w-full space-y-6 relative z-10">
        {/* Sound Effects toggle */}
        <div className="card-fantasy animate-slide-up">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {gameState.soundEnabled ? (
                <Volume2 className="w-6 h-6 text-primary" />
              ) : (
                <VolumeX className="w-6 h-6 text-muted-foreground" />
              )}
              <div>
                <h3 className="font-display font-bold text-foreground">Sound Effects</h3>
                <p className="font-body text-sm text-muted-foreground">
                  Toggle game sound effects
                </p>
              </div>
            </div>
            <Switch
              checked={gameState.soundEnabled}
              onCheckedChange={handleToggleSound}
            />
          </div>
        </div>

        {/* Background Music toggle */}
        <div className="card-fantasy animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {gameState.musicEnabled ? (
                <Music className="w-6 h-6 text-primary" />
              ) : (
                <Music2 className="w-6 h-6 text-muted-foreground" />
              )}
              <div>
                <h3 className="font-display font-bold text-foreground">Background Music</h3>
                <p className="font-body text-sm text-muted-foreground">
                  Toggle background music
                </p>
              </div>
            </div>
            <Switch
              checked={gameState.musicEnabled}
              onCheckedChange={handleToggleMusic}
            />
          </div>
        </div>

        {/* Music volume */}
        <div className="card-fantasy animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center gap-3 mb-4">
            <Music className="w-6 h-6 text-primary" />
            <div>
              <h3 className="font-display font-bold text-foreground">Music Volume</h3>
              <p className="font-body text-sm text-muted-foreground">
                Adjust background music level
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">🔈</span>
            <Slider
              value={[gameState.musicVolume]}
              onValueChange={(value) => setMusicVolume(value[0])}
              max={100}
              step={1}
              className="flex-1"
              disabled={!gameState.musicEnabled}
            />
            <span className="text-sm text-muted-foreground">🔊</span>
          </div>
          <p className="text-center font-body text-sm text-muted-foreground mt-2">
            {gameState.musicVolume}%
          </p>
        </div>

        {/* Player info */}
        <div className="card-fantasy animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <h3 className="font-display font-bold text-foreground mb-4">Player Info</h3>
          <div className="space-y-2 font-body text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Name:</span>
              <span className="font-semibold">{gameState.playerName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Current Level:</span>
              <span className="font-semibold">{gameState.currentLevel}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Levels Completed:</span>
              <span className="font-semibold">{gameState.completedLevels.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Coins:</span>
              <span className="font-semibold">{gameState.coins} 🪙</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Items Owned:</span>
              <span className="font-semibold">{gameState.inventory.length}</span>
            </div>
          </div>
        </div>

        {/* Reset game */}
        <div className="card-fantasy animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <h3 className="font-display font-bold text-foreground mb-2">Reset Progress</h3>
          <p className="font-body text-sm text-muted-foreground mb-4">
            Start a new adventure from the beginning. This will reset all progress but keep your name.
          </p>
          <Button
            variant="destructive"
            className="w-full"
            onClick={() => {
              playSound('click');
              if (confirm('Are you sure you want to reset all progress?')) {
                resetGame();
              }
            }}
          >
            Reset Game
          </Button>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 text-center relative z-10 animate-fade-in">
        <Button variant="outline" onClick={() => {
          playSound('click');
          navigate('/home');
        }}>
          ← Back to Home
        </Button>
        <p className="font-body text-xs text-muted-foreground mt-4">
          BAOBAO'S QUEST v1.0 • Made with ❤️ for young coders
        </p>
      </div>
    </div>
  );
};

export default SettingsScreen;
