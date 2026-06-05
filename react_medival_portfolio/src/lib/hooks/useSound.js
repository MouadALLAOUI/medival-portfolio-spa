import { useCallback, useRef } from 'react';
import { useSettings } from '../useSettings';

const audioCtxRef = { current: null };

const getAudioContext = () => {
  if (!audioCtxRef.current) {
    audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
  }
  return audioCtxRef.current;
};

const resumeContext = async () => {
  const ctx = getAudioContext();
  if (ctx.state === 'suspended') {
    await ctx.resume();
  }
  return ctx;
};

// Quill scratching: filtered noise burst
const playQuillScratch = async () => {
  const ctx = await resumeContext();
  const duration = 0.08;
  const bufferSize = ctx.sampleRate * duration;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);

  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * 0.3;
  }

  const source = ctx.createBufferSource();
  source.buffer = buffer;

  const filter = ctx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.value = 3000 + Math.random() * 2000;
  filter.Q.value = 2;

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.06, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

  source.connect(filter).connect(gain).connect(ctx.destination);
  source.start(ctx.currentTime);
  source.stop(ctx.currentTime + duration);
};

// Paper rustling: multiple short noise bursts
const playPaperRustle = async () => {
  const ctx = await resumeContext();
  const bursts = 3 + Math.floor(Math.random() * 2);

  for (let b = 0; b < bursts; b++) {
    const duration = 0.04 + Math.random() * 0.04;
    const bufferSize = ctx.sampleRate * duration;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.2;
    }

    const source = ctx.createBufferSource();
    source.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.value = 1500 + Math.random() * 3000;

    const gain = ctx.createGain();
    const start = ctx.currentTime + b * 0.035;
    gain.gain.setValueAtTime(0.04, start);
    gain.gain.exponentialRampToValueAtTime(0.001, start + duration);

    source.connect(filter).connect(gain).connect(ctx.destination);
    source.start(start);
    source.stop(start + duration);
  }
};

// Metallic clink: short sine burst with quick decay
const playMetallicClink = async () => {
  const ctx = await resumeContext();
  const duration = 0.12;

  const osc1 = ctx.createOscillator();
  osc1.type = 'sine';
  osc1.frequency.value = 2800 + Math.random() * 600;

  const osc2 = ctx.createOscillator();
  osc2.type = 'sine';
  osc2.frequency.value = 5200 + Math.random() * 800;

  const gain1 = ctx.createGain();
  gain1.gain.setValueAtTime(0.08, ctx.currentTime);
  gain1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

  const gain2 = ctx.createGain();
  gain2.gain.setValueAtTime(0.04, ctx.currentTime);
  gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration * 0.6);

  osc1.connect(gain1).connect(ctx.destination);
  osc2.connect(gain2).connect(ctx.destination);

  osc1.start(ctx.currentTime);
  osc1.stop(ctx.currentTime + duration);
  osc2.start(ctx.currentTime);
  osc2.stop(ctx.currentTime + duration);
};

// Button click: soft thud
const playButtonPress = async () => {
  const ctx = await resumeContext();
  const duration = 0.1;

  const osc = ctx.createOscillator();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(300, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + duration);

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.06, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

  osc.connect(gain).connect(ctx.destination);
  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + duration);
};

// Compass spin: whoosh
const playCompassSpin = async () => {
  const ctx = await resumeContext();
  const duration = 0.4;

  const bufferSize = ctx.sampleRate * duration;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);

  for (let i = 0; i < bufferSize; i++) {
    const t = i / bufferSize;
    data[i] = (Math.random() * 2 - 1) * 0.15 * Math.sin(t * Math.PI);
  }

  const source = ctx.createBufferSource();
  source.buffer = buffer;

  const filter = ctx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.setValueAtTime(800, ctx.currentTime);
  filter.frequency.linearRampToValueAtTime(2000, ctx.currentTime + duration * 0.3);
  filter.frequency.linearRampToValueAtTime(400, ctx.currentTime + duration);
  filter.Q.value = 1.5;

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.08, ctx.currentTime);
  gain.gain.linearRampToValueAtTime(0.03, ctx.currentTime + duration * 0.3);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

  source.connect(filter).connect(gain).connect(ctx.destination);
  source.start(ctx.currentTime);
  source.stop(ctx.currentTime + duration);
};

const soundMap = {
  quill: playQuillScratch,
  paper: playPaperRustle,
  clink: playMetallicClink,
  button: playButtonPress,
  compass: playCompassSpin,
};

export const useSound = () => {
  const { soundEnabled } = useSettings();
  const lastPlayRef = useRef({});

  const play = useCallback((soundName, minInterval = 30) => {
    if (!soundEnabled) return;
    const now = Date.now();
    if (lastPlayRef.current[soundName] && now - lastPlayRef.current[soundName] < minInterval) return;
    lastPlayRef.current[soundName] = now;
    soundMap[soundName]?.();
  }, [soundEnabled]);

  return { play };
};
