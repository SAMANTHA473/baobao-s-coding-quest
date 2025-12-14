import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CoinDisplay } from '@/components/game/CoinDisplay';
import { useGame } from '@/contexts/GameContext';
import { getPuzzleByLevel } from '@/data/puzzles';
import { ArrowLeft, Lightbulb, TreeDeciduous } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AdventureScreen: React.FC = () => {
  const navigate = useNavigate();
  const { gameState, spendCoins, completeLevel, setCurrentLevel } = useGame();
  const { toast } = useToast();
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState<'success' | 'failure' | null>(null);
  const [showHint, setShowHint] = useState(false);

  const currentPuzzle = getPuzzleByLevel(gameState.currentLevel);

  if (!currentPuzzle) {
    return (
      <div className="min-h-screen bg-gradient-forest flex items-center justify-center p-6">
        <div className="card-fantasy text-center">
          <h2 className="font-display text-2xl font-bold mb-4">🎉 All Levels Complete!</h2>
          <p className="font-body mb-6">You've mastered the Forest of Bugs!</p>
          <Button variant="adventure" onClick={() => navigate('/home')}>
            Return Home
          </Button>
        </div>
      </div>
    );
  }

  const handleHint = () => {
    if (gameState.coins >= 10) {
      const success = spendCoins(10);
      if (success) {
        setShowHint(true);
        toast({
          title: 'Hint Unlocked! 💡',
          description: currentPuzzle.hint,
        });
      }
    } else {
      toast({
        title: 'Not enough coins!',
        description: 'You need 10 coins to unlock a hint.',
        variant: 'destructive',
      });
    }
  };

  const handleSubmit = () => {
    if (selectedAnswer === null) return;

    if (selectedAnswer === currentPuzzle.correctAnswer) {
      setShowResult('success');
      completeLevel(currentPuzzle.level);
    } else {
      setShowResult('failure');
    }
  };

  const handleContinue = () => {
    if (showResult === 'success') {
      setCurrentLevel(gameState.currentLevel + 1);
    }
    setShowResult(null);
    setSelectedAnswer(null);
    setShowHint(false);
  };

  const locationData = {
    forest: { name: 'FOREST OF BUGS', icon: TreeDeciduous, gradient: 'from-emerald-600 to-green-800' },
  };

  const location = locationData[currentPuzzle.location];

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-100 via-green-50 to-emerald-100 flex flex-col p-4 md:p-6 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 text-5xl opacity-30">🌲</div>
        <div className="absolute top-32 right-16 text-4xl opacity-25">🌳</div>
        <div className="absolute bottom-40 left-20 text-6xl opacity-20">🌿</div>
        <div className="absolute bottom-20 right-10 text-4xl opacity-30">🍃</div>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between mb-4 relative z-10">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate('/home')}
          className="text-foreground"
        >
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <CoinDisplay />
      </div>

      {/* Progress Tracker */}
      <div className={`bg-gradient-to-r ${location.gradient} rounded-2xl p-4 mb-6 relative z-10 animate-slide-down`}>
        <div className="flex items-center justify-between text-white">
          <div className="flex items-center gap-3">
            <location.icon className="w-8 h-8" />
            <div>
              <h2 className="font-display text-lg font-bold">{location.name}</h2>
              <p className="font-body text-sm opacity-80">Help BaoBao fix the bugs!</p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-display text-2xl font-bold">Level {currentPuzzle.level}</p>
            <p className="font-body text-sm opacity-80">of 10</p>
          </div>
        </div>
        {/* Progress bar */}
        <div className="mt-3 h-2 bg-white/30 rounded-full overflow-hidden">
          <div
            className="h-full bg-white rounded-full transition-all duration-500"
            style={{ width: `${(currentPuzzle.level / 10) * 100}%` }}
          />
        </div>
      </div>

      {/* Challenge Window */}
      <div className="flex-1 card-fantasy relative z-10 animate-scale-in flex flex-col">
        {/* Puzzle title */}
        <div className="mb-4">
          <h3 className="font-display text-xl font-bold text-foreground">{currentPuzzle.title}</h3>
          <p className="font-body text-muted-foreground">{currentPuzzle.description}</p>
        </div>

        {/* Code block */}
        <div className="bg-slate-900 rounded-xl p-4 mb-6 overflow-x-auto">
          <pre className="font-mono text-sm text-emerald-400 whitespace-pre-wrap">
            {currentPuzzle.code}
          </pre>
        </div>

        {/* Options */}
        <div className="space-y-3 flex-1">
          {currentPuzzle.options.map((option, index) => (
            <button
              key={index}
              onClick={() => setSelectedAnswer(index)}
              className={`
                w-full p-4 rounded-xl border-2 text-left font-body transition-all duration-300
                ${
                  selectedAnswer === index
                    ? 'border-primary bg-primary/10 shadow-md'
                    : 'border-border bg-card hover:border-primary/50 hover:bg-muted'
                }
              `}
            >
              <span className="font-display font-bold mr-3 text-primary">
                {String.fromCharCode(65 + index)}.
              </span>
              {option}
            </button>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex gap-4 mt-6">
          <Button
            variant="outline"
            className="flex-1"
            onClick={handleHint}
            disabled={showHint}
          >
            <Lightbulb className="w-5 h-5 mr-2" />
            Hint (10 🪙)
          </Button>
          <Button
            variant="adventure"
            className="flex-1"
            onClick={handleSubmit}
            disabled={selectedAnswer === null}
          >
            Submit Answer
          </Button>
        </div>

        {/* Hint display */}
        {showHint && (
          <div className="mt-4 p-4 bg-amber-100 border-2 border-amber-400 rounded-xl animate-slide-up">
            <p className="font-body text-amber-800">
              💡 <strong>Hint:</strong> {currentPuzzle.hint}
            </p>
          </div>
        )}
      </div>

      {/* Result Modal */}
      {showResult && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6 animate-fade-in">
          <div className="card-fantasy max-w-md w-full text-center animate-scale-in">
            {showResult === 'success' ? (
              <>
                <div className="text-6xl mb-4">🎉</div>
                <h2 className="font-display text-3xl font-bold text-gradient-gold mb-2">
                  CONGRATS!
                </h2>
                <p className="font-display text-xl text-foreground mb-4">
                  YOUR ANSWER IS RIGHT!
                </p>
                <div className="bg-secondary/20 rounded-xl p-4 mb-4">
                  <p className="font-body text-secondary-foreground">
                    {currentPuzzle.explanation}
                  </p>
                </div>
                <p className="font-body text-muted-foreground mb-6">
                  +20 coins earned! 🪙
                </p>
                <Button variant="adventure" size="lg" onClick={handleContinue}>
                  Continue to Level {currentPuzzle.level + 1} →
                </Button>
              </>
            ) : (
              <>
                <div className="text-6xl mb-4">😅</div>
                <h2 className="font-display text-3xl font-bold text-destructive mb-2">
                  OOPS!
                </h2>
                <p className="font-display text-xl text-foreground mb-6">
                  YOUR ANSWER IS WRONG!
                </p>
                <Button variant="coral" size="lg" onClick={handleContinue}>
                  Retry Level {currentPuzzle.level} 🔄
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdventureScreen;
