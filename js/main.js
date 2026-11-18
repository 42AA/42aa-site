/* ==========================================================================
   42AA — Interactive UI, Audio Visualizer, Psychedelic Transitions & Lightbox
   ========================================================================== */

(function () {
  "use strict";

  const DATA = window.BAND_DATA;
  const engine = new window.PsychAudioEngine();

  const state = {
    queue: DATA.tracks.slice(),
    trackIndex: 0,
    shuffle: false,
    repeat: false,
    lightboxIndex: 0,
    hasInteractedWithAudio: false
  };

  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => Array.from(document.querySelectorAll(sel));

  const dom = {
    scrollProgress: $("#scroll-progress"),
    navLinks: $$("#nav-links a"),
    navPlayBtn: $("#nav-play-btn"),
    navPlayLabel: $("#nav-play-label"),
    heroPlayCta: $("#hero-play-cta"),
    burgerBtn: $("#burger-btn"),
    mobileDrawer: $("#mobile-drawer"),

    // Player Deck
    playerDeck: $("#player-deck"),
    deckCover: $("#deck-cover"),
    deckPlaylistName: $("#deck-playlist-name"),
    deckTitle: $("#deck-title"),
    deckSub: $("#deck-sub"),
    seekSlider: $("#seek-slider"),
    timeCurrent: $("#time-current"),
    timeTotal: $("#time-total"),
    btnPlayMain: $("#btn-play-main"),
    iconPlayMain: $("#icon-play-main"),
    btnPrev: $("#btn-prev"),
    btnNext: $("#btn-next"),
    btnShuffle: $("#btn-shuffle"),
    btnRepeat: $("#btn-repeat"),
    btnMute: $("#btn-mute"),
    volumeSlider: $("#volume-slider"),
    trackItems: $("#track-items"),

    // Mini Player
    miniPlayer: $("#mini-player"),
    miniCover: $("#mini-cover"),
    miniTitle: $("#mini-title"),
    miniSub: $("#mini-sub"),
    miniPlay: $("#mini-play"),
    iconPlayMini: $("#icon-play-mini"),
    miniPrev: $("#mini-prev"),
    miniNext: $("#mini-next"),
    miniProgressFill: $("#mini-progress-fill"),

    // Sections
    membersGrid: $("#members-grid"),
    galleryBento: $("#gallery-bento"),
    socialsGrid: $("#socials-grid"),

    // Lightbox & Toast
    lightboxModal: $("#lightbox-modal"),
    lightboxImg: $("#lightbox-img"),
    lightboxClose: $("#lightbox-close"),
    lightboxPrev: $("#lightbox-prev"),
    lightboxNext: $("#lightbox-next"),
    toast: $("#toast")
  };

  const PLAY_SVG = '<path d="M8 5v14l11-7z"/>';
  const PAUSE_SVG = '<path d="M6 5h4v14H6zm8 0h4v14h-4z"/>';

  function formatTime(sec) {
    const s = Math.max(0, Math.floor(sec));
    const m = Math.floor(s / 60);
    const r = s % 60;
    return `${m}:${r < 10 ? "0" : ""}${r}`;
  }

  let toastTimer = null;
  function showToast(msg) {
    if (!dom.toast) return;
    dom.toast.textContent = msg;
    dom.toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => dom.toast.classList.remove("show"), 3200);
  }

  function getSocialIcon(name) {
    const icons = {
      telegram: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M21.5 3.5 2.8 10.7c-.9.35-.88 1.62.03 1.94l4.75 1.66 1.8 5.65c.27.85 1.38 1.07 1.96.39l2.63-3.09 4.87 3.58c.75.55 1.82.14 2.02-.77L23 4.88c.19-.94-.68-1.71-1.5-1.38z"/><path d="M8.5 14.3 21 4.5"/></svg>',
      vk: '<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M13.16 18.94c-6.37 0-10-4.36-10.16-11.61h3.2c.1 5.32 2.45 7.58 4.3 8.04V7.33h3.01v4.59c1.82-.2 3.74-2.29 4.39-4.59h3.01c-.5 2.84-2.57 4.93-4.05 5.79 1.48.7 3.84 2.52 4.74 5.82h-3.31c-.71-2.21-2.48-3.92-4.78-4.15v4.15h-.35z"/></svg>',
      yandex: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M9.5 15.5V9.8l6-1.8v6"/><circle cx="8.2" cy="15.5" r="1.5" fill="currentColor"/><circle cx="14.2" cy="14" r="1.5" fill="currentColor"/></svg>',
      spotify: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9.5"/><path d="M7.5 10.2c3-1 6.7-.8 9.4.8"/><path d="M8.4 13.2c2.3-.7 5.2-.5 7.3.7"/><path d="M9.3 16c1.7-.4 3.8-.3 5.4.6"/></svg>',
      apple: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V6l11-2v12"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="17.5" cy="16" r="2.5"/></svg>',
      youtube: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><rect x="2.5" y="5.5" width="19" height="13" rx="4"/><polygon points="10 9.5 15.5 12 10 14.5" fill="currentColor" stroke="none"/></svg>',
      instagram: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>',
      soundcloud: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 15v-2M7 16v-5M10 16V9"/><path d="M13 16h5.5a3 3 0 0 0 .4-5.97A4.5 4.5 0 0 0 13 8.5V16z"/></svg>',
      bandcamp: '<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><polygon points="2.5 17 8.5 7 21.5 7 15.5 17"/></svg>',
      tiktok: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 4v11.5a3.5 3.5 0 1 1-2.5-3.35"/><path d="M14 4c.8 2.4 2.8 4 5.5 4.3"/></svg>'
    };
    return icons[name] || icons.apple;
  }

  // =========================================================================
  // Player Logic with Psychedelic Transition Between Elephant & Egypt
  // =========================================================================

  function selectTrack(idx, autoplay = false, usePsychedelicBridge = false) {
    if (!state.queue.length) return;
    const nextIdx = ((idx % state.queue.length) + state.queue.length) % state.queue.length;
    const prevIdx = state.trackIndex;
    const track = state.queue[nextIdx];

    const shouldBridge =
      usePsychedelicBridge &&
      nextIdx !== prevIdx &&
      (engine.isPlaying || autoplay);

    state.trackIndex = nextIdx;

    if (shouldBridge) {
      state.hasInteractedWithAudio = true;
      dom.miniPlayer.classList.add("visible");
      engine.transitionToTrack(track, (swappedTrack) => {
        updateTrackUI(swappedTrack);
        renderTracklist();
        syncPlayButtons();
      });
      renderTracklist();
      return;
    }

    engine.loadTrack(track, autoplay);
    updateTrackUI(track);
    renderTracklist();
    syncPlayButtons();

    if (autoplay) {
      state.hasInteractedWithAudio = true;
      dom.miniPlayer.classList.add("visible");
    }
  }

  function updateTrackUI(track) {
    dom.deckCover.src = track.cover;
    dom.deckCover.alt = `Cover: ${track.title}`;
    dom.deckPlaylistName.textContent = DATA.singleTitle;
    dom.deckTitle.textContent = track.title;
    dom.deckSub.textContent = "42AA";
    dom.playerDeck.style.setProperty("--player-glow", `${track.color}58`);

    dom.seekSlider.max = track.duration;
    dom.seekSlider.value = engine.currentTime;
    dom.timeCurrent.textContent = formatTime(engine.currentTime);
    dom.timeTotal.textContent = formatTime(track.duration);
    updateSeekFill(engine.currentTime, track.duration);

    dom.miniCover.src = track.cover;
    dom.miniTitle.textContent = track.title;
    dom.miniSub.textContent = "42AA";
  }

  function updateSeekFill(cur, dur) {
    const pct = dur > 0 ? Math.min(100, (cur / dur) * 100) : 0;
    dom.seekSlider.style.background = `linear-gradient(90deg, #0A9396 0%, #0A9396 ${pct}%, #00222C ${pct}%, #00222C 100%)`;
    dom.miniProgressFill.style.width = `${pct}%`;
  }

  function togglePlay() {
    state.hasInteractedWithAudio = true;
    if (engine.isPlaying) {
      engine.pause();
    } else {
      engine.play();
      dom.miniPlayer.classList.add("visible");
    }
    syncPlayButtons();
    renderTracklist();
  }

  function nextTrack(useBridge = true) {
    if (state.shuffle && state.queue.length > 1) {
      let rand;
      do {
        rand = Math.floor(Math.random() * state.queue.length);
      } while (rand === state.trackIndex);
      selectTrack(rand, true, useBridge);
    } else {
      selectTrack(state.trackIndex + 1, true, useBridge);
    }
  }

  function prevTrack(useBridge = true) {
    if (engine.currentTime > 4) {
      engine.seek(0);
    } else {
      selectTrack(state.trackIndex - 1, true, useBridge);
    }
  }

  function syncPlayButtons() {
    const playing = engine.isPlaying || engine.isTransitioning;
    document.body.classList.toggle("is-playing", playing);
    dom.iconPlayMain.innerHTML = playing ? PAUSE_SVG : PLAY_SVG;
    dom.iconPlayMini.innerHTML = playing ? PAUSE_SVG : PLAY_SVG;
    dom.navPlayLabel.textContent = playing ? "Pause" : "Listen";
  }

  engine.onDurationChange = (dur) => {
    dom.seekSlider.max = dur;
    dom.timeTotal.textContent = formatTime(dur);
    renderTracklist();
  };

  engine.onTimeUpdate = (cur, dur) => {
    dom.seekSlider.max = dur;
    dom.seekSlider.value = cur;
    dom.timeCurrent.textContent = formatTime(cur);
    dom.timeTotal.textContent = formatTime(dur);
    updateSeekFill(cur, dur);
  };

  engine.onTrackEnded = () => {
    if (state.repeat) {
      engine.seek(0);
      engine.play();
    } else {
      nextTrack(true);
    }
  };

  engine.onTransitionState = (active) => {
    document.body.classList.toggle("is-transitioning", active);
    syncPlayButtons();
  };

  // =========================================================================
  // Render Dynamic Sections
  // =========================================================================

  function renderTracklist() {
    if (!dom.trackItems) return;
    dom.trackItems.innerHTML = state.queue
      .map((track, i) => {
        const isCurrent = i === state.trackIndex;
        const eqIcon =
          isCurrent && (engine.isPlaying || engine.isTransitioning)
            ? `<span class="eq-mini"><span></span><span></span><span></span></span>`
            : `<span>${String(i + 1).padStart(2, "0")}</span>`;

        return `
          <div class="track-row track-row--${track.id} ${isCurrent ? "active" : ""}" role="listitem" tabindex="0" data-track-idx="${i}">
            <div class="track-num">${eqIcon}</div>
            <div class="track-thumb">
              <img src="${track.cover}" alt="${track.title}" loading="lazy" />
            </div>
            <div class="track-meta">
              <div class="track-name">${track.title}</div>
              <div class="track-subline">42AA</div>
            </div>
            <div class="track-dur">${formatTime(track.duration)}</div>
          </div>
        `;
      })
      .join("");
  }

  function renderMembers() {
    if (!dom.membersGrid) return;
    dom.membersGrid.innerHTML = DATA.members
      .map(
        (m) => `
        <article class="member-card" style="--member-accent: ${m.accent};">
          <div class="member-photo-wrap">
            <img src="${m.photo}" alt="${m.name}" loading="lazy" />
          </div>
          <div class="member-body">
            <h3 class="member-name">${m.name}</h3>
            <p class="member-role">${m.role}</p>
          </div>
        </article>
      `
      )
      .join("");
  }

  function renderGallery() {
    if (!dom.galleryBento) return;
    dom.galleryBento.innerHTML = DATA.photos
      .map(
        (p, idx) => `
        <figure class="photo-card ${p.span === "wide" ? "span-wide" : p.span === "tall" ? "span-tall" : ""}" data-photo-idx="${idx}" tabindex="0" style="margin: 0;">
          <img src="${p.src}" alt="42AA band photography" loading="lazy" />
        </figure>
      `
      )
      .join("");
  }

  function renderSocials() {
    if (!dom.socialsGrid) return;
    dom.socialsGrid.innerHTML = DATA.socials
      .map(
        (s) => `
        <a
          class="social-card"
          href="${s.url}"
          target="_blank"
          rel="noopener noreferrer"
          style="--social-color: ${s.color};"
        >
          <div class="social-top">
            <div class="social-icon-wrap">${getSocialIcon(s.icon)}</div>
          </div>
          <div class="social-name">${s.name}</div>
        </a>
      `
      )
      .join("");
  }

  // =========================================================================
  // Lightbox Modal
  // =========================================================================

  function openLightbox(idx) {
    state.lightboxIndex = ((idx % DATA.photos.length) + DATA.photos.length) % DATA.photos.length;
    const p = DATA.photos[state.lightboxIndex];
    dom.lightboxImg.src = p.src;
    dom.lightboxImg.alt = "42AA band photography";
    dom.lightboxModal.classList.add("open");
  }

  function closeLightbox() {
    if (dom.lightboxModal) dom.lightboxModal.classList.remove("open");
  }

  // =========================================================================
  // Smooth Navigation, Scroll Progress, Parallax & Reveal
  // =========================================================================

  function smoothScrollToTarget(selector) {
    const el = document.querySelector(selector);
    if (!el) return;
    const headerOffset = 88;
    const targetY = el.getBoundingClientRect().top + window.scrollY - headerOffset;
    window.scrollTo({ top: Math.max(0, targetY), behavior: "smooth" });
  }

  function initScrollAndReveal() {
    document.addEventListener("click", (e) => {
      const link = e.target.closest('a[href^="#"]');
      if (!link) return;
      const hash = link.getAttribute("href");
      if (!hash || hash === "#") return;
      const target = document.querySelector(hash);
      if (target) {
        e.preventDefault();
        dom.mobileDrawer.classList.remove("open");
        dom.burgerBtn.setAttribute("aria-expanded", "false");
        smoothScrollToTarget(hash);
      }
    });

    const revealObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.02, rootMargin: "0px 0px -10px 0px" }
    );
    $$(".reveal").forEach((el) => revealObs.observe(el));

    const sections = $$("main section[id]");
    const navObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            dom.navLinks.forEach((a) => {
              a.classList.toggle("active", a.getAttribute("href") === `#${id}`);
            });
          }
        });
      },
      { rootMargin: "-35% 0px -50% 0px" }
    );
    sections.forEach((sec) => navObs.observe(sec));

    let ticking = false;
    window.addEventListener(
      "scroll",
      () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const docH = document.documentElement.scrollHeight - window.innerHeight;
          const pct = docH > 0 ? (scrollY / docH) * 100 : 0;
          dom.scrollProgress.style.width = `${pct}%`;

          if (scrollY > 460 || state.hasInteractedWithAudio) {
            dom.miniPlayer.classList.add("visible");
          } else {
            dom.miniPlayer.classList.remove("visible");
          }

          ticking = false;
        });
      },
      { passive: true }
    );
  }

  // =========================================================================
  // Live Audio Spectrum Visualizer (Tapestry Palette)
  // =========================================================================

  function initVisualizer() {
    const canvas = $("#audio-visualizer");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const bins = new Uint8Array(128);
    let phase = 0;

    function resize() {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(200, Math.floor(rect.width * dpr));
      canvas.height = Math.max(80, Math.floor(rect.height * dpr));
    }
    resize();
    window.addEventListener("resize", resize);

    function render() {
      phase += engine.isTransitioning ? 0.085 : 0.035;
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const active = engine.getFrequencyData(bins);
      const barCount = 52;
      const barW = w / barCount;

      ctx.fillStyle = "#CBD5E1";

      for (let i = 0; i < barCount; i++) {
        const val = active
          ? bins[i] / 255
          : (Math.sin(phase + i * 0.25) * 0.5 + 0.5) * 0.16 + 0.06;

        const barH = Math.max(4, val * h * 0.78);
        const x = i * barW + barW * 0.18;
        const y = (h - barH) * 0.5;

        ctx.globalAlpha = active ? 0.92 : 0.44;
        ctx.beginPath();
        ctx.rect(x, y, barW * 0.62, barH);
        ctx.fill();
      }

      // Burgundy wave ribbon
      ctx.globalAlpha = active ? 0.9 : 0.5;
      ctx.strokeStyle = "#B02A3C";
      ctx.lineWidth = engine.isTransitioning ? 2.4 : 1.6;
      ctx.beginPath();
      for (let x = 0; x <= w; x += 6) {
        const idx = Math.floor((x / w) * 48);
        const amp = active ? (bins[idx] / 255) * (h * 0.3) : h * 0.08;
        const y = h * 0.5 + Math.sin(x * 0.025 + phase * 1.8) * amp;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      requestAnimationFrame(render);
    }
    render();
  }

  // =========================================================================
  // Event Listeners
  // =========================================================================

  function bindEvents() {
    dom.btnPlayMain.addEventListener("click", togglePlay);
    dom.miniPlay.addEventListener("click", togglePlay);
    dom.navPlayBtn.addEventListener("click", togglePlay);

    dom.heroPlayCta.addEventListener("click", () => {
      if (!engine.isPlaying) togglePlay();
      smoothScrollToTarget("#music");
    });

    dom.btnNext.addEventListener("click", () => nextTrack(true));
    dom.miniNext.addEventListener("click", () => nextTrack(true));
    dom.btnPrev.addEventListener("click", () => prevTrack(true));
    dom.miniPrev.addEventListener("click", () => prevTrack(true));

    dom.btnShuffle.addEventListener("click", () => {
      state.shuffle = !state.shuffle;
      dom.btnShuffle.classList.toggle("active-toggle", state.shuffle);
      showToast(state.shuffle ? "Shuffle enabled" : "Shuffle disabled");
    });

    dom.btnRepeat.addEventListener("click", () => {
      state.repeat = !state.repeat;
      dom.btnRepeat.classList.toggle("active-toggle", state.repeat);
      showToast(state.repeat ? "Track repeat enabled" : "Repeat disabled");
    });

    dom.seekSlider.addEventListener("input", (e) => {
      engine.seek(parseFloat(e.target.value));
    });

    dom.volumeSlider.addEventListener("input", (e) => {
      const v = parseFloat(e.target.value);
      engine.setVolume(v);
      if (engine.muted && v > 0) {
        engine.toggleMute();
        dom.btnMute.classList.remove("active-toggle");
      }
    });

    dom.btnMute.addEventListener("click", () => {
      const muted = engine.toggleMute();
      dom.btnMute.classList.toggle("active-toggle", muted);
    });

    // Clicking another track triggers the psychedelic bridge when playing
    dom.trackItems.addEventListener("click", (e) => {
      const row = e.target.closest(".track-row");
      if (!row) return;
      const idx = parseInt(row.dataset.trackIdx, 10);
      if (idx === state.trackIndex) {
        togglePlay();
      } else {
        selectTrack(idx, true, true);
      }
    });

    dom.galleryBento.addEventListener("click", (e) => {
      const card = e.target.closest(".photo-card");
      if (!card) return;
      openLightbox(parseInt(card.dataset.photoIdx, 10));
    });

    dom.lightboxClose.addEventListener("click", closeLightbox);
    dom.lightboxPrev.addEventListener("click", () => openLightbox(state.lightboxIndex - 1));
    dom.lightboxNext.addEventListener("click", () => openLightbox(state.lightboxIndex + 1));
    dom.lightboxModal.addEventListener("click", (e) => {
      if (e.target === dom.lightboxModal) closeLightbox();
    });

    dom.burgerBtn.addEventListener("click", () => {
      const open = dom.mobileDrawer.classList.toggle("open");
      dom.burgerBtn.setAttribute("aria-expanded", String(open));
      dom.mobileDrawer.setAttribute("aria-hidden", String(!open));
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        closeLightbox();
        dom.mobileDrawer.classList.remove("open");
      }
      if (dom.lightboxModal.classList.contains("open")) {
        if (e.key === "ArrowRight") openLightbox(state.lightboxIndex + 1);
        if (e.key === "ArrowLeft") openLightbox(state.lightboxIndex - 1);
      }
    });
  }

  function init() {
    renderMembers();
    renderGallery();
    renderSocials();
    selectTrack(0, false, false);

    bindEvents();
    initScrollAndReveal();
    initVisualizer();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
