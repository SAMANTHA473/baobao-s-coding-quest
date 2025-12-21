import { useCallback, useRef, useEffect } from 'react';

interface NarrationOptions {
  text: string;
  onStart?: () => void;
  onEnd?: () => void;
  rate?: number;
  pitch?: number;
  volume?: number;
}

export const useNarration = () => {
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const isPlayingRef = useRef(false);

  // Get a warm, gentle voice
  const getVoice = useCallback((): SpeechSynthesisVoice | null => {
    const voices = speechSynthesis.getVoices();
    // Prefer female voices for warm storytelling tone
    const preferredVoices = [
      'Samantha', // macOS
      'Microsoft Zira', // Windows
      'Google UK English Female', // Chrome
      'Karen', // macOS
      'Victoria', // macOS
      'Moira', // macOS Irish
    ];

    for (const preferred of preferredVoices) {
      const voice = voices.find(v => v.name.includes(preferred));
      if (voice) return voice;
    }

    // Fallback to any English female voice
    const femaleVoice = voices.find(
      v => v.lang.startsWith('en') && v.name.toLowerCase().includes('female')
    );
    if (femaleVoice) return femaleVoice;

    // Fallback to any English voice
    const englishVoice = voices.find(v => v.lang.startsWith('en'));
    return englishVoice || voices[0] || null;
  }, []);

  const speak = useCallback(({ text, onStart, onEnd, rate = 0.85, pitch = 1.1, volume = 1 }: NarrationOptions) => {
    // Cancel any ongoing speech
    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utteranceRef.current = utterance;

    // Set voice properties for warm, gentle storytelling
    const voice = getVoice();
    if (voice) {
      utterance.voice = voice;
    }

    utterance.rate = rate; // Slower for storytelling
    utterance.pitch = pitch; // Slightly higher for warmth
    utterance.volume = volume;

    utterance.onstart = () => {
      isPlayingRef.current = true;
      onStart?.();
    };

    utterance.onend = () => {
      isPlayingRef.current = false;
      onEnd?.();
    };

    utterance.onerror = () => {
      isPlayingRef.current = false;
      onEnd?.();
    };

    // Small delay to ensure voice is ready
    setTimeout(() => {
      speechSynthesis.speak(utterance);
    }, 100);

    return utterance;
  }, [getVoice]);

  const stop = useCallback(() => {
    speechSynthesis.cancel();
    isPlayingRef.current = false;
  }, []);

  const pause = useCallback(() => {
    speechSynthesis.pause();
  }, []);

  const resume = useCallback(() => {
    speechSynthesis.resume();
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      speechSynthesis.cancel();
    };
  }, []);

  // Load voices (they may not be immediately available)
  useEffect(() => {
    const loadVoices = () => {
      speechSynthesis.getVoices();
    };
    
    loadVoices();
    speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  return {
    speak,
    stop,
    pause,
    resume,
    isPlaying: isPlayingRef.current,
  };
};
