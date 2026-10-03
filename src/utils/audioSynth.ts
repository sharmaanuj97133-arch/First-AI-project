class AudioSynthEngine {
  private ctx: AudioContext | null = null;
  private currentSource: AudioNode | null = null;
  private isPlaying = false;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  stop() {
    if (this.currentSource) {
      try {
        if ('stop' in this.currentSource) {
          (this.currentSource as AudioScheduledSourceNode).stop();
        }
        this.currentSource.disconnect();
      } catch {
        // ignore
      }
      this.currentSource = null;
    }
    this.isPlaying = false;
  }

  playProfile(mode: string, durationSec = 3.5): boolean {
    this.initContext();
    if (!this.ctx) return false;

    this.stop();
    const ctx = this.ctx;
    const now = ctx.currentTime;

    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.001, now);
    masterGain.gain.exponentialRampToValueAtTime(0.2, now + 0.1);
    masterGain.gain.exponentialRampToValueAtTime(0.001, now + durationSec);
    masterGain.connect(ctx.destination);

    if (mode === 'music') {
      // Warm acoustic harmonic chord (Audiophile curve)
      const freqs = [220, 277.18, 329.63, 440, 554.37];
      freqs.forEach((f, idx) => {
        const osc = ctx.createOscillator();
        const oscGain = ctx.createGain();
        osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(f, now);
        oscGain.gain.value = 0.3 / freqs.length;
        osc.connect(oscGain);
        oscGain.connect(masterGain);
        osc.start(now);
        osc.stop(now + durationSec);
      });
      this.isPlaying = true;
      return true;
    } else if (mode === 'gaming') {
      // Fast spatial spatial tick / pulse
      const osc = ctx.createOscillator();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(70, now + 0.15);

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(2400, now);

      osc.connect(filter);
      filter.connect(masterGain);
      osc.start(now);
      osc.stop(now + durationSec);
      this.isPlaying = true;
      return true;
    } else if (mode === 'travel') {
      // White noise heavily lowpassed simulating ANC ambient cabin silencing
      const bufferSize = ctx.sampleRate * durationSec;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        // Brown/pink noise filter
        lastOut = (lastOut + 0.02 * white) / 1.02;
        data[i] = lastOut * 1.5;
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(180, now); // extreme low pass = attenuated cabin drone

      noise.connect(filter);
      filter.connect(masterGain);
      noise.start(now);
      noise.stop(now + durationSec);
      this.isPlaying = true;
      return true;
    } else if (mode === 'work') {
      // Crisp articulate voice clarity tone
      const osc = ctx.createOscillator();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.setValueAtTime(1200, now + 0.4);
      osc.frequency.setValueAtTime(950, now + 0.9);

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1500, now);
      filter.Q.value = 1.2;

      osc.connect(filter);
      filter.connect(masterGain);
      osc.start(now);
      osc.stop(now + durationSec);
      this.isPlaying = true;
      return true;
    } else {
      // Fitness / punchy dynamic bass
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(90, now);
      osc.frequency.exponentialRampToValueAtTime(45, now + 0.4);

      osc.connect(masterGain);
      osc.start(now);
      osc.stop(now + durationSec);
      this.isPlaying = true;
      return true;
    }
  }

  getPlaying() {
    return this.isPlaying;
  }
}

export const audioSynth = new AudioSynthEngine();
