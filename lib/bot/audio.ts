import { prefersReducedMotion } from "@/lib/motion";

/**
 * Web Audio cues for the assembly. Silent under reduced motion; browsers keep
 * the context suspended until the first user gesture, so nothing autoplays.
 */
let ctx: AudioContext | null = null;

const audio = (): AudioContext | null => {
  if (typeof window === "undefined" || prefersReducedMotion()) return null;
  if (!ctx) {
    const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
  }
  if (ctx.state === "suspended") ctx.resume();
  return ctx;
};

const envelope = (ac: AudioContext, peak: number, attack: number, release: number) => {
  const t = ac.currentTime;
  const gain = ac.createGain();
  gain.gain.setValueAtTime(0.0001, t);
  gain.gain.exponentialRampToValueAtTime(peak, t + attack);
  gain.gain.exponentialRampToValueAtTime(0.0001, t + release);
  gain.connect(ac.destination);
  return gain;
};

let lastClack = 0;

/** Short low-passed noise burst as a part snaps in. Throttled for fast scrubbing. */
export const playClack = () => {
  const now = performance.now();
  if (now - lastClack < 80) return;
  lastClack = now;
  const ac = audio();
  if (!ac) return;

  const buf = ac.createBuffer(1, 1024, ac.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * Math.exp(-i / 60);

  const src = ac.createBufferSource();
  src.buffer = buf;
  const filter = ac.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = 1800;
  filter.Q.value = 0.6;

  src.connect(filter).connect(envelope(ac, 0.22, 0.002, 0.09));
  src.start();
  src.stop(ac.currentTime + 0.12);
};

/** Rising ping for the finale. */
export const playPing = () => {
  const ac = audio();
  if (!ac) return;
  const t = ac.currentTime;
  const osc = ac.createOscillator();
  osc.type = "triangle";
  osc.frequency.setValueAtTime(620, t);
  osc.frequency.exponentialRampToValueAtTime(880, t + 0.18);
  osc.connect(envelope(ac, 0.18, 0.01, 0.6));
  osc.start(t);
  osc.stop(t + 0.65);
};
