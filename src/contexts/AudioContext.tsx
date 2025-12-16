import React, { createContext, useContext, useRef, useCallback, useEffect, ReactNode } from 'react';
import { useGame } from './GameContext';

type MusicTrack = 'home' | 'gameplay' | 'celebration' | 'story' | 'map';
type SoundEffect = 'click' | 'correct' | 'wrong' | 'hint' | 'confetti' | 'unlock' | 'coin' | 'levelUp';

interface AudioContextType {
  playSound: (effect: SoundEffect) => void;
  playMusic: (track: MusicTrack) => void;
  stopMusic: () => void;
  fadeOutMusic: (duration?: number) => void;
  fadeInMusic: (track: MusicTrack, duration?: number) => void;
}

const AudioContextInstance = createContext<AudioContextType | undefined>(undefined);

// Web Audio API context for generating sounds
let audioCtx: AudioContext | null = null;

const getAudioContext = () => {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return audioCtx;
};

// Generate simple tones as placeholder sound effects
const generateTone = (
  frequency: number,
  duration: number,
  type: OscillatorType = 'sine',
  volume: number = 0.3
) => {
  try {
    const ctx = getAudioContext();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);
    
    gainNode.gain.setValueAtTime(volume, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);
    
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + duration);
  } catch (e) {
    console.log('Audio not available');
  }
};

// Sound effect configurations
const soundEffects: Record<SoundEffect, () => void> = {
  click: () => generateTone(800, 0.1, 'sine', 0.2),
  correct: () => {
    generateTone(523.25, 0.15, 'sine', 0.3); // C5
    setTimeout(() => generateTone(659.25, 0.15, 'sine', 0.3), 100); // E5
    setTimeout(() => generateTone(783.99, 0.2, 'sine', 0.3), 200); // G5
  },
  wrong: () => {
    generateTone(200, 0.3, 'sawtooth', 0.2);
  },
  hint: () => {
    generateTone(440, 0.1, 'triangle', 0.2);
    setTimeout(() => generateTone(550, 0.15, 'triangle', 0.2), 100);
  },
  confetti: () => {
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        generateTone(800 + Math.random() * 400, 0.1, 'sine', 0.15);
      }, i * 80);
    }
  },
  unlock: () => {
    generateTone(392, 0.15, 'sine', 0.3); // G4
    setTimeout(() => generateTone(523.25, 0.15, 'sine', 0.3), 150); // C5
    setTimeout(() => generateTone(659.25, 0.15, 'sine', 0.3), 300); // E5
    setTimeout(() => generateTone(783.99, 0.25, 'sine', 0.3), 450); // G5
  },
  coin: () => {
    generateTone(987.77, 0.1, 'sine', 0.25); // B5
    setTimeout(() => generateTone(1318.51, 0.15, 'sine', 0.25), 80); // E6
  },
  levelUp: () => {
    const notes = [523.25, 587.33, 659.25, 783.99, 880, 987.77];
    notes.forEach((freq, i) => {
      setTimeout(() => generateTone(freq, 0.15, 'sine', 0.25), i * 100);
    });
  },
};

// Background music using Web Audio API (simple chord progressions)
const createMusicOscillators = (
  ctx: AudioContext,
  frequencies: number[],
  gainNode: GainNode
): OscillatorNode[] => {
  return frequencies.map(freq => {
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    osc.connect(gainNode);
    return osc;
  });
};

export const AudioProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { gameState } = useGame();
  const musicGainRef = useRef<GainNode | null>(null);
  const musicOscillatorsRef = useRef<OscillatorNode[]>([]);
  const currentTrackRef = useRef<MusicTrack | null>(null);
  const musicIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Music configurations - simple chord progressions
  const musicConfigs: Record<MusicTrack, { chords: number[][]; tempo: number }> = {
    home: {
      chords: [
        [261.63, 329.63, 392], // C major
        [293.66, 369.99, 440], // D minor
        [349.23, 440, 523.25], // F major
        [392, 493.88, 587.33], // G major
      ],
      tempo: 2000,
    },
    map: {
      chords: [
        [329.63, 415.30, 493.88], // E minor
        [349.23, 440, 523.25], // F major
        [392, 493.88, 587.33], // G major
        [261.63, 329.63, 392], // C major
      ],
      tempo: 2500,
    },
    gameplay: {
      chords: [
        [220, 277.18, 329.63], // A minor
        [246.94, 311.13, 369.99], // B diminished
        [261.63, 329.63, 392], // C major
        [329.63, 415.30, 493.88], // E minor
      ],
      tempo: 1800,
    },
    celebration: {
      chords: [
        [261.63, 329.63, 392], // C major
        [329.63, 415.30, 493.88], // E major
        [349.23, 440, 523.25], // F major
        [392, 493.88, 587.33], // G major
      ],
      tempo: 800,
    },
    story: {
      chords: [
        [261.63, 329.63, 392], // C major
        [220, 277.18, 329.63], // A minor
        [349.23, 440, 523.25], // F major
        [392, 493.88, 587.33], // G major
      ],
      tempo: 3000,
    },
  };

  const stopMusic = useCallback(() => {
    if (musicIntervalRef.current) {
      clearInterval(musicIntervalRef.current);
      musicIntervalRef.current = null;
    }
    musicOscillatorsRef.current.forEach(osc => {
      try {
        osc.stop();
      } catch (e) {
        // Already stopped
      }
    });
    musicOscillatorsRef.current = [];
    currentTrackRef.current = null;
  }, []);

  const playMusic = useCallback((track: MusicTrack) => {
    if (!gameState.musicEnabled) return;
    if (currentTrackRef.current === track) return;
    
    stopMusic();
    currentTrackRef.current = track;

    try {
      const ctx = getAudioContext();
      const config = musicConfigs[track];
      let chordIndex = 0;

      const gainNode = ctx.createGain();
      gainNode.connect(ctx.destination);
      gainNode.gain.setValueAtTime((gameState.musicVolume / 100) * 0.15, ctx.currentTime);
      musicGainRef.current = gainNode;

      const playChord = () => {
        if (!gameState.musicEnabled || currentTrackRef.current !== track) {
          stopMusic();
          return;
        }

        // Stop previous oscillators
        musicOscillatorsRef.current.forEach(osc => {
          try {
            osc.stop();
          } catch (e) {}
        });

        const chord = config.chords[chordIndex];
        const oscillators = createMusicOscillators(ctx, chord, gainNode);
        
        oscillators.forEach(osc => {
          osc.start();
          // Fade out before next chord
          setTimeout(() => {
            try {
              osc.stop();
            } catch (e) {}
          }, config.tempo - 100);
        });

        musicOscillatorsRef.current = oscillators;
        chordIndex = (chordIndex + 1) % config.chords.length;
      };

      playChord();
      musicIntervalRef.current = setInterval(playChord, config.tempo);
    } catch (e) {
      console.log('Music not available');
    }
  }, [gameState.musicEnabled, gameState.musicVolume, stopMusic]);

  const fadeOutMusic = useCallback((duration: number = 1000) => {
    if (musicGainRef.current) {
      const ctx = getAudioContext();
      musicGainRef.current.gain.linearRampToValueAtTime(0, ctx.currentTime + duration / 1000);
      setTimeout(stopMusic, duration);
    } else {
      stopMusic();
    }
  }, [stopMusic]);

  const fadeInMusic = useCallback((track: MusicTrack, duration: number = 1000) => {
    if (!gameState.musicEnabled) return;
    
    stopMusic();
    currentTrackRef.current = track;

    try {
      const ctx = getAudioContext();
      const config = musicConfigs[track];
      let chordIndex = 0;

      const gainNode = ctx.createGain();
      gainNode.connect(ctx.destination);
      gainNode.gain.setValueAtTime(0, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(
        (gameState.musicVolume / 100) * 0.15,
        ctx.currentTime + duration / 1000
      );
      musicGainRef.current = gainNode;

      const playChord = () => {
        if (!gameState.musicEnabled || currentTrackRef.current !== track) {
          stopMusic();
          return;
        }

        musicOscillatorsRef.current.forEach(osc => {
          try {
            osc.stop();
          } catch (e) {}
        });

        const chord = config.chords[chordIndex];
        const oscillators = createMusicOscillators(ctx, chord, gainNode);
        
        oscillators.forEach(osc => {
          osc.start();
          setTimeout(() => {
            try {
              osc.stop();
            } catch (e) {}
          }, config.tempo - 100);
        });

        musicOscillatorsRef.current = oscillators;
        chordIndex = (chordIndex + 1) % config.chords.length;
      };

      playChord();
      musicIntervalRef.current = setInterval(playChord, config.tempo);
    } catch (e) {
      console.log('Music not available');
    }
  }, [gameState.musicEnabled, gameState.musicVolume, stopMusic]);

  const playSound = useCallback((effect: SoundEffect) => {
    if (!gameState.soundEnabled) return;
    soundEffects[effect]();
  }, [gameState.soundEnabled]);

  // Update music volume when settings change
  useEffect(() => {
    if (musicGainRef.current) {
      const ctx = getAudioContext();
      musicGainRef.current.gain.setValueAtTime(
        (gameState.musicVolume / 100) * 0.15,
        ctx.currentTime
      );
    }
  }, [gameState.musicVolume]);

  // Stop music when disabled
  useEffect(() => {
    if (!gameState.musicEnabled) {
      stopMusic();
    }
  }, [gameState.musicEnabled, stopMusic]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopMusic();
    };
  }, [stopMusic]);

  return (
    <AudioContextInstance.Provider value={{ playSound, playMusic, stopMusic, fadeOutMusic, fadeInMusic }}>
      {children}
    </AudioContextInstance.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContextInstance);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};
