/* ==========================================================================
   42AA — Direct Audio Engine with Psychedelic Bridge Transition
   Plays real MP3 tracks cleanly (zero permanent filters), drives live
   Web Audio AnalyserNode, and weaves a hypnotic psychedelic stereo audio
   transition when moving between Elephant and Egypt.
   ========================================================================== */

class PsychAudioEngine {
  constructor() {
    this.ctx = null;
    this.trackGain = null;
    this.fxBus = null;
    this.masterGain = null;
    this.analyser = null;

    this.audioEl = new Audio();
    this.audioEl.preload = "metadata";
    this.mediaSource = null;
    this.mediaConnected = false;

    this.isPlaying = false;
    this.isTransitioning = false;
    this.transitionTimer = null;
    this.autoTransitionFired = false;

    this.currentTrack = null;
    this.currentTime = 0;
    this.duration = 152;
    this.volume = 0.85;
    this.muted = false;

    this.onTimeUpdate = null;
    this.onDurationChange = null;
    this.onTrackEnded = null;
    this.onTransitionState = null;

    this.bindAudioElEvents();
  }

  bindAudioElEvents() {
    this.audioEl.addEventListener("loadedmetadata", () => {
      if (isFinite(this.audioEl.duration) && this.audioEl.duration > 0) {
        this.duration = this.audioEl.duration;
        if (this.currentTrack) this.currentTrack.duration = Math.round(this.duration);
        if (this.onDurationChange) this.onDurationChange(this.duration);
        if (this.onTimeUpdate) this.onTimeUpdate(this.audioEl.currentTime || 0, this.duration);
      }
    });

    this.audioEl.addEventListener("timeupdate", () => {
      this.currentTime = this.audioEl.currentTime || 0;
      const dur = isFinite(this.audioEl.duration) && this.audioEl.duration > 0 ? this.audioEl.duration : this.duration;
      this.duration = dur;
      if (this.onTimeUpdate) this.onTimeUpdate(this.currentTime, this.duration);

      // Seamless automatic psychedelic bridge 1.6s before Elephant finishes into Egypt
      if (
        this.isPlaying &&
        !this.isTransitioning &&
        !this.autoTransitionFired &&
        dur > 10 &&
        dur - this.currentTime <= 1.6
      ) {
        this.autoTransitionFired = true;
        if (this.onTrackEnded) this.onTrackEnded(true);
      }
    });

    this.audioEl.addEventListener("ended", () => {
      if (this.autoTransitionFired || this.isTransitioning) return;
      this.isPlaying = false;
      if (this.onTrackEnded) this.onTrackEnded(false);
    });

    this.audioEl.addEventListener("pause", () => {
      if (!this.isTransitioning && !this.audioEl.ended) {
        this.isPlaying = false;
      }
    });

    this.audioEl.addEventListener("play", () => {
      this.isPlaying = true;
    });
  }

  initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();

      this.trackGain = this.ctx.createGain();
      this.trackGain.gain.value = 1.0;

      this.fxBus = this.ctx.createGain();
      this.fxBus.gain.value = 0.9;

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = this.muted ? 0 : this.volume;

      this.analyser = this.ctx.createAnalyser();
      this.analyser.fftSize = 256;
      this.analyser.smoothingTimeConstant = 0.82;

      // Clean direct path for tracks + separate bus for psychedelic transition bridge
      this.trackGain.connect(this.masterGain);
      this.fxBus.connect(this.masterGain);
      this.masterGain.connect(this.analyser);
      this.analyser.connect(this.ctx.destination);
    }

    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }

    if (!this.mediaConnected && window.location.protocol !== "file:") {
      try {
        this.mediaSource = this.ctx.createMediaElementSource(this.audioEl);
        this.mediaSource.connect(this.trackGain);
        this.mediaConnected = true;
      } catch (err) {
        this.mediaConnected = false;
      }
    }
  }

  /**
   * Synthesizes a lush 2.4-second psychedelic analog transition bridge:
   * - Stereo sweeping resonant noise whoosh (reverse-cymbal / tape portal)
   * - Detuned shimmering fifth+ninth harmonic drone with slow phaser LFO
   * - Cascading stereo tape-delay echoes melting into the incoming track
   */
  triggerPsychedelicBridge() {
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const dur = 2.4;

    // 1. Stereo Tape Delay Network for the bridge
    const delayL = this.ctx.createDelay(1.0);
    const delayR = this.ctx.createDelay(1.0);
    delayL.delayTime.value = 0.27;
    delayR.delayTime.value = 0.39;

    const fbL = this.ctx.createGain();
    const fbR = this.ctx.createGain();
    fbL.gain.value = 0.45;
    fbR.gain.value = 0.45;

    const bridgeMix = this.ctx.createGain();
    bridgeMix.gain.setValueAtTime(0.001, now);
    bridgeMix.gain.linearRampToValueAtTime(0.55, now + 0.75);
    bridgeMix.gain.exponentialRampToValueAtTime(0.001, now + dur + 0.6);

    delayL.connect(fbL);
    fbL.connect(delayR);
    delayR.connect(fbR);
    fbR.connect(delayL);
    delayL.connect(bridgeMix);
    delayR.connect(bridgeMix);
    bridgeMix.connect(this.fxBus);

    // 2. Swirling Bandpass Noise Portal (rising & descending psychedelic sweep)
    const bufLen = Math.floor(this.ctx.sampleRate * dur);
    const noiseBuf = this.ctx.createBuffer(1, bufLen, this.ctx.sampleRate);
    const data = noiseBuf.getChannelData(0);
    let lastOut = 0;
    for (let i = 0; i < bufLen; i++) {
      const white = Math.random() * 2 - 1;
      lastOut = (lastOut + 0.04 * white) / 1.04; // warm pink-ish analog tape noise
      data[i] = lastOut * 2.4;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = noiseBuf;

    const sweepFilter = this.ctx.createBiquadFilter();
    sweepFilter.type = "bandpass";
    sweepFilter.Q.value = 5.5;
    sweepFilter.frequency.setValueAtTime(180, now);
    sweepFilter.frequency.exponentialRampToValueAtTime(2600, now + 1.15);
    sweepFilter.frequency.exponentialRampToValueAtTime(320, now + dur);

    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(0.001, now);
    noiseGain.gain.linearRampToValueAtTime(0.32, now + 1.05);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + dur);

    noise.connect(sweepFilter);
    sweepFilter.connect(noiseGain);
    noiseGain.connect(bridgeMix);
    noiseGain.connect(delayL);
    noise.start(now);
    noise.stop(now + dur + 0.05);

    // 3. Hypnotic Detuned Psychedelic Chord Swell (D - A - E - F# mystic shimmer)
    const notes = [146.83, 220.0, 329.63, 369.99, 587.33];
    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const lfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();
      const filt = this.ctx.createBiquadFilter();
      const g = this.ctx.createGain();

      osc.type = idx % 2 === 0 ? "sawtooth" : "triangle";
      // Subtle psychedelic pitch glide (tape wow & flutter)
      osc.frequency.setValueAtTime(freq * 0.96, now);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.02, now + 1.15);
      osc.frequency.exponentialRampToValueAtTime(freq, now + dur);

      // Vibrato / phaser wobble
      lfo.type = "sine";
      lfo.frequency.value = 3.2 + idx * 0.65;
      lfoGain.gain.value = 14;
      lfo.connect(lfoGain);
      lfoGain.connect(osc.detune);

      filt.type = "lowpass";
      filt.frequency.setValueAtTime(320, now);
      filt.frequency.exponentialRampToValueAtTime(2900, now + 1.1);
      filt.frequency.exponentialRampToValueAtTime(420, now + dur);
      filt.Q.value = 4.2;

      g.gain.setValueAtTime(0.0005, now);
      g.gain.linearRampToValueAtTime(0.065 / (1 + idx * 0.15), now + 0.85);
      g.gain.exponentialRampToValueAtTime(0.0006, now + dur);

      osc.connect(filt);
      filt.connect(g);
      g.connect(bridgeMix);
      g.connect(idx % 2 === 0 ? delayL : delayR);

      osc.start(now);
      lfo.start(now);
      osc.stop(now + dur + 0.05);
      lfo.stop(now + dur + 0.05);
    });
  }

  /**
   * Loads a track immediately (without bridge, e.g. on initial load)
   */
  loadTrack(track, autoplay = false) {
    this.clearTransition();
    this.audioEl.pause();
    this.isPlaying = false;
    this.autoTransitionFired = false;

    this.currentTrack = track;
    this.duration = track.duration || 152;
    this.currentTime = 0;

    if (track.src) {
      const resolvedSrc = new URL(track.src, window.location.href).href;
      if (this.audioEl.src !== resolvedSrc) {
        this.audioEl.src = track.src;
        this.audioEl.load();
      } else {
        this.audioEl.currentTime = 0;
      }
    }

    if (this.ctx && this.trackGain) {
      this.trackGain.gain.cancelScheduledValues(this.ctx.currentTime);
      this.trackGain.gain.setValueAtTime(1.0, this.ctx.currentTime);
    }

    if (autoplay) {
      this.play();
    } else if (this.onTimeUpdate) {
      this.onTimeUpdate(0, this.duration);
    }
  }

  /**
   * Switches from current track to next track WITH the psychedelic audio bridge!
   */
  transitionToTrack(track, onSwapped) {
    this.clearTransition();
    this.initContext();
    this.isTransitioning = true;
    this.autoTransitionFired = false;
    if (this.onTransitionState) this.onTransitionState(true);

    const now = this.ctx ? this.ctx.currentTime : 0;

    // 1. Fade out outgoing track smoothly over 0.65s
    if (this.mediaConnected && this.trackGain && this.ctx) {
      this.trackGain.gain.cancelScheduledValues(now);
      this.trackGain.gain.setValueAtTime(this.trackGain.gain.value, now);
      this.trackGain.gain.linearRampToValueAtTime(0.001, now + 0.68);
    }

    // 2. Fire the psychedelic stereo audio bridge
    this.triggerPsychedelicBridge();

    // 3. Swap to the new track right at the peak of the psychedelic swell (~1.05s)
    this.transitionTimer = setTimeout(() => {
      this.currentTrack = track;
      this.duration = track.duration || 152;
      this.currentTime = 0;

      if (track.src) {
        this.audioEl.src = track.src;
        this.audioEl.currentTime = 0;
        this.audioEl.load();
      }

      if (onSwapped) onSwapped(track);

      if (this.mediaConnected && this.trackGain && this.ctx) {
        const t = this.ctx.currentTime;
        this.trackGain.gain.cancelScheduledValues(t);
        this.trackGain.gain.setValueAtTime(0.001, t);
        this.trackGain.gain.linearRampToValueAtTime(1.0, t + 0.72);
        this.audioEl.volume = 1.0;
        this.masterGain.gain.setTargetAtTime(this.muted ? 0 : this.volume, t, 0.03);
      } else {
        this.audioEl.volume = this.muted ? 0 : this.volume;
      }

      const p = this.audioEl.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
      this.isPlaying = true;

      this.transitionTimer = setTimeout(() => {
        this.isTransitioning = false;
        if (this.onTransitionState) this.onTransitionState(false);
      }, 900);
    }, 1050);
  }

  clearTransition() {
    if (this.transitionTimer) {
      clearTimeout(this.transitionTimer);
      this.transitionTimer = null;
    }
    if (this.isTransitioning) {
      this.isTransitioning = false;
      if (this.onTransitionState) this.onTransitionState(false);
    }
  }

  play() {
    if (!this.currentTrack) return;
    this.initContext();
    if (this.mediaConnected && this.masterGain && this.ctx) {
      this.audioEl.volume = 1.0;
      this.trackGain.gain.setTargetAtTime(1.0, this.ctx.currentTime, 0.04);
      this.masterGain.gain.setTargetAtTime(this.muted ? 0 : this.volume, this.ctx.currentTime, 0.03);
    } else {
      this.audioEl.volume = this.muted ? 0 : this.volume;
    }
    const p = this.audioEl.play();
    if (p && typeof p.catch === "function") p.catch(() => {});
    this.isPlaying = true;
  }

  pause() {
    this.clearTransition();
    this.isPlaying = false;
    this.audioEl.pause();
  }

  seek(seconds) {
    const target = Math.max(0, Math.min(this.duration, seconds));
    this.currentTime = target;
    this.autoTransitionFired = false;
    try {
      this.audioEl.currentTime = target;
    } catch (e) {}
    if (this.onTimeUpdate) this.onTimeUpdate(this.currentTime, this.duration);
  }

  setVolume(val) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.mediaConnected && this.masterGain && this.ctx && !this.muted) {
      this.masterGain.gain.setTargetAtTime(this.volume, this.ctx.currentTime, 0.03);
    } else if (!this.muted) {
      this.audioEl.volume = this.volume;
    }
  }

  toggleMute() {
    this.muted = !this.muted;
    if (this.mediaConnected && this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.muted ? 0 : this.volume, this.ctx.currentTime, 0.03);
    } else {
      this.audioEl.volume = this.muted ? 0 : this.volume;
    }
    return this.muted;
  }

  getFrequencyData(targetArray) {
    if (!this.analyser || (!this.isPlaying && !this.isTransitioning)) {
      targetArray.fill(0);
      return false;
    }
    this.analyser.getByteFrequencyData(targetArray);
    return true;
  }
}

window.PsychAudioEngine = PsychAudioEngine;
